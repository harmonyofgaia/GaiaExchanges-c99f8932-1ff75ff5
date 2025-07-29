import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            🎮 GAIA GAMING
          </h1>
          <p className="text-muted-foreground">
            Explore the GAIA gaming universe with dragon-powered experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Gamepad2 className="h-5 w-5" />
                Arcade Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Play classic arcade games with a GAIA twist
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Play Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-500/30 bg-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-400">
                <Trophy className="h-5 w-5" />
                Tournaments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Compete in tournaments and win GAIA rewards
              </p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Join Tournament
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with other GAIA gamers
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Gaming
