import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Search, TrendingUp, BarChart3, Activity, RefreshCw } from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'
import { toast } from 'sonner'

interface ChartData {
  time: string
  price: number
  volume: number
}

interface CoinInfo {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: number
  marketCap: number
}

export function ChartAnalytics() {
  const [searchCoin, setSearchCoin] = useState('GAIA')
  const [timeframe, setTimeframe] = useState('1H')
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [coinInfo, setCoinInfo] = useState<CoinInfo>({
    symbol: 'GAIA',
    name: 'Gaia Token',
    price: 3.00,
    change24h: 5.67,
    volume: 8750000,
    marketCap: 257250000
  })
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Generate realistic chart data
  const generateChartData = (timeframe: string) => {
    const now = new Date()
    const data: ChartData[] = []
    let intervals = 24 // Default to 24 hours
    let stepMinutes = 60 // 1 hour steps

    switch (timeframe) {
      case '5S':
        intervals = 60
        stepMinutes = 0.08333 // 5 seconds
        break
      case '1M':
        intervals = 60
        stepMinutes = 1
        break
      case '1H':
        intervals = 24
        stepMinutes = 60
        break
      case '1D':
        intervals = 30
        stepMinutes = 1440 // 1 day
        break
      case '1W':
        intervals = 52
        stepMinutes = 10080 // 1 week
        break
      case '1Y':
        intervals = 12
        stepMinutes = 43800 // 1 month
        break
    }

    let basePrice = coinInfo.price
    for (let i = intervals; i >= 0; i--) {
      const time = new Date(now.getTime() - i * stepMinutes * 60000)
      const priceChange = (Math.random() - 0.5) * 0.1 // ±5% random change
      basePrice *= (1 + priceChange)
      
      data.push({
        time: timeframe === '5S' || timeframe === '1M' ? 
          time.toLocaleTimeString() : 
          time.toLocaleDateString(),
        price: Math.max(0.01, basePrice),
        volume: Math.floor(Math.random() * 1000000 + 500000)
      })
    }

    return data
  }

  // Real-time updates
  useEffect(() => {
    const updateData = () => {
      if (timeframe === '5S') {
        // For 5-second updates, add new data point and remove oldest
        setChartData(prevData => {
          const newData = [...prevData]
          const now = new Date()
          const lastPrice = newData[newData.length - 1]?.price || coinInfo.price
          const priceChange = (Math.random() - 0.5) * 0.02 // ±1% change
          
          newData.push({
            time: now.toLocaleTimeString(),
            price: Math.max(0.01, lastPrice * (1 + priceChange)),
            volume: Math.floor(Math.random() * 1000000 + 500000)
          })
          
          // Keep only last 60 data points for 5-second chart
          return newData.slice(-60)
        })
        
        setLastUpdate(new Date())
      }
    }

    const interval = timeframe === '5S' ? 5000 : 60000 // 5 seconds or 1 minute
    const timer = setInterval(updateData, interval)

    return () => clearInterval(timer)
  }, [timeframe, coinInfo.price])

  // Load chart data when coin or timeframe changes
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setChartData(generateChartData(timeframe))
      setIsLoading(false)
      toast.success(`Chart updated for ${searchCoin}`, {
        description: `Timeframe: ${timeframe} | Last update: ${new Date().toLocaleTimeString()}`
      })
    }, 500)
  }, [searchCoin, timeframe])

  const handleSearchCoin = () => {
    if (!searchCoin.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call to fetch coin data
    setTimeout(() => {
      const mockCoins: { [key: string]: CoinInfo } = {
        'GAIA': { symbol: 'GAIA', name: 'Gaia Token', price: 3.00, change24h: 5.67, volume: 8750000, marketCap: 257250000 },
        'BTC': { symbol: 'BTC', name: 'Bitcoin', price: 43250.67, change24h: 2.34, volume: 15420000000, marketCap: 847000000000 },
        'ETH': { symbol: 'ETH', name: 'Ethereum', price: 2543.21, change24h: -1.87, volume: 8750000000, marketCap: 305000000000 },
        'ADA': { symbol: 'ADA', name: 'Cardano', price: 0.4234, change24h: 4.56, volume: 450000000, marketCap: 15000000000 }
      }

      const coin = mockCoins[searchCoin.toUpperCase()] || mockCoins['GAIA']
      setCoinInfo(coin)
      setIsLoading(false)
    }, 1000)
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 6 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value)
  }

  const formatVolume = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${(value / 1e3).toFixed(2)}K`
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Advanced Chart Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coin symbol (GAIA, BTC, ETH...)"
                  value={searchCoin}
                  onChange={(e) => setSearchCoin(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchCoin()}
                />
              </div>
              <Button onClick={handleSearchCoin} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Search'}
              </Button>
            </div>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5S">5 Seconds</SelectItem>
                <SelectItem value="1M">1 Minute</SelectItem>
                <SelectItem value="1H">1 Hour</SelectItem>
                <SelectItem value="1D">1 Day</SelectItem>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Coin Information */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {coinInfo.symbol === 'GAIA' && <GaiaLogo size="lg" />}
              <div>
                <h3 className="text-2xl font-bold">{coinInfo.name} ({coinInfo.symbol})</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-3xl font-bold">{formatPrice(coinInfo.price)}</div>
                  <Badge className={`${coinInfo.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {coinInfo.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                    {coinInfo.change24h > 0 ? '+' : ''}{coinInfo.change24h.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">24h Volume</div>
              <div className="text-lg font-semibold">{formatVolume(coinInfo.volume)}</div>
              <div className="text-sm text-muted-foreground mt-1">Market Cap</div>
              <div className="text-lg font-semibold">{formatVolume(coinInfo.marketCap)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Price Chart - {timeframe} Timeframe
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {timeframe === '5S' ? 'Live Updates' : `Last Update: ${lastUpdate.toLocaleTimeString()}`}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                  tickFormatter={(value) => formatPrice(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [formatPrice(value), 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Volume Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Volume Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                  tickFormatter={(value) => formatVolume(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [formatVolume(value), 'Volume']}
                />
                <Bar dataKey="volume" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">📊 Real-Time Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Update Frequency</div>
              <div className="font-semibold text-green-400">
                {timeframe === '5S' ? 'Every 5 seconds' : 'Every minute'}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Data Points</div>
              <div className="font-semibold text-blue-400">{chartData.length} points</div>
            </div>
            <div>
              <div className="text-muted-foreground">Chart Status</div>
              <div className="font-semibold text-yellow-400">
                {isLoading ? 'Loading...' : 'Real-time Active'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
