
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap } from 'lucide-react'

interface TradingData {
  time: string
  price: number
  volume: number
  change: number
}

export function TradingInterface() {
  const [tradingData, setTradingData] = useState<TradingData[]>([])
  const [currentPrice, setCurrentPrice] = useState(3.25)
  const [priceChange, setPriceChange] = useState(8.47)
  const [volume24h, setVolume24h] = useState(12500000)

  useEffect(() => {
    const generateTradingData = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      const newPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.02)
      const newVolume = volume24h * (1 + (Math.random() - 0.5) * 0.1)
      const change = ((newPrice - currentPrice) / currentPrice) * 100
      
      const newDataPoint: TradingData = {
        time: timeStr,
        price: newPrice,
        volume: newVolume,
        change: change
      }

      setTradingData(prev => [...prev.slice(-19), newDataPoint])
      setCurrentPrice(newPrice)
      setPriceChange(prev => prev + (Math.random() - 0.5) * 0.5)
      setVolume24h(newVolume)
    }

    generateTradingData()
    const interval = setInterval(generateTradingData, 3000)
    return () => clearInterval(interval)
  }, [currentPrice, volume24h])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAIA Price</p>
                <p className="text-3xl font-bold text-green-400">{formatCurrency(currentPrice)}</p>
                <Badge className={`mt-2 ${priceChange >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                  {priceChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {priceChange.toFixed(2)}%
                </Badge>
              </div>
              <DollarSign className="h-12 w-12 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-3xl font-bold text-blue-400">{formatCurrency(volume24h)}</p>
                <Badge className="mt-2 bg-blue-600 text-white">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Trading
                </Badge>
              </div>
              <Activity className="h-12 w-12 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trading Speed</p>
                <p className="text-3xl font-bold text-purple-400">0.8s</p>
                <Badge className="mt-2 bg-purple-600 text-white">
                  <Zap className="h-3 w-3 mr-1" />
                  10x Faster
                </Badge>
              </div>
              <Zap className="h-12 w-12 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-5 w-5" />
            Live GAIA Trading Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tradingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Quick Trade Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Buy GAIA Token
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Sell GAIA Token
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Swap Tokens
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Market Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap:</span>
                <span className="text-green-400 font-bold">{formatCurrency(currentPrice * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Supply:</span>
                <span className="text-blue-400 font-bold">1,000,000 GAIA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Circulating:</span>
                <span className="text-purple-400 font-bold">750,000 GAIA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
