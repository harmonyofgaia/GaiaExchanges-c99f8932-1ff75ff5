
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Coins, 
  Hammer, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Wallet,
  Settings,
  Award,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

interface CoinDesign {
  id: string
  name: string
  symbol: string
  design: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  value: number
  created_at: string
}

export default function CoinCrafter() {
  const [craftedCoins, setCraftedCoins] = useState<CoinDesign[]>([])
  const [coinName, setCoinName] = useState('')
  const [coinSymbol, setCoinSymbol] = useState('')
  const [isCrafting, setIsCrafting] = useState(false)
  const [userTokens, setUserTokens] = useState(1250)

  useEffect(() => {
    // Load initial crafted coins
    const initialCoins: CoinDesign[] = [
      {
        id: '1',
        name: 'GAIA Genesis',
        symbol: 'GGNS',
        design: '🌍✨',
        rarity: 'legendary',
        value: 1000,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Forest Guardian',
        symbol: 'FGRD',
        design: '🌳🛡️',
        rarity: 'epic',
        value: 500,
        created_at: new Date().toISOString()
      }
    ]
    setCraftedCoins(initialCoins)
  }, [])

  const handleCraftCoin = async () => {
    if (!coinName || !coinSymbol) {
      toast.error('Please enter both coin name and symbol')
      return
    }

    if (userTokens < 100) {
      toast.error('Insufficient tokens to craft coin')
      return
    }

    setIsCrafting(true)

    try {
      // Simulate crafting process
      await new Promise(resolve => setTimeout(resolve, 3000))

      const rarities = ['common', 'rare', 'epic', 'legendary'] as const
      const rarity = rarities[Math.floor(Math.random() * rarities.length)]
      const designs = ['⚡🔥', '🌊💎', '🌟⭐', '🔮✨', '🎯🏆', '🚀🌙', '🎪🎨', '🌈💫']
      const design = designs[Math.floor(Math.random() * designs.length)]

      const newCoin: CoinDesign = {
        id: Date.now().toString(),
        name: coinName,
        symbol: coinSymbol.toUpperCase(),
        design,
        rarity,
        value: rarity === 'legendary' ? 1000 : rarity === 'epic' ? 500 : rarity === 'rare' ? 250 : 100,
        created_at: new Date().toISOString()
      }

      setCraftedCoins(prev => [newCoin, ...prev])
      setUserTokens(prev => prev - 100)
      setCoinName('')
      setCoinSymbol('')

      toast.success('🎉 Coin Crafted Successfully!', {
        description: `Created ${newCoin.name} (${newCoin.symbol}) - ${newCoin.rarity} rarity!`,
        duration: 5000
      })
    } catch (error) {
      toast.error('Failed to craft coin')
    } finally {
      setIsCrafting(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-600 text-yellow-100'
      case 'epic': return 'bg-purple-600 text-purple-100'
      case 'rare': return 'bg-blue-600 text-blue-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            🪙 COIN CRAFTER
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Craft unique digital coins with GAIA tokens and build your collection
          </p>
        </div>

        {/* User Stats */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Wallet className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">{userTokens}</div>
                <div className="text-sm text-muted-foreground">GAIA Tokens</div>
              </div>
              <div className="text-center">
                <Coins className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{craftedCoins.length}</div>
                <div className="text-sm text-muted-foreground">Coins Crafted</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {craftedCoins.filter(c => c.rarity === 'legendary' || c.rarity === 'epic').length}
                </div>
                <div className="text-sm text-muted-foreground">Rare Coins</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {craftedCoins.reduce((sum, coin) => sum + coin.value, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="craft" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="craft">Craft Coins</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="craft" className="space-y-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Hammer className="h-5 w-5" />
                  🔨 Coin Crafting Station
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Coin Name</label>
                    <Input
                      value={coinName}
                      onChange={(e) => setCoinName(e.target.value)}
                      placeholder="Enter coin name..."
                      className="bg-green-900/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Symbol (3-5 chars)</label>
                    <Input
                      value={coinSymbol}
                      onChange={(e) => setCoinSymbol(e.target.value.slice(0, 5))}
                      placeholder="Enter symbol..."
                      className="bg-green-900/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 bg-green-800/20 rounded-lg border border-green-500/20">
                  <div className="text-6xl">
                    {isCrafting ? '⚡' : '🪙'}
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-medium">Crafting Cost: 100 GAIA Tokens</p>
                    <p className="text-sm text-muted-foreground mt-1">Random rarity and design assigned</p>
                  </div>
                </div>

                <Button
                  onClick={handleCraftCoin}
                  disabled={isCrafting || !coinName || !coinSymbol || userTokens < 100}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12"
                >
                  {isCrafting ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Crafting Coin...
                    </>
                  ) : (
                    <>
                      <Hammer className="h-4 w-4 mr-2" />
                      🔨 Craft New Coin
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collection" className="space-y-4">
            {craftedCoins.length === 0 ? (
              <Card className="border-blue-500/30">
                <CardContent className="text-center py-12">
                  <Coins className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No coins crafted yet. Start creating your collection!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {craftedCoins.map((coin) => (
                  <Card key={coin.id} className="border-blue-500/30 bg-blue-900/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">{coin.design}</div>
                      <h3 className="font-bold text-lg mb-2">{coin.name}</h3>
                      <p className="text-muted-foreground mb-4">Symbol: {coin.symbol}</p>
                      
                      <div className="space-y-2">
                        <Badge className={getRarityColor(coin.rarity)}>
                          {coin.rarity.toUpperCase()}
                        </Badge>
                        <div className="text-sm">
                          <span className="text-yellow-400">Value: {coin.value} tokens</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-4">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardContent className="text-center py-12">
                <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Marketplace Coming Soon!</h3>
                <p className="text-muted-foreground">
                  Trade your crafted coins with other users and discover rare collections.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
