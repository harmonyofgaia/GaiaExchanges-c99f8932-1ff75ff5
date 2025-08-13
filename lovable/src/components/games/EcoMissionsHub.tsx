
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  TreePine, 
  Droplets, 
  Recycle, 
  Wind,
  CheckCircle,
  Clock,
  Trophy
} from 'lucide-react'
import { toast } from 'sonner'

export function EcoMissionsHub() {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: 'Plant 100 Virtual Trees',
      description: 'Help reforest the digital world by planting trees in various game environments',
      progress: 67,
      target: 100,
      reward: 500,
      status: 'active',
      icon: TreePine,
      color: 'green'
    },
    {
      id: 2,
      title: 'Clean Ocean Waters',
      description: 'Remove plastic waste from virtual oceans to protect marine life',
      progress: 23,
      target: 50,
      reward: 750,
      status: 'active',
      icon: Droplets,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Build Recycling Centers',
      description: 'Construct recycling facilities to process digital waste efficiently',
      progress: 100,
      target: 100,
      reward: 1000,
      status: 'completed',
      icon: Recycle,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Install Wind Turbines',
      description: 'Generate clean energy by building wind farms across virtual landscapes',
      progress: 0,
      target: 25,
      reward: 1250,
      status: 'locked',
      icon: Wind,
      color: 'cyan'
    }
  ])

  const [playerStats, setPlayerStats] = useState({
    totalReward: 2750,
    completedMissions: 3,
    activeStreak: 7,
    ecoImpact: 8.5
  })

  const handleStartMission = (missionId: number) => {
    setMissions(prev =>
      prev.map(m =>
        m.id === missionId ? { ...m, status: 'active', progress: 1 } : m
      )
    )
    
    toast.success('🎯 Mission Started!', {
      description: 'Your eco-mission is now active. Start making environmental impact!'
    })
  }

  const handleClaimReward = (mission: typeof missions[0]) => {
    if (mission.status === 'completed') {
      setPlayerStats(prev => ({
        ...prev,
        totalReward: prev.totalReward + mission.reward
      }))
      
      toast.success('🏆 Reward Claimed!', {
        description: `You earned ${mission.reward} GAiA tokens for completing ${mission.title}!`
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600'
      case 'completed': return 'bg-green-600'
      case 'locked': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getIconColor = (color: string) => {
    const colors = {
      green: 'text-green-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400'
    }
    return colors[color] || 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🌍 Your Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{playerStats.totalReward}</div>
              <div className="text-sm text-muted-foreground">GAiA Tokens</div>
            </div>
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{playerStats.completedMissions}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{playerStats.activeStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{playerStats.ecoImpact}</div>
              <div className="text-sm text-muted-foreground">Eco Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missions List */}
      <div className="space-y-4">
        {missions.map((mission) => {
          const IconComponent = mission.icon
          
          return (
            <Card key={mission.id} className={`border ${
              mission.status === 'completed' ? 'border-green-500/30' :
              mission.status === 'active' ? 'border-blue-500/30' :
              'border-gray-500/30'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-8 w-8 ${getIconColor(mission.color)}`} />
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{mission.description}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(mission.status)}>
                    {mission.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{mission.progress}/{mission.target}</span>
                  </div>
                  <Progress value={(mission.progress / mission.target) * 100} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{mission.reward} GAiA</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {mission.status === 'locked' && (
                      <Button
                        onClick={() => handleStartMission(mission.id)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Start Mission
                      </Button>
                    )}
                    
                    {mission.status === 'active' && (
                      <Button size="sm" variant="outline" className="border-blue-500/30">
                        <Clock className="h-4 w-4 mr-2" />
                        In Progress
                      </Button>
                    )}
                    
                    {mission.status === 'completed' && (
                      <Button
                        onClick={() => handleClaimReward(mission)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    )}
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
