
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Coins, TrendingUp, Zap, Shield, Award } from 'lucide-react'
import { toast } from 'sonner'

export default function CoinCrafter() {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [createdTokens, setCreatedTokens] = useState(23)

  const createToken = () => {
    if (!tokenName || !tokenSymbol || !totalSupply) {
      toast.error('Please fill in all required fields')
      return
    }
    
    toast.success(`🪙 Token "${tokenName}" (${tokenSymbol}) created!`, {
      description: `Supply: ${totalSupply} tokens deployed to blockchain`,
      duration: 5000
    })
    
    setCreatedTokens(prev => prev + 1)
  }

  const myTokens = [
    { name: 'EcoGreen', symbol: 'ECG', supply: '1,000,000', value: '$0.45', change: '+12.5%' },
    { name: 'ForestCoin', symbol: 'FSTC', supply: '500,000', value: '$1.23', change: '+8.2%' },
    { name: 'WaterToken', symbol: 'H2O', supply: '2,000,000', value: '$0.18', change: '-2.1%' },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
          💰 GAIA COIN CRAFTER
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced token creation & trading platform
        </p>
      </div>

      {/* Stats Overview */}
      <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Award className="h-6 w-6" />
            Crafter Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{createdTokens}</div>
              <div className="text-sm text-muted-foreground">Tokens Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$12,847</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">156</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">98.5%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Token</TabsTrigger>
          <TabsTrigger value="portfolio">My Tokens</TabsTrigger>
          <TabsTrigger value="trading">Trading Hub</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-green-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Coins className="h-6 w-6" />
                  Token Factory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-name">Token Name</Label>
                  <Input 
                    id="token-name"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="e.g., EcoGreen Token"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="token-symbol">Symbol</Label>
                  <Input 
                    id="token-symbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., ECG"
                    maxLength={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="total-supply">Total Supply</Label>
                  <Input 
                    id="total-supply"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    placeholder="e.g., 1000000"
                    type="number"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure
                  </Button>
                  <Button variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Fast Deploy
                  </Button>
                </div>
                
                <Button onClick={createToken} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                  <Coins className="h-4 w-4 mr-2" />
                  🚀 Create Token
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  ⚡ Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/20 rounded-lg">
                    <div className="font-bold text-blue-400 mb-2">🔒 Security Features</div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Multi-signature wallet support</li>
                      <li>• Automatic liquidity provision</li>
                      <li>• Anti-rug pull protection</li>
                      <li>• Smart contract auditing</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-900/20 rounded-lg">
                    <div className="font-bold text-green-400 mb-2">🌱 Eco Features</div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Carbon-neutral minting</li>
                      <li>• Environmental impact tracking</li>
                      <li>• Tree planting rewards</li>
                      <li>• Green energy validation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid gap-4">
            {myTokens.map((token, index) => (
              <Card key={index} className="border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Coins className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">{token.name}</div>
                        <div className="text-sm text-muted-foreground">{token.symbol}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">{token.value}</div>
                      <Badge className={token.change.startsWith('+') ? 'bg-green-600' : 'bg-red-600'}>
                        {token.change}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Supply: {token.supply} tokens
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <Card className="border-2 border-purple-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <TrendingUp className="h-6 w-6" />
                Trading Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                <div className="text-lg font-bold text-purple-400 mb-2">Advanced Trading Dashboard</div>
                <div className="text-muted-foreground mb-4">
                  Real-time trading, charts, and market analytics
                </div>
                <Badge className="bg-purple-600">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">📊 Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Market Cap</span>
                    <span className="font-bold">$45,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Volume</span>
                    <span className="font-bold text-green-400">$8,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Holders</span>
                    <span className="font-bold">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-blue-400">📈 Growth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>7-day Growth</span>
                    <span className="font-bold text-green-400">+18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30-day Growth</span>
                    <span className="font-bold text-green-400">+47.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All-time High</span>
                    <span className="font-bold">$2.34</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
