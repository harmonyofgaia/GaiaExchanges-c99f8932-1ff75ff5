
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpDown, TrendingUp, Zap, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Swap() {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('GAiA')
  const [toCurrency, setToCurrency] = useState('ETH')
  const [feeOption, setFeeOption] = useState('standard')

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    
    toast.success(`🔄 Swapping ${fromAmount} ${fromCurrency} to ${toCurrency}`)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🔄 GAiA Token Swap Exchange
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Zero Fees Available • Instant Swaps • Multi-Chain Support
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Swap Interface */}
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">💱 Token Swap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">From</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="flex-1 bg-black/30 border-green-500/30"
                  />
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32 bg-black/30 border-green-500/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GAiA">GAiA</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={swapCurrencies}
                  variant="outline" 
                  size="sm"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">To</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1 bg-black/30 border-green-500/30"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32 bg-black/30 border-green-500/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="GAiA">GAiA</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fee Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Fee Option</label>
                <Select value={feeOption} onValueChange={setFeeOption}>
                  <SelectTrigger className="bg-black/30 border-green-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zero">🎁 Zero Fees (Premium)</SelectItem>
                    <SelectItem value="standard">⚡ Standard (0.1%)</SelectItem>
                    <SelectItem value="community">🌍 Community Vault (0.05%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSwap}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Execute Swap
              </Button>
            </CardContent>
          </Card>

          {/* Market Data */}
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">📊 Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <div className="text-lg font-bold text-green-400">$0.000125</div>
                  <div className="text-xs text-muted-foreground">GAiA Price</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">+12.5%</div>
                  <div className="text-xs text-muted-foreground">24h Change</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">📈 Trading Pairs</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>GAiA/ETH</span>
                    <span className="text-green-400">+5.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GAiA/BTC</span>
                    <span className="text-green-400">+3.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GAiA/SOL</span>
                    <span className="text-green-400">+7.1%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-2">🎯 Contract Info</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Contract: t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump</div>
                  <div>Wallet: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
