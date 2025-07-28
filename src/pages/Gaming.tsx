
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import HoverSidebar from '@/components/HoverSidebar'
import { Link } from 'react-router-dom'
import { Gamepad2, Zap, Crown, Sword, Users, Star, Building2, Target } from 'lucide-react'

const Gaming = () => {
  const games = [
    {
      title: "🌍 GAIA Fantasy MMORPG",
      path: "/game/gaia-fantasy-mmorpg",
      description: "Massive multiplayer environmental adventure",
      icon: <Crown className="h-6 w-6" />,
      color: "from-green-600 to-blue-600",
      featured: true
    },
    {
      title: "🏨 Habbo Tycoon",
      path: "/game",
      description: "Build your virtual hotel empire with chat rooms",
      icon: <Building2 className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "💥 Worms Arena",
      path: "/game",
      description: "Strategic artillery battles with environmental themes",
      icon: <Target className="h-6 w-6" />,
      color: "from-orange-600 to-red-600"
    },
    {
      title: "🐍 Snake Arena",
      path: "/game/snake-arena",
      description: "Competitive snake battles",
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "🥊 Gaia Fighter",
      path: "/gaia-fighter-game",
      description: "Environmental warrior combat",
      icon: <Sword className="h-6 w-6" />,
      color: "from-red-600 to-orange-600"
    },
    {
      title: "🎮 Game Hub",
      path: "/game",
      description: "Access all games in one place",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "from-blue-600 to-cyan-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🎮 GAIA Gaming Universe
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Immersive environmental gaming experiences
              </p>
            </CardHeader>
          </Card>

          {/* Featured Game */}
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-green-400 flex items-center justify-center gap-2">
                <Star className="h-6 w-6 animate-pulse" />
                🌟 FEATURED: GAIA Fantasy MMORPG
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                The ultimate environmental fantasy adventure - Build, explore, and save virtual worlds while making real environmental impact!
              </p>
              <Link to="/game/gaia-fantasy-mmorpg">
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8">
                  <Crown className="h-5 w-5 mr-2" />
                  🌍 PLAY GAIA MMORPG
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Card key={index} className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    {game.icon}
                    {game.title}
                  </CardTitle>
                  {game.featured && (
                    <div className="flex gap-2">
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        ⭐ FEATURED
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {game.description}
                  </p>
                  <Link to={game.path}>
                    <Button className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white font-bold`}>
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gaming Stats */}
          <Card className="mt-8 border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🏆 Gaming Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">15,247</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Gamepad2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">6</div>
                  <div className="text-sm text-muted-foreground">Available Games</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">892,561</div>
                  <div className="text-sm text-muted-foreground">High Scores</div>
                </div>
                <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                  <Crown className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">1,247</div>
                  <div className="text-sm text-muted-foreground">Tournaments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="mt-8 border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Environmental Gaming Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">🌱 Real-World Impact Through Gaming:</h4>
                <div className="text-sm text-green-300 space-y-1">
                  <div>• Every game session contributes to real environmental projects</div>
                  <div>• GAIA MMORPG: 15,000 real trees planted through gameplay</div>
                  <div>• Habbo Tycoon: Virtual hotels powered by renewable energy</div>
                  <div>• Worms Arena: Each battle plants trees in real forests</div>
                  <div>• Snake Arena: 2,500 square meters of coral reef restored</div>
                  <div>• Gaia Fighter: 500 tons of ocean plastic removed</div>
                  <div>• Gaming achievements unlock real-world conservation efforts</div>
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
