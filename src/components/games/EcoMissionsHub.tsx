
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Droplets, 
  Recycle, 
  Sun,
  TreePine,
  Fish,
  Award,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface EcoMission {
  id: string
  title: string
  description: string
  type: 'cleanup' | 'conservation' | 'education' | 'renewable'
  difficulty: 'easy' | 'medium' | 'hard'
  reward: number
  duration: number
  progress: number
  location: string
  status: 'available' | 'active' | 'completed'
  impact: string
}

export function EcoMissionsHub() {
  const [missions, setMissions] = useState<EcoMission[]>([
    {
      id: '1',
      title: 'Beach Cleanup Challenge',
      description: 'Remove plastic waste from coastline and document marine life recovery',
      type: 'cleanup',
      difficulty: 'medium',
      reward: 250,
      duration: 120,
      progress: 65,
      location: 'Pacific Coast',
      status: 'active',
      impact: '2.5 tons CO2 offset'
    },
    {
      id: '2',
      title: 'Urban Tree Planting',
      description: 'Plant native trees in urban areas to improve air quality',
      type: 'conservation',
      difficulty: 'easy',
      reward: 150,
      duration: 90,
      progress: 0,
      location: 'City Center',
      status: 'available',
      impact: '1.2 tons CO2 absorbed'
    },
    {
      id: '3',
      title: 'Solar Panel Education Workshop',
      description: 'Teach community about renewable energy benefits and installation',
      type: 'education',
      difficulty: 'hard',
      reward: 400,
      duration: 180,
      progress: 100,
      location: 'Community Center',
      status: 'completed',
      impact: '50 households educated'
    },
    {
      id: '4',
      title: 'River Restoration Project',
      description: 'Remove invasive species and restore natural habitat',
      type: 'conservation',
      difficulty: 'hard',
      reward: 500,
      duration: 240,
      progress: 0,
      location: 'Green River Valley',
      status: 'available',
      impact: '5 miles of habitat restored'
    }
  ])

  const [totalTokens, setTotalTokens] = useState(1840)
  const [completedMissions, setCompletedMissions] = useState(7)
  const [ecoImpactScore, setEcoImpactScore] = useState(892)

  useEffect(() => {
    // Simulate mission progress
    const interval = setInterval(() => {
      setMissions(prevMissions =>
        prevMissions.map(mission => {
          if (mission.status === 'active' && mission.progress < 100) {
            const newProgress = Math.min(100, mission.progress + Math.random() * 5)
            if (newProgress === 100) {
              toast.success(`🌍 Mission Complete: ${mission.title}`, {
                description: `You earned ${mission.reward} GAiA tokens! Impact: ${mission.impact}`,
                duration: 6000
              })
              setTotalTokens(prev => prev + mission.reward)
              setCompletedMissions(prev => prev + 1)
              setEcoImpactScore(prev => prev + mission.reward / 2)
              return { ...mission, progress: newProgress, status: 'completed' as const }
            }
            return { ...mission, progress: newProgress }
          }
          return mission
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const startMission = (missionId: string) => {
    setMissions(prevMissions =>
      prevMissions.map(mission =>
        mission.id === missionId 
          ? { ...mission, status: 'active' as const }
          : mission
      )
    )
    
    const mission = missions.find(m => m.id === missionId)
    if (mission) {
      toast.success(`🚀 Mission Started: ${mission.title}`, {
        description: `Duration: ${mission.duration} minutes. Good luck making a difference!`,
        duration: 4000
      })
    }
  }

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'cleanup': return <Recycle className="h-4 w-4" />
      case 'conservation': return <TreePine className="h-4 w-4" />
      case 'education': return <Sun className="h-4 w-4" />
      case 'renewable': return <Leaf className="h-4 w-4" />
      default: return <Leaf className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600'
      case 'medium': return 'bg-yellow-600'
      case 'hard': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-600'
      case 'active': return 'bg-orange-600'
      case 'completed': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">GAiA Tokens</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{totalTokens}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-blue-400">Completed</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{completedMissions}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-purple-400">Eco Impact</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{ecoImpactScore}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="font-bold text-orange-400">Active</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {missions.filter(m => m.status === 'active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission Cards */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🌍 Eco Missions Available</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((mission) => (
              <Card key={mission.id} className="border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getMissionIcon(mission.type)}
                      <h4 className="font-semibold">{mission.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(mission.difficulty)}>
                        {mission.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(mission.status)}>
                        {mission.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {mission.description}
                  </p>

                  <div className="space-y-3">
                    {mission.status === 'active' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="text-green-400">{mission.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Reward:</span>
                        <div className="font-semibold text-green-400">{mission.reward} tokens</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-semibold">{mission.duration} min</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-blue-400" />
                        <span>{mission.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-3 w-3 text-green-400" />
                        <span>{mission.impact}</span>
                      </div>
                    </div>

                    {mission.status === 'available' && (
                      <Button 
                        onClick={() => startMission(mission.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Start Mission
                      </Button>
                    )}

                    {mission.status === 'completed' && (
                      <Button disabled className="w-full bg-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
