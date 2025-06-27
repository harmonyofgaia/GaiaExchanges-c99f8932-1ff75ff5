
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, Zap, DollarSign, Shield, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const supportedTokens = [
  { name: 'Harmony of Gaia', symbol: 'GAiA', icon: '🌍', fee: 0 },
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', fee: 0.0001 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', fee: 0.001 },
  { name: 'Solana', symbol: 'SOL', icon: '◎', fee: 0.00005 },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', fee: 0.17 },
  { name: 'Polkadot', symbol: 'DOT', icon: '●', fee: 0.01 },
  { name: 'Chainlink', symbol: 'LINK', icon: '🔗', fee: 0.1 },
  { name: 'Binance Coin', symbol: 'BNB', icon: '🟡', fee: 0.0005 }
]

export function SwapSystem() {
  const [fromToken, setFromToken] = useState(supportedTokens[0])
  const [toToken, setToToken] = useState(supportedTokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedFee, setOptimizedFee] = useState(0)
  const { toast } = useToast()

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const optimizeFees = async () => {
    setIsOptimizing(true)
    
    // Simulate fee optimization
    setTimeout(() => {
      const originalFee = fromToken.fee + toToken.fee
      const optimized = Math.max(0, originalFee * 0.1) // 90% fee reduction
      setOptimizedFee(optimized)
      setIsOptimizing(false)
      
      toast({
        title: "Fee Optimization Complete",
        description: `Found route with ${originalFee === 0 ? 'zero' : (100 - (optimized/originalFee)*100).toFixed(1) + '% lower'} fees`,
      })
    }, 2000)
  }

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} to ${toToken.symbol} with optimized fees`,
    })
  }

  const askCustomerVision = () => {
    toast({
      title: "Customer Vision Request",
      description: "We'd love to hear your thoughts on achieving zero-cost swaps! Please share your ideas with us at Info@cultureofharmony.com",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Sparkles className="h-5 w-5" />
            Zero-Cost Vision Swap System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-primary">How can we achieve zero-cost swaps together?</p>
            <p className="text-sm text-muted-foreground">
              Share your vision and ideas with our transparent community to help us find the best 
              ways to eliminate swap costs for everyone.
            </p>
            <Button onClick={askCustomerVision} variant="outline" className="mt-2">
              Share Your Vision 💡
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Smart Swap Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* From Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">From</label>
            <div className="flex gap-2">
              <select 
                value={fromToken.symbol}
                onChange={(e) => setFromToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[0])}
                className="flex-1 p-3 rounded-lg bg-muted border border-border"
              >
                {supportedTokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.icon} {token.name} ({token.symbol})
                  </option>
                ))}
              </select>
              <Input
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 mono-numbers"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Network Fee: {fromToken.fee} {fromToken.symbol}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button onClick={handleSwapTokens} variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">To</label>
            <select 
              value={toToken.symbol}
              onChange={(e) => setToToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[1])}
              className="w-full p-3 rounded-lg bg-muted border border-border"
            >
              {supportedTokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.name} ({token.symbol})
                </option>
              ))}
            </select>
            <div className="text-sm text-muted-foreground">
              Network Fee: {toToken.fee} {toToken.symbol}
            </div>
          </div>

          {/* Fee Optimization */}
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium">24/7 Fee Optimization</span>
                </div>
                <Button 
                  onClick={optimizeFees} 
                  size="sm" 
                  disabled={isOptimizing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isOptimizing ? 'Optimizing...' : 'Find Cheapest Route'}
                </Button>
              </div>
              
              {optimizedFee !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Original Fee:</span>
                    <span>{(fromToken.fee + toToken.fee).toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Optimized Fee:</span>
                    <span className="text-green-400">{optimizedFee.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>You Save:</span>
                    <span className="text-green-400">
                      {((fromToken.fee + toToken.fee - optimizedFee) / (fromToken.fee + toToken.fee) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Swap Action */}
          <Button 
            onClick={handleSwap}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!fromAmount}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Swap with Optimized Fees
          </Button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-1">
              <Shield className="h-5 w-5 mx-auto text-green-400" />
              <div className="text-sm font-medium">100% Secure</div>
              <div className="text-xs text-muted-foreground">Transparent & Verified</div>
            </div>
            <div className="text-center space-y-1">
              <Zap className="h-5 w-5 mx-auto text-yellow-400" />
              <div className="text-sm font-medium">Instant Swap</div>
              <div className="text-xs text-muted-foreground">No Waiting Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Currencies List */}
      <Card>
        <CardHeader>
          <CardTitle>All Supported Digital Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportedTokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{token.icon}</span>
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <Badge variant="outline" className={token.fee === 0 ? "border-green-500/20 text-green-400" : ""}>
                  {token.fee === 0 ? 'Zero Fee' : `${token.fee} fee`}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
