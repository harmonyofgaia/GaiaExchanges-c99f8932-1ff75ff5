
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { Users, Trophy, Target, Clock, Leaf, Droplets, Zap } from 'lucide-react'

interface Team {
  id: string
  name: string
  members: number
  maxMembers: number
  totalScore: number
  avatar: string
  leader: string
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'weekly' | 'monthly' | 'seasonal'
  category: 'water' | 'energy' | 'waste' | 'transport' | 'food'
  targetValue: number
  currentValue: number
  reward: number
  timeRemaining: number
  teams: Team[]
  status: 'active' | 'completed'
}

export function TeamChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Water Warriors Challenge',
      description: 'Save the most water as a team this month',
      type: 'monthly',
      category: 'water',
      targetValue: 10000,
      currentValue: 6780,
      reward: 5000,
      timeRemaining: 12,
      status: 'active',
      teams: [
        { id: '1', name: 'Eco Champions', members: 8, maxMembers: 10, totalScore: 2340, avatar: '🌟', leader: 'EcoWarrior' },
        { id: '2', name: 'Green Guardians', members: 7, maxMembers: 10, totalScore: 2120, avatar: '🛡️', leader: 'GreenHero' },
        { id: '3', name: 'Blue Planet', members: 9, maxMembers: 10, totalScore: 2000, avatar: '🌍', leader: 'OceanLover' },
        { id: '4', name: 'Nature Squad', members: 6, maxMembers: 10, totalScore: 1890, avatar: '🌱', leader: 'TreeHugger' }
      ]
    },
    {
      id: '2',
      title: 'Zero Waste Week',
      description: 'Minimize waste production and maximize recycling',
      type: 'weekly',
      category: 'waste',
      targetValue: 5000,
      currentValue: 3240,
      reward: 2500,
      timeRemaining: 3,
      status: 'active',
      teams: [
        { id: '1', name: 'Eco Champions', members: 8, maxMembers: 10, totalScore: 890, avatar: '🌟', leader: 'EcoWarrior' },
        { id: '2', name: 'Green Guardians', members: 7, maxMembers: 10, totalScore: 820, avatar: '🛡️', leader: 'GreenHero' },
        { id: '5', name: 'Clean Crew', members: 5, maxMembers: 8, totalScore: 780, avatar: '🧹', leader: 'CleanKeeper' },
        { id: '3', name: 'Blue Planet', members: 9, maxMembers: 10, totalScore: 750, avatar: '🌍', leader: 'OceanLover' }
      ]
    }
  ])

  const [userTeam, setUserTeam] = useState<string | null>('1') // User is in Eco Champions

  const getCategoryIcon = (category: Challenge['category']) => {
    switch (category) {
      case 'water': return Droplets
      case 'energy': return Zap
      case 'waste': return Target
      case 'transport': return Users
      case 'food': return Leaf
      default: return Trophy
    }
  }

  const getCategoryColor = (category: Challenge['category']) => {
    switch (category) {
      case 'water': return 'bg-blue-600'
      case 'energy': return 'bg-yellow-600'
      case 'waste': return 'bg-green-600'
      case 'transport': return 'bg-purple-600'
      case 'food': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'weekly': return 'border-green-500/30'
      case 'monthly': return 'border-blue-500/30'
      case 'seasonal': return 'border-purple-500/30'
      default: return 'border-gray-500/30'
    }
  }

  const joinTeam = (challengeId: string, teamId: string) => {
    setUserTeam(teamId)
    toast.success('Successfully joined the team! Start contributing to win the challenge!')
  }

  const contributeToChallenge = (challengeId: string, amount: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, currentValue: challenge.currentValue + amount }
        : challenge
    ))
    toast.success(`Contributed ${amount} points to your team! Keep up the great work!`)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🏆 Team Challenges
        </h2>
        <p className="text-muted-foreground">
          Join forces with others to tackle environmental challenges together
        </p>
      </div>

      {challenges.map((challenge) => {
        const Icon = getCategoryIcon(challenge.category)
        const progress = (challenge.currentValue / challenge.targetValue) * 100
        const userInChallenge = challenge.teams.some(team => team.id === userTeam)
        
        return (
          <Card key={challenge.id} className={`border-2 ${getTypeColor(challenge.type)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-green-400" />
                  <div>
                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getCategoryColor(challenge.category)}>
                    {challenge.category.toUpperCase()}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    {challenge.type} • {challenge.timeRemaining}d left
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Challenge Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{challenge.currentValue.toLocaleString()} / {challenge.targetValue.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="text-center">
                  <span className="text-lg font-bold text-green-400">🎁 {challenge.reward.toLocaleString()} GAiA Prize Pool</span>
                </div>
              </div>

              {/* Team Leaderboard */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Team Leaderboard
                </h4>
                <div className="space-y-2">
                  {challenge.teams.map((team, index) => (
                    <div key={team.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                      team.id === userTeam ? 'border-green-500/50 bg-green-500/10' : 'border-gray-700/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="text-lg">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{team.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.members}/{team.maxMembers} members • Led by {team.leader}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">{team.totalScore.toLocaleString()}</div>
                        {team.id === userTeam ? (
                          <Badge variant="secondary" className="text-xs">Your Team</Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => joinTeam(challenge.id, team.id)}
                            disabled={team.members >= team.maxMembers}
                          >
                            {team.members >= team.maxMembers ? 'Full' : 'Join'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {userInChallenge && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => contributeToChallenge(challenge.id, 50)}
                    className="flex-1"
                  >
                    💪 Contribute Activity (+50 points)
                  </Button>
                  <Button 
                    onClick={() => contributeToChallenge(challenge.id, 25)}
                    variant="outline"
                    className="flex-1"
                  >
                    📸 Share Progress (+25 points)
                  </Button>
                </div>
              )}

              {!userInChallenge && (
                <div className="text-center p-4 border border-dashed border-gray-500 rounded-lg">
                  <p className="text-muted-foreground mb-2">Join a team to participate in this challenge!</p>
                  <Button variant="outline">🏃‍♂️ Join Any Available Team</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
