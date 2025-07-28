
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">🛒 Marketplace</TabsTrigger>
          <TabsTrigger value="builders">🔨 Content Builders</TabsTrigger>
          <TabsTrigger value="minecraft">⛏️ Minecraft Builder</TabsTrigger>
          <TabsTrigger value="upload">📤 Upload Creations</TabsTrigger>
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

        <TabsContent value="builders" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <TreePine className="h-6 w-6" />
                  Landscape Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create stunning landscapes for Minecraft and other games
                </p>
                <Button 
                  onClick={() => launchBuilder('Landscape')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Mountain className="h-4 w-4 mr-2" />
                  Launch Builder
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Sword className="h-6 w-6" />
                  Weapon Creator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Design weapons and items for GAiA Fantasy and other games
                </p>
                <Button 
                  onClick={() => launchBuilder('Weapon')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Sword className="h-4 w-4 mr-2" />
                  Launch Builder
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                🎮 Game Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  🐛 Worms Arena Items
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  ⚔️ GAiA Fantasy Gear
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  ⛏️ Minecraft Builds
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minecraft" className="space-y-6">
          <MinecraftLandscapeBuilder />
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
