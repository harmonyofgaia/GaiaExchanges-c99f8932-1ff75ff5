
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Activity, Heart, Thermometer, Camera, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface LiveAnimalTrackerProps {
  animals: Array<{
    id: string
    name: string
    species: string
    emoji: string
    currentLocation: string
    caretaker: string
    lastUpdate: string
  }>
}

interface LiveData {
  heartRate: number
  temperature: number
  activity: string
  mood: string
  location: string
  lastFed: string
  healthStatus: 'excellent' | 'good' | 'fair' | 'concerning'
}

export function LiveAnimalTracker({ animals }: LiveAnimalTrackerProps) {
  const [liveData, setLiveData] = useState<{[key: string]: LiveData}>({})

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      const newData: {[key: string]: LiveData} = {}
      
      animals.forEach(animal => {
        newData[animal.id] = {
          heartRate: 60 + Math.floor(Math.random() * 40),
          temperature: 98 + Math.random() * 4,
          activity: ['Resting', 'Playing', 'Eating', 'Exploring', 'Socializing'][Math.floor(Math.random() * 5)],
          mood: ['Content', 'Playful', 'Calm', 'Alert', 'Curious'][Math.floor(Math.random() * 5)],
          location: `Sector ${Math.floor(Math.random() * 5) + 1}`,
          lastFed: `${Math.floor(Math.random() * 4) + 1} hours ago`,
          healthStatus: (['excellent', 'good', 'fair', 'concerning'] as const)[Math.floor(Math.random() * 4)]
        }
      })
      
      setLiveData(newData)
    }, 5000)

    return () => clearInterval(interval)
  }, [animals])

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-600'
      case 'good': return 'bg-blue-600'
      case 'fair': return 'bg-yellow-600'
      case 'concerning': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const requestLiveVideo = (animalName: string) => {
    toast.success(`📹 Requesting live video feed for ${animalName}`, {
      description: 'Connecting to sanctuary cameras...',
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Activity className="h-6 w-6 animate-pulse" />
            📡 Live Animal Monitoring & Tracking
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time health, location, and activity monitoring for all animals in care.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {animals.map((animal) => {
          const data = liveData[animal.id]
          if (!data) return null

          return (
            <Card key={animal.id} className="border-blue-500/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{animal.emoji}</div>
                      <div>
                        <h3 className="font-bold text-lg">{animal.name}</h3>
                        <p className="text-muted-foreground text-sm">{animal.species}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getHealthStatusColor(data.healthStatus)}>
                      {data.healthStatus.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-900/20 p-3 rounded border border-red-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-semibold">Heart Rate</span>
                      </div>
                      <div className="text-xl font-bold text-red-400">{data.heartRate} BPM</div>
                    </div>

                    <div className="bg-orange-900/20 p-3 rounded border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-semibold">Temperature</span>
                      </div>
                      <div className="text-xl font-bold text-orange-400">{data.temperature.toFixed(1)}°F</div>
                    </div>

                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-semibold">Activity</span>
                      </div>
                      <div className="text-sm font-bold text-blue-400">{data.activity}</div>
                    </div>

                    <div className="bg-purple-900/20 p-3 rounded border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-purple-400">😊</span>
                        <span className="text-sm font-semibold">Mood</span>
                      </div>
                      <div className="text-sm font-bold text-purple-400">{data.mood}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Location:</span>
                      <span className="font-semibold">{data.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Fed:</span>
                      <span className="font-semibold">{data.lastFed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Caretaker:</span>
                      <span className="font-semibold">{animal.caretaker}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => requestLiveVideo(animal.name)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Request Live Video Feed
                  </Button>

                  <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">Last Update</span>
                    </div>
                    <p className="text-xs text-green-300">{animal.lastUpdate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
