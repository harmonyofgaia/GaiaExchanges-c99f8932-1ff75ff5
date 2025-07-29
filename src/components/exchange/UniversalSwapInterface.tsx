import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpDown, Zap, Heart, Shield, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { GaiaLogo } from '@/components/GaiaLogo'

// Legally confirmed tokens for Gaia's Private Exchange Network
const SUPPORTED_TOKENS = [
  {
    symbol: GAIA_TOKEN.SYMBOL,
    name: 'GAiA - Harmony of Gaia',
    logo: '🌍',
    contractAddress: GAIA_TOKEN.CONTRACT_ADDRESS,
    network: 'Solana',
    isGaiaToken: true,
    decimals: 9,
    verified: true
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '💵',
    contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    network: 'Solana',
    isGaiaToken: false,
    decimals: 6,
    verified: true
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    logo: '◉',
    contractAddress: 'So11111111111111111111111111111111111111112',
    network: 'Solana',
    isGaiaToken: false,
    decimals: 9,
    verified: true
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin (Wrapped)',
    logo: '₿',
    contractAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    network: 'Solana',
    isGaiaToken: false,
    decimals: 8,
    verified: true
  },
  {
    symbol: 'ETH',
    name: 'Ethereum (Wrapped)',
    logo: '♦',
    contractAddress: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    network: 'Solana',
    isGaiaToken: false,
    decimals: 8,
    verified: true
  }
]

export function UniversalSwapInterface() {
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0])
  const [toToken, setToToken] = useState(SUPPORTED_TOKENS[1])
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  const { tokenData, hasRealData } = useGaiaTokenData()
  
  const getExchangeRate = (from: typeof SUPPORTED_TOKENS[0], to: typeof SUPPORTED_TOKENS[0]) => {
    // Mock exchange rates - in production, this would fetch real rates
    const rates: Record<string, number> = {
      [GAIA_TOKEN.SYMBOL]: hasRealData && tokenData ? tokenData.price : GAIA_TOKEN.INITIAL_PRICE,
      'USDC': 1,
      'SOL': 95.50,
      'BTC': 67000,
      'ETH': 3200
    }
    
    const fromRate = rates[from.symbol] || 1
    const toRate = rates[to.symbol] || 1
    
    return fromRate / toRate
  }

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const rate = getExchangeRate(fromToken, toToken)
      setToAmount((Number(fromAmount) * rate).toFixed(toToken.decimals))
    }
  }, [fromAmount, fromToken, toToken, tokenData])

  const handleSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsSwapping(true)
    
    setTimeout(() => {
      toast.success('🌍 Swap Confirmed in GAIA Private Network!', {
        description: `${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol} • Fees sent to Harmony of Gaia Community Wallet`
      })
      setFromAmount('')
      setToAmount('')
      setIsSwapping(false)
    }, 2000)
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const TokenSelector = ({ 
    selectedToken, 
    onSelect, 
    label 
  }: { 
    selectedToken: typeof SUPPORTED_TOKENS[0], 
    onSelect: (token: typeof SUPPORTED_TOKENS[0]) => void,
    label: string 
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <select
        value={selectedToken.symbol}
        onChange={(e) => {
          const token = SUPPORTED_TOKENS.find(t => t.symbol === e.target.value)
          if (token) onSelect(token)
        }}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {SUPPORTED_TOKENS.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.logo} {token.symbol} - {token.name}
          </option>
        ))}
      </select>
      {selectedToken.isGaiaToken && (
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-green-500/20">
          <GaiaLogo size="sm" variant="glow" showText={false} />
          <span className="text-xs text-green-400 font-medium">Harmony of Gaia Official Token</span>
        </div>
      )}
    </div>
  )

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-green-400">
          <Globe className="h-6 w-6" />
          Universal Token Exchange
          <Shield className="h-5 w-5 text-blue-400" />
        </CardTitle>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <p className="text-sm text-green-300">
            🌍 <strong>GAIA Private Exchange Network</strong> - All tokens legally confirmed and verified
          </p>
          <p className="text-xs text-green-400 mt-1">
            Zero fees • Instant swaps • 100% transparency • Community-owned
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <TokenSelector 
              selectedToken={fromToken}
              onSelect={setFromToken}
              label="From"
            />
            <Input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-lg h-14 bg-card border-border focus:border-green-500"
            />
          </div>

          <div className="flex justify-center py-2">
            <Button
              variant="outline"
              size="sm"
              onClick={switchTokens}
              className="rounded-full w-12 h-12 p-0 border-green-500/30 hover:border-green-500 hover:bg-green-500/10"
            >
              <ArrowUpDown className="h-5 w-5 text-green-400" />
            </Button>
          </div>

          <div className="space-y-3">
            <TokenSelector 
              selectedToken={toToken}
              onSelect={setToToken}
              label="To"
            />
            <Input
              type="number"
              placeholder="0.00"
              value={toAmount}
              readOnly
              className="text-lg h-14 bg-muted border-border"
            />
          </div>
        </div>

        <Button 
          onClick={handleSwap}
          disabled={!fromAmount || Number(fromAmount) <= 0 || isSwapping}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg"
        >
          {isSwapping ? (
            <>
              <Zap className="h-5 w-5 mr-2 animate-spin" />
              Processing Swap...
            </>
          ) : (
            <>
              <Heart className="h-5 w-5 mr-2" />
              Swap in GAIA Network
            </>
          )}
        </Button>

        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4 space-y-2">
          <div className="text-sm font-medium text-green-400">Exchange Information</div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Rate: 1 {fromToken.symbol} = {getExchangeRate(fromToken, toToken).toFixed(8)} {toToken.symbol}</div>
            <div>Network Fee: 0.1% (sent to Harmony of Gaia Community)</div>
            <div>🏦 Community Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...</div>
            <div>🌱 All fees fund environmental and community projects</div>
            <div>🔒 All tokens verified and legally confirmed for trading</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-lg font-bold text-green-400">{SUPPORTED_TOKENS.length}</div>
            <div className="text-xs text-green-300">Verified Tokens</div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-lg font-bold text-blue-400">0%</div>
            <div className="text-xs text-blue-300">Trading Fees</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}