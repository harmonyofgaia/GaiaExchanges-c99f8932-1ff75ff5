
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowUpDown, 
  Zap, 
  DollarSign, 
  Shield, 
  Sparkles,
  Heart,
  Flame,
  Leaf,
  Vault,
  TrendingUp,
  Users
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

const supportedTokens = [
  { name: 'Harmony of Gaia', symbol: 'GAIA', icon: '🌍', fee: 0 },
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', fee: 0.0001 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', fee: 0.001 },
  { name: 'Solana', symbol: 'SOL', icon: '◎', fee: 0.00005 },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', fee: 0.17 },
  { name: 'Polkadot', symbol: 'DOT', icon: '●', fee: 0.01 },
  { name: 'Chainlink', symbol: 'LINK', icon: '🔗', fee: 0.1 },
  { name: 'Binance Coin', symbol: 'BNB', icon: '🟡', fee: 0.0005 }
]

const feeDestinations = [
  { id: 'vault', name: '🏦 Community Vault', description: 'Admin-managed humanitarian surprises', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  { id: 'burning', name: '🔥 Token Burning', description: 'Increase token value through scarcity', color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
  { id: 'green_projects', name: '🌱 Green Projects', description: 'Environmental restoration initiatives', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
  { id: 'humanity', name: '❤️ Humanity Fund', description: 'Global aid and development projects', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400' }
]

interface SwapConfig {
  zeroFeeEnabled: boolean
  customFeePercentage: number
  customFeeAmount: number
  selectedDestination: string
  feeType: 'percentage' | 'fixed'
}

export function EnhancedSwapSystem() {
  const { user } = useAuth()
  const [fromToken, setFromToken] = useState(supportedTokens[0])
  const [toToken, setToToken] = useState(supportedTokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [swapConfig, setSwapConfig] = useState<SwapConfig>({
    zeroFeeEnabled: true,
    customFeePercentage: 0.1,
    customFeeAmount: 0,
    selectedDestination: 'vault',
    feeType: 'percentage'
  })

  useEffect(() => {
    loadUserConfig()
  }, [user])

  const loadUserConfig = async () => {
    if (!user) return

    try {
      const { data } = await supabase
        .from('swap_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setSwapConfig({
          zeroFeeEnabled: data.zero_fee_enabled,
          customFeePercentage: data.default_fee_percentage * 100,
          customFeeAmount: data.custom_fee_amount,
          selectedDestination: data.preferred_fee_destination,
          feeType: data.custom_fee_amount > 0 ? 'fixed' : 'percentage'
        })
      }
    } catch (error) {
      console.log('No existing config found, using defaults')
    }
  }

  const calculateFee = () => {
    if (swapConfig.zeroFeeEnabled) return 0
    
    const amount = parseFloat(fromAmount) || 0
    if (swapConfig.feeType === 'fixed') {
      return swapConfig.customFeeAmount
    } else {
      return amount * (swapConfig.customFeePercentage / 100)
    }
  }

  const calculateReceiveAmount = () => {
    const amount = parseFloat(fromAmount) || 0
    const fee = calculateFee()
    return Math.max(0, amount - fee)
  }

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const executeSwap = async () => {
    if (!user || !fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount to swap')
      return
    }

    try {
      const fee = calculateFee()
      const receiveAmount = calculateReceiveAmount()

      // Record fee transaction if applicable
      if (fee > 0) {
        const { error: feeError } = await supabase
          .from('fee_transactions')
          .insert({
            user_id: user.id,
            fee_amount: fee,
            fee_currency: fromToken.symbol,
            destination_type: swapConfig.selectedDestination,
            status: 'completed'
          })

        if (feeError) {
          console.error('Error recording fee transaction:', feeError)
        }
      }

      toast.success('🎉 Swap Executed Successfully!', {
        description: `Swapped ${fromAmount} ${fromToken.symbol} → ${receiveAmount.toFixed(6)} ${toToken.symbol}${fee > 0 ? ` (Fee: ${fee.toFixed(6)} ${fromToken.symbol})` : ' (Zero Fee!)'}`,
        duration: 5000
      })

      // Clear the form
      setFromAmount('')
    } catch (error) {
      toast.error('Swap failed. Please try again.')
      console.error('Error executing swap:', error)
    }
  }

  const getDestinationIcon = (id: string) => {
    switch (id) {
      case 'vault': return <Vault className="h-4 w-4" />
      case 'burning': return <Flame className="h-4 w-4" />
      case 'green_projects': return <Leaf className="h-4 w-4" />
      case 'humanity': return <Heart className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Sparkles className="h-5 w-5" />
            🚀 Enhanced Swap System with Fee Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="swap">Quick Swap</TabsTrigger>
              <TabsTrigger value="fees">Fee Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="swap" className="space-y-6">
              {/* Swap Interface */}
              <div className="space-y-4">
                {/* From Token */}
                <div className="space-y-2">
                  <Label>From</Label>
                  <div className="flex gap-2">
                    <Select 
                      value={fromToken.symbol}
                      onValueChange={(value) => setFromToken(supportedTokens.find(t => t.symbol === value) || supportedTokens[0])}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedTokens.map(token => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.icon} {token.name} ({token.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1"
                    />
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
                  <Label>To</Label>
                  <Select 
                    value={toToken.symbol}
                    onValueChange={(value) => setToToken(supportedTokens.find(t => t.symbol === value) || supportedTokens[1])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedTokens.map(token => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.icon} {token.name} ({token.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fee Summary */}
                <Card className="bg-muted/30 border border-border/50">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Swap Amount:</span>
                      <span className="font-medium">{fromAmount || '0'} {fromToken.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fee:</span>
                      <span className={`font-medium ${swapConfig.zeroFeeEnabled ? 'text-green-400' : 'text-orange-400'}`}>
                        {swapConfig.zeroFeeEnabled ? 'FREE (0%)' : `${calculateFee().toFixed(6)} ${fromToken.symbol}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>You Receive:</span>
                      <span className="font-bold text-green-400">{calculateReceiveAmount().toFixed(6)} {toToken.symbol}</span>
                    </div>
                    {!swapConfig.zeroFeeEnabled && (
                      <div className="flex justify-between text-xs">
                        <span>Fee Destination:</span>
                        <span className="text-blue-400">
                          {feeDestinations.find(d => d.id === swapConfig.selectedDestination)?.name}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Execute Swap */}
                <Button 
                  onClick={executeSwap}
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700"
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {swapConfig.zeroFeeEnabled ? '🎉 Execute FREE Swap' : '💎 Execute Swap with Fees'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
              {/* Zero Fee Toggle */}
              <Card className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-green-400">Zero Fee Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable completely free swaps (recommended for community growth)
                      </p>
                    </div>
                    <Switch
                      checked={swapConfig.zeroFeeEnabled}
                      onCheckedChange={(checked) => setSwapConfig({ ...swapConfig, zeroFeeEnabled: checked })}
                    />
                  </div>
                </Card>
              </Card>

              {!swapConfig.zeroFeeEnabled && (
                <>
                  {/* Fee Type Selection */}
                  <Card className="border-blue-500/30">
                    <CardContent className="p-4 space-y-4">
                      <Label className="text-base font-medium">Fee Configuration</Label>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant={swapConfig.feeType === 'percentage' ? 'default' : 'outline'}
                          onClick={() => setSwapConfig({ ...swapConfig, feeType: 'percentage' })}
                          className="h-auto p-4 flex-col"
                        >
                          <TrendingUp className="h-5 w-5 mb-2" />
                          <span>Percentage Fee</span>
                          <span className="text-xs text-muted-foreground">% of transaction</span>
                        </Button>
                        <Button
                          variant={swapConfig.feeType === 'fixed' ? 'default' : 'outline'}
                          onClick={() => setSwapConfig({ ...swapConfig, feeType: 'fixed' })}
                          className="h-auto p-4 flex-col"
                        >
                          <DollarSign className="h-5 w-5 mb-2" />
                          <span>Fixed Fee</span>
                          <span className="text-xs text-muted-foreground">Fixed amount</span>
                        </Button>
                      </div>

                      {swapConfig.feeType === 'percentage' ? (
                        <div className="space-y-2">
                          <Label>Fee Percentage (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="5"
                            value={swapConfig.customFeePercentage}
                            onChange={(e) => setSwapConfig({ ...swapConfig, customFeePercentage: parseFloat(e.target.value) || 0 })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Current: {swapConfig.customFeePercentage}% - Ultra low compared to traditional exchanges (typically 1-3%)
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label>Fixed Fee Amount (GAIA)</Label>
                          <Input
                            type="number"
                            step="0.000001"
                            min="0"
                            value={swapConfig.customFeeAmount}
                            onChange={(e) => setSwapConfig({ ...swapConfig, customFeeAmount: parseFloat(e.target.value) || 0 })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Fixed fee regardless of transaction size
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fee Destination Selection */}
                  <Card className="border-purple-500/30">
                    <CardContent className="p-4 space-y-4">
                      <Label className="text-base font-medium">Fee Destination</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose where your transaction fees will contribute to global good
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {feeDestinations.map((destination) => (
                          <Button
                            key={destination.id}
                            variant={swapConfig.selectedDestination === destination.id ? 'default' : 'outline'}
                            onClick={() => setSwapConfig({ ...swapConfig, selectedDestination: destination.id })}
                            className="h-auto p-4 text-left justify-start"
                          >
                            <div className="flex items-start gap-3">
                              {getDestinationIcon(destination.id)}
                              <div>
                                <div className="font-medium">{destination.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {destination.description}
                                </div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Global Impact Notice */}
      <Card className="border-gold-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Users className="h-8 w-8 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-bold text-yellow-400">🌍 Your Swaps Change the World</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every transaction fee contributes to humanitarian projects, environmental restoration, and community growth. 
              Choose zero fees to maximize adoption or small fees to maximize global impact.
            </p>
            <div className="flex justify-center gap-4 text-xs flex-wrap">
              <Badge className="bg-green-600 text-white">127 Countries Helped</Badge>
              <Badge className="bg-blue-600 text-white">2.4M Trees Funded</Badge>
              <Badge className="bg-purple-600 text-white">156K People Assisted</Badge>
              <Badge className="bg-orange-600 text-white">89% Efficiency Rate</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
