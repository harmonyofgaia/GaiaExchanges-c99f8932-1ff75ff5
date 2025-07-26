
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, MapPin, Trophy, Zap, Users } from 'lucide-react'
export default function EcoMissions() {
  const missions = [
    {
      id: 1,
      title: "Plant 100 Trees",
      description: "Join local tree planting initiatives in your area",
      reward: "50 GAiA",
      difficulty: "Medium",
      participants: 1247,
      timeLeft: "5 days",
      type: "Community"
    },
    {
      id: 2,
      title: "Beach Cleanup Challenge",
      description: "Remove plastic waste from coastal areas",
      reward: "75 GAiA",
      difficulty: "Easy",
      participants: 892,
      timeLeft: "12 hours",
      type: "Individual"
    },
    {
      id: 3,
      title: "Solar Panel Installation",
      description: "Help install renewable energy systems",
      reward: "200 GAiA",
      difficulty: "Hard",
      participants: 156,
      timeLeft: "2 weeks",
      type: "Expert"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
<div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎯 Eco Missions
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Master Plan v7: AI-Powered Mission Generation and Tracking
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Target className="h-3 w-3 mr-1" />
              AI Generated
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <MapPin className="h-3 w-3 mr-1" />
              Geolocation
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-muted-foreground">Missions Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,847</div>
              <div className="text-muted-foreground">GAiA Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12,456</div>
              <div className="text-muted-foreground">Active Participants</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-muted-foreground">Countries Active</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-green-400" />
                  {mission.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={`${
                    mission.difficulty === 'Easy' ? 'bg-green-600' :
                    mission.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {mission.difficulty}
                  </Badge>
                  <Badge className="bg-blue-600">{mission.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reward</span>
                    <span className="text-green-400 font-bold">{mission.reward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="text-white font-bold">{mission.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time Left</span>
                    <span className="text-orange-400 font-bold">{mission.timeLeft}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  Join Mission
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
