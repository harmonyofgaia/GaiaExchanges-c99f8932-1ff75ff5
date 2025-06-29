
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Gamepad2, 
  TrendingUp,
  Globe,
  Music,
  Palette
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const FeatureGrid = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Dragon Security",
      description: "Triple-bonded quantum protection that evolves eternally",
      color: "from-red-600 to-orange-600",
      link: "/ultimate-security"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming Arena",
      description: "Epic battles with environmental warriors and GAiA rewards",
      color: "from-purple-600 to-pink-600",
      link: "/gaming"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "GAiA Exchange",
      description: "Trade with unbreakable dragon-powered security",
      color: "from-green-600 to-emerald-600",
      link: "/gaias-exchange"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Virtual World",
      description: "Explore the infinite GAiA metaverse with live chat",
      color: "from-blue-600 to-cyan-600",
      link: "/virtual-world"
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Artist Streaming",
      description: "Live shows, creative content, and fund allocation",
      color: "from-pink-600 to-purple-600",
      link: "/artist-streaming"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Art Marketplace",
      description: "Buy and sell exclusive art with token burning",
      color: "from-cyan-600 to-blue-600",
      link: "/markets"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="relative border-2 border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 hover:scale-105 transform bg-gradient-to-br from-purple-900/20 to-blue-900/20 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden group">
          {/* Artistic background pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-transparent to-cyan-400" />
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-pink-400 to-transparent rounded-full blur-xl animate-pulse" />
          </div>
          
          <CardContent className="pt-8 relative z-10">
            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 mx-auto shadow-lg relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-300`}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
              <div className="text-white relative z-10">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-3 text-white">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-center mb-6 text-lg">
              {feature.description}
            </p>
            <Link to={feature.link}>
              <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-80 text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
                <span className="relative z-10">Explore Now</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
