
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Globe, Zap, Users } from 'lucide-react'

const LiveTracking = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          📊 Live Tracking Center
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Real-time monitoring • Network activity • Environmental impact tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="pt-6 text-center">
            <Activity className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
            <Badge className="bg-cyan-600 mt-2">Live</Badge>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-green-400">47</div>
            <div className="text-sm text-muted-foreground">Countries</div>
            <Badge className="bg-green-600 mt-2">Global</Badge>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="pt-6 text-center">
            <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-yellow-400">2,847</div>
            <div className="text-sm text-muted-foreground">Tokens Burned</div>
            <Badge className="bg-yellow-600 mt-2">Impact</Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-purple-400">1,653</div>
            <div className="text-sm text-muted-foreground">Animals Helped</div>
            <Badge className="bg-purple-600 mt-2">Conservation</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveTracking
