
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AdminMetrics {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  serverUptime: number
  securityThreats: number
  systemLoad: number
}

interface AdminTabsProps {
  adminMetrics: AdminMetrics
  realTimeAlerts: string[]
  handleSystemAction: (action: string) => void
}

export function AdminTabs({ adminMetrics, realTimeAlerts, handleSystemAction }: AdminTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">System Overview</TabsTrigger>
        <TabsTrigger value="security">Security Center</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <Card className="border-orange-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <AlertTriangle className="h-5 w-5" />
              Real-time System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {realTimeAlerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-card/50 border border-border/50">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{alert}</span>
                  <Badge className="ml-auto bg-green-600 text-white text-xs">
                    {new Date().toLocaleTimeString()}
                  </Badge>
                </div>
              ))}
              {realTimeAlerts.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No recent alerts - All systems operating normally
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card className="border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400">🛡️ Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">0</p>
                <p className="text-sm text-muted-foreground">Active Threats</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">100%</p>
                <p className="text-sm text-muted-foreground">Protection Level</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">24/7</p>
                <p className="text-sm text-muted-foreground">Monitoring</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">∞</p>
                <p className="text-sm text-muted-foreground">Security Layers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="performance" className="space-y-6">
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400">⚡ Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">10x</p>
                <p className="text-sm text-muted-foreground">Speed Multiplier</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{adminMetrics.systemLoad.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">System Load</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{adminMetrics.serverUptime}%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">0.1s</p>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Users className="h-5 w-5" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{adminMetrics.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{adminMetrics.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{adminMetrics.totalTransactions.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">98.5%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
