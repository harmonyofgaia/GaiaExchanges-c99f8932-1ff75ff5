
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Gamepad2, 
  Crown, 
  Zap, 
  Star, 
  Sparkles,
  Film,
  Rocket,
  Trophy
} from 'lucide-react'
import { GaiaLogo } from '../GaiaLogo'

export function GameUpdatePreview() {
  const upcomingGames = [
    {
      title: "GAiA Fighter Ultimate",
      description: "Enhanced combat system with environmental power-ups and token rewards",
      features: ["Dragon Transformations", "Elemental Combat", "Token Rewards", "Environmental Healing"],
      status: "Coming Soon",
      color: "from-red-600 to-orange-600"
    },
    {
      title: "Harmony Landscape Builder Pro",
      description: "Create stunning 3D worlds with advanced tools and ecological impact tracking",
      features: ["Advanced 3D Tools", "Real-time Physics", "Ecology Simulation", "Community Sharing"],
      status: "In Development",
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Virtual World Explorer",
      description: "Explore infinite procedurally generated worlds with environmental quests",
      features: ["Infinite Worlds", "Environmental Quests", "Creature Companions", "Token Mining"],
      status: "Alpha Testing",
      color: "from-blue-600 to-purple-600"
    }
  ]

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Gamepad2 className="h-6 w-6" />
          🎮 NEXT BIG GAME UPDATES - POWERED BY GAiA
          <Sparkles className="h-6 w-6 animate-spin" />
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Film className="h-4 w-4" />
          All games feature intro movies with Harmony of Gaia branding
          <GaiaLogo size="sm" variant="colorful" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {upcomingGames.map((game, index) => (
          <div key={index} className="bg-black/30 border border-purple-500/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{game.title}</h3>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </div>
              <Badge className={`bg-gradient-to-r ${game.color} text-white`}>
                {game.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {game.features.map((feature, idx) => (
                <div key={idx} className="bg-purple-900/20 border border-purple-500/30 rounded px-2 py-1 text-xs text-center">
                  {feature}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
                <Play className="h-4 w-4 mr-2" />
                Watch Trailer
              </Button>
              <Button size="sm" variant="outline" className="border-purple-500/30">
                <Trophy className="h-4 w-4 mr-2" />
                Pre-Register
              </Button>
            </div>
          </div>
        ))}
        
        <div className="text-center p-4 bg-gradient-to-r from-gold-900/20 to-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold mb-2">
            <Crown className="h-5 w-5" />
            EXCLUSIVE GAiA TOKEN INTEGRATION
            <Crown className="h-5 w-5" />
          </div>
          <p className="text-sm text-yellow-300">
            All games feature token burning mechanics for environmental impact, 
            exclusive NFT rewards, and community-driven ecological projects
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Badge className="bg-green-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Token Burning
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Star className="h-3 w-3 mr-1" />
              NFT Rewards
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <Rocket className="h-3 w-3 mr-1" />
              Eco Impact
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
