
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Zap, Shield, Trophy, Sparkles, Brain, Rocket } from 'lucide-react'
import { GaiaFighterGameAdvanced } from '@/components/GaiaFighterGameAdvanced'

const GaiaFighterGame = () => {
  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            🥊 GAIA FIGHTER - QUANTUM REVOLUTION
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Unreal Tournament × World of Warcraft × Final Fantasy = Ultimate Gaming Experience
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-500/30 rounded-lg">
              <Rocket className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-bold">Quantum Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <Brain className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-bold">Self-Training AI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-bold">Infinite Transformation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-red-500/30 bg-red-900/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400 text-center justify-center">
                <Gamepad2 className="h-6 w-6" />
                Unreal Tournament Combat
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl mb-4">⚔️</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Lightning-Fast Arena Combat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Experience the most intense, skill-based combat system ever created with quantum-enhanced reflexes
              </p>
              <div className="space-y-2 text-sm">
                <div className="text-red-300">• 240+ FPS Ultra Performance</div>
                <div className="text-red-300">• Quantum Weapon Systems</div>
                <div className="text-red-300">• Neural Combat AI</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400 text-center justify-center">
                <Shield className="h-6 w-6" />
                World of Warcraft Scale
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Massive Open Worlds</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore infinite realms with thousands of players, guilds, and epic raid encounters
              </p>
              <div className="space-y-2 text-sm">
                <div className="text-blue-300">• 15,000+ Players Online</div>
                <div className="text-blue-300">• Infinite World Generation</div>
                <div className="text-blue-300">• Cross-Dimensional Guilds</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
                <Trophy className="h-6 w-6" />
                Final Fantasy Magic
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Epic Story & Transformation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Immerse yourself in cinematic storytelling with limitless character and world transformation
              </p>
              <div className="space-y-2 text-sm">
                <div className="text-purple-300">• Cinematic Storytelling</div>
                <div className="text-purple-300">• Legendary Transformations</div>
                <div className="text-purple-300">• Summon System</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revolutionary Features Showcase */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-green-400 text-3xl">
              🚀 REVOLUTIONARY QUANTUM FEATURES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
                <Brain className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                <h4 className="font-bold text-cyan-400 mb-2">Quantum AI Engines</h4>
                <p className="text-xs text-muted-foreground">
                  Self-training backup engines ensure 100% uptime and continuously improving performance
                </p>
              </div>
              
              <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
                <Sparkles className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                <h4 className="font-bold text-orange-400 mb-2">Universal Transformation</h4>
                <p className="text-xs text-muted-foreground">
                  Transform any item, character, or landscape between game styles in real-time
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h4 className="font-bold text-green-400 mb-2">Ultra Performance</h4>
                <p className="text-xs text-muted-foreground">
                  240+ FPS with 1ms latency powered by quantum processing cores
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <h4 className="font-bold text-purple-400 mb-2">Always Ahead</h4>
                <p className="text-xs text-muted-foreground">
                  Constantly evolving to stay ahead of any current or future game
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Game Interface */}
        <GaiaFighterGameAdvanced />

        {/* Environmental Impact Integration */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 GAMING FOR GOOD</h3>
              <p className="text-muted-foreground mb-4">
                Every battle fought, every world built, every transformation completed contributes to saving our planet
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌊</div>
                  <div className="font-bold text-blue-400">Coral Reef Protection</div>
                  <div className="text-sm text-muted-foreground">5% of all earnings fund coral restoration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="font-bold text-green-400">Green Energy Projects</div>
                  <div className="text-sm text-muted-foreground">Quantum servers powered by renewables</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🐾</div>
                  <div className="font-bold text-orange-400">Animal Liberation</div>
                  <div className="text-sm text-muted-foreground">Free animals from cages worldwide</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GaiaFighterGame
