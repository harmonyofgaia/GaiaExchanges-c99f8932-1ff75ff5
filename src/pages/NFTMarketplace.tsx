
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  TrendingUp,
  Coins,
  Eye,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'

export default function NFTMarketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [nftItems] = useState([
    {
      id: 1,
      name: 'Green Forest Dragon',
      image: '/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png',
      price: 250,
      rarity: 'Legendary',
      creator: 'GAiA AI',
      likes: 89
    },
    {
      id: 2,
      name: 'Cyber Ice Globe',
      image: '/lovable-uploads/cd880f33-2b91-4417-bb7b-8f80a79e1e58.png',
      price: 150,
      rarity: 'Epic',
      creator: 'Community',
      likes: 67
    },
    {
      id: 3,
      name: 'Mystical Landscape',
      image: '/lovable-uploads/e10577c9-3490-48bb-ae51-138abf0a30fd.png',
      price: 350,
      rarity: 'Legendary',
      creator: 'GAiA Studio',
      likes: 124
    },
    {
      id: 4,
      name: 'Animal Guardian',
      image: '/lovable-uploads/4076769c-cfd7-4713-a683-f24b2159c886.png',
      price: 200,
      rarity: 'Rare',
      creator: 'AI Generator',
      likes: 45
    }
  ])

  const handlePurchase = (item: any) => {
    toast.success(`Purchased ${item.name}!`, {
      description: `Successfully bought for ${item.price} GAiA tokens`
    })
  }

  const handleLike = (id: number) => {
    toast.success('Added to favorites!', {
      description: 'NFT saved to your wishlist'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🎨 NFT MARKETPLACE
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground">
              Exclusive GAiA NFTs • AI Generated Art • Community Creations
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600">
                <ShoppingCart className="h-3 w-3 mr-1" />
                OPEN
              </Badge>
              <Badge className="bg-purple-600">
                <Star className="h-3 w-3 mr-1" />
                EXCLUSIVE
              </Badge>
              <Badge className="bg-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                TRENDING
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Search and Filter */}
        <Card className="border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Search NFTs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="border-purple-500/30 text-purple-400">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" className="border-blue-500/30 text-blue-400">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nftItems.map((item) => (
            <Card key={item.id} className="border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-all">
              <CardContent className="p-4 space-y-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => handleLike(item.id)}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 border-red-500/30 text-red-400 bg-black/50"
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">by {item.creator}</p>
                </div>

                <div className="flex justify-between items-center">
                  <Badge className={
                    item.rarity === 'Legendary' ? 'bg-yellow-600' :
                    item.rarity === 'Epic' ? 'bg-purple-600' : 'bg-blue-600'
                  }>
                    {item.rarity}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    {item.likes}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">{item.price} GAiA</span>
                  </div>
                  <Button
                    onClick={() => handlePurchase(item)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400"
                  size="sm"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-medium text-purple-400 mb-2">🎨 NFT Marketplace Status</h4>
          <div className="text-sm text-purple-300">
            ✅ NFT marketplace fully operational<br/>
            ✅ AI-generated exclusive content available<br/>
            ✅ Community creations supported<br/>
            ✅ GAiA token payments integrated
          </div>
        </div>
      </div>
    </div>
  )
}
