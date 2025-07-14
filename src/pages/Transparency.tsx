
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Shield, Activity, DollarSign, TrendingUp } from 'lucide-react'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { LiveWalletMonitor } from '@/components/LiveWalletMonitor'
import { GAIA_TOKEN } from '@/constants/gaia'

const Transparency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-green-900/20 relative overflow-hidden">
      {/* Matrix Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg h-full w-full"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            🔥 LIVE TRANSPARENCY CENTER
          </h1>
          <p className="text-muted-foreground">
            Real-time GAiA token monitoring with live blockchain data
          </p>
          <div className="text-sm text-green-400 mt-2">
            Connected to: {GAIA_TOKEN.CONTRACT_ADDRESS}
          </div>
        </div>

        {/* Live Wallet Monitor */}
        <div className="mb-8">
          <LiveWalletMonitor />
        </div>

        {/* Matrix Wallet Display */}
        <div className="mb-8">
          <MatrixWalletDisplay />
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-6 text-center">
              <Activity className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-2">Live Transactions</h3>
              <div className="text-2xl font-bold text-white">Real-Time</div>
              <p className="text-sm text-muted-foreground">
                Every GAiA transaction monitored
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-6 text-center">
              <DollarSign className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-400 mb-2">Wallet Balance</h3>
              <div className="text-2xl font-bold text-white">Live Updates</div>
              <p className="text-sm text-muted-foreground">
                Real balance from blockchain
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-400 mb-2">Market Data</h3>
              <div className="text-2xl font-bold text-white">Pump.fun Live</div>
              <p className="text-sm text-muted-foreground">
                Direct API connection
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="pt-6 text-center">
            <Eye className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">100% Live Transparency</h3>
            <p className="text-muted-foreground mb-4">
              Complete transparency with live blockchain verification and Matrix-powered monitoring
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-sm text-cyan-300 space-y-2">
                <div>🔗 Real-time blockchain connection active</div>
                <div>📊 Live transaction monitoring enabled</div>
                <div>🛡️ Matrix-powered security verification</div>
                <div>💎 Direct Pump.fun integration active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .matrix-bg {
          background: 
            radial-gradient(circle at 20% 50%, cyan 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, cyan 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, blue 1px, transparent 1px),
            radial-gradient(circle at 60% 60%, green 1px, transparent 1px);
          background-size: 50px 50px, 60px 60px, 70px 70px, 80px 80px;
          animation: matrix-flow 20s linear infinite;
        }
        
        @keyframes matrix-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }
      `}</style>
    </div>
  )
}

export default Transparency
