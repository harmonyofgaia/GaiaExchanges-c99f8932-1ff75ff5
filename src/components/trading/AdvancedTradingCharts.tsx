
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, BarChart3, Activity, Zap } from 'lucide-react'

interface TradingData {
  timestamp: string
  price: number
  volume: number
  high: number
  low: number
  open: number
  close: number
}

export function AdvancedTradingCharts() {
  const [tradingData, setTradingData] = useState<TradingData[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [activeIndicators, setActiveIndicators] = useState(['RSI', 'MACD'])

  useEffect(() => {
    // Generate sample trading data with technical indicators
    const generateTradingData = () => {
      const data = []
      const now = Date.now()
      
      for (let i = 0; i < 100; i++) {
        const timestamp = new Date(now - (100 - i) * 60000).toISOString()
        const basePrice = 2500 + Math.sin(i * 0.1) * 200 + Math.random() * 50
        
        data.push({
          timestamp,
          price: basePrice,
          volume: Math.random() * 1000000 + 500000,
          high: basePrice + Math.random() * 20,
          low: basePrice - Math.random() * 20,
          open: basePrice + (Math.random() - 0.5) * 10,
          close: basePrice + (Math.random() - 0.5) * 15
        })
      }
      
      setTradingData(data)
    }

    generateTradingData()
    const interval = setInterval(generateTradingData, 5000)

    return () => clearInterval(interval)
  }, [selectedTimeframe])

  const timeframes = ['5m', '15m', '1h', '4h', '1d']
  const indicators = ['RSI', 'MACD', 'SMA', 'EMA', 'Bollinger']

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <BarChart3 className="h-6 w-6" />
          Advanced Trading Charts
          <Badge className="bg-green-600 animate-pulse">LIVE</Badge>
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {timeframes.map(tf => (
            <Button
              key={tf}
              variant={selectedTimeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(tf)}
              className={selectedTimeframe === tf ? "bg-blue-600" : "border-blue-500/30"}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tradingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke="#9CA3AF"
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-900/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Current Price</span>
            </div>
            <div className="text-xl font-bold text-white">
              ${tradingData[tradingData.length - 1]?.price?.toFixed(2) || '0'}
            </div>
          </div>

          <div className="bg-blue-900/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400">24h Volume</span>
            </div>
            <div className="text-xl font-bold text-white">
              {(tradingData[tradingData.length - 1]?.volume || 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-purple-900/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400">RSI</span>
            </div>
            <div className="text-xl font-bold text-white">
              {Math.floor(Math.random() * 40 + 30)}
            </div>
          </div>

          <div className="bg-yellow-900/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">MACD</span>
            </div>
            <div className="text-xl font-bold text-white">
              {(Math.random() - 0.5).toFixed(3)}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Technical Indicators:</span>
          {indicators.map(indicator => (
            <Badge 
              key={indicator}
              className={`cursor-pointer ${
                activeIndicators.includes(indicator) 
                  ? 'bg-blue-600' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => {
                setActiveIndicators(prev => 
                  prev.includes(indicator) 
                    ? prev.filter(i => i !== indicator)
                    : [...prev, indicator]
                )
              }}
            >
              {indicator}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
