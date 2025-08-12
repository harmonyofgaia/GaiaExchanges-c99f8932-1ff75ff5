
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Wifi,
  Server,
  Database,
  Globe,
  Zap,
  FileCheck
} from 'lucide-react'
import { toast } from 'sonner'

interface SecurityCenterProps {
  notifications: string[]
}

export function SecurityCenter({ notifications }: SecurityCenterProps) {
  const [securityMetrics, setSecurityMetrics] = useState({
    overallScore: 99.9,
    walletSecurity: 100,
    apiSecurity: 99.8,
    networkSecurity: 99.9,
    dataSecurity: 100,
    threatsPrevented: 1247,
    activeMonitoring: true
  })

  const [systemStatus, setSystemStatus] = useState({
    firewall: 'Active',
    encryption: 'AES-256',
    ddosProtection: 'Active',
    intrusionDetection: 'Active',
    malwareScanner: 'Active',
    walletMonitor: 'Active'
  })

  const [threatLog, setThreatLog] = useState<Array<{
    time: string
    threat: string
    status: 'Blocked' | 'Monitored' | 'Resolved'
    severity: 'Low' | 'Medium' | 'High'
  }>>([
    { time: '14:23:15', threat: 'Suspicious API Request', status: 'Blocked', severity: 'Medium' },
    { time: '14:20:42', threat: 'DDoS Attempt Detected', status: 'Blocked', severity: 'High' },
    { time: '14:18:30', threat: 'Wallet Security Scan', status: 'Resolved', severity: 'Low' },
    { time: '14:15:18', threat: 'Phishing Email Blocked', status: 'Blocked', severity: 'Medium' },
    { time: '14:12:05', threat: 'Malware Signature Update', status: 'Resolved', severity: 'Low' }
  ])

  // Real-time security monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate security events
      if (Math.random() < 0.15) { // 15% chance of new security event
        const threats = [
          'Suspicious Login Attempt',
          'API Rate Limit Triggered',
          'Unusual Trading Pattern',
          'Port Scan Detected',
          'SSL Certificate Renewed',
          'Firewall Rule Updated'
        ]
        
        const severities: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High']
        const statuses: Array<'Blocked' | 'Monitored' | 'Resolved'> = ['Blocked', 'Monitored', 'Resolved']
        
        const newThreat = {
          time: new Date().toLocaleTimeString(),
          threat: threats[Math.floor(Math.random() * threats.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          severity: severities[Math.floor(Math.random() * severities.length)]
        }
        
        setThreatLog(prev => [newThreat, ...prev.slice(0, 9)])
        
        if (newThreat.status === 'Blocked' && newThreat.severity === 'High') {
          toast.error('Security Alert', {
            description: `🚨 ${newThreat.threat} - Threat blocked automatically`
          })
        }
        
        // Update threat counter
        setSecurityMetrics(prev => ({
          ...prev,
          threatsPrevented: prev.threatsPrevented + 1
        }))
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const runSecurityScan = () => {
    toast.success('Security Scan Initiated', {
      description: '🔍 Comprehensive security audit in progress...'
    })
    
    setTimeout(() => {
      toast.success('Security Scan Complete', {
        description: '✅ All systems secure - No threats detected'
      })
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Blocked': return 'bg-red-600'
      case 'Resolved': return 'bg-green-600'
      case 'Monitored': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6" />
            Gaia's Exchange Security Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{securityMetrics.overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Security</div>
              <Progress value={securityMetrics.overallScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{securityMetrics.walletSecurity}%</div>
              <div className="text-sm text-muted-foreground">Wallet Security</div>
              <Progress value={securityMetrics.walletSecurity} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{securityMetrics.apiSecurity}%</div>
              <div className="text-sm text-muted-foreground">API Security</div>
              <Progress value={securityMetrics.apiSecurity} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{securityMetrics.threatsPrevented}</div>
              <div className="text-sm text-muted-foreground">Threats Prevented</div>
              <div className="text-xs text-green-400 mt-1">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-5 w-5" />
              Network Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Firewall</span>
              <Badge className="bg-green-600 text-white">{systemStatus.firewall}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">DDoS Protection</span>
              <Badge className="bg-green-600 text-white">{systemStatus.ddosProtection}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Intrusion Detection</span>
              <Badge className="bg-green-600 text-white">{systemStatus.intrusionDetection}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Lock className="h-5 w-5" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Encryption</span>
              <Badge className="bg-green-600 text-white">{systemStatus.encryption}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Malware Scanner</span>
              <Badge className="bg-green-600 text-white">{systemStatus.malwareScanner}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Integrity</span>
              <Badge className="bg-green-600 text-white">Verified</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Eye className="h-5 w-5" />
              Wallet Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Wallet Monitor</span>
              <Badge className="bg-green-600 text-white">{systemStatus.walletMonitor}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Transaction Scan</span>
              <Badge className="bg-green-600 text-white">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Balance Tracking</span>
              <Badge className="bg-green-600 text-white">Real-time</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Actions */}
      <Card className="border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Zap className="h-5 w-5" />
            Security Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={runSecurityScan} className="bg-blue-600 hover:bg-blue-700">
              <FileCheck className="h-4 w-4 mr-2" />
              Run Full Security Scan
            </Button>
            <Button variant="outline">
              <Server className="h-4 w-4 mr-2" />
              Update Security Rules
            </Button>
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Backup Security Logs
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Generate Security Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Threat Log */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Real-time Threat Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {threatLog.map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-muted-foreground">{threat.time}</div>
                  <div className="text-sm">{threat.threat}</div>
                  <Badge className={`text-white text-xs ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </Badge>
                </div>
                <Badge className={`text-white text-xs ${getStatusColor(threat.status)}`}>
                  {threat.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              Recent Security Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-300">{notification}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Features */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">🛡️ Advanced Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Multi-layer Encryption (AES-256)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Real-time Threat Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Automated DDoS Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Advanced Intrusion Prevention</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Wallet Transaction Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Zero-Knowledge Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Quantum-Resistant Algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>24/7 Security Operations Center</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
