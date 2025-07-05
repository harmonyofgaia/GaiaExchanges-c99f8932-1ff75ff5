
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Server, Database, Activity, Shield, Settings, CheckCircle, Lock } from 'lucide-react'

interface SystemHealth {
  server: number
  database: number
  network: number
  security: number
  performance: number
}

interface AdminMetrics {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  serverUptime: number
  securityThreats: number
  systemLoad: number
}

interface AdminMetricsProps {
  systemHealth: SystemHealth
  adminMetrics: AdminMetrics
}

export function AdminMetrics({ systemHealth, adminMetrics }: AdminMetricsProps) {
  const getHealthColor = (value: number) => {
    if (value >= 95) return 'text-green-400'
    if (value >= 85) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <>
      {/* Admin Header */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <h2 className="text-2xl font-bold text-red-400">🔒 ADMIN CONTROL CENTER</h2>
                <p className="text-sm text-muted-foreground">Ultimate system control & monitoring dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-600 text-white animate-pulse">
                <Lock className="h-3 w-3 mr-1" />
                ADMIN MODE
              </Badge>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                ALL SYSTEMS OPTIMAL
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-green-500/30">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <Server className="h-6 w-6 text-green-400 mx-auto" />
              <p className="text-sm text-muted-foreground">Server Health</p>
              <p className={`text-xl font-bold ${getHealthColor(systemHealth.server)}`}>
                {systemHealth.server.toFixed(1)}%
              </p>
              <Progress value={systemHealth.server} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <Database className="h-6 w-6 text-blue-400 mx-auto" />
              <p className="text-sm text-muted-foreground">Database</p>
              <p className={`text-xl font-bold ${getHealthColor(systemHealth.database)}`}>
                {systemHealth.database.toFixed(1)}%
              </p>
              <Progress value={systemHealth.database} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <Activity className="h-6 w-6 text-purple-400 mx-auto" />
              <p className="text-sm text-muted-foreground">Network</p>
              <p className={`text-xl font-bold ${getHealthColor(systemHealth.network)}`}>
                {systemHealth.network.toFixed(1)}%
              </p>
              <Progress value={systemHealth.network} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <Shield className="h-6 w-6 text-red-400 mx-auto" />
              <p className="text-sm text-muted-foreground">Security</p>
              <p className={`text-xl font-bold ${getHealthColor(systemHealth.security)}`}>
                {systemHealth.security.toFixed(1)}%
              </p>
              <Progress value={systemHealth.security} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <Settings className="h-6 w-6 text-yellow-400 mx-auto" />
              <p className="text-sm text-muted-foreground">Performance</p>
              <p className={`text-xl font-bold ${getHealthColor(systemHealth.performance)}`}>
                {systemHealth.performance.toFixed(1)}%
              </p>
              <Progress value={systemHealth.performance} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
