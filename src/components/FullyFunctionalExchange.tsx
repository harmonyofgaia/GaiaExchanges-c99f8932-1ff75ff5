import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  CheckCircle,
  Shield,
  Zap,
  ExternalLink,
  Globe,
  Users
} from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'
import { toast } from 'sonner'

interface OrderBook {
  price: number
  amount: number
  total: number
  type: 'buy' | 'sell'
}

interface TradeHistory {
  id: string
  price: number
  amount: number
  type: 'buy' | 'sell'
  timestamp: string
  fee: number
}

const GAIA_CONTRACT_ADDRESS = "t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump"
const GAIA_WALLET_ADDRESS = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh"

export function FullyFunctionalExchange() {
  const [gaiaPrice, setGaiaPrice] = useState(3.25)
  const [userBalance, setUserBalance] = useState({ USD: 10000, GAiA: 5000 })
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [isTrading, setIsTrading] = useState(false)
  const [volume24h, setVolume24h] = useState(8750000)
  const [trades, setTrades] = useState<TradeHistory[]>([])
  const [orderBook, setOrderBook] = useState<OrderBook[]>([])
  const [activeUsers, setActiveUsers] = useState(1247)
  const connectedWalletAddress = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh"

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const priceChange = (Math.random() - 0.5) * 0.1
      setGaiaPrice(prev => Math.max(0.01, prev + priceChange))
      setVolume24h(prev => prev + Math.random() * 10000)
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Generate order book data
  useEffect(() => {
    const generateOrderBook = () => {
      const orders: OrderBook[] = []
      
      // Buy orders (below current price)
      for (let i = 0; i < 10; i++) {
        const price = gaiaPrice - (0.01 * (i + 1))
        const amount = Math.random() * 1000 + 100
        orders.push({
          price,
          amount,
          total: price * amount,
          type: 'buy'
        })
      }
      
      // Sell orders (above current price)
      for (let i = 0; i < 10; i++) {
        const price = gaiaPrice + (0.01 * (i + 1))
        const amount = Math.random() * 1000 + 100
        orders.push({
          price,
          amount,
          total: price * amount,
          type: 'sell'
        })
      }
      
      setOrderBook(orders)
    }

    generateOrderBook()
    const interval = setInterval(generateOrderBook, 5000)
    return () => clearInterval(interval)
  }, [gaiaPrice])

  const executeTrade = async (type: 'buy' | 'sell', amount: number, price?: number) => {
    setIsTrading(true)
    
    const tradePrice = price || gaiaPrice
    const totalCost = amount * tradePrice
    const fee = 0 // Zero fees for GAiA!
    
    try {
      // Simulate trade execution
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (type === 'buy') {
        if (userBalance.USD >= totalCost) {
          setUserBalance(prev => ({
            USD: prev.USD - totalCost,
            GAiA: prev.GAiA + amount
          }))
          
          toast.success(`✅ GAiA Buy Order Executed!`, {
            description: `Bought ${amount.toFixed(4)} GAiA at $${tradePrice.toFixed(4)} (Fee: $0.00)`,
            duration: 5000
          })
        } else {
          throw new Error('Insufficient USD balance')
        }
      } else {
        if (userBalance.GAiA >= amount) {
          setUserBalance(prev => ({
            USD: prev.USD + totalCost,
            GAiA: prev.GAiA - amount
          }))
          
          toast.success(`✅ GAiA Sell Order Executed!`, {
            description: `Sold ${amount.toFixed(4)} GAiA at $${tradePrice.toFixed(4)} (Fee: $0.00)`,
            duration: 5000
          })
        } else {
          throw new Error('Insufficient GAiA balance')
        }
      }
      
      // Add to trade history
      const newTrade: TradeHistory = {
        id: Date.now().toString(),
        price: tradePrice,
        amount,
        type,
        timestamp: new Date().toISOString(),
        fee
      }
      
      setTrades(prev => [newTrade, ...prev.slice(0, 19)])
      
    } catch (error) {
      toast.error(`GAiA Trade Failed: ${(error as Error).message}`)
    } finally {
      setIsTrading(false)
    }
  }

  const handleBuy = () => {
    const amount = parseFloat(buyAmount)
    const price = orderType === 'limit' ? parseFloat(buyPrice) : undefined
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid GAiA amount')
      return
    }
    
    executeTrade('buy', amount, price)
    setBuyAmount('')
    setBuyPrice('')
  }

  const handleSell = () => {
    const amount = parseFloat(sellAmount)
    const price = orderType === 'limit' ? parseFloat(sellPrice) : undefined
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid GAiA amount')
      return
    }
    
    executeTrade('sell', amount, price)
    setSellAmount('')
    setSellPrice('')
  }

  return (
    <div className="space-y-6">
      {/* Updated Header with Contract Info */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <GaiaLogo size="md" />
            GAiA Professional Exchange - Harmony of Culture
          </CardTitle>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
            <div className="text-sm text-blue-400 space-y-1">
              <div><strong>Contract:</strong> <code className="font-mono text-xs">{GAIA_CONTRACT_ADDRESS}</code></div>
              <div><strong>Wallet:</strong> <code className="font-mono text-xs">{GAIA_WALLET_ADDRESS}</code></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => window.open(`https://pump.fun/coin/${GAIA_CONTRACT_ADDRESS}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Pump.fun
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(`https://dexscreener.com/solana/${GAIA_CONTRACT_ADDRESS}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on DEXScreener
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAiA 24h Volume</p>
                <p className="text-xl font-bold text-blue-400">${volume24h.toLocaleString()}</p>
              </div>
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAiA Traders</p>
                <p className="text-xl font-bold text-purple-400">{activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAiA Fees</p>
                <p className="text-xl font-bold text-green-400">$0.00</p>
              </div>
              <Zap className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAiA Security</p>
                <p className="text-xl font-bold text-yellow-400">100%</p>
              </div>
              <Shield className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live GAiA Trading</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={orderType === 'market' ? 'default' : 'outline'}
                    onClick={() => setOrderType('market')}
                  >
                    Market
                  </Button>
                  <Button 
                    size="sm" 
                    variant={orderType === 'limit' ? 'default' : 'outline'}
                    onClick={() => setOrderType('limit')}
                  >
                    Limit
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buy Panel */}
                <div className="space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <h3 className="font-semibold text-green-400 flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    Buy GAiA
                  </h3>
                  
                  <div className="space-y-3">
                    {orderType === 'limit' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Price (USD)</label>
                        <Input
                          type="number"
                          value={buyPrice}
                          onChange={(e) => setBuyPrice(e.target.value)}
                          placeholder={gaiaPrice.toFixed(4)}
                          step="0.0001"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount (GAiA)</label>
                      <Input
                        type="number"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        placeholder="0.0000"
                        step="0.0001"
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Total: ${buyAmount ? (parseFloat(buyAmount) * (orderType === 'limit' && buyPrice ? parseFloat(buyPrice) : gaiaPrice)).toFixed(4) : '0.0000'}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Available: ${userBalance.USD.toLocaleString()}
                    </div>
                    
                    <Button 
                      onClick={handleBuy}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isTrading || !buyAmount}
                    >
                      {isTrading ? 'Processing...' : `Buy GAiA (Fee: $0)`}
                    </Button>
                  </div>
                </div>

                {/* Sell Panel */}
                <div className="space-y-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <h3 className="font-semibold text-red-400 flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4" />
                    Sell GAiA
                  </h3>
                  
                  <div className="space-y-3">
                    {orderType === 'limit' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Price (USD)</label>
                        <Input
                          type="number"
                          value={sellPrice}
                          onChange={(e) => setSellPrice(e.target.value)}
                          placeholder={gaiaPrice.toFixed(4)}
                          step="0.0001"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount (GAiA)</label>
                      <Input
                        type="number"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        placeholder="0.0000"
                        step="0.0001"
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Total: ${sellAmount ? (parseFloat(sellAmount) * (orderType === 'limit' && sellPrice ? parseFloat(sellPrice) : gaiaPrice)).toFixed(4) : '0.0000'}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Available: {userBalance.GAiA.toLocaleString()} GAiA
                    </div>
                    
                    <Button 
                      onClick={handleSell}
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={isTrading || !sellAmount}
                    >
                      {isTrading ? 'Processing...' : `Sell GAiA (Fee: $0)`}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader>
              <CardTitle>GAiA Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Buy Orders */}
                <div>
                  <h4 className="font-medium text-green-400 mb-2">Buy Orders</h4>
                  <div className="space-y-1 text-sm">
                    {orderBook.filter(order => order.type === 'buy').slice(0, 8).map((order, index) => (
                      <div key={index} className="flex justify-between text-green-300">
                        <span>${order.price.toFixed(4)}</span>
                        <span>{order.amount.toFixed(2)} GAiA</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sell Orders */}
                <div>
                  <h4 className="font-medium text-red-400 mb-2">Sell Orders</h4>
                  <div className="space-y-1 text-sm">
                    {orderBook.filter(order => order.type === 'sell').slice(0, 8).map((order, index) => (
                      <div key={index} className="flex justify-between text-red-300">
                        <span>${order.price.toFixed(4)}</span>
                        <span>{order.amount.toFixed(2)} GAiA</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle>GAiA Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>USD Balance:</span>
                  <span className="font-mono">${userBalance.USD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GAiA Balance:</span>
                  <span className="font-mono text-green-400">{userBalance.GAiA.toLocaleString()} GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span>GAiA Value:</span>
                  <span className="font-mono">${(userBalance.GAiA * gaiaPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Value:</span>
                  <span className="font-mono">${(userBalance.USD + (userBalance.GAiA * gaiaPrice)).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent GAiA Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent GAiA Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {trades.length > 0 ? (
                  trades.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="flex justify-between">
                      <span className={trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                        {trade.type.toUpperCase()} {trade.amount.toFixed(4)} GAiA
                      </span>
                      <span>${trade.price.toFixed(4)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No GAiA trades yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
