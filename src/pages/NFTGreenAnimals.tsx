
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Leaf, Heart, Shield, Star, Zap } from 'lucide-react'

export default function NFTGreenAnimals() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const greenAnimals = [
    {
      id: '1',
      name: 'Emerald Dragon',
      type: 'Legendary',
      rarity: 99,
      price: 500,
      power: 'Forest Protection',
      description: 'Guardian of ancient forests with healing powers',
      image: '🐉',
      benefits: ['Healing Aura', 'Nature Bond', 'Energy Boost']
    },
    {
      id: '2',
      name: 'Jade Turtle',
      type: 'Epic',
      rarity: 85,
      price: 350,
      power: 'Longevity Wisdom',
      description: 'Ancient wisdom keeper with life extension abilities',
      image: '🐢',
      benefits: ['Wisdom +50', 'Life Extension', 'Peace Aura']
    },
    {
      id: '3',
      name: 'Forest Fox',
      type: 'Rare',
      rarity: 70,
      price: 200,
      power: 'Stealth & Agility',
      description: 'Swift forest guardian with incredible stealth',
      image: '🦊',
      benefits: ['Stealth Mode', 'Speed Boost', 'Nature Camouflage']
    },
    {
      id: '4',
      name: 'Green Phoenix',
      type: 'Mythical',
      rarity: 95,
      price: 750,
      power: 'Rebirth & Renewal',
      description: 'Immortal bird of renewal and environmental healing',
      image: '🦅',
      benefits: ['Instant Healing', 'Rebirth Power', 'Environmental Repair']
    }
  ]

  const getRarityColor = (rarity: number) => {
    if (rarity >= 95) return 'bg-purple-600'
    if (rarity >= 85) return 'bg-blue-600'
    if (rarity >= 70) return 'bg-green-600'
    return 'bg-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              🌿 NFT GREEN ANIMALS COLLECTION
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-green-300">Rare Digital Creatures for Environmental Healing</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge className="bg-green-600 animate-pulse">LEGENDARY COLLECTION</Badge>
                <Badge className="bg-blue-600 animate-pulse">HEALING POWERS</Badge>
                <Badge className="bg-purple-600 animate-pulse">ENVIRONMENTAL IMPACT</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {greenAnimals.map((animal) => (
            <Card 
              key={animal.id} 
              className={`border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 hover:scale-105 transition-all cursor-pointer ${
                selectedAnimal === animal.id ? 'ring-2 ring-green-400' : ''
              }`}
              onClick={() => setSelectedAnimal(animal.id)}
            >
              <CardHeader>
                <div className="text-center">
                  <div className="text-6xl mb-4">{animal.image}</div>
                  <CardTitle className="text-green-400">{animal.name}</CardTitle>
                  <Badge className={`${getRarityColor(animal.rarity)} text-white mt-2`}>
                    {animal.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rarity</span>
                    <span className="text-green-400 font-bold">{animal.rarity}%</span>
                  </div>
                  <Progress value={animal.rarity} className="h-2" />
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-yellow-400 mb-1">Special Power:</div>
                  <div>{animal.power}</div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {animal.description}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-green-400">Benefits:</div>
                  <div className="flex flex-wrap gap-1">
                    {animal.benefits.map((benefit, index) => (
                      <Badge key={index} className="bg-green-700/50 text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Buy for {animal.price} GAIA
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collection Stats */}
        <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
          <CardHeader>
            <CardTitle className="text-emerald-400 text-center">🌍 COLLECTION IMPACT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-900/30 rounded-lg">
                <Leaf className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">10,000</div>
                <div className="text-sm text-muted-foreground">Trees Planted</div>
              </div>
              
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <Heart className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">50,000</div>
                <div className="text-sm text-muted-foreground">Animals Saved</div>
              </div>
              
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <Shield className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-purple-400">200</div>
                <div className="text-sm text-muted-foreground">Habitats Protected</div>
              </div>
              
              <div className="p-4 bg-yellow-900/30 rounded-lg">
                <Star className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-400">1M+</div>
                <div className="text-sm text-muted-foreground">GAIA Tokens Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Mission */}
        <Card className="border-teal-500/30 bg-gradient-to-r from-teal-900/30 to-green-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">
              HEALING THE WORLD THROUGH NFT POWER
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-teal-200">
              <div className="space-y-2">
                <Zap className="h-6 w-6 mx-auto text-teal-400" />
                <div><strong>Token Power:</strong> Each NFT generates healing energy</div>
              </div>
              <div className="space-y-2">
                <Leaf className="h-6 w-6 mx-auto text-green-400" />
                <div><strong>Real Impact:</strong> Funds go directly to environmental projects</div>
              </div>
              <div className="space-y-2">
                <Heart className="h-6 w-6 mx-auto text-red-400" />
                <div><strong>Community Healing:</strong> Building a better world together</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
