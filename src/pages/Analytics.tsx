
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Activity, Globe } from 'lucide-react'

const Analytics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          📊 GAiA Analytics Dashboard
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Real-time data • Performance metrics • Environmental impact tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-cyan-400">98.7%</div>
            <div className="text-sm text-muted-foreground">System Performance</div>
            <Progress value={98.7} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-green-400">+24.5%</div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
            <Badge className="bg-green-600 mt-2">Increasing</Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-6 text-center">
            <Activity className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-purple-400">1,247</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
            <Badge className="bg-purple-600 mt-2">Online</Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-orange-400">47</div>
            <div className="text-sm text-muted-foreground">Countries</div>
            <Badge className="bg-orange-600 mt-2">Global</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
