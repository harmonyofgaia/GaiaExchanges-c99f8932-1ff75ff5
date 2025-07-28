
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Video, 
  Coins, 
  TreePine, 
  Bike,
  Mining,
  TrendingUp,
  Users,
  Globe,
  Music
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Gamepad2,
      title: "🎮 Gaming Universe",
      description: "Immersive games that bring joy and rewards",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Video,
      title: "📹 Video Exchange",
      description: "Share creativity, earn rewards, connect souls",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Coins,
      title: "🪙 Coin Crafter",
      description: "Endless GAiA supply for our growing community",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: TreePine,
      title: "🌱 Green Projects",
      description: "Environmental initiatives changing the world",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Bike,
      title: "🚴 GAiA Bike Ecosystem",
      description: "Sustainable transport with earning rewards",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: Mining,
      title: "⛏️ Token Mining",
      description: "Mine tokens while supporting good causes",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500/30"
    },
    {
      icon: TrendingUp,
      title: "📈 Markets",
      description: "Trade with transparency and fairness",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-500/30"
    },
    {
      icon: Music,
      title: "🎵 Seeds to Music",
      description: "Where creativity transforms into melodies",
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/20",
      borderColor: "border-indigo-500/30"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
          🌟 Explore Our Creative Universe
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover all the ways to grow, create, and connect in our massive ecosystem of good vibes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className={`${feature.bgColor} ${feature.borderColor} hover:border-opacity-70 transition-all duration-300 hover:scale-105`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                  <Badge variant="outline" className="text-xs">
                    ACTIVE
                  </Badge>
                </div>
                <CardTitle className={`text-lg ${feature.color}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Community Message */}
      <Card className="bg-gradient-to-r from-green-900/30 to-purple-900/30 border-2 border-purple-500/50">
        <CardContent className="pt-6 text-center space-y-4">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
            🌍 Join Our Global Movement
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We create a new cult till the end of the world. Seeds will form into music. 
            Enjoy this massive good vibration and let's bring a smile to every soul!
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge className="bg-green-600 text-white">
              <Globe className="h-3 w-3 mr-1" />
              Global Impact
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              True Community
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <Music className="h-3 w-3 mr-1" />
              Creative Souls
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
