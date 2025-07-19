import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { WalletConnection } from '@/components/WalletConnection'
import { AdminReverseButton } from '@/components/admin/AdminReverseButton'
import Web3Integration from '@/components/Web3Integration'
import { GitHubIntegration } from '@/components/GitHubIntegration'
import { 
  Leaf, 
  DollarSign, 
  Gamepad2, 
  ShoppingCart, 
  Music,
  Video,
  BarChart3,
  Shield,
  Eye,
  Wallet,
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'

export default function Index() {
  const [gaiaMetrics, setGaiaMetrics] = useState({
    totalUsers: 12847,
    activeProjects: 23,
    tokensBurned: 847392,
    environmentalImpact: 97.3
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    { 
      title: 'Exchange', 
      description: 'Trade GAIA tokens', 
      icon: DollarSign, 
      path: '/exchange',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Gaming', 
      description: 'Play & earn rewards', 
      icon: Gamepad2, 
      path: '/gaming',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Marketplace', 
      description: 'Buy & sell NFTs', 
      icon: ShoppingCart, 
      path: '/marketplace',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Artist Hub', 
      description: 'Upload & stream music', 
      icon: Music, 
      path: '/artist-streaming',
      color: 'from-orange-500 to-red-500'
    },
    { 
      title: 'Video Platform', 
      description: 'Share & earn from videos', 
      icon: Video, 
      path: '/video-upload',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      title: 'Analytics', 
      description: 'Track your progress', 
      icon: BarChart3, 
      path: '/analytics',
      color: 'from-teal-500 to-green-500'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-green-400">Loading GAIA Platform...</h2>
          <p className="text-muted-foreground">Preparing your environmental journey</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AdminReverseButton />
      <BackgroundMusic />
      
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 HARMONY OF GAIA
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The ultimate environmental blockchain platform where creativity meets sustainability. 
            Upload music, create content, trade tokens, and make a real impact on our planet.
          </p>
          
          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-400">{gaiaMetrics.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-blue-400">{gaiaMetrics.activeProjects}</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-purple-400">{gaiaMetrics.tokensBurned.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">GAIA Tokens Burned</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-orange-400">{gaiaMetrics.environmentalImpact}%</div>
                <div className="text-sm text-muted-foreground">Environmental Impact</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gaias-projects">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Leaf className="mr-2 h-5 w-5" />
                Explore Projects
              </Button>
            </Link>
            <Link to="/exchange">
              <Button size="lg" variant="outline">
                <DollarSign className="mr-2 h-5 w-5" />
                Start Trading
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wallet Connection Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <WalletConnection />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            🚀 Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} to={action.path}>
                  <Card className="h-full hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-900/40 to-gray-800/40 border-gray-500/30 hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{action.title}</h3>
                      <p className="text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Web3 Integration */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Web3Integration 
            isConnected={false}
            account={null}
            connectWallet={async () => {}}
            disconnectWallet={() => {}}
            balance={0}
            burnRate={5}
            reinvestRate={15}
            securityLevel="advanced"
            gamingPower={250}
            landscapeNFTs={12}
            weaponNFTs={8}
            armorNFTs={5}
            unknownSecrets={3}
          />
        </div>
      </section>

      {/* GitHub Integration */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <GitHubIntegration />
        </div>
      </section>

      {/* Culture of Harmony Message */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🎵 Culture of Harmony
          </h2>
          <blockquote className="text-2xl italic text-muted-foreground mb-8 max-w-4xl mx-auto">
            "We Are a Strong Creative Open Minded Circuit To Happiness. Seeds Will Form Into Music. 
            We Create a New Cult till the End Of the World. Our Goal is To Bring A Smile to Every Soul."
          </blockquote>
          <p className="text-xl text-green-400 font-semibold mb-8">
            "Doesn't matter if You're Black Or White" - Building Global Unity
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
              🌱 Always Growing
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
              🎨 Creative Freedom
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm">
              🤝 Global Unity
            </Badge>
            <Badge className="bg-orange-600 text-white px-4 py-2 text-sm">
              😊 Smiles for All
            </Badge>
          </div>
        </div>
      </section>
    </div>
  )
}
