import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Activity, 
  TrendingUp, 
  Heart, 
  Globe, 
  Zap,
  Shield,
  Target,
  BarChart3,
  Eye,
  Timer,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TreePine,
  Home,
  Sparkles,
  Star
} from 'lucide-react'

interface LiveMetric {
  id: string
  name: string
  value: number
  previousValue: number
  trend: 'up' | 'down' | 'stable'
  changePercent: number
  unit: string
  category: 'funding' | 'rescue' | 'care' | 'habitat' | 'community'
  lastUpdated: string
}

interface RescueOperation {
  id: string
  animalName: string
  species: string
  location: string
  status: 'planning' | 'in-progress' | 'transport' | 'completed' | 'post-care'
  urgency: number
  progress: number
  teamSize: number
  fundingUsed: number
  estimatedCompletion: string
  lastUpdate: string
}

interface ImpactMilestone {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  category: string
  achievedDate?: string
  isCompleted: boolean
  nextMilestone: string
}

interface TransparencyEntry {
  id: string
  type: 'funding' | 'rescue' | 'habitat' | 'care' | 'gift' | 'product'
  description: string
  amount: number
  source: string
  destination: string
  timestamp: string
  verification: 'blockchain' | 'photo' | 'video' | 'report'
  verificationId: string
  impact: string
}

