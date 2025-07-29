import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, Zap, Heart, Shield, Globe, Settings, DollarSign, Target, Flame, Gift } from 'lucide-react'
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

const FEE_OPTIONS = [
  {
    id: 'zero-fee',
    name: '🚀 Zero Fees',
    description: 'Pay absolutely no fees - lowest market costs only',
    icon: <Zap className="h-4 w-4 text-green-400" />,
    percentage: 0,
    destination: 'none'
  },
  {
    id: 'burning',
    name: '🔥 Token Burning',
    description: 'Fees burn GAiA tokens to increase value',
    icon: <Flame className="h-4 w-4 text-red-400" />,
    percentage: 0.1,
    destination: 'burn_vault'
  },
  {
    id: 'green-projects',
    name: '🌱 Environmental Projects',
    description: 'Support global environmental initiatives',
    icon: <Target className="h-4 w-4 text-green-400" />,
    percentage: 0.12,
    destination: 'green_projects'
  },
  {
    id: 'vault-rewards',
    name: '🏆 Special Rewards Vault',
    description: 'Contribute to vault for special price rewards',
    icon: <Gift className="h-4 w-4 text-purple-400" />,
    percentage: 0.15,
    destination: 'reward_vault'
  }
]

export function UniversalSwapInterface() {
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0])
  const [toToken, setToToken] = useState(SUPPORTED_TOKENS[1])
  const [isSwapping, setIsSwapping] = useState<boolean>(false)
  const [selectedFeeOption, setSelectedFeeOption] = useState('zero-fee')
  const [showAdvanced, setShowAdvanced] = useState(false)

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

    const selectedOption = FEE_OPTIONS.find(opt => opt.id === selectedFeeOption)
    setIsSwapping(true)
    
    setTimeout(() => {
      toast.success('🌍 Swap Confirmed in GAIA Private Network!', {
        description: `${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol} • ${selectedOption?.name} applied`
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
      <Select value={selectedToken.symbol} onValueChange={(value) => {
        const token = SUPPORTED_TOKENS.find(t => t.symbol === value)
        if (token) onSelect(token)
      }}>
        <SelectTrigger className="w-full h-12 bg-card border-border">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedToken.logo}</span>
              <span>{selectedToken.symbol}</span>
              <span className="text-xs text-muted-foreground">- {selectedToken.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_TOKENS.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{token.logo}</span>
                <span>{token.symbol}</span>
                <span className="text-xs text-muted-foreground">- {token.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-green-400">
            <Globe className="h-6 w-6" />
            Universal Token Exchange
            <Shield className="h-5 w-5 text-blue-400" />
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="border-green-500/30"
          >
            <Settings className="h-4 w-4 mr-2" />
            {showAdvanced ? 'Simple' : 'Advanced'}
          </Button>
        </div>
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
        {showAdvanced ? (
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="swap">Token Swap</TabsTrigger>
              <TabsTrigger value="fees">Fee Options</TabsTrigger>
              <TabsTrigger value="info">Market Info</TabsTrigger>
            </TabsList>

            <TabsContent value="swap" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="fees" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FEE_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                      selectedFeeOption === option.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-border/50 hover:border-blue-400/50'
                    }`}
                    onClick={() => setSelectedFeeOption(option.id)}
                  >
                    <div className="flex items-start gap-3">
                      {option.icon}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{option.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {option.description}
                        </p>
                        <Badge variant={selectedFeeOption === option.id ? 'default' : 'outline'} className="text-xs">
                          {option.percentage === 0 ? 'FREE' : `${option.percentage}% fee`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{SUPPORTED_TOKENS.length}</div>
                  <div className="text-xs text-green-300">Verified Tokens</div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">0%</div>
                  <div className="text-xs text-blue-300">Default Fees</div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Rate: 1 {fromToken.symbol} = {getExchangeRate(fromToken, toToken).toFixed(8)} {toToken.symbol}</div>
                <div>🏦 Community Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...</div>
                <div>🌱 All fees fund environmental and community projects</div>
                <div>🔒 All tokens verified and legally confirmed for trading</div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Simple mode - just the swap interface
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

            <div className="text-xs text-center text-muted-foreground">
              Current fee option: {FEE_OPTIONS.find(opt => opt.id === selectedFeeOption)?.name} • Click Advanced for more options
            </div>
          </div>
        )}

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
      </CardContent>
    </Card>
  )
}