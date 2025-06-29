
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, BarChart3 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { GaiaLogo } from './GaiaLogo'

export function TradingInterface() {
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock current price and wallet balance
  const currentPrice = 3.00
  const gaiaBalance = 15750.25
  const usdBalance = 5000.00

  const handleBuy = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to buy",
        variant: "destructive",
      })
      return
    }

    const usdAmount = parseFloat(buyAmount)
    if (usdAmount > usdBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough USD balance",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const tokensReceived = usdAmount / currentPrice
      toast({
        title: "Purchase Successful",
        description: `Bought ${tokensReceived.toFixed(2)} GAiA tokens for $${usdAmount}`,
      })
      setBuyAmount('')
      setIsLoading(false)
    }, 2000)
  }

  const handleSell = async () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to sell",
        variant: "destructive",
      })
      return
    }

    const tokenAmount = parseFloat(sellAmount)
    if (tokenAmount > gaiaBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough GAiA tokens",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const usdReceived = tokenAmount * currentPrice
      toast({
        title: "Sale Successful",
        description: `Sold ${tokenAmount} GAiA tokens for $${usdReceived.toFixed(2)}`,
      })
      setSellAmount('')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GaiaLogo size="lg" variant="white-fade" />
              <span>GAiA Token Trading</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-500/20 text-green-400">
                <Activity className="h-3 w-3 mr-1" />
                Trading Active
              </Badge>
              <Badge variant="outline" className="border-blue-500/20 text-blue-400">
                Pump.fun Integrated
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Live Trading Chart */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <GaiaLogo size="md" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Live GAiA Trading Chart</h3>
                    <div className="text-3xl font-bold mono-numbers text-green-400">${currentPrice.toFixed(2)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Pump.fun Token</div>
                  <a 
                    href="https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center gap-1"
                  >
                    <BarChart3 className="h-3 w-3" />
                    View Live Chart
                  </a>
                </div>
              </div>
              
              {/* Embedded Chart Placeholder */}
              <div className="h-64 bg-black/20 rounded border border-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-green-400 font-semibold">Live Trading Chart</div>
                  <div className="text-sm text-muted-foreground">Real-time price movements</div>
                  <div className="text-sm text-green-400 mt-2">↗ +2.34% in the last 24 hours</div>
                </div>
              </div>
            </div>

            {/* Instant Trading Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buy Section */}
              <div className="space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="font-medium">Instant Buy GAiA</span>
                  <GaiaLogo size="sm" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                    <Input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      className="mono-numbers"
                      min="0"
                      step="0.01"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      Available: ${usdBalance.toLocaleString()}
                    </div>
                  </div>
                  
                  {buyAmount && (
                    <div className="text-sm text-green-400">
                      You will receive: ~{(parseFloat(buyAmount) / currentPrice).toFixed(2)} GAiA
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleBuy}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!buyAmount || isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Buy GAiA Instantly'}
                  </Button>
                </div>
              </div>
              
              {/* Sell Section */}
              <div className="space-y-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="font-medium">Instant Sell GAiA</span>
                  <GaiaLogo size="sm" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (GAiA)</label>
                    <Input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="0.00"
                      className="mono-numbers"
                      min="0"
                      step="0.01"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      Available: {gaiaBalance.toLocaleString()} GAiA
                    </div>
                  </div>
                  
                  {sellAmount && (
                    <div className="text-sm text-red-400">
                      You will receive: ~${(parseFloat(sellAmount) * currentPrice).toFixed(2)}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleSell}
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={!sellAmount || isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Sell GAiA Instantly'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Trading Features */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary mb-3">Trading Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instant Trading:</span>
                    <span className="text-green-400">✓ Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Charts:</span>
                    <span className="text-green-400">✓ Real-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Orders:</span>
                    <span className="text-green-400">✓ Instant Execution</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Real-time Pricing:</span>
                    <span className="text-green-400">✓ Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transparent Fees:</span>
                    <span className="text-green-400">✓ 0% Trading Fee</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Environmental Impact:</span>
                    <span className="text-green-400">✓ 100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <GaiaLogo size="sm" />
                <h4 className="font-medium text-blue-400">Instant Market Trading</h4>
              </div>
              <p className="text-sm text-blue-300">
                Our trading system focuses on instant market execution with live price feeds. 
                Buy and sell directly at current market prices with zero fees. All trades support 
                environmental causes through our coral reef restoration program.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
