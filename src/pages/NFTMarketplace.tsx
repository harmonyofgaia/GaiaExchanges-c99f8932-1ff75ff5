
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Image, 
  ShoppingCart, 
  Eye, 
  Heart,
  TrendingUp,
  Award,
  Palette,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface NFTItem {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  creator: string
  category: 'landscape' | 'animal' | 'art' | 'utility'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  likes: number
  views: number
}

export default function NFTMarketplace() {
  const [nfts, setNfts] = useState<NFTItem[]>([
    {
      id: '1',
      name: 'Sacred Forest Sanctuary',
      description: 'A mystical forest where endangered species find refuge',
      price: 250,
      currency: 'GAiA',
      image: '🌲',
      creator: 'GAiA Admin',
      category: 'landscape',
      rarity: 'legendary',
      likes: 156,
      views: 1247
    },
    {
      id: '2',
      name: 'Guardian Spirit Tiger',
      description: 'A protective spirit watching over the wildlife',
      price: 500,
      currency: 'GAiA',
      image: '🐅',
      creator: 'GAiA Admin',
      category: 'animal',
      rarity: 'epic',
      likes: 203,
      views: 892
    },
    {
      id: '3',
      name: 'Ocean Cleanup Crystal',
      description: 'Magical crystal that purifies ocean waters',
      price: 150,
      currency: 'GAiA',
      image: '💎',
      creator: 'GAiA Admin',
      category: 'utility',
      rarity: 'rare',
      likes: 89,
      views: 456
    },
    {
      id: '4',
      name: 'Aurora Mountain Peak',
      description: 'Majestic mountain crowned with northern lights',
      price: 350,
      currency: 'GAiA',
      image: '🏔️',
      creator: 'GAiA Admin',
      category: 'landscape',
      rarity: 'epic',
      likes: 178,
      views: 934
    }
  ])

  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-600'
      case 'rare': return 'bg-blue-600'
      case 'epic': return 'bg-purple-600'
      case 'legendary': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const handlePurchase = (nft: NFTItem) => {
    toast.success(`🎨 Purchased ${nft.name} for ${nft.price} ${nft.currency}!`, {
      description: 'NFT added to your collection',
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🎨 GAiA NFT MARKETPLACE
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Exclusive Environmental NFTs • Admin Curated • Landscape & Wildlife Collection
            </p>
          </CardHeader>
        </Card>

        {/* Filters */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  All NFTs
                </Button>
                <Button 
                  variant={filter === 'landscape' ? 'default' : 'outline'}
                  onClick={() => setFilter('landscape')}
                >
                  🌲 Landscapes
                </Button>
                <Button 
                  variant={filter === 'animal' ? 'default' : 'outline'}
                  onClick={() => setFilter('animal')}
                >
                  🦁 Animals
                </Button>
                <Button 
                  variant={filter === 'utility' ? 'default' : 'outline'}
                  onClick={() => setFilter('utility')}
                >
                  ⚡ Utility
                </Button>
              </div>
              
              <div className="flex gap-2 items-center">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/30 border border-gray-500/30 rounded px-3 py-1 text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts
            .filter(nft => filter === 'all' || nft.category === filter)
            .map((nft) => (
            <Card key={nft.id} className="border-gray-500/30 bg-gradient-to-br from-gray-900/50 to-blue-900/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                {/* NFT Image */}
                <div className="relative aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                  <div className="text-8xl">{nft.image}</div>
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)} text-white`}>
                    {nft.rarity.toUpperCase()}
                  </Badge>
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <Badge className="bg-black/50 text-white text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {nft.views}
                    </Badge>
                    <Badge className="bg-black/50 text-white text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      {nft.likes}
                    </Badge>
                  </div>
                </div>

                {/* NFT Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground">{nft.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Palette className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-purple-400">{nft.creator}</span>
                    </div>
                    <Badge className="bg-green-600">
                      {nft.price} {nft.currency}
                    </Badge>
                  </div>

                  <Button 
                    onClick={() => handlePurchase(nft)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase NFT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Marketplace Stats */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">📊 Marketplace Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <Image className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-purple-400">{nfts.length}</div>
                <div className="text-sm text-muted-foreground">Total NFTs</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {nfts.reduce((sum, nft) => sum + nft.price, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Value (GAiA)</div>
              </div>
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <Award className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {nfts.filter(nft => nft.rarity === 'legendary').length}
                </div>
                <div className="text-sm text-muted-foreground">Legendary Items</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
                <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Information */}
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="text-center">
              <h4 className="font-bold text-yellow-400 mb-2">💰 Marketplace Fees</h4>
              <p className="text-sm text-muted-foreground">
                All marketplace transactions include a 2.5% fee for environmental projects and community development
              </p>
              <div className="text-xs text-yellow-400 mt-2">
                Fee Wallet: ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
