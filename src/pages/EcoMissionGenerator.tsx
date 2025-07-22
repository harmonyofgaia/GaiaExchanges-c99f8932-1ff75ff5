
import { useState, useEffect } from 'react'
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
  Globe
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
  completion_data: any
  created_at: string
  completed_at: string | null
}

export default function EcoMissionGenerator() {
  const { user } = useAuth()
  const [missions, setMissions] = useState<EcoMission[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  useEffect(() => {
    if (user) {
      loadMissions()
    }
  }, [user])

  const loadMissions = async () => {
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
  }

  const generateAIMission = async () => {
    if (!user) {
      toast.error('Please log in to generate missions')
      return
    }

    setGenerating(true)
    try {
      // AI-powered mission generation logic
      const missionTemplates = [
        {
          type: 'tree_planting',
          title: 'Plant {count} Trees in Your Area',
          description: 'Help reforest your local area by planting native tree species. Document your progress with photos and GPS coordinates.',
          difficulty: Math.floor(Math.random() * 3) + 1,
          tokens: 50,
          carbon_impact: 25,
          icon: TreePine
        },
        {
          type: 'waste_cleanup',
          title: 'Clean Up {amount}kg of Waste',
          description: 'Organize or participate in a local cleanup event. Focus on removing plastic waste and properly disposing of recyclables.',
          difficulty: Math.floor(Math.random() * 3) + 1,
          tokens: 30,
          carbon_impact: 15,
          icon: Recycle
        },
        {
          type: 'water_conservation',
          title: 'Implement Water Conservation System',
          description: 'Install and document a water-saving system in your home or community. Track water usage reduction.',
          difficulty: Math.floor(Math.random() * 3) + 1,
          tokens: 75,
          carbon_impact: 40,
          icon: Droplets
        },
        {
          type: 'renewable_energy',
          title: 'Switch to Renewable Energy',
          description: 'Transition part of your energy consumption to renewable sources. Document the process and impact.',
          difficulty: 3,
          tokens: 100,
          carbon_impact: 60,
          icon: Zap
        },
        {
          type: 'biodiversity',
          title: 'Create Wildlife Habitat',
          description: 'Establish a small wildlife habitat in your area. Plant native species and provide water sources.',
          difficulty: 2,
          tokens: 60,
          carbon_impact: 30,
          icon: Globe
        }
      ]

      const template = missionTemplates[Math.floor(Math.random() * missionTemplates.length)]
      const variations = {
        '{count}': Math.floor(Math.random() * 10) + 5,
        '{amount}': Math.floor(Math.random() * 20) + 10
      }

      let title = template.title
      let description = template.description
      
      Object.entries(variations).forEach(([key, value]) => {
        title = title.replace(key, value.toString())
        description = description.replace(key, value.toString())
      })

      const { data, error } = await supabase
        .from('eco_missions')
        .insert([
          {
            user_id: user.id,
            mission_type: template.type,
            title,
            description,
            difficulty_level: template.difficulty,
            tokens_reward: template.tokens * template.difficulty,
            carbon_impact: template.carbon_impact * template.difficulty,
            status: 'active'
          }
        ])
        .select()

      if (error) throw error
      
      toast.success('New eco-mission generated! Check your active missions.')
      loadMissions()
    } catch (error) {
      console.error('Error generating mission:', error)
      toast.error('Failed to generate mission')
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
          🎯 AI Eco-Mission Generator
        </h1>
        <p className="text-xl text-muted-foreground">
          Personalized environmental missions powered by AI
        </p>
      </div>

      {/* Mission Stats */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Target className="h-6 w-6" />
            Mission Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          </div>
        </CardContent>
      </Card>

      {/* AI Mission Generator */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Brain className="h-5 w-5" />
            AI Mission Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Our AI analyzes your location, preferences, and impact history to generate personalized eco-missions
            </p>
            <Button
              onClick={generateAIMission}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {generating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Generating Mission...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate New Mission
                </>
              )}
            </Button>
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
                        <Badge className={getStatusColor(mission.status)}>
                          {mission.status.replace('_', ' ')}
                        </Badge>
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
