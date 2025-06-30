
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gamepad2, Trophy, Users, Zap, Play, Star } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🎮 GAiA Gaming Hub
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Play, earn, and help save the planet
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Gamepad2 className="h-6 w-6" />
                  Eco Adventures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Embark on environmental restoration missions and earn GAiA tokens.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Adventure
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Trophy className="h-6 w-6" />
                  Tournaments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Compete in global tournaments and climb the leaderboards.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Trophy className="h-4 w-4 mr-2" />
                  Join Tournament
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="h-6 w-6" />
                  Multiplayer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Team up with friends for cooperative environmental challenges.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  Find Players
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">🌟 Featured Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-orange-300">Forest Guardian</h4>
                  <p className="text-muted-foreground">
                    Protect virtual forests while earning real-world impact tokens.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-green-600">Eco-Friendly</Badge>
                    <Badge className="bg-blue-600">Multiplayer</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-orange-300">Ocean Cleanup</h4>
                  <p className="text-muted-foreground">
                    Clean up virtual oceans and contribute to real marine conservation.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-cyan-600">Marine</Badge>
                    <Badge className="bg-purple-600">Educational</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Gaming
