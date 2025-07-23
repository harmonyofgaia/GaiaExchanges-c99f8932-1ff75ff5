import { VercelRequest, VercelResponse } from '@vercel/node';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    database: 'up' | 'down' | 'degraded';
    api: 'up' | 'down' | 'degraded';
    deployment: 'up' | 'down' | 'degraded';
    environment: 'up' | 'down' | 'degraded';
  };
  environment: string;
  deploymentInfo: {
    commitSha: string;
    deploymentId: string;
    buildTime: string;
  };
  performance: {
    responseTime: number;
    memoryUsage?: number;
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const startTime = Date.now();
  
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    
    // Perform all health checks concurrently
    const [databaseStatus, apiStatus, environmentStatus] = await Promise.allSettled([
      checkDatabase(),
      checkAPI(),
      checkEnvironment()
    ]);

    const checks = {
      database: databaseStatus.status === 'fulfilled' ? databaseStatus.value : 'down',
      api: apiStatus.status === 'fulfilled' ? apiStatus.value : 'down',
      deployment: 'up' as const,
      environment: environmentStatus.status === 'fulfilled' ? environmentStatus.value : 'down'
    };

    const responseTime = Date.now() - startTime;
    
    // Determine overall health status
    const downServices = Object.values(checks).filter(status => status === 'down').length;
    const degradedServices = Object.values(checks).filter(status => status === 'degraded').length;
    
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded';
    if (downServices > 0) {
      overallStatus = 'unhealthy';
    } else if (degradedServices > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'healthy';
    }
    
    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown',
      uptime: responseTime,
      checks,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
      deploymentInfo: {
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
        deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
        buildTime: process.env.VERCEL_BUILD_TIMESTAMP || new Date().toISOString()
      },
      performance: {
        responseTime,
        memoryUsage: process.memoryUsage?.()?.heapUsed
      }
    };

    // Set appropriate status code
    let statusCode: number;
    switch (overallStatus) {
      case 'healthy':
        statusCode = 200;
        break;
      case 'degraded':
        statusCode = 200; // Still functional but with issues
        break;
      case 'unhealthy':
        statusCode = 503;
        break;
      default:
        statusCode = 500;
    }

    res.status(statusCode).json(healthStatus);

  } catch (error) {
    console.error('Health check error:', error);
    
    const errorStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown',
      uptime: 0,
      checks: {
        database: 'down',
        api: 'down',
        deployment: 'down',
        environment: 'down'
      },
      environment: process.env.VERCEL_ENV || 'unknown',
      deploymentInfo: {
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
        deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
        buildTime: 'unknown'
      },
      performance: {
        responseTime: Date.now() - startTime
      }
    };

    res.status(503).json(errorStatus);
  }
}

async function checkDatabase(): Promise<'up' | 'down' | 'degraded'> {
  try {
    // Check if Supabase URL is configured
    if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
      return 'down';
    }

    // Test connection with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': process.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
        },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok) {
        return 'up';
      } else if (response.status >= 500) {
        return 'down';
      } else {
        return 'degraded';
      }
    } catch (fetchError) {
      clearTimeout(timeout);
      console.error('Database check error:', fetchError);
      return 'down';
    }
  } catch (error) {
    console.error('Database configuration error:', error);
    return 'down';
  }
}

async function checkAPI(): Promise<'up' | 'down' | 'degraded'> {
  try {
    // Check if all required environment variables are present
    const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.warn('Missing environment variables:', missingVars);
      return 'degraded';
    }

    // API is functional if we can respond to this health check
    return 'up';
  } catch (error) {
    console.error('API check error:', error);
    return 'down';
  }
}

async function checkEnvironment(): Promise<'up' | 'down' | 'degraded'> {
  try {
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      return 'degraded'; // Old Node.js version
    }

    // Check if running in expected environment
    const environment = process.env.VERCEL_ENV || process.env.NODE_ENV;
    if (!environment) {
      return 'degraded';
    }

    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = memoryUsage.heapUsed / 1024 / 1024;
    
    if (memoryUsageMB > 500) { // More than 500MB
      return 'degraded';
    }

    return 'up';
  } catch (error) {
    console.error('Environment check error:', error);
    return 'down';
  }
}