
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, TrendingUp, Zap, Heart, Shield } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function Marketplace() {
  const featuredItems = [
    {
      id: 1,
      name: "Quantum GAiA Dragon NFT",
      price: 5000,
      currency: "GAIA",
      image: "🐉",
      rating: 4.9,
      category: "Digital Pets",
      rarity: "Legendary"
    },
    {
      id: 2,
      name: "Eco-Warrior Avatar",
      price: 2500,
      currency: "GAIA",
      image: "🌿",
      rating: 4.7,
      category: "Avatars",
      rarity: "Epic"
    },
    {
      id: 3,
      name: "Solar Panel NFT Farm",
      price: 10000,
      currency: "GAIA",
      image: "☀️",
      rating: 4.8,
      category: "Utility",
      rarity: "Legendary"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-green-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
              🛒 GAiA Marketplace
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Trade NFTs, digital assets, and exclusive GAiA ecosystem items
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all">
              <CardHeader>
                <div className="text-6xl text-center mb-4">{item.image}</div>
                <CardTitle className="text-center text-purple-400">{item.name}</CardTitle>
                <div className="flex justify-center gap-2">
                  <Badge className="bg-purple-600">{item.category}</Badge>
                  <Badge className="bg-orange-600">{item.rarity}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-400">
                    {item.price.toLocaleString()} {item.currency}
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-muted-foreground">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="border-purple-500/30">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">🦋 Butterfly Collection</span>
                  <Badge className="bg-green-600">+25%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">🌊 Ocean Cleanup NFTs</span>
                  <Badge className="bg-green-600">+18%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">🌳 Tree Planting Deeds</span>
                  <Badge className="bg-green-600">+12%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Create NFT
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  List Item
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Browse Collections
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-300 space-y-2">
                <div>✅ Verified creators only</div>
                <div>🔒 Secure smart contracts</div>
                <div>🛡️ Fraud protection</div>
                <div>💎 Authenticity guaranteed</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
