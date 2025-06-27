
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function TradingInterface() {
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('43250.67')
  const [sellPrice, setSellPrice] = useState('43250.67')

  const handleBuyOrder = () => {
    console.log('Buy order placed:', { amount: buyAmount, price: buyPrice })
    // Here you would integrate with your trading API
  }

  const handleSellOrder = () => {
    console.log('Sell order placed:', { amount: sellAmount, price: sellPrice })
    // Here you would integrate with your trading API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade BTC/USD</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spot" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="spot">Spot Trading</TabsTrigger>
            <TabsTrigger value="margin">Margin Trading</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spot" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Buy Section */}
              <div className="space-y-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="font-medium">Buy BTC</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="buy-price">Price (USD)</Label>
                    <Input
                      id="buy-price"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      className="mono-numbers"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="buy-amount">Amount (BTC)</Label>
                    <Input
                      id="buy-amount"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00000000"
                      className="mono-numbers"
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Total: ${(parseFloat(buyAmount || '0') * parseFloat(buyPrice)).toLocaleString()}
                  </div>
                  
                  <Button 
                    onClick={handleBuyOrder}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Buy BTC
                  </Button>
                </div>
              </div>
              
              {/* Sell Section */}
              <div className="space-y-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="font-medium">Sell BTC</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="sell-price">Price (USD)</Label>
                    <Input
                      id="sell-price"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      className="mono-numbers"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sell-amount">Amount (BTC)</Label>
                    <Input
                      id="sell-amount"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="0.00000000"
                      className="mono-numbers"
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Total: ${(parseFloat(sellAmount || '0') * parseFloat(sellPrice)).toLocaleString()}
                  </div>
                  
                  <Button 
                    onClick={handleSellOrder}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Sell BTC
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="margin">
            <div className="text-center py-8 text-muted-foreground">
              <p>Margin trading features coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
