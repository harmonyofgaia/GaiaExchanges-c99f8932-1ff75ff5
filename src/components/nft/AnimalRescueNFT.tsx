
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Shield, 
  Zap, 
  Award,
  MapPin,
  Clock,
  Star,
  Users,
  Target,
  TreePine
} from 'lucide-react'
import { toast } from 'sonner'

interface AnimalNFT {
  id: string
  name: string
  species: string
  emoji: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  healthLevel: number
  rescueProgress: number
  location: string
  story: string
  abilities: string[]
  rescueCost: number
  isRescued: boolean
  carbonOffset: number
}

export function AnimalRescueNFT() {
  const [animals, setAnimals] = useState<AnimalNFT[]>([
    {
      id: '1',
      name: 'Aurora',
      species: 'Arctic Fox',
      emoji: '🦊',
      rarity: 'epic',
      healthLevel: 75,
      rescueProgress: 45,
      location: 'Arctic Tundra',
      story: 'Aurora was found injured after ice habitat loss. She needs urgent medical care and a safe habitat.',
      abilities: ['Ice Walk', 'Climate Adaptation', 'Pack Leader'],
      rescueCost: 850,
      isRescued: false,
      carbonOffset: 2.5
    },
    {
      id: '2',
      name: 'Thunder',
      species: 'African Elephant',
      emoji: '🐘',
      rarity: 'legendary',
      healthLevel: 60,
      rescueProgress: 78,
      location: 'Kenyan Savanna',
      story: 'Thunder is an orphaned elephant calf who lost his family to poaching. He needs specialized care.',
      abilities: ['Memory Master', 'Earth Stomp', 'Herd Protector'],
      rescueCost: 1500,
      isRescued: false,
      carbonOffset: 5.0
    },
    {
      id: '3',
      name: 'Marina',
      species: 'Sea Turtle',
      emoji: '🐢',
      rarity: 'rare',
      healthLevel: 90,
      rescueProgress: 100,
      location: 'Pacific Ocean',
      story: 'Marina was successfully rescued from plastic pollution and is now thriving in clean waters.',
      abilities: ['Deep Dive', 'Ocean Current', 'Plastic Cleaner'],
      rescueCost: 650,
      isRescued: true,
      carbonOffset: 1.8
    },
    {
      id: '4',
      name: 'Blaze',
      species: 'Orangutan',
      emoji: '🦧',
      rarity: 'epic',
      healthLevel: 70,
      rescueProgress: 32,
      location: 'Borneo Rainforest',
      story: 'Blaze lost his habitat to deforestation. He needs a new home and medical rehabilitation.',
      abilities: ['Tree Swing', 'Forest Wisdom', 'Vine Master'],
      rescueCost: 1200,
      isRescued: false,
      carbonOffset: 4.2
    }
  ])

  const [userTokens, setUserTokens] = useState(2450)
  const [rescuedCount, setRescuedCount] = useState(3)
  const [totalImpact, setTotalImpact] = useState(8.5)

  useEffect(() => {
    // Simulate rescue progress
    const interval = setInterval(() => {
      setAnimals(prev => 
        prev.map(animal => {
          if (!animal.isRescued && animal.rescueProgress < 100) {
            const newProgress = Math.min(100, animal.rescueProgress + Math.random() * 3)
            if (newProgress === 100 && animal.rescueProgress < 100) {
              toast.success(`🎉 ${animal.name} the ${animal.species} has been rescued!`, {
                description: `Community raised enough funds! You earned rescue rewards.`,
                duration: 6000
              })
              setRescuedCount(prev => prev + 1)
              setTotalImpact(prev => prev + animal.carbonOffset)
            }
            return { ...animal, rescueProgress: newProgress }
          }
          return animal
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const contributeToRescue = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId)
    if (!animal || userTokens < 100) return

    setUserTokens(prev => prev - 100)
    setAnimals(prev => 
      prev.map(a => 
        a.id === animalId 
          ? { ...a, rescueProgress: Math.min(100, a.rescueProgress + 10) }
          : a
      )
    )

    toast.success(`💝 You contributed 100 GAiA tokens to ${animal.name}'s rescue!`, {
      description: `Every token helps save endangered animals and protect habitats.`,
      duration: 4000
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-purple-600 to-pink-600'
      case 'epic': return 'bg-gradient-to-r from-blue-600 to-purple-600'
      case 'rare': return 'bg-gradient-to-r from-green-600 to-blue-600'
      case 'common': return 'bg-gradient-to-r from-gray-600 to-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-500/50'
      case 'epic': return 'border-blue-500/50'
      case 'rare': return 'border-green-500/50'
      case 'common': return 'border-gray-500/50'
      default: return 'border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-green-400">
            🦋 ANIMAL RESCUE NFT COLLECTION
          </CardTitle>
          <p className="text-center text-lg text-green-300">
            Rescue endangered animals • Mint exclusive NFTs • Create real environmental impact
          </p>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">Animals Rescued</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{rescuedCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-blue-400">GAiA Tokens</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{userTokens}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TreePine className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-purple-400">CO2 Offset</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{totalImpact.toFixed(1)}t</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-orange-400" />
              <span className="font-bold text-orange-400">NFTs Owned</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{animals.filter(a => a.isRescued).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Animal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id} className={`${getRarityBorder(animal.rarity)} ${animal.isRescued ? 'bg-green-900/20' : 'bg-gray-900/20'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-6xl">{animal.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold">{animal.name}</h3>
                    <p className="text-muted-foreground">{animal.species}</p>
                    <Badge className={getRarityColor(animal.rarity)}>
                      {animal.rarity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                {animal.isRescued && (
                  <Badge className="bg-green-600">
                    <Heart className="h-3 w-3 mr-1" />
                    RESCUED
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{animal.story}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Health Level</span>
                      <span className="text-green-400">{animal.healthLevel}%</span>
                    </div>
                    <Progress value={animal.healthLevel} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rescue Progress</span>
                      <span className="text-blue-400">{animal.rescueProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={animal.rescueProgress} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-blue-400" />
                    <span>{animal.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TreePine className="h-3 w-3 text-green-400" />
                    <span>{animal.carbonOffset}t CO2</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Special Abilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {animal.abilities.map((ability, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {!animal.isRescued && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rescue Cost:</span>
                      <span className="font-bold text-yellow-400">{animal.rescueCost} GAiA</span>
                    </div>
                    
                    <Button 
                      onClick={() => contributeToRescue(animal.id)}
                      disabled={userTokens < 100}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Contribute 100 GAiA to Rescue
                    </Button>
                  </div>
                )}

                {animal.isRescued && (
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="font-semibold text-green-400">Rescue Complete!</span>
                    </div>
                    <p className="text-xs text-green-300">
                      This NFT represents your contribution to saving {animal.name} and protecting their habitat.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
