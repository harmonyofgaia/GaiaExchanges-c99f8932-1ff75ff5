
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react'

export default function Games() {
  const games = [
    {
      title: "Gaia Fighter",
      description: "Epic battles in the Universal Gaia universe",
      status: "Live",
      players: "2.5k",
      icon: Gamepad2,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Coin Crafter",
      description: "Strategic token creation and trading game",
      status: "Beta",
      players: "1.2k", 
      icon: Trophy,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Landscape Builder",
      description: "Create and customize your virtual worlds",
      status: "Coming Soon",
      players: "N/A",
      icon: Users,
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Energy Sync",
      description: "Rhythm-based energy collection game",
      status: "Development",
      players: "N/A",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-green-400 bg-green-400/20'
      case 'Beta':
        return 'text-blue-400 bg-blue-400/20'
      case 'Coming Soon':
        return 'text-yellow-400 bg-yellow-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Games
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Immerse yourself in our growing collection of interactive experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {games.map((game, index) => {
          const Icon = game.icon
          return (
            <Card key={index} className="bg-black/40 backdrop-blur-sm border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
              <CardHeader>
                <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-center">{game.title}</CardTitle>
                <CardDescription className="text-center">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}>
                    {game.status}
                  </span>
                  <span className="text-gray-400 text-sm">{game.players} players</span>
                </div>
                <Button 
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                  disabled={game.status === 'Development' || game.status === 'Coming Soon'}
                >
                  {game.status === 'Live' ? 'Play Now' : 
                   game.status === 'Beta' ? 'Join Beta' : 
                   'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400">Gaming Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">Earn GAIA tokens while playing</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Multiplayer competitions</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gamepad2 className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Cross-platform compatibility</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">Real-time leaderboards</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-green-400 pl-4">
                <h4 className="text-white font-semibold">Tournament Series</h4>
                <p className="text-gray-400 text-sm">Weekly competitions with token prizes</p>
                <span className="text-green-400 text-xs">Starting Next Week</span>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <h4 className="text-white font-semibold">Beta Launch Event</h4>
                <p className="text-gray-400 text-sm">Exclusive access to new game features</p>
                <span className="text-blue-400 text-xs">Coming This Month</span>
              </div>
              <div className="border-l-2 border-purple-400 pl-4">
                <h4 className="text-white font-semibold">Community Challenge</h4>
                <p className="text-gray-400 text-sm">Global collaboration event</p>
                <span className="text-purple-400 text-xs">Next Quarter</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
