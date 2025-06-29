
import { MatrixHarmonyBackground } from '@/components/ui/matrix-harmony-background'
import { EnhancedCoinCrafter } from '@/components/EnhancedCoinCrafter'
import { ComprehensiveTokenTracker } from '@/components/tracking/ComprehensiveTokenTracker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, TrendingUp, Eye, Zap } from 'lucide-react'

const LiveTracking = () => {
  return (
    <div className="min-h-screen relative">
      {/* Enhanced Matrix Background */}
      <MatrixHarmonyBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            📡 ENHANCED LIVE TRACKING SYSTEM
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Real-time dragon-powered tracking with matrix neural networks
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-green-400"><strong>🌍 Matrix Network:</strong> Active with neural pathways</div>
                <div className="text-blue-400"><strong>⚡ Processing Speed:</strong> Quantum-level real-time updates</div>
              </div>
              <div>
                <div className="text-purple-400"><strong>🔗 Connected Markets:</strong> Global integration complete</div>
                <div className="text-orange-400"><strong>🛡️ Security Level:</strong> Dragon-protected maximum encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-6 text-center">
              <Activity className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">ACTIVE</div>
              <div className="text-sm text-muted-foreground">Matrix Network</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">LIVE</div>
              <div className="text-sm text-muted-foreground">Market Data</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="pt-6 text-center">
              <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">TRACKING</div>
              <div className="text-sm text-muted-foreground">All Assets</div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">POWERED</div>
              <div className="text-sm text-muted-foreground">Dragon Energy</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Coin Crafter */}
        <div className="mb-8">
          <EnhancedCoinCrafter />
        </div>

        {/* Comprehensive Token Tracker */}
        <ComprehensiveTokenTracker />
      </div>
    </div>
  )
}

export default LiveTracking
