
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Zap, Shield, Trophy, Sparkles } from 'lucide-react'
import { CommunityIllustrations } from '@/components/creative/CommunityIllustrations'

const GaiaFighterGame = () => {
  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            🥊 GAIA FIGHTER GAME
          </h1>
          <p className="text-xl text-muted-foreground">
            Epic environmental warriors fighting game powered by neural networks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-red-500/30 bg-red-900/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400 text-center justify-center">
                <Gamepad2 className="h-6 w-6" />
                Choose Your Neural Fighter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Card className="border-green-500/30 bg-green-900/20 hover:scale-105 transition-transform backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="text-6xl mb-4">🌿⚡</div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Synaptic Forest Guardian</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Master of bioelectric nature connections
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Select Neural Fighter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-900/20 hover:scale-105 transition-transform backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="text-6xl mb-4">🌊🧠</div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Quantum Ocean Warrior</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Harnesses neural wave patterns and sea power
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Select Neural Fighter
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/30 bg-orange-900/20 hover:scale-105 transition-transform backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="text-6xl mb-4">🔥🧬</div>
                    <h3 className="text-xl font-bold text-orange-400 mb-2">Bioelectric Earth Dragon</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Commands elemental neural force networks
                    </p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Select Neural Fighter
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3">
                  <Trophy className="h-5 w-5 mr-2" />
                  Start Neural Tournament Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-400 text-center">
                🧠 Neural Combat System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡🧬⚡</div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  Bioelectric Fighting Mechanics
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Experience combat powered by neural pathway simulations and synaptic energy flows
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-cyan-900/20 rounded-lg">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-300">Neural Energy Attacks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-green-300">Synaptic Defense Systems</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span className="text-purple-300">Bioelectric Special Moves</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Illustrations Section */}
        <CommunityIllustrations />
      </div>
    </div>
  )
}

export default GaiaFighterGame
