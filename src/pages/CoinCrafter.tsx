
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Hammer, Zap, Coins, Settings } from 'lucide-react'
import { useState } from 'react'
import HoverSidebar from '@/components/HoverSidebar'

const CoinCrafter = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                🔥 GAiA Coin Crafter
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Forge Your Own Tokens with Environmental Impact
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Hammer className="h-6 w-6" />
                  Token Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="My Environmental Token"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="MET"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input
                    id="totalSupply"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    placeholder="1000000"
                    type="number"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12">
                  <Hammer className="h-4 w-4 mr-2" />
                  Craft Token
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Zap className="h-6 w-6" />
                  Token Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded">
                    <Coins className="h-5 w-5 text-yellow-400" />
                    <div>
                      <h4 className="font-bold text-yellow-400">Environmental Yield</h4>
                      <p className="text-sm text-muted-foreground">Automatic rewards for eco-friendly actions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded">
                    <Settings className="h-5 w-5 text-blue-400" />
                    <div>
                      <h4 className="font-bold text-blue-400">Smart Governance</h4>
                      <p className="text-sm text-muted-foreground">Community-driven decision making</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded">
                    <Zap className="h-5 w-5 text-green-400" />
                    <div>
                      <h4 className="font-bold text-green-400">Instant Deployment</h4>
                      <p className="text-sm text-muted-foreground">Deploy on Solana network instantly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinCrafter
