
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield
} from 'lucide-react'

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
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">System Load</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminMetrics.systemLoad.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Optimal performance range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Server Uptime</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminMetrics.serverUptime}%</div>
              <p className="text-xs text-muted-foreground">Maximum reliability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Security Status</CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">SECURE</div>
              <p className="text-xs text-muted-foreground">{adminMetrics.securityThreats} threats blocked</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="users" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Users:</span>
                <Badge className="bg-blue-600">{adminMetrics.totalUsers.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active Users:</span>
                <Badge className="bg-green-600">{adminMetrics.activeUsers.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Growth Rate:</span>
                <Badge className="bg-purple-600">+2.3% daily</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="transactions" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Transaction Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {adminMetrics.totalTransactions.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">847</div>
                <div className="text-sm text-muted-foreground">Transactions Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$2.4M</div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="alerts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Real-time System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {realTimeAlerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{alert}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {realTimeAlerts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">All systems operating normally</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
