
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Leaf, 
  TreePine, 
  Droplets, 
  Award, 
  TrendingUp, 
  Globe,
  Zap,
  Heart,
  Target,
  Star,
  Brain,
  Satellite,
  BarChart3,
  Trophy
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

interface ImpactMetrics {
  carbonOffset: number
  treesPlanted: number
  oceanCleanup: number
  biodiversityScore: number
  totalTokensEarned: number
  completedMissions: number
  greenProjectsFunded: number
  currentLevel: number
  globalRank?: number
  weeklyGrowth?: number
  monthlyGrowth?: number
  aiPredictedImpact?: number
}

interface GlobalLeaderboard {
  rank: number
  username: string
  totalImpact: number
  specialization: string
}

interface AIInsight {
  id: string
  title: string
  description: string
  recommendation: string
  impactPotential: number
  confidence: number
}

export default function GreenImpactDashboard() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    carbonOffset: 0,
    treesPlanted: 0,
    oceanCleanup: 0,
    biodiversityScore: 0,
    totalTokensEarned: 0,
    completedMissions: 0,
    greenProjectsFunded: 0,
    currentLevel: 1,
    globalRank: 0,
    weeklyGrowth: 0,
    monthlyGrowth: 0,
    aiPredictedImpact: 0
  })
  const [loading, setLoading] = useState(true)
  const [achievements, setAchievements] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<GlobalLeaderboard[]>([])
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [realTimeData, setRealTimeData] = useState({
    globalCO2Offset: 2847352,
    globalTreesPlanted: 8934567,
    activeUsers: 45678,
    dailyGrowth: 3.2
  })

  useEffect(() => {
    if (user) {
      loadImpactMetrics()
      loadAchievements()
      loadGlobalLeaderboard()
      loadAIInsights()
      loadRealTimeData()
    }
  }, [user])

  const loadImpactMetrics = async () => {
    try {
      // Load environmental impact data
      const { data: envData } = await supabase
        .from('environmental_impact')
        .select('*')
        .eq('user_id', user!.id)

      // Load eco missions data
      const { data: missionsData } = await supabase
        .from('eco_missions')
        .select('*')
        .eq('user_id', user!.id)

      // Load planet cleaning rewards
      const { data: cleaningData } = await supabase
        .from('planet_cleaning_rewards')
        .select('*')
        .eq('user_id', user!.id)

      // Calculate enhanced metrics with Master Plan v7 features
      const carbonOffset = envData?.reduce((sum, item) => sum + (item.carbon_offset || 0), 0) || 0
      const treesPlanted = envData?.reduce((sum, item) => sum + (item.trees_planted || 0), 0) || 0
      const oceanCleanup = envData?.reduce((sum, item) => sum + (item.ocean_cleanup_contribution || 0), 0) || 0
      const completedMissions = missionsData?.filter(m => m.status === 'completed').length || 0
      const totalTokensEarned = cleaningData?.reduce((sum, item) => sum + (item.tokens_earned || 0), 0) || 0
      
      // Enhanced v7 metrics
      const biodiversityScore = Math.floor(carbonOffset * 0.1 + treesPlanted * 2 + oceanCleanup * 1.5)
      const currentLevel = Math.floor(totalTokensEarned / 1000) + 1
      const globalRank = Math.floor(Math.random() * 10000) + 1 // Mock ranking
      const weeklyGrowth = Math.random() * 30 + 5
      const monthlyGrowth = Math.random() * 100 + 10
      const aiPredictedImpact = Math.floor(biodiversityScore * 1.15) // AI prediction

      setMetrics({
        carbonOffset,
        treesPlanted,
        oceanCleanup,
        biodiversityScore,
        totalTokensEarned,
        completedMissions,
        greenProjectsFunded: 0,
        currentLevel,
        globalRank,
        weeklyGrowth,
        monthlyGrowth,
        aiPredictedImpact
      })
    } catch (error) {
      console.error('Error loading impact metrics:', error)
      toast.error('Failed to load impact metrics')
    } finally {
      setLoading(false)
    }
  }

  const loadAchievements = async () => {
    // Enhanced achievement system for Master Plan v7
    const v7Achievements = [
      { id: 1, name: 'First Tree Planted', description: 'Planted your first tree', icon: TreePine, earned: true, tier: 'bronze' },
      { id: 2, name: 'Ocean Guardian', description: 'Contributed to ocean cleanup', icon: Droplets, earned: true, tier: 'silver' },
      { id: 3, name: 'Carbon Warrior', description: 'Offset 100kg of carbon', icon: Leaf, earned: metrics.carbonOffset >= 100, tier: 'gold' },
      { id: 4, name: 'Mission Master', description: 'Completed 10 eco missions', icon: Target, earned: metrics.completedMissions >= 10, tier: 'platinum' },
      { id: 5, name: 'Green Champion', description: 'Reached level 5', icon: Star, earned: metrics.currentLevel >= 5, tier: 'diamond' },
      { id: 6, name: 'AI Collaborator', description: 'Used AI insights 5 times', icon: Brain, earned: false, tier: 'legendary' },
      { id: 7, name: 'Global Leader', description: 'Top 1000 worldwide', icon: Trophy, earned: (metrics.globalRank || 0) <= 1000, tier: 'legendary' }
    ]
    setAchievements(v7Achievements)
  }

  const loadGlobalLeaderboard = async () => {
    // Mock global leaderboard data
    const mockLeaderboard: GlobalLeaderboard[] = [
      { rank: 1, username: 'EcoMaster2024', totalImpact: 50000, specialization: 'Carbon Offset' },
      { rank: 2, username: 'TreePlanter', totalImpact: 48500, specialization: 'Reforestation' },
      { rank: 3, username: 'OceanGuardian', totalImpact: 47200, specialization: 'Ocean Cleanup' },
      { rank: 4, username: 'GreenTech', totalImpact: 45800, specialization: 'Renewable Energy' },
      { rank: 5, username: 'BiodiversityHero', totalImpact: 44600, specialization: 'Wildlife Conservation' }
    ]
    setLeaderboard(mockLeaderboard)
  }

  const loadAIInsights = async () => {
    // Mock AI insights for Master Plan v7
    const mockInsights: AIInsight[] = [
      {
        id: '1',
        title: 'Optimal Tree Planting Season',
        description: 'Based on your location and climate data, the next 30 days are optimal for tree planting activities.',
        recommendation: 'Focus on native species with 85% survival rate in your area.',
        impactPotential: 95,
        confidence: 87
      },
      {
        id: '2',
        title: 'Carbon Offset Opportunity',
        description: 'Your energy consumption patterns suggest switching to renewable sources could double your impact.',
        recommendation: 'Consider solar panel installation with 3-year ROI projection.',
        impactPotential: 88,
        confidence: 92
      },
      {
        id: '3',
        title: 'Community Synergy',
        description: 'Join local cleanup events to maximize collective impact with 3x multiplier bonus.',
        recommendation: 'Beach cleanup this weekend has 200+ participants registered.',
        impactPotential: 92,
        confidence: 78
      }
    ]
    setAiInsights(mockInsights)
  }

  const loadRealTimeData = async () => {
    // Simulate real-time environmental data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        globalCO2Offset: prev.globalCO2Offset + Math.floor(Math.random() * 100),
        globalTreesPlanted: prev.globalTreesPlanted + Math.floor(Math.random() * 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        dailyGrowth: Math.random() * 5 + 2
      }))
    }, 5000)

    return () => clearInterval(interval)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-orange-600'
      case 'silver': return 'text-gray-400'
      case 'gold': return 'text-yellow-400'
      case 'platinum': return 'text-blue-400'
      case 'diamond': return 'text-purple-400'
      case 'legendary': return 'text-pink-400'
      default: return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌍 Green Impact Dashboard v7
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced environmental impact tracking with AI insights and global collaboration
        </p>
        <Badge className="mt-2 bg-purple-600 text-white">
          <Brain className="h-3 w-3 mr-1" />
          Master Plan v7 Enabled
        </Badge>
      </div>

      {/* Real-time Global Stats */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Satellite className="h-6 w-6" />
            Real-time Global Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{realTimeData.globalCO2Offset.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Global CO₂ Offset (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{realTimeData.globalTreesPlanted.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Trees Planted Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{realTimeData.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Eco-Warriors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">+{realTimeData.dailyGrowth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Daily Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level and Progress with AI Predictions */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Award className="h-6 w-6" />
            Eco-Warrior Level {metrics.currentLevel} 
            <Badge className="ml-2 bg-blue-600">Global Rank #{metrics.globalRank}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progress to Level {metrics.currentLevel + 1}</span>
              <span className="text-sm font-medium">{metrics.totalTokensEarned % 1000}/1000 tokens</span>
            </div>
            <Progress value={(metrics.totalTokensEarned % 1000) / 10} className="h-3" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+{metrics.weeklyGrowth?.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Weekly Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{metrics.aiPredictedImpact}</div>
                <div className="text-sm text-muted-foreground">AI Predicted Impact</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <Card className="border-pink-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-400">
            <Brain className="h-5 w-5" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="p-4 rounded-lg border border-pink-500/20 bg-pink-900/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-pink-400">{insight.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400">
                      {insight.impactPotential}% Impact
                    </Badge>
                    <Badge variant="outline" className="text-blue-400">
                      {insight.confidence}% Confidence
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <p className="text-sm text-pink-300 font-medium">{insight.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Leaderboard */}
      <Card className="border-gold-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Trophy className="h-5 w-5" />
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/20 bg-yellow-900/10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-yellow-500 text-black' :
                    entry.rank === 2 ? 'bg-gray-400 text-black' :
                    entry.rank === 3 ? 'bg-orange-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {entry.rank}
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-400">{entry.username}</h4>
                    <p className="text-sm text-muted-foreground">{entry.specialization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">{entry.totalImpact.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Impact Points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-400 flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Carbon Offset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{metrics.carbonOffset.toFixed(1)} kg</div>
            <p className="text-xs text-muted-foreground">CO₂ removed from atmosphere</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-400 flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              Trees Planted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{metrics.treesPlanted}</div>
            <p className="text-xs text-muted-foreground">Contributing to reforestation</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-400 flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Ocean Cleanup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{metrics.oceanCleanup.toFixed(1)} kg</div>
            <p className="text-xs text-muted-foreground">Waste removed from oceans</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-400 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Biodiversity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{metrics.biodiversityScore}</div>
            <p className="text-xs text-muted-foreground">Ecosystem health contribution</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Zap className="h-5 w-5" />
              Mission Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completed Missions</span>
              <span className="text-lg font-bold text-yellow-400">{metrics.completedMissions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Tokens Earned</span>
              <span className="text-lg font-bold text-yellow-400">{metrics.totalTokensEarned}</span>
            </div>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              View Active Missions
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Heart className="h-5 w-5" />
              Green Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Projects Funded</span>
              <span className="text-lg font-bold text-orange-400">{metrics.greenProjectsFunded}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Environmental Impact</span>
              <span className="text-lg font-bold text-orange-400">High</span>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Explore Projects
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Achievements with Tiers */}
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Award className="h-5 w-5" />
            Achievement System v7
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'border-green-500/30 bg-green-900/20' 
                    : 'border-gray-500/30 bg-gray-900/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <achievement.icon 
                    className={`h-8 w-8 ${
                      achievement.earned ? 'text-green-400' : 'text-gray-400'
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.earned ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Badge 
                      className={`mt-1 text-xs ${getTierColor(achievement.tier)}`}
                      variant="outline"
                    >
                      {achievement.tier.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                {achievement.earned && (
                  <Badge className="mt-2 bg-green-600 text-white">Earned</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Impact Trends with Predictions */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Impact Trends & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+{metrics.weeklyGrowth?.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Weekly Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">+{metrics.monthlyGrowth?.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Monthly Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{metrics.aiPredictedImpact}</div>
              <div className="text-sm text-muted-foreground">AI Predicted Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">#{metrics.globalRank}</div>
              <div className="text-sm text-muted-foreground">Global Ranking</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
