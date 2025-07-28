
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HoverSidebar from '@/components/HoverSidebar'
import { GameNavigationHub } from '@/components/gaming/GameNavigationHub'
import { GaiaGameHub } from '@/components/gaming/GaiaGameHub'
import { EnhancedGamingModes } from '@/components/gaming/EnhancedGamingModes'
import { Link } from 'react-router-dom'
import { Gamepad2, Crown, Users, Star, Building2, Target, Sparkles, Rocket } from 'lucide-react'

const Gaming = () => {
  const featuredGames = [
    {
      title: "🌍 GAIA Fantasy MMORPG",
      path: "/game/gaia-fantasy-mmorpg",
      description: "Massive multiplayer environmental adventure with real impact",
      icon: <Crown className="h-6 w-6" />,
      color: "from-green-600 to-blue-600",
      players: "28,934"
    },
    {
      title: "🥊 Gaia Fighter",
      path: "/gaia-fighter-game",
      description: "Environmental warrior combat with global tournaments",
      icon: <Target className="h-6 w-6" />,
      color: "from-red-600 to-orange-600",
      players: "15,247"
    },
    {
      title: "🏨 Habbo Tycoon",
      path: "/game",
      description: "Build your virtual hotel empire with environmental themes",
      icon: <Building2 className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600",
      players: "9,876"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8 space-y-8">
          {/* Main Gaming Header */}
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🎮 GAIA Gaming Universe - Complete Ecosystem
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                All games, features and modes in one unified hub
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  🚀 ALL SYSTEMS ACTIVE
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  🌍 BLOCKCHAIN POWERED
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Featured Games Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredGames.map((game, index) => (
              <Card key={index} className={`border-2 bg-gradient-to-br ${game.color}/20 hover:scale-105 transition-all cursor-pointer`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {game.icon}
                    {game.title}
                  </CardTitle>
                  <div className="text-sm text-blue-300">👥 {game.players} active players</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{game.description}</p>
                  <Link to={game.path}>
                    <Button className={`w-full bg-gradient-to-r ${game.color} text-white font-bold`}>
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      LAUNCH NOW
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Unified Gaming Tabs */}
          <Tabs defaultValue="hub" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/20 mb-8">
              <TabsTrigger value="hub" className="data-[state=active]:bg-purple-600">
                <Crown className="h-4 w-4 mr-2" />
                🎮 Game Hub
              </TabsTrigger>
              <TabsTrigger value="navigation" className="data-[state=active]:bg-blue-600">
                <Gamepad2 className="h-4 w-4 mr-2" />
                🚀 Navigation
              </TabsTrigger>
              <TabsTrigger value="enhanced" className="data-[state=active]:bg-green-600">
                <Sparkles className="h-4 w-4 mr-2" />
                🔥 Enhanced Modes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hub" className="space-y-6">
              <GaiaGameHub />
            </TabsContent>

            <TabsContent value="navigation" className="space-y-6">
              <GameNavigationHub />
            </TabsContent>

            <TabsContent value="enhanced" className="space-y-6">
              <EnhancedGamingModes />
            </TabsContent>
          </Tabs>

          {/* Gaming Statistics */}
          <Card className="mt-8 border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🏆 Live Gaming Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">43,126</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Gamepad2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">12+</div>
                  <div className="text-sm text-muted-foreground">Games Available</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">1,247,561</div>
                  <div className="text-sm text-muted-foreground">High Scores</div>
                </div>
                <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                  <Crown className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">2,847</div>
                  <div className="text-sm text-muted-foreground">Tournaments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Integration Status */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">⛓️ GAIA Blockchain Network Status</h4>
            <div className="text-sm text-green-300">
              ✅ Private blockchain network operational as gaming motherboard<br/>
              ✅ All games connected to GAIA token system<br/>
              ✅ Real-time environmental impact tracking via blockchain<br/>
              ✅ Secure player data and achievements on-chain<br/>
              ✅ Cross-game token transfers and rewards active
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gaming
