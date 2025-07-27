
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Globe, 
  Users, 
  Zap, 
  Heart, 
  Shield,
  Star,
  TrendingUp,
  Award,
  Target,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { LiveEarningsDisplay } from '@/components/earnings/LiveEarningsDisplay'
import { EcoMissionCard } from '@/components/missions/EcoMissionCard'
import { getCurrentQuarterAndYear, getNextQuarter } from '@/utils/dateUtils'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [currentStats, setCurrentStats] = useState({
    totalUsers: 125847,
    carbonSaved: 2847.5,
    tokensEarned: 1456789,
    ecoMissions: 45,
    communityProjects: 23,
    globalImpact: 89.7
  })

  const [currentQuarter, setCurrentQuarter] = useState(getCurrentQuarterAndYear())
  const [nextQuarter, setNextQuarter] = useState(getNextQuarter())
  const navigate = useNavigate()

  useEffect(() => {
    // Update stats periodically
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        carbonSaved: prev.carbonSaved + Math.random() * 5,
        tokensEarned: prev.tokensEarned + Math.floor(Math.random() * 1000),
        globalImpact: Math.min(100, prev.globalImpact + Math.random() * 0.5)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const ecoMissions = [
    {
      id: '1',
      title: 'Plant a Tree',
      description: 'Help reforest our planet by planting trees in your community',
      reward: 50,
      difficulty: 'Easy' as const,
      category: 'Environmental' as const,
      timeEstimate: '1 hour',
      impact: 'High' as const,
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: '2',
      title: 'Reduce Energy Usage',
      description: 'Lower your energy consumption by 20% this month',
      reward: 100,
      difficulty: 'Medium' as const,
      category: 'Energy' as const,
      timeEstimate: '1 month',
      impact: 'Very High' as const,
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: '3',
      title: 'Community Cleanup',
      description: 'Organize or participate in a local cleanup event',
      reward: 75,
      difficulty: 'Medium' as const,
      category: 'Community' as const,
      timeEstimate: '3 hours',
      impact: 'High' as const,
      icon: <Users className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/10 dark:to-blue-900/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <UniversalGaiaLogo 
              size="xl" 
              animated={true} 
              showText={true}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6">
              Welcome to GAiA Exchanges
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your environmental actions into rewards while building a sustainable future for our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate('/missions')}
              >
                <Leaf className="mr-2 h-5 w-5" />
                Start Your Eco Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/community')}
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter value={currentStats.totalUsers} />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  <AnimatedCounter value={currentStats.carbonSaved} decimals={1} />t
                </div>
                <div className="text-sm text-muted-foreground">Carbon Saved</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">
                  <AnimatedCounter value={currentStats.tokensEarned} />
                </div>
                <div className="text-sm text-muted-foreground">Tokens Earned</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  <AnimatedCounter value={currentStats.ecoMissions} />
                </div>
                <div className="text-sm text-muted-foreground">Eco Missions</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter value={currentStats.communityProjects} />
                </div>
                <div className="text-sm text-muted-foreground">Community Projects</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-600">
                  <AnimatedCounter value={currentStats.globalImpact} decimals={1} />%
                </div>
                <div className="text-sm text-muted-foreground">Global Impact</div>
              </CardContent>
            </Card>
          </div>

          {/* Current Quarter Display */}
          <div className="text-center mb-8">
            <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800">
              Q{currentQuarter.quarter} {currentQuarter.year} - Building Sustainable Future
            </Badge>
          </div>
        </div>
      </section>

      {/* Live Earnings Display */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <LiveEarningsDisplay />
        </div>
      </section>

      {/* Featured Eco Missions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Eco Missions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete missions to earn tokens and make a positive impact on our planet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <EcoMissionCard mission={mission} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/missions')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              View All Missions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quarterly Goals */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900/10 to-blue-900/10">
        <div className="container mx-auto">
          <Card className="border-2 border-green-500/20 bg-gradient-to-r from-green-900/5 to-blue-900/5">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl text-green-700 dark:text-green-400">
                🌱 Q{nextQuarter.quarter} {nextQuarter.year} Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1M</div>
                  <div className="text-sm text-muted-foreground">Trees Planted</div>
                  <Progress value={75} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500K</div>
                  <div className="text-sm text-muted-foreground">Carbon Tons Saved</div>
                  <Progress value={60} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100K</div>
                  <div className="text-sm text-muted-foreground">Community Members</div>
                  <Progress value={85} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of eco-warriors who are already making a positive impact on our planet
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              onClick={() => navigate('/register')}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
