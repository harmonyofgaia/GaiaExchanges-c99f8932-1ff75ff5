import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Heart,
  TrendingUp,
  Users,
  Target,
  Zap
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { toast } from 'sonner'
import { DonationWidget } from '@/components/donations/DonationWidget'

interface GreenProject {
  id: string
  name: string
  description: string
  category: string
  raised: number
  target: number
  expectedROI: string
  riskLevel: 'Low' | 'Medium' | 'High'
  impactScore: number
  backers: number
}

const mockProjects: GreenProject[] = [
  {
    id: 'amazon-reforestation',
    name: 'Amazon Reforestation Initiative',
    description: 'Planting trees in deforested areas of the Amazon rainforest.',
    category: 'Forestry',
    raised: 75000,
    target: 150000,
    expectedROI: '8%',
    riskLevel: 'Low',
    impactScore: 85,
    backers: 235
  },
  {
    id: 'ocean-cleanup',
    name: 'Great Pacific Garbage Patch Cleanup',
    description: 'Removing plastic waste from the ocean to protect marine life.',
    category: 'Ocean Cleanup',
    raised: 120000,
    target: 200000,
    expectedROI: '7%',
    riskLevel: 'Medium',
    impactScore: 92,
    backers: 312
  },
  {
    id: 'solar-energy-africa',
    name: 'Solar Energy for Rural Africa',
    description: 'Providing clean energy to rural communities through solar panel installations.',
    category: 'Renewable Energy',
    raised: 90000,
    target: 120000,
    expectedROI: '9%',
    riskLevel: 'Low',
    impactScore: 88,
    backers: 287
  },
  {
    id: 'urban-gardens-nyc',
    name: 'NYC Urban Gardens Project',
    description: 'Creating community gardens in urban areas to promote sustainable food sources.',
    category: 'Sustainable Agriculture',
    raised: 60000,
    target: 100000,
    expectedROI: '6%',
    riskLevel: 'Medium',
    impactScore: 78,
    backers: 198
  },
  {
    id: 'wildlife-conservation-kenya',
    name: 'Kenyan Wildlife Conservation',
    description: 'Protecting endangered species and their habitats in Kenya.',
    category: 'Wildlife Conservation',
    raised: 110000,
    target: 180000,
    expectedROI: '7.5%',
    riskLevel: 'Medium',
    impactScore: 90,
    backers: 265
  },
  {
    id: 'sustainable-coffee-colombia',
    name: 'Sustainable Coffee Farming in Colombia',
    description: 'Supporting sustainable coffee farming practices to improve livelihoods and protect ecosystems.',
    category: 'Sustainable Agriculture',
    raised: 80000,
    target: 140000,
    expectedROI: '8.5%',
    riskLevel: 'Low',
    impactScore: 82,
    backers: 241
  }
]

export default function GreenInvestments() {
  const [projects, setProjects] = useState<GreenProject[]>(mockProjects)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleDonate = (projectId: string, amount: number) => {
    // Convert amount to number if it's a string
    const donationAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast.error('Please enter a valid donation amount')
      return
    }

    toast.success(`💚 Donated $${donationAmount} to project!`, {
      description: 'Thank you for supporting green initiatives',
      duration: 5000
    })
    
    console.log(`Donation of $${donationAmount} made to project ${projectId}`)
  }

  const handleQuickDonate = (projectId: string, amount: string) => {
    // Convert string amount to number before passing to handleDonate
    const numericAmount = parseFloat(amount)
    if (!isNaN(numericAmount) && numericAmount > 0) {
      handleDonate(projectId, numericAmount)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Forestry':
        return 'bg-green-600 text-white'
      case 'Ocean Cleanup':
        return 'bg-blue-600 text-white'
      case 'Renewable Energy':
        return 'bg-yellow-600 text-black'
      case 'Sustainable Agriculture':
        return 'bg-orange-600 text-white'
      case 'Wildlife Conservation':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'Forestry':
        return <TreePine className="h-4 w-4 mr-1" />
      case 'Ocean Cleanup':
        return <Droplets className="h-4 w-4 mr-1" />
      case 'Renewable Energy':
        return <Wind className="h-4 w-4 mr-1" />
      case 'Sustainable Agriculture':
        return <TreePine className="h-4 w-4 mr-1" />
      case 'Wildlife Conservation':
        return <Zap className="h-4 w-4 mr-1" />
      default:
        return <Heart className="h-4 w-4 mr-1" />
    }
  }

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            🌱 Green Investments Portal
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Invest in sustainable projects and earn environmental impact tokens
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Total Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5.2M</div>
              <p className="text-sm text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Investors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,457</div>
              <p className="text-sm text-muted-foreground">Participating in green initiatives</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Projects Funded
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">Impacting communities worldwide</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <TreePine className="h-5 w-5" />
                Trees Planted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87,500</div>
              <p className="text-sm text-muted-foreground">Contributing to reforestation efforts</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Widget */}
        <div className="mb-8">
          <DonationWidget onDonate={handleDonate} />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Explore Projects by Category</h3>
          <div className="flex gap-4 overflow-x-auto">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              All Categories
            </Button>
            <Button
              variant={selectedCategory === 'Forestry' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('Forestry')}
              className={selectedCategory === 'Forestry' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              Forestry
            </Button>
            <Button
              variant={selectedCategory === 'Ocean Cleanup' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('Ocean Cleanup')}
              className={selectedCategory === 'Ocean Cleanup' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              Ocean Cleanup
            </Button>
            <Button
              variant={selectedCategory === 'Renewable Energy' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('Renewable Energy')}
              className={selectedCategory === 'Renewable Energy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              Renewable Energy
            </Button>
            <Button
              variant={selectedCategory === 'Sustainable Agriculture' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('Sustainable Agriculture')}
              className={selectedCategory === 'Sustainable Agriculture' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              Sustainable Agriculture
            </Button>
            <Button
              variant={selectedCategory === 'Wildlife Conservation' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('Wildlife Conservation')}
              className={selectedCategory === 'Wildlife Conservation' ? 'bg-green-600 hover:bg-green-700 text-white' : 'border-green-500/30 text-green-400'}
            >
              Wildlife Conservation
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-gradient-to-br from-gray-900/50 to-black/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {getProjectIcon(project.category)}
                  {project.name}
                </CardTitle>
                <Badge className={getCategoryColor(project.category)}>
                  {project.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{project.description}</p>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-bold">{Math.round((project.raised / project.target) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(project.raised / project.target) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">${project.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${project.target.toLocaleString()}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">ROI Expected</div>
                    <div className="text-green-400 font-bold">{project.expectedROI}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Risk Level</div>
                    <div className={`font-bold ${project.riskLevel === 'Low' ? 'text-green-400' : project.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {project.riskLevel}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Impact Score</div>
                    <div className="text-blue-400 font-bold">{project.impactScore}/100</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Backers</div>
                    <div className="text-purple-400 font-bold">{project.backers}</div>
                  </div>
                </div>

                {/* Quick Donate Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickDonate(project.id, amount.toString())}
                      className="text-xs border-green-500/30 hover:bg-green-500/20"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                {/* Main Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => handleDonate(project.id, 25)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Donation Widget at Bottom */}
        <div className="mt-12">
          <DonationWidget onDonate={handleDonate} />
        </div>
      </div>
    </div>
  )
}
