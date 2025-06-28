
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Leaf, 
  Heart, 
  Globe, 
  TreePine,
  Fish,
  Bird,
  Rabbit,
  Shield,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'

export function GreenProjectManager() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Global Animal Sanctuary Network',
      type: 'Animal Welfare',
      description: 'Building large, natural habitats to replace cages worldwide',
      fundingGoal: 5000000,
      currentFunding: 1250000,
      animalsBenefited: 15000,
      status: 'active',
      priority: 'high',
      location: 'Worldwide',
      impact: 'Liberating 15,000 animals from cage systems',
      nextMilestone: 'Complete 5 new sanctuaries by Q2 2024'
    },
    {
      id: 2,
      name: 'Ocean Wildlife Protection Initiative',
      type: 'Marine Conservation',
      description: 'Protecting marine habitats and rescuing ocean wildlife',
      fundingGoal: 3000000,
      currentFunding: 2100000,
      animalsBenefited: 50000,
      status: 'active',
      priority: 'high',
      location: 'Pacific & Atlantic Oceans',
      impact: 'Protecting 500,000 sqkm of ocean habitat',
      nextMilestone: 'Launch 3 new marine sanctuaries'
    },
    {
      id: 3,
      name: 'Forest Habitat Restoration',
      type: 'Wildlife Conservation',
      description: 'Restoring destroyed forests and creating wildlife corridors',
      fundingGoal: 4500000,
      currentFunding: 2800000,
      animalsBenefited: 75000,
      status: 'active',
      priority: 'medium',
      location: 'Amazon, Congo, Southeast Asia',
      impact: 'Restoring 100,000 acres of forest habitat',
      nextMilestone: 'Plant 1 million trees by end of year'
    },
    {
      id: 4,
      name: 'Urban Wildlife Rescue Centers',
      type: 'Animal Rescue',
      description: 'Emergency rescue and rehabilitation centers in major cities',
      fundingGoal: 2000000,
      currentFunding: 850000,
      animalsBenefited: 8500,
      status: 'planning',
      priority: 'medium',
      location: 'Major Cities Worldwide',
      impact: 'Rescuing 10,000+ urban wildlife annually',
      nextMilestone: 'Open first 3 centers in NYC, London, Tokyo'
    }
  ])

  const [totalStats, setTotalStats] = useState({
    totalFunding: 0,
    totalGoals: 0,
    animalsSaved: 0,
    activeProjects: 0,
    globalImpact: 0
  })

  const [newProject, setNewProject] = useState({
    name: '',
    type: '',
    description: '',
    fundingGoal: '',
    location: ''
  })

  // Update total statistics
  useEffect(() => {
    const stats = projects.reduce((acc, project) => ({
      totalFunding: acc.totalFunding + project.currentFunding,
      totalGoals: acc.totalGoals + project.fundingGoal,
      animalsSaved: acc.animalsSaved + project.animalsBenefited,
      activeProjects: acc.activeProjects + (project.status === 'active' ? 1 : 0),
      globalImpact: acc.globalImpact + (project.currentFunding / project.fundingGoal * 100)
    }), { totalFunding: 0, totalGoals: 0, animalsSaved: 0, activeProjects: 0, globalImpact: 0 })

    setTotalStats(stats)
  }, [projects])

  // Simulate funding updates
  useEffect(() => {
    const updateFunding = () => {
      setProjects(prev => prev.map(project => ({
        ...project,
        currentFunding: Math.min(
          project.fundingGoal,
          project.currentFunding + Math.floor(Math.random() * 50000)
        ),
        animalsBenefited: project.animalsBenefited + Math.floor(Math.random() * 10)
      })))

      // Random project update notifications
      if (Math.random() < 0.3) {
        const updates = [
          '🐾 50 animals rescued from factory farms!',
          '🌊 New marine sanctuary established!',
          '🌳 1,000 trees planted in wildlife corridor!',
          '🏥 Emergency wildlife center opened!',
          '💚 Major corporate sponsor joined the cause!'
        ]
        const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
        toast.success('Green Project Update!', {
          description: randomUpdate,
          duration: 4000
        })
      }
    }

    const interval = setInterval(updateFunding, 10000)
    return () => clearInterval(interval)
  }, [])

  const createProject = () => {
    if (newProject.name && newProject.type && newProject.description) {
      const project = {
        id: Date.now(),
        ...newProject,
        fundingGoal: parseInt(newProject.fundingGoal) || 1000000,
        currentFunding: 0,
        animalsBenefited: 0,
        status: 'planning' as const,
        priority: 'medium' as const,
        impact: 'New project launched to help animals worldwide',
        nextMilestone: 'Initial funding and team assembly'
      }

      setProjects(prev => [...prev, project])
      setNewProject({ name: '', type: '', description: '', fundingGoal: '', location: '' })
      toast.success('New Green Project Created!', {
        description: `${project.name} has been added to our animal welfare initiatives!`,
        duration: 5000
      })
    }
  }

  const fundProject = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, currentFunding: Math.min(project.fundingGoal, project.currentFunding + 100000) }
        : project
    ))
    
    toast.success('🚀 Emergency Funding Deployed!', {
      description: 'Funding boost sent to save more animals!',
      duration: 3000
    })
  }

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'Animal Welfare': return <Heart className="h-5 w-5" />
      case 'Marine Conservation': return <Fish className="h-5 w-5" />
      case 'Wildlife Conservation': return <TreePine className="h-5 w-5" />
      case 'Animal Rescue': return <Shield className="h-5 w-5" />
      default: return <Leaf className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'planning': return 'bg-yellow-600'
      case 'completed': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Green Projects Overview */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Globe className="h-6 w-6" />
            🌍 GLOBAL GREEN PROJECTS - BREAKING THE CAGE WORLD
            <Badge className="bg-green-600 text-white animate-pulse">LIBERATING ANIMALS WORLDWIDE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                ${(totalStats.totalFunding / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Total Funding Raised</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Heart className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{totalStats.animalsSaved.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Animals Helped</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{totalStats.activeProjects}</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {(totalStats.globalImpact / projects.length).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Average Progress</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-red-900/30 border border-red-500/20">
              <Globe className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">50+</div>
              <div className="text-xs text-muted-foreground">Countries Impacted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-5 w-5" />
            🚀 Active Animal Liberation Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 border border-border/50 rounded-lg bg-muted/20 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-green-400">
                    {getProjectIcon(project.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.toUpperCase()}
                  </Badge>
                  <div className={`text-sm font-bold ${getPriorityColor(project.priority)}`}>
                    {project.priority.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress:</span>
                    <span className="font-bold">
                      ${(project.currentFunding / 1000000).toFixed(1)}M / ${(project.fundingGoal / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <Progress value={(project.currentFunding / project.fundingGoal) * 100} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Location: </span>
                    <span className="font-semibold">{project.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Animals Helped: </span>
                    <span className="font-bold text-green-400">{project.animalsBenefited.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Impact: </span>
                    <span className="text-blue-400">{project.impact}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next: </span>
                    <span className="text-purple-400">{project.nextMilestone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => fundProject(project.id)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  🚀 Emergency Fund (+$100K)
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create New Project */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Plus className="h-5 w-5" />
            🆕 Launch New Animal Welfare Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Project Type (e.g., Animal Welfare)"
              value={newProject.type}
              onChange={(e) => setNewProject(prev => ({ ...prev, type: e.target.value }))}
            />
            <Input
              placeholder="Funding Goal (USD)"
              type="number"
              value={newProject.fundingGoal}
              onChange={(e) => setNewProject(prev => ({ ...prev, fundingGoal: e.target.value }))}
            />
            <Input
              placeholder="Location"
              value={newProject.location}
              onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <Textarea
            placeholder="Describe how this project will help animals and break the cage world..."
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
          />
          <Button 
            onClick={createProject}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            🚀 LAUNCH ANIMAL LIBERATION PROJECT
          </Button>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 OUR MISSION: END ANIMAL SUFFERING FOREVER</h3>
          <p className="text-muted-foreground mb-4">
            Every project we fund directly challenges the cage world and creates freedom for animals. 
            We're not just building sanctuaries - we're revolutionizing how humanity treats all living beings.
          </p>
          <p className="text-sm text-green-400 font-bold">
            🎵 "Seeds Will Form Into Music" - Every dollar creates harmony and freedom! 🎵
          </p>
        </div>
      </div>
    </div>
  )
}
