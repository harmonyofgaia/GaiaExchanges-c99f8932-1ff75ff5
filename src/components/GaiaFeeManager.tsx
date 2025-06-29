
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
  Flame, 
  Vault, 
  Gift, 
  Zap,
  DollarSign,
  Shield,
  Target,
  TrendingDown,
  Award,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

interface FeeOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  percentage: number
  destination: string
}

interface MarketCosts {
  network: number
  exchange: number
  total: number
  lastUpdated: Date
}

export function GaiaFeeManager() {
  const [selectedFeeOption, setSelectedFeeOption] = useState<string>('zero-fee')
  const [customFeeAmount, setCustomFeeAmount] = useState<number>(0)
  const [marketCosts, setMarketCosts] = useState<MarketCosts>({
    network: 0.00001,
    exchange: 0.001,
    total: 0.00101,
    lastUpdated: new Date()
  })
  const [specialRewards, setSpecialRewards] = useState({
    vaultBalance: 1247500,
    nextReward: 50000,
    rewardChance: 12.5,
    participantsCount: 4567
  })

  const feeOptions: FeeOption[] = [
    {
      id: 'zero-fee',
      name: '🚀 Zero Fees',
      description: 'Pay absolutely no fees - lowest market costs only',
      icon: <Zap className="h-5 w-5 text-green-400" />,
      percentage: 0,
      destination: 'none'
    },
    {
      id: 'burning',
      name: '🔥 Token Burning',
      description: 'Fees burn GAiA tokens to increase value',
      icon: <Flame className="h-5 w-5 text-red-400" />,
      percentage: 0.1,
      destination: 'burn_vault'
    },
    {
      id: 'vault-rewards',
      name: '🏆 Special Rewards Vault',
      description: 'Contribute to vault for special price rewards',
      icon: <Gift className="h-5 w-5 text-purple-400" />,
      percentage: 0.15,
      destination: 'reward_vault'
    },
    {
      id: 'green-projects',
      name: '🌱 Environmental Projects',
      description: 'Support global environmental initiatives',
      icon: <Target className="h-5 w-5 text-green-400" />,
      percentage: 0.12,
      destination: 'green_projects'
    },
    {
      id: 'humanitarian',
      name: '❤️ Humanitarian Aid',
      description: 'Help fund global humanitarian projects',
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      percentage: 0.13,
      destination: 'humanitarian_fund'
    }
  ]

  // Update market costs every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketCosts(prev => ({
        network: Math.max(0.000005, prev.network + (Math.random() - 0.5) * 0.000002),
        exchange: Math.max(0.0005, prev.exchange + (Math.random() - 0.5) * 0.0002),
        total: 0,
        lastUpdated: new Date()
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Update total cost
  useEffect(() => {
    setMarketCosts(prev => ({
      ...prev,
      total: prev.network + prev.exchange
    }))
  }, [marketCosts.network, marketCosts.exchange])

  const handleFeeOptionChange = (optionId: string) => {
    setSelectedFeeOption(optionId)
    const option = feeOptions.find(opt => opt.id === optionId)
    
    if (option) {
      toast.success(`Fee Option Selected: ${option.name}`, {
        description: option.description,
        duration: 3000
      })
    }
  }

  const getTotalCost = () => {
    const selectedOption = feeOptions.find(opt => opt.id === selectedFeeOption)
    if (!selectedOption) return marketCosts.total
    
    if (selectedOption.id === 'zero-fee') {
      return marketCosts.total
    }
    
    return marketCosts.total + (customFeeAmount > 0 ? customFeeAmount : selectedOption.percentage)
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <DollarSign className="h-6 w-6" />
          🎯 GAiA Fee Management - Choose Your Impact
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Real-time market costs updated every second for optimal trading
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fee-options" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fee-options">Fee Options</TabsTrigger>
            <TabsTrigger value="market-costs">Live Market Costs</TabsTrigger>
            <TabsTrigger value="vault-rewards">Vault Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="fee-options" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    selectedFeeOption === option.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-border/50 hover:border-blue-400/50'
                  }`}
                  onClick={() => handleFeeOptionChange(option.id)}
                >
                  <div className="flex items-start gap-3">
                    {option.icon}
                    <div className="flex-1">
                      <h4 className="font-semibold">{option.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {option.description}
                      </p>
                      <Badge variant={selectedFeeOption === option.id ? 'default' : 'outline'}>
                        {option.percentage === 0 ? 'FREE' : `${option.percentage}% fee`}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Custom Fee Amount</h4>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  step="0.000001"
                  min="0"
                  max="1"
                  value={customFeeAmount}
                  onChange={(e) => setCustomFeeAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter custom fee amount"
                />
                <Badge className="bg-blue-600 text-white">
                  Total: {getTotalCost().toFixed(6)} GAiA
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market-costs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-500/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {marketCosts.network.toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">Network Cost</div>
                    <div className="text-xs text-green-400 mt-1">Live Updates</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {marketCosts.exchange.toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">Exchange Cost</div>
                    <div className="text-xs text-blue-400 mt-1">Optimized</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {getTotalCost().toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Cost</div>
                    <div className="text-xs text-purple-400 mt-1">Your Choice</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              Last updated: {marketCosts.lastUpdated.toLocaleTimeString()}
              <div className="text-green-400 mt-1">⚡ Updates every second for optimal costs</div>
            </div>
          </TabsContent>

          <TabsContent value="vault-rewards" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {specialRewards.vaultBalance.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Vault Balance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {specialRewards.nextReward.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Next Reward</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {specialRewards.rewardChance}%
                </div>
                <div className="text-sm text-muted-foreground">Win Chance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {specialRewards.participantsCount}
                </div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">🎁 Special Vault Rewards</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Contribute fees to the vault for chances to win special rewards including rare GAiA bonuses!
              </p>
              <Progress value={67} className="h-2 mb-2" />
              <div className="text-xs text-center">Next reward draw in 2 hours 15 minutes</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
