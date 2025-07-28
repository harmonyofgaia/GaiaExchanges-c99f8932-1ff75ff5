
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, Paw, Shield, Globe, Users, Coins } from 'lucide-react'

export default function AnimalWelfare() {
  const rescueStats = [
    { animal: "🐕 Dogs", rescued: 1247, adopted: 1100, pending: 147 },
    { animal: "🐱 Cats", rescued: 892, adopted: 750, pending: 142 },
    { animal: "🐰 Rabbits", rescued: 234, adopted: 200, pending: 34 },
    { animal: "🐦 Birds", rescued: 456, adopted: 380, pending: 76 }
  ]

  const nftCollections = [
    { name: "Rescued Heroes", items: 1247, raised: "125 ETH", impact: "Direct rescue funding" },
    { name: "Wildlife Warriors", items: 892, raised: "89 ETH", impact: "Habitat protection" },
    { name: "Ocean Guardians", items: 567, raised: "56 ETH", impact: "Marine life rescue" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-8 border-pink-500/50 bg-gradient-to-r from-pink-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              🐾 Animal Welfare & Rescue NFTs
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Saving Lives Through Blockchain Technology & NFT Innovation
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-pink-600">💝 Rescue Funding</Badge>
              <Badge className="bg-purple-600">🏆 Adoption Success</Badge>
              <Badge className="bg-blue-600">🌍 Global Impact</Badge>
              <Badge className="bg-green-600">🎨 NFT Collections</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-pink-500/30 bg-pink-900/20">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto text-pink-400 mb-2" />
              <div className="text-2xl font-bold text-pink-400">2,829</div>
              <div className="text-sm text-muted-foreground">Animals Rescued</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Paw className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">2,430</div>
              <div className="text-sm text-muted-foreground">Successfully Adopted</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">399</div>
              <div className="text-sm text-muted-foreground">Awaiting Homes</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">270 ETH</div>
              <div className="text-sm text-muted-foreground">Raised via NFTs</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="border-pink-500/30 bg-pink-900/20">
            <CardHeader>
              <CardTitle className="text-pink-400">📊 Rescue Statistics by Species</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rescueStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">{stat.animal}</span>
                      <Badge className="bg-green-600">
                        {Math.round((stat.adopted / stat.rescued) * 100)}% Success Rate
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">{stat.rescued}</div>
                        <div className="text-muted-foreground">Rescued</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-bold">{stat.adopted}</div>
                        <div className="text-muted-foreground">Adopted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-bold">{stat.pending}</div>
                        <div className="text-muted-foreground">Pending</div>
                      </div>
                    </div>
                    <Progress value={(stat.adopted / stat.rescued) * 100} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🎨 NFT Collections for Rescue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nftCollections.map((collection, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-blue-400">{collection.name}</h3>
                      <Badge className="bg-purple-600">{collection.items} NFTs</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Funds Raised:</div>
                        <div className="text-green-400 font-bold">{collection.raised}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Impact:</div>
                        <div className="text-yellow-400 font-bold">{collection.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Browse NFT Collections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries:</span>
                  <span className="font-bold text-green-400">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rescue Centers:</span>
                  <span className="font-bold text-green-400">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volunteers:</span>
                  <span className="font-bold text-green-400">12,450</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Globe className="h-4 w-4 mr-2" />
                View Global Map
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Join our community of animal lovers making a real difference through blockchain technology.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Discord Members:</span>
                  <span className="text-blue-400">25,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Rescuers:</span>
                  <span className="text-green-400">3,450</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Emergency Fund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">$125,000</div>
                <div className="text-sm text-muted-foreground mb-4">Available for Emergencies</div>
                <Progress value={75} className="h-3 mb-2" />
                <div className="text-sm text-muted-foreground">75% of Target</div>
              </div>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                <Heart className="h-4 w-4 mr-2" />
                Contribute to Fund
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
