
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Star, 
  Eye,
  TreePine,
  Waves,
  Mountain,
  Building,
  Flame,
  Snowflake,
  Crown,
  Search
} from 'lucide-react'
import { toast } from 'sonner'

interface Landscape {
  id: string
  name: string
  price: number
  creator: string
  rating: number
  purchases: number
  description: string
  type: 'forest' | 'underwater' | 'mountain' | 'city' | 'desert' | 'arctic' | 'premium'
  image: string
  features: string[]
}

interface LandscapeMarketplaceProps {
  onPurchase: (landscapeName: string) => void
}

export function LandscapeMarketplace({ onPurchase }: LandscapeMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const [landscapes] = useState<Landscape[]>([
    {
      id: '1',
      name: 'Enchanted Forest Paradise',
      price: 250,
      creator: 'NatureMaster88',
      rating: 4.9,
      purchases: 1247,
      description: 'A magical forest with ancient trees, flowing streams, and mystical creatures',
      type: 'forest',
      image: '🌲',
      features: ['Interactive Trees', 'Wildlife Sounds', 'Day/Night Cycle', 'Weather Effects']
    },
    {
      id: '2',
      name: 'Deep Ocean Sanctuary',
      price: 350,
      creator: 'AquaDesigner',
      rating: 4.8,
      purchases: 892,
      description: 'Underwater paradise with coral reefs, swimming fish, and sunken treasures',
      type: 'underwater',
      image: '🌊',
      features: ['Swimming Mechanics', 'Marine Life', 'Treasure Hunting', 'Bubble Effects']
    },
    {
      id: '3',
      name: 'Mountain Peak Adventure',
      price: 300,
      creator: 'SkylineCreator',
      rating: 4.7,
      purchases: 654,
      description: 'Breathtaking mountain vista with climbing challenges and scenic views',
      type: 'mountain',
      image: '⛰️',
      features: ['Climbing System', 'Scenic Views', 'Cable Cars', 'Weather Systems']
    },
    {
      id: '4',
      name: 'Neon Cyber City',
      price: 500,
      creator: 'CyberArchitect',
      rating: 4.9,
      purchases: 1899,
      description: 'Futuristic cityscape with neon lights, flying cars, and interactive buildings',
      type: 'city',
      image: '🏙️',
      features: ['Flying Vehicles', 'Neon Lighting', 'Interactive Buildings', 'Holographic UI']
    },
    {
      id: '5',
      name: 'Sahara Desert Oasis',
      price: 200,
      creator: 'DesertNomad',
      rating: 4.5,
      purchases: 445,
      description: 'Vast desert with hidden oases, ancient pyramids, and sandstorm effects',
      type: 'desert',
      image: '🏜️',
      features: ['Sandstorm Effects', 'Ancient Ruins', 'Camel Riding', 'Star Gazing']
    },
    {
      id: '6',
      name: 'Arctic Ice Kingdom',
      price: 400,
      creator: 'IceQueen42',
      rating: 4.6,
      purchases: 723,
      description: 'Frozen wonderland with ice castles, aurora lights, and snow activities',
      type: 'arctic',
      image: '❄️',
      features: ['Aurora Effects', 'Ice Skating', 'Snow Building', 'Arctic Animals']
    },
    {
      id: '7',
      name: 'PREMIUM: Harmony of Gaia Realm',
      price: 1000,
      creator: 'GAIA_Official',
      rating: 5.0,
      purchases: 89,
      description: 'Exclusive premium landscape with all biomes combined and special GAIA powers',
      type: 'premium',
      image: '👑',
      features: ['All Biomes', 'GAIA Powers', 'Exclusive NPCs', 'Special Events']
    }
  ])

  const categories = [
    { id: 'all', name: 'All', icon: Eye },
    { id: 'forest', name: 'Forest', icon: TreePine },
    { id: 'underwater', name: 'Ocean', icon: Waves },
    { id: 'mountain', name: 'Mountain', icon: Mountain },
    { id: 'city', name: 'City', icon: Building },
    { id: 'desert', name: 'Desert', icon: Flame },
    { id: 'arctic', name: 'Arctic', icon: Snowflake },
    { id: 'premium', name: 'Premium', icon: Crown }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'forest': return 'from-green-600 to-emerald-600'
      case 'underwater': return 'from-blue-600 to-cyan-600'
      case 'mountain': return 'from-gray-600 to-slate-600'
      case 'city': return 'from-purple-600 to-indigo-600'
      case 'desert': return 'from-yellow-600 to-orange-600'
      case 'arctic': return 'from-cyan-400 to-blue-400'
      case 'premium': return 'from-yellow-400 to-pink-400'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const filteredLandscapes = landscapes.filter(landscape => {
    const matchesSearch = landscape.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         landscape.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || landscape.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const purchaseLandscape = (landscape: Landscape) => {
    toast.success(`🎉 Purchased ${landscape.name}!`, {
      description: `Welcome to your new landscape! Enjoy exploring all the features.`,
      duration: 5000
    })
    onPurchase(landscape.name)
  }

  return (
    <div className="space-y-6">
      
      {/* Search and Categories */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <ShoppingCart className="h-6 w-6" />
            🏪 Landscape Marketplace - Build Your World
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search landscapes or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="flex items-center gap-1"
              >
                <category.icon className="h-3 w-3" />
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Landscape Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLandscapes.map((landscape) => (
          <Card 
            key={landscape.id}
            className={`bg-gradient-to-br ${getTypeColor(landscape.type)}/20 border-2 hover:scale-105 transition-all duration-300`}
          >
            <CardContent className="p-4 space-y-4">
              {/* Landscape Preview */}
              <div className="relative h-32 bg-gradient-to-br from-black/30 to-gray-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-6xl">{landscape.image}</div>
                {landscape.type === 'premium' && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold">
                      <Crown className="h-3 w-3 mr-1" />
                      PREMIUM
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    {landscape.purchases} sold
                  </Badge>
                </div>
              </div>

              {/* Landscape Info */}
              <div>
                <h3 className="font-bold text-lg text-white mb-2">{landscape.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{landscape.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Creator:</span>
                    <span className="text-cyan-400 font-medium">{landscape.creator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-bold">{landscape.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {landscape.features.map((feature, index) => (
                      <Badge key={index} className="bg-blue-600/20 text-blue-300 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{landscape.price} GAIA</div>
                  <div className="text-xs text-gray-400">One-time purchase</div>
                </div>
                <Button 
                  onClick={() => purchaseLandscape(landscape)}
                  className={`w-full bg-gradient-to-r ${getTypeColor(landscape.type)} hover:opacity-90`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Landscape
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Marketplace Stats */}
      <Card className="bg-black/30 border-purple-500/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">{landscapes.length}</div>
              <div className="text-sm text-muted-foreground">Available Landscapes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">6,949</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">247</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">4.8★</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
