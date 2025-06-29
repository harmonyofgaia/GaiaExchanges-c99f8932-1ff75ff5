
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Zap, 
  Globe, 
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Server,
  Database,
  Wifi,
  Lock
} from 'lucide-react'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'

const SystemStatus = () => {
  const systemComponents = [
    { name: 'Dragon Core', status: 'operational', uptime: '100%', response: 'ETERNAL' },
    { name: 'Quantum Security', status: 'operational', uptime: '100%', response: 'INSTANT' },
    { name: 'Blockchain Network', status: 'operational', uptime: '99.9%', response: '12ms' },
    { name: 'Trading Engine', status: 'operational', uptime: '99.8%', response: '3ms' },
    { name: 'Wallet Services', status: 'operational', uptime: '100%', response: '5ms' },
    { name: 'API Gateway', status: 'operational', uptime: '99.9%', response: '8ms' },
    { name: 'Database Cluster', status: 'operational', uptime: '100%', response: '2ms' },
    { name: 'CDN Network', status: 'operational', uptime: '99.9%', response: '15ms' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case 'down':
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <Activity className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-600 text-white">OPERATIONAL</Badge>
      case 'degraded':
        return <Badge className="bg-yellow-600 text-white">DEGRADED</Badge>
      case 'down':
        return <Badge className="bg-red-600 text-white">DOWN</Badge>
      default:
        return <Badge variant="secondary">UNKNOWN</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            📊 SYSTEM STATUS DASHBOARD
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of all Harmony of Gaia systems
          </p>
        </div>

        {/* Eternal Dragon Display */}
        <div className="mb-8">
          <EternalDragonDisplay />
        </div>

        {/* Overall System Health */}
        <Card className="border-green-500/30 bg-green-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              Overall System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-muted-foreground">Overall Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">8/8</div>
                <div className="text-sm text-muted-foreground">Services Online</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">5ms</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">0</div>
                <div className="text-sm text-muted-foreground">Active Incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemComponents.map((component, index) => (
            <Card key={index} className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(component.status)}
                    <h3 className="font-semibold text-white">{component.name}</h3>
                  </div>
                  {getStatusBadge(component.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-green-400 font-semibold">{component.uptime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="text-blue-400 font-semibold">{component.response}</span>
                  </div>
                  <Progress value={parseFloat(component.uptime)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Metrics */}
        <Card className="border-purple-500/30 bg-purple-900/20 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Activity className="h-6 w-6" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-green-400">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="text-yellow-400">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network I/O</span>
                  <span className="text-blue-400">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="border-red-500/30 bg-red-900/20 mt-8">
          <CardContent className="pt-6 text-center">
            <Lock className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-400 mb-4">Dragon Security Active</h3>
            <p className="text-muted-foreground">
              All systems protected by quantum-level dragon security protocols
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
