
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Search,
  Filter,
  Truck,
  Shield,
  Leaf,
  Gift,
  Users,
  Globe,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

const Webshop = () => {
  const [cart, setCart] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    {
      id: 1,
      name: 'Harmony of Gaia T-Shirt',
      price: 29.99,
      gaiaPrice: 150,
      image: '/placeholder.svg',
      category: 'Clothing',
      description: 'Premium organic cotton with our iconic logo',
      inStock: true,
      animalImpact: '5 animals helped with each purchase',
      sustainability: 'Carbon Neutral Shipping'
    },
    {
      id: 2,
      name: 'Eco-Friendly Trading Mug',
      price: 19.99,
      gaiaPrice: 100,
      image: '/placeholder.svg',
      category: 'Accessories',
      description: 'Bamboo mug for sustainable crypto traders',
      inStock: true,
      animalImpact: '3 trees planted per mug',
      sustainability: '100% Biodegradable'
    },
    {
      id: 3,
      name: 'GAIA Crypto Wallet (Hardware)',
      price: 99.99,
      gaiaPrice: 500,
      image: '/placeholder.svg',
      category: 'Tech',
      description: 'Ultra-secure hardware wallet with GAIA support',
      inStock: true,
      animalImpact: '10 animals protected per wallet',
      sustainability: 'Recycled Materials'
    },
    {
      id: 4,
      name: 'Save Animals Hoodie',
      price: 49.99,
      gaiaPrice: 250,
      image: '/placeholder.svg',
      category: 'Clothing',
      description: 'Warm hoodie supporting global animal sanctuaries',
      inStock: true,
      animalImpact: '20 animals helped directly',
      sustainability: 'Fair Trade Certified'
    },
    {
      id: 5,
      name: 'Green Planet Stickers Pack',
      price: 9.99,
      gaiaPrice: 50,
      image: '/placeholder.svg',
      category: 'Accessories',
      description: 'Waterproof stickers spreading positive vibes',
      inStock: true,
      animalImpact: '2 animals helped per pack',
      sustainability: 'Eco-Friendly Ink'
    },
    {
      id: 6,
      name: 'Harmony Seeds Collection',
      price: 24.99,
      gaiaPrice: 125,
      image: '/placeholder.svg',
      category: 'Nature',
      description: 'Organic seeds to grow your own harmony garden',
      inStock: true,
      animalImpact: '1 habitat restored per collection',
      sustainability: '100% Organic & Heirloom'
    }
  ]

  const addToCart = (product: any) => {
    setCart(prev => [...prev, product])
    toast.success('Added to Cart!', {
      description: `${product.name} - ${product.animalImpact}`,
      duration: 4000
    })
  }

  const buyWithGaia = (product: any) => {
    toast.success('🚀 GAIA Payment Successful!', {
      description: `Purchased ${product.name} with ${product.gaiaPrice} GAIA tokens!`,
      duration: 5000
    })
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Webshop Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🛍️ HARMONY OF GAIA WEBSHOP
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            🌍 Premium Merchandise That Saves Animals & Protects Our Planet
          </p>
          <p className="text-sm text-green-400 mt-2">
            🐾 Every Purchase = Real Impact | Pay with USD or GAIA Tokens
          </p>
        </div>

        {/* Shop Stats & Cart */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="pt-4 text-center">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">125,000+</div>
              <div className="text-xs text-muted-foreground">Happy Customers</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">50,000+</div>
              <div className="text-xs text-muted-foreground">Animals Helped</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="pt-4 text-center">
              <Globe className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">190+</div>
              <div className="text-xs text-muted-foreground">Countries Shipped</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="pt-4 text-center">
              <ShoppingCart className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{cart.length}</div>
              <div className="text-xs text-muted-foreground">Items in Cart</div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="border-cyan-500/20 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search for eco-friendly products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-border/50 hover:border-green-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="aspect-square bg-muted/20 rounded-lg mb-3 flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge className="w-fit bg-blue-600 text-white">{product.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-green-400">{product.animalImpact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span className="text-blue-400">{product.sustainability}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-xl font-bold">${product.price}</div>
                    <div className="text-sm text-yellow-400">{product.gaiaPrice} GAIA</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart (${product.price})
                  </Button>
                  <Button 
                    onClick={() => buyWithGaia(product)}
                    variant="outline"
                    className="w-full border-yellow-500/50 hover:bg-yellow-500/10"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Buy with GAIA ({product.gaiaPrice})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipping & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400 text-lg">
                <Truck className="h-5 w-5" />
                Global Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Free shipping on orders over $50</li>
                <li>• Carbon-neutral delivery worldwide</li>
                <li>• Express shipping available</li>
                <li>• Track your package in real-time</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
                <Shield className="h-5 w-5" />
                Quality Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 30-day money-back guarantee</li>
                <li>• Premium quality materials only</li>
                <li>• Ethical manufacturing standards</li>
                <li>• Customer satisfaction guaranteed</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400 text-lg">
                <Gift className="h-5 w-5" />
                Impact Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 100% of profits help animals</li>
                <li>• Full transparency on donations</li>
                <li>• Regular impact reports</li>
                <li>• Building a cage-free world</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 BREAKING THE CAGE WORLD TOGETHER</h3>
            <p className="text-muted-foreground mb-4">
              Every purchase from our webshop directly funds animal sanctuaries and wildlife conservation projects. 
              We're not just selling merchandise - we're building a movement to end animal suffering.
            </p>
            <p className="text-sm text-green-400 font-bold">
              🎵 "Seeds Will Form Into Music" - Your purchase creates harmony for all living beings! 🎵
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Webshop
