
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { MapPin, Target, Clock, Users, TreePine, Droplets, Recycle } from 'lucide-react'

interface Mission {
  id: string
  title: string
  description: string
  location: string
  distance: number
  difficulty: 'easy' | 'medium' | 'hard'
  reward: number
  timeLimit: number
  participants: number
  maxParticipants: number
  type: 'cleanup' | 'planting' | 'conservation' | 'education'
  status: 'available' | 'in-progress' | 'completed'
  requiredItems?: string[]
}

export function LocationBasedMissions() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'River Cleanup Mission',
      description: 'Clean up plastic waste along the riverside park trail',
      location: 'Central Park River Trail',
      distance: 2.5,
      difficulty: 'medium',
      reward: 150,
      timeLimit: 4,
      participants: 8,
      maxParticipants: 15,
      type: 'cleanup',
      status: 'available',
      requiredItems: ['Gloves', 'Trash bags', 'Water bottle']
    },
    {
      id: '2',
      title: 'Urban Tree Planting',
      description: 'Plant native trees in designated urban areas',
      location: 'Downtown Community Garden',
      distance: 1.2,
      difficulty: 'easy',
      reward: 200,
      timeLimit: 3,
      participants: 12,
      maxParticipants: 20,
      type: 'planting',
      status: 'available',
      requiredItems: ['Shovel', 'Water', 'Work gloves']
    },
    {
      id: '3',
      title: 'Wildlife Habitat Survey',
      description: 'Document local wildlife and habitat conditions',
      location: 'Nature Reserve Trail',
      distance: 3.8,
      difficulty: 'hard',
      reward: 300,
      timeLimit: 6,
      participants: 4,
      maxParticipants: 8,
      type: 'conservation',
      status: 'in-progress'
    }
  ])

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, [])

  const getTypeIcon = (type: Mission['type']) => {
    switch (type) {
      case 'cleanup': return Recycle
      case 'planting': return TreePine
      case 'conservation': return Droplets
      case 'education': return Target
      default: return MapPin
    }
  }

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600'
      case 'medium': return 'bg-yellow-600'
      case 'hard': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const joinMission = (missionId: string) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, participants: mission.participants + 1, status: 'in-progress' as const }
        : mission
    ))
    toast.success('Successfully joined the mission! Check your map for directions.')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          📍 Location-Based Missions
        </h2>
        <p className="text-muted-foreground">
          Complete real-world environmental missions in your area
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => {
          const Icon = getTypeIcon(mission.type)
          const isAvailable = mission.status === 'available' && mission.participants < mission.maxParticipants
          
          return (
            <Card key={mission.id} className={`border-2 transition-colors ${
              isAvailable ? 'border-green-500/30 hover:border-green-500/50' : 'border-gray-500/30'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-green-400" />
                  <Badge className={getDifficultyColor(mission.difficulty)}>
                    {mission.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{mission.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mission.description}</p>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{mission.location}</span>
                  <span className="text-muted-foreground">({mission.distance}km away)</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span>{mission.participants}/{mission.maxParticipants}</span>
                  </div>
                  <Progress value={(mission.participants / mission.maxParticipants) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{mission.timeLimit}h limit</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 font-bold">
                    <span>+{mission.reward} GAiA</span>
                  </div>
                </div>

                {mission.requiredItems && (
                  <div className="text-xs">
                    <span className="font-medium">Required: </span>
                    <span className="text-muted-foreground">{mission.requiredItems.join(', ')}</span>
                  </div>
                )}

                <Button 
                  onClick={() => joinMission(mission.id)} 
                  disabled={!isAvailable}
                  className="w-full"
                  variant={isAvailable ? "default" : "secondary"}
                >
                  {mission.status === 'completed' ? '✅ Completed' :
                   mission.status === 'in-progress' ? '🔄 In Progress' :
                   mission.participants >= mission.maxParticipants ? '👥 Full' :
                   '🎯 Join Mission'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
