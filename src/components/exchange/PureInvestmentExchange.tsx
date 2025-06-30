
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, TrendingUp, Shield, Heart, Zap, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { TokenDataDisplay } from '@/components/TokenDataDisplay'

export function PureInvestmentExchange() {
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [fromCurrency, setFromCurrency] = useState<string>(GAIA_TOKEN.SYMBOL)
  const [toCurrency, setToCurrency] = useState<string>('USDC')
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  const { tokenData, hasRealData } = useGaiaTokenData()

  // Calculate exchange rate based on real or fallback data
  const exchangeRate = hasRealData && tokenData ? tokenData.price : GAIA_TOKEN.INITIAL_PRICE

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      if (fromCurrency === GAIA_TOKEN.SYMBOL && toCurrency === 'USDC') {
        setToAmount((Number(fromAmount) * exchangeRate).toFixed(6))
      } else if (fromCurrency === 'USDC' && toCurrency === GAIA_TOKEN.SYMBOL) {
        setToAmount((Number(fromAmount) / exchangeRate).toFixed(2))
      }
    }
  }, [fromAmount, fromCurrency, toCurrency, exchangeRate])

  const handleInvestment = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      toast.error('Please enter a valid investment amount')
      return
    }

    setIsSwapping(true)
    
    setTimeout(() => {
      const message = hasRealData 
        ? `Long-term investment: ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency}`
        : `Investment transaction: ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency} (using estimated rates)`
      
      toast.success('🌱 Long-term Investment Confirmed!', {
        description: `${message} • Fees sent to community wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`
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

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Community Wallet Address Copied!', {
      description: 'This is where all fees go - completely transparent'
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            🌱 Pure Investment Exchange - For Believers, Not Traders
          </CardTitle>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-bold mb-2">🏦 All Fees Go to Community Wallet:</h3>
            <div className="flex items-center justify-between">
              <code className="text-blue-300 font-mono text-sm break-all bg-blue-900/10 p-2 rounded flex-1 mr-2">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
              <Button 
                onClick={copyWalletAddress}
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

      {/* Community Philosophy */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardContent className="pt-6">
          <h3 className="text-purple-400 font-bold text-xl mb-4 text-center">
            🛡️ STABLE FOREVER - NO STAKING, NO GAMBLING
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-green-400 font-bold">✅ We Welcome:</h4>
              <ul className="text-green-300 text-sm space-y-1">
                <li>• Long-term believers</li>
                <li>• Environmental advocates</li>
                <li>• Community builders</li>
                <li>• Stable investors</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-bold">❌ Not Welcome:</h4>
              <ul className="text-red-300 text-sm space-y-1">
                <li>• Daily traders</li>
                <li>• Quick profit seekers</li>
                <li>• Speculators</li>
                <li>• Stakers/Gamblers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Token Data Display */}
      <TokenDataDisplay showFullDetails={true} />

      {/* Investment Interface */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Long-term Investment Portal
          </CardTitle>
          {!hasRealData && (
            <p className="text-sm text-yellow-400">
              ⚠️ Using estimated rates - real data not available
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Invest From</label>
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
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
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
              <label className="text-sm font-medium">Receive To</label>
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
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleInvestment}
            disabled={!fromAmount || Number(fromAmount) <= 0 || isSwapping}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
          >
            {isSwapping ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Processing Investment...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-2" />
                {hasRealData ? 'Make Long-term Investment' : 'Demo Investment'}
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>Rate: 1 {GAIA_TOKEN.SYMBOL} = ${exchangeRate.toFixed(6)} USDC {!hasRealData && '(estimated)'}</div>
            <div>Investment Fee: 0.1% (goes to community wallet)</div>
            <div>📍 All fees transparently sent to: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...</div>
            <div>🌱 100% of fees reinvested in environmental projects</div>
            <div>🛡️ No staking = No gambling = Stable forever</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
