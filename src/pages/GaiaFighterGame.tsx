
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Zap, Shield, Trophy } from 'lucide-react'

const GaiaFighterGame = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            🥊 GAIA FIGHTER GAME
          </h1>
          <p className="text-muted-foreground">
            Epic environmental warriors fighting game
          </p>
        </div>

        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400 text-center justify-center">
              <Gamepad2 className="h-6 w-6" />
              Choose Your Fighter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-green-500/30 bg-green-900/20 hover:scale-105 transition-transform">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">🌿</div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Forest Guardian</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Master of nature's power
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Select Fighter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/20 hover:scale-105 transition-transform">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Ocean Warrior</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Harnesses the power of seas
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Select Fighter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/20 hover:scale-105 transition-transform">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">🔥</div>
                  <h3 className="text-xl font-bold text-orange-400 mb-2">Earth Dragon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Commands elemental forces
                  </p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Select Fighter
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
                <Trophy className="h-5 w-5 mr-2" />
                Start Tournament Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GaiaFighterGame
