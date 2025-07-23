
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import HoverSidebar from '@/components/HoverSidebar'
import { Link } from 'react-router-dom'
import { Gamepad2, Zap, Crown, Sword, Users, Star, Building2, Trophy, Leaf, Award, Globe, Target } from 'lucide-react'

const Gaming = () => {
  const games = [
    {
      title: "🏨 Habbo Tycoon",
      path: "/game/habbo-tycoon", 
      description: "Environmental hotel management with real-world impact",
      icon: <Building2 className="h-6 w-6" />,
      color: "from-emerald-600 to-green-600",
      featured: true,
      new: true,
      ecoReward: "Plant trees for each eco-upgrade"
    },
    {
      title: "🌍 GAIA Fantasy MMORPG",
      path: "/game/gaia-fantasy-mmorpg",
      description: "Massive multiplayer environmental adventure with achievements",
      icon: <Crown className="h-6 w-6" />,
      color: "from-green-600 to-blue-600",
      featured: true,
      multiplayer: true,
      ecoReward: "Real trees planted through gameplay"
    },
    {
      title: "🐍 Snake Arena",
      path: "/game/snake-arena",
      description: "Competitive snake battles with coral reef restoration",
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600",
      multiplayer: true,
      ecoReward: "Coral reef protection per victory"
    },
    {
      title: "🥊 Gaia Fighter",
      path: "/gaia-fighter-game",
      description: "Environmental warrior combat with ocean cleanup rewards",
      icon: <Sword className="h-6 w-6" />,
      color: "from-red-600 to-orange-600",
      achievements: true,
      ecoReward: "Ocean plastic removal per fight"
    },
    {
      title: "🎮 Game Hub",
      path: "/game",
      description: "Access all games with cross-game progression",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "from-blue-600 to-cyan-600",
      achievements: true,
      ecoReward: "Global environmental impact tracking"
    }
  ]

  const achievements = [
    {
      title: "🌱 Eco Pioneer",
      description: "Complete 100 environmental challenges across all games",
      progress: 73,
      reward: "500 GAIA tokens + Tree planting certificate"
    },
    {
      title: "🏆 Gaming Champion",
      description: "Reach top 10% in any multiplayer game",
      progress: 45,
      reward: "Exclusive NFT badge + Carbon offset credits"
    },
    {
      title: "🌍 Global Impact Hero",
      description: "Contribute to 10 real-world environmental projects",
      progress: 90,
      reward: "1000 GAIA tokens + UN recognition certificate"
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

          {/* Featured Games */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-green-900/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                  <Building2 className="h-6 w-6 animate-pulse" />
                  🆕 NEW: Habbo Tycoon
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-emerald-300 mb-4">
                  Build and manage your own eco-friendly hotel empire! Every upgrade contributes to real environmental projects.
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge className="bg-green-600">🌱 Eco-Rewards</Badge>
                  <Badge className="bg-blue-600">🏗️ Management</Badge>
                  <Badge className="bg-purple-600">🌍 Real Impact</Badge>
                </div>
                <Link to="/game/habbo-tycoon">
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 px-8">
                    <Building2 className="h-5 w-5 mr-2" />
                    🏨 BUILD YOUR ECO-HOTEL
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-green-400 flex items-center justify-center gap-2">
                  <Star className="h-6 w-6 animate-pulse" />
                  🌟 FEATURED: GAIA Fantasy MMORPG
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-green-300 mb-4">
                  The ultimate environmental fantasy adventure with multiplayer quests and achievement systems!
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge className="bg-blue-600">👥 Multiplayer</Badge>
                  <Badge className="bg-yellow-600">🏆 Achievements</Badge>
                  <Badge className="bg-green-600">🌱 Mobile Ready</Badge>
                </div>
                <Link to="/game/gaia-fantasy-mmorpg">
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8">
                    <Crown className="h-5 w-5 mr-2" />
                    🌍 PLAY GAIA MMORPG
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {games.map((game, index) => (
              <Card key={index} className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    {game.icon}
                    {game.title}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {game.featured && (
                      <Badge className="bg-yellow-600 text-white animate-pulse">
                        ⭐ FEATURED
                      </Badge>
                    )}
                    {game.new && (
                      <Badge className="bg-emerald-600 text-white">
                        🆕 NEW
                      </Badge>
                    )}
                    {game.multiplayer && (
                      <Badge className="bg-blue-600 text-white">
                        👥 Multiplayer
                      </Badge>
                    )}
                    {game.achievements && (
                      <Badge className="bg-purple-600 text-white">
                        🏆 Achievements
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    {game.description}
                  </p>
                  {game.ecoReward && (
                    <div className="bg-green-900/30 p-2 rounded border border-green-500/30 mb-4">
                      <div className="text-xs text-green-300 font-medium">🌱 Eco Reward:</div>
                      <div className="text-xs text-green-400">{game.ecoReward}</div>
                    </div>
                  )}
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

          {/* Cross-Game Achievements */}
          <Card className="mb-8 border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                🏆 Cross-Game Achievement System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="border-purple-500/20 bg-purple-900/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-300">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-purple-400 mb-3">{achievement.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-300">Progress</span>
                          <span className="text-purple-200">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-400 font-medium">
                          🎁 {achievement.reward}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Gaming Stats */}
          <Card className="mb-8 border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Award className="h-6 w-6" />
                🏆 Enhanced Gaming Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">18,547</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Gamepad2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-sm text-muted-foreground">Available Games</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">45,892</div>
                  <div className="text-sm text-muted-foreground">Achievements Unlocked</div>
                </div>
                <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                  <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">2,156</div>
                  <div className="text-sm text-muted-foreground">Tournaments Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile & Cross-Platform Features */}
          <Card className="mb-8 border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                📱 Mobile & Cross-Platform Gaming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-300 font-bold mb-2">📱 Mobile Optimized</h4>
                  <ul className="text-sm text-cyan-400 space-y-1">
                    <li>• Touch-friendly controls</li>
                    <li>• Responsive design</li>
                    <li>• Battery optimization</li>
                    <li>• Offline mode support</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-300 font-bold mb-2">🌐 Cross-Platform</h4>
                  <ul className="text-sm text-blue-400 space-y-1">
                    <li>• Play on any device</li>
                    <li>• Cloud save sync</li>
                    <li>• Cross-platform multiplayer</li>
                    <li>• Universal achievements</li>
                  </ul>
                </div>
                
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-300 font-bold mb-2">🏆 Multiplayer Features</h4>
                  <ul className="text-sm text-purple-400 space-y-1">
                    <li>• Real-time tournaments</li>
                    <li>• Guild systems</li>
                    <li>• Voice chat support</li>
                    <li>• Global leaderboards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Environmental Impact */}
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Leaf className="h-6 w-6" />
                🌍 Enhanced Environmental Gaming Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-green-400 mb-3">🌱 Real-World Impact Through Gaming:</h4>
                  <div className="text-sm text-green-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>🏨 Habbo Tycoon:</span>
                      <span className="font-bold">3,200 trees planted</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🌍 GAIA MMORPG:</span>
                      <span className="font-bold">18,500 trees planted</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🐍 Snake Arena:</span>
                      <span className="font-bold">4,800m² coral restored</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🥊 Gaia Fighter:</span>
                      <span className="font-bold">750 tons plastic removed</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-blue-400 mb-3">🏆 Enhanced Eco-Reward Systems:</h4>
                  <div className="text-sm text-blue-300 space-y-2">
                    <div>• Cross-game achievement unlocks</div>
                    <div>• Multiplayer environmental challenges</div>
                    <div>• Mobile gaming with full rewards</div>
                    <div>• Real-time impact tracking</div>
                    <div>• Community goal participation</div>
                    <div>• NFT rewards for eco-achievements</div>
                    <div>• Global tournament eco-prizes</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-lg border border-green-500/30">
                <h4 className="font-bold text-yellow-400 mb-2">🎯 Community Environmental Goals</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-green-300 font-medium">Current Campaign:</div>
                    <div className="text-green-200 font-bold">Plant 100,000 Trees</div>
                    <div className="text-green-400">Progress: 67,245/100,000</div>
                  </div>
                  <div>
                    <div className="text-blue-300 font-medium">Ocean Protection:</div>
                    <div className="text-blue-200 font-bold">10,000m² Coral Reef</div>
                    <div className="text-blue-400">Progress: 8,456/10,000</div>
                  </div>
                  <div>
                    <div className="text-purple-300 font-medium">Plastic Cleanup:</div>
                    <div className="text-purple-200 font-bold">2,000 Tons Removed</div>
                    <div className="text-purple-400">Progress: 1,247/2,000</div>
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
