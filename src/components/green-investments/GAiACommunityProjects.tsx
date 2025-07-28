
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
  TreePine,
  Droplets,
  Sun,
  Wheat,
  Heart,
  MapPin
} from 'lucide-react'
import { GAIA_PROJECTS, GAiAProject } from '@/constants/gaia-projects'
import { useState, useEffect } from 'react'

export function GAiACommunityProjects() {
  const [projects, setProjects] = useState(GAIA_PROJECTS)
  const [animatedProjects, setAnimatedProjects] = useState(projects)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProjects(prev => 
        prev.map(project => ({
          ...project,
          currentFunding: Math.min(
            project.fundingGoal || project.reward * 100,
            (project.currentFunding || project.progress * 1000) + Math.floor(Math.random() * 2500)
          ),
          participants: project.participants + Math.floor(Math.random() * 5)
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environmental': return <TreePine className="h-5 w-5 text-green-400" />
      case 'energy': return <Sun className="h-5 w-5 text-yellow-400" />
      case 'agriculture': return <Wheat className="h-5 w-5 text-orange-400" />
      case 'wildlife': return <Heart className="h-5 w-5 text-purple-400" />
      case 'water': return <Droplets className="h-5 w-5 text-blue-400" />
      case 'urban': return <MapPin className="h-5 w-5 text-gray-400" />
      case 'education': return <Award className="h-5 w-5 text-indigo-400" />
      default: return <Leaf className="h-5 w-5 text-green-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'completed': return 'bg-blue-600'
      case 'planning': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'text-red-400'
      case 'High': return 'text-orange-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🌱 GAiA Community Projects
        </h2>
        <p className="text-lg text-muted-foreground mb-2">
          Real environmental projects funded by our community
        </p>
        <div className="text-sm text-green-400">
          ✨ Created by Culture of Harmony • Fully Transparent • Community Driven
        </div>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-900/30 rounded-lg border-2 border-green-500/30">
          <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-400">{projects.length}</div>
          <div className="text-sm text-green-300">Active Projects</div>
        </div>
        
        <div className="text-center p-4 bg-blue-900/30 rounded-lg border-2 border-blue-500/30">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">
            {projects.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-300">Total Participants</div>
        </div>
        
        <div className="text-center p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
          <DollarSign className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-400">
            ${projects.reduce((sum, p) => sum + (p.currentFunding || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-purple-300">Total Funding</div>
        </div>
        
        <div className="text-center p-4 bg-orange-900/30 rounded-lg border-2 border-orange-500/30">
          <Award className="h-8 w-8 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-400">
            {projects.reduce((sum, p) => sum + p.reward, 0).toLocaleString()}
          </div>
          <div className="text-sm text-orange-300">Total Rewards (GAiA)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animatedProjects.map((project) => {
          const fundingPercentage = project.currentFunding && project.fundingGoal 
            ? (project.currentFunding / project.fundingGoal) * 100 
            : project.progress
          const isNearingGoal = fundingPercentage > 80

          return (
            <Card 
              key={project.id}
              className={`bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 transition-all duration-300 hover:scale-105 ${
                isNearingGoal ? 'ring-2 ring-green-400/50' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{project.deadline}</span>
                  </div>
                </div>
                <CardTitle className="text-green-400 text-lg">{project.title}</CardTitle>
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-fit">
                  {project.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-green-300/80 line-clamp-2">
                  {project.description}
                </p>
                
                {project.location && (
                  <div className="flex items-center gap-1 text-blue-400 text-sm">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Progress</span>
                    <span className="text-green-300">{fundingPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={fundingPercentage} className="h-3" />
                  {project.currentFunding && project.fundingGoal && (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">${project.currentFunding.toLocaleString()} raised</span>
                      <span className="text-blue-400">${project.fundingGoal.toLocaleString()} goal</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-blue-400">
                    <Users className="h-4 w-4" />
                    {project.participants.toLocaleString()} people
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Award className="h-4 w-4" />
                    {project.reward} GAiA
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Impact Level:</span>
                  <span className={`font-bold ${getImpactColor(project.impact)}`}>
                    {project.impact}
                  </span>
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

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    size="sm"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Support Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-400 text-green-400 hover:bg-green-900/20"
                    size="sm"
                  >
                    <Leaf className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Target className="h-5 w-5 mr-2" />
          View All GAiA Projects
        </Button>
      </div>
    </div>
  )
}
