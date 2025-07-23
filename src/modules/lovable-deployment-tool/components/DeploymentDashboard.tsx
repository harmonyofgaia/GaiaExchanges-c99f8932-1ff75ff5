/**
 * Deployment Dashboard Component
 * Main dashboard for managing deployments with community approval workflow
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Rocket, 
  Shield, 
  Users, 
  Leaf,
  Settings,
  BarChart3
} from 'lucide-react';
import type { Deployment, SupabaseDiagnostics } from '../interfaces';

interface DeploymentDashboardProps {
  className?: string;
}

export const DeploymentDashboard: React.FC<DeploymentDashboardProps> = ({ className }) => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [supabaseDiagnostics, setSupabaseDiagnostics] = useState<SupabaseDiagnostics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load recent deployments and diagnostics
      // In real implementation, would call actual services
      const mockDeployments: Deployment[] = [
        {
          id: 'deploy_001',
          version: 'v2.1.3',
          timestamp: new Date(),
          status: 'approved',
          changes: [],
          targets: ['vercel', 'netlify'],
          createdBy: 'user_123',
          approvals: [],
          riskAssessment: {
            overallRisk: 'low',
            factors: [],
            mitigationStrategies: [],
            aiConfidence: 85,
            historicalPatterns: [],
            recommendedActions: []
          },
          impactScore: {
            overall: 88,
            communitySatisfaction: 90,
            performanceImpact: 85,
            environmentalBenefit: 92,
            innovationRecognition: 80,
            longTermValue: 87,
            lastUpdated: new Date(),
            breakdown: []
          },
          rollbackAvailable: true
        }
      ];

      const mockDiagnostics: SupabaseDiagnostics = {
        instanceId: 'gaia-prod',
        healthStatus: 'healthy',
        warnings: [],
        errors: [],
        performanceMetrics: {
          queryLatency: 45,
          connectionCount: 23,
          cpuUsage: 35,
          memoryUsage: 42,
          diskUsage: 28,
          apiResponseTime: 120,
          errorRate: 0.1,
          throughput: 456
        },
        lastScan: new Date(),
        autoFixAvailable: false,
        recommendedActions: []
      };

      setDeployments(mockDeployments);
      setSupabaseDiagnostics(mockDiagnostics);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'deployed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
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
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading deployment dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lovable Deployment Tool</h1>
          <p className="text-muted-foreground">
            Additive-only deployment with community approval workflow
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm">
            <Rocket className="h-4 w-4 mr-2" />
            New Deployment
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Approvals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-15%</div>
            <p className="text-xs text-muted-foreground">Carbon footprint reduction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supabaseDiagnostics?.healthStatus === 'healthy' ? '100%' : '85%'}
            </div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Deployments
          </CardTitle>
          <CardDescription>
            Track deployment status and community approval progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <div
                key={deployment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(deployment.status)}
                  <div>
                    <h4 className="font-semibold">{deployment.version}</h4>
                    <p className="text-sm text-muted-foreground">
                      {deployment.createdBy} • {deployment.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Lovability</div>
                    <div className="text-lg font-bold text-green-600">
                      {deployment.impactScore.overall}%
                    </div>
                  </div>

                  <Badge className={getStatusColor(deployment.status)}>
                    {deployment.status}
                  </Badge>

                  <Badge className={getRiskColor(deployment.riskAssessment.overallRisk)}>
                    {deployment.riskAssessment.overallRisk} risk
                  </Badge>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supabase Health */}
      {supabaseDiagnostics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Supabase Health Monitor
            </CardTitle>
            <CardDescription>
              Real-time diagnostics and auto-fix engine status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Query Latency</div>
                <div className="text-2xl font-bold">
                  {supabaseDiagnostics.performanceMetrics.queryLatency}ms
                </div>
                <Progress 
                  value={Math.min(supabaseDiagnostics.performanceMetrics.queryLatency / 2, 100)} 
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">CPU Usage</div>
                <div className="text-2xl font-bold">
                  {supabaseDiagnostics.performanceMetrics.cpuUsage.toFixed(1)}%
                </div>
                <Progress 
                  value={supabaseDiagnostics.performanceMetrics.cpuUsage} 
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Memory Usage</div>
                <div className="text-2xl font-bold">
                  {supabaseDiagnostics.performanceMetrics.memoryUsage.toFixed(1)}%
                </div>
                <Progress 
                  value={supabaseDiagnostics.performanceMetrics.memoryUsage} 
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Error Rate</div>
                <div className="text-2xl font-bold">
                  {supabaseDiagnostics.performanceMetrics.errorRate.toFixed(2)}%
                </div>
                <Progress 
                  value={supabaseDiagnostics.performanceMetrics.errorRate * 20} 
                  className="h-2"
                />
              </div>
            </div>

            {supabaseDiagnostics.autoFixAvailable && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Auto-fixes available
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  {supabaseDiagnostics.warnings.length} warnings and {supabaseDiagnostics.errors.length} errors can be automatically resolved.
                </p>
                <Button size="sm" className="mt-2">
                  Apply Auto-fixes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};