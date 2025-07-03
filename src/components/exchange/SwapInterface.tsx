
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, TrendingUp, ExternalLink, Shield } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface SwapInterfaceProps {
  title?: string
}

export function SwapInterface({ title = "GAiA Token Swap" }: SwapInterfaceProps) {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USDT')
  const [toCurrency, setToCurrency] = useState('GAiA')

  const handleSwap = () => {
    if (!fromAmount) {
      toast.error('Please enter an amount to swap')
      return
    }
    
    // Calculate swap amount (simplified for demo)
    const swapRate = 8000 // 1 USDT = 8000 GAiA tokens
    const calculatedAmount = parseFloat(fromAmount) * swapRate
    setToAmount(calculatedAmount.toString())
    
    toast.success('Swap Executed!', {
      description: `Swapping ${fromAmount} ${fromCurrency} for ${calculatedAmount.toLocaleString()} ${toCurrency}`,
      duration: 3000
    })
  }

  const reverseSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <ArrowUpDown className="h-6 w-6" />
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={openPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
            <ExternalLink className="h-3 w-3 mr-1" />
            Trade on PumpFun
          </Button>
          <Badge className="bg-green-600">
            <Shield className="h-3 w-3 mr-1" />
            Instant Swap Only
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* From Section */}
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <label className="text-sm text-blue-300 mb-2 block">From</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-black/30 border-blue-500/30 text-blue-300"
              />
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-black/30 border border-blue-500/30 rounded px-3 text-blue-300"
              >
                <option value="USDT">USDT</option>
                <option value="SOL">SOL</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button onClick={reverseSwap} variant="outline" size="icon" className="border-green-500/30 text-green-400">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Section */}
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <label className="text-sm text-green-300 mb-2 block">To</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-black/30 border-green-500/30 text-green-300"
                readOnly
              />
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-black/30 border border-green-500/30 rounded px-3 text-green-300"
              >
                <option value="GAiA">GAiA</option>
                <option value="USDT">USDT</option>
                <option value="SOL">SOL</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          {/* Swap Execute Button */}
          <Button onClick={handleSwap} className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
            <TrendingUp className="h-5 w-5 mr-2" />
            EXECUTE INSTANT SWAP
          </Button>

          {/* Info */}
          <div className="text-xs text-muted-foreground text-center">
            No limit orders • Instant execution only • Connected to PumpFun
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
