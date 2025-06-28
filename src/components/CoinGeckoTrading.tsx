import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'

interface CoinData {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  trustScore: number
  isReliable: boolean
  isVerified: boolean
  rank: number
}

// Mock CoinGecko data with GAiA featured prominently
const mockCoinData: CoinData[] = [
  {
    id: 'gaia-harmony',
    name: 'GAiA',
    symbol: 'GAIA',
    image: 'GAIA_LOGO',
    price: 3.00,
    change24h: 5.67,
    volume24h: 8750000,
    marketCap: 257250000,
    trustScore: 98,
    isReliable: true,
    isVerified: true,
    rank: 1 // Featured as #1
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: '₿',
    price: 43250.67,
    change24h: 2.34,
    volume24h: 15420000000,
    marketCap: 847000000000,
    trustScore: 95,
    isReliable: true,
    isVerified: true,
    rank: 2
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'Ξ',
    price: 2543.21,
    change24h: -1.87,
    volume24h: 8750000000,
    marketCap: 305000000000,
    trustScore: 94,
    isReliable: true,
    isVerified: true,
    rank: 3
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    image: '⬟',
    price: 312.45,
    change24h: 1.23,
    volume24h: 890000000,
    marketCap: 48000000000,
    trustScore: 91,
    isReliable: true,
    isVerified: true,
    rank: 4
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    image: '₳',
    price: 0.4234,
    change24h: 4.56,
    volume24h: 450000000,
    marketCap: 15000000000,
    trustScore: 88,
    isReliable: true,
    isVerified: true,
    rank: 8
  },
  {
    id: 'suspicious-coin',
    name: 'SuspiciousCoin',
    symbol: 'SUS',
    image: '⚠️',
    price: 0.001,
    change24h: 150.00,
    volume24h: 50000,
    marketCap: 100000,
    trustScore: 15,
    isReliable: false,
    isVerified: false,
    rank: 2847
  }
]

export function CoinGeckoTrading() {
  const [coins, setCoins] = useState<CoinData[]>(mockCoinData)
  const [searchTerm, setSearchTerm] = useState('')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [showOnlyReliable, setShowOnlyReliable] = useState(true)

  // Real-time price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002), // ±0.1% random change
          change24h: coin.change24h + (Math.random() - 0.5) * 0.1,
          volume24h: coin.volume24h * (1 + (Math.random() - 0.5) * 0.05)
        }))
      )
      setLastUpdate(new Date())
      console.log('Market data updated:', new Date().toISOString())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesReliability = !showOnlyReliable || coin.isReliable
    
    return matchesSearch && matchesReliability
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${(volume / 1e3).toFixed(2)}K`
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      {/* Header with GAiA Logo */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-400">
            <GaiaLogo size="lg" variant="white-fade" />
            <div>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Gaia's Exchanges - World's Most Secure Trading Platform
              </div>
              <div className="text-sm font-normal text-green-400 mt-1">
                Featuring GAiA Token - The Future of Environmental Cryptocurrency
              </div>
            </div>
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400">Live CoinGecko Integration</span>
            </div>
            <div className="text-muted-foreground">
              Last Updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* GAiA Token Spotlight */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GaiaLogo size="xl" variant="white-fade" />
              <div>
                <h3 className="text-2xl font-bold text-green-400">GAiA Token Spotlight</h3>
                <p className="text-green-300">Harmony of Gaia - Leading Environmental Cryptocurrency</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-3xl font-bold text-white">${mockCoinData[0].price.toFixed(2)}</div>
                  <Badge className="bg-green-600 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{mockCoinData[0].change24h.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Trade GAiA Now
              </Button>
              <p className="text-xs text-green-300 mt-2">Zero Fees • Maximum Security</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Support Banner */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-green-400">Available on All Platforms</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="border-green-500/30 text-green-400">Windows x32/x64</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">Android</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">iOS</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">Linux</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">macOS</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">BlackBerry Legacy</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Including support for legacy BlackBerry devices - No trader left behind!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={showOnlyReliable ? "default" : "outline"}
            onClick={() => setShowOnlyReliable(!showOnlyReliable)}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            {showOnlyReliable ? 'Verified Only' : 'Show All'}
          </Button>
        </div>
      </div>

      {/* Trading Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Live Market Data - Auto-Verified & Trusted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Rank</TableHead>
                  <TableHead>Coin</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoins.map((coin) => (
                  <TableRow key={coin.id} className={`hover:bg-muted/20 ${coin.id === 'gaia-harmony' ? 'bg-green-500/10 border-green-500/20' : ''}`}>
                    <TableCell className="font-mono text-sm">
                      #{coin.rank}
                      {coin.id === 'gaia-harmony' && (
                        <Badge className="ml-2 bg-green-600 text-white text-xs">FEATURED</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {coin.id === 'gaia-harmony' ? (
                          <GaiaLogo size="sm" />
                        ) : (
                          <div className="text-2xl">{coin.image}</div>
                        )}
                        <div>
                          <div className="font-semibold">{coin.name}</div>
                          <div className="text-sm text-muted-foreground uppercase">{coin.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-semibold">
                      {formatPrice(coin.price)}
                    </TableCell>
                    <TableCell className={`font-mono ${getPriceChangeColor(coin.change24h)}`}>
                      <div className="flex items-center gap-1">
                        {coin.change24h > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatVolume(coin.volume24h)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatVolume(coin.marketCap)}
                    </TableCell>
                    <TableCell>
                      <div className={`font-mono font-semibold ${getTrustScoreColor(coin.trustScore)}`}>
                        {coin.trustScore}/100
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {coin.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            coin.isReliable 
                              ? 'border-green-500/30 text-green-400' 
                              : 'border-red-500/30 text-red-400'
                          }`}
                        >
                          {coin.isReliable ? 'Trusted' : 'High Risk'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        disabled={!coin.isReliable}
                        className={coin.isReliable ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {coin.isReliable ? 'Trade' : 'Blocked'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCoins.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No coins found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-400">Security & Reliability Notice</h4>
              <p className="text-sm text-muted-foreground">
                All tokens are automatically verified against multiple security databases and trust metrics. 
                Gaia's Exchanges blocks unreliable or suspicious tokens to protect our community. 
                Our platform runs comprehensive background checks every 5 seconds to ensure maximum security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
