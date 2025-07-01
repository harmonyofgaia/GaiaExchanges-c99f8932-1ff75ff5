
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, MapPin, Camera, Zap } from 'lucide-react'
import { toast } from 'sonner'

const liveAnimals = [
  {
    id: 1,
    name: "Thunder - The Majestic Eagle",
    species: "Golden Eagle",
    location: "Rocky Mountains, Colorado",
    status: "Active",
    mood: "Happy",
    lastSeen: "2 minutes ago",
    image: "🦅",
    rarity: "Legendary",
    price: "2.5 GAiA",
    traits: ["Sky Master", "Storm Caller", "Mountain Guardian"]
  },
  {
    id: 2,
    name: "Luna - The Forest Wolf",
    species: "Gray Wolf",
    location: "Yellowstone National Park",
    status: "Hunting",
    mood: "Focused",
    lastSeen: "5 minutes ago",
    image: "🐺",
    rarity: "Epic",
    price: "1.8 GAiA",
    traits: ["Pack Leader", "Night Hunter", "Wilderness Expert"]
  },
  {
    id: 3,
    name: "Coral - The Ocean Guardian",
    species: "Sea Turtle",
    location: "Great Barrier Reef, Australia",
    status: "Swimming",
    mood: "Peaceful",
    lastSeen: "1 minute ago",
    image: "🐢",
    rarity: "Rare",
    price: "1.2 GAiA",
    traits: ["Ocean Wisdom", "Coral Protector", "Ancient Soul"]
  },
  {
    id: 4,
    name: "Blaze - The Jungle King",
    species: "Bengal Tiger",
    location: "Amazon Rainforest, Brazil",
    status: "Resting",
    mood: "Alert",
    lastSeen: "3 minutes ago",
    image: "🐅",
    rarity: "Legendary",
    price: "3.0 GAiA",
    traits: ["Jungle Master", "Silent Stalker", "Royal Presence"]
  }
]

export function LiveAnimalNFTs() {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof liveAnimals[0] | null>(null)
  const [liveUpdateCount, setLiveUpdateCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdateCount(prev => prev + 1)
      
      if (Math.random() < 0.3) {
        const randomAnimal = liveAnimals[Math.floor(Math.random() * liveAnimals.length)]
        toast.success(`🐾 ${randomAnimal.name} Update!`, {
          description: `${randomAnimal.name} is now ${randomAnimal.status.toLowerCase()}`,
          duration: 3000
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const adoptAnimal = (animal: typeof liveAnimals[0]) => {
    toast.success(`🎉 ${animal.name} Adopted!`, {
      description: `You've successfully adopted ${animal.name} for ${animal.price}!`,
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      {/* Live Updates Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400 text-center justify-center">
            <Heart className="h-8 w-8 animate-pulse" />
            🌍 LIVE ANIMAL NFTs - REAL ANIMALS, REAL PROTECTION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">🦅🐺🐢🐅</div>
            <p className="text-muted-foreground text-lg">
              Own real animals as NFTs and help protect them in their natural habitat
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-600 animate-pulse">
                Live Updates: {liveUpdateCount}
              </Badge>
              <Badge className="bg-blue-600">Real-Time Tracking</Badge>
              <Badge className="bg-purple-600">Conservation Impact</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveAnimals.map((animal) => (
          <Card 
            key={animal.id} 
            className={`border-2 hover:scale-105 transition-all cursor-pointer ${
              animal.rarity === 'Legendary' ? 'border-yellow-500/50 bg-yellow-900/20' :
              animal.rarity === 'Epic' ? 'border-purple-500/50 bg-purple-900/20' :
              'border-green-500/50 bg-green-900/20'
            }`}
            onClick={() => setSelectedAnimal(animal)}
          >
            <CardHeader>
              <div className="text-center">
                <div className="text-6xl mb-2 animate-bounce">{animal.image}</div>
                <CardTitle className="text-lg text-center">{animal.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{animal.species}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300">{animal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Status:</span>
                  <Badge className={`text-xs ${
                    animal.status === 'Active' ? 'bg-green-600' :
                    animal.status === 'Hunting' ? 'bg-red-600' :
                    animal.status === 'Swimming' ? 'bg-blue-600' :
                    'bg-yellow-600'
                  }`}>
                    {animal.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Mood:</span>
                  <span className="text-xs text-green-400">{animal.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Last Seen:</span>
                  <span className="text-xs text-cyan-400">{animal.lastSeen}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Badge className={`w-full justify-center ${
                  animal.rarity === 'Legendary' ? 'bg-yellow-600' :
                  animal.rarity === 'Epic' ? 'bg-purple-600' :
                  'bg-green-600'
                }`}>
                  {animal.rarity}
                </Badge>
                <div className="text-center font-bold text-lg text-green-400">
                  {animal.price}
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={(e) => {
                  e.stopPropagation()
                  adoptAnimal(animal)
                }}
              >
                <Heart className="h-4 w-4 mr-2" />
                Adopt & Protect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Animal Details */}
      {selectedAnimal && (
        <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Camera className="h-6 w-6" />
              {selectedAnimal.name} - Live Animal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-8xl mb-4">{selectedAnimal.image}</div>
                <h3 className="text-2xl font-bold text-yellow-400">{selectedAnimal.name}</h3>
                <p className="text-muted-foreground">{selectedAnimal.species}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-yellow-400 mb-2">Special Traits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnimal.traits.map((trait, index) => (
                      <Badge key={index} className="bg-yellow-600">
                        <Zap className="h-3 w-3 mr-1" />
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-yellow-400 mb-2">Conservation Impact:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Direct habitat protection funding</li>
                    <li>• Real-time animal monitoring</li>
                    <li>• Anti-poaching support</li>
                    <li>• Local community benefits</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
