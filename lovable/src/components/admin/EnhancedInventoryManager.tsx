
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Crown, Sword, Shield, Zap, Mountain, Gem, Star, Eye, Rocket, 
  Gamepad2, Palette, Settings, Database, Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface InventoryItem {
  id: string
  name: string
  category: 'weapon' | 'armor' | 'tool' | 'landscape' | 'character' | 'enhancement' | 'rare'
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'quantum' | 'mythical'
  powerLevel: number
  description: string
  fileSize: string
  value: number
  quantity: number
}

export function EnhancedInventoryManager() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadEnhancedInventory()
  }, [])

  const loadEnhancedInventory = () => {
    const items: InventoryItem[] = [
      // Mythical Weapons
      {
        id: 'weapon-myth-001',
        name: '🐉 Quantum Dragon Slayer Blade',
        category: 'weapon',
        rarity: 'mythical',
        powerLevel: 99999,
        description: 'Legendary sword forged from quantum dragon scales with reality-cutting abilities',
        fileSize: '15.7 GB',
        value: 1000000,
        quantity: 1
      },
      {
        id: 'weapon-myth-002',
        name: '⚡ Thunder God\'s Hammer',
        category: 'weapon',
        rarity: 'mythical',
        powerLevel: 95000,
        description: 'Divine hammer that controls lightning and storms across all dimensions',
        fileSize: '12.3 GB',
        value: 850000,
        quantity: 1
      },
      {
        id: 'weapon-legend-001',
        name: '🔥 Phoenix Fire Staff Supreme',
        category: 'weapon',
        rarity: 'legendary',
        powerLevel: 75000,
        description: 'Staff channeling eternal phoenix flames with resurrection powers',
        fileSize: '8.9 GB',
        value: 500000,
        quantity: 3
      },
      {
        id: 'weapon-legend-002',
        name: '❄️ Absolute Zero Katana',
        category: 'weapon',
        rarity: 'legendary',
        powerLevel: 72000,
        description: 'Cyberpunk ice katana that freezes molecular structures instantly',
        fileSize: '7.2 GB',
        value: 450000,
        quantity: 2
      },
      {
        id: 'weapon-epic-001',
        name: '🌊 Tsunami Trident',
        category: 'weapon',
        rarity: 'epic',
        powerLevel: 65000,
        description: 'Ocean master\'s trident controlling all water-based powers',
        fileSize: '6.1 GB',
        value: 300000,
        quantity: 5
      },

      // Mythical Armor Sets
      {
        id: 'armor-myth-001',
        name: '👑 Quantum Emperor\'s Crown Armor',
        category: 'armor',
        rarity: 'mythical',
        powerLevel: 98000,
        description: 'Complete armor set worn by quantum dimension emperors',
        fileSize: '18.4 GB',
        value: 1200000,
        quantity: 1
      },
      {
        id: 'armor-legend-001',
        name: '🛡️ Dragon Scale Battle Suit',
        category: 'armor',
        rarity: 'legendary',
        powerLevel: 85000,
        description: 'Full-body protection made from ancient dragon scales',
        fileSize: '14.6 GB',
        value: 750000,
        quantity: 2
      },
      {
        id: 'armor-legend-002',
        name: '❄️ Ice Globe Guardian Armor',
        category: 'armor',
        rarity: 'legendary',
        powerLevel: 78000,
        description: 'Crystalline armor providing immunity to all temperature extremes',
        fileSize: '11.8 GB',
        value: 600000,
        quantity: 3
      },

      // Mega Landscapes
      {
        id: 'landscape-myth-001',
        name: '🌍 Infinite Quantum Multiverse',
        category: 'landscape',
        rarity: 'mythical',
        powerLevel: 100000,
        description: 'Endless reality with infinite parallel dimensions and possibilities',
        fileSize: '2500 TB',
        value: 5000000,
        quantity: 1
      },
      {
        id: 'landscape-myth-002',
        name: '❄️🌲 Cyber Ice Globe Forest Realm',
        category: 'landscape',
        rarity: 'mythical',
        powerLevel: 95000,
        description: 'Halo × Rage × Cyberpunk fusion in ice globes and dense forests',
        fileSize: '1000 TB',
        value: 3000000,
        quantity: 1
      },
      {
        id: 'landscape-legend-001',
        name: '🏔️ Floating Mountain Citadel',
        category: 'landscape',
        rarity: 'legendary',
        powerLevel: 80000,
        description: 'Massive floating mountain complex with anti-gravity technology',
        fileSize: '500 TB',
        value: 1500000,
        quantity: 2
      },
      {
        id: 'landscape-legend-002',
        name: '🌊 Underwater Dragon Kingdom',
        category: 'landscape',
        rarity: 'legendary',
        powerLevel: 82000,
        description: 'Submerged realm ruled by aquatic dragons with bioluminescent cities',
        fileSize: '750 TB',
        value: 2000000,
        quantity: 1
      },

      // Ultimate Characters
      {
        id: 'character-myth-001',
        name: '🐲 Omega Dragon Emperor',
        category: 'character',
        rarity: 'mythical',
        powerLevel: 99999,
        description: 'Supreme dragon ruler with control over all elements and dimensions',
        fileSize: '25.8 GB',
        value: 2500000,
        quantity: 1
      },
      {
        id: 'character-myth-002',
        name: '👸 Quantum Goddess Empress',
        category: 'character',
        rarity: 'mythical',
        powerLevel: 98500,
        description: 'Divine being controlling quantum mechanics and reality itself',
        fileSize: '23.2 GB',
        value: 2200000,
        quantity: 1
      },
      {
        id: 'character-legend-001',
        name: '🤖 Cyberpunk Overlord',
        category: 'character',
        rarity: 'legendary',
        powerLevel: 88000,
        description: 'Master of all cybernetic technologies and digital realms',
        fileSize: '18.7 GB',
        value: 1800000,
        quantity: 2
      },

      // Quantum Enhancements
      {
        id: 'enhancement-myth-001',
        name: '⚡ Reality Manipulation Core',
        category: 'enhancement',
        rarity: 'mythical',
        powerLevel: 100000,
        description: 'Core system allowing complete control over physical laws',
        fileSize: '45.3 GB',
        value: 3500000,
        quantity: 1
      },
      {
        id: 'enhancement-legend-001',
        name: '🔮 Quantum Consciousness Amplifier',
        category: 'enhancement',
        rarity: 'legendary',
        powerLevel: 90000,
        description: 'Device expanding consciousness across multiple dimensions',
        fileSize: '32.1 GB',
        value: 2800000,
        quantity: 2
      },

      // Rare Tools & Utilities
      {
        id: 'tool-legend-001',
        name: '🛠️ Universal Creation Engine',
        category: 'tool',
        rarity: 'legendary',
        powerLevel: 85000,
        description: 'Tool capable of creating any object or landscape from quantum matter',
        fileSize: '28.9 GB',
        value: 2000000,
        quantity: 3
      },
      {
        id: 'tool-epic-001',
        name: '🎨 AI Art Master Pro',
        category: 'tool',
        rarity: 'epic',
        powerLevel: 70000,
        description: 'Advanced AI system generating photorealistic art in any style',
        fileSize: '15.4 GB',
        value: 800000,
        quantity: 5
      },

      // Special Rare Items
      {
        id: 'rare-myth-001',
        name: '💎 Infinity Gem Collection',
        category: 'rare',
        rarity: 'mythical',
        powerLevel: 99000,
        description: 'Complete set of reality-controlling infinity gems',
        fileSize: '50.7 GB',
        value: 10000000,
        quantity: 1
      },
      {
        id: 'rare-legend-001',
        name: '🌟 Cosmic Energy Crystals',
        category: 'rare',
        rarity: 'legendary',
        powerLevel: 75000,
        description: 'Rare crystals containing pure cosmic energy',
        fileSize: '12.3 GB',
        value: 1500000,
        quantity: 10
      }
    ]
    setInventory(items)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythical': return 'from-red-600 via-purple-600 to-pink-600'
      case 'quantum': return 'from-purple-600 via-pink-600 to-purple-600'
      case 'legendary': return 'from-yellow-600 via-orange-600 to-yellow-600'
      case 'epic': return 'from-blue-600 via-cyan-600 to-blue-600'
      case 'rare': return 'from-green-600 via-emerald-600 to-green-600'
      default: return 'from-gray-600 via-slate-600 to-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weapon': return <Sword className="h-4 w-4" />
      case 'armor': return <Shield className="h-4 w-4" />
      case 'landscape': return <Mountain className="h-4 w-4" />
      case 'character': return <Crown className="h-4 w-4" />
      case 'enhancement': return <Zap className="h-4 w-4" />
      case 'tool': return <Settings className="h-4 w-4" />
      case 'rare': return <Gem className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  const filteredItems = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalValue = inventory.reduce((sum, item) => sum + (item.value * item.quantity), 0)
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Database className="h-6 w-6" />
          💰 ENHANCED PREMIUM INVENTORY - ULTIMATE COLLECTION
        </CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-purple-900/30 rounded">
            <div className="text-lg font-bold text-purple-400">{totalItems}</div>
            <div className="text-xs text-muted-foreground">Total Items</div>
          </div>
          <div className="p-2 bg-yellow-900/30 rounded">
            <div className="text-lg font-bold text-yellow-400">${totalValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Value</div>
          </div>
          <div className="p-2 bg-red-900/30 rounded">
            <div className="text-lg font-bold text-red-400">{inventory.filter(i => i.rarity === 'mythical').length}</div>
            <div className="text-xs text-muted-foreground">Mythical Items</div>
          </div>
          <div className="p-2 bg-blue-900/30 rounded">
            <div className="text-lg font-bold text-blue-400">4000+ TB</div>
            <div className="text-xs text-muted-foreground">Storage Used</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-4">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-muted border border-border rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="weapon">Weapons</option>
            <option value="armor">Armor</option>
            <option value="landscape">Landscapes</option>
            <option value="character">Characters</option>
            <option value="enhancement">Enhancements</option>
            <option value="tool">Tools</option>
            <option value="rare">Rare Items</option>
          </select>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`bg-gradient-to-br ${getRarityColor(item.rarity)} bg-opacity-10 border-2 hover:scale-105 transition-all`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  </div>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white text-xs`}>
                    {item.rarity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Power Level:</span>
                    <span className="text-green-400 font-bold">{item.powerLevel.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span className="text-blue-400">{item.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value:</span>
                    <span className="text-yellow-400">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="text-purple-400">{item.quantity}</span>
                  </div>
                </div>
                
                <Button className={`w-full mt-3 bg-gradient-to-r ${getRarityColor(item.rarity)} hover:opacity-90 text-xs`}>
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
