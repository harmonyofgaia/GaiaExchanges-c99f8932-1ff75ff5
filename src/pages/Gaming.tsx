
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Trophy, Zap } from 'lucide-react'

export default function Gaming() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center gap-3">
              <Gamepad2 className="h-12 w-12 text-purple-400 animate-bounce" />
              🎮 Gaming Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Eco-Gaming with Real Environmental Impact
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-purple-600">🎮 Gaming</Badge>
              <Badge className="bg-blue-600">🌍 Eco-Impact</Badge>
              <Badge className="bg-green-600">🏆 Rewards</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Eco Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Play engaging games that contribute to real-world environmental projects.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Tournaments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compete in eco-gaming tournaments and win GAiA tokens for environmental causes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Achievement System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Unlock achievements and earn rewards for your environmental gaming progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
