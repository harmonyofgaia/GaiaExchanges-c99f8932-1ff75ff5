
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ShoppingCart, 
  Hammer, 
  Sword, 
  Mountain, 
  TreePine,
  Upload,
  Star,
  Crown,
  Gamepad2
} from 'lucide-react'
import { MinecraftLandscapeBuilder } from '@/components/MinecraftLandscapeBuilder'
import { toast } from 'sonner'

interface MarketplaceItem {
  id: string
  name: string
  creator: string
  price: number
  category: 'landscape' | 'weapon' | 'building' | 'decoration'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  gameCompatible: string[]
  image: string
}

export function UniversalMarketplace() {
  const [marketplaceItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      name: 'Dragon Mountain Fortress',
      creator: 'GAiA Builder Pro',
      price: 500,
      category: 'landscape',
      rarity: 'legendary',
      gameCompatible: ['Minecraft', 'GAiA Fantasy', 'Worms Arena'],
      image: '🏔️'
    },
    {
      id: '2',
      name: 'Crystal Sword of Harmony',
      creator: 'Community Creator',
      price: 150,
      category: 'weapon',
      rarity: 'epic',
      gameCompatible: ['GAiA Fantasy', 'Adventure Mode'],
      image: '⚔️'
    },
    {
      id: '3',
      name: 'Enchanted Forest Biome',
      creator: 'EcoBuilder',
      price: 300,
      category: 'landscape',
      rarity: 'rare',
      gameCompatible: ['Minecraft', 'Survival Mode'],
      image: '🌲'
    }
  ])

  const [uploadMode, setUploadMode] = useState(false)

  const purchaseItem = (item: MarketplaceItem) => {
    toast.success(`🛒 Purchased ${item.name}!`, {
      description: `Item added to your inventory • Compatible with: ${item.gameCompatible.join(', ')}`,
      duration: 5000
    })
  }

  const launchBuilder = (builderType: string) => {
    toast.success(`🔨 Launching ${builderType} Builder!`, {
      description: 'Create amazing content and earn GAiA tokens',
      duration: 4000
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-600 to-pink-600'
      case 'epic': return 'from-blue-600 to-cyan-600'
      case 'rare': return 'from-green-600 to-emerald-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            🏪 UNIVERSAL MARKETPLACE & BUILDER ENGINE
          </CardTitle>
          <p className="text-muted-foreground">
            Buy, sell, and create content that works across our entire gaming ecosystem
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="marketplace">🛒 Marketplace</TabsTrigger>
          <TabsTrigger value="gaming-items">🎮 Gaming Items</TabsTrigger>
          <TabsTrigger value="eco-products">🌱 Eco Products</TabsTrigger>
          <TabsTrigger value="digital-assets">💎 Digital Assets</TabsTrigger>
          <TabsTrigger value="upload">📤 Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item) => (
              <Card key={item.id} className={`border-2 bg-gradient-to-br ${getRarityColor(item.rarity)}/20 hover:scale-105 transition-all`}>
                <CardContent className="p-4 space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{item.image}</div>
                    <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
                      {item.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">by {item.creator}</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-2">{item.price} GAiA</div>
                    <div className="text-xs text-muted-foreground">
                      Compatible: {item.gameCompatible.join(', ')}
                    </div>
                  </div>

                  <Button 
                    onClick={() => purchaseItem(item)}
                    className={`w-full bg-gradient-to-r ${getRarityColor(item.rarity)}`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaming-items" className="space-y-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                🎮 Gaming Power-Ups & Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-900/20 border-red-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="font-bold text-white">Speed Boost Pack</h3>
                    <p className="text-sm text-muted-foreground mb-3">10x speed boost for all games</p>
                    <div className="text-xl font-bold text-green-400 mb-2">75 GAiA</div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">Purchase</Button>
                  </CardContent>
                </Card>
                <Card className="bg-blue-900/20 border-blue-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">🛡️</div>
                    <h3 className="font-bold text-white">Protection Shield</h3>
                    <p className="text-sm text-muted-foreground mb-3">Ultimate defense upgrade</p>
                    <div className="text-xl font-bold text-green-400 mb-2">100 GAiA</div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Purchase</Button>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-900/20 border-yellow-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <h3 className="font-bold text-white">Token Multiplier</h3>
                    <p className="text-sm text-muted-foreground mb-3">2x GAiA earning boost</p>
                    <div className="text-xl font-bold text-green-400 mb-2">150 GAiA</div>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Purchase</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eco-products" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TreePine className="h-6 w-6" />
                🌱 Eco-Friendly Products & Conservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-green-800/20 border-green-400/30">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-2 text-center">🌳</div>
                    <h3 className="font-bold text-white">Plant 100 Trees</h3>
                    <p className="text-sm text-muted-foreground mb-3">Real trees planted in your name</p>
                    <div className="text-xl font-bold text-green-400 mb-2">200 GAiA</div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Plant Trees</Button>
                  </CardContent>
                </Card>
                <Card className="bg-blue-800/20 border-blue-400/30">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-2 text-center">🌊</div>
                    <h3 className="font-bold text-white">Ocean Cleanup Fund</h3>
                    <p className="text-sm text-muted-foreground mb-3">Support ocean cleaning projects</p>
                    <div className="text-xl font-bold text-green-400 mb-2">250 GAiA</div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Support Ocean</Button>
                  </CardContent>
                </Card>
                <Card className="bg-purple-800/20 border-purple-400/30">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-2 text-center">☀️</div>
                    <h3 className="font-bold text-white">Solar Panel Fund</h3>
                    <p className="text-sm text-muted-foreground mb-3">Contribute to renewable energy</p>
                    <div className="text-xl font-bold text-green-400 mb-2">300 GAiA</div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Fund Solar</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital-assets" className="space-y-6">
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Crown className="h-6 w-6" />
                💎 Premium Digital Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">👑</div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">EXCLUSIVE</Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg">GAiA Premium Avatar</h3>
                    <p className="text-sm text-muted-foreground mb-3">Exclusive avatar with special abilities</p>
                    <div className="text-2xl font-bold text-green-400 mb-4">500 GAiA</div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Get Avatar</Button>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">🎵</div>
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">PREMIUM</Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg">Custom Music Pack</h3>
                    <p className="text-sm text-muted-foreground mb-3">Personalized background music</p>
                    <div className="text-2xl font-bold text-green-400 mb-4">350 GAiA</div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">Get Music</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="upload" className="space-y-6">
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Upload className="h-6 w-6" />
                📤 Upload Your Creations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-8 border-2 border-dashed border-yellow-500/50 rounded-lg">
                <Upload className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Upload Your Content</h3>
                <p className="text-muted-foreground mb-4">
                  Share your creations with the community and earn GAiA tokens
                </p>
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded border border-green-500/20">
                  <h4 className="font-bold text-green-400 mb-2">💰 Earn GAiA Tokens</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 50 GAiA per approved landscape</li>
                    <li>• 30 GAiA per weapon design</li>
                    <li>• Bonus for popular items</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/20">
                  <h4 className="font-bold text-blue-400 mb-2">🎮 Multi-Game Support</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Automatic format conversion</li>
                    <li>• Cross-game compatibility</li>
                    <li>• Quality assurance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
