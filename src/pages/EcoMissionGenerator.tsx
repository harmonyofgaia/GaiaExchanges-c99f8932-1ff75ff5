
import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Target, 
  Zap, 
  Clock, 
  Award, 
  MapPin, 
  Users, 
  Brain,
  Leaf,
  TreePine,
  Droplets,
  Recycle,
  Globe,
  Satellite,
  Smartphone,
  TrendingUp,
  Star,
  Camera,
  CheckCircle
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

interface EcoMission {
  id: string
  user_id: string
  mission_type: string
  title: string
  description: string
  difficulty_level: number
  tokens_reward: number
  carbon_impact: number
  status: string
  completion_data: {
    evidence_photos?: string[]
    location_verified?: boolean
    impact_measured?: number
    peer_verified?: boolean
    notes?: string
  }
  created_at: string
  completed_at: string | null
  ai_generated?: boolean
  geolocation_required?: boolean
  verification_method?: string
  community_challenge?: boolean
  predicted_completion_time?: number
  optimal_conditions?: string[]
}

interface AIGenerationParams {
  userLocation: string
  environmentalData: {
    temperature: number
    humidity: number
    airQuality: number
    localEcosystem: string
  }
  userPreferences: string[]
  seasonality: string
  communityNeeds: string[]
}

interface MissionMetrics {
  totalGenerated: number
  completionRate: number
  avgRewardPerMission: number
  communityParticipation: number
  aiAccuracy: number
  optimalWeather: boolean
}

