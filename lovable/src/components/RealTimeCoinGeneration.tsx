import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Activity, 
  Zap, 
  BarChart3,
  Users,
  Database,
  RefreshCw,
  PlayCircle,
  PauseCircle
} from 'lucide-react'
import { formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'
import { toast } from 'sonner'

interface MarketData {
  price: number
  volume24h: number
  marketCap: number
  holders: number
  transactions24h: number
  supply: number
  priceChange24h: number
  volumeChange24h: number
  lastUpdate: Date
}

interface GenerationMetrics {
  totalGenerated: number
  generationRate: number
  burnRate: number
  netSupplyChange: number
  stabilityScore: number
  marketHealth: number
}

export function RealTimeCoinGeneration() {
  const [isActive, setIsActive] = useState(true)
  const [marketData, setMarketData] = useState<MarketData>({
    price: 0.000047,
    volume24h: 847592000,
    marketCap: 4700000,
    holders: 18420,
    transactions24h: 2847,
    supply: 1000000000,
    priceChange24h: 5.67,
    volumeChange24h: 12.34,
    lastUpdate: new Date()
  })

  const [generationMetrics, setGenerationMetrics] = useState<GenerationMetrics>({
    totalGenerated: 0,
    generationRate: 150,
    burnRate: 75,
    netSupplyChange: 75,
    stabilityScore: 85.7,
    marketHealth: 92.3
  })

  const [recentTransactions, setRecentTransactions] = useState<Array<{
    id: string
    type: 'mint' | 'burn' | 'trade'
    amount: number
    timestamp: Date
    impact: number
  }>>([])

  // Real-time market fluctuation engine
  const updateMarketData = useCallback(() => {
    if (!isActive) return

    setMarketData(prev => {
      // Generate realistic market fluctuations
      const priceFluctuation = (Math.random() - 0.5) * 0.0001 // Small price movements
      const volumeFluctuation = (Math.random() - 0.5) * 0.05 // Volume changes
      const holdersGrowth = Math.random() < 0.7 ? Math.floor(Math.random() * 5) : 0
      const transactionBoost = Math.floor(Math.random() * 10) + 1

      const newPrice = Math.max(0.000001, prev.price + priceFluctuation)
      const newVolume = Math.max(0, prev.volume24h * (1 + volumeFluctuation))
      const newHolders = prev.holders + holdersGrowth
      const newTransactions = prev.transactions24h + transactionBoost

      // Calculate price change percentage
      const priceChangePct = ((newPrice - prev.price) / prev.price) * 100
      const volumeChangePct = ((newVolume - prev.volume24h) / prev.volume24h) * 100

      return {
        ...prev,
        price: newPrice,
        volume24h: newVolume,
        marketCap: newPrice * prev.supply,
        holders: newHolders,
        transactions24h: newTransactions,
        priceChange24h: prev.priceChange24h + priceChangePct,
        volumeChange24h: prev.volumeChange24h + volumeChangePct,
        lastUpdate: new Date()
      }
    })
  }, [isActive])

  // Token supply management engine
  const updateSupplyMetrics = useCallback(() => {
    if (!isActive) return

    setGenerationMetrics(prev => {
      // Dynamic generation and burn rates based on market conditions
      const marketVolatility = Math.abs(marketData.priceChange24h)
      const adaptiveGenerationRate = Math.max(50, 200 - marketVolatility * 2)
      const adaptiveBurnRate = Math.min(150, 50 + marketVolatility * 1.5)
      
      const newGenerated = Math.floor(Math.random() * adaptiveGenerationRate) + 25
      const newBurned = Math.floor(Math.random() * adaptiveBurnRate) + 10
      const netChange = newGenerated - newBurned

      // Update supply in market data
      setMarketData(market => ({
        ...market,
        supply: Math.max(1000000, market.supply + netChange)
      }))

      return {
        ...prev,
        totalGenerated: prev.totalGenerated + newGenerated,
        generationRate: adaptiveGenerationRate,
        burnRate: adaptiveBurnRate,
        netSupplyChange: netChange,
        stabilityScore: Math.max(0, Math.min(100, prev.stabilityScore + (Math.random() - 0.5) * 2)),
        marketHealth: Math.max(0, Math.min(100, prev.marketHealth + (Math.random() - 0.5) * 1.5))
      }
    })

    // Add transaction to recent activity
    if (Math.random() < 0.6) {
      const transactionTypes: Array<'mint' | 'burn' | 'trade'> = ['mint', 'burn', 'trade']
      const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
      const amount = Math.floor(Math.random() * 10000) + 100
      
      setRecentTransactions(prev => [
        {
          id: crypto.randomUUID(),
          type,
          amount,
          timestamp: new Date(),
          impact: (Math.random() - 0.5) * 5
        },
        ...prev.slice(0, 9) // Keep only last 10 transactions
      ])
    }
  }, [isActive, marketData.priceChange24h])

  // Main update cycle
  useEffect(() => {
    if (!isActive) return

    const marketInterval = setInterval(updateMarketData, 2000) // Update market every 2 seconds
    const supplyInterval = setInterval(updateSupplyMetrics, 3000) // Update supply every 3 seconds

    return () => {
      clearInterval(marketInterval)
      clearInterval(supplyInterval)
    }
  }, [isActive, updateMarketData, updateSupplyMetrics])

  const toggleSystem = () => {
    setIsActive(!isActive)
    toast.success(
      isActive 
        ? '⏸️ Real-time coin generation paused' 
        : '▶️ Real-time coin generation activated',
      {
        description: isActive 
          ? 'Market fluctuations and supply management suspended'
          : 'Dynamic market and supply management is now running'
      }
    )
  }

  const resetSystem = () => {
    setMarketData({
      price: 0.000047,
      volume24h: 847592000,
      marketCap: 4700000,
      holders: 18420,
      transactions24h: 2847,
      supply: 1000000000,
      priceChange24h: 5.67,
      volumeChange24h: 12.34,
      lastUpdate: new Date()
    })
    setGenerationMetrics({
      totalGenerated: 0,
      generationRate: 150,
      burnRate: 75,
      netSupplyChange: 75,
      stabilityScore: 85.7,
      marketHealth: 92.3
    })
    setRecentTransactions([])
    toast.success('🔄 System reset complete', {
      description: 'All metrics restored to baseline values'
    })
  }

  return (
    <div className="space-y-6">
      {/* System Control Header */}
      <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 via-green-900/30 to-blue-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <img src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png" alt="Harmony of Gaia" className="w-8 h-8" />
                REAL-TIME COIN GENERATION ENGINE
                <Activity className={`h-6 w-6 ${isActive ? 'animate-pulse text-green-400' : 'text-gray-400'}`} />
              </CardTitle>
              <p className="text-emerald-400 mt-2">
                Dynamic Market Fluctuation • Supply Management • Real-Time Analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={toggleSystem}
                variant={isActive ? "destructive" : "default"}
                className={isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isActive ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
                {isActive ? 'Pause System' : 'Start System'}
              </Button>
              <Button onClick={resetSystem} variant="outline" className="border-emerald-500/30">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge className={`${isActive ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
              {isActive ? '🟢 ACTIVE' : '🔴 PAUSED'}
            </Badge>
            <Badge className="bg-blue-600 text-white">
              ⚡ Live Market Data
            </Badge>
            <Badge className="bg-purple-600 text-white">
              🔄 Auto Supply Management
            </Badge>
            <Badge className="bg-orange-600 text-white">
              📊 Real-Time Analytics
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Live Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400 text-sm flex items-center gap-2">
              <Coins className="h-4 w-4" />
              GAiA Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatGaiaPrice(marketData.price)}
            </div>
            <div className={`text-sm flex items-center gap-1 ${marketData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {marketData.priceChange24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {marketData.priceChange24h >= 0 ? '+' : ''}{marketData.priceChange24h.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${formatGaiaNumber(marketData.volume24h)}
            </div>
            <div className={`text-sm flex items-center gap-1 ${marketData.volumeChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {marketData.volumeChange24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {marketData.volumeChange24h >= 0 ? '+' : ''}{marketData.volumeChange24h.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Total Supply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatGaiaNumber(marketData.supply)}
            </div>
            <div className={`text-sm flex items-center gap-1 ${generationMetrics.netSupplyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <Zap className="h-3 w-3" />
              {generationMetrics.netSupplyChange >= 0 ? '+' : ''}{generationMetrics.netSupplyChange}/min
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-yellow-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Holders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatGaiaNumber(marketData.holders)}
            </div>
            <div className="text-sm text-orange-300">
              {formatGaiaNumber(marketData.transactions24h)} transactions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generation and Health Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-green-900/30">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Supply Generation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Generation Rate</span>
                <span className="text-emerald-400 font-bold">{generationMetrics.generationRate} tokens/min</span>
              </div>
              <Progress 
                value={(generationMetrics.generationRate / 200) * 100} 
                className="h-2 bg-emerald-900/30"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Burn Rate</span>
                <span className="text-red-400 font-bold">{generationMetrics.burnRate} tokens/min</span>
              </div>
              <Progress 
                value={(generationMetrics.burnRate / 150) * 100} 
                className="h-2 bg-red-900/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Net Supply Change</span>
                <span className={`font-bold ${generationMetrics.netSupplyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {generationMetrics.netSupplyChange >= 0 ? '+' : ''}{generationMetrics.netSupplyChange} tokens/min
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="text-sm text-muted-foreground">Total Generated Today</div>
              <div className="text-xl font-bold text-emerald-400">
                {formatGaiaNumber(generationMetrics.totalGenerated)} GAiA
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health & Stability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Stability Score</span>
                <span className="text-blue-400 font-bold">{generationMetrics.stabilityScore.toFixed(1)}%</span>
              </div>
              <Progress 
                value={generationMetrics.stabilityScore} 
                className="h-2 bg-blue-900/30"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Health Index</span>
                <span className="text-green-400 font-bold">{generationMetrics.marketHealth.toFixed(1)}%</span>
              </div>
              <Progress 
                value={generationMetrics.marketHealth} 
                className="h-2 bg-green-900/30"
              />
            </div>

            <div className="pt-2 space-y-2">
              <div className="text-sm text-muted-foreground">Last Update</div>
              <div className="text-sm text-blue-300">
                {marketData.lastUpdate.toLocaleTimeString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">System Status</div>
              <div className="flex gap-2">
                <Badge className={`${isActive ? 'bg-green-600' : 'bg-red-600'} text-white text-xs`}>
                  {isActive ? 'OPERATIONAL' : 'SUSPENDED'}
                </Badge>
                <Badge className="bg-blue-600 text-white text-xs">
                  AUTO-SCALING
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Transaction Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                Waiting for transaction activity...
              </div>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-gray-500/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      tx.type === 'mint' ? 'bg-green-400' : 
                      tx.type === 'burn' ? 'bg-red-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-sm capitalize text-white">
                      {tx.type} • {formatGaiaNumber(tx.amount)} GAiA
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${tx.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.impact >= 0 ? '+' : ''}{tx.impact.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}