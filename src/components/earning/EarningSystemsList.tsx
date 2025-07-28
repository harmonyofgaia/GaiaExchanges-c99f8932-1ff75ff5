
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Coins, 
  Award, 
  Bike, 
  Carrot, 
  PartyPopper, 
  Users,
  Zap,
  TreePine,
  Droplets,
  GraduationCap,
  Heart
} from 'lucide-react'

interface EarningSystem {
  id: string
  name: string
  description: string
  status: 'active' | 'development' | 'planned'
  pointsReward: number
  tokensReward: number
  icon: any
  category: string
  features: string[]
  progress: number
}

const EARNING_SYSTEMS: EarningSystem[] = [
  {
    id: 'home-grown-food',
    name: '🥕 Home Grown Food System',
    description: 'Earn tokens by growing and harvesting your own organic food',
    status: 'active',
    pointsReward: 20,
    tokensReward: 4,
    icon: Carrot,
    category: 'Environmental',
    features: ['Crop tracking', 'Harvest rewards', 'Organic bonuses', 'Seed sharing'],
    progress: 100
  },
  {
    id: 'gaia-eco-bike',
    name: '🚲 GAiA Eco Bike System',
    description: 'Earn rewards for eco-friendly bike transportation and routes',
    status: 'development',
    pointsReward: 15,
    tokensReward: 3,
    icon: Bike,
    category: 'Transportation',
    features: ['Route tracking', 'Distance rewards', 'Carbon offset calculation', 'Community challenges'],
    progress: 65
  },
  {
    id: 'water-conservation',
    name: '💧 Water Conservation Actions',
    description: 'Track water-saving activities and earn environmental impact tokens',
    status: 'active',
    pointsReward: 10,
    tokensReward: 2,
    icon: Droplets,
    category: 'Environmental',
    features: ['Water tracking', 'Conservation methods', 'Impact measurement', 'Verification system'],
    progress: 100
  },
  {
    id: 'party-events',
    name: '🎉 Community Party & Events',
    description: 'Organize and participate in eco-friendly community events',
    status: 'planned',
    pointsReward: 50,
    tokensReward: 10,
    icon: PartyPopper,
    category: 'Community',
    features: ['Event creation', 'Participation rewards', 'Eco-friendly bonuses', 'Social impact'],
    progress: 25
  },
  {
    id: 'referral-system',
    name: '👥 Referral & Community Building',
    description: 'Earn ongoing rewards for bringing new members to the community',
    status: 'active',
    pointsReward: 50,
    tokensReward: 10,
    icon: Users,
    category: 'Community',
    features: ['Referral tracking', 'Ongoing bonuses', 'Community growth', 'Multi-tier rewards'],
    progress: 100
  },
  {
    id: 'skill-based-earning',
    name: '⚡ Skill-Based Work System',
    description: 'Monetize your skills while contributing to environmental projects',
    status: 'active',
    pointsReward: 100,
    tokensReward: 20,
    icon: Zap,
    category: 'Professional',
    features: ['Skill verification', 'Project matching', 'Quality ratings', 'Fair compensation'],
    progress: 100
  },
  {
    id: 'bee-hotel-maintenance',
    name: '🐝 Bee Hotel & Biodiversity',
    description: 'Support pollinators through bee hotel installation and maintenance',
    status: 'active',
    pointsReward: 25,
    tokensReward: 5,
    icon: TreePine,
    category: 'Environmental',
    features: ['Hotel tracking', 'Maintenance rewards', 'Biodiversity impact', 'Educational content'],
    progress: 100
  },
  {
    id: 'environmental-education',
    name: '📚 Environmental Education',
    description: 'Learn and teach environmental topics to earn knowledge tokens',
    status: 'active',
    pointsReward: 15,
    tokensReward: 3,
    icon: GraduationCap,
    category: 'Education',
    features: ['Course completion', 'Teaching rewards', 'Content creation', 'Impact tracking'],
    progress: 100
  },
  {
    id: 'carbon-credits',
    name: '🌱 Carbon Credit Actions',
    description: 'Generate and trade verified carbon credits through environmental actions',
    status: 'development',
    pointsReward: 30,
    tokensReward: 6,
    icon: TreePine,
    category: 'Environmental',
    features: ['Carbon tracking', 'Verification system', 'Credit marketplace', 'Impact measurement'],
    progress: 75
  },
  {
    id: 'wellness-mindfulness',
    name: '❤️ Wellness & Mindfulness',
    description: 'Earn rewards for mental health and wellness activities in nature',
    status: 'planned',
    pointsReward: 20,
    tokensReward: 4,
    icon: Heart,
    category: 'Wellness',
    features: ['Activity tracking', 'Nature integration', 'Mental health support', 'Community wellness'],
    progress: 15
  }
]

export function EarningSystemsList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'development': return 'bg-yellow-600'
      case 'planned': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environmental': return 'border-green-500/30 bg-green-900/20'
      case 'Community': return 'border-purple-500/30 bg-purple-900/20'
      case 'Transportation': return 'border-blue-500/30 bg-blue-900/20'
      case 'Professional': return 'border-cyan-500/30 bg-cyan-900/20'
      case 'Education': return 'border-orange-500/30 bg-orange-900/20'
      case 'Wellness': return 'border-pink-500/30 bg-pink-900/20'
      default: return 'border-gray-500/30 bg-gray-900/20'
    }
  }

  const activeCount = EARNING_SYSTEMS.filter(s => s.status === 'active').length
  const developmentCount = EARNING_SYSTEMS.filter(s => s.status === 'development').length
  const plannedCount = EARNING_SYSTEMS.filter(s => s.status === 'planned').length

  return (
    <div className="space-y-6">
      <Card className="border-emerald-500/50 bg-gradient-to-r from-emerald-900/30 to-green-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Coins className="h-6 w-6" />
            GAiA Earning Systems Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{activeCount}</div>
              <div className="text-sm text-green-300">Active Systems</div>
            </div>
            <div className="text-center p-4 bg-yellow-800/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{developmentCount}</div>
              <div className="text-sm text-yellow-300">In Development</div>
            </div>
            <div className="text-center p-4 bg-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{plannedCount}</div>
              <div className="text-sm text-blue-300">Planned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EARNING_SYSTEMS.map((system) => {
          const IconComponent = system.icon

          return (
            <Card 
              key={system.id}
              className={`${getCategoryColor(system.category)} transition-all duration-300 hover:scale-105`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(system.status)} text-white`}>
                    {system.status.toUpperCase()}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{system.category}</div>
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconComponent className="h-5 w-5" />
                  {system.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {system.description}
                </p>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-green-400">
                    <Coins className="h-4 w-4" />
                    {system.pointsReward} points
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Award className="h-4 w-4" />
                    {system.tokensReward} tokens
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Implementation</span>
                    <span>{system.progress}%</span>
                  </div>
                  <Progress value={system.progress} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {system.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
