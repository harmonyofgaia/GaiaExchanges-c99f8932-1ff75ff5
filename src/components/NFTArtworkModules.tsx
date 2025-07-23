import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Palette, Upload, Eye, Heart, Share2, Download, Coins, Crown, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NFTArtwork {
  id: string
  title: string
  artist: string
  description: string
  image: string
  price: number
  currency: string
  environmentalImpact: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: string
  views: number
  likes: number
  created: string
}

interface ArtworkModule {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
  integrationLevel: string
}

export function NFTArtworkModules() {
  const [featuredArtworks, setFeaturedArtworks] = useState<NFTArtwork[]>([])
  const [artworkModules, setArtworkModules] = useState<ArtworkModule[]>([])
  const [selectedCategory, setSelectedCategory] = useState('environmental')
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    description: '',
    environmentalGoal: '',
    carbonOffset: ''
  })

  useEffect(() => {
    // Simulate featured environmental NFT artworks
    const artworks: NFTArtwork[] = [
      {
        id: 'NFT001',
        title: 'Carbon Forest Guardian',
        artist: 'EcoArtist_Maya',
        description: 'Digital representation of a carbon-absorbing forest with real-world tree planting backing',
        image: '🌲',
        price: 0.15,
        currency: 'GAIA',
        environmentalImpact: '100 trees planted',
        rarity: 'legendary',
        category: 'environmental',
        views: 2547,
        likes: 892,
        created: '2024-12-01'
      },
      {
        id: 'NFT002',
        title: 'Ocean Cleanup Wave',
        artist: 'BlueEarth_Collective',
        description: 'Animated artwork supporting ocean plastic removal projects',
        image: '🌊',
        price: 0.08,
        currency: 'GAIA',
        environmentalImpact: '50kg plastic removed',
        rarity: 'epic',
        category: 'environmental',
        views: 1823,
        likes: 654,
        created: '2024-11-28'
      },
      {
        id: 'NFT003',
        title: 'Solar Energy Mandala',
        artist: 'GreenTech_Visionary',
        description: 'Sacred geometry inspired by solar energy patterns, funds solar panel installations',
        image: '☀️',
        price: 0.12,
        currency: 'GAIA',
        environmentalImpact: '1 solar panel funded',
        rarity: 'rare',
        category: 'environmental',
        views: 1456,
        likes: 478,
        created: '2024-11-25'
      },
      {
        id: 'NFT004',
        title: 'Biodiversity Portal',
        artist: 'WildLife_Protector',
        description: 'Interactive artwork showcasing endangered species with conservation funding',
        image: '🦋',
        price: 0.20,
        currency: 'GAIA',
        environmentalImpact: '1 hectare protected',
        rarity: 'legendary',
        category: 'environmental',
        views: 3201,
        likes: 1247,
        created: '2024-11-20'
      }
    ]

    const modules: ArtworkModule[] = [
      {
        id: 'MOD001',
        name: 'Environmental Impact Tracking',
        description: 'Real-time tracking of environmental benefits from NFT purchases',
        icon: '📊',
        active: true,
        integrationLevel: 'Full'
      },
      {
        id: 'MOD002',
        name: 'Carbon Offset Integration',
        description: 'Automatic carbon offset calculations and purchases',
        icon: '🌱',
        active: true,
        integrationLevel: 'Full'
      },
      {
        id: 'MOD003',
        name: 'Artist Verification System',
        description: 'Verification and support for environmental artists',
        icon: '✅',
        active: true,
        integrationLevel: 'Full'
      },
      {
        id: 'MOD004',
        name: 'Community Curation',
        description: 'Community-driven artwork curation and governance',
        icon: '🗳️',
        active: true,
        integrationLevel: 'Partial'
      },
      {
        id: 'MOD005',
        name: 'Real-World Connection',
        description: 'Direct connection between digital art and real environmental projects',
        icon: '🌍',
        active: true,
        integrationLevel: 'Full'
      },
      {
        id: 'MOD006',
        name: 'Interactive Experiences',
        description: 'Immersive artwork experiences with environmental education',
        icon: '🎮',
        active: false,
        integrationLevel: 'Development'
      }
    ]

    setFeaturedArtworks(artworks)
    setArtworkModules(modules)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-600'
      case 'epic': return 'bg-purple-600'
      case 'rare': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="h-4 w-4" />
      case 'epic': return <Zap className="h-4 w-4" />
      case 'rare': return <Coins className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-teal-900/30">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          🎨 NFT Artwork Integration Modules
        </CardTitle>
        <p className="text-center text-sm text-emerald-300">
          Environmental Impact NFTs • Artist Collaboration • Real-World Connection
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Integration Modules Status */}
        <div>
          <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Active Integration Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworkModules.map((module) => (
              <div 
                key={module.id}
                className={`p-4 rounded-lg border transition-all ${
                  module.active 
                    ? 'bg-emerald-900/30 border-emerald-500/30 hover:border-emerald-500/50' 
                    : 'bg-gray-900/30 border-gray-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">{module.icon}</div>
                  <Badge className={module.active ? 'bg-green-600' : 'bg-gray-600'}>
                    {module.integrationLevel}
                  </Badge>
                </div>
                <div className="font-bold text-emerald-200 mb-1">{module.name}</div>
                <div className="text-sm text-emerald-300">{module.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Environmental NFTs */}
        <div>
          <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Featured Environmental NFTs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredArtworks.map((artwork) => (
              <div 
                key={artwork.id}
                className="bg-black/20 p-4 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{artwork.image}</div>
                    <div>
                      <div className="font-bold text-emerald-200">{artwork.title}</div>
                      <div className="text-sm text-emerald-400">by {artwork.artist}</div>
                    </div>
                  </div>
                  <Badge className={`${getRarityColor(artwork.rarity)} text-white flex items-center gap-1`}>
                    {getRarityIcon(artwork.rarity)}
                    {artwork.rarity}
                  </Badge>
                </div>

                <p className="text-sm text-emerald-300 mb-3">{artwork.description}</p>

                <div className="bg-green-900/30 p-3 rounded border border-green-500/30 mb-3">
                  <div className="text-green-300 font-medium text-sm mb-1">🌱 Environmental Impact</div>
                  <div className="text-green-200 font-bold">{artwork.environmentalImpact}</div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold text-emerald-200">
                    {artwork.price} {artwork.currency}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-emerald-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {artwork.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {artwork.likes}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Purchase NFT
                  </Button>
                  <Button size="sm" variant="outline" className="border-emerald-500/30">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-emerald-500/30">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Environmental NFT */}
        <div className="bg-black/20 p-6 rounded-lg border border-emerald-500/20">
          <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Create Environmental Impact NFT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nftTitle" className="text-emerald-300">Artwork Title</Label>
                <Input
                  id="nftTitle"
                  value={newArtwork.title}
                  onChange={(e) => setNewArtwork({...newArtwork, title: e.target.value})}
                  placeholder="Ocean Guardian Collection #1"
                  className="bg-black/30 border-emerald-500/30 text-emerald-200"
                />
              </div>
              
              <div>
                <Label htmlFor="nftDescription" className="text-emerald-300">Description</Label>
                <Textarea
                  id="nftDescription"
                  value={newArtwork.description}
                  onChange={(e) => setNewArtwork({...newArtwork, description: e.target.value})}
                  placeholder="Describe your environmental artwork and its mission..."
                  className="bg-black/30 border-emerald-500/30 text-emerald-200"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="environmentalGoal" className="text-emerald-300">Environmental Goal</Label>
                <Input
                  id="environmentalGoal"
                  value={newArtwork.environmentalGoal}
                  onChange={(e) => setNewArtwork({...newArtwork, environmentalGoal: e.target.value})}
                  placeholder="Plant 50 trees, Remove 25kg plastic"
                  className="bg-black/30 border-emerald-500/30 text-emerald-200"
                />
              </div>
              
              <div>
                <Label htmlFor="carbonOffset" className="text-emerald-300">Carbon Offset Amount</Label>
                <Input
                  id="carbonOffset"
                  value={newArtwork.carbonOffset}
                  onChange={(e) => setNewArtwork({...newArtwork, carbonOffset: e.target.value})}
                  placeholder="5 tonnes CO2"
                  className="bg-black/30 border-emerald-500/30 text-emerald-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Artwork
            </Button>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300">
              Preview NFT
            </Button>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-4 rounded-lg border border-emerald-500/30">
          <h3 className="text-lg font-bold text-emerald-400 mb-3">🎨 NFT Integration Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-emerald-300 font-medium">Total NFTs Created:</div>
              <div className="text-xl font-bold text-emerald-200">2,847</div>
            </div>
            <div>
              <div className="text-teal-300 font-medium">Environmental Projects:</div>
              <div className="text-xl font-bold text-teal-200">156</div>
            </div>
            <div>
              <div className="text-green-300 font-medium">Carbon Offset:</div>
              <div className="text-xl font-bold text-green-200">45.2 tonnes</div>
            </div>
            <div>
              <div className="text-blue-300 font-medium">Artists Supported:</div>
              <div className="text-xl font-bold text-blue-200">289</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}