
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
  Crown,
  Flame,
  Star,
  Brain,
  Lock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'
import { UnifiedDragonSecurity } from '@/components/security/UnifiedDragonSecurity'
import { UnifiedServiceOrchestrator } from '@/components/UnifiedServiceOrchestrator'
import { GAIA_TOKEN } from '@/constants/gaia'

const Home = () => {
  const unifiedServices = UnifiedServiceOrchestrator()

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
      description: "Epic battles with environmental warriors and GAIA rewards",
      color: "from-purple-600 to-pink-600",
      link: "/gaming"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "GAIA Exchange",
      description: "Trade with unbreakable dragon-powered security",
      color: "from-green-600 to-emerald-600",
      link: "/gaias-exchange"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Virtual World",
      description: "Explore the infinite GAIA metaverse with live chat",
      color: "from-blue-600 to-cyan-600",
      link: "/virtual-world"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Dragon Core",
      description: "Advanced AI security that learns and adapts",
      color: "from-cyan-600 to-blue-600",
      link: "/ultimate-security"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Crypto Vault",
      description: "Ultra-secure storage with quantum encryption",
      color: "from-yellow-600 to-orange-600",
      link: "/ultimate-security"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-blue-900/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Dragons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`dragon-${i}`}
            className="absolute text-6xl animate-bounce opacity-20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + Math.sin(i) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            🐉
          </div>
        ))}
        
        {/* Floating Security Shields */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`shield-${i}`}
            className="absolute animate-pulse opacity-10"
            style={{
              left: `${5 + (i * 9)}%`,
              top: `${25 + Math.cos(i) * 40}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
        ))}

        {/* Energy Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-ping opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <Star className="h-3 w-3 text-yellow-400" />
          </div>
        ))}
      </div>

      <RobotAdvertisement />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-red-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-6 animate-pulse">
              🐉 HARMONY OF GAIA 🐉
            </h1>
            <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
              Where Eternal Dragons Guard Digital Realms Forever
            </p>
            
            {/* GAIA Token Display */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto mb-8">
              <div className="text-2xl font-bold text-green-400 mb-2">🚀 POWERED BY GAIA TOKEN</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400 font-semibold">Contract:</span>
                  <code className="ml-2 bg-black/30 px-2 py-1 rounded text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Wallet:</span>
                  <code className="ml-2 bg-black/30 px-2 py-1 rounded text-xs">{GAIA_TOKEN.WALLET_ADDRESS}</code>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                The revolutionary token that powers our entire ecosystem with dragon-level security
              </p>
            </div>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl px-8 py-3 animate-bounce">
                <Flame className="h-5 w-5 mr-2" />
                Dragon Protected
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-8 py-3 animate-pulse">
                <Zap className="h-5 w-5 mr-2" />
                Quantum Secure
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl px-8 py-3 animate-bounce">
                <Crown className="h-5 w-5 mr-2" />
                Forever Invisible
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-8 py-3 animate-pulse">
                <Users className="h-5 w-5 mr-2" />
                Community Driven
              </Badge>
            </div>
          </div>
        </div>

        {/* Eternal Dragon Display */}
        <div className="mb-12">
          <EternalDragonDisplay />
        </div>

        {/* Unified Security Preview */}
        <Card className="mb-12 border-4 border-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-gradient-to-br from-red-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
              🛡️ UNIFIED DRAGON SECURITY PREVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-red-400">∞</div>
                <div className="text-sm text-muted-foreground">Security Power</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">{unifiedServices.activeServices}</div>
                <div className="text-sm text-muted-foreground">Active Services</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-sm text-muted-foreground">Invisibility Level</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-muted-foreground">Dragon Protection</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/ultimate-security">
                <Button className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:opacity-80 text-white text-lg px-12 py-4">
                  <Shield className="h-6 w-6 mr-2" />
                  Enter Dragon Security Fortress
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 hover:scale-105 transform bg-gradient-to-br from-purple-900/20 to-blue-900/20 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardContent className="pt-8">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <div className="text-white">
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
                  <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-80 text-lg py-3`}>
                    Explore Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Power Stats */}
        <Card className="border-4 border-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              🌟 COMMUNITY POWER - HARMONY OF SOULS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-green-400 animate-pulse">87K+</div>
                <div className="text-muted-foreground text-lg">Dragon Guardians</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-400 animate-bounce">∞</div>
                <div className="text-muted-foreground text-lg">Security Level</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-400 animate-pulse">247</div>
                <div className="text-muted-foreground text-lg">Countries</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-orange-400 animate-bounce">24/7</div>
                <div className="text-muted-foreground text-lg">Dragon Protection</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-red-400 animate-pulse">ETERNAL</div>
                <div className="text-muted-foreground text-lg">Dragon Evolution</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-red-900/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
              🚀 JOIN THE ETERNAL REVOLUTION
            </h2>
            <p className="text-2xl text-muted-foreground mb-8">
              Experience the future of secure, dragon-protected digital ecosystems
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link to="/gaming">
                <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-xl px-12 py-4">
                  <Gamepad2 className="h-6 w-6 mr-2" />
                  Start Epic Gaming
                </Button>
              </Link>
              <Link to="/gaias-exchange">
                <Button variant="outline" className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 text-xl px-12 py-4">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Trade GAIA Tokens
                </Button>
              </Link>
              <Link to="/ultimate-security">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-xl px-12 py-4">
                  <Shield className="h-6 w-6 mr-2" />
                  Dragon Security
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
