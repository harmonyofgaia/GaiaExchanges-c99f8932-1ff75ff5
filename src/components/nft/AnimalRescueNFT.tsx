import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, MapPin, AlertTriangle, Camera, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface RescueAnimal {
  id: string
  name: string
  species: string
  emoji: string
  urgency: 'Low' | 'Medium' | 'High' | 'Critical'
  location: string
  situation: string
  needed: number
  raised: number
  image?: string
}

export function AnimalRescueNFT() {
  const [rescueAnimals] = useState<RescueAnimal[]>([
    {
      id: '1',
      name: 'Luna',
      species: 'Arctic Wolf',
      emoji: '🐺',
      urgency: 'Critical',
      location: 'Alaska Wildlife Reserve',
      situation: 'Injured and needs immediate medical attention',
      needed: 2500,
      raised: 1200
    },
    {
      id: '2', 
      name: 'Thunder',
      species: 'Golden Eagle',
      emoji: '🦅',
      urgency: 'High',
      location: 'Rocky Mountains',
      situation: 'Habitat threatened by deforestation',
      needed: 1800,
      raised: 800
    },
    {
      id: '3',
      name: 'Coral',
      species: 'Sea Turtle',
      emoji: '🐢',
      urgency: 'Medium',
      location: 'Pacific Ocean',
      situation: 'Needs relocation to safer breeding grounds',
      needed: 1500,
      raised: 900
    }
  ])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'border-red-500/50 bg-red-900/20'
      case 'High': return 'border-orange-500/50 bg-orange-900/20'
      case 'Medium': return 'border-yellow-500/50 bg-yellow-900/20'
      default: return 'border-green-500/50 bg-green-900/20'
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-600'
      case 'High': return 'bg-orange-600'
      case 'Medium': return 'bg-yellow-600'
      default: return 'bg-green-600'
    }
  }

  const contribute = (animal: RescueAnimal, amount: number) => {
    toast.success(`💚 Contribution Made!`, {
      description: `You contributed ${amount} GAiA tokens to help ${animal.name}`,
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            🆘 Emergency Animal Rescue Center
          </CardTitle>
          <p className="text-muted-foreground">
            Real animals in crisis need immediate help. Your contributions go directly to rescue operations.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rescueAnimals.map((animal) => (
          <Card key={animal.id} className={`${getUrgencyColor(animal.urgency)} hover:scale-105 transition-transform`}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{animal.emoji}</div>
                  <div>
                    <h3 className="font-bold text-white">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground">{animal.species}</p>
                  </div>
                </div>
                <Badge className={getUrgencyBadge(animal.urgency)}>
                  {animal.urgency}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400">{animal.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{animal.situation}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress:</span>
                  <span className="text-green-400">{animal.raised} / {animal.needed} GAiA</span>
                </div>
                <Progress value={(animal.raised / animal.needed) * 100} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => contribute(animal, 50)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  50 GAiA
                </Button>
                <Button 
                  onClick={() => contribute(animal, 100)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  100 GAiA
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cyan-500/30 text-cyan-400"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}