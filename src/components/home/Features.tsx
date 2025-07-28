
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Pickaxe, 
  Leaf, 
  Shield, 
  Users,
  Globe,
  Coins,
  Heart,
  Target,
  Sparkles,
  Video
} from 'lucide-react'

export function Features() {
  const features = [
    {
      title: "🌍 Environmental Impact",
      description: "Track and contribute to global environmental projects",
      icon: <Globe className="h-8 w-8 text-green-400" />,
      path: "/green-impact-dashboard",
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "💰 Zero-Fee Trading",
      description: "Trade GAiA tokens with absolutely no fees",
      icon: <Coins className="h-8 w-8 text-blue-400" />,
      path: "/exchange",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "🌱 Project Funding",
      description: "Fund environmental projects through decentralized governance",
      icon: <Heart className="h-8 w-8 text-pink-400" />,
      path: "/project-funding",
      color: "from-pink-600 to-rose-600"
    },
    {
      title: "🎯 Eco Missions",
      description: "Complete environmental missions and earn rewards",
      icon: <Target className="h-8 w-8 text-purple-400" />,
      path: "/eco-missions",
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "⛏️ Token Mining",
      description: "Mine GAiA tokens through environmental activities",
      icon: <Pickaxe className="h-8 w-8 text-orange-400" />,
      path: "/token-mining",
      color: "from-orange-600 to-red-600"
    },
    {
      title: "📹 Video Exchange",
      description: "Share environmental content and earn rewards",
      icon: <Video className="h-8 w-8 text-cyan-400" />,
      path: "/secure-admin/video-exchange",
      color: "from-cyan-600 to-teal-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              {feature.icon}
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{feature.description}</p>
            <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90`}>
              Explore Feature
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
