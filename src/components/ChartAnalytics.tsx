
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
import { GAIA_TOKEN, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

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
  contractAddress?: string
  walletAddress?: string
}

export function ChartAnalytics() {
  const [searchCoin, setSearchCoin] = useState<string>(GAIA_TOKEN.SYMBOL)
  const [timeframe, setTimeframe] = useState<string>('1H')
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [coinInfo, setCoinInfo] = useState<CoinInfo>({
    symbol: GAIA_TOKEN.SYMBOL,
    name: GAIA_TOKEN.NAME,
    price: GAIA_TOKEN.INITIAL_PRICE,
    change24h: 8.47,
    volume: 8750000,
    marketCap: 278687500,
    contractAddress: GAIA_TOKEN.CONTRACT_ADDRESS,
    walletAddress: GAIA_TOKEN.WALLET_ADDRESS
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Generate realistic chart data
  const generateChartData = (timeframe: string) => {
    const now = new Date()
    const data: ChartData[] = []
    let intervals = 24
    let stepMinutes = 60

    switch (timeframe) {
      case '5S':
        intervals = 60
        stepMinutes = 0.08333
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
        stepMinutes = 1440
        break
      case '1W':
        intervals = 52
        stepMinutes = 10080
        break
      case '1Y':
        intervals = 12
        stepMinutes = 43800
        break
    }

    let basePrice = coinInfo.price
    for (let i = intervals; i >= 0; i--) {
      const time = new Date(now.getTime() - i * stepMinutes * 60000)
      const priceChange = (Math.random() - 0.5) * 0.1
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
        setChartData(prevData => {
          const newData = [...prevData]
          const now = new Date()
          const lastPrice = newData[newData.length - 1]?.price || coinInfo.price
          const priceChange = (Math.random() - 0.5) * 0.02
          
          newData.push({
            time: now.toLocaleTimeString(),
            price: Math.max(0.01, lastPrice * (1 + priceChange)),
            volume: Math.floor(Math.random() * 1000000 + 500000)
          })
          
          return newData.slice(-60)
        })
        
        setLastUpdate(new Date())
      }
    }

    const interval = timeframe === '5S' ? 5000 : 60000
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
    
    setTimeout(() => {
      const mockCoins: { [key: string]: CoinInfo } = {
        [GAIA_TOKEN.SYMBOL]: { 
          symbol: GAIA_TOKEN.SYMBOL, 
          name: GAIA_TOKEN.NAME, 
          price: GAIA_TOKEN.INITIAL_PRICE, 
          change24h: 8.47, 
          volume: 8750000, 
          marketCap: 278687500,
          contractAddress: GAIA_TOKEN.CONTRACT_ADDRESS,
          walletAddress: GAIA_TOKEN.WALLET_ADDRESS
        },
        'BTC': { symbol: 'BTC', name: 'Bitcoin', price: 43250.67, change24h: 2.34, volume: 15420000000, marketCap: 847000000000 },
        'ETH': { symbol: 'ETH', name: 'Ethereum', price: 2543.21, change24h: -1.87, volume: 8750000000, marketCap: 305000000000 },
        'ADA': { symbol: 'ADA', name: 'Cardano', price: 0.4234, change24h: 4.56, volume: 450000000, marketCap: 15000000000 }
      }

      const coin = mockCoins[searchCoin.toUpperCase()] || mockCoins[GAIA_TOKEN.SYMBOL]
      setCoinInfo(coin)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            {GAIA_TOKEN.SYMBOL} Advanced Chart Analytics - Harmony of Culture
          </CardTitle>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2">
            <div className="text-sm text-green-400 space-y-1">
              <div><strong>Contract:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code></div>
              <div><strong>Wallet:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.WALLET_ADDRESS}</code></div>
              <div><strong>Pump.fun:</strong> <a href={GAIA_TOKEN.PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Trade Now</a></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search coin symbol (${GAIA_TOKEN.SYMBOL}, BTC, ETH...)`}
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

      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {coinInfo.symbol === GAIA_TOKEN.SYMBOL && <GaiaLogo size="lg" />}
              <div>
                <h3 className="text-2xl font-bold">{coinInfo.name} ({coinInfo.symbol})</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-3xl font-bold">{formatGaiaPrice(coinInfo.price)}</div>
                  <Badge className={`${coinInfo.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {coinInfo.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                    {coinInfo.change24h > 0 ? '+' : ''}{coinInfo.change24h.toFixed(2)}%
                  </Badge>
                </div>
                {coinInfo.contractAddress && (
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Contract: </span>
                    <code className="text-blue-400 font-mono">{coinInfo.contractAddress}</code>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">24h Volume</div>
              <div className="text-lg font-semibold">{formatGaiaNumber(coinInfo.volume)}</div>
              <div className="text-sm text-muted-foreground mt-1">Market Cap</div>
              <div className="text-lg font-semibold">{formatGaiaNumber(coinInfo.marketCap)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  tickFormatter={(value) => formatGaiaPrice(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [formatGaiaPrice(value), 'Price']}
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
                  tickFormatter={(value) => formatGaiaNumber(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [formatGaiaNumber(value), 'Volume']}
                />
                <Bar dataKey="volume" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
