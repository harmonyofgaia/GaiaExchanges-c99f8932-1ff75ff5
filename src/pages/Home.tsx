
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
  Lock,
  Palette,
  Music
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'
import { UnifiedServiceOrchestrator } from '@/components/UnifiedServiceOrchestrator'
import { GAIA_TOKEN } from '@/constants/gaia'
import { AbstractArtOverlay } from '@/components/ui/abstract-art-overlay'

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Art Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Primary abstract background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/40" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/4 right-20 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-none rotate-45 blur-2xl animate-bounce" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-none rotate-12 blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Neural network patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <circle 
                cx={`${Math.random() * 100}%`} 
                cy={`${Math.random() * 100}%`} 
                r="2" 
                fill="url(#neuralGradient)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <line
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#neuralGradient)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Abstract art overlay */}
        <AbstractArtOverlay intensity="medium" artType="quantum" />
      </div>

      {/* Floating Abstract Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Floating artistic elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`art-${i}`}
            className="absolute opacity-60"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + Math.sin(i) * 30}%`,
              animation: `float-up 4s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className={`w-4 h-4 ${i % 4 === 0 ? 'bg-purple-400' : i % 4 === 1 ? 'bg-cyan-400' : i % 4 === 2 ? 'bg-pink-400' : 'bg-green-400'} rounded-full blur-sm`} />
          </div>
        ))}
        
        {/* Abstract energy trails */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute w-1 h-32 bg-gradient-to-t from-transparent via-purple-400/30 to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <RobotAdvertisement />
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Artistic Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Background art for title */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 blur-sm">
              HARMONY
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
            <h1 className="text-7xl font-bold mb-6 relative">
              {/* Artistic text effect */}
              <span className="absolute inset-0 text-7xl font-bold bg-gradient-to-r from-red-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent blur-sm animate-pulse">
                🐉 HARMONY OF GAiA 🐉
              </span>
              <span className="relative text-7xl font-bold bg-gradient-to-r from-red-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                🐉 HARMONY OF GAiA 🐉
              </span>
            </h1>
            
            {/* Artistic subtitle with layered effects */}
            <div className="relative">
              <p className="text-3xl mb-8 relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-light">
                  Where Eternal Dragons Guard Digital Realms Forever
                </span>
              </p>
              {/* Abstract accent lines */}
              <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent transform -translate-y-1/2" />
            </div>
            
            {/* Enhanced GAiA Token Display with artistic frame */}
            <div className="relative mb-8">
              {/* Artistic frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur-sm" />
              <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
                <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                  🚀 POWERED BY GAiA TOKEN
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                    <span className="text-green-400 font-semibold">Contract:</span>
                    <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                    <span className="text-blue-400 font-semibold">Wallet:</span>
                    <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.WALLET_ADDRESS}</code>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-center italic">
                  The revolutionary token that powers our entire ecosystem with dragon-level security
                </p>
              </div>
            </div>
            
            {/* Artistic badges with enhanced effects */}
            <div className="flex justify-center gap-6 flex-wrap">
              <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-red-500/25 border border-red-400/30">
                <Flame className="h-5 w-5 mr-2" />
                Dragon Protected
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-blue-500/25 border border-blue-400/30">
                <Zap className="h-5 w-5 mr-2" />
                Quantum Secure
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-green-500/25 border border-green-400/30">
                <Crown className="h-5 w-5 mr-2" />
                Forever Invisible
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-purple-500/25 border border-purple-400/30">
                <Users className="h-5 w-5 mr-2" />
                Community Driven
              </Badge>
            </div>
          </div>
        </div>

        {/* ETERNAL DRAGON with artistic enhancement */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-xl" />
          <div className="relative">
            <EternalDragonDisplay />
          </div>
        </div>

        {/* Enhanced Features Grid with artistic cards */}
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

        {/* Artistic Community Power Stats */}
        <Card className="border-4 border-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 mb-12 relative overflow-hidden">
          {/* Abstract art background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400 via-blue-400 to-purple-400" />
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              🌟 COMMUNITY POWER - HARMONY OF SOULS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/10 rounded-lg blur-sm" />
                <div className="relative p-4">
                  <div className="text-5xl font-bold text-green-400 animate-pulse">87K+</div>
                  <div className="text-muted-foreground text-lg">Dragon Guardians</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-sm" />
                <div className="relative p-4">
                  <div className="text-5xl font-bold text-blue-400 animate-bounce">∞</div>
                  <div className="text-muted-foreground text-lg">Security Level</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400/10 rounded-lg blur-sm" />
                <div className="relative p-4">
                  <div className="text-5xl font-bold text-purple-400 animate-pulse">247</div>
                  <div className="text-muted-foreground text-lg">Countries</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400/10 rounded-lg blur-sm" />
                <div className="relative p-4">
                  <div className="text-5xl font-bold text-orange-400 animate-bounce">24/7</div>
                  <div className="text-muted-foreground text-lg">Dragon Protection</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-red-400/10 rounded-lg blur-sm" />
                <div className="relative p-4">
                  <div className="text-5xl font-bold text-red-400 animate-pulse">ETERNAL</div>
                  <div className="text-muted-foreground text-lg">Dragon Evolution</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artistic Call to Action */}
        <Card className="border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-red-900/30 mb-8 relative overflow-hidden">
          {/* Animated abstract background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          
          <CardContent className="pt-12 pb-12 text-center relative z-10">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6 relative">
              🚀 JOIN THE ETERNAL REVOLUTION
            </h2>
            <p className="text-2xl text-muted-foreground mb-8">
              Experience the future of secure, dragon-protected digital ecosystems
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link to="/gaming">
                <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
                  <Gamepad2 className="h-6 w-6 mr-2 relative z-10" />
                  <span className="relative z-10">Start Epic Gaming</span>
                </Button>
              </Link>
              <Link to="/gaias-exchange">
                <Button variant="outline" className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent group-hover:from-green-400/10 transition-all duration-300" />
                  <TrendingUp className="h-6 w-6 mr-2 relative z-10" />
                  <span className="relative z-10">Trade GAiA Tokens</span>
                </Button>
              </Link>
              <Link to="/artist-streaming">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
                  <Music className="h-6 w-6 mr-2 relative z-10" />
                  <span className="relative z-10">Artist Streaming</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Dragon Security Preview */}
        <Card className="border-2 border-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-gradient-to-br from-red-900/10 to-purple-900/10 relative overflow-hidden">
          {/* Subtle artistic background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400" />
            <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
              🛡️ UNIFIED DRAGON SECURITY STATS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div className="p-3 bg-red-500/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-red-400">∞</div>
                <div className="text-xs text-muted-foreground">Security Power</div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-purple-400">{unifiedServices.activeServices}</div>
                <div className="text-xs text-muted-foreground">Active Services</div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-blue-400">100%</div>
                <div className="text-xs text-muted-foreground">Invisibility Level</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-green-400">24/7</div>
                <div className="text-xs text-muted-foreground">Dragon Protection</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/ultimate-security">
                <Button size="sm" className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:opacity-80 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
                  <Shield className="h-4 w-4 mr-2 relative z-10" />
                  <span className="relative z-10">Enter Security Fortress</span>
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
