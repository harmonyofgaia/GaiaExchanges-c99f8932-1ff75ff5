
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Coins, 
  TreePine, 
  Shield, 
  Users, 
  TrendingUp, 
  Lock,
  Zap,
  Target,
  Award,
  Globe,
  BarChart3,
  Vote
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function ForestTokenSystem() {
  const [selectedToken, setSelectedToken] = useState('FOREST')

  const tokens = [
    {
      id: 'FOREST',
      name: 'FOREST Token',
      symbol: 'FOREST',
      price: '$0.24',
      change: '+12.5%',
      totalSupply: '10M',
      circulating: '7.2M',
      staked: '65%',
      description: 'Primary governance and utility token for forest protection',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 'DEFEND',
      name: 'Defense Token',
      symbol: 'DEFEND',
      price: '$1.89',
      change: '+8.3%',
      totalSupply: '5M',
      circulating: '3.8M',
      staked: '72%',
      description: 'Premium token for sand cannon operations and emergency response',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20'
    },
    {
      id: 'IMPACT',
      name: 'Impact Token',
      symbol: 'IMPACT',
      price: '$0.08',
      change: '+15.7%',
      totalSupply: '50M',
      circulating: '32M',
      staked: '45%',
      description: 'Rewards token for environmental impact and community participation',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    }
  ]

  const selectedTokenData = tokens.find(t => t.id === selectedToken)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🪙 Forest Token System
          </h1>
          <p className="text-xl text-muted-foreground">
            Multi-tier blockchain ecosystem for forest defense and governance
          </p>
        </div>

        {/* Token Selection */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {tokens.map((token) => (
            <Button
              key={token.id}
              variant={selectedToken === token.id ? 'default' : 'outline'}
              onClick={() => setSelectedToken(token.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Coins className="h-4 w-4" />
              {token.symbol}
            </Button>
          ))}
        </div>

        {/* Token Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Total Value Locked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Lock className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-400">$12.4M</div>
                  <p className="text-xs text-muted-foreground">Across all pools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Active Stakers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">8.7K</div>
                  <p className="text-xs text-muted-foreground">Community members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-purple-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Weekly Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">247K</div>
                  <p className="text-xs text-muted-foreground">Tokens distributed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Protected Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-yellow-400">2.4M</div>
                  <p className="text-xs text-muted-foreground">Hectares secured</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Token Details */}
        {selectedTokenData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className={`border-gray-500/20 ${selectedTokenData.bgColor}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${selectedTokenData.color}`}>
                  <Coins className="h-5 w-5" />
                  {selectedTokenData.name} ({selectedTokenData.symbol})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{selectedTokenData.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className={`text-3xl font-bold ${selectedTokenData.color}`}>
                      {selectedTokenData.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm">{selectedTokenData.change}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Supply</div>
                      <div className="text-white font-semibold">{selectedTokenData.totalSupply}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Circulating</div>
                      <div className="text-white font-semibold">{selectedTokenData.circulating}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Staking Participation</span>
                    <span className={selectedTokenData.color}>{selectedTokenData.staked}</span>
                  </div>
                  <Progress value={parseInt(selectedTokenData.staked)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-500/20 bg-gradient-to-br from-gray-900/20 to-black/20">
              <CardHeader>
                <CardTitle className="text-white">Staking Pools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-semibold">Forest Protection Pool</span>
                    <Badge className="bg-green-600">15.2% APY</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Stake FOREST tokens to support ongoing protection efforts</div>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-400 font-semibold">Defense Operations Pool</span>
                    <Badge className="bg-orange-600">22.8% APY</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Higher rewards for funding sand cannon operations</div>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-semibold">Impact Rewards Pool</span>
                    <Badge className="bg-blue-600">8.5% APY</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Earn IMPACT tokens for community participation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Governance Section */}
        <Card className="mb-8 border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Vote className="h-5 w-5" />
              Decentralized Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">47</div>
                <div className="text-sm text-muted-foreground">Active Proposals</div>
                <Button variant="outline" className="mt-2 border-purple-500/50 text-purple-400">
                  View All
                </Button>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">8.7K</div>
                <div className="text-sm text-muted-foreground">Voting Participants</div>
                <Button variant="outline" className="mt-2 border-blue-500/50 text-blue-400">
                  Join DAO
                </Button>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">96.2%</div>
                <div className="text-sm text-muted-foreground">Proposal Success Rate</div>
                <Button variant="outline" className="mt-2 border-green-500/50 text-green-400">
                  Create Proposal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Statistics */}
        <Card className="border-gray-500/20 bg-gradient-to-r from-gray-900/20 to-black/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Token System Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">$24.7M</div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">847K</div>
                <p className="text-sm text-muted-foreground">Daily Volume</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">12.4K</div>
                <p className="text-sm text-muted-foreground">Token Holders</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">99.8%</div>
                <p className="text-sm text-muted-foreground">Network Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
