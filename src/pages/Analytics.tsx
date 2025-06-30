
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Activity, Globe, Zap, Target, Eye } from 'lucide-react'
import { GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

const Analytics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          📊 GAiA ADVANCED ANALYTICS COMMAND CENTER
        </h1>
        <p className="text-xl text-white/90 mt-4 drop-shadow-lg font-semibold">
          Real-time neural data streams • Performance matrix • Environmental impact tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-cyan-500/50 bg-cyan-900/30 backdrop-blur-md shadow-2xl">
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-12 w-12 text-cyan-400 mx-auto mb-4 drop-shadow-lg" />
            <div className="text-3xl font-bold text-cyan-300 drop-shadow-lg">98.7%</div>
            <div className="text-sm text-cyan-100/80 font-medium">Neural Performance</div>
            <Progress value={98.7} className="mt-2" />
            <Badge className="bg-cyan-600 mt-2 shadow-lg">OPTIMAL</Badge>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-900/30 backdrop-blur-md shadow-2xl">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4 drop-shadow-lg" />
            <div className="text-3xl font-bold text-green-300 drop-shadow-lg">+47.8%</div>
            <div className="text-sm text-green-100/80 font-medium">Growth Velocity</div>
            <Progress value={78} className="mt-2" />
            <Badge className="bg-green-600 mt-2 shadow-lg">ACCELERATING</Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-900/30 backdrop-blur-md shadow-2xl">
          <CardContent className="pt-6 text-center">
            <Activity className="h-12 w-12 text-purple-400 mx-auto mb-4 drop-shadow-lg" />
            <div className="text-3xl font-bold text-purple-300 drop-shadow-lg">{formatGaiaNumber(GAIA_METRICS.INITIAL_HOLDERS)}</div>
            <div className="text-sm text-purple-100/80 font-medium">Active Neural Nodes</div>
            <Progress value={85} className="mt-2" />
            <Badge className="bg-purple-600 mt-2 shadow-lg">EXPANDING</Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50 bg-orange-900/30 backdrop-blur-md shadow-2xl">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 text-orange-400 mx-auto mb-4 drop-shadow-lg" />
            <div className="text-3xl font-bold text-orange-300 drop-shadow-lg">89</div>
            <div className="text-sm text-orange-100/80 font-medium">Global Reach</div>
            <Progress value={92} className="mt-2" />
            <Badge className="bg-orange-600 mt-2 shadow-lg">WORLDWIDE</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/50 bg-blue-900/30 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-300 text-xl">
              <Zap className="h-6 w-6" />
              🧠 NEURAL MATRIX ANALYTICS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100 font-medium">Dragon Power Index:</span>
                <span className="text-blue-300 font-bold">{GAIA_METRICS.DRAGON_POWER}%</span>
              </div>
              <Progress value={GAIA_METRICS.DRAGON_POWER} className="" />
              
              <div className="flex justify-between items-center">
                <span className="text-blue-100 font-medium">Ecosystem Health:</span>
                <span className="text-green-300 font-bold">{GAIA_METRICS.ECOSYSTEM_HEALTH}%</span>
              </div>
              <Progress value={GAIA_METRICS.ECOSYSTEM_HEALTH} className="" />
              
              <div className="flex justify-between items-center">
                <span className="text-blue-100 font-medium">Network Speed:</span>
                <span className="text-purple-300 font-bold">{GAIA_METRICS.NETWORK_SPEED}%</span>
              </div>
              <Progress value={GAIA_METRICS.NETWORK_SPEED} className="" />
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              OPTIMIZE NEURAL PATHWAYS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/50 bg-emerald-900/30 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-300 text-xl">
              <Eye className="h-6 w-6" />
              🌍 ENVIRONMENTAL IMPACT MATRIX
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded bg-green-800/20 border border-green-500/20">
                <div className="text-2xl font-bold text-green-300">2,847</div>
                <div className="text-xs text-green-100/80">Trees Planted</div>
              </div>
              <div className="text-center p-3 rounded bg-blue-800/20 border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-300">1,653</div>
                <div className="text-xs text-blue-100/80">Ocean Cleanup</div>
              </div>
              <div className="text-center p-3 rounded bg-purple-800/20 border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-300">934</div>
                <div className="text-xs text-purple-100/80">Wildlife Protected</div>
              </div>
              <div className="text-center p-3 rounded bg-orange-800/20 border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-300">12.4T</div>
                <div className="text-xs text-orange-100/80">CO2 Offset</div>
              </div>
            </div>
            
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg">
              <Globe className="h-4 w-4 mr-2" />
              EXPAND ENVIRONMENTAL IMPACT
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
