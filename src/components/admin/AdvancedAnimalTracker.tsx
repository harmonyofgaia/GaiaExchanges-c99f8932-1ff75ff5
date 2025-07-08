
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  MapPin, 
  Heart, 
  Target, 
  Wallet, 
  Globe,
  Camera,
  Award,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

interface Animal {
  id: string
  name: string
  species: string
  emoji: string
  location: string
  walletAddress: string
  nftPrice: number
  currentGoal: string
  goalProgress: number
  health: number
  happiness: number
  virtualCompanion: boolean
  achievements: string[]
  newLocationFound: boolean
}

export function AdvancedAnimalTracker() {
  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: 'tiger_001',
      name: 'Raja the Tiger',
      species: 'Bengal Tiger',
      emoji: '🐅',
      location: 'Mumbai Zoo, India',
      walletAddress: '0x1234...tiger',
      nftPrice: 2500,
      currentGoal: 'Build Natural Habitat',
      goalProgress: 78,
      health: 95,
      happiness: 87,
      virtualCompanion: true,
      achievements: ['Habitat Builder', 'Community Favorite', 'Conservation Champion'],
      newLocationFound: false
    },
    {
      id: 'elephant_002',
      name: 'Ganesha the Elephant',
      species: 'Asian Elephant',
      emoji: '🐘',
      location: 'Bangkok Sanctuary, Thailand',
      walletAddress: '0x5678...elephant',
      nftPrice: 3200,
      currentGoal: 'Reach Wildlife Reserve',
      goalProgress: 92,
      health: 89,
      happiness: 94,
      virtualCompanion: true,
      achievements: ['Gentle Giant', 'Wisdom Keeper', 'Nearly Free'],
      newLocationFound: true
    },
    {
      id: 'panda_003',
      name: 'Bamboo the Panda',
      species: 'Giant Panda',
      emoji: '🐼',
      location: 'Beijing Zoo, China',
      walletAddress: '0x9abc...panda',
      nftPrice: 4500,
      currentGoal: 'Forest Rehabilitation',
      goalProgress: 45,
      health: 92,
      happiness: 78,
      virtualCompanion: false,
      achievements: ['Bamboo Master', 'Peaceful Soul'],
      newLocationFound: false
    },
    {
      id: 'lion_004',
      name: 'Simba the Lion',
      species: 'African Lion',
      emoji: '🦁',
      location: 'Nairobi Safari Park, Kenya',
      walletAddress: '0xdef0...lion',
      nftPrice: 3800,
      currentGoal: 'Return to Savanna',
      goalProgress: 67,
      health: 88,
      happiness: 85,
      virtualCompanion: true,
      achievements: ['King of Beasts', 'Pride Leader', 'Roar Champion'],
      newLocationFound: false
    },
    {
      id: 'penguin_005',
      name: 'Pip the Penguin',
      species: 'Emperor Penguin',
      emoji: '🐧',
      location: 'Antarctica Research Station',
      walletAddress: '0x1357...penguin',
      nftPrice: 1800,
      currentGoal: 'Ice Habitat Expansion',
      goalProgress: 23,
      health: 96,
      happiness: 91,
      virtualCompanion: true,
      achievements: ['Ice Walker', 'Colony Builder'],
      newLocationFound: false
    },
    {
      id: 'dolphin_006',
      name: 'Echo the Dolphin',
      species: 'Bottlenose Dolphin',
      emoji: '🐬',
      location: 'Marine Research Center, Australia',
      walletAddress: '0x2468...dolphin',
      nftPrice: 2900,
      currentGoal: 'Ocean Release Program',
      goalProgress: 88,
      health: 94,
      happiness: 96,
      virtualCompanion: true,
      achievements: ['Ocean Navigator', 'Sonar Master', 'Nearly Free'],
      newLocationFound: true
    }
  ])

  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [googleEarthMode, setGoogleEarthMode] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals(prev => prev.map(animal => ({
        ...animal,
        goalProgress: Math.min(100, animal.goalProgress + Math.random() * 2),
        health: Math.max(85, Math.min(100, animal.health + (Math.random() - 0.5) * 2)),
        happiness: Math.max(70, Math.min(100, animal.happiness + (Math.random() - 0.5) * 3))
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const buyAnimalNFT = (animal: Animal) => {
    toast.success(`🎨 NFT Purchase Successful!`, {
      description: `You now own ${animal.name}'s NFT for ${animal.nftPrice} GAiA tokens`,
      duration: 5000
    })
  }

  const activateVirtualCompanion = (animalId: string) => {
    setAnimals(prev => prev.map(animal => 
      animal.id === animalId 
        ? { ...animal, virtualCompanion: true }
        : animal
    ))
    
    const animal = animals.find(a => a.id === animalId)
    toast.success(`🎮 Virtual Companion Activated!`, {
      description: `${animal?.name} is now your virtual companion in Google Earth exploration`,
      duration: 4000
    })
  }

  const findNewLocation = (animal: Animal) => {
    setGoogleEarthMode(true)
    setSelectedAnimal(animal)
    toast.success(`🌍 Google Earth Integration Active!`, {
      description: `Exploring new locations for ${animal.name} with virtual companion mode`,
      duration: 6000
    })
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Heart className="h-6 w-6" />
          🦎 Advanced Animal NFT Tracking System
        </CardTitle>
        <div className="text-sm text-green-300">
          Real zoo animals • Individual wallets • NFT marketplace • Virtual companions • Google Earth integration
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Google Earth Integration */}
        {googleEarthMode && selectedAnimal && (
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <Globe className="h-16 w-16 text-blue-400 mx-auto animate-spin" />
                <h3 className="text-2xl font-bold text-blue-400">
                  🌍 Google Earth Virtual Exploration
                </h3>
                <p className="text-blue-300">
                  Walking with {selectedAnimal.name} {selectedAnimal.emoji} to find the perfect new location
                </p>
                <div className="bg-black/50 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{selectedAnimal.emoji}</div>
                    <div className="text-lg text-white">Virtual companion active</div>
                    <div className="text-sm text-blue-300">Exploring suitable habitats...</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setGoogleEarthMode(false)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Exit Virtual Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="border-purple-500/30 bg-purple-900/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{animal.emoji}</div>
                  <h3 className="text-xl font-bold text-purple-400">{animal.name}</h3>
                  <div className="text-sm text-muted-foreground">{animal.species}</div>
                  <Badge className="mt-2 bg-blue-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {animal.location}
                  </Badge>
                </div>

                {/* Health & Happiness */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-300">Health</span>
                      <span className="text-red-400">{animal.health}%</span>
                    </div>
                    <Progress value={animal.health} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-300">Happiness</span>
                      <span className="text-yellow-400">{animal.happiness}%</span>
                    </div>
                    <Progress value={animal.happiness} className="h-2" />
                  </div>
                </div>

                {/* Current Goal */}
                <div className="bg-green-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Current Goal</span>
                  </div>
                  <div className="text-sm text-green-300 mb-2">{animal.currentGoal}</div>
                  <Progress value={animal.goalProgress} className="h-2" />
                  <div className="text-xs text-green-400 mt-1">{animal.goalProgress.toFixed(1)}% complete</div>
                </div>

                {/* Wallet & NFT */}
                <div className="bg-blue-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Individual Wallet</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {animal.nftPrice} GAiA
                    </div>
                  </div>
                  <code className="text-xs text-blue-300 bg-black/40 p-1 rounded block">
                    {animal.walletAddress}
                  </code>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Achievements</span>
                  </div>
                  <div className="space-y-1">
                    {animal.achievements.map((achievement, index) => (
                      <Badge key={index} className="bg-yellow-600 text-xs mr-1">
                        <Star className="h-3 w-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    onClick={() => buyAnimalNFT(animal)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Buy NFT - {animal.nftPrice} GAiA
                  </Button>
                  
                  {!animal.virtualCompanion && (
                    <Button 
                      onClick={() => activateVirtualCompanion(animal.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Activate Virtual Companion
                    </Button>
                  )}
                  
                  {animal.virtualCompanion && (
                    <Button 
                      onClick={() => findNewLocation(animal)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Find New Location
                    </Button>
                  )}
                  
                  {animal.newLocationFound && (
                    <Badge className="w-full bg-green-600 text-center py-2">
                      🎉 New Location Found!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">{animals.length}</div>
              <div className="text-xs text-green-300">Animals Tracked</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-4 text-center">
              <Wallet className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">{animals.length}</div>
              <div className="text-xs text-blue-300">Individual Wallets</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">
                {animals.filter(a => a.virtualCompanion).length}
              </div>
              <div className="text-xs text-purple-300">Virtual Companions</div>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">
                {animals.filter(a => a.newLocationFound).length}
              </div>
              <div className="text-xs text-yellow-300">Ready for Release</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
