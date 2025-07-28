import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Heart, Zap, Users, Shield, Gamepad2, Wallet } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { WalletConnection } from '@/components/WalletConnection'
import Navbar from '@/components/Navbar'
import { setHomepageVisited } from '@/utils/authAccessControl'

const Index = () => {
  // Track homepage visit for auth access control
  useEffect(() => {
    setHomepageVisited()
  }, [])
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Moving Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-green-400' : 
                i % 4 === 1 ? 'bg-blue-400' : 
                i % 4 === 2 ? 'bg-purple-400' : 
                'bg-cyan-400'
              } blur-sm animate-pulse`} />
            </div>
          ))}
        </div>

        {/* Moving Gradient Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
              🌍 Welcome to GAiA
            </CardTitle>
            <p className="text-center text-2xl text-muted-foreground">
              {GAIA_TOKEN.BRAND_STATEMENT}
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <Badge className="bg-green-600 text-lg px-6 py-2">
                Official GAiA Token Platform
              </Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Start Gaming
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12">
                  <Zap className="h-5 w-5 mr-2" />
                  Access Wallet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Multi-Wallet Connection */}
        <WalletConnection />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-500/30 bg-green-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Globe className="h-6 w-6" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every transaction contributes to real-world environmental restoration projects.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Gamepad2 className="h-6 w-6" />
                Gaming Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Play games, earn tokens, and compete in tournaments while helping the planet.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Shield className="h-6 w-6" />
                Secure Trading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced security protocols protect your assets and transactions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Heart className="h-6 w-6" />
                Community Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join a global community united in environmental restoration.
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Zap className="h-6 w-6" />
                Instant Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Earn GAiA tokens instantly through various platform activities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-pink-500/30 bg-pink-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-400">
                <Users className="h-6 w-6" />
                Global Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with like-minded individuals from around the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(5px) rotate(240deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Index
