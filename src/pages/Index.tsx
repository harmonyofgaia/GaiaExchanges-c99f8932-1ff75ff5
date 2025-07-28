
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GameNavigationHub } from '@/components/gaming/GameNavigationHub'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { 
  Leaf, 
  Heart, 
  Globe, 
  Shield, 
  Coins,
  Users,
  TreePine,
  Sparkles,
  Target,
  Video
} from 'lucide-react'

export default function Index() {
  const { isAdmin } = useSecureAdmin()

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
      title: "🃏 NFT Ecosystem",
      description: "Collect and trade biodiversity-focused NFT cards",
      icon: <Sparkles className="h-8 w-8 text-yellow-400" />,
      path: "/nft-cards",
      color: "from-yellow-600 to-orange-600"
    }
  ]

  // Admin-only features - only shown when user is admin
  const adminFeatures = [
    {
      title: "📹 Video Exchange",
      description: "Share environmental content and earn rewards",
      icon: <Video className="h-8 w-8 text-cyan-400" />,
      path: "/secure-admin/video-exchange",
      color: "from-cyan-600 to-teal-600"
    }
  ]

  // Combine features based on admin status
  const allFeatures = isAdmin ? [...features, ...adminFeatures] : features

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="text-8xl mb-6 animate-bounce">🌍</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Harmony of Gaia
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A decentralized ecosystem where environmental action meets blockchain innovation.
            Join the global movement for planetary healing and sustainable future.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="border-green-500/50 text-green-400 text-lg px-4 py-2">
              <Leaf className="h-4 w-4 mr-2" />
              Carbon Negative
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 text-lg px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Community Governed
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              125k+ Members
            </Badge>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg"
            >
              <TreePine className="h-5 w-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allFeatures.map((feature, index) => (
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

        {/* Gaming Hub */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
              🎮 GAIA Gaming Universe
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience environmental education through immersive gaming
            </p>
          </div>
          <GameNavigationHub />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">12.4K</div>
              <div className="text-muted-foreground">Tons CO₂ Offset</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">247</div>
              <div className="text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">89K</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-orange-400 mb-2">$2.4M</div>
              <div className="text-muted-foreground">Funds Raised</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference? 🌱
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of eco-warriors building a sustainable future through blockchain technology
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-12 py-6 text-xl"
            >
              <Heart className="h-6 w-6 mr-3" />
              Join the Movement
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
