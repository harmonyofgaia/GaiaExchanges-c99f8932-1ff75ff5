import { useState, useEffect } from 'react'
import { getBackgroundColorClass } from '@/utils/badgeHelpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Waves, 
  Fish, 
  Thermometer, 
  Droplets, 
  Camera, 
  MapPin, 
  Calendar,
  TrendingUp,
  Heart,
  Users,
  Award,
  Target,
  Activity,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface CoralSite {
  id: string
  name: string
  location: string
  depth: number
  temperature: number
  ph: number
  coralCoverage: number
  healthScore: number
  lastSurvey: string
  status: 'healthy' | 'degraded' | 'critical' | 'recovering'
  species: string[]
}

interface RestorationActivity {
  id: string
  type: 'transplant' | 'monitoring' | 'cleanup' | 'research'
  site: string
  date: string
  participants: number
  impact: string
  status: 'completed' | 'ongoing' | 'planned'
}

export default function CoralReefRestorationProject() {
  const [selectedSite, setSelectedSite] = useState<string>('')
  const [projectProgress, setProjectProgress] = useState(0)
  const [totalCoralsPlanted, setTotalCoralsPlanted] = useState(0)
  const [waterQualityScore, setWaterQualityScore] = useState(0)
  const [biodiversityIndex, setBiodiversityIndex] = useState(0)
  const [isMonitoring, setIsMonitoring] = useState(false)

  const coralSites: CoralSite[] = [
    {
      id: 'site-1',
      name: 'Rainbow Reef',
      location: 'Great Barrier Reef, Australia',
      depth: 15,
      temperature: 26.5,
      ph: 8.1,
      coralCoverage: 75,
      healthScore: 85,
      lastSurvey: '2024-01-15',
      status: 'healthy',
      species: ['Staghorn Coral', 'Brain Coral', 'Table Coral', 'Soft Coral']
    },
    {
      id: 'site-2',
      name: 'Turtle Bay Sanctuary',
      location: 'Maldives',
      depth: 12,
      temperature: 28.2,
      ph: 7.9,
      coralCoverage: 45,
      healthScore: 60,
      lastSurvey: '2024-01-10',
      status: 'degraded',
      species: ['Plate Coral', 'Finger Coral', 'Mushroom Coral']
    },
    {
      id: 'site-3',
      name: 'Crystal Gardens',
      location: 'Caribbean Sea',
      depth: 20,
      temperature: 27.8,
      ph: 8.0,
      coralCoverage: 30,
      healthScore: 40,
      lastSurvey: '2024-01-08',
      status: 'critical',
      species: ['Elkhorn Coral', 'Star Coral', 'Fire Coral']
    },
    {
      id: 'site-4',
      name: 'Phoenix Reef',
      location: 'Red Sea',
      depth: 18,
      temperature: 25.9,
      ph: 8.2,
      coralCoverage: 65,
      healthScore: 78,
      lastSurvey: '2024-01-12',
      status: 'recovering',
      species: ['Branching Coral', 'Massive Coral', 'Encrusting Coral']
    }
  ]

  const recentActivities: RestorationActivity[] = [
    {
      id: 'act-1',
      type: 'transplant',
      site: 'Rainbow Reef',
      date: '2024-01-15',
      participants: 12,
      impact: '150 coral fragments transplanted',
      status: 'completed'
    },
    {
      id: 'act-2',
      type: 'monitoring',
      site: 'Turtle Bay Sanctuary',
      date: '2024-01-14',
      participants: 6,
      impact: 'Health assessment of 200 coral colonies',
      status: 'completed'
    },
    {
      id: 'act-3',
      type: 'cleanup',
      site: 'Crystal Gardens',
      date: '2024-01-13',
      participants: 20,
      impact: '50kg of marine debris removed',
      status: 'completed'
    },
    {
      id: 'act-4',
      type: 'research',
      site: 'Phoenix Reef',
      date: '2024-01-16',
      participants: 8,
      impact: 'Coral spawning behavior study',
      status: 'ongoing'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectProgress(prev => Math.min(prev + 0.5, 85))
      setTotalCoralsPlanted(prev => prev + Math.floor(Math.random() * 3))
      setWaterQualityScore(prev => Math.min(prev + 0.2, 92))
      setBiodiversityIndex(prev => Math.min(prev + 0.1, 88))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const startMonitoring = () => {
    setIsMonitoring(true)
    toast.success('🐠 Underwater monitoring started!', {
      description: 'AI-powered coral health assessment in progress'
    })
    
    setTimeout(() => {
      setIsMonitoring(false)
      toast.success('📊 Monitoring complete!', {
        description: 'Coral health data updated successfully'
      })
    }, 5000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20'
      case 'recovering': return 'text-blue-400 bg-blue-500/20'
      case 'degraded': return 'text-yellow-400 bg-yellow-500/20'
      case 'critical': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-blue-900/50 to-teal-900/50">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-cyan-400 flex items-center justify-center gap-3">
              <Waves className="h-10 w-10" />
              🪸 Coral Reef Restoration Project
              <Fish className="h-10 w-10" />
            </CardTitle>
            <p className="text-center text-cyan-300 text-lg">
              Protecting and restoring marine ecosystems through advanced coral cultivation and monitoring
            </p>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {Math.round(projectProgress)}%
              </div>
              <div className="text-green-300 text-sm">Project Progress</div>
              <Progress value={projectProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {totalCoralsPlanted.toLocaleString()}
              </div>
              <div className="text-blue-300 text-sm">Corals Planted</div>
              <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {Math.round(waterQualityScore)}%
              </div>
              <div className="text-cyan-300 text-sm">Water Quality</div>
              <Droplets className="h-6 w-6 text-cyan-400 mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.round(biodiversityIndex)}%
              </div>
              <div className="text-purple-300 text-sm">Biodiversity Index</div>
              <Heart className="h-6 w-6 text-purple-400 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="sites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50">
            <TabsTrigger value="sites" className="data-[state=active]:bg-cyan-600">
              <MapPin className="h-4 w-4 mr-2" />
              Coral Sites
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
              <Activity className="h-4 w-4 mr-2" />
              Live Monitoring
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-green-600">
              <Users className="h-4 w-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-purple-600">
              <Award className="h-4 w-4 mr-2" />
              Impact
            </TabsTrigger>
          </TabsList>

          {/* Coral Sites Tab */}
          <TabsContent value="sites">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {coralSites.map((site) => (
                <Card 
                  key={site.id} 
                  className={`border-cyan-500/30 cursor-pointer transition-all hover:scale-105 ${getBackgroundColorClass('coral')}`}
                  onClick={() => setSelectedSite(site.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-cyan-400 flex items-center justify-between">
                      <span>{site.name}</span>
                      <Badge className={getStatusColor(site.status)}>
                        {site.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-cyan-300 text-sm">{site.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">{site.temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">pH {site.ph}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">{site.depth}m depth</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-300">Coral Coverage</div>
                          <div className="text-lg font-bold text-cyan-400">{site.coralCoverage}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Health Score</div>
                          <div className={`text-lg font-bold ${getHealthScoreColor(site.healthScore)}`}>
                            {site.healthScore}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-300">Species Present:</div>
                      <div className="flex flex-wrap gap-1">
                        {site.species.map((species, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-400">
                      Last survey: {new Date(site.lastSurvey).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Monitoring Tab */}
          <TabsContent value="monitoring">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Camera className="h-6 w-6" />
                  Real-time Coral Health Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="bg-blue-900/30 rounded-lg p-8">
                    {isMonitoring ? (
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
                          <Activity className="h-10 w-10 text-blue-400 animate-spin" />
                        </div>
                        <div className="text-blue-400 text-xl font-bold">
                          🤖 AI Analysis in Progress...
                        </div>
                        <div className="text-blue-300">
                          Scanning coral formations and analyzing health indicators
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Fish className="h-20 w-20 text-cyan-400 mx-auto" />
                        <div className="text-cyan-400 text-xl font-bold">
                          Ready for Underwater Survey
                        </div>
                        <div className="text-cyan-300">
                          Deploy AI-powered monitoring system to assess coral health
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={startMonitoring}
                    disabled={isMonitoring}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {isMonitoring ? 'Monitoring Active...' : 'Start Monitoring'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="border-green-500/30 bg-green-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          {activity.type === 'transplant' && <Zap className="h-5 w-5 text-green-400" />}
                          {activity.type === 'monitoring' && <Activity className="h-5 w-5 text-blue-400" />}
                          {activity.type === 'cleanup' && <Shield className="h-5 w-5 text-purple-400" />}
                          {activity.type === 'research' && <Globe className="h-5 w-5 text-orange-400" />}
                        </div>
                        <div>
                          <div className="font-bold text-white capitalize">{activity.type}</div>
                          <div className="text-sm text-gray-300">{activity.site}</div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-300">Date</div>
                        <div className="text-white">{new Date(activity.date).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-300">Participants</div>
                        <div className="text-white">{activity.participants} people</div>
                      </div>
                      <div>
                        <div className="text-gray-300">Impact</div>
                        <div className="text-white">{activity.impact}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">🌊 Ocean Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Marine Life Protected</span>
                      <span className="font-bold text-purple-400">2,500+ species</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reef Area Restored</span>
                      <span className="font-bold text-purple-400">150 hectares</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Carbon Sequestered</span>
                      <span className="font-bold text-purple-400">500 tons CO₂</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Water Quality Improved</span>
                      <span className="font-bold text-purple-400">85% cleaner</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">🤝 Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Volunteers Engaged</span>
                      <span className="font-bold text-cyan-400">1,200+ people</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Local Jobs Created</span>
                      <span className="font-bold text-cyan-400">45 positions</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Educational Programs</span>
                      <span className="font-bold text-cyan-400">25 schools</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Research Publications</span>
                      <span className="font-bold text-cyan-400">12 papers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
