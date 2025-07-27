
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, Star, Eye, Heart, Zap, Leaf, Crown } from 'lucide-react'

export const NFTMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const nftCollections = [
    {
      id: 'biodiversity-cards',
      name: 'Biodiversity Cards',
      description: 'Collect and trade cards representing endangered species',
      items: 2847,
      floorPrice: 0.05,
      volume: 15.7,
      image: '/placeholder-biodiversity.jpg'
    },
    {
      id: 'carbon-credits',
      name: 'Carbon Credit NFTs',
      description: 'Verified carbon offset certificates as NFTs',
      items: 1234,
      floorPrice: 0.1,
      volume: 23.4,
      image: '/placeholder-carbon.jpg'
    },
    {
      id: 'eco-art',
      name: 'Eco Art Collection',
      description: 'Environmental art supporting conservation',
      items: 567,
      floorPrice: 0.2,
      volume: 8.9,
      image: '/placeholder-art.jpg'
    }
  ]

  const featuredNFTs = [
    {
      id: 'snow-leopard',
      name: 'Snow Leopard Guardian',
      collection: 'Biodiversity Cards',
      price: 0.75,
      rarity: 'legendary',
      likes: 234,
      views: 1567,
      image: '/placeholder-snow-leopard.jpg'
    },
    {
      id: 'coral-reef',
      name: 'Great Barrier Reef',
      collection: 'Eco Art Collection',
      price: 0.45,
      rarity: 'rare',
      likes: 156,
      views: 892,
      image: '/placeholder-coral.jpg'
    },
    {
      id: 'forest-carbon',
      name: 'Amazon Forest Carbon Credit',
      collection: 'Carbon Credit NFTs',
      price: 0.12,
      rarity: 'common',
      likes: 89,
      views: 432,
      image: '/placeholder-forest.jpg'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-600'
      case 'epic': return 'bg-purple-600'
      case 'rare': return 'bg-blue-600'
      case 'uncommon': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Marketplace Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎨 NFT Marketplace
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover, collect, and trade environmental NFTs supporting conservation
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="biodiversity">Biodiversity</SelectItem>
                <SelectItem value="carbon">Carbon Credits</SelectItem>
                <SelectItem value="art">Eco Art</SelectItem>
                <SelectItem value="utility">Utility NFTs</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Content */}
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="space-y-6">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Star className="h-5 w-5" />
                Featured NFTs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredNFTs.map((nft) => (
                  <Card key={nft.id} className="bg-purple-900/10 border-purple-500/20 hover:border-purple-400/40 transition-colors">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getRarityColor(nft.rarity)} text-white`}>
                            {nft.rarity}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {nft.likes}
                            <Eye className="h-3 w-3" />
                            {nft.views}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-purple-400">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground">{nft.collection}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-blue-400" />
                            <span className="font-semibold text-blue-400">{nft.price} GAiA</span>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Buy Now
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
        
        <TabsContent value="collections" className="space-y-6">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Crown className="h-5 w-5" />
                NFT Collections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nftCollections.map((collection) => (
                  <Card key={collection.id} className="bg-purple-900/10 border-purple-500/20">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-6xl">🌍</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-purple-400">{collection.name}</h3>
                          <p className="text-sm text-muted-foreground">{collection.description}</p>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div>
                            <div className="text-muted-foreground">Items</div>
                            <div className="font-semibold">{collection.items.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Floor Price</div>
                            <div className="font-semibold">{collection.floorPrice} GAiA</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Volume</div>
                            <div className="font-semibold">{collection.volume}K GAiA</div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          View Collection
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create NFT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                NFT creation interface will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-nfts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Your NFT collection will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