export function LiveProgressDashboard() {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetric[]>([
    {
      id: 'metric_001',
      name: 'Total Animals Rescued',
      value: 1247,
      previousValue: 1239,
      trend: 'up',
      changePercent: 0.6,
      unit: 'animals',
      category: 'rescue',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'metric_002',
      name: 'Active Rescue Operations',
      value: 23,
      previousValue: 28,
      trend: 'down',
      changePercent: -17.9,
      unit: 'operations',
      category: 'rescue',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'metric_003',
      name: 'Daily Funding Raised',
      value: 47250,
      previousValue: 43180,
      trend: 'up',
      changePercent: 9.4,
      unit: 'USD',
      category: 'funding',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'metric_004',
      name: 'Animals in Care',
      value: 8456,
      previousValue: 8439,
      trend: 'up',
      changePercent: 0.2,
      unit: 'animals',
      category: 'care',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'metric_005',
      name: 'Habitats Built',
      value: 87,
      previousValue: 86,
      trend: 'up',
      changePercent: 1.2,
      unit: 'habitats',
      category: 'habitat',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'metric_006',
      name: 'Community Members',
      value: 28647,
      previousValue: 28590,
      trend: 'up',
      changePercent: 0.2,
      unit: 'members',
      category: 'community',
      lastUpdated: new Date().toISOString()
    }
  ])

  const [activeRescues, setActiveRescues] = useState<RescueOperation[]>([
    {
      id: 'rescue_001',
      animalName: 'Luna',
      species: 'Arctic Wolf',
      location: 'Romania',
      status: 'in-progress',
      urgency: 10,
      progress: 78,
      teamSize: 6,
      fundingUsed: 8450,
      estimatedCompletion: '2024-01-22T16:00:00Z',
      lastUpdate: 'Emergency surgery completed successfully'
    },
    {
      id: 'rescue_002',
      animalName: 'Freedom',
      species: 'Tiger',
      location: 'Vietnam',
      status: 'transport',
      urgency: 9,
      progress: 65,
      teamSize: 8,
      fundingUsed: 18750,
      estimatedCompletion: '2024-01-25T12:00:00Z',
      lastUpdate: 'Secured transport vehicle, moving to sanctuary'
    },
    {
      id: 'rescue_003',
      animalName: 'Sunny',
      species: 'Elephant',
      location: 'Thailand',
      status: 'planning',
      urgency: 8,
      progress: 35,
      teamSize: 12,
      fundingUsed: 12800,
      estimatedCompletion: '2024-01-28T10:00:00Z',
      lastUpdate: 'Permits approved, assembling rescue team'
    }
  ])

  const [impactMilestones, setImpactMilestones] = useState<ImpactMilestone[]>([
    {
      id: 'milestone_001',
      title: '1000 Animals Rescued',
      description: 'Milestone: Reach 1000 total rescued animals',
      targetValue: 1000,
      currentValue: 1247,
      category: 'rescue',
      achievedDate: '2024-01-15T10:30:00Z',
      isCompleted: true,
      nextMilestone: '1500 Animals Rescued'
    },
    {
      id: 'milestone_002',
      title: '100 Habitats Built',
      description: 'Construct 100 safe habitats for rescued animals',
      targetValue: 100,
      currentValue: 87,
      category: 'habitat',
      isCompleted: false,
      nextMilestone: '150 Habitats Built'
    },
    {
      id: 'milestone_003',
      title: '$10M Total Funding',
      description: 'Reach $10 million in total funding raised',
      targetValue: 10000000,
      currentValue: 8750000,
      category: 'funding',
      isCompleted: false,
      nextMilestone: '$15M Total Funding'
    }
  ])

  const [transparencyLog, setTransparencyLog] = useState<TransparencyEntry[]>([
    {
      id: 'trans_001',
      type: 'funding',
      description: 'Emergency medical care funding for Luna',
      amount: 2500,
      source: 'Community Vault',
      destination: 'Romanian Wildlife Sanctuary',
      timestamp: '2024-01-20T14:30:00Z',
      verification: 'blockchain',
      verificationId: '0x742d35CC6Bb53D8d01F5eF3F',
      impact: 'Life-saving surgery completed successfully'
    },
    {
      id: 'trans_002',
      type: 'habitat',
      description: 'Habitat expansion for tiger sanctuary',
      amount: 15000,
      source: 'NFT Marketplace Sales',
      destination: 'Thai Tiger Sanctuary',
      timestamp: '2024-01-20T12:15:00Z',
      verification: 'photo',
      verificationId: 'IMG_HABITAT_001',
      impact: '500m² new habitat space created'
    },
    {
      id: 'trans_003',
      type: 'gift',
      description: 'GAiA Blackberry devices for field teams',
      amount: 1800,
      source: 'Community Vault',
      destination: 'Wildlife Research Network',
      timestamp: '2024-01-20T10:45:00Z',
      verification: 'video',
      verificationId: 'VID_DELIVERY_001',
      impact: '12 field teams now connected to GAiA network'
    }
  ])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update live metrics
      setLiveMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 10
        const newValue = Math.max(0, metric.value + change)
        const changePercent = ((newValue - metric.value) / metric.value) * 100
        
        return {
          ...metric,
          previousValue: metric.value,
          value: Math.round(newValue),
          changePercent: parseFloat(changePercent.toFixed(1)),
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
          lastUpdated: new Date().toISOString()
        }
      }))

      // Update rescue progress
      setActiveRescues(prev => prev.map(rescue => ({
        ...rescue,
        progress: Math.min(100, rescue.progress + Math.random() * 2)
      })))

      // Update milestones
      setImpactMilestones(prev => prev.map(milestone => {
        if (!milestone.isCompleted) {
          const increase = Math.random() * 10
          const newValue = milestone.currentValue + increase
          
          return {
            ...milestone,
            currentValue: Math.round(newValue),
            isCompleted: newValue >= milestone.targetValue,
            achievedDate: newValue >= milestone.targetValue ? new Date().toISOString() : undefined
          }
        }
        return milestone
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'funding': return 'text-green-400 border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30'
      case 'rescue': return 'text-red-400 border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30'
      case 'care': return 'text-blue-400 border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30'
      case 'habitat': return 'text-yellow-400 border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30'
      case 'community': return 'text-purple-400 border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30'
      default: return 'text-gray-400 border-gray-500/30 bg-gradient-to-br from-gray-900/30 to-gray-800/30'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      case 'stable': return <Target className="h-4 w-4 text-yellow-400" />
      default: return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600'
      case 'in-progress': return 'bg-blue-600'
      case 'transport': return 'bg-yellow-600'
      case 'planning': return 'bg-purple-600'
      case 'post-care': return 'bg-cyan-600'
      default: return 'bg-gray-600'
    }
  }

  const getVerificationIcon = (verification: string) => {
    switch (verification) {
      case 'blockchain': return <Shield className="h-4 w-4 text-blue-400" />
      case 'photo': return <Eye className="h-4 w-4 text-green-400" />
      case 'video': return <Activity className="h-4 w-4 text-purple-400" />
      case 'report': return <BarChart3 className="h-4 w-4 text-yellow-400" />
      default: return <CheckCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
            <Activity className="h-6 w-6" />
            📊 LIVE PROGRESS & IMPACT DASHBOARD
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Real-time tracking of all funding, rescue, care, and development activities with full transparency
          </p>
        </CardHeader>
      </Card>

      {/* Live Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {liveMetrics.map((metric) => (
          <Card key={metric.id} className={`border-2 ${getCategoryColor(metric.category)} animate-pulse-slow`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                {getTrendIcon(metric.trend)}
                <Badge className={`${metric.trend === 'up' ? 'bg-green-600' : metric.trend === 'down' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-xs`}>
                  {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.unit === 'USD' ? '$' : ''}{metric.value.toLocaleString()}{metric.unit === 'USD' ? '' : ` ${metric.unit}`}
              </div>
              <div className="text-xs text-muted-foreground">{metric.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                Updated: {new Date(metric.lastUpdated).toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active-rescues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-rescues">🚨 Active Rescues</TabsTrigger>
          <TabsTrigger value="impact-milestones">🏆 Impact Milestones</TabsTrigger>
          <TabsTrigger value="transparency-log">🔍 Transparency Log</TabsTrigger>
          <TabsTrigger value="global-impact">🌍 Global Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="active-rescues" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeRescues.map((rescue) => (
              <Card key={rescue.id} className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20 hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-red-400">{rescue.animalName}</CardTitle>
                    <Badge className={`${getStatusColor(rescue.status)} text-white`}>
                      {rescue.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{rescue.species}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location & Urgency */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-red-400" />
                      <span>{rescue.location}</span>
                    </div>
                    <Badge className="bg-red-600 text-white">
                      URGENCY {rescue.urgency}/10
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rescue Progress:</span>
                      <span className="text-green-400 font-bold">{rescue.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={rescue.progress} className="h-3" />
                  </div>

                  {/* Team & Funding */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-blue-900/30 rounded border border-blue-500/20">
                      <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-blue-400">{rescue.teamSize}</div>
                      <div className="text-xs text-muted-foreground">Team Size</div>
                    </div>
                    <div className="text-center p-2 bg-green-900/30 rounded border border-green-500/20">
                      <DollarSign className="h-4 w-4 text-green-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-green-400">${rescue.fundingUsed.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Funding Used</div>
                    </div>
                  </div>

                  {/* Timeline & Update */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-yellow-400" />
                      <span>ETA: {new Date(rescue.estimatedCompletion).toLocaleDateString()}</span>
                    </div>
                    <div className="p-2 bg-gray-900/40 rounded border border-gray-500/20">
                      <div className="text-xs font-bold text-green-400 mb-1">Latest Update:</div>
                      <div className="text-xs text-muted-foreground">{rescue.lastUpdate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact-milestones" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {impactMilestones.map((milestone) => (
              <Card key={milestone.id} className={`border-2 ${milestone.isCompleted ? 'border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30' : 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30'} hover:scale-105 transition-transform duration-300`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className={`${milestone.isCompleted ? 'text-green-400' : 'text-yellow-400'} text-lg`}>
                      {milestone.title}
                    </CardTitle>
                    {milestone.isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <Target className="h-6 w-6 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span className={`font-bold ${milestone.isCompleted ? 'text-green-400' : 'text-yellow-400'}`}>
                        {((milestone.currentValue / milestone.targetValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(milestone.currentValue / milestone.targetValue) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{milestone.currentValue.toLocaleString()}</span>
                      <span>Target: {milestone.targetValue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Achievement Status */}
                  {milestone.isCompleted ? (
                    <div className="p-3 bg-green-900/40 rounded border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-bold text-green-400">MILESTONE ACHIEVED!</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completed: {milestone.achievedDate ? new Date(milestone.achievedDate).toLocaleDateString() : 'Recently'}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-900/40 rounded border border-yellow-500/30">
                      <div className="text-sm font-bold text-yellow-400 mb-1">In Progress</div>
                      <div className="text-xs text-muted-foreground">
                        {(milestone.targetValue - milestone.currentValue).toLocaleString()} more needed
                      </div>
                    </div>
                  )}

                  {/* Next Milestone */}
                  <div className="p-2 bg-purple-900/30 rounded border border-purple-500/20">
                    <div className="text-xs font-bold text-purple-400 mb-1">Next Milestone:</div>
                    <div className="text-xs text-muted-foreground">{milestone.nextMilestone}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transparency-log" className="space-y-6">
          <div className="space-y-4">
            {transparencyLog.map((entry) => (
              <Card key={entry.id} className="border-gray-500/30 bg-gradient-to-r from-gray-900/40 to-gray-800/40 hover:scale-105 transition-transform duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getVerificationIcon(entry.verification)}
                      <div>
                        <div className="font-bold text-white">${entry.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{entry.type.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-1">
                        {entry.verification.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">{entry.description}</div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-blue-400">From:</span> {entry.source}
                      </div>
                      <div>
                        <span className="text-green-400">To:</span> {entry.destination}
                      </div>
                    </div>
                    <div className="p-2 bg-green-900/30 rounded border border-green-500/20">
                      <div className="text-xs font-bold text-green-400 mb-1">Impact Generated:</div>
                      <div className="text-xs text-muted-foreground">{entry.impact}</div>
                    </div>
                    <div className="p-2 bg-blue-900/30 rounded border border-blue-500/20">
                      <div className="text-xs font-bold text-blue-400 mb-1">Verification ID:</div>
                      <div className="text-xs font-mono text-muted-foreground">{entry.verificationId}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="global-impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Global Impact Summary Cards */}
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-400 mb-2">🌍</div>
                <h4 className="text-xl font-bold text-green-400 mb-2">Global Reach</h4>
                <div className="text-2xl font-bold text-white mb-1">67</div>
                <div className="text-sm text-muted-foreground">Countries Active</div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
              <CardContent className="p-6 text-center">
                <TreePine className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-400 mb-2">🌲</div>
                <h4 className="text-xl font-bold text-blue-400 mb-2">Habitat Impact</h4>
                <div className="text-2xl font-bold text-white mb-1">847,250</div>
                <div className="text-sm text-muted-foreground">m² Restored</div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-400 mb-2">💝</div>
                <h4 className="text-xl font-bold text-purple-400 mb-2">Community Care</h4>
                <div className="text-2xl font-bold text-white mb-1">24,567</div>
                <div className="text-sm text-muted-foreground">Care Instances</div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-yellow-400 mb-2">✨</div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Innovation</h4>
                <div className="text-2xl font-bold text-white mb-1">156</div>
                <div className="text-sm text-muted-foreground">Tech Solutions</div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Global Activity Feed */}
          <Card className="border-rainbow bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center justify-center text-purple-400">
                <Activity className="h-6 w-6" />
                🔴 LIVE GLOBAL ACTIVITY FEED
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-900/40 rounded border border-gray-500/20 animate-pulse">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="flex-1">
                      <div className="text-sm text-white">
                        {i % 3 === 0 && "🦋 New animal rescue funding received in Thailand"}
                        {i % 3 === 1 && "🏥 Medical care completed for tiger in Vietnam sanctuary"}
                        {i % 3 === 2 && "🏠 New habitat construction started in Romania"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(Date.now() - i * 30000).toLocaleString()}
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs">
                      LIVE
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}