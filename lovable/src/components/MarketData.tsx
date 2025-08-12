
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CoinData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
}

// Mock data for demonstration
const mockCoinData: CoinData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.67,
    change24h: 2.34,
    volume: 15420000000,
    marketCap: 847000000000
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2543.21,
    change24h: -1.87,
    volume: 8750000000,
    marketCap: 305000000000
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4234,
    change24h: 4.56,
    volume: 450000000,
    marketCap: 15000000000
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.76,
    change24h: -3.21,
    volume: 1200000000,
    marketCap: 43000000000
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.89,
    change24h: 1.23,
    volume: 890000000,
    marketCap: 9800000000
  }
]

export function MarketData() {
  const [coins, setCoins] = useState<CoinData[]>(mockCoinData)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002), // ±0.1% random change
          change24h: coin.change24h + (Math.random() - 0.5) * 0.1
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${(volume / 1e3).toFixed(2)}K`
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'price-up'
    if (change < 0) return 'price-down'
    return 'price-neutral'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {coins.map((coin) => (
            <div 
              key={coin.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {coin.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mono-numbers font-medium">
                  {formatPrice(coin.price)}
                </div>
                <div className={`text-sm flex items-center gap-1 ${getPriceChangeColor(coin.change24h)}`}>
                  {coin.change24h > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(coin.change24h).toFixed(2)}%
                </div>
              </div>
              
              <div className="text-right text-sm text-muted-foreground">
                <div>Vol: {formatVolume(coin.volume)}</div>
                <div>MCap: {formatVolume(coin.marketCap)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
