
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'
import { ExchangeActions } from '@/components/exchange/ExchangeActions'
import { ExchangeAnalytics } from '@/components/exchange/ExchangeAnalytics'

const Exchange = () => {
  const marketData = [
    { symbol: 'GAIA/USDT', price: '$0.0847', change: '+15.2%', volume: '$2.4M', trend: 'up' },
    { symbol: 'BTC/USDT', price: '$43,250', change: '+2.8%', volume: '$1.2B', trend: 'up' },
    { symbol: 'ETH/USDT', price: '$2,650', change: '-1.5%', volume: '$800M', trend: 'down' },
    { symbol: 'SOL/USDT', price: '$98.50', change: '+8.4%', volume: '$450M', trend: 'up' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              💰 GAiA Exchange Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Advanced trading platform with environmental impact
            </p>
          </CardHeader>
        </Card>

        {/* Exchange Actions */}
        <ExchangeActions />

        {/* Market Overview */}
        <Card className="mb-8 border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">📊 Live Market Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketData.map((coin, index) => (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">{coin.symbol}</span>
                    {coin.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{coin.price}</div>
                  <div className={`text-sm ${coin.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.change}
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: {coin.volume}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div id="analytics">
          <ExchangeAnalytics />
        </div>

        {/* Trading Stats */}
        <Card className="mt-8 border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🏆 Trading Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">$24.7M</div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">156,234</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">98.7%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                <Badge className="bg-orange-600 text-white">
                  🌱 ECO IMPACT
                </Badge>
                <div className="text-2xl font-bold text-orange-400 mt-2">2,847</div>
                <div className="text-sm text-muted-foreground">Trees Planted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="mt-8 border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">🌍 Environmental Trading Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h4 className="font-bold text-green-400 mb-4">🌱 Every Trade Makes a Difference:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-300">
                <div className="space-y-2">
                  <div>• 0.1% of trading fees fund reforestation projects</div>
                  <div>• Carbon-neutral trading infrastructure</div>
                  <div>• Ocean cleanup partnerships activated</div>
                </div>
                <div className="space-y-2">
                  <div>• Renewable energy powered servers</div>
                  <div>• Wildlife conservation support included</div>
                  <div>• Community environmental education programs</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Exchange
