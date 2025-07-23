import { VercelRequest, VercelResponse } from '@vercel/node';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    database: 'up' | 'down';
    api: 'up' | 'down';
    deployment: 'up' | 'down';
  };
  environment: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

    const startTime = Date.now();
    
    // Basic health checks
    const checks = {
      database: await checkDatabase(),
      api: await checkAPI(),
      deployment: 'up' as const
    };

    const allHealthy = Object.values(checks).every(status => status === 'up');
    
    const healthStatus: HealthStatus = {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown',
      uptime: Date.now() - startTime,
      checks,
      environment: process.env.VERCEL_ENV || 'unknown'
    };

    const statusCode = allHealthy ? 200 : 503;
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
        deployment: 'down'
      },
      environment: process.env.VERCEL_ENV || 'unknown'
    };

    res.status(503).json(errorStatus);
  }
}

async function checkDatabase(): Promise<'up' | 'down'> {
  try {
    // Check if Supabase URL is configured
    if (!process.env.VITE_SUPABASE_URL) {
      return 'down';
    }

    // Simple connectivity check to Supabase
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': process.env.VITE_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY || ''}`
      }
    });

    return response.ok ? 'up' : 'down';
  } catch {
    return 'down';
  }
}

async function checkAPI(): Promise<'up' | 'down'> {
  try {
    // Basic API availability check
    // In a real application, you might check specific endpoints
    return 'up';
  } catch {
    return 'down';
  }
}