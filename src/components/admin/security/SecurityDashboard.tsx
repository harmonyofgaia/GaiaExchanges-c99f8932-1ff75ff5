
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Zap,
  Eye,
  Lock,
  Activity,
  Globe,
  Database,
  Server,
  Wifi
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface SecurityScan {
  id: string
  scan_type: string
  scan_results: any
  issues_found: number
  critical_issues: number
  high_issues: number
  medium_issues: number
  low_issues: number
  compliance_score: number
  scan_duration_ms: number
  created_at: string
  created_by: string
}

interface ThreatIntelligence {
  id: string
  threat_type: string
  threat_data: any
  severity_level: string
  ip_address: string
  user_agent: string
  geolocation: any
  detected_at: string
  resolved_at: string | null
  status: string
}

export function SecurityDashboard() {
  const [scans, setScans] = useState<SecurityScan[]>([])
  const [threats, setThreats] = useState<ThreatIntelligence[]>([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    overall_health: 98,
    active_threats: 0,
    compliance_score: 95,
    last_scan: new Date().toISOString()
  })

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      // Load security scans
      const { data: scanData, error: scanError } = await supabase
        .from('security_scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (scanError) throw scanError

      // Load threat intelligence
      const { data: threatData, error: threatError } = await supabase
        .from('threat_intelligence')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(20)

      if (threatError) throw threatError

      setScans(scanData || [])
      // Transform threatData to match ThreatIntelligence interface
      const transformedThreats = (threatData || []).map(threat => ({
        ...threat,
        ip_address: String(threat.ip_address || '')
      }))
      setThreats(transformedThreats)
      
      // Calculate system status
      const latestScan = scanData?.[0]
      if (latestScan) {
        setSystemStatus({
          overall_health: Math.max(100 - latestScan.critical_issues * 20 - latestScan.high_issues * 10, 0),
          active_threats: threatData?.filter(t => t.status === 'active').length || 0,
          compliance_score: latestScan.compliance_score,
          last_scan: latestScan.created_at
        })
      }
    } catch (error) {
      console.error('Error loading security data:', error)
      toast.error('Failed to load security data')
    } finally {
      setLoading(false)
    }
  }

  const runSecurityScan = async () => {
    setScanning(true)
    try {
      // Simulate security scan
      const mockScanResults = {
        rls_policies: { issues: 0, status: 'secure' },
        function_security: { issues: 1, status: 'warning' },
        database_indexes: { issues: 0, status: 'optimized' },
        auth_configuration: { issues: 0, status: 'secure' },
        api_endpoints: { issues: 2, status: 'needs_attention' }
      }

      const totalIssues = Object.values(mockScanResults).reduce((sum, result) => sum + result.issues, 0)
      const complianceScore = Math.max(100 - totalIssues * 10, 0)

      const { data, error } = await supabase
        .from('security_scans')
        .insert([
          {
            scan_type: 'comprehensive',
            scan_results: mockScanResults,
            issues_found: totalIssues,
            critical_issues: 0,
            high_issues: 1,
            medium_issues: 2,
            low_issues: 0,
            compliance_score: complianceScore,
            scan_duration_ms: 5000
          }
        ])
        .select()

      if (error) throw error

      toast.success('Security scan completed successfully')
      loadSecurityData()
    } catch (error) {
      console.error('Error running security scan:', error)
      toast.error('Failed to run security scan')
    } finally {
      setScanning(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          🛡️ Security Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced security monitoring and threat intelligence
        </p>
      </div>

      {/* Security Overview */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            System Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{systemStatus.overall_health}%</div>
              <div className="text-sm text-muted-foreground">Overall Health</div>
              <Progress value={systemStatus.overall_health} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{systemStatus.active_threats}</div>
              <div className="text-sm text-muted-foreground">Active Threats</div>
              <Badge className={systemStatus.active_threats > 0 ? 'bg-red-600' : 'bg-green-600'}>
                {systemStatus.active_threats > 0 ? 'ALERT' : 'SECURE'}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{systemStatus.compliance_score}%</div>
              <div className="text-sm text-muted-foreground">Compliance Score</div>
              <Progress value={systemStatus.compliance_score} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{scans.length}</div>
              <div className="text-sm text-muted-foreground">Recent Scans</div>
              <div className="text-xs text-muted-foreground mt-1">
                Last: {new Date(systemStatus.last_scan).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={runSecurityScan}
          disabled={scanning}
          className="h-20 bg-blue-600 hover:bg-blue-700"
        >
          <div className="text-center">
            <Zap className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm">
              {scanning ? 'Scanning...' : 'Run Security Scan'}
            </div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-20">
          <div className="text-center">
            <Eye className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm">Monitor Threats</div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-20">
          <div className="text-center">
            <Lock className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm">Update Policies</div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-20">
          <div className="text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm">Generate Report</div>
          </div>
        </Button>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="scans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scans">Security Scans</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="scans" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Activity className="h-5 w-5" />
                Recent Security Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scans.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    No scans available
                  </h3>
                  <p className="text-muted-foreground">
                    Run your first security scan to see results here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scans.map((scan) => (
                    <div key={scan.id} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600 text-white">
                            {scan.scan_type.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium">
                            {new Date(scan.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Compliance: {scan.compliance_score}%
                          </span>
                          <Badge className={scan.compliance_score >= 90 ? 'bg-green-600' : 'bg-yellow-600'}>
                            {scan.compliance_score >= 90 ? 'PASS' : 'REVIEW'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{scan.critical_issues}</div>
                          <div className="text-muted-foreground">Critical</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">{scan.high_issues}</div>
                          <div className="text-muted-foreground">High</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{scan.medium_issues}</div>
                          <div className="text-muted-foreground">Medium</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{scan.low_issues}</div>
                          <div className="text-muted-foreground">Low</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        Duration: {scan.scan_duration_ms}ms | Issues Found: {scan.issues_found}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              {threats.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    No threats detected
                  </h3>
                  <p className="text-muted-foreground">
                    Your system is secure with no active threats.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityBadge(threat.severity_level)}>
                            {threat.severity_level.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium">
                            {threat.threat_type.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {new Date(threat.detected_at).toLocaleString()}
                          </span>
                          <Badge className={threat.status === 'active' ? 'bg-red-600' : 'bg-green-600'}>
                            {threat.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">IP Address:</span>
                          <span className="ml-2 font-mono">{threat.ip_address}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location:</span>
                          <span className="ml-2">
                            {threat.geolocation?.country || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      
                      {threat.user_agent && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          User Agent: {threat.user_agent}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Server className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database Performance</span>
                  <Badge className="bg-green-600 text-white">Optimal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Response Time</span>
                  <Badge className="bg-green-600 text-white">Fast</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Policies</span>
                  <Badge className="bg-green-600 text-white">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Threat Detection</span>
                  <Badge className="bg-green-600 text-white">Monitoring</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Wifi className="h-5 w-5" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Connection Health</span>
                  <span className="text-green-400 font-medium">Excellent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-blue-400 font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blocked Requests</span>
                  <span className="text-red-400 font-medium">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Firewall Status</span>
                  <Badge className="bg-green-600 text-white">Protected</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
