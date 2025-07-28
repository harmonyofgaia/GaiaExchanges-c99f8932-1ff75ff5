
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Users, Globe, Leaf, Star, Trophy, Shield, Gamepad2, Trees, Droplets, Wind, Sun } from 'lucide-react'
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

export default function Home() {
  const [stats, setStats] = useState({
    totalUsers: 12589,
    tokensEarned: 2456789,
    carbonOffset: 15678,
    projectsFunded: 245
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        tokensEarned: prev.tokensEarned + Math.floor(Math.random() * 100),
        carbonOffset: prev.carbonOffset + Math.floor(Math.random() * 10),
        projectsFunded: prev.projectsFunded + Math.floor(Math.random() * 2)
      }))
    }, 3000)

    return () => clearInterval(interval)
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
      <SystemMonitor />
      <CrossPagePersistence />
      <InvisibleEcoIndicator />
      
      <EnhancedBackgroundManager 
        settings={{
          type: 'matrix',
          intensity: 'low',
          color: '#00ff00',
          speed: 0.5,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      {/* Control Buttons */}
      <VisualControlButton />
      <ThemeSelector />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section - Restored Original Design */}
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the revolutionary ecosystem that rewards environmental action, 
              sustainable living, and positive community impact through our GAiA token.
            </p>
          </div>

          {/* Restored Original 2 Button Design */}
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

        {/* Live Stats */}
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

        {/* Features Section - Updated Gaming to Green Investment Examples */}
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

            {/* Changed Gaming to Green Investment Examples */}
            <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Trees className="h-5 w-5" />
                  Green Investment Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span className="text-emerald-300/80">Ocean Cleanup Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="h-4 w-4 text-cyan-400" />
                    <span className="text-emerald-300/80">Wind Energy Farms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <span className="text-emerald-300/80">Solar Panel Installations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trees className="h-4 w-4 text-green-400" />
                    <span className="text-emerald-300/80">Reforestation Programs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
