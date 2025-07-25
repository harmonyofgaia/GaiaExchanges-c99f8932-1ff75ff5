
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tool, Landscape } from '@/types/ui-types'
import { 
  Coins, 
  Heart, 
  Eye, 
  ShoppingCart, 
  Waves, 
  Fish,
  Star,
  TrendingUp,
  Users,
  Globe,
  Image,
  Palette,
  Hammer,
  Crown,
  Award,
  Calendar,
  MapPin
} from 'lucide-react'
import { toast } from 'sonner'

export function CoralReefNFTMarketplace() {
  const [availableNFTs, setAvailableNFTs] = useState(1000000)
  const [soldNFTs, setSoldNFTs] = useState(0)
  const [pricePerNFT] = useState(1) // 1 GAiA token = 1 NFT
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [totalViews, setTotalViews] = useState(1247)
  const [activeTab, setActiveTab] = useState('marketplace')

  // Featured User Landscapes
  const [userLandscapes] = useState([
    {
      id: "1",
      name: "Mystic Ocean Paradise",
      creator: "OceanLover_42",
      biome: "Underwater",
      animalCount: 67,
      rating: 4.9,
      purchases: 1250,
      thumbnail: "🌊🪸🐠",
      description: "A vibrant underwater world with coral gardens and tropical fish",
      price: 5,
      verified: true,
      ageGroup: "adults"
    },
    {
      id: "2",
      name: "Enchanted Forest Sanctuary",
      creator: "NatureBuilder_77",
      biome: "Forest",
      animalCount: 89,
      rating: 4.8,
      purchases: 980,
      thumbnail: "🌲🦋🦌",
      description: "Magical forest realm with ancient trees and mystical creatures",
      price: 7,
      verified: true,
      ageGroup: "teens"
    },
    {
      id: "3",
      name: "Crystal Cave Adventure",
      creator: "CrystalMaster_23",
      biome: "Cave",
      animalCount: 34,
      rating: 4.7,
      purchases: 750,
      thumbnail: "💎🦇⛰️",
      description: "Sparkling crystal formations with rare cave-dwelling species",
      price: 8,
      verified: false,
      ageGroup: "young_adults"
    },
    {
      id: "4",
      name: "Rainbow Playground World",
      creator: "KidsCreator_99",
      biome: "Fantasy",
      animalCount: 45,
      rating: 4.9,
      purchases: 1500,
      thumbnail: "🌈🎠🦄",
      description: "Colorful magical world perfect for young adventurers",
      price: 3,
      verified: true,
      ageGroup: "children"
    }
  ])

  // Tool Marketplace
  const [buildingTools] = useState([
    {
      id: "1",
      name: "Master Builder Toolkit",
      description: "Complete set of advanced building tools for landscape creation",
      price: 25,
      icon: "🔨",
      category: "Building",
      features: ["Advanced Terrain Shaping", "Custom Block Creation", "Multi-layer Building"]
    },
    {
      id: "2",
      name: "Nature Expansion Pack",
      description: "Rare plants, trees, and natural elements for realistic landscapes",
      price: 15,
      icon: "🌿",
      category: "Nature",
      features: ["50+ New Plants", "Weather Effects", "Seasonal Changes"]
    },
    {
      id: "3",
      name: "Ocean Life Collection",
      description: "Marine animals and underwater decorations",
      price: 20,
      icon: "🐠",
      category: "Animals",
      features: ["25 Sea Creatures", "Coral Varieties", "Underwater Sounds"]
    },
    {
      id: "4",
      name: "Fantasy Realm Kit",
      description: "Magical elements and mythical creatures",
      price: 30,
      icon: "✨",
      category: "Fantasy",
      features: ["Dragons & Unicorns", "Magic Effects", "Enchanted Structures"]
    }
  ])

  // Simulate marketplace activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Random sales simulation
      if (Math.random() < 0.3 && availableNFTs > 0) {
        const randomSale = Math.floor(Math.random() * 5) + 1
        setAvailableNFTs(prev => Math.max(0, prev - randomSale))
        setSoldNFTs(prev => prev + randomSale)
        setTotalViews(prev => prev + Math.floor(Math.random() * 20) + 5)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [availableNFTs])

  const handlePurchase = () => {
    const amount = parseInt(purchaseAmount)
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (amount > availableNFTs) {
      toast.error(`Only ${availableNFTs.toLocaleString()} NFTs available`)
      return
    }

    // Simulate purchase
    setAvailableNFTs(prev => prev - amount)
    setSoldNFTs(prev => prev + amount)
    setPurchaseAmount('')
    
    toast.success(`🪸 Successfully purchased ${amount} Coral Reef NFT${amount > 1 ? 's' : ''}!`, {
      description: `Cost: ${amount} GAiA tokens. You're helping restore coral reefs worldwide!`,
      duration: 5000
    })
  }

  const buyTool = (tool: Tool) => {
    toast.success(`🔨 ${tool.name} Purchased!`, {
      description: `Cost: ${tool.price} GAiA tokens. New tools added to your inventory!`,
      duration: 4000
    })
  }

  const buyLandscape = (landscape: Landscape) => {
    toast.success(`🏞️ ${landscape.name} Purchased!`, {
      description: `Cost: ${landscape.price} GAiA tokens. Landscape added to your collection!`,
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      {/* Enhanced NFT Header */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
            <div className="text-6xl animate-pulse">🪸</div>
            <div>
              <h2 className="text-3xl">GAIA'S EXCHANGE MARKETPLACE</h2>
              <p className="text-lg text-cyan-300">Complete NFT & Tools Ecosystem</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {/* Impressive Coral Reef Logo/Art */}
            <div className="relative bg-gradient-to-b from-cyan-400/20 to-blue-600/20 rounded-lg p-8 border border-cyan-500/30">
              <div className="text-8xl animate-bounce mb-4">🪸</div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse rounded-lg"></div>
              <div className="flex justify-center gap-2 text-4xl">
                <span className="animate-pulse">🐠</span>
                <span className="animate-bounce delay-100">🦈</span>
                <span className="animate-pulse delay-200">🦑</span>
                <span className="animate-bounce delay-300">🐢</span>
                <span className="animate-pulse delay-500">🦭</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-2xl font-bold text-cyan-400">🎵 SAVE THE REEF COLLECTION 🎵</h3>
                <p className="text-cyan-300">Underwater Audio Restoration Technology</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">{availableNFTs.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Available NFTs</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{soldNFTs.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Sold</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{pricePerNFT} GAiA</div>
                <div className="text-sm text-muted-foreground">Price Each</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Marketplace Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Coral NFTs
          </TabsTrigger>
          <TabsTrigger value="landscapes" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            User Landscapes
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Hammer className="h-4 w-4" />
            Building Tools
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Featured
          </TabsTrigger>
        </TabsList>

        {/* Coral Reef NFT Purchase */}
        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <ShoppingCart className="h-6 w-6" />
                  Purchase Coral Reef NFTs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of NFTs to Purchase</label>
                  <Input
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder="Enter amount..."
                    min="1"
                    max={availableNFTs}
                  />
                  <p className="text-sm text-muted-foreground">
                    Cost: {purchaseAmount ? parseInt(purchaseAmount) * pricePerNFT : 0} GAiA tokens
                  </p>
                </div>
                
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  disabled={!purchaseAmount || parseInt(purchaseAmount) <= 0}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Buy Coral Reef NFTs
                </Button>
                
                <div className="text-center text-sm text-cyan-400">
                  🪸 Every purchase directly funds coral reef restoration!
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Waves className="h-6 w-6" />
                  NFT Benefits & Utility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-sm">Directly funds coral reef restoration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fish className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm">Helps marine life return to restored reefs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Supports global ocean ecosystem recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Join exclusive conservation community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Rare collectible with environmental impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    <span className="text-sm">Potential value appreciation</span>
                  </div>
                </div>
                
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <h4 className="font-bold text-cyan-400 mb-2">🎵 Special Features:</h4>
                  <div className="text-sm space-y-1">
                    <div>• Access to underwater audio recordings</div>
                    <div>• Progress updates from reef sites</div>
                    <div>• Exclusive marine life photography</div>
                    <div>• Community voting on new reef locations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Created Landscapes */}
        <TabsContent value="landscapes" className="space-y-6">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Image className="h-6 w-6" />
                Featured User-Created Landscapes
                <Badge className="bg-purple-600 text-white">By GAiA Token Holders</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userLandscapes.map((landscape) => (
                  <Card key={landscape.id} className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-6xl mb-3">{landscape.thumbnail}</div>
                          <h3 className="text-xl font-bold text-purple-400">{landscape.name}</h3>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {landscape.biome}
                            </Badge>
                            {landscape.verified && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Creator:</span>
                            <span className="text-cyan-400">{landscape.creator}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Animals:</span>
                            <span className="text-green-400">{landscape.animalCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating:</span>
                            <span className="text-yellow-400 flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              {landscape.rating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Purchases:</span>
                            <span className="text-blue-400">{landscape.purchases.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Age Group:</span>
                            <span className="text-purple-400 capitalize">{landscape.ageGroup.replace('_', ' ')}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground italic">
                          "{landscape.description}"
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-lg font-bold text-green-400">
                            {landscape.price} GAiA
                          </div>
                          <Button 
                            onClick={() => buyLandscape(landscape)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy Landscape
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Building Tools */}
        <TabsContent value="tools" className="space-y-6">
          <Card className="border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Hammer className="h-6 w-6" />
                Landscape Building Tools & Materials
                <Badge className="bg-orange-600 text-white">Buy with GAiA</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {buildingTools.map((tool) => (
                  <Card key={tool.id} className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border-orange-500/20">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{tool.icon}</div>
                          <h3 className="text-lg font-bold text-orange-400">{tool.name}</h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {tool.category}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground text-center">
                          {tool.description}
                        </p>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-orange-400">Features:</h4>
                          <ul className="text-xs space-y-1">
                            {tool.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xl font-bold text-green-400">
                            {tool.price} GAiA
                          </div>
                          <Button 
                            onClick={() => buyTool(tool)}
                            className="bg-gradient-to-r from-orange-600 to-yellow-600"
                            size="sm"
                          >
                            <Coins className="h-4 w-4 mr-2" />
                            Buy Tool
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Section */}
        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gold-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Crown className="h-6 w-6" />
                  GAiA Token Holders Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Create unlimited landscapes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-orange-400" />
                    <span className="text-sm">Access to all building tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Community marketplace access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Earn from landscape sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm">Virtual animal walks anywhere</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-teal-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Waves className="h-6 w-6" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl">🌍</div>
                  <h3 className="font-bold text-green-400">Every Purchase Helps</h3>
                  <p className="text-sm text-muted-foreground">
                    5% of all token burns fund coral reef restoration through our Sound Riffs Re Grau dio project
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl">🪸</div>
                    <div className="text-sm font-bold text-cyan-400">3</div>
                    <div className="text-xs text-muted-foreground">Active Reefs</div>
                  </div>
                  <div>
                    <div className="text-2xl">🐠</div>
                    <div className="text-sm font-bold text-blue-400">247</div>
                    <div className="text-xs text-muted-foreground">Species Returned</div>
                  </div>
                  <div>
                    <div className="text-2xl">🌊</div>
                    <div className="text-sm font-bold text-green-400">12%</div>
                    <div className="text-xs text-muted-foreground">Recovery Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Real-World Impact Section */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Waves className="h-6 w-6" />
            Real-World Impact of Your Marketplace Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl">🔊</div>
              <h4 className="font-bold text-cyan-400">Audio Technology</h4>
              <p className="text-sm text-muted-foreground">
                Balanced underwater sound signals attract marine life and stimulate coral growth
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🐠</div>
              <h4 className="font-bold text-blue-400">Marine Life Recovery</h4>
              <p className="text-sm text-muted-foreground">
                Fish and sea creatures return to restored reef areas, rebuilding the ecosystem
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🌊</div>
              <h4 className="font-bold text-green-400">Ocean Health</h4>
              <p className="text-sm text-muted-foreground">
                Healthy coral reefs protect coastlines and support global ocean biodiversity
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">🎵 "Seeds Will Form Into Music" 🎵</h3>
              <p className="text-muted-foreground">
                Every purchase in our marketplace creates harmony in our oceans, turning the sounds of restoration into the music of life. 
                Your contribution helps rebuild the underwater symphony that nature intended.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
