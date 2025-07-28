import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  Globe, 
  Zap, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'

interface ExchangeStatus {
  name: string
  status: 'connected' | 'pending' | 'error'
  volume24h: number
  apiHealth: number
  lastUpdate: string
}

interface IntegrationProgress {
  binance: number
  coinbase: number
  kraken: number
  coinmarketcap: number
  coingecko: number
}

export function ExchangeIntegration() {
  const [exchanges, setExchanges] = useState<ExchangeStatus[]>([
    {
      name: 'Binance',
      status: 'connected',
      volume24h: 2847356,
      apiHealth: 98,
      lastUpdate: '2 minutes ago'
    },
    {
      name: 'Coinbase',
      status: 'pending',
      volume24h: 1234567,
      apiHealth: 85,
      lastUpdate: '5 minutes ago'
    },
    {
      name: 'Kraken',
      status: 'connected',
      volume24h: 987654,
      apiHealth: 92,
      lastUpdate: '1 minute ago'
    },
    {
      name: 'KuCoin',
      status: 'error',
      volume24h: 0,
      apiHealth: 0,
      lastUpdate: '15 minutes ago'
    }
  ])

  const [integrationProgress, setIntegrationProgress] = useState<IntegrationProgress>({
    binance: 100,
    coinbase: 75,
    kraken: 90,
    coinmarketcap: 60,
    coingecko: 80
  })

  const [gaiaPrice, setGaiaPrice] = useState(0.00125)
  const [priceChange24h, setPriceChange24h] = useState(12.5)

  useEffect(() => {
    // Simulate real-time price updates
    const priceInterval = setInterval(() => {
      setGaiaPrice(prev => {
        const change = (Math.random() - 0.5) * 0.0001
        return Math.max(0.0001, prev + change)
      })
      setPriceChange24h(prev => prev + (Math.random() - 0.5) * 2)
    }, 3000)

    // Simulate API health updates
    const healthInterval = setInterval(() => {
      setExchanges(prev => prev.map(exchange => ({
        ...exchange,
        apiHealth: Math.max(70, exchange.apiHealth + (Math.random() - 0.5) * 10),
        volume24h: exchange.volume24h + Math.floor(Math.random() * 10000)
      })))
    }, 5000)

    return () => {
      clearInterval(priceInterval)
      clearInterval(healthInterval)
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-600'
      case 'pending':
        return 'bg-yellow-600'
      case 'error':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const retryConnection = (exchangeName: string) => {
    toast.success(`🔄 Retrying connection to ${exchangeName}...`)
    setExchanges(prev => prev.map(exchange => 
      exchange.name === exchangeName 
        ? { ...exchange, status: 'pending' as const }
        : exchange
    ))
    
    setTimeout(() => {
      setExchanges(prev => prev.map(exchange => 
        exchange.name === exchangeName 
          ? { ...exchange, status: 'connected' as const, apiHealth: 95 }
          : exchange
      ))
      toast.success(`✅ Successfully connected to ${exchangeName}!`)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* GAIA Token Price Overview */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <DollarSign className="h-6 w-6" />
            💎 GAIA Token Live Price
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">${gaiaPrice.toFixed(6)}</div>
              <div className="text-sm text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">24h Change</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                ${exchanges.reduce((sum, ex) => sum + ex.volume24h, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">24h Volume</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exchange Connections */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Globe className="h-6 w-6" />
            🌍 Live Exchange Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exchanges.map((exchange, index) => (
              <Card key={index} className="border-gray-600/50 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{exchange.name}</span>
                      {getStatusIcon(exchange.status)}
                    </div>
                    <Badge className={`${getStatusColor(exchange.status)} text-white text-xs`}>
                      {exchange.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">API Health</span>
                      <span className="text-green-400">{exchange.apiHealth}%</span>
                    </div>
                    <Progress value={exchange.apiHealth} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">24h Volume</span>
                      <span className="text-blue-400">${exchange.volume24h.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Update</span>
                      <span className="text-gray-400">{exchange.lastUpdate}</span>
                    </div>
                    
                    {exchange.status === 'error' && (
                      <Button 
                        onClick={() => retryConnection(exchange.name)}
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        🔄 Retry Connection
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Progress */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Zap className="h-6 w-6" />
            ⚡ Integration Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(integrationProgress).map(([platform, progress]) => (
              <div key={platform} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-white capitalize">{platform.replace('_', ' ')}</span>
                  <span className="text-purple-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  {progress === 100 ? '✅ Fully integrated' : 
                   progress >= 80 ? '🔄 Final testing phase' :
                   progress >= 60 ? '⚡ API integration in progress' :
                   '🔨 Development phase'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Features */}
      <Card className="border-orange-500/30 bg-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <TrendingUp className="h-6 w-6" />
            📈 Live Trading Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-orange-400">🎯 Available Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Real-time price tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Multi-exchange arbitrage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Advanced order types
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  Automated trading bots
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  Portfolio management
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-blue-400">🌐 Global Reach:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Badge className="bg-green-600 justify-center py-2">🇺🇸 US Markets</Badge>
                <Badge className="bg-blue-600 justify-center py-2">🇪🇺 EU Markets</Badge>
                <Badge className="bg-purple-600 justify-center py-2">🇯🇵 Asian Markets</Badge>
                <Badge className="bg-orange-600 justify-center py-2">🌍 Global Access</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
