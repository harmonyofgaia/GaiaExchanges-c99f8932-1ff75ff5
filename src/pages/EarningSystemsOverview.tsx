
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Coins, 
  Award, 
  Bike,
  PartyPopper,
  Carrot,
  TreePine,
  Users,
  Calendar,
  Star,
  Gift,
  Leaf,
  Home
} from 'lucide-react'
import { toast } from 'sonner'

interface EarningSystem {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  pointsReward: number
  tokenReward: number
  status: 'active' | 'development' | 'planned'
  category: 'environmental' | 'community' | 'lifestyle' | 'education'
  discountAvailable?: number
  requirements: string[]
  benefits: string[]
}

export default function EarningSystemsOverview() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const earningSystems: EarningSystem[] = [
    {
      id: 'home-grown-food',
      name: '🥕 Home Grown Food',
      icon: <Carrot className="h-6 w-6" />,
      description: 'Grow your own organic food and earn rewards for sustainable living',
      pointsReward: 20,
      tokenReward: 4,
      status: 'active',
      category: 'environmental',
      discountAvailable: 15,
      requirements: ['Photo proof of harvest', 'Minimum 1kg harvest', 'Organic methods'],
      benefits: ['GAiA tokens', '15% discount on seeds', 'Eco warrior badge', 'Community recognition']
    },
    {
      id: 'gaia-eco-bike',
      name: '🚲 GAiA Eco Bike System',
      icon: <Bike className="h-6 w-6" />,
      description: 'Sustainable transportation with bike-sharing and eco-friendly commuting rewards',
      pointsReward: 15,
      tokenReward: 3,
      status: 'active',
      category: 'lifestyle',
      discountAvailable: 20,
      requirements: ['Bike registration', 'Minimum 5km rides', 'Weekly activity'],
      benefits: ['Daily ride rewards', '20% bike rental discount', 'Carbon offset credits', 'Fitness tracking']
    },
    {
      id: 'community-parties',
      name: '🎉 Community Party Events',
      icon: <PartyPopper className="h-6 w-6" />,
      description: 'Organize and participate in eco-friendly community events and celebrations',
      pointsReward: 30,
      tokenReward: 6,
      status: 'active',
      category: 'community',
      discountAvailable: 25,
      requirements: ['Event registration', 'Eco-friendly practices', 'Community participation'],
      benefits: ['Event hosting rewards', '25% venue discount', 'Social impact badges', 'Network expansion']
    },
    {
      id: 'bee-hotel',
      name: '🐝 Bee Hotel Maintenance',
      icon: <Home className="h-5 w-5" />,
      description: 'Support local pollinators by maintaining bee hotels',
      pointsReward: 25,
      tokenReward: 5,
      status: 'active',
      category: 'environmental',
      requirements: ['Hotel installation', 'Monthly maintenance', 'Occupancy reporting'],
      benefits: ['Pollinator support', 'Biodiversity points', 'Environmental impact tracking']
    },
    {
      id: 'water-saving',
      name: '💧 Water Conservation',
      icon: <TreePine className="h-6 w-6" />,
      description: 'Implement water-saving techniques and track conservation efforts',
      pointsReward: 10,
      tokenReward: 2,
      status: 'active',
      category: 'environmental',
      requirements: ['Water usage tracking', 'Conservation methods', 'Monthly reporting'],
      benefits: ['Conservation rewards', 'Utility bill reduction', 'Environmental badges']
    },
    {
      id: 'skill-work',
      name: '🛠️ Skill-Based Earning',
      icon: <Star className="h-6 w-6" />,
      description: 'Use your professional skills to contribute to environmental projects',
      pointsReward: 50,
      tokenReward: 10,
      status: 'active',
      category: 'education',
      requirements: ['Skill verification', 'Project completion', 'Quality assessment'],
      benefits: ['Professional development', 'Network building', 'Premium rewards']
    },
    {
      id: 'referral-system',
      name: '👥 Community Referrals',
      icon: <Users className="h-6 w-6" />,
      description: 'Invite friends and family to join the GAiA ecosystem',
      pointsReward: 100,
      tokenReward: 20,
      status: 'active',
      category: 'community',
      requirements: ['Active referral', 'New user verification', 'First action completion'],
      benefits: ['Massive bonus rewards', 'Lifetime earning percentage', 'VIP status']
    },
    {
      id: 'carbon-credits',
      name: '🌱 Carbon Credit Trading',
      icon: <Leaf className="h-6 w-6" />,
      description: 'Generate and trade verified carbon credits through environmental actions',
      pointsReward: 75,
      tokenReward: 15,
      status: 'development',
      category: 'environmental',
      requirements: ['Action verification', 'Carbon calculation', 'Third-party validation'],
      benefits: ['Tradeable credits', 'Environmental certification', 'Premium rewards']
    },
    {
      id: 'educational-content',
      name: '📚 Environmental Education',
      icon: <Award className="h-6 w-6" />,
      description: 'Create and consume educational content about sustainability',
      pointsReward: 15,
      tokenReward: 3,
      status: 'development',
      category: 'education',
      requirements: ['Content creation', 'Peer review', 'Impact measurement'],
      benefits: ['Knowledge sharing', 'Teaching credentials', 'Community recognition']
    },
    {
      id: 'seasonal-challenges',
      name: '🎯 Seasonal Eco Challenges',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Participate in seasonal environmental challenges and competitions',
      pointsReward: 40,
      tokenReward: 8,
      status: 'planned',
      category: 'community',
      discountAvailable: 30,
      requirements: ['Challenge participation', 'Goal achievement', 'Community voting'],
      benefits: ['Seasonal rewards', '30% challenge gear discount', 'Limited edition badges']
    },
    {
      id: 'green-marketplace',
      name: '🛒 Green Marketplace Rewards',
      icon: <Gift className="h-6 w-6" />,
      description: 'Earn rewards for purchasing eco-friendly products and services',
      pointsReward: 5,
      tokenReward: 1,
      status: 'planned',
      category: 'lifestyle',
      discountAvailable: 10,
      requirements: ['Verified eco-purchases', 'Product reviews', 'Sustainability ratings'],
      benefits: ['Purchase rewards', '10% marketplace discount', 'Eco-certified products']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Systems', count: earningSystems.length },
    { id: 'environmental', label: 'Environmental', count: earningSystems.filter(s => s.category === 'environmental').length },
    { id: 'community', label: 'Community', count: earningSystems.filter(s => s.category === 'community').length },
    { id: 'lifestyle', label: 'Lifestyle', count: earningSystems.filter(s => s.category === 'lifestyle').length },
    { id: 'education', label: 'Education', count: earningSystems.filter(s => s.category === 'education').length }
  ]

  const filteredSystems = selectedCategory === 'all' 
    ? earningSystems 
    : earningSystems.filter(system => system.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'development': return 'bg-orange-600'
      case 'planned': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'border-green-500/50 bg-green-900/20'
      case 'community': return 'border-purple-500/50 bg-purple-900/20'
      case 'lifestyle': return 'border-blue-500/50 bg-blue-900/20'
      case 'education': return 'border-orange-500/50 bg-orange-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  const handleJoinSystem = (systemId: string, systemName: string) => {
    toast.success('🌱 System Activated!', {
      description: `You've joined ${systemName}. Start earning rewards now!`,
      duration: 4000
    })
  }

  const totalActiveRewards = earningSystems
    .filter(s => s.status === 'active')
    .reduce((acc, s) => acc + s.tokenReward, 0)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌍 GAiA Earning Systems
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Complete overview of all earning opportunities • Token rewards • Community impact
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1 text-green-400">
            <Coins className="h-4 w-4" />
            <span>{totalActiveRewards} tokens available daily</span>
          </div>
          <div className="flex items-center gap-1 text-purple-400">
            <Award className="h-4 w-4" />
            <span>{earningSystems.filter(s => s.status === 'active').length} active systems</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {category.label} ({category.count})
          </Button>
        ))}
      </div>

      {/* Earning Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSystems.map((system) => (
          <Card 
            key={system.id}
            className={`${getCategoryColor(system.category)} transition-all duration-300 hover:scale-105`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(system.status)} text-white`}>
                  {system.status.toUpperCase()}
                </Badge>
                {system.discountAvailable && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    {system.discountAvailable}% OFF
                  </Badge>
                )}
              </div>
              <CardTitle className="flex items-center gap-2">
                {system.icon}
                {system.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {system.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-green-400">
                    <Coins className="h-4 w-4" />
                    {system.pointsReward} pts
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Star className="h-4 w-4" />
                    {system.tokenReward} GAiA
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Requirements:</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {system.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Benefits:</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {system.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => handleJoinSystem(system.id, system.name)}
                className={`w-full ${
                  system.status === 'active' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : system.status === 'development'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={system.status !== 'active'}
              >
                {system.status === 'active' ? 'Join & Start Earning' : 
                 system.status === 'development' ? 'Coming Soon' : 'Planned'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-green-900/30 to-purple-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-center text-green-400">💰 Your Earning Potential</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{earningSystems.filter(s => s.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Systems</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{earningSystems.filter(s => s.status === 'development').length}</div>
              <div className="text-sm text-muted-foreground">In Development</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{earningSystems.filter(s => s.status === 'planned').length}</div>
              <div className="text-sm text-muted-foreground">Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{totalActiveRewards}</div>
              <div className="text-sm text-muted-foreground">Daily Token Potential</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
