
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Trophy, Users, Shield, Zap, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            🎮 GAIA GAMING ARENA
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Epic gaming experiences with dragon-powered security
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-purple-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Dragon Protected
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Gaming
            </Badge>
            <Badge className="bg-green-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              Multiplayer Ready
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-purple-500/30 bg-purple-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Gamepad2 className="h-6 w-6" />
                🥊 Gaia Fighter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Epic fighting game with environmental warriors
              </p>
              <Link to="/gaia-fighter-game">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Play Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Trophy className="h-6 w-6" />
                🏆 Tournament Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Compete in global tournaments for GAIA rewards
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Join Tournament
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Star className="h-6 w-6" />
                🌟 Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Unlock exclusive achievements and rewards
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                🐉 Dragon Gaming Protection Active
              </h3>
              <p className="text-muted-foreground">
                All gaming sessions are protected by quantum-level security ensuring fair play and secure transactions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Gaming
