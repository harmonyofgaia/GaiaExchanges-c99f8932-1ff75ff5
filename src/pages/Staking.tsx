
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Coins, TrendingUp, Shield, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState('')

  const stakingPools = [
    {
      id: 1,
      name: "GAIA Green Pool",
      apy: "12.5%",
      totalStaked: "2,456,789 GAIA",
      minStake: "100 GAIA",
      lockPeriod: "30 days",
      icon: "🌱",
      color: "green"
    },
    {
      id: 2,
      name: "Harmony Vault",
      apy: "15.2%",
      totalStaked: "1,234,567 GAIA",
      minStake: "500 GAIA",
      lockPeriod: "90 days",
      icon: "🤝",
      color: "blue"
    },
    {
      id: 3,
      name: "Eco Guardian Pool",
      apy: "18.7%",
      totalStaked: "987,654 GAIA",
      minStake: "1000 GAIA",
      lockPeriod: "180 days",
      icon: "🛡️",
      color: "purple"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Coins className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Gaia Staking
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stake your GAIA tokens and earn rewards while supporting the ecosystem
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">0 GAIA</div>
              <div className="text-sm text-gray-400">Available Balance</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">0 GAIA</div>
              <div className="text-sm text-gray-400">Total Staked</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">0 GAIA</div>
              <div className="text-sm text-gray-400">Rewards Earned</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15.5%</div>
              <div className="text-sm text-gray-400">Avg APY</div>
            </CardContent>
          </Card>
        </div>

        {/* Staking Pools */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-green-400">Available Staking Pools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {stakingPools.map((pool) => (
              <Card key={pool.id} className="border-green-500/20 bg-black/40">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{pool.icon}</div>
                    <div>
                      <CardTitle className="text-white">{pool.name}</CardTitle>
                      <CardDescription>Earn rewards by staking GAIA</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">APY</div>
                      <div className="font-bold text-green-400 text-lg">{pool.apy}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Lock Period</div>
                      <div className="font-medium text-white">{pool.lockPeriod}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Min Stake</div>
                      <div className="font-medium text-white">{pool.minStake}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total Staked</div>
                      <div className="font-medium text-white text-xs">{pool.totalStaked}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      placeholder="Amount to stake"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-gray-800 border-gray-600"
                    />
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Stake GAIA
                    </Button>
                  </div>

                  <Badge 
                    variant="outline" 
                    className={`border-${pool.color}-500/30 text-${pool.color}-400`}
                  >
                    Active Pool
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
