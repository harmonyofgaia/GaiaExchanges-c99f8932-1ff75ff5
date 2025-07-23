import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Activity, Clock, DollarSign, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CoinRate {
  symbol: string
  name: string
  currentPrice: number
  change24h: number
  volume: number
  marketCap: number
  lastUpdated: string
}

export function LiveCoinRateAgreements() {
  const [liveRates, setLiveRates] = useState<CoinRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  useEffect(() => {
    // Simulate live coin rate data
    const simulateRates = () => {
      const coins: CoinRate[] = [
        {
          symbol: 'GAIA',
          name: 'Gaia Token',
          currentPrice: 0.245,
          change24h: 12.5,
          volume: 2580000,
          marketCap: 12500000,
          lastUpdated: new Date().toISOString()
        },
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          currentPrice: 42350.67,
          change24h: -2.1,
          volume: 28500000000,
          marketCap: 831000000000,
          lastUpdated: new Date().toISOString()
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          currentPrice: 2567.89,
          change24h: 4.3,
          volume: 15200000000,
          marketCap: 309000000000,
          lastUpdated: new Date().toISOString()
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          currentPrice: 98.45,
          change24h: 8.7,
          volume: 2100000000,
          marketCap: 42800000000,
          lastUpdated: new Date().toISOString()
        }
      ]
      
      setLiveRates(coins)
      setIsLoading(false)
    }

    simulateRates()
    const interval = setInterval(simulateRates, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`
    if (price < 1000) return `$${price.toFixed(2)}`
    return `$${(price / 1000).toFixed(1)}K`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(1)}B`
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    return `$${(volume / 1000).toFixed(1)}K`
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          📊 Live Coin Rate Agreements
        </CardTitle>
        <p className="text-center text-sm text-blue-300">
          Real-Time Market Data • Environmental Token Focus • Smart Contract Integration
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {['1h', '24h', '7d', '30d'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
              className={selectedTimeframe === timeframe ? 
                "bg-blue-600 text-white" : 
                "border-blue-500/30 text-blue-300"
              }
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <Activity className="h-8 w-8 text-blue-400 mx-auto mb-4 animate-spin" />
            <p className="text-blue-300">Loading live market data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {liveRates.map((coin) => (
              <div
                key={coin.symbol}
                className="bg-black/20 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {coin.symbol === 'GAIA' ? '🌍' : coin.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-blue-300">{coin.name}</div>
                      <div className="text-sm text-blue-400">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-200">
                      {formatPrice(coin.currentPrice)}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {coin.change24h >= 0 ? 
                        <TrendingUp className="h-4 w-4" /> : 
                        <TrendingDown className="h-4 w-4" />
                      }
                      {Math.abs(coin.change24h).toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-900/30 p-3 rounded border border-blue-500/20">
                    <div className="flex items-center gap-2 text-blue-300 mb-1">
                      <BarChart3 className="h-4 w-4" />
                      Volume (24h)
                    </div>
                    <div className="font-bold text-blue-200">
                      {formatVolume(coin.volume)}
                    </div>
                  </div>
                  
                  <div className="bg-cyan-900/30 p-3 rounded border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-cyan-300 mb-1">
                      <DollarSign className="h-4 w-4" />
                      Market Cap
                    </div>
                    <div className="font-bold text-cyan-200">
                      {formatVolume(coin.marketCap)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-blue-400">
                    <Clock className="h-3 w-3" />
                    Last updated: {new Date(coin.lastUpdated).toLocaleTimeString()}
                  </div>
                  {coin.symbol === 'GAIA' && (
                    <Badge className="bg-green-600 text-white">
                      Environmental Token
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-lg border border-green-500/30 mt-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">🌱 Smart Rate Agreements</h3>
              <p className="text-sm text-green-300 mb-3">
                Automated environmental impact-based rate adjustments for sustainable tokens
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-green-300 font-medium">Carbon Offset Integration:</div>
                  <div className="text-green-400">Active for GAIA token</div>
                </div>
                <div>
                  <div className="text-blue-300 font-medium">Environmental Bonus:</div>
                  <div className="text-blue-400">+5% for eco-verified tokens</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}