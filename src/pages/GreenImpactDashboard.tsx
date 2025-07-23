
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
  Star
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
    currentLevel: 1
  })
  const [loading, setLoading] = useState(true)
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      loadImpactMetrics()
      loadAchievements()
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

      // Calculate metrics
      const carbonOffset = envData?.reduce((sum, item) => sum + (item.carbon_offset || 0), 0) || 0
      const treesPlanted = envData?.reduce((sum, item) => sum + (item.trees_planted || 0), 0) || 0
      const oceanCleanup = envData?.reduce((sum, item) => sum + (item.ocean_cleanup_contribution || 0), 0) || 0
      const completedMissions = missionsData?.filter(m => m.status === 'completed').length || 0
      const totalTokensEarned = cleaningData?.reduce((sum, item) => sum + (item.tokens_earned || 0), 0) || 0
      
      setMetrics({
        carbonOffset,
        treesPlanted,
        oceanCleanup,
        biodiversityScore: Math.floor(carbonOffset * 0.1 + treesPlanted * 2),
        totalTokensEarned,
        completedMissions,
        greenProjectsFunded: 0, // Will be calculated when funding is implemented
        currentLevel: Math.floor(totalTokensEarned / 1000) + 1
      })
    } catch (error) {
      console.error('Error loading impact metrics:', error)
      toast.error('Failed to load impact metrics')
    } finally {
      setLoading(false)
    }
  }

  const loadAchievements = async () => {
    // Mock achievements for now - will be replaced with real data
    const mockAchievements = [
      { id: 1, name: 'First Tree Planted', description: 'Planted your first tree', icon: TreePine, earned: true },
      { id: 2, name: 'Ocean Guardian', description: 'Contributed to ocean cleanup', icon: Droplets, earned: true },
      { id: 3, name: 'Carbon Warrior', description: 'Offset 100kg of carbon', icon: Leaf, earned: metrics.carbonOffset >= 100 },
      { id: 4, name: 'Mission Master', description: 'Completed 10 eco missions', icon: Target, earned: metrics.completedMissions >= 10 },
      { id: 5, name: 'Green Champion', description: 'Reached level 5', icon: Star, earned: metrics.currentLevel >= 5 }
    ]
    setAchievements(mockAchievements)
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
          🌍 Green Impact Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your environmental impact and contribution to a better world
        </p>
      </div>

      {/* Level and Progress */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Award className="h-6 w-6" />
            Eco-Warrior Level {metrics.currentLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progress to Level {metrics.currentLevel + 1}</span>
              <span className="text-sm font-medium">{metrics.totalTokensEarned % 1000}/1000 tokens</span>
            </div>
            <Progress value={(metrics.totalTokensEarned % 1000) / 10} className="h-3" />
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

      {/* Achievements */}
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Award className="h-5 w-5" />
            Achievements
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
                  <div>
                    <h4 className={`font-medium ${
                      achievement.earned ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
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

      {/* Impact Trends */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Impact Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+15%</div>
              <div className="text-sm text-muted-foreground">Carbon Offset (This Month)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">+28%</div>
              <div className="text-sm text-muted-foreground">Mission Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">+42%</div>
              <div className="text-sm text-muted-foreground">Community Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
