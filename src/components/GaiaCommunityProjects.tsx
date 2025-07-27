
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

interface CommunityProject {
  id: string
  title: string
  description: string
  category: string
  participants: number
  progress: number
  goal: string
  reward: number
  deadline: string
  impact: string
  status: 'active' | 'completed' | 'planning'
}

export function GaiaCommunityProjects() {
  const [projects, setProjects] = useState<CommunityProject[]>([
    {
      id: '1',
      title: 'Global Tree Planting Initiative',
      description: 'Plant 1 million trees worldwide to combat climate change',
      category: 'Environmental',
      participants: 25847,
      progress: 67,
      goal: '1M Trees',
      reward: 500,
      deadline: '2024-12-31',
      impact: 'Very High',
      status: 'active'
    },
    {
      id: '2',
      title: 'Ocean Cleanup Campaign',
      description: 'Remove plastic waste from ocean waters and beaches',
      category: 'Environmental',
      participants: 15632,
      progress: 45,
      goal: '100 Tons',
      reward: 350,
      deadline: '2024-11-30',
      impact: 'High',
      status: 'active'
    },
    {
      id: '3',
      title: 'Solar Panel Community Program',
      description: 'Install solar panels in underserved communities',
      category: 'Energy',
      participants: 8934,
      progress: 78,
      goal: '500 Installations',
      reward: 750,
      deadline: '2024-10-15',
      impact: 'Very High',
      status: 'active'
    },
    {
      id: '4',
      title: 'Community Garden Network',
      description: 'Establish sustainable food gardens in urban areas',
      category: 'Food Security',
      participants: 12456,
      progress: 89,
      goal: '200 Gardens',
      reward: 400,
      deadline: '2024-09-30',
      impact: 'High',
      status: 'active'
    }
  ])

  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'planning'>('all')

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'planning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Environmental': return <Leaf className="h-5 w-5 text-green-600" />
      case 'Energy': return <Globe className="h-5 w-5 text-blue-600" />
      case 'Food Security': return <Heart className="h-5 w-5 text-red-600" />
      default: return <Target className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🌍 GAiA Community Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of eco-warriors working together on impactful projects that heal our planet
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['all', 'active', 'completed', 'planning'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === 'all' ? 'All Projects' : `${status} Projects`}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Badge className={getImpactColor(project.impact)}>
                    {project.impact}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-600">
                      <Users className="h-4 w-4" />
                      <span className="font-bold">{project.participants.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-600">
                      <Award className="h-4 w-4" />
                      <span className="font-bold">{project.reward}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Reward</div>
                  </div>
                </div>

                {/* Goal and Deadline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Goal:</span>
                    </div>
                    <span className="text-sm">{project.goal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Deadline:</span>
                    </div>
                    <span className="text-sm">{project.deadline}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" size="sm">
                  {project.status === 'active' ? 'Join Project' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {projects.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {projects.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.reduce((sum, p) => sum + p.reward, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Rewards</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Average Progress</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
