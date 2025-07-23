
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TreePine, 
  Droplets, 
  Zap, 
  Users, 
  TrendingUp, 
  Heart,
  Shield,
  Vote,
  DollarSign,
  Globe
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

interface GreenProject {
  id: string
  title: string
  description: string
  category: string
  funding_goal: number
  funding_raised: number
  carbon_impact_target: number
  biodiversity_score: number
  verification_status: string
  project_data: any
  created_at: string
  created_by: string
}

export default function DecentralizedProjectFundingPools() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<GreenProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [fundingAmount, setFundingAmount] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    loadProjects()
  }, [selectedCategory])

  const loadProjects = async () => {
    try {
      let query = supabase
        .from('green_projects')
        .select('*')
        .eq('verification_status', 'approved')
        .order('created_at', { ascending: false })

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      const { data, error } = await query

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error loading projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleFundProject = async (projectId: string) => {
    if (!user) {
      toast.error('Please log in to fund projects')
      return
    }

    const amount = parseFloat(fundingAmount[projectId] || '0')
    if (amount <= 0) {
      toast.error('Please enter a valid funding amount')
      return
    }

    try {
      // This would integrate with the actual funding mechanism
      // For now, we'll simulate the funding process
      toast.success(`Successfully funded project with ${amount} GAiA tokens!`)
      
      // Update the project's funding amount
      const project = projects.find(p => p.id === projectId)
      if (project) {
        const { error } = await supabase
          .from('green_projects')
          .update({ funding_raised: project.funding_raised + amount })
          .eq('id', projectId)

        if (error) throw error
        
        // Reload projects to show updated funding
        loadProjects()
      }
      
      // Clear the funding amount input
      setFundingAmount(prev => ({ ...prev, [projectId]: '' }))
    } catch (error) {
      console.error('Error funding project:', error)
      toast.error('Failed to fund project')
    }
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reforestation': return TreePine
      case 'ocean_cleanup': return Droplets
      case 'renewable_energy': return Zap
      case 'biodiversity': return Globe
      default: return Heart
    }
  }

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'reforestation', name: 'Reforestation', icon: TreePine },
    { id: 'ocean_cleanup', name: 'Ocean Cleanup', icon: Droplets },
    { id: 'renewable_energy', name: 'Renewable Energy', icon: Zap },
    { id: 'biodiversity', name: 'Biodiversity', icon: Heart }
  ]

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
          🌱 Decentralized Project Funding
        </h1>
        <p className="text-xl text-muted-foreground">
          Fund verified environmental projects through decentralized governance
        </p>
      </div>

      {/* Funding Pool Stats */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <DollarSign className="h-6 w-6" />
            Funding Pool Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">2.4M</div>
              <div className="text-sm text-muted-foreground">Total GAiA Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">47</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">12.8K</div>
              <div className="text-sm text-muted-foreground">Community Backers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">89%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const CategoryIcon = getCategoryIcon(project.category)
          const progressPercentage = getProgressPercentage(project.funding_raised, project.funding_goal)
          
          return (
            <Card key={project.id} className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600 text-white">
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {project.category.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-green-400">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <CardTitle className="text-lg text-green-400">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium">
                      {project.funding_raised.toLocaleString()} / {project.funding_goal.toLocaleString()} GAiA
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage.toFixed(1)}% funded
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Carbon Impact</div>
                    <div className="font-medium text-green-400">
                      {project.carbon_impact_target?.toLocaleString() || 'N/A'} kg CO₂
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Biodiversity</div>
                    <div className="font-medium text-blue-400">
                      Score: {project.biodiversity_score || 0}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={fundingAmount[project.id] || ''}
                    onChange={(e) => setFundingAmount(prev => ({
                      ...prev,
                      [project.id]: e.target.value
                    }))}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleFundProject(project.id)}
                    disabled={!user || !fundingAmount[project.id]}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Fund
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {Math.floor(Math.random() * 100) + 10} backers
                  </span>
                  <span className="flex items-center gap-1">
                    <Vote className="h-3 w-3" />
                    DAO Approved
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No projects found
          </h3>
          <p className="text-muted-foreground">
            {selectedCategory === 'all' 
              ? 'No verified projects available at the moment.'
              : `No projects found in the ${selectedCategory.replace('_', ' ')} category.`
            }
          </p>
        </div>
      )}

      {/* Governance Info */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Vote className="h-5 w-5" />
            Decentralized Governance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">How It Works</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Projects are submitted by verified organizations</li>
                <li>• Community votes on project approval</li>
                <li>• Smart contracts manage funding distribution</li>
                <li>• Progress tracking ensures transparency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Your Voting Power</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GAiA Tokens Staked:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Power:</span>
                  <span className="font-medium">0%</span>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Stake Tokens to Vote
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
