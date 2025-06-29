
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Shield, 
  Gamepad2, 
  TrendingUp,
  Users,
  Globe,
  Zap,
  Crown
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'

const Home = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Dragon Security",
      description: "Quantum-level protection that never stops evolving",
      color: "from-red-600 to-orange-600",
      link: "/ultimate-security"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming Arena",
      description: "Epic battles with environmental warriors",
      color: "from-purple-600 to-pink-600",
      link: "/gaming"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "GAIA Exchange",
      description: "Trade with dragon-powered security",
      color: "from-green-600 to-emerald-600",
      link: "/gaias-exchange"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Virtual World",
      description: "Explore the GAIA metaverse",
      color: "from-blue-600 to-cyan-600",
      link: "/virtual-world"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <RobotAdvertisement />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🌍 HARMONY OF GAIA
            </h1>
            <p className="text-2xl text-muted-foreground mb-6">
              Where Dragons Guard Digital Realms
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white text-lg px-6 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Dragon Protected
              </Badge>
              <Badge className="bg-blue-600 text-white text-lg px-6 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Quantum Secure
              </Badge>
              <Badge className="bg-purple-600 text-white text-lg px-6 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Community Driven
              </Badge>
            </div>
          </div>
        </div>

        {/* Eternal Dragon Display */}
        <div className="mb-12">
          <EternalDragonDisplay />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-muted/50 hover:border-purple-500/50 transition-colors hover:scale-105 transform duration-200">
              <CardContent className="pt-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 mx-auto`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {feature.description}
                </p>
                <Link to={feature.link}>
                  <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-80`}>
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <Card className="border-gradient-to-r from-green-500/30 to-blue-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 Community Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-green-400">47K+</div>
                <div className="text-muted-foreground">Dragon Guardians</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400">∞</div>
                <div className="text-muted-foreground">Security Level</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">156</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400">24/7</div>
                <div className="text-muted-foreground">Dragon Protection</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <CardContent className="pt-8 text-center">
            <h2 className="text-3xl font-bold text-purple-400 mb-4">
              🚀 Join the Revolution
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experience the future of secure, community-driven digital ecosystems
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/gaming">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Start Gaming
                </Button>
              </Link>
              <Link to="/gaias-exchange">
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 text-lg px-8 py-3">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trade GAIA
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
