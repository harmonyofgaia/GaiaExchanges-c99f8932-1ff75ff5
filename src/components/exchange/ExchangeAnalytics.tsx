
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, BarChart3, PieChart, Activity, TrendingUp, TrendingDown } from 'lucide-react'

export function ExchangeAnalytics() {
  const analyticsData = [
    {
      title: '📈 Price Analytics',
      value: '$0.000125',
      change: '+5.67%',
      trend: 'up',
      description: 'GAiA token price analysis'
    },
    {
      title: '💰 Trading Volume',
      value: '$1.2M',
      change: '+12.3%',
      trend: 'up',
      description: '24h trading volume'
    },
    {
      title: '👥 Active Traders',
      value: '15,847',
      change: '+8.9%',
      trend: 'up',
      description: 'Daily active traders'
    },
    {
      title: '📊 Market Cap',
      value: '$125M',
      change: '+3.4%',
      trend: 'up',
      description: 'Total market capitalization'
    }
  ]

  const tradingPairs = [
    { pair: 'GAIA/USDT', volume: '$450K', change: '+7.2%', price: '$0.000125' },
    { pair: 'GAIA/ETH', volume: '$320K', change: '+5.1%', price: '0.000000045 ETH' },
    { pair: 'GAIA/BTC', volume: '$280K', change: '+4.8%', price: '0.0000000032 BTC' },
    { pair: 'GAIA/SOL', volume: '$150K', change: '+6.3%', price: '0.0000055 SOL' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index} className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">{item.title}</div>
                {item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">{item.value}</div>
              <div className="flex items-center gap-2">
                <Badge className={item.trend === 'up' ? 'bg-green-600' : 'bg-red-600'}>
                  {item.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <LineChart className="h-6 w-6" />
              Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-black/20 rounded-lg">
              <div className="text-center">
                <Activity className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                <p className="text-green-300">Live Price Chart</p>
                <p className="text-sm text-muted-foreground">Real-time GAiA price movements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Volume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-black/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <p className="text-purple-300">Trading Volume</p>
                <p className="text-sm text-muted-foreground">24h volume analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <PieChart className="h-6 w-6" />
            Trading Pairs Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tradingPairs.map((pair, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-cyan-400">{pair.pair}</h4>
                  <Badge className="bg-green-600">{pair.change}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Volume: <span className="text-white">{pair.volume}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Price: <span className="text-white">{pair.price}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">🔥 Hot Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">GAIA → USDT</span>
                <span className="text-green-400">+15.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ETH → GAIA</span>
                <span className="text-green-400">+12.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GAIA → BTC</span>
                <span className="text-green-400">+9.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="text-orange-400">⚡ Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">24h High</span>
                <span className="text-orange-400">$0.000132</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">24h Low</span>
                <span className="text-orange-400">$0.000118</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">All Time High</span>
                <span className="text-orange-400">$0.000156</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400">🎯 Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Resistance</span>
                <span className="text-red-400">$0.000140</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Support Level</span>
                <span className="text-red-400">$0.000115</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Target Price</span>
                <span className="text-red-400">$0.000150</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
