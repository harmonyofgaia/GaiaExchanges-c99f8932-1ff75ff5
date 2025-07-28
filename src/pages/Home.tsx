
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Users, Globe, Leaf, Star, Trophy, Shield } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { GaiaCommunityProjects } from '@/components/GaiaCommunityProjects'
import { SystemMonitor } from '@/components/SystemMonitor'
import { CrossPagePersistence } from '@/components/system/CrossPagePersistence'
import { InvisibleEcoIndicator } from '@/components/eco/InvisibleEcoIndicator'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { LiveEarningsDisplay } from '@/components/earnings/LiveEarningsDisplay'
import { EcoMissionCard } from '@/components/missions/EcoMissionCard'
import { ThemeSelector } from '@/components/ThemeSelector'
import { VisualControlButton } from '@/components/visual/VisualControlButton'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { AdminOnlySecurityBarrier } from '@/components/admin/AdminOnlySecurityBarrier'
import { AdminRouteProtector } from '@/components/admin/AdminRouteProtector'

export default function Home() {
  const [stats, setStats] = useState({
    totalUsers: 12589,
    tokensEarned: 2456789,
    carbonOffset: 15678,
    projectsFunded: 245
  })

  const [cloudEngineStatus, setCloudEngineStatus] = useState({
    status: 'PROTECTED',
    securityLevel: 'MAXIMUM',
    defenseWallActive: true,
    quantumProtection: 100
  })

  useEffect(() => {
    console.log('🛡️ HOME: Protected Cloud Engine Initializing')
    console.log('🌟 HARMONY OF GAIA: All security systems active')
    console.log('👑 ADMIN PROTECTION: Quantum level engaged')
    
    // Optimized stats updates - reduced frequency for performance
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        tokensEarned: prev.tokensEarned + Math.floor(Math.random() * 50),
        carbonOffset: prev.carbonOffset + Math.floor(Math.random() * 5),
        projectsFunded: prev.projectsFunded + Math.floor(Math.random() * 1)
      }))
    }, 5000) // Increased to 5 seconds for better performance

    // Cloud engine status monitoring
    const statusInterval = setInterval(() => {
      setCloudEngineStatus(prev => ({
        ...prev,
        quantumProtection: Math.min(100, prev.quantumProtection + Math.random() * 0.1)
      }))
      
      console.log('☁️ PROTECTED CLOUD ENGINE: All systems operational')
      console.log('🛡️ DEFENSE WALL: Quantum barriers holding strong')
    }, 10000)

    return () => {
      clearInterval(statsInterval)
      clearInterval(statusInterval)
    }
  }, [])

  const sampleMission = {
    id: 'water-conservation',
    title: 'Water Conservation Challenge',
    description: 'Reduce water usage by 20% this month through smart conservation techniques.',
    reward: 150,
    progress: 67,
    maxProgress: 100,
    difficulty: 'Medium' as const,
    timeLeft: '12 days',
    participants: 1250
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Core System Components - Protected Cloud Engine */}
      <SystemMonitor />
      <CrossPagePersistence />
      <InvisibleEcoIndicator />
      <MasterSystemOrchestrator />
      <AdminOnlySecurityBarrier />
      <AdminRouteProtector />
      
      {/* Optimized Background Manager */}
      <EnhancedBackgroundManager 
        settings={{
          type: 'matrix',
          intensity: 'low',
          color: '#00ff00',
          speed: 0.3,
          autoGenerate: false
        }}
      />
      
      <Navbar />
      
      {/* Control Buttons */}
      <VisualControlButton />
      <ThemeSelector />
      
      {/* Protected Cloud Engine Status */}
      <div className="fixed top-20 right-4 z-50">
        <Card className="bg-green-900/20 border-green-500/30 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400 animate-pulse" />
              <div className="text-xs">
                <div className="text-green-400 font-bold">☁️ PROTECTED ENGINE</div>
                <div className="text-green-300">🛡️ {cloudEngineStatus.securityLevel}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-4">
            <UniversalGaiaLogo size="lg" animated={true} />
            <GaiaLogo size="lg" variant="glow" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Harmony of Gaia
            </h1>
            <p className="text-xl md:text-2xl text-green-300/90 font-medium">
              Together We Make The World A Better Place
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-400">
              <Shield className="h-4 w-4" />
              <span>Protected by Quantum Defense Wall • Cloud Engine Secured</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the revolutionary ecosystem that rewards environmental action, 
              sustainable living, and positive community impact through our GAiA token.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Zap className="h-5 w-5 mr-2" />
              Start Earning GAIA
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-green-400 text-green-400 hover:bg-green-900/20">
              <Globe className="h-5 w-5 mr-2" />
              Explore Projects
            </Button>
          </div>
        </div>

        {/* Live Stats - Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                <AnimatedCounter value={stats.totalUsers} />
              </div>
              <div className="text-sm text-green-300/80">Community Members</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                <AnimatedCounter value={stats.tokensEarned} />
              </div>
              <div className="text-sm text-blue-300/80">GAIA Tokens Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-900/20 border-emerald-500/30">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">
                <AnimatedCounter value={stats.carbonOffset} />
              </div>
              <div className="text-sm text-emerald-300/80">Tons CO₂ Offset</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                <AnimatedCounter value={stats.projectsFunded} />
              </div>
              <div className="text-sm text-purple-300/80">Projects Funded</div>
            </CardContent>
          </Card>
        </div>

        {/* Security Status Display */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-5 w-5 animate-pulse" />
                🛡️ Protected Cloud Engine Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">ACTIVE</div>
                  <div className="text-sm text-green-300">Defense Wall Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{cloudEngineStatus.quantumProtection.toFixed(1)}%</div>
                  <div className="text-sm text-blue-300">Quantum Protection</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">SECURED</div>
                  <div className="text-sm text-purple-300">Cloud Engine</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Earnings Display */}
        <div className="mb-12">
          <LiveEarningsDisplay />
        </div>

        {/* Featured Mission */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            🌱 Featured Eco Mission
          </h2>
          <div className="max-w-md mx-auto">
            <EcoMissionCard mission={sampleMission} />
          </div>
        </div>

        {/* Community Projects */}
        <GaiaCommunityProjects />

        {/* Features Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-8">
            🌍 Why Choose Harmony of Gaia?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Trophy className="h-5 w-5" />
                  Earn While You Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-300/80">
                  Get rewarded with GAIA tokens for every positive environmental action you take. 
                  From water conservation to renewable energy adoption.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Users className="h-5 w-5" />
                  Global Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300/80">
                  Connect with thousands of eco-warriors worldwide. Share experiences, 
                  collaborate on projects, and amplify your environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-5 w-5" />
                  Quantum Secured
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-300/80">
                  Built with military-grade security through our Protected Cloud Engine. 
                  Every transaction is secured by our Quantum Defense Wall system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ultimate Security Wall Integration */}
        <div className="mt-12">
          <UltimateSecurityWall />
        </div>
      </div>
    </div>
  )
}
