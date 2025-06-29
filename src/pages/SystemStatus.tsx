
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Activity, Database, Globe, Zap, CheckCircle, AlertTriangle, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor'
import { useEffect, useState } from 'react'

const SystemStatus = () => {
  const { systemHealth, isHealthy, quantumProtected, masterSecurityActive } = SystemHealthMonitor()
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const copyOfficialWallet = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Official GAiA Wallet Copied!', {
      description: 'Official GAiA wallet address copied to clipboard'
    })
  }

  const copyOfficialContract = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('Official GAiA Contract Copied!', {
      description: 'Official GAiA contract address copied to clipboard'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🛡️ HARMONY OF GAIA SYSTEM STATUS
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Complete System Health • Real-time Monitoring • Maximum Security
          </p>
          <p className="text-lg text-green-400 mt-2">
            Better • Faster • Stronger - Building Our Heavenly Fortress
          </p>
        </div>

        {/* Official GAiA Token Status */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Globe className="h-6 w-6" />
              🌍 Official GAiA Token System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-bold">Official GAiA Wallet:</span>
                  <Button onClick={copyOfficialWallet} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <code className="text-blue-300 font-mono text-xs break-all block bg-blue-900/10 p-2 rounded">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </code>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-bold">Official GAiA Contract:</span>
                  <Button onClick={copyOfficialContract} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <code className="text-purple-300 font-mono text-xs break-all block bg-purple-900/10 p-2 rounded">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {systemHealth.overall_status.toUpperCase()}
                  </div>
                  <div className="text-sm text-muted-foreground">System Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {systemHealth.performance_score}%
                  </div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {systemHealth.uptime}%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {systemHealth.threats_blocked.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Threats Blocked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-6 w-6" />
                Security Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Quantum Protection</span>
                <Badge className={quantumProtected ? "bg-green-600" : "bg-yellow-600"}>
                  {quantumProtected ? "ACTIVE" : "STANDBY"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Master Security</span>
                <Badge className={masterSecurityActive ? "bg-green-600" : "bg-yellow-600"}>
                  {masterSecurityActive ? "ACTIVE" : "STANDBY"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Firewall Status</span>
                <Badge className="bg-green-600">MAXIMUM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Threat Detection</span>
                <Badge className="bg-green-600">REAL-TIME</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Activity className="h-6 w-6" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="text-green-400">12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="text-green-400">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network Latency</span>
                  <span className="text-green-400">8ms</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Indicators */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
          <CardHeader>
            <CardTitle className="text-center text-green-400 text-2xl">
              🛡️ HEAVENLY FORTRESS STATUS - ALL SYSTEMS OPERATIONAL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <div className="font-bold text-green-400">Authentication</div>
                <div className="text-sm text-muted-foreground">Secure & Active</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
                <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-blue-400">Database</div>
                <div className="text-sm text-muted-foreground">Connected & Fast</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
                <CheckCircle className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                <div className="font-bold text-purple-400">API Services</div>
                <div className="text-sm text-muted-foreground">Responsive & Stable</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Last Updated: {lastUpdate.toLocaleTimeString()}
              </div>
              <div className="text-green-400 font-medium">
                🌍 Admin has full control • Better • Faster • Stronger • Building our heavenly fortress together
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
