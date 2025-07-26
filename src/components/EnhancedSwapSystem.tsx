
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowUpDown, 
  Settings, 
  Shield, 
  Zap,
  DollarSign,
  Percent,
  Target,
  TrendingUp,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

interface SwapConfig {
  zero_fee_enabled: boolean
  default_fee_percentage: number
  preferred_fee_destination: string
  custom_fee_amount: number
}

interface SwapTransaction {
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  feeAmount: number
  feeDestination: string
}

export function EnhancedSwapSystem() {
  const { user } = useAuth()
  const [config, setConfig] = useState<SwapConfig>({
    zero_fee_enabled: true,
    default_fee_percentage: 0.001,
    preferred_fee_destination: 'vault',
    custom_fee_amount: 0
  })

  const [swapData, setSwapData] = useState({
    fromCurrency: 'GAiA',
    toCurrency: 'BTC',
    fromAmount: 0,
    toAmount: 0
  })

  const [loading, setLoading] = useState(false)
  const connectedWalletAddress = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh"

  const currencies = ['GAiA', 'BTC', 'ETH', 'USDC', 'USDT', 'GAIA'] // GAiA first, GAIA last for legacy swapping
  const feeDestinations = [
    { id: 'vault', name: '🏦 GAiA Community Vault', description: 'Admin humanitarian surprises' },
    { id: 'burning', name: '🔥 GAiA Token Burning', description: 'Increase GAiA token value' },
    { id: 'green_projects', name: '🌱 GAiA Green Projects', description: 'Environmental initiatives' },
    { id: 'humanity', name: '❤️ GAiA Humanity Fund', description: 'Global humanitarian aid' }
  ]

  useEffect(() => {
    if (user) {
      fetchUserConfig()
    }
  }, [user])

  const fetchUserConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('swap_configurations')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (data) {
        setConfig({
          zero_fee_enabled: data.zero_fee_enabled,
          default_fee_percentage: data.default_fee_percentage,
          preferred_fee_destination: data.preferred_fee_destination,
          custom_fee_amount: data.custom_fee_amount
        })
      }
    } catch (error) {
      console.error('Error fetching swap config:', error)
    }
  }

  const calculateSwapAmount = () => {
    // Mock exchange rates - in production, this would fetch real rates
    const exchangeRates: { [key: string]: number } = {
      'GAiA': 1,
      'BTC': 0.000023,
      'ETH': 0.00034,
      'USDC': 1.2,
      'USDT': 1.19,
      'GAIA': 0.98 // Legacy token at slightly lower rate
    }

    const rate = exchangeRates[swapData.toCurrency] / exchangeRates[swapData.fromCurrency]
    return swapData.fromAmount * rate
  }

  const calculateFee = () => {
    if (config.zero_fee_enabled) return 0
    if (config.custom_fee_amount > 0) return config.custom_fee_amount
    return swapData.fromAmount * config.default_fee_percentage
  }

  const executeSwap = async () => {
    if (!user) {
      toast.error('Please login to perform GAiA swaps')
      return
    }

    setLoading(true)
    try {
      const feeAmount = calculateFee()
      const toAmount = calculateSwapAmount()

      // Record fee transaction if there's a fee
      if (feeAmount > 0) {
        await supabase.from('fee_transactions').insert({
          user_id: user.id,
          fee_amount: feeAmount,
          fee_currency: swapData.fromCurrency,
          destination_type: config.preferred_fee_destination,
          status: 'completed'
        })
      }

      // Record the swap transaction using 'transfer' type instead of 'swap'
      await supabase.from('transactions').insert({
        user_id: user.id,
        transaction_type: 'transfer',
        currency: swapData.fromCurrency,
        amount: swapData.fromAmount,
        fee: feeAmount,
        status: 'completed',
        metadata: {
          swap_to_currency: swapData.toCurrency,
          swap_to_amount: toAmount,
          fee_destination: config.preferred_fee_destination,
          transaction_subtype: 'swap',
          wallet_address: connectedWalletAddress
        }
      })

      toast.success('🎉 GAiA Swap Executed Successfully!', {
        description: `Swapped ${swapData.fromAmount} ${swapData.fromCurrency} for ${toAmount.toFixed(6)} ${swapData.toCurrency}`,
        duration: 5000
      })

      // Reset form
      setSwapData(prev => ({ ...prev, fromAmount: 0, toAmount: 0 }))

    } catch (error) {
      toast.error('GAiA Swap failed')
      console.error('Swap error:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    if (!user) return

    try {
      await supabase.from('swap_configurations').upsert({
        user_id: user.id,
        zero_fee_enabled: config.zero_fee_enabled,
        default_fee_percentage: config.default_fee_percentage,
        preferred_fee_destination: config.preferred_fee_destination,
        custom_fee_amount: config.custom_fee_amount,
        updated_at: new Date().toISOString()
      })

      toast.success('💎 GAiA Configuration Saved!')
    } catch (error) {
      toast.error('Failed to save GAiA configuration')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <ArrowUpDown className="h-6 w-6" />
            🔄 Enhanced GAiA Swap System - Choose Your Fee Destination
          </CardTitle>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2">
            <p className="text-green-400 font-medium">Connected GAiA Wallet:</p>
            <code className="text-green-300 font-mono text-xs break-all">
              {connectedWalletAddress}
            </code>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="swap">Swap GAiA Tokens</TabsTrigger>
              <TabsTrigger value="settings">GAiA Fee Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="swap" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Currency */}
                <div className="space-y-4">
                  <Label>From Currency</Label>
                  <Select value={swapData.fromCurrency} onValueChange={(value) => setSwapData(prev => ({ ...prev, fromCurrency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency} {currency === 'GAiA' ? '🌍 (Primary)' : currency === 'GAIA' ? '🌿 (Legacy)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Amount to swap"
                    value={swapData.fromAmount || ''}
                    onChange={(e) => setSwapData(prev => ({ ...prev, fromAmount: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                {/* To Currency */}
                <div className="space-y-4">
                  <Label>To Currency</Label>
                  <Select value={swapData.toCurrency} onValueChange={(value) => setSwapData(prev => ({ ...prev, toCurrency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency} {currency === 'GAiA' ? '🌍 (Primary)' : currency === 'GAIA' ? '🌿 (Legacy)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="p-4 rounded-lg bg-muted/30 border">
                    <div className="text-2xl font-bold text-green-400">
                      {calculateSwapAmount().toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">Estimated receive amount</div>
                  </div>
                </div>
              </div>

              {/* Fee Information */}
              <Card className="border-purple-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">GAiA Transaction Fee:</span>
                    <Badge className={config.zero_fee_enabled ? 'bg-green-600' : 'bg-blue-600'}>
                      {config.zero_fee_enabled ? 'ZERO FEE' : `${calculateFee().toFixed(6)} ${swapData.fromCurrency}`}
                    </Badge>
                  </div>
                  {!config.zero_fee_enabled && (
                    <div className="text-sm text-muted-foreground">
                      Fee destination: {feeDestinations.find(d => d.id === config.preferred_fee_destination)?.name}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                onClick={executeSwap}
                disabled={loading || swapData.fromAmount <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12"
              >
                {loading ? 'Processing GAiA Swap...' : 'Execute GAiA Swap'}
              </Button>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Zero Fee Option */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div>
                  <Label className="text-base font-medium text-green-400">GAiA Zero Fee Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable completely free GAiA transactions</p>
                </div>
                <Switch
                  checked={config.zero_fee_enabled}
                  onCheckedChange={(checked) => setConfig({ ...config, zero_fee_enabled: checked })}
                />
              </div>

              {!config.zero_fee_enabled && (
                <>
                  {/* Fee Percentage */}
                  <div className="space-y-2">
                    <Label>Default GAiA Fee Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.0001"
                        min="0"
                        max="1"
                        value={config.default_fee_percentage}
                        onChange={(e) => setConfig({ ...config, default_fee_percentage: parseFloat(e.target.value) || 0 })}
                      />
                      <Badge variant="outline">{(config.default_fee_percentage * 100).toFixed(2)}%</Badge>
                    </div>
                  </div>

                  {/* Custom Fee Amount */}
                  <div className="space-y-2">
                    <Label>Custom GAiA Fee Amount (Optional)</Label>
                    <Input
                      type="number"
                      step="0.000001"
                      min="0"
                      value={config.custom_fee_amount}
                      onChange={(e) => setConfig({ ...config, custom_fee_amount: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  {/* Fee Destination */}
                  <div className="space-y-2">
                    <Label>GAiA Fee Destination</Label>
                    <Select
                      value={config.preferred_fee_destination}
                      onValueChange={(value) => setConfig({ ...config, preferred_fee_destination: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {feeDestinations.map(dest => (
                          <SelectItem key={dest.id} value={dest.id}>
                            {dest.name} - {dest.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button onClick={saveConfig} className="w-full bg-purple-600 hover:bg-purple-700">
                Save GAiA Configuration
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
