
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Activity,
  Globe,
  Cpu,
  Database,
  Network
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function GAiAConsistencyStatus() {
  const [systemHealth, setSystemHealth] = useState({
    overallHealth: 96,
    tokenConsistency: 98,
    blockchainSync: 99,
    apiResponses: 94,
    dataIntegrity: 97,
    communityNodes: 156,
    activeValidators: 42,
    networkLatency: 85
  })

  const [alerts, setAlerts] = useState([
    { type: 'info', message: 'Network optimization in progress', time: '5 min ago' },
    { type: 'warning', message: 'High traffic detected on European nodes', time: '12 min ago' },
    { type: 'success', message: 'Token validation completed successfully', time: '25 min ago' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        overallHealth: Math.min(100, prev.overallHealth + Math.floor(Math.random() * 3) - 1),
        tokenConsistency: Math.min(100, prev.tokenConsistency + Math.floor(Math.random() * 2) - 1),
        blockchainSync: Math.min(100, prev.blockchainSync + Math.floor(Math.random() * 1)),
        apiResponses: Math.max(85, prev.apiResponses + Math.floor(Math.random() * 4) - 2),
        dataIntegrity: Math.min(100, prev.dataIntegrity + Math.floor(Math.random() * 2) - 1),
        networkLatency: Math.max(70, prev.networkLatency + Math.floor(Math.random() * 6) - 3)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-400'
    if (score >= 85) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getHealthBadge = (score: number) => {
    if (score >= 95) return 'bg-green-600'
    if (score >= 85) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🛡️ GAiA Consistency Status
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time system health monitoring and blockchain consistency tracking
          </p>
        </div>

        {/* Overall Health Status */}
        <Card className="mb-8 bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              System Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getHealthColor(systemHealth.overallHealth)}`}>
                  <AnimatedCounter value={systemHealth.overallHealth} />%
                </div>
                <div className="text-sm text-muted-foreground">Overall Health</div>
                <Badge className={`${getHealthBadge(systemHealth.overallHealth)} text-white mt-2`}>
                  {systemHealth.overallHealth >= 95 ? 'Excellent' : 
                   systemHealth.overallHealth >= 85 ? 'Good' : 'Degraded'}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-lg font-bold text-green-400">Active</span>
                </div>
                <div className="text-sm text-muted-foreground">System Status</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  <AnimatedCounter value={systemHealth.communityNodes} />
                </div>
                <div className="text-sm text-muted-foreground">Community Nodes</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  <AnimatedCounter value={systemHealth.activeValidators} />
                </div>
                <div className="text-sm text-muted-foreground">Active Validators</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Database className="h-5 w-5" />
                Token & Blockchain Consistency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Token Consistency</span>
                  <span className={`font-bold ${getHealthColor(systemHealth.tokenConsistency)}`}>
                    {systemHealth.tokenConsistency}%
                  </span>
                </div>
                <Progress value={systemHealth.tokenConsistency} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Blockchain Sync</span>
                  <span className={`font-bold ${getHealthColor(systemHealth.blockchainSync)}`}>
                    {systemHealth.blockchainSync}%
                  </span>
                </div>
                <Progress value={systemHealth.blockchainSync} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Data Integrity</span>
                  <span className={`font-bold ${getHealthColor(systemHealth.dataIntegrity)}`}>
                    {systemHealth.dataIntegrity}%
                  </span>
                </div>
                <Progress value={systemHealth.dataIntegrity} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Network className="h-5 w-5" />
                Network Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">API Response Time</span>
                  <span className={`font-bold ${getHealthColor(systemHealth.apiResponses)}`}>
                    {systemHealth.apiResponses}%
                  </span>
                </div>
                <Progress value={systemHealth.apiResponses} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Network Latency</span>
                  <span className={`font-bold ${getHealthColor(systemHealth.networkLatency)}`}>
                    {systemHealth.networkLatency}ms
                  </span>
                </div>
                <Progress value={100 - (systemHealth.networkLatency - 50)} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-800/30 rounded-lg">
                  <Globe className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-400">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-3 bg-blue-800/30 rounded-lg">
                  <Cpu className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-400">47ms</div>
                  <div className="text-xs text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Activity className="h-5 w-5" />
              System Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
                    {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                    {alert.type === 'info' && <Shield className="h-5 w-5 text-blue-400" />}
                    <span className="text-white">{alert.message}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
