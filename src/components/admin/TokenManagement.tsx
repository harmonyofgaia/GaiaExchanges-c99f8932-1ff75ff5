
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Coins, TrendingUp, Users, DollarSign, PlusCircle, Settings } from 'lucide-react'
import { toast } from 'sonner'

export function TokenManagement() {
  const [totalSupply, setTotalSupply] = useState('1000000000')
  const [mintAmount, setMintAmount] = useState('')
  const [burnAmount, setBurnAmount] = useState('')

  const handleMint = () => {
    if (!mintAmount) return
    toast.success('🪙 Tokens Minted Successfully', {
      description: `${mintAmount} GAiA tokens added to circulation`,
      duration: 4000
    })
    setMintAmount('')
  }

  const handleBurn = () => {
    if (!burnAmount) return
    toast.success('🔥 Tokens Burned Successfully', {
      description: `${burnAmount} GAiA tokens removed from circulation`,
      duration: 4000
    })
    setBurnAmount('')
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Coins className="h-5 w-5" />
          GAiA Token Management - Zero Fee Economy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mint">Mint Tokens</TabsTrigger>
            <TabsTrigger value="burn">Burn Tokens</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">∞</div>
                <p className="text-sm text-muted-foreground">Total Supply</p>
                <Badge className="mt-2 bg-green-600">Unlimited Mint</Badge>
              </div>
              
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">$0.001</div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <Badge className="mt-2 bg-blue-600">Stable Growth</Badge>
              </div>
              
              <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">125,847</div>
                <p className="text-sm text-muted-foreground">Token Holders</p>
                <Badge className="mt-2 bg-purple-600">Growing Daily</Badge>
              </div>
              
              <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">0%</div>
                <p className="text-sm text-muted-foreground">Trading Fees</p>
                <Badge className="mt-2 bg-orange-600">Always Free</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mint" className="space-y-6">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold text-green-400">Mint New GAiA Tokens</h3>
                <p className="text-sm text-muted-foreground">Add tokens to circulation for community rewards</p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="Amount to mint..."
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  type="number"
                  className="text-center text-lg"
                />
                
                <Button 
                  onClick={handleMint}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!mintAmount}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Mint {mintAmount} GAiA Tokens
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="burn" className="space-y-6">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold text-red-400">Burn GAiA Tokens</h3>
                <p className="text-sm text-muted-foreground">Remove tokens from circulation permanently</p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="Amount to burn..."
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  type="number"
                  className="text-center text-lg"
                />
                
                <Button 
                  onClick={handleBurn}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!burnAmount}
                >
                  🔥 Burn {burnAmount} GAiA Tokens
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">Community Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Environmental Actions</span>
                      <Badge className="bg-green-600">40%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Trading Rewards</span>
                      <Badge className="bg-blue-600">30%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Staking Rewards</span>
                      <Badge className="bg-purple-600">20%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Development</span>
                      <Badge className="bg-orange-600">10%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Distribution Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Rewards
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Adjust APY Rates
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Users className="h-4 w-4 mr-2" />
                    Community Proposals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
