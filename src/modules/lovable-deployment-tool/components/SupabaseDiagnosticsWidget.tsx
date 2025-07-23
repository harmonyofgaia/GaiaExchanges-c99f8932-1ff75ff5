/**
 * Supabase Diagnostics Widget
 * Real-time health monitoring and auto-fix dashboard
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Settings,
  Zap,
  Activity,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';
import type { SupabaseDiagnostics, DiagnosticWarning, DiagnosticError } from '../interfaces';

interface SupabaseDiagnosticsWidgetProps {
  className?: string;
}

export const SupabaseDiagnosticsWidget: React.FC<SupabaseDiagnosticsWidgetProps> = ({ 
  className 
}) => {
  const [diagnostics, setDiagnostics] = useState<SupabaseDiagnostics | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoFixing, setAutoFixing] = useState(false);

  useEffect(() => {
    loadDiagnostics();
    const interval = setInterval(loadDiagnostics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDiagnostics = async () => {
    try {
      // In real implementation, would call SupabaseDiagnosticsService
      const mockDiagnostics: SupabaseDiagnostics = {
        instanceId: 'gaia-prod-db',
        healthStatus: 'warning',
        warnings: [
          {
            id: 'warn_001',
            type: 'security',
            severity: 'high',
            message: 'Table "user_profiles" missing RLS policy',
            details: 'Row Level Security is not enabled for sensitive user data',
            autoFixable: true,
            estimatedImpact: 'Security vulnerability'
          },
          {
            id: 'warn_002',
            type: 'performance',
            severity: 'medium',
            message: 'Missing index on deployments.created_at',
            details: 'Queries on this column may be slow',
            autoFixable: true,
            estimatedImpact: 'Query performance degradation'
          }
        ],
        errors: [
          {
            id: 'err_001',
            type: 'configuration',
            severity: 'medium',
            message: 'Email service not configured',
            resolution: 'Set SENDGRID_API_KEY environment variable',
            occurrences: 1,
            firstSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
            lastSeen: new Date()
          }
        ],
        performanceMetrics: {
          queryLatency: 125,
          connectionCount: 45,
          cpuUsage: 68,
          memoryUsage: 72,
          diskUsage: 34,
          apiResponseTime: 180,
          errorRate: 1.2,
          throughput: 234
        },
        lastScan: new Date(),
        autoFixAvailable: true,
        recommendedActions: [
          {
            id: 'action_001',
            type: 'fix',
            priority: 'high',
            description: 'Enable RLS for user_profiles table',
            estimatedTime: '< 5 minutes',
            environmentalBenefit: 0,
            communityImpact: 'Improved data security',
            autoExecutable: true
          },
          {
            id: 'action_002',
            type: 'optimize',
            priority: 'medium',
            description: 'Add database index for better performance',
            estimatedTime: '10 minutes',
            environmentalBenefit: 3,
            communityImpact: 'Faster query responses',
            autoExecutable: true
          }
        ]
      };

      setDiagnostics(mockDiagnostics);
    } catch (error) {
      console.error('Failed to load diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeAutoFix = async () => {
    if (!diagnostics) return;

    setAutoFixing(true);
    try {
      // In real implementation, would call SupabaseDiagnosticsService.autoFixIssues
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate fix process
      
      // Reload diagnostics after fixes
      await loadDiagnostics();
    } catch (error) {
      console.error('Auto-fix failed:', error);
    } finally {
      setAutoFixing(false);
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading diagnostics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!diagnostics) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="mt-2 text-sm text-muted-foreground">Failed to load diagnostics</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Health Status Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getHealthStatusIcon(diagnostics.healthStatus)}
              Supabase Health Monitor
            </div>
            <Badge className={getHealthStatusColor(diagnostics.healthStatus)}>
              {diagnostics.healthStatus}
            </Badge>
          </CardTitle>
          <CardDescription>
            Instance: {diagnostics.instanceId} • Last scan: {diagnostics.lastScan.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {diagnostics.warnings.length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {diagnostics.errors.length}
              </div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {diagnostics.recommendedActions.length}
              </div>
              <div className="text-sm text-muted-foreground">Actions</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {diagnostics.autoFixAvailable ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-muted-foreground">Auto-Fix</div>
            </div>
          </div>

          {diagnostics.autoFixAvailable && (
            <div className="mt-4">
              <Button 
                onClick={executeAutoFix}
                disabled={autoFixing}
                className="w-full"
              >
                {autoFixing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Applying Fixes...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Apply Auto-Fixes ({diagnostics.warnings.filter(w => w.autoFixable).length} available)
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Database className="h-4 w-4" />
                Query Latency
              </div>
              <div className="text-xl font-bold">
                {diagnostics.performanceMetrics.queryLatency}ms
              </div>
              <Progress 
                value={Math.min(diagnostics.performanceMetrics.queryLatency / 5, 100)} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Cpu className="h-4 w-4" />
                CPU Usage
              </div>
              <div className="text-xl font-bold">
                {diagnostics.performanceMetrics.cpuUsage.toFixed(1)}%
              </div>
              <Progress 
                value={diagnostics.performanceMetrics.cpuUsage} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <HardDrive className="h-4 w-4" />
                Memory Usage
              </div>
              <div className="text-xl font-bold">
                {diagnostics.performanceMetrics.memoryUsage.toFixed(1)}%
              </div>
              <Progress 
                value={diagnostics.performanceMetrics.memoryUsage} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4" />
                Throughput
              </div>
              <div className="text-xl font-bold">
                {diagnostics.performanceMetrics.throughput}
              </div>
              <div className="text-xs text-muted-foreground">requests/min</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {diagnostics.warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Warnings ({diagnostics.warnings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {diagnostics.warnings.map((warning) => (
                <div
                  key={warning.id}
                  className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(warning.severity)}>
                          {warning.severity}
                        </Badge>
                        <Badge variant="outline">
                          {warning.type}
                        </Badge>
                        {warning.autoFixable && (
                          <Badge className="bg-green-100 text-green-800">
                            Auto-fixable
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-yellow-800">
                        {warning.message}
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {warning.details}
                      </p>
                      <p className="text-xs text-yellow-600">
                        Impact: {warning.estimatedImpact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Actions */}
      {diagnostics.recommendedActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {diagnostics.recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`
                        ${action.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}
                      `}>
                        {action.priority} priority
                      </Badge>
                      <Badge variant="outline">
                        {action.type}
                      </Badge>
                      {action.autoExecutable && (
                        <Badge className="bg-green-100 text-green-800">
                          Auto-executable
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium">
                      {action.description}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      Time: {action.estimatedTime} • Impact: {action.communityImpact}
                    </div>
                  </div>
                  
                  {action.autoExecutable && (
                    <Button size="sm" variant="outline">
                      Execute
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};