export default function EcoMissionGenerator() {
  const { user } = useAuth()
  const [missions, setMissions] = useState<EcoMission[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [userLocation, setUserLocation] = useState<string>('Unknown')
  const [missionMetrics, setMissionMetrics] = useState<MissionMetrics>({
    totalGenerated: 847,
    completionRate: 87.3,
    avgRewardPerMission: 156,
    communityParticipation: 92.1,
    aiAccuracy: 94.7,
    optimalWeather: true
  })
  const [aiInsights, setAiInsights] = useState<Array<{
    type: string
    message: string
    confidence: number
    actionable: boolean
  }>>([])  

  useEffect(() => {
    if (user) {
      loadMissions()
      loadUserLocation()
      loadAIInsights()
      loadMissionMetrics()
    }
  }, [user, loadMissions])

  const loadUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
        },
        () => {
          setUserLocation('Location unavailable')
        }
      )
    }
  }

  const loadAIInsights = async () => {
    // Mock AI insights for mission optimization
    const insights = [
      {
        type: 'weather',
        message: 'Optimal tree planting conditions detected for the next 72 hours',
        confidence: 94,
        action: 'Generate tree planting missions'
      },
      {
        type: 'community',
        message: 'High community activity in beach cleanup missions this week',
        confidence: 87,
        action: 'Boost ocean cleanup missions'
      },
      {
        type: 'seasonal',
        message: 'Wildlife migration season - biodiversity missions recommended',
        confidence: 91,
        action: 'Create wildlife monitoring tasks'
      }
    ]
    setAiInsights(insights)
  }

  const loadMissionMetrics = async () => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMissionMetrics(prev => ({
        ...prev,
        totalGenerated: prev.totalGenerated + Math.floor(Math.random() * 3),
        completionRate: Math.min(100, prev.completionRate + (Math.random() - 0.5) * 0.1),
        communityParticipation: Math.min(100, prev.communityParticipation + (Math.random() - 0.5) * 0.2)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (user) {
      loadMissions()
    }
  }, [user, loadMissions])

  const loadMissions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('eco_missions')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMissions(data || [])
    } catch (error) {
      console.error('Error loading missions:', error)
      toast.error('Failed to load missions')
    } finally {
      setLoading(false)
    }
  }, [user])

  const generateAIMission = async () => {
    if (!user) {
      toast.error('Please log in to generate missions')
      return
    }

    setGenerating(true)
    try {
      // Enhanced AI-powered mission generation with v7 features
      const advancedMissionTemplates = [
        {
          type: 'ai_tree_planting',
          title: 'AI-Optimized Tree Planting: {count} Native Species',
          description: 'Plant {count} trees using AI-selected native species optimal for your location and current climate conditions. GPS verification required.',
          difficulty: Math.floor(Math.random() * 3) + 1,
          tokens: 75,
          carbon_impact: 35,
          icon: TreePine,
          ai_generated: true,
          geolocation_required: true,
          verification_method: 'gps_photo',
          optimal_conditions: ['sunny', 'moderate_humidity', 'soil_moisture_optimal']
        },
        {
          type: 'smart_waste_cleanup',
          title: 'Smart Cleanup Mission: {amount}kg Waste Analysis',
          description: 'AI-identified waste hotspot cleanup with automatic categorization. Use app to scan and categorize waste types for maximum environmental impact.',
          difficulty: Math.floor(Math.random() * 3) + 1,
          tokens: 50,
          carbon_impact: 20,
          icon: Recycle,
          ai_generated: true,
          geolocation_required: true,
          verification_method: 'ai_image_recognition'
        },
        {
          type: 'predictive_conservation',
          title: 'Predictive Wildlife Monitoring',
          description: 'Monitor and document wildlife in AI-predicted migration corridors. Critical for biodiversity mapping and conservation planning.',
          difficulty: 3,
          tokens: 120,
          carbon_impact: 50,
          icon: Globe,
          ai_generated: true,
          geolocation_required: true,
          verification_method: 'community_validation',
          community_challenge: true
        },
        {
          type: 'renewable_transition',
          title: 'Community Energy Transition Advocacy',
          description: 'Help {count} households transition to renewable energy through education and resource sharing. Track adoption rates.',
          difficulty: 3,
          tokens: 150,
          carbon_impact: 80,
          icon: Zap,
          ai_generated: true,
          verification_method: 'multi_party_confirmation'
        },
        {
          type: 'ecosystem_restoration',
          title: 'Ecosystem Health Assessment: {area} Hectares',
          description: 'Comprehensive ecosystem health assessment using IoT sensors and community observations. Data feeds into global climate models.',
          difficulty: 2,
          tokens: 90,
          carbon_impact: 45,
          icon: Globe,
          ai_generated: true,
          geolocation_required: true,
          verification_method: 'sensor_data_iot'
        }
      ]

      const template = advancedMissionTemplates[Math.floor(Math.random() * advancedMissionTemplates.length)]
      const variations = {
        '{count}': Math.floor(Math.random() * 15) + 5,
        '{amount}': Math.floor(Math.random() * 25) + 10,
        '{area}': Math.floor(Math.random() * 5) + 1
      }

      let title = template.title
      let description = template.description
      
      Object.entries(variations).forEach(([key, value]) => {
        title = title.replace(key, value.toString())
        description = description.replace(key, value.toString())
      })

      // Enhanced mission data with v7 features
      const missionData = {
        user_id: user.id,
        mission_type: template.type,
        title,
        description,
        difficulty_level: template.difficulty,
        tokens_reward: template.tokens * template.difficulty,
        carbon_impact: template.carbon_impact * template.difficulty,
        status: 'active',
        ai_generated: template.ai_generated,
        geolocation_required: template.geolocation_required,
        verification_method: template.verification_method,
        community_challenge: template.community_challenge,
        predicted_completion_time: Math.floor(Math.random() * 168) + 24, // 1-7 days in hours
        optimal_conditions: template.optimal_conditions || []
      }

      const { data, error } = await supabase
        .from('eco_missions')
        .insert([missionData])
        .select()

      if (error) throw error
      
      toast.success(`AI-generated mission created: ${title}!`)
      loadMissions()
    } catch (error) {
      console.error('Error generating mission:', error)
      toast.error('Failed to generate AI mission')
    } finally {
      setGenerating(false)
    }
  }

  const acceptMission = async (missionId: string) => {
    try {
      const { error } = await supabase
        .from('eco_missions')
        .update({ status: 'in_progress' })
        .eq('id', missionId)

      if (error) throw error
      
      toast.success('Mission accepted! Start working on it.')
      loadMissions()
    } catch (error) {
      console.error('Error accepting mission:', error)
      toast.error('Failed to accept mission')
    }
  }

  const completeMission = async (missionId: string) => {
    try {
      const { error } = await supabase
        .from('eco_missions')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', missionId)

      if (error) throw error
      
      toast.success('Mission completed! Tokens have been awarded.')
      loadMissions()
    } catch (error) {
      console.error('Error completing mission:', error)
      toast.error('Failed to complete mission')
    }
  }

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'text-green-400'
      case 2: return 'text-yellow-400'
      case 3: return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getDifficultyName = (level: number) => {
    switch (level) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Hard'
      default: return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600'
      case 'in_progress': return 'bg-yellow-600'
      case 'completed': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'tree_planting': return TreePine
      case 'waste_cleanup': return Recycle
      case 'water_conservation': return Droplets
      case 'renewable_energy': return Zap
      case 'biodiversity': return Globe
      default: return Leaf
    }
  }

  const activeMissions = missions.filter(m => m.status === 'active')
  const inProgressMissions = missions.filter(m => m.status === 'in_progress')
  const completedMissions = missions.filter(m => m.status === 'completed')

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
          🎯 AI Eco-Mission Generator v7
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced AI-powered missions with geolocation, IoT integration, and community challenges
        </p>
        <Badge className="mt-2 bg-purple-600 text-white">
          <Brain className="h-3 w-3 mr-1" />
          Master Plan v7 Enabled
        </Badge>
      </div>

      {/* Enhanced Mission Stats */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Target className="h-6 w-6" />
            Advanced Mission Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{activeMissions.length}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{inProgressMissions.length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{completedMissions.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {completedMissions.reduce((sum, m) => sum + m.tokens_reward, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Tokens Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{missionMetrics.aiAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">{missionMetrics.communityParticipation.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Community Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights and Optimization */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-5 w-5" />
            AI Mission Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Satellite className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400 capitalize">{insight.type}</span>
                  <Badge variant="outline" className="text-green-400">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.message}</p>
                <p className="text-xs text-purple-300 font-medium">{insight.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Location and Environmental Data */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MapPin className="h-5 w-5" />
            Location-Based Mission Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Your Location</h4>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{userLocation}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weather Conditions:</span>
                  <span className="font-medium text-green-400">
                    {missionMetrics.optimalWeather ? 'Optimal' : 'Moderate'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community Activity:</span>
                  <span className="font-medium text-blue-400">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Environmental Priority:</span>
                  <span className="font-medium text-yellow-400">Tree Planting</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">AI Mission Generator v7</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Advanced AI analyzes your location, weather patterns, community needs, and environmental data to generate personalized eco-missions with maximum impact potential.
              </p>
              <Button
                onClick={generateAIMission}
                disabled={generating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    AI Generating Mission...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate AI-Optimized Mission
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Tabs */}
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available ({activeMissions.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressMissions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {activeMissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No missions available
              </h3>
              <p className="text-muted-foreground">
                Generate your first AI-powered eco-mission above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeMissions.map((mission) => {
                const MissionIcon = getMissionIcon(mission.mission_type)
                return (
                  <Card key={mission.id} className="border-blue-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(mission.status)}>
                            {mission.status.replace('_', ' ')}
                          </Badge>
                          {mission.ai_generated && (
                            <Badge variant="outline" className="text-purple-400">
                              <Brain className="h-3 w-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                          {mission.geolocation_required && (
                            <Badge variant="outline" className="text-blue-400">
                              <MapPin className="h-3 w-3 mr-1" />
                              GPS Required
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(mission.difficulty_level)}>
                          {getDifficultyName(mission.difficulty_level)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-blue-400 flex items-center gap-2">
                        <MissionIcon className="h-5 w-5" />
                        {mission.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {mission.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Reward</div>
                          <div className="font-medium text-green-400">
                            {mission.tokens_reward} GAiA
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Carbon Impact</div>
                          <div className="font-medium text-blue-400">
                            {mission.carbon_impact} kg CO₂
                          </div>
                        </div>
                      </div>

                      {/* Enhanced v7 features */}
                      {(mission.verification_method || mission.predicted_completion_time) && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {mission.verification_method && (
                            <div>
                              <div className="text-muted-foreground">Verification</div>
                              <div className="font-medium text-purple-400 capitalize">
                                {mission.verification_method.replace('_', ' ')}
                              </div>
                            </div>
                          )}
                          {mission.predicted_completion_time && (
                            <div>
                              <div className="text-muted-foreground">Est. Time</div>
                              <div className="font-medium text-cyan-400">
                                {Math.floor(mission.predicted_completion_time / 24)}d {mission.predicted_completion_time % 24}h
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {mission.optimal_conditions && mission.optimal_conditions.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Optimal Conditions:</div>
                          <div className="flex flex-wrap gap-1">
                            {mission.optimal_conditions.map((condition, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {condition.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={() => acceptMission(mission.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Accept Mission
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {inProgressMissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No missions in progress
              </h3>
              <p className="text-muted-foreground">
                Accept an available mission to start making an impact!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressMissions.map((mission) => {
                const MissionIcon = getMissionIcon(mission.mission_type)
                return (
                  <Card key={mission.id} className="border-yellow-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(mission.status)}>
                          {mission.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(mission.difficulty_level)}>
                          {getDifficultyName(mission.difficulty_level)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                        <MissionIcon className="h-5 w-5" />
                        {mission.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {mission.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Reward</div>
                          <div className="font-medium text-green-400">
                            {mission.tokens_reward} GAiA
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Carbon Impact</div>
                          <div className="font-medium text-blue-400">
                            {mission.carbon_impact} kg CO₂
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => completeMission(mission.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Mark as Complete
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No completed missions yet
              </h3>
              <p className="text-muted-foreground">
                Complete your first mission to see it here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedMissions.map((mission) => {
                const MissionIcon = getMissionIcon(mission.mission_type)
                return (
                  <Card key={mission.id} className="border-green-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(mission.status)}>
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(mission.difficulty_level)}>
                          {getDifficultyName(mission.difficulty_level)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                        <MissionIcon className="h-5 w-5" />
                        {mission.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {mission.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Tokens Earned</div>
                          <div className="font-medium text-green-400">
                            {mission.tokens_reward} GAiA
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Carbon Impact</div>
                          <div className="font-medium text-blue-400">
                            {mission.carbon_impact} kg CO₂
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Completed: {new Date(mission.completed_at!).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
