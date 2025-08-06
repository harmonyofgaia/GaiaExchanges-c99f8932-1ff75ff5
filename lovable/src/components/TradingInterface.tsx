
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, ArrowUpDown, ExternalLink } from 'lucide-react'
import { GAIA_TOKEN, formatGaiaPrice } from '@/constants/gaia'
import { toast } from 'sonner'

export function TradingInterface() {
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [selectedPair, setSelectedPair] = useState('GAiA/USDT')

  const pairs = [
    { symbol: 'GAiA/USDT', price: 0.000125, change: 5.67 },
    { symbol: 'GAiA/SOL', price: 0.0000012, change: 3.45 },
    { symbol: 'GAiA/BTC', price: 0.000000003, change: -1.23 }
  ]

  const handleBuy = () => {
    if (!buyAmount) {
      toast.error('Please enter an amount to buy')
      return
    }
    toast.success('Buy Order Placed!', {
      description: `Buying ${buyAmount} GAiA tokens`,
      duration: 3000
    })
  }

  const handleSell = () => {
    if (!sellAmount) {
      toast.error('Please enter an amount to sell')
      return
    }
    toast.success('Sell Order Placed!', {
      description: `Selling ${sellAmount} GAiA tokens`,
      duration: 3000
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <ArrowUpDown className="h-6 w-6" />
          GAiA Trading Interface
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={openPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
            <ExternalLink className="h-3 w-3 mr-1" />
            Trade on PumpFun
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spot" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="spot">Spot Trading</TabsTrigger>
            <TabsTrigger value="pairs">Trading Pairs</TabsTrigger>
          </TabsList>

          <TabsContent value="spot" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Buy Section */}
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Buy GAiA</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-green-300">Amount (USDT)</label>
                    <Input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-black/30 border-green-500/30 text-green-300"
                    />
                  </div>
                  <div className="text-sm text-green-300">
                    ≈ {buyAmount ? (parseFloat(buyAmount) / 0.000125).toLocaleString() : '0'} GAiA
                  </div>
                  <Button onClick={handleBuy} className="w-full bg-green-600 hover:bg-green-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Buy GAiA
                  </Button>
                </div>
              </div>

              {/* Sell Section */}
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Sell GAiA</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-red-300">Amount (GAiA)</label>
                    <Input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-black/30 border-red-500/30 text-red-300"
                    />
                  </div>
                  <div className="text-sm text-red-300">
                    ≈ ${sellAmount ? (parseFloat(sellAmount) * 0.000125).toFixed(6) : '0.000000'}
                  </div>
                  <Button onClick={handleSell} className="w-full bg-red-600 hover:bg-red-700">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Sell GAiA
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pairs" className="space-y-4">
            <div className="space-y-3">
              {pairs.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-500/30">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🪙</div>
                    <div>
                      <div className="font-bold text-white">{pair.symbol}</div>
                      <div className="text-sm text-gray-400">{formatGaiaPrice(pair.price)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${pair.change >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                      {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
