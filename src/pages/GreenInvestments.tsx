
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Sun, 
  Recycle, 
  Leaf, 
  Target,
  TrendingUp,
  Users,
  Globe,
  Heart,
  Zap,
  Award
} from 'lucide-react'
import { toast } from 'sonner'
import { DonationWidget } from '@/components/donations/DonationWidget'

interface Project {
  id: string
  title: string
  description: string
  fundingGoal: number
  currentFunding: number
  backers: number
  category: string
  location: string
  impact: string
  image: string
  featured: boolean
  verified: boolean
  urgency: 'low' | 'medium' | 'high' | 'critical'
  completionDate: string
}

export default function GreenInvestments() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Amazon Rainforest Protection',
      description: 'Large-scale reforestation and indigenous community support program in the Brazilian Amazon.',
      fundingGoal: 500000,
      currentFunding: 387500,
      backers: 2847,
      category: 'forestry',
      location: 'Brazil',
      impact: '50,000 trees planted, 1,200 hectares protected',
      image: 'https://images.unsplash.com/photo-1574482620141-f3b2c1a4c1b2?w=500&h=300&fit=crop',
      featured: true,
      verified: true,
      urgency: 'critical',
      completionDate: '2024-12-31'
    },
    {
      id: '2', 
      title: 'Solar Panels for Rural Schools',
      description: 'Installing solar energy systems in 50 rural schools across Kenya to provide clean electricity.',
      fundingGoal: 250000,
      currentFunding: 180000,
      backers: 1456,
      category: 'renewable',
      location: 'Kenya',
      impact: '15,000 students benefited, 80% carbon reduction',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop',
      featured: true,
      verified: true,
      urgency: 'high',
      completionDate: '2024-10-15'
    },
    {
      id: '3',
      title: 'Ocean Cleanup Initiative',
      description: 'Advanced ocean cleaning technology deployment to remove plastic waste from the Pacific.',
      fundingGoal: 1000000,
      currentFunding: 650000,
      backers: 5230,
      category: 'ocean',
      location: 'Pacific Ocean',
      impact: '2.5M kg plastic removed, 500 marine species protected',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=300&fit=crop',
      featured: true,
      verified: true,
      urgency: 'high',
      completionDate: '2025-03-20'
    },
    {
      id: '4',
      title: 'Urban Vertical Farming',
      description: 'Establishing vertical farms in urban areas to provide fresh food with minimal water usage.',
      fundingGoal: 350000,
      currentFunding: 120000,
      backers: 890,
      category: 'agriculture',
      location: 'Singapore',
      impact: '90% water savings, 500 families fed daily',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop',
      featured: false,
      verified: true,
      urgency: 'medium',
      completionDate: '2024-11-30'
    },
    {
      id: '5',
      title: 'Wind Energy Cooperative',
      description: 'Community-owned wind turbines providing clean energy to rural communities in Denmark.',
      fundingGoal: 750000,
      currentFunding: 450000,
      backers: 2100,
      category: 'renewable',
      location: 'Denmark',
      impact: '12MW clean energy, 3,000 homes powered',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=300&fit=crop',
      featured: false,
      verified: true,
      urgency: 'medium',
      completionDate: '2025-01-15'
    },
    {
      id: '6',
      title: 'Waste-to-Energy Plant',
      description: 'Converting municipal waste into clean energy while reducing landfill dependency.',
      fundingGoal: 2000000,
      currentFunding: 800000,
      backers: 1200,
      category: 'waste',
      location: 'India',
      impact: '100 tons waste/day processed, 50MW energy generated',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop',
      featured: false,
      verified: true,
      urgency: 'high',
      completionDate: '2025-06-30'
    }
  ])

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'forestry', name: 'Forestry', icon: TreePine },
    { id: 'renewable', name: 'Renewable Energy', icon: Sun },
    { id: 'ocean', name: 'Ocean Conservation', icon: Droplets },
    { id: 'agriculture', name: 'Sustainable Agriculture', icon: Leaf },
    { id: 'waste', name: 'Waste Management', icon: Recycle }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const handleDonate = (projectId: string, amount: number) => {
    toast.success(`Donated $${amount} to project!`, {
      description: `Thank you for supporting green initiatives. GAiA tokens earned: ${amount * 10}`,
      duration: 5000
    })
    console.log(`Donation: $${amount} to project ${projectId}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          🌱 Green Investment Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Fund environmental projects, earn GAiA tokens, and create positive impact for our planet. 
          Every investment helps build a sustainable future.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6 text-center">
            <TreePine className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(projects.reduce((sum, p) => sum + p.currentFunding, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Funding</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              {projects.reduce((sum, p) => sum + p.backers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Active Backers</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto text-orange-400 mb-2" />
            <div className="text-2xl font-bold text-orange-400">
              {projects.filter(p => p.urgency === 'critical').length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 w-full">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.featured && (
                        <Badge className="bg-yellow-600 text-white">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {project.verified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      <Badge className={`${getUrgencyColor(project.urgency)} text-white`}>
                        {project.urgency.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{project.title}</span>
                      <Badge variant="outline">{project.location}</Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-bold">
                          {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
                        </span>
                      </div>
                      <Progress value={(project.currentFunding / project.fundingGoal) * 100} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatCurrency(project.currentFunding)} raised</span>
                        <span>{formatCurrency(project.fundingGoal)} goal</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span>{project.backers.toLocaleString()} backers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span>{project.impact}</span>
                      </div>
                    </div>

                    <DonationWidget onDonate={(amount) => handleDonate(project.id, amount)} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 border-rainbow">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            🌍 Global Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">2.8M</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">150MW</div>
              <div className="text-sm text-muted-foreground">Clean Energy Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50K</div>
              <div className="text-sm text-muted-foreground">Lives Improved</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <DonationWidget onDonate={(amount) => handleDonate('general', amount)} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
