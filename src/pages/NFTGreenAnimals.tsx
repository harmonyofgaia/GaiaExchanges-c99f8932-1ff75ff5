
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Leaf, Heart, Star, Zap, Globe, TreePine } from 'lucide-react'
import { toast } from 'sonner'

export default function NFTGreenAnimals() {
  const [animalCount, setAnimalCount] = useState(0)
  const [totalRescued, setTotalRescued] = useState(12847)
  const [carbonOffset, setCarbonOffset] = useState(45.7)
  const [tokensEarned, setTokensEarned] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRescued(prev => prev + Math.floor(Math.random() * 3))
      setCarbonOffset(prev => prev + (Math.random() * 0.1))
      setTokensEarned(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const animalTypes = [
    { name: 'Forest Guardian Wolf', rarity: 'Legendary', impact: 'Protects 1000 trees', icon: '🐺', price: 50 },
    { name: 'Ocean Cleanup Dolphin', rarity: 'Epic', impact: 'Cleans 500kg ocean plastic', icon: '🐬', price: 35 },
    { name: 'Solar Powered Butterfly', rarity: 'Rare', impact: 'Powers 10 homes for 1 day', icon: '🦋', price: 25 },
    { name: 'Carbon Absorbing Elephant', rarity: 'Epic', impact: 'Absorbs 2 tons CO2/year', icon: '🐘', price: 45 },
    { name: 'Renewable Eagle', rarity: 'Legendary', impact: 'Generates wind energy', icon: '🦅', price: 60 },
    { name: 'Eco Panda', rarity: 'Rare', impact: 'Plants 100 bamboo trees', icon: '🐼', price: 30 }
  ]

  const mintAnimal = (animal: any) => {
    setAnimalCount(prev => prev + 1)
    setTokensEarned(prev => prev + animal.price)
    toast.success(`🌱 ${animal.name} Minted!`, {
      description: `Environmental Impact: ${animal.impact}`,
      duration: 8000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-2 border-green-500/50">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌱 NFT Green Animals - Save The Planet
            </CardTitle>
            <p className="text-xl text-green-300 mt-4">
              Mint NFT Animals • Earn GAIA Tokens • Create Real Environmental Impact
            </p>
          </CardHeader>
        </Card>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-6 text-center">
              <TreePine className="h-10 w-10 mx-auto text-green-400 mb-2" />
              <div className="text-3xl font-bold text-green-400">{totalRescued.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Animals Rescued</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-6 text-center">
              <Globe className="h-10 w-10 mx-auto text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-blue-400">{carbonOffset.toFixed(1)}T</div>
              <div className="text-sm text-muted-foreground">CO2 Offset</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="pt-6 text-center">
              <Star className="h-10 w-10 mx-auto text-purple-400 mb-2" />
              <div className="text-3xl font-bold text-purple-400">{animalCount}</div>
              <div className="text-sm text-muted-foreground">Your NFTs</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="pt-6 text-center">
              <Zap className="h-10 w-10 mx-auto text-yellow-400 mb-2" />
              <div className="text-3xl font-bold text-yellow-400">{tokensEarned}</div>
              <div className="text-sm text-muted-foreground">GAIA Tokens</div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animalTypes.map((animal, index) => (
            <Card key={index} className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="text-center">
                  <div className="text-6xl mb-4">{animal.icon}</div>
                  <CardTitle className="text-green-400">{animal.name}</CardTitle>
                  <Badge className={`${
                    animal.rarity === 'Legendary' ? 'bg-yellow-600' :
                    animal.rarity === 'Epic' ? 'bg-purple-600' : 'bg-blue-600'
                  } text-white mt-2`}>
                    {animal.rarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-green-300 text-sm">{animal.impact}</p>
                  <div className="text-2xl font-bold text-yellow-400 mt-2">{animal.price} GAIA</div>
                </div>
                
                <Progress value={Math.random() * 100} className="h-2" />
                
                <Button 
                  onClick={() => mintAnimal(animal)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Mint & Save Planet
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real World Impact */}
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-green-400 text-center text-2xl">
              🌍 REAL WORLD ENVIRONMENTAL IMPACT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl">🌳</div>
                <div className="text-xl font-bold text-green-400">2.5M Trees</div>
                <div className="text-sm text-muted-foreground">Planted through NFT purchases</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🌊</div>
                <div className="text-xl font-bold text-blue-400">850K kg</div>
                <div className="text-sm text-muted-foreground">Ocean plastic removed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">⚡</div>
                <div className="text-xl font-bold text-yellow-400">1.2M kWh</div>
                <div className="text-sm text-muted-foreground">Renewable energy funded</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
