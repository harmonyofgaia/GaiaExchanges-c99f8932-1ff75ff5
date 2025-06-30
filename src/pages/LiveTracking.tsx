
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, TrendingUp, BarChart3, Globe } from 'lucide-react'

const LiveTracking = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900/20 to-cyan-900/20">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-cyan-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-3xl">
              <Activity className="h-8 w-8" />
              📊 Live Tracking Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">$2.47M</div>
                <div className="text-sm text-muted-foreground">Market Cap</div>
              </div>
              <div className="p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">847K</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                Real-Time Analytics
              </h2>
              <Badge className="bg-green-600">
                <Activity className="h-3 w-3 mr-1" />
                LIVE DATA STREAMING
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveTracking
