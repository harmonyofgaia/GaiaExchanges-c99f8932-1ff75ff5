
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Palette, Trophy, Star, Shield } from 'lucide-react'

export default function NFTMarketplace() {
  const nftCollections = [
    {
      id: 1,
      name: "Gaia Green Animals",
      description: "Eco-friendly digital creatures protecting our planet",
      items: 127,
      floorPrice: "0.5 GAIA",
      category: "Animals",
      icon: "🦌"
    },
    {
      id: 2,
      name: "Defense Wall Guardians",
      description: "Legendary creatures defending the Gaia ecosystem",
      items: 89,
      floorPrice: "1.2 GAIA",
      category: "Guardians",
      icon: "🛡️"
    },
    {
      id: 3,
      name: "Harmony Avatars",
      description: "Cultural avatars representing unity and diversity",
      items: 256,
      floorPrice: "0.8 GAIA",
      category: "Avatars",
      icon: "👤"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Palette className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Gaia NFT Marketplace
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover, collect, and trade unique digital assets in the Gaia ecosystem
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">472</div>
              <div className="text-sm text-gray-400">Total NFTs</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-sm text-gray-400">Creators</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12.5K</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-black/40">
            <CardContent className="p-6 text-center">
              <Palette className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Collections</div>
            </CardContent>
          </Card>
        </div>

        {/* Collections */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-green-400">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftCollections.map((collection) => (
              <Card key={collection.id} className="border-green-500/20 bg-black/40 hover:bg-black/60 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{collection.icon}</div>
                    <div>
                      <CardTitle className="text-white">{collection.name}</CardTitle>
                      <CardDescription>{collection.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-400">Items</div>
                      <div className="font-bold text-white">{collection.items}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Floor Price</div>
                      <div className="font-bold text-green-400">{collection.floorPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {collection.category}
                    </Badge>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
