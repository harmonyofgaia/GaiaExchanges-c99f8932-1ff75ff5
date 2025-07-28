
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RefreshCw,
  BarChart3,
  Zap,
  Shield,
  Globe,
  ArrowUpDown,
  Wallet,
  Clock
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface TradingPair {
  symbol: string
  price: number
  change24h: number
  volume: number
  high24h: number
  low24h: number
}

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

export default function Exchange() {
  const [selectedPair, setSelectedPair] = useState('GAIA/USDT')
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')
  const [orderAmount, setOrderAmount] = useState('')
  const [orderPrice, setOrderPrice] = useState('')
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([])
  const [orderBook, setOrderBook] = useState<{
    bids: OrderBookEntry[]
    asks: OrderBookEntry[]
  }>({ bids: [], asks: [] })

  useEffect(() => {
    // Mock trading pairs data
    setTradingPairs([
      {
        symbol: 'GAIA/USDT',
        price: 0.00085432,
        change24h: 15.73,
        volume: 1250000,
        high24h: 0.00092156,
        low24h: 0.00078234
      },
      {
        symbol: 'GAIA/ETH',
        price: 0.00000034,
        change24h: 8.92,
        volume: 890000,
        high24h: 0.00000037,
        low24h: 0.00000031
      },
      {
        symbol: 'GAIA/BTC',
        price: 0.0000000087,
        change24h: -2.45,
        volume: 567000,
        high24h: 0.0000000091,
        low24h: 0.0000000082
      }
    ])

    // Mock order book data
    setOrderBook({
      bids: [
        { price: 0.00085420, amount: 125000, total: 106.775 },
        { price: 0.00085415, amount: 89000, total: 76.019 },
        { price: 0.00085410, amount: 156000, total: 133.240 }
      ],
      asks: [
        { price: 0.00085435, amount: 98000, total: 83.726 },
        { price: 0.00085440, amount: 112000, total: 95.693 },
        { price: 0.00085445, amount: 87000, total: 74.337 }
      ]
    })
  }, [])

  const handlePlaceOrder = () => {
    const amount = parseFloat(orderAmount)
    const price = parseFloat(orderPrice)
    
    if (amount > 0 && price > 0) {
      toast.success(`${orderType.toUpperCase()} order placed: ${amount} GAIA at $${price}`)
      setOrderAmount('')
      setOrderPrice('')
    } else {
      toast.error('Please enter valid amount and price')
    }
  }

  const TradingPairCard = ({ pair }: { pair: TradingPair }) => (
    <Card 
      className={`cursor-pointer transition-colors ${
        selectedPair === pair.symbol 
          ? 'border-green-500/50 bg-green-900/20' 
          : 'border-gray-500/20 bg-card/50 hover:bg-card/70'
      }`}
      onClick={() => setSelectedPair(pair.symbol)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white">{pair.symbol}</h3>
          <Badge 
            className={`${
              pair.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {pair.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {pair.change24h.toFixed(2)}%
          </Badge>
        </div>
        <div className="text-2xl font-bold text-green-400 mb-2">
          ${pair.price.toFixed(8)}
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>24h High:</span>
            <span className="text-green-400">${pair.high24h.toFixed(8)}</span>
          </div>
          <div className="flex justify-between">
            <span>24h Low:</span>
            <span className="text-red-400">${pair.low24h.toFixed(8)}</span>
          </div>
          <div className="flex justify-between">
            <span>Volume:</span>
            <span>{pair.volume.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const OrderBookTable = ({ orders, type }: { orders: OrderBookEntry[], type: 'bids' | 'asks' }) => (
    <div className="space-y-2">
      <h4 className={`font-semibold ${type === 'bids' ? 'text-green-400' : 'text-red-400'}`}>
        {type === 'bids' ? 'Buy Orders' : 'Sell Orders'}
      </h4>
      <div className="space-y-1">
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-semibold">
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 text-xs">
            <span className={`${type === 'bids' ? 'text-green-400' : 'text-red-400'}`}>
              {order.price.toFixed(8)}
            </span>
            <span className="text-white">{order.amount.toLocaleString()}</span>
            <span className="text-muted-foreground">{order.total.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              💹 GAiA Token Exchange
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Trade GAiA tokens with maximum security and zero fees
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-600">🔥 Dragon Protected</Badge>
                <Badge className="bg-blue-600">⚡ Quantum Secure</Badge>
                <Badge className="bg-purple-600">🌍 Global Access</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* GAiA Token Info */}
        <Card className="border-gold-500/30 bg-gradient-to-r from-gold-900/20 to-yellow-900/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-1">🌟 GAiA</div>
                <div className="text-sm text-muted-foreground">Culture of Harmony Token</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">$0.00085432</div>
                <div className="text-sm text-muted-foreground">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">+15.73%</div>
                <div className="text-sm text-muted-foreground">24h Change</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">1.25M</div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Trading Pairs */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Trading Pairs
            </h2>
            <div className="space-y-3">
              {tradingPairs.map((pair) => (
                <TradingPairCard key={pair.symbol} pair={pair} />
              ))}
            </div>
          </div>

          {/* Main Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Placeholder */}
            <Card className="bg-card/50 border-gray-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{selectedPair} Chart</h3>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <div className="h-64 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 text-green-400 mx-auto" />
                    <p className="text-muted-foreground">Trading chart will appear here</p>
                    <p className="text-sm text-green-400">Real-time price action for {selectedPair}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Placement */}
            <Card className="bg-card/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <ArrowUpDown className="h-5 w-5" />
                  Place Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as 'buy' | 'sell')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-green-600">Buy</TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-red-600">Sell</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Amount (GAIA)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={orderAmount}
                          onChange={(e) => setOrderAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Price (USDT)</label>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={orderPrice}
                          onChange={(e) => setOrderPrice(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handlePlaceOrder}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Place Buy Order
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sell" className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Amount (GAIA)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={orderAmount}
                          onChange={(e) => setOrderAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Price (USDT)</label>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={orderPrice}
                          onChange={(e) => setOrderPrice(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handlePlaceOrder}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Place Sell Order
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Book & Recent Trades */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-card/50 border-gray-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Order Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <OrderBookTable orders={orderBook.asks.reverse()} type="asks" />
                <div className="text-center py-2 border-t border-b border-gray-500/20">
                  <span className="text-2xl font-bold text-green-400">$0.00085432</span>
                </div>
                <OrderBookTable orders={orderBook.bids} type="bids" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Features */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Enhanced Security Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🐲</div>
                <h4 className="font-semibold text-white mb-2">Dragon Protection</h4>
                <p className="text-sm text-muted-foreground">Multi-layer security with dragon-level encryption</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-2">Quantum Security</h4>
                <p className="text-sm text-muted-foreground">Quantum-resistant algorithms protect all transactions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h4 className="font-semibold text-white mb-2">Global Access</h4>
                <p className="text-sm text-muted-foreground">24/7 trading with worldwide accessibility</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
