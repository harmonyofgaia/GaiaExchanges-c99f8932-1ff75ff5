
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  MapPin, 
  Activity, 
  Heart, 
  Thermometer,
  Eye,
  Camera,
  Radio,
  Zap,
  Clock
} from 'lucide-react'

interface AnimalTracking {
  id: string
  name: string
  species: string
  emoji: string
  location: {
    lat: number
    lng: number
    accuracy: number
  }
  vitals: {
    heartRate: number
    temperature: number
    activity: 'sleeping' | 'active' | 'feeding' | 'playing'
    stress: number
  }
  lastUpdate: string
  batteryLevel: number
  cameraActive: boolean
}

interface LiveAnimalTrackerProps {
  animals: Array<{
    id: string
    name: string
    species: string
    emoji: string
  }>
}

export function LiveAnimalTracker({ animals }: LiveAnimalTrackerProps) {
  const [trackingData, setTrackingData] = useState<AnimalTracking[]>([
    {
      id: '1',
      name: 'Maya',
      species: 'Bengal Tiger',
      emoji: '🐅',
      location: {
        lat: 20.5937,
        lng: 78.9629,
        accuracy: 2.1
      },
      vitals: {
        heartRate: 45,
        temperature: 38.2,
        activity: 'active',
        stress: 15
      },
      lastUpdate: '2 minutes ago',
      batteryLevel: 87,
      cameraActive: true
    },
    {
      id: '2', 
      name: 'Charlie',
      species: 'Rescued Elephant',
      emoji: '🐘',
      location: {
        lat: -1.2921,
        lng: 36.8219,
        accuracy: 1.8
      },
      vitals: {
        heartRate: 32,
        temperature: 36.8,
        activity: 'feeding',
        stress: 8
      },
      lastUpdate: '1 minute ago',
      batteryLevel: 92,
      cameraActive: true
    },
    {
      id: '3',
      name: 'Luna',
      species: 'Arctic Wolf',
      emoji: '🐺',
      location: {
        lat: 64.8378,
        lng: -147.7164,
        accuracy: 3.2
      },
      vitals: {
        heartRate: 68,
        temperature: 38.9,
        activity: 'sleeping',
        stress: 5
      },
      lastUpdate: '4 minutes ago',
      batteryLevel: 76,
      cameraActive: false
    }
  ])

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'sleeping': return '😴'
      case 'active': return '🏃'
      case 'feeding': return '🍽️'
      case 'playing': return '🎾'
      default: return '📊'
    }
  }

  const getStressColor = (stress: number) => {
    if (stress < 20) return 'text-green-400'
    if (stress < 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const activateCamera = (animalId: string) => {
    setTrackingData(prev =>
      prev.map(animal =>
        animal.id === animalId
          ? { ...animal, cameraActive: !animal.cameraActive }
          : animal
      )
    )
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrackingData(prev =>
        prev.map(animal => ({
          ...animal,
          vitals: {
            ...animal.vitals,
            heartRate: animal.vitals.heartRate + (Math.random() - 0.5) * 4,
            stress: Math.max(0, Math.min(100, animal.vitals.stress + (Math.random() - 0.5) * 3))
          },
          batteryLevel: Math.max(0, animal.batteryLevel - Math.random() * 0.1),
          lastUpdate: 'Just now'
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Radio className="h-6 w-6" />
            📡 24/7 Live Animal Tracking System
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time GPS tracking, vital signs monitoring, and live camera feeds for all rescued animals.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trackingData.map((animal) => (
          <Card key={animal.id} className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{animal.emoji}</div>
                    <div>
                      <h3 className="font-bold text-lg">{animal.name}</h3>
                      <p className="text-muted-foreground text-sm">{animal.species}</p>
                    </div>
                  </div>
                  <Badge className={`animate-pulse ${animal.batteryLevel > 50 ? 'bg-green-600' : animal.batteryLevel > 20 ? 'bg-yellow-600' : 'bg-red-600'}`}>
                    <Zap className="h-3 w-3 mr-1" />
                    {animal.batteryLevel.toFixed(0)}%
                  </Badge>
                </div>

                {/* Location Info */}
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">Live Location</span>
                  </div>
                  <div className="text-xs font-mono">
                    <div>Lat: {animal.location.lat.toFixed(6)}</div>
                    <div>Lng: {animal.location.lng.toFixed(6)}</div>
                    <div className="text-green-400">Accuracy: ±{animal.location.accuracy}m</div>
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-900/20 p-3 rounded border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-3 w-3 text-red-400" />
                      <span className="text-xs text-red-400">Heart Rate</span>
                    </div>
                    <div className="text-lg font-bold">{animal.vitals.heartRate.toFixed(0)} BPM</div>
                  </div>

                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400">Temperature</span>
                    </div>
                    <div className="text-lg font-bold">{animal.vitals.temperature.toFixed(1)}°C</div>
                  </div>
                </div>

                {/* Activity & Stress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Current Activity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getActivityIcon(animal.vitals.activity)}</span>
                      <span className="font-semibold capitalize">{animal.vitals.activity}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stress Level</span>
                      <span className={`font-bold ${getStressColor(animal.vitals.stress)}`}>
                        {animal.vitals.stress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={animal.vitals.stress} className="h-2" />
                  </div>
                </div>

                {/* Camera Control */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => activateCamera(animal.id)}
                    className={`flex-1 ${animal.cameraActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    size="sm"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {animal.cameraActive ? '🟢 Camera ON' : '⚫ Camera OFF'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Live Feed
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Last update: {animal.lastUpdate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
