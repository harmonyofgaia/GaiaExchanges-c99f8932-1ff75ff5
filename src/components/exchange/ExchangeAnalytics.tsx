
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  DollarSign,
  Users,
  Zap
} from 'lucide-react'

export function ExchangeAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    totalVolume: 24567890,
    dailyTrades: 15432,
    activeUsers: 8921,
    priceChange24h: 12.5,
    marketCap: 156789000,
    liquidityPool: 45672100,
    stakingRewards: 234567,
    avgTradeSize: 1247.89
  })

  const [chartData, setChartData] = useState([
    { time: '00:00', volume: 120000, price: 0.00245 },
    { time: '04:00', volume: 150000, price: 0.00248 },
    { time: '08:00', volume: 180000, price: 0.00252 },
    { time: '12:00', volume: 220000, price: 0.00247 },
    { time: '16:00', volume: 190000, price: 0.00251 },
    { time: '20:00', volume: 160000, price: 0.00249 }
  ])

  const [topTradingPairs, setTopTradingPairs] = useState([
    { pair: 'GAiA/USDT', volume: '2.4M', change: '+12.5%', price: '$0.00247' },
    { pair: 'GAiA/BTC', volume: '1.8M', change: '+8.3%', price: '0.0000567 BTC' },
    { pair: 'GAiA/ETH', volume: '1.2M', change: '-3.2%', price: '0.00105 ETH' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
        dailyTrades: prev.dailyTrades + Math.floor(Math.random() * 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 2
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          📊 Advanced Exchange Analytics
        </h2>
        <p className="text-muted-foreground">
          Real-time market data and comprehensive trading insights
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-blue-400">
                  ${analyticsData.totalVolume.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">24h Volume</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Trades</p>
                <p className="text-2xl font-bold text-green-400">
                  {analyticsData.dailyTrades.toLocaleString()}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <Zap className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-sm">Live Trades</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-purple-400">
                  {analyticsData.activeUsers.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">+5.2% today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price Change</p>
                <p className="text-2xl font-bold text-orange-400">
                  {analyticsData.priceChange24h > 0 ? '+' : ''}{analyticsData.priceChange24h.toFixed(2)}%
                </p>
              </div>
              {analyticsData.priceChange24h > 0 ? 
                <TrendingUp className="h-8 w-8 text-green-400" /> : 
                <TrendingDown className="h-8 w-8 text-red-400" />
              }
            </div>
            <div className="flex items-center mt-2">
              <DollarSign className="h-4 w-4 text-orange-400 mr-1" />
              <span className="text-orange-400 text-sm">24h Change</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Overview */}
        <Card className="bg-gradient-to-br from-gray-900/20 to-slate-900/20 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Cap</span>
                <span className="font-bold text-blue-400">
                  ${analyticsData.marketCap.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Liquidity Pool</span>
                <span className="font-bold text-green-400">
                  ${analyticsData.liquidityPool.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Staking Rewards</span>
                <span className="font-bold text-purple-400">
                  ${analyticsData.stakingRewards.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Trade Size</span>
                <span className="font-bold text-orange-400">
                  ${analyticsData.avgTradeSize.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Trading Pairs */}
        <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-400 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Trading Pairs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTradingPairs.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded border border-border/20">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                    <div>
                      <div className="font-bold text-white">{pair.pair}</div>
                      <div className="text-xs text-muted-foreground">Vol: {pair.volume}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{pair.price}</div>
                    <div className={`text-xs ${
                      pair.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {pair.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-r from-teal-900/20 via-blue-900/20 to-purple-900/20 border-teal-500/30">
        <CardHeader>
          <CardTitle className="text-teal-400 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            📈 Performance Metrics & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-900/20 rounded-lg">
              <div className="text-2xl font-bold text-teal-400 mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <Badge className="mt-2 bg-teal-600 text-white">Excellent</Badge>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">0.01s</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
              <Badge className="mt-2 bg-blue-600 text-white">Lightning Fast</Badge>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">A+</div>
              <div className="text-sm text-muted-foreground">Security Rating</div>
              <Badge className="mt-2 bg-purple-600 text-white">Fortress Level</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
