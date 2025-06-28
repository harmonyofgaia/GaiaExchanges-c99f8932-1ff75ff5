
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameIntroMovie } from "@/components/gaming/GameIntroMovie"
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Coins, 
  Zap, 
  Crown,
  Play,
  Settings,
  Star
} from "lucide-react"

const Gaming = () => {
  const [showIntro, setShowIntro] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    setShowIntro(true)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    setGameStarted(true)
  }

  const handleSkipIntro = () => {
    setShowIntro(false)
    setGameStarted(true)
  }

  if (showIntro) {
    return <GameIntroMovie onComplete={handleIntroComplete} onSkip={handleSkipIntro} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900/20 via-zinc-900/50 to-zinc-900/20 text-white">
      <div className="container mx-auto p-8">
        
        {/* Gaming Header */}
        <section className="text-center space-y-6 mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Gaming Universe
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter the most immersive gaming experience powered by Harmony of Gaia. Where seeds form into music and dreams become reality.
          </p>
          
          {!gameStarted ? (
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleStartGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Gaming Adventure
              </Button>
              <Button size="lg" variant="outline">
                <Settings className="h-5 w-5 mr-2" />
                Game Settings
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg p-6 border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-2">🎮 Game Active!</h3>
              <p className="text-green-200">Welcome to the Harmony of Gaia Gaming Universe! Your adventure has begun.</p>
            </div>
          )}
        </section>

        {/* Gaming Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5 text-purple-400" />
                <span>Immersive Gameplay</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Experience gaming like never before with AI-powered environments and dynamic storytelling.
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-blue-400" />
                <span>Competitive Tournaments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Join global tournaments and compete for GAiA tokens and exclusive rewards.
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-green-400" />
                <span>Play-to-Earn</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Earn GAiA tokens while playing and build your virtual empire in the metaverse.
            </CardContent>
          </Card>
        </section>

        {/* Game Stats */}
        {gameStarted && (
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Crown className="h-6 w-6" />
                  Player Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">1,250</div>
                    <div className="text-sm text-muted-foreground">GAiA Tokens Earned</div>
                    <Badge className="mt-2 bg-green-600">
                      <Coins className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">47</div>
                    <div className="text-sm text-muted-foreground">Levels Completed</div>
                    <Badge className="mt-2 bg-blue-600">
                      <Zap className="h-3 w-3 mr-1" />
                      Rising
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">Elite</div>
                    <div className="text-sm text-muted-foreground">Player Rank</div>
                    <Badge className="mt-2 bg-purple-600">
                      <Star className="h-3 w-3 mr-1" />
                      Elite
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">892</div>
                    <div className="text-sm text-muted-foreground">Global Ranking</div>
                    <Badge className="mt-2 bg-yellow-600">
                      <Trophy className="h-3 w-3 mr-1" />
                      Champion
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Gaming Philosophy */}
        <section className="text-center mb-12">
          <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
            <CardContent className="pt-8">
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                "Seeds Will Form Into Music" 🎵
              </h3>
              <p className="text-lg text-cyan-200 max-w-3xl mx-auto">
                In our gaming universe, every action creates harmony, every decision forms melody, 
                and every player contributes to the grand symphony of Harmony of Gaia.
              </p>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2">
                  🌱 Creative Growth
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                  🎮 Immersive Experience
                </Badge>
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2">
                  🚀 Limitless Potential
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default Gaming
