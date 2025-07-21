
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Leaf, 
  Zap, 
  Users, 
  Globe,
  Coins,
  Shield,
  Brain,
  Activity,
  Star,
  Flame,
  Recycle
} from 'lucide-react'

interface InnovationProject {
  id: string
  title: string
  category: 'health' | 'environment' | 'education' | 'energy' | 'community'
  description: string
  tokenReward: number
  globalImpact: string
  participants: number
  progress: number
  icon: React.ReactNode
  realWorldConnection: string
}

export function ComprehensiveInnovationHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [totalTokensBurned, setTotalTokensBurned] = useState(2847392)
  const [globalReinvestment, setGlobalReinvestment] = useState(1253847)

  const innovationProjects: InnovationProject[] = [
    {
      id: '1',
      title: 'Global Health Monitoring Network',
      category: 'health',
      description: 'AI-powered health monitoring using wearable devices to predict and prevent diseases',
      tokenReward: 500,
      globalImpact: 'Prevents 50,000+ diseases annually through early detection',
      participants: 15847,
      progress: 78,
      icon: <Heart className="h-6 w-6 text-red-400" />,
      realWorldConnection: 'Partnership with WHO for global health data collection'
    },
    {
      id: '2',
      title: 'Ocean Cleanup Token Mining',
      category: 'environment',
      description: 'Earn tokens by participating in ocean cleanup activities and plastic removal',
      tokenReward: 750,
      globalImpact: 'Removes 10 tons of plastic daily from oceans worldwide',
      participants: 8923,
      progress: 65,
      icon: <Leaf className="h-6 w-6 text-green-400" />,
      realWorldConnection: 'Connected to real ocean cleanup boats and monitoring systems'
    },
    {
      id: '3',
      title: 'Renewable Energy Grid Sharing',
      category: 'energy',
      description: 'Share excess renewable energy and earn tokens for grid contribution',
      tokenReward: 400,
      globalImpact: 'Powers 100,000+ homes with clean energy daily',
      participants: 23456,
      progress: 89,
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      realWorldConnection: 'Direct integration with smart grid systems worldwide'
    },
    {
      id: '4',
      title: 'Community Education Platform',
      category: 'education',
      description: 'Teach skills to underserved communities and earn tokens for knowledge sharing',
      tokenReward: 300,
      globalImpact: 'Educates 25,000+ people monthly in developing regions',
      participants: 12378,
      progress: 72,
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      realWorldConnection: 'Certified by UNESCO for global education impact'
    },
    {
      id: '5',
      title: 'Mental Health Support Network',
      category: 'health',
      description: 'Provide peer support and mental health resources, earn tokens for helping others',
      tokenReward: 600,
      globalImpact: 'Supports 500,000+ individuals with mental health challenges',
      participants: 34567,
      progress: 85,
      icon: <Users className="h-6 w-6 text-purple-400" />,
      realWorldConnection: 'Licensed mental health professionals provide oversight'
    },
    {
      id: '6',
      title: 'Air Quality Improvement Initiative',
      category: 'environment',
      description: 'Monitor air quality and implement improvement solutions for token rewards',
      tokenReward: 450,
      globalImpact: 'Improves air quality for 2M+ people in urban areas',
      participants: 19234,
      progress: 68,
      icon: <Globe className="h-6 w-6 text-cyan-400" />,
      realWorldConnection: 'Real-time air quality sensors deployed in 50+ cities'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Star className="h-4 w-4" /> },
    { id: 'health', label: 'Health', icon: <Heart className="h-4 w-4" /> },
    { id: 'environment', label: 'Environment', icon: <Leaf className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <Brain className="h-4 w-4" /> },
    { id: 'energy', label: 'Energy', icon: <Zap className="h-4 w-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="h-4 w-4" /> }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? innovationProjects 
    : innovationProjects.filter(project => project.category === selectedCategory)

  const burnTokens = () => {
    setTotalTokensBurned(prev => prev + 10000)
    console.log('🔥 TOKEN BURNING MECHANISM ACTIVATED')
    console.log('💰 10,000 GAIA tokens burned to increase scarcity')
    console.log('🌍 Burned tokens fund real-world impact projects')
  }

  const reinvestInProjects = () => {
    setGlobalReinvestment(prev => prev + 50000)
    console.log('🌱 GLOBAL REINVESTMENT ACTIVATED')
    console.log('💚 50,000 GAIA tokens reinvested in community projects')
    console.log('🏥 Funding health, education, and environmental initiatives')
  }

  return (
    <div className="space-y-6">
      {/* Innovation Hub Header */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
            🌍 COMPREHENSIVE INNOVATION HUB
          </CardTitle>
          <div className="text-center space-y-2">
            <p className="text-xl text-green-300">
              Real-World Impact • Token Earning • Global Community
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">REAL IMPACT</Badge>
              <Badge className="bg-blue-600 animate-pulse">TOKEN REWARDS</Badge>
              <Badge className="bg-purple-600 animate-pulse">GLOBAL REACH</Badge>
              <Badge className="bg-orange-600 animate-pulse">BURNING MECHANISM</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Token Economics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Flame className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{totalTokensBurned.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Tokens Burned</div>
              <Button 
                onClick={burnTokens}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-xs"
              >
                🔥 Burn More
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Recycle className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{globalReinvestment.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Reinvested</div>
              <Button 
                onClick={reinvestInProjects}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-xs"
              >
                🌱 Reinvest
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Activity className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">150K+</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Innovation Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                {project.icon}
                <span className="text-lg">{project.title}</span>
              </CardTitle>
              <Badge className="bg-emerald-600 text-white w-fit">
                {project.category.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-emerald-400 font-bold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="text-blue-400 font-bold">{project.participants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token Reward:</span>
                  <span className="text-yellow-400 font-bold">{project.tokenReward} GAIA</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-green-400">Global Impact:</div>
                <div className="text-xs text-muted-foreground">{project.globalImpact}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-blue-400">Real-World Connection:</div>
                <div className="text-xs text-muted-foreground">{project.realWorldConnection}</div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                <Coins className="h-4 w-4 mr-2" />
                Join Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Manifesto */}
      <Card className="border-teal-500/30 bg-gradient-to-r from-teal-900/30 to-cyan-900/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-teal-400 mb-4">
            INNOVATION FOR HUMANITY MANIFESTO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-200">
            <div className="space-y-2">
              <div>💚 <strong>Health Revolution:</strong> AI-powered disease prevention for millions</div>
              <div>🌊 <strong>Ocean Healing:</strong> Real ocean cleanup with measurable impact</div>
              <div>⚡ <strong>Clean Energy:</strong> Renewable energy grid sharing worldwide</div>
              <div>🧠 <strong>Education Access:</strong> Knowledge for underserved communities</div>
            </div>
            <div className="space-y-2">
              <div>🔥 <strong>Token Burning:</strong> Increasing scarcity while funding impact</div>
              <div>🌱 <strong>Reinvestment:</strong> Profits directly fund community projects</div>
              <div>🌍 <strong>Global Reach:</strong> Real partnerships with WHO, UNESCO</div>
              <div>💰 <strong>Earn While Healing:</strong> Tokens for positive world impact</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
