
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  Shirt, 
  Home, 
  Hammer,
  Star,
  Crown,
  Gem,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'

interface InventoryItem {
  id: string
  name: string
  type: 'clothing' | 'furniture' | 'tool' | 'decoration' | 'premium'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  quantity: number
  equipped?: boolean
  description: string
  icon: string
}

export function PlayerInventory() {
  const [selectedTab, setSelectedTab] = useState('all')
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'GAIA Explorer Outfit',
      type: 'clothing',
      rarity: 'rare',
      quantity: 1,
      equipped: true,
      description: 'Stylish explorer clothing with GAIA logo',
      icon: '🧥'
    },
    {
      id: '2',
      name: 'Wooden Chair',
      type: 'furniture',
      rarity: 'common',
      quantity: 3,
      description: 'Simple wooden chair for your landscape',
      icon: '🪑'
    },
    {
      id: '3',
      name: 'Magic Building Hammer',
      type: 'tool',
      rarity: 'epic',
      quantity: 1,
      description: 'Build structures instantly with this magical tool',
      icon: '🔨'
    },
    {
      id: '4',
      name: 'Crystal Fountain',
      type: 'decoration',
      rarity: 'legendary',
      quantity: 1,
      description: 'Beautiful crystal fountain that sparkles in sunlight',
      icon: '⛲'
    },
    {
      id: '5',
      name: 'Golden Crown of Gaia',
      type: 'premium',
      rarity: 'legendary',
      quantity: 1,
      description: 'Exclusive crown showing your dedication to GAIA',
      icon: '👑'
    },
    {
      id: '6',
      name: 'Virtual Sunglasses',
      type: 'clothing',
      rarity: 'rare',
      quantity: 1,
      description: 'Cool sunglasses for your avatar',
      icon: '🕶️'
    },
    {
      id: '7',
      name: 'Campfire Kit',
      type: 'decoration',
      rarity: 'common',
      quantity: 5,
      description: 'Create cozy campfires in your landscapes',
      icon: '🔥'
    },
    {
      id: '8',
      name: 'Rainbow Bridge',
      type: 'decoration',
      rarity: 'epic',
      quantity: 1,
      description: 'Magnificent rainbow bridge connecting different areas',
      icon: '🌈'
    }
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-600 to-orange-600'
      case 'epic': return 'from-purple-600 to-pink-600'
      case 'rare': return 'from-blue-600 to-cyan-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'clothing': return Shirt
      case 'furniture': return Home
      case 'tool': return Hammer
      case 'decoration': return Star
      case 'premium': return Crown
      default: return Package
    }
  }

  const filteredItems = inventory.filter(item => 
    selectedTab === 'all' || item.type === selectedTab
  )

  const equipItem = (itemId: string) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId ? { ...item, equipped: !item.equipped } : item
    ))
    
    const item = inventory.find(i => i.id === itemId)
    if (item) {
      toast.success(`${item.equipped ? 'Unequipped' : 'Equipped'} ${item.name}!`)
    }
  }

  const useItem = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId)
    if (item && item.quantity > 0) {
      if (item.type === 'tool') {
        toast.success(`🔨 Using ${item.name}!`, {
          description: 'Tool activated and ready to use in the world',
          duration: 3000
        })
      } else if (item.type === 'decoration') {
        toast.success(`🎨 Placed ${item.name}!`, {
          description: 'Decoration added to your current landscape',
          duration: 3000
        })
        
        setInventory(prev => prev.map(i => 
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        ))
      }
    }
  }

  const inventoryStats = {
    totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
    equippedItems: inventory.filter(item => item.equipped).length,
    rareLegendary: inventory.filter(item => item.rarity === 'rare' || item.rarity === 'legendary').length,
    premiumItems: inventory.filter(item => item.type === 'premium').length
  }

  return (
    <div className="space-y-6">
      
      {/* Inventory Stats */}
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Package className="h-6 w-6" />
            🎒 Player Inventory - Your Virtual Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{inventoryStats.totalItems}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{inventoryStats.equippedItems}</div>
              <div className="text-sm text-muted-foreground">Equipped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{inventoryStats.rareLegendary}</div>
              <div className="text-sm text-muted-foreground">Rare+ Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{inventoryStats.premiumItems}</div>
              <div className="text-sm text-muted-foreground">Premium Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6 bg-black/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="clothing">
            <Shirt className="h-4 w-4 mr-1" />
            Clothing
          </TabsTrigger>
          <TabsTrigger value="furniture">
            <Home className="h-4 w-4 mr-1" />
            Furniture
          </TabsTrigger>
          <TabsTrigger value="tool">
            <Hammer className="h-4 w-4 mr-1" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="decoration">
            <Star className="h-4 w-4 mr-1" />
            Decorations
          </TabsTrigger>
          <TabsTrigger value="premium">
            <Crown className="h-4 w-4 mr-1" />
            Premium
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type)
              
              return (
                <Card 
                  key={item.id}
                  className={`bg-gradient-to-br ${getRarityColor(item.rarity)}/20 border-2 hover:scale-105 transition-all duration-300 ${item.equipped ? 'ring-2 ring-green-400' : ''}`}
                >
                  <CardContent className="p-4 space-y-4">
                    {/* Item Header */}
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="text-right">
                        {item.equipped && (
                          <Badge className="bg-green-600 text-white mb-1">Equipped</Badge>
                        )}
                        <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
                          {item.rarity}
                        </Badge>
                      </div>
                    </div>

                    {/* Item Info */}
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <TypeIcon className="h-4 w-4" />
                          <span className="capitalize">{item.type}</span>
                        </div>
                        <span className="font-bold">Qty: {item.quantity}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {(item.type === 'clothing' || item.type === 'premium') && (
                        <Button
                          size="sm"
                          onClick={() => equipItem(item.id)}
                          variant={item.equipped ? "destructive" : "default"}
                          className="flex-1"
                        >
                          {item.equipped ? 'Unequip' : 'Equip'}
                        </Button>
                      )}
                      
                      {(item.type === 'tool' || item.type === 'decoration') && item.quantity > 0 && (
                        <Button
                          size="sm"
                          onClick={() => useItem(item.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          {item.type === 'tool' ? 'Use Tool' : 'Place'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredItems.length === 0 && (
            <Card className="bg-gray-900/30 border-gray-500/30">
              <CardContent className="p-8 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No Items Found</h3>
                <p className="text-gray-500">
                  {selectedTab === 'all' ? 'Your inventory is empty' : `No ${selectedTab} items in your inventory`}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
