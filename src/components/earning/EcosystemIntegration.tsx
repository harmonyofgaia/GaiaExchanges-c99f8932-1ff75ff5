
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Store, 
  Smartphone, 
  CreditCard, 
  Gift, 
  MapPin,
  Wifi,
  QrCode,
  Zap,
  ShoppingBag,
  Leaf
} from 'lucide-react'
import { toast } from 'sonner'

interface Partner {
  id: string
  name: string
  category: string
  discount: number
  logo: string
  description: string
  locations: number
  verified: boolean
}

interface EcoProduct {
  id: string
  name: string
  price: number
  discountPrice: number
  category: string
  ecoRating: number
  partnerId: string
  inStock: boolean
}

interface EquipmentShare {
  id: string
  item: string
  owner: string
  location: string
  pricePerDay: number
  available: boolean
  ecoRating: number
}

export function EcosystemIntegration() {
  const [userTokens] = useState(1245)
  const [totalSaved] = useState(340)
  const [recentPurchases] = useState(12)

  const partners: Partner[] = [
    {
      id: '1',
      name: 'EcoMart',
      category: 'Sustainable Groceries',
      discount: 25,
      logo: '🛒',
      description: 'Organic food and zero-waste products',
      locations: 45,
      verified: true
    },
    {
      id: '2',
      name: 'GreenRide Bikes',
      category: 'Electric Bicycles',
      discount: 35,
      logo: '🚴',
      description: 'Premium e-bikes for eco-friendly transport',
      locations: 12,
      verified: true
    },
    {
      id: '3',
      name: 'Solar Solutions',
      category: 'Renewable Energy',
      discount: 40,
      logo: '☀️',
      description: 'Home solar panel installation and maintenance',
      locations: 8,
      verified: true
    },
    {
      id: '4',
      name: 'EcoClothing Co.',
      category: 'Sustainable Fashion',
      discount: 20,
      logo: '👕',
      description: 'Organic cotton and recycled materials',
      locations: 23,
      verified: true
    }
  ]

  const ecoProducts: EcoProduct[] = [
    {
      id: '1',
      name: 'Bamboo Water Bottle',
      price: 29.99,
      discountPrice: 22.49,
      category: 'Lifestyle',
      ecoRating: 95,
      partnerId: '1',
      inStock: true
    },
    {
      id: '2',
      name: 'Solar Phone Charger',
      price: 79.99,
      discountPrice: 51.99,
      category: 'Electronics',
      ecoRating: 88,
      partnerId: '3',
      inStock: true
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 35.00,
      discountPrice: 28.00,
      category: 'Clothing',
      ecoRating: 92,
      partnerId: '4',
      inStock: true
    }
  ]

  const equipmentSharing: EquipmentShare[] = [
    {
      id: '1',
      item: 'Electric Drill',
      owner: 'EcoBuilder_Jake',
      location: 'Downtown, 2.3km away',
      pricePerDay: 15,
      available: true,
      ecoRating: 85
    },
    {
      id: '2',
      item: 'Garden Tiller',
      owner: 'GreenThumb_Sarah',
      location: 'Suburbs, 4.1km away',
      pricePerDay: 25,
      available: true,
      ecoRating: 90
    },
    {
      id: '3',
      item: 'Pressure Washer',
      owner: 'CleanEnergy_Mike',
      location: 'City Center, 1.8km away',
      pricePerDay: 20,
      available: false,
      ecoRating: 78
    }
  ]

  const handlePurchase = (productId: string) => {
    const product = ecoProducts.find(p => p.id === productId)
    if (product) {
      const tokensSaved = Math.round((product.price - product.discountPrice) * 10) // Convert dollars to token equivalent
      toast.success('🎉 Purchase Successful!', {
        description: `You saved $${(product.price - product.discountPrice).toFixed(2)} and earned ${tokensSaved} bonus GAiA tokens!`,
        duration: 4000
      })
    }
  }

  const handleRentEquipment = (equipmentId: string) => {
    const equipment = equipmentSharing.find(e => e.id === equipmentId)
    if (equipment) {
      toast.success('🔧 Equipment Reserved!', {
        description: `${equipment.item} reserved for tomorrow. You'll earn eco-points for sharing economy participation!`,
        duration: 4000
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Store className="h-6 w-6" />
            🌐 Ecosystem Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="sharing">Equipment Share</TabsTrigger>
              <TabsTrigger value="mobile">Mobile App</TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">${totalSaved}</div>
                  <div className="text-xs text-muted-foreground">Total Saved</div>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">{recentPurchases}</div>
                  <div className="text-xs text-muted-foreground">Recent Purchases</div>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20 text-center">
                  <div className="text-2xl font-bold text-purple-400">{userTokens}</div>
                  <div className="text-xs text-muted-foreground">Available GAiA</div>
                </div>
              </div>

              {/* Featured Products */}
              <h3 className="text-lg font-semibold text-green-400 mb-4">🌿 Eco-Friendly Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ecoProducts.map((product) => (
                  <Card key={product.id} className="border-green-500/20">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{product.name}</h4>
                          <Badge className="bg-green-600 text-white text-xs">
                            {product.ecoRating}% Eco
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-400">
                              ${product.discountPrice}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              ${product.price}
                            </span>
                          </div>
                          <div className="text-xs text-green-300">
                            Save ${(product.price - product.discountPrice).toFixed(2)} with GAiA tokens
                          </div>
                        </div>

                        <Button 
                          onClick={() => handlePurchase(product.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Buy with Discount
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="partners" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">🤝 Partner Businesses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map((partner) => (
                  <Card key={partner.id} className="border-blue-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{partner.logo}</div>
                          <div>
                            <h4 className="font-semibold">{partner.name}</h4>
                            <p className="text-sm text-muted-foreground">{partner.category}</p>
                          </div>
                        </div>
                        {partner.verified && (
                          <Badge className="bg-blue-600 text-white">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm mb-3">{partner.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {partner.locations} locations
                        </div>
                        <Badge className="bg-green-600 text-white">
                          {partner.discount}% OFF
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sharing" className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400 mb-4">🔧 Community Equipment Sharing</h3>
              <div className="space-y-3">
                {equipmentSharing.map((equipment) => (
                  <Card key={equipment.id} className="border-orange-500/20">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{equipment.item}</h4>
                            <Badge className="bg-orange-600 text-white text-xs">
                              {equipment.ecoRating}% Eco
                            </Badge>
                            {!equipment.available && (
                              <Badge variant="outline" className="text-red-400 border-red-400">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Owned by {equipment.owner}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {equipment.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-400">
                            ${equipment.pricePerDay}/day
                          </div>
                          <Button 
                            onClick={() => handleRentEquipment(equipment.id)}
                            disabled={!equipment.available}
                            size="sm"
                            className="mt-2 bg-orange-600 hover:bg-orange-700"
                          >
                            {equipment.available ? 'Rent Now' : 'Not Available'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4">
              <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                <Smartphone className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-purple-400 mb-4">GAiA Mobile App</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Take your GAiA ecosystem experience everywhere with our mobile app. 
                  Scan QR codes, make payments, and track your environmental impact on the go.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                    <QrCode className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                    <div className="text-xs">QR Payments</div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <Wifi className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-xs">NFC Support</div>
                  </div>
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/20">
                    <Leaf className="h-6 w-6 mx-auto mb-2 text-green-400" />
                    <div className="text-xs">Impact Tracking</div>
                  </div>
                  <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                    <div className="text-xs">Instant Rewards</div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    📱 Download for iOS
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    🤖 Download for Android
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
