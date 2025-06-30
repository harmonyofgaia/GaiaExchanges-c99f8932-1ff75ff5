
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Wallet, Send, ArrowDown, TrendingUp, Shield, Eye, Zap } from 'lucide-react'
import { GAIA_TOKEN, GAIA_METRICS } from '@/constants/gaia'

const WalletPage = () => {
  const walletBalance = 50000.75
  const usdValue = 125000.50

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
            💰 GAiA Quantum Wallet
          </h1>
          <p className="text-xl text-muted-foreground">
            Secure digital asset management with quantum protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                GAiA Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {walletBalance.toLocaleString()} GAiA
              </div>
              <div className="text-lg text-green-400">
                ≈ ${usdValue.toLocaleString()} USD
              </div>
              <Badge className="bg-green-600 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.7% 24h
              </Badge>
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Security Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-sm text-muted-foreground mb-2">Quantum Protected</div>
              <Progress value={100} className="h-2" />
              <Badge className="bg-blue-600 mt-2">
                <Eye className="h-3 w-3 mr-1" />
                Admin Access Verified
              </Badge>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Send GAiA
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowDown className="h-4 w-4 mr-2" />
                Receive GAiA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Token Information */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-green-400">🌍 GAiA Token Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Name:</span>
                  <span className="text-white font-mono">{GAIA_TOKEN.NAME}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol:</span>
                  <span className="text-green-400 font-mono">{GAIA_TOKEN.SYMBOL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply:</span>
                  <span className="text-blue-400 font-mono">{GAIA_METRICS.totalSupply.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="text-purple-400 font-mono">{GAIA_TOKEN.NETWORK}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract:</span>
                  <code className="text-xs text-orange-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WalletPage
