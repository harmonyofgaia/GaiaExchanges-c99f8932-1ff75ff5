
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { Lock, TrendingUp, Calendar, Coins, Clock, Zap } from 'lucide-react'

interface StakingPool {
  id: string
  name: string
  description: string
  apy: number
  minStake: number
  lockPeriod: number
  totalStaked: number
  maxCapacity: number
  type: 'standard' | 'premium' | 'eco-impact'
  bonus?: string
}

interface UserStake {
  id: string
  poolId: string
  amount: number
  startDate: Date
  endDate: Date
  earned: number
  status: 'active' | 'completed'
}

export function TokenStakingSystem() {
  const [stakingPools] = useState<StakingPool[]>([
    {
      id: '1',
      name: 'Eco Foundation Pool',
      description: 'Support basic environmental initiatives',
      apy: 12,
      minStake: 100,
      lockPeriod: 30,
      totalStaked: 45000,
      maxCapacity: 100000,
      type: 'standard'
    },
    {
      id: '2',
      name: 'Green Innovation Pool',
      description: 'Fund cutting-edge environmental technology',
      apy: 18,
      minStake: 500,
      lockPeriod: 90,
      totalStaked: 78000,
      maxCapacity: 150000,
      type: 'premium',
      bonus: 'Early access to new features'
    },
    {
      id: '3',
      name: 'Climate Action Pool',
      description: 'Direct funding for carbon offset projects',
      apy: 25,
      minStake: 1000,
      lockPeriod: 180,
      totalStaked: 32000,
      maxCapacity: 75000,
      type: 'eco-impact',
      bonus: 'Real-world impact reporting'
    }
  ])

  const [userStakes] = useState<UserStake[]>([
    {
      id: '1',
      poolId: '1',
      amount: 500,
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      earned: 12.5,
      status: 'active'
    }
  ])

  const [stakeAmount, setStakeAmount] = useState('')
  const [selectedPool, setSelectedPool] = useState('')
  const [userBalance] = useState(2450)

  const getPoolTypeColor = (type: StakingPool['type']) => {
    switch (type) {
      case 'standard': return 'bg-blue-600'
      case 'premium': return 'bg-purple-600'
      case 'eco-impact': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const calculateEarnings = (amount: number, apy: number, days: number) => {
    return (amount * (apy / 100) * (days / 365))
  }

  const stakeTokens = () => {
    if (!selectedPool || !stakeAmount) {
      toast.error('Please select a pool and enter stake amount')
      return
    }

    const amount = parseInt(stakeAmount)
    const pool = stakingPools.find(p => p.id === selectedPool)
    
    if (!pool) return
    if (amount < pool.minStake) {
      toast.error(`Minimum stake is ${pool.minStake} GAiA`)
      return
    }
    if (amount > userBalance) {
      toast.error('Insufficient balance')
      return
    }

    const projectedEarnings = calculateEarnings(amount, pool.apy, pool.lockPeriod)
    
    toast.success(`Successfully staked ${amount} GAiA! Projected earnings: ${projectedEarnings.toFixed(2)} GAiA`)
    setStakeAmount('')
    setSelectedPool('')
  }

  const unstakeTokens = (stakeId: string) => {
    toast.success('Tokens unstaked successfully! Rewards have been added to your balance.')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🔒 Token Staking System
        </h2>
        <p className="text-muted-foreground">
          Lock your GAiA tokens to earn rewards and support environmental projects
        </p>
      </div>

      {/* User Balance */}
      <Card className="border-2 border-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Available Balance</h3>
              <p className="text-3xl font-bold text-green-400">{userBalance.toLocaleString()} GAiA</p>
            </div>
            <Coins className="h-12 w-12 text-green-400" />
          </div>
        </CardContent>
      </Card>

      {/* Active Stakes */}
      {userStakes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Your Active Stakes
          </h3>
          {userStakes.map((stake) => {
            const pool = stakingPools.find(p => p.id === stake.poolId)
            if (!pool) return null
            
            const daysRemaining = Math.ceil((stake.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            
            return (
              <Card key={stake.id} className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{pool.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {stake.amount} GAiA staked • {daysRemaining}d remaining
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">+{stake.earned.toFixed(2)} GAiA</div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => unstakeTokens(stake.id)}
                        disabled={daysRemaining > 0}
                      >
                        {daysRemaining > 0 ? `Locked ${daysRemaining}d` : 'Unstake'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Staking Interface */}
      <Card className="border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Stake Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Staking Pool</label>
            <Select value={selectedPool} onValueChange={setSelectedPool}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a staking pool" />
              </SelectTrigger>
              <SelectContent>
                {stakingPools.map((pool) => (
                  <SelectItem key={pool.id} value={pool.id}>
                    {pool.name} - {pool.apy}% APY ({pool.lockPeriod}d lock)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stake Amount (GAiA)</label>
            <Input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount to stake"
              min="1"
              max={userBalance}
            />
          </div>

          <Button onClick={stakeTokens} className="w-full">
            🔒 Stake Tokens
          </Button>
        </CardContent>
      </Card>

      {/* Available Staking Pools */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Available Staking Pools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakingPools.map((pool) => {
            const utilization = (pool.totalStaked / pool.maxCapacity) * 100
            
            return (
              <Card key={pool.id} className="border-2 border-gray-500/20 hover:border-green-500/30 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getPoolTypeColor(pool.type)}>
                      {pool.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                      <div className="text-xs text-muted-foreground">APY</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{pool.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{pool.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pool Utilization</span>
                      <span>{pool.totalStaked.toLocaleString()} / {pool.maxCapacity.toLocaleString()}</span>
                    </div>
                    <Progress value={utilization} className="h-2" />
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Min. Stake:</span>
                      <span className="font-medium">{pool.minStake} GAiA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lock Period:</span>
                      <span className="font-medium">{pool.lockPeriod} days</span>
                    </div>
                  </div>

                  {pool.bonus && (
                    <div className="p-2 bg-green-900/20 rounded-lg border border-green-500/30">
                      <p className="text-xs text-green-300">
                        🎁 <strong>Bonus:</strong> {pool.bonus}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
