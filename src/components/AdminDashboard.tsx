import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  twoFactorVerified: boolean;
}

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

export function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAdminStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, you would get the token from your auth context
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('/api/admin/check', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUser(data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Admin check failed');
      }
    } catch (err) {
      setError('Failed to check admin status');
      console.error('Admin status check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkSystemHealth = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setHealthStatus(data);
      }
    } catch (err) {
      console.error('Health check error:', err);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    // Set up periodic health checks
    const healthInterval = setInterval(checkSystemHealth, 30000); // Every 30 seconds
    
    return () => clearInterval(healthInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'bg-green-500';
      case 'unhealthy':
      case 'down':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Admin Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Admin Access Control</span>
          </CardTitle>
          <CardDescription>
            Verify admin privileges and manage system access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={checkAdminStatus} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Checking...' : 'Verify Admin Status'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {adminUser && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Admin User:</span>
                <Badge variant="secondary">{adminUser.email}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Role:</span>
                <Badge>{adminUser.role}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Two-Factor Auth:</span>
                <Badge variant={adminUser.twoFactorVerified ? "default" : "destructive"}>
                  {adminUser.twoFactorVerified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Health Monitor</span>
          </CardTitle>
          <CardDescription>
            Real-time system status and health checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healthStatus ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Status:</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(healthStatus.status)}`} />
                  <Badge variant={healthStatus.status === 'healthy' ? 'default' : 'destructive'}>
                    {healthStatus.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getStatusColor(healthStatus.checks.database)}`} />
                  <div className="font-medium">Database</div>
                  <div className="text-sm text-gray-600">{healthStatus.checks.database}</div>
                </div>
                
                <div className="text-center p-3 border rounded-lg">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getStatusColor(healthStatus.checks.api)}`} />
                  <div className="font-medium">API</div>
                  <div className="text-sm text-gray-600">{healthStatus.checks.api}</div>
                </div>
                
                <div className="text-center p-3 border rounded-lg">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getStatusColor(healthStatus.checks.deployment)}`} />
                  <div className="font-medium">Deployment</div>
                  <div className="text-sm text-gray-600">{healthStatus.checks.deployment}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div>Version: {healthStatus.version}</div>
                <div>Environment: {healthStatus.environment}</div>
                <div>Last Update: {new Date(healthStatus.timestamp).toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <div>Loading system health...</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deployment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Automation</CardTitle>
          <CardDescription>
            GitHub Actions workflow status and controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Automated deployment workflow active</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Health checks enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Multi-channel failure notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Admin-only middleware protection</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}