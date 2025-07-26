
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, TrendingUp, Coins, Shield } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { GAIA_TOKEN } from '@/constants/gaia'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            💱 {GAIA_TOKEN.SYMBOL} Exchange
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Multi-chain Token Exchange & Trading Platform
            <br />
            <span className="text-sm">Official {GAIA_TOKEN.NAME} - {GAIA_TOKEN.CONTRACT_ADDRESS}</span>
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Coins className="h-3 w-3 mr-1" />
              Zero Fees
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Shield className="h-3 w-3 mr-1" />
              Secure Trading
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Token Exchange
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-black/30 rounded-lg border border-green-500/20">
                    <div className="text-sm text-muted-foreground mb-2">From</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">0.00</div>
                      <Button variant="outline" className="border-green-500/30 text-green-400">
                        {GAIA_TOKEN.SYMBOL}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" size="icon" className="border-blue-500/30 text-blue-400">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-black/30 rounded-lg border border-blue-500/20">
                    <div className="text-sm text-muted-foreground mb-2">To</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">0.00</div>
                      <Button variant="outline" className="border-blue-500/30 text-blue-400">
                        Select Token
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Connect Wallet to Trade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GAiA Price</span>
                    <span className="text-green-400 font-bold">$0.0024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="text-white font-bold">$247K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="text-white font-bold">$12.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trading Fees</span>
                    <span className="text-green-400 font-bold">0.00%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Supported Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-white">GAiA</span>
                    <Badge className="bg-green-600">Native</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-white">ETH</span>
                    <Badge className="bg-blue-600">ERC-20</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-white">USDT</span>
                    <Badge className="bg-green-600">Stable</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-white">BTC</span>
                    <Badge className="bg-orange-600">Bitcoin</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
