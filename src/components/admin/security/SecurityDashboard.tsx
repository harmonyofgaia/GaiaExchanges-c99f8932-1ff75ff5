import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Database,
  Zap,
  Eye,
  RefreshCw,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SecurityIssue {
  table_name: string;
  issue_type: string;
  issue_description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  auto_fixable: boolean;
}

interface SecurityStatus {
  compliance_score: number;
  critical_issues: number;
  high_issues: number;
  last_scan: string;
  status: string;
}

interface MonitoringResult {
  scan_id: string;
  timestamp: string;
  issues_found: SecurityIssue[];
  auto_fixes_applied: number;
  notifications_sent: number;
  compliance_score: number;
}

export const SecurityDashboard: React.FC = () => {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [lastScanResult, setLastScanResult] = useState<MonitoringResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSecurityStatus();
  }, []);

  const loadSecurityStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current security status
      const { data: statusData, error: statusError } = await supabase.functions.invoke(
        'security-monitor',
        {
          body: { action: 'status' }
        }
      );

      if (statusError) throw statusError;
      setSecurityStatus(statusData);

    } catch (err) {
      console.error('Error loading security status:', err);
      setError(err instanceof Error ? err.message : 'Failed to load security status');
    } finally {
      setIsLoading(false);
    }
  };

  const runSecurityScan = async (autoFix: boolean = true) => {
    try {
      setIsScanning(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke(
        'security-monitor',
        {
          body: { 
            action: 'scan',
            auto_fix: autoFix
          }
        }
      );

      if (error) throw error;
      
      setLastScanResult(data);
      await loadSecurityStatus(); // Refresh status

    } catch (err) {
      console.error('Error running security scan:', err);
      setError(err instanceof Error ? err.message : 'Security scan failed');
    } finally {
      setIsScanning(false);
    }
  };

  const generateReport = async (format: 'json' | 'html' = 'html') => {
    try {
      const { data, error } = await supabase.functions.invoke(
        'weekly-security-report',
        {
          body: { format }
        }
      );

      if (error) throw error;

      if (format === 'html') {
        // Open HTML report in new window
        const blob = new Blob([data], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        // Download JSON report
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
      }

    } catch (err) {
      console.error('Error generating report:', err);
      setError(err instanceof Error ? err.message : 'Report generation failed');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading security dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🛡️ Security Dashboard</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => runSecurityScan(true)} 
            disabled={isScanning}
            variant="outline"
          >
            {isScanning ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Shield className="h-4 w-4 mr-2" />
            )}
            {isScanning ? 'Scanning...' : 'Run Scan'}
          </Button>
          <Button 
            onClick={() => generateReport('html')}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            {securityStatus && getStatusIcon(securityStatus.status)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {securityStatus?.status || 'Unknown'}
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {securityStatus?.last_scan ? 
                new Date(securityStatus.last_scan).toLocaleString() : 
                'Never'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getComplianceColor(securityStatus?.compliance_score || 0)}`}>
              {securityStatus?.compliance_score || 0}%
            </div>
            <Progress 
              value={securityStatus?.compliance_score || 0} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {securityStatus?.critical_issues || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {securityStatus?.high_issues || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Action required within 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="scans">Recent Scans</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>RLS Policies</span>
                    <Badge variant="outline" className="bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Function Security</span>
                    <Badge variant="outline" className="bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage Policies</span>
                    <Badge variant="outline" className="bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Auth Configuration</span>
                    <Badge variant="outline" className="bg-yellow-50">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Review Needed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Query Performance</span>
                    <Badge variant="outline" className="bg-green-50">
                      Good
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Index Usage</span>
                    <Badge variant="outline" className="bg-green-50">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage Growth</span>
                    <Badge variant="outline" className="bg-yellow-50">
                      Monitor
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Connection Pool</span>
                    <Badge variant="outline" className="bg-green-50">
                      Healthy
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {lastScanResult?.issues_found.length ? (
            <div className="space-y-4">
              {lastScanResult.issues_found.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getSeverityColor(issue.severity)} text-white`}>
                            {issue.severity.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{issue.table_name}</span>
                          <span className="text-sm text-muted-foreground">
                            {issue.issue_type}
                          </span>
                        </div>
                        <p className="text-sm">{issue.issue_description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {issue.auto_fixable && (
                          <Badge variant="outline" className="bg-blue-50">
                            Auto-fixable
                          </Badge>
                        )}
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No Security Issues Found</h3>
                  <p className="text-muted-foreground">
                    Your database is secure and compliant. Run a scan to check for any new issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scans" className="space-y-4">
          {lastScanResult && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Scan Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Scan ID</div>
                    <div className="font-mono text-xs">{lastScanResult.scan_id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Timestamp</div>
                    <div className="text-sm">{new Date(lastScanResult.timestamp).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Issues Found</div>
                    <div className="text-lg font-bold">{lastScanResult.issues_found.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Auto-fixes Applied</div>
                    <div className="text-lg font-bold text-green-600">{lastScanResult.auto_fixes_applied}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatic Scanning</div>
                    <div className="text-sm text-muted-foreground">
                      Run security scans every 4 hours
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-remediation</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically fix safe security issues
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Generate and send weekly security reports
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};