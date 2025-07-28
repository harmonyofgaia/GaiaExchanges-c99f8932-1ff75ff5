
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Users, 
  Target, 
  DollarSign, 
  Clock, 
  Award,
  Heart,
  Bell,
  BellRing,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_PROJECTS } from '@/constants/gaia-projects'

export function GAiACommunityProjects() {
  // Use your original GAiA projects data instead of mock data
  const [projects, setProjects] = useState(GAIA_PROJECTS.slice(0, 12)) // Show first 12 of your projects
  const [subscribedProjects, setSubscribedProjects] = useState<Set<string>>(new Set())
  const [animatedProjects, setAnimatedProjects] = useState(projects)

  useEffect(() => {
    // Load subscribed projects from localStorage
    const savedSubscriptions = localStorage.getItem('gaia-subscribed-projects')
    if (savedSubscriptions) {
      setSubscribedProjects(new Set(JSON.parse(savedSubscriptions)))
    }
  }, [])

  useEffect(() => {
    // Simulate live funding updates with realistic increments
    const interval = setInterval(() => {
      setAnimatedProjects(prev => 
        prev.map(project => {
          const currentFunding = project.currentFunding || 0
          const fundingGoal = project.fundingGoal || 0
          const isNearGoal = (currentFunding / fundingGoal) > 0.95
          
          // More realistic funding increments
          const increment = isNearGoal ? 
            Math.floor(Math.random() * 100) : 
            Math.floor(Math.random() * 1000)
            
          return {
            ...project,
            currentFunding: Math.min(
              fundingGoal,
              currentFunding + increment
            ),
            participants: project.participants + Math.floor(Math.random() * 2)
          }
        })
      )
    }, 8000) // Every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleSubscription = (projectId: string, projectTitle: string) => {
    const newSubscriptions = new Set(subscribedProjects)
    const isCurrentlySubscribed = subscribedProjects.has(projectId)
    
    if (isCurrentlySubscribed) {
      newSubscriptions.delete(projectId)
      toast.success(`Unsubscribed from ${projectTitle}`, {
        description: 'You will no longer receive updates about this project',
        duration: 3000
      })
    } else {
      newSubscriptions.add(projectId)
      toast.success(`Subscribed to ${projectTitle}! 🌱`, {
        description: 'You will receive updates about project progress',
        duration: 4000
      })
    }
    
    setSubscribedProjects(newSubscriptions)
    localStorage.setItem('gaia-subscribed-projects', JSON.stringify(Array.from(newSubscriptions)))
  }

  const supportProject = (projectId: string, projectTitle: string) => {
    toast.success(`Supporting ${projectTitle}! 💚`, {
      description: 'Your support helps make environmental change possible',
      duration: 4000
    })
    
    console.log('🌱 GAiA PROJECT SUPPORT:', projectTitle)
    console.log('💰 GAIA TOKENS: Contributing to environmental impact')
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environmental gaming':
      case 'gaming nfts':
        return <Shield className="h-5 w-5 text-purple-400" />
      case 'biotechnology':
      case 'mycology':
        return <Leaf className="h-5 w-5 text-green-400" />
      case 'renewable energy':
        return <Zap className="h-5 w-5 text-yellow-400" />
      case 'water restoration':
        return <Target className="h-5 w-5 text-blue-400" />
      default:
        return <Heart className="h-5 w-5 text-pink-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-green-600'
      case 'High': return 'bg-blue-600'
      case 'Medium': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4 flex items-center justify-center gap-2">
          <Shield className="h-8 w-8" />
          🌱 Your Original GAiA Projects
        </h2>
        <p className="text-green-300/80 mb-2">
          Your personally created environmental and innovation projects
        </p>
        <div className="text-sm text-blue-400">
          ✨ Powered by GAiA Token • Community Driven • Real Impact • Your Creations
        </div>
        {subscribedProjects.size > 0 && (
          <div className="mt-4">
            <Badge className="bg-green-600 text-white">
              <BellRing className="h-3 w-3 mr-1" />
              Subscribed to {subscribedProjects.size} projects
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animatedProjects.map((project) => {
          const isSubscribed = subscribedProjects.has(project.id)
          const fundingPercentage = project.fundingGoal ? 
            (project.currentFunding! / project.fundingGoal) * 100 : 
            (project.progress || 0)
          const isNearingGoal = fundingPercentage > 85

          return (
            <Card 
              key={project.id}
              className={`bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 transition-all duration-300 hover:scale-105 ${
                isNearingGoal ? 'ring-2 ring-green-400/50 animate-pulse' : ''
              } ${isSubscribed ? 'ring-1 ring-blue-400/50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={`${getImpactColor(project.impact)} text-white flex items-center gap-1`}>
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {project.expectedImpact && (
                      <Badge className="bg-purple-600 text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Impact: {project.impact}
                      </Badge>
                    )}
                    {isSubscribed && (
                      <BellRing className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-green-400 text-lg">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-green-300/80 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-3">
                  {project.fundingGoal && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Funding Progress</span>
                        <span className="text-green-300 font-bold">
                          ${(project.currentFunding || 0).toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={fundingPercentage} className="h-2" />
                      <div className="text-xs text-green-300/60">
                        {fundingPercentage.toFixed(1)}% funded
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Users className="h-3 w-3" />
                      {project.participants} participants
                    </div>
                    <div className="flex items-center gap-1 text-purple-400">
                      <TrendingUp className="h-3 w-3" />
                      {project.progress}% complete
                    </div>
                    {project.reward && (
                      <div className="flex items-center gap-1 text-yellow-400 col-span-2">
                        <DollarSign className="h-3 w-3" />
                        {project.reward} GAiA reward
                      </div>
                    )}
                  </div>

                  {project.expectedImpact && (
                    <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-emerald-400 mb-1">
                        <Target className="h-4 w-4" />
                        <span className="font-medium text-xs">Expected Impact</span>
                      </div>
                      <p className="text-xs text-emerald-300/80">{project.expectedImpact}</p>
                    </div>
                  )}

                  {project.location && (
                    <div className="text-xs text-muted-foreground">
                      📍 Location: {project.location}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                    onClick={() => supportProject(project.id, project.title)}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`border-blue-400 hover:bg-blue-900/20 ${
                      isSubscribed ? 'bg-blue-900/30 text-blue-300' : 'text-blue-400'
                    }`}
                    size="sm"
                    onClick={() => toggleSubscription(project.id, project.title)}
                  >
                    {isSubscribed ? (
                      <BellRing className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Shield className="h-5 w-5 mr-2" />
          View All Your GAiA Projects
        </Button>
      </div>
    </div>
  )
}
