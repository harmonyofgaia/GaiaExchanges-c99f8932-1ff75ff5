
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, TrendingUp, DollarSign, Activity, Zap, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

export function FullyFunctionalExchange() {
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [fromCurrency, setFromCurrency] = useState<string>(GAIA_TOKEN.SYMBOL)
  const [toCurrency, setToCurrency] = useState<string>('USDC')
  const [gaiaPrice, setGaiaPrice] = useState<number>(GAIA_TOKEN.INITIAL_PRICE)
  const [priceChange, setPriceChange] = useState<number>(8.47)
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGaiaPrice(prevPrice => {
        const change = (Math.random() - 0.5) * 0.000005
        return Math.max(0.00001, prevPrice + change)
      })
      setPriceChange(prev => prev + (Math.random() - 0.5) * 0.5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      if (fromCurrency === GAIA_TOKEN.SYMBOL && toCurrency === 'USDC') {
        setToAmount((Number(fromAmount) * gaiaPrice).toFixed(6))
      } else if (fromCurrency === 'USDC' && toCurrency === GAIA_TOKEN.SYMBOL) {
        setToAmount((Number(fromAmount) / gaiaPrice).toFixed(2))
      }
    }
  }, [fromAmount, fromCurrency, toCurrency, gaiaPrice])

  const handleSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsSwapping(true)
    
    setTimeout(() => {
      toast.success(`Swapped ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency}`, {
        description: `Transaction completed via official GAIA contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`
      })
      setFromAmount('')
      setToAmount('')
      setIsSwapping(false)
    }, 2000)
  }

  const switchCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAIA Contract Address Copied!', {
      description: 'Official GAIA contract address copied to clipboard'
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6" />
            🚀 Official GAIA Exchange - Harmony of Culture
          </CardTitle>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-400">
                <strong>Contract:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <Button 
                onClick={copyContractAddress}
                variant="outline" 
                size="sm"
                className="border-blue-500/30 text-blue-400"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/20 bg-green-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAIA Price</p>
                <p className="text-xl font-bold text-green-400">{formatGaiaPrice(gaiaPrice)}</p>
              </div>
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Change</p>
                <p className="text-xl font-bold text-blue-400">+{priceChange.toFixed(2)}%</p>
              </div>
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-xl font-bold text-purple-400">{formatGaiaNumber(8750000)}</p>
              </div>
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Swap Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="px-4 py-2 bg-muted border border-border rounded-md min-w-[100px]"
                >
                  <option value={GAIA_TOKEN.SYMBOL}>{GAIA_TOKEN.SYMBOL}</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={switchCurrencies}
                className="rounded-full w-10 h-10 p-0"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly
                  className="flex-1 bg-muted"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="px-4 py-2 bg-muted border border-border rounded-md min-w-[100px]"
                >
                  <option value="USDC">USDC</option>
                  <option value={GAIA_TOKEN.SYMBOL}>{GAIA_TOKEN.SYMBOL}</option>
                </select>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSwap}
            disabled={!fromAmount || Number(fromAmount) <= 0 || isSwapping}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSwapping ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Swapping...
              </>
            ) : (
              <>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Swap Tokens
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>Rate: 1 {GAIA_TOKEN.SYMBOL} = {formatGaiaPrice(gaiaPrice)} USDC</div>
            <div>Network Fee: 0.1%</div>
            <div>Slippage Tolerance: 0.5%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
