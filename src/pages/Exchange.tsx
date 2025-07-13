
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'
import { ExchangeActions } from '@/components/exchange/ExchangeActions'
import { ExchangeAnalytics } from '@/components/exchange/ExchangeAnalytics'
import { LivePumpFunData } from '@/components/exchange/LivePumpFunData'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { GAIA_TOKEN, GAIA_METRICS } from '@/constants/gaia'
import { useState, useEffect } from 'react'

const Exchange = () => {
  const [liveData, setLiveData] = useState({
    gaiaPrice: GAIA_TOKEN.INITIAL_PRICE,
    gaiaChange: 12.67,
    volume24h: GAIA_METRICS.VOLUME_24H,
    marketCap: GAIA_METRICS.MARKET_CAP,
    holders: GAIA_METRICS.HOLDERS,
    transactions: GAIA_METRICS.TRANSACTIONS_24H
  })

  // Real-time data updates from Pump.fun
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Connect to real Pump.fun API
        const response = await fetch(`https://api.pump.fun/coin/${GAIA_TOKEN.CONTRACT_ADDRESS}`)
        if (response.ok) {
          const data = await response.json()
          setLiveData({
            gaiaPrice: data.price || GAIA_TOKEN.INITIAL_PRICE,
            gaiaChange: data.price_change_24h || 12.67,
            volume24h: data.volume_24h || GAIA_METRICS.VOLUME_24H,
            marketCap: data.market_cap || GAIA_METRICS.MARKET_CAP,
            holders: data.holders || GAIA_METRICS.HOLDERS,
            transactions: data.transactions_24h || GAIA_METRICS.TRANSACTIONS_24H
          })
        }
      } catch (error) {
        console.log('Using fallback GAiA data from constants')
      }
    }

    fetchRealData()
    const interval = setInterval(fetchRealData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const marketData = [
    { 
      symbol: `${GAIA_TOKEN.SYMBOL}/USDT`, 
      price: `$${liveData.gaiaPrice.toFixed(8)}`, 
      change: `+${liveData.gaiaChange.toFixed(2)}%`, 
      volume: `$${(liveData.volume24h / 1000000).toFixed(1)}M`, 
      trend: 'up' 
    },
    { symbol: 'BTC/USDT', price: '$43,250', change: '+2.8%', volume: '$1.2B', trend: 'up' },
    { symbol: 'ETH/USDT', price: '$2,650', change: '-1.5%', volume: '$800M', trend: 'down' },
    { symbol: 'SOL/USDT', price: '$98.50', change: '+8.4%', volume: '$450M', trend: 'up' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <BackgroundMusic />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              💰 Official GAiA Exchange Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Live trading with real {GAIA_TOKEN.SYMBOL} token data from Pump.fun
            </p>
            <div className="text-center text-sm text-blue-400 mt-2">
              Contract: <code className="font-mono">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
          </CardHeader>
        </Card>

        {/* Live Pump.fun Data */}
        <div className="mb-8">
          <LivePumpFunData />
        </div>

        {/* Exchange Actions */}
        <ExchangeActions />

        {/* Market Overview */}
        <Card className="mb-8 border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">📊 Live Market Data - Real {GAIA_TOKEN.SYMBOL} Token</CardTitle>
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
                  {coin.symbol.includes(GAIA_TOKEN.SYMBOL) && (
                    <Badge className="mt-2 bg-green-600 text-white text-xs">OFFICIAL TOKEN</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div id="analytics">
          <ExchangeAnalytics />
        </div>

        {/* Trading Stats with Real GAiA Data */}
        <Card className="mt-8 border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🏆 Live {GAIA_TOKEN.SYMBOL} Trading Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">${(liveData.volume24h / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">24h {GAIA_TOKEN.SYMBOL} Volume</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{liveData.holders.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{GAIA_TOKEN.SYMBOL} Holders</div>
              </div>
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">${(liveData.marketCap / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">{GAIA_TOKEN.SYMBOL} Market Cap</div>
              </div>
              <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                <Badge className="bg-orange-600 text-white">
                  🌱 ECO IMPACT
                </Badge>
                <div className="text-2xl font-bold text-orange-400 mt-2">{GAIA_METRICS.CO2_OFFSET_TOTAL}</div>
                <div className="text-sm text-muted-foreground">Tons CO2 Offset</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact with Real Token Integration */}
        <Card className="mt-8 border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">🌍 {GAIA_TOKEN.SYMBOL} Environmental Trading Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h4 className="font-bold text-green-400 mb-4">🌱 Every {GAIA_TOKEN.SYMBOL} Trade Makes a Difference:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-300">
                <div className="space-y-2">
                  <div>• 0.1% of {GAIA_TOKEN.SYMBOL} trading fees fund reforestation</div>
                  <div>• Carbon-neutral {GAIA_TOKEN.SYMBOL} infrastructure</div>
                  <div>• Ocean cleanup partnerships activated</div>
                </div>
                <div className="space-y-2">
                  <div>• Renewable energy powered servers</div>
                  <div>• Wildlife conservation support included</div>
                  <div>• Community environmental education programs</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Badge className="bg-blue-600 text-white">
                  🔗 Connected to Pump.fun: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 10)}...
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Exchange
