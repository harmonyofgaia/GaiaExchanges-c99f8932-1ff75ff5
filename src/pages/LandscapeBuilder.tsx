
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mountain, 
  Trees, 
  Waves, 
  Zap, 
  Sparkles, 
  Recycle,
  Leaf,
  Globe,
  Hammer,
  Trash2,
  Coins,
  TrendingUp
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { toast } from 'sonner'

interface LandscapeProject {
  id: string
  name: string
  type: 'forest' | 'ocean' | 'mountain' | 'desert' | 'urban'
  progress: number
  gaiaInvested: number
  environmentalImpact: number
  status: 'active' | 'completed' | 'planning'
}

interface ScrapyardItem {
  id: string
  name: string
  type: 'metal' | 'plastic' | 'electronic' | 'organic'
  value: number
  recyclePotential: number
  status: 'available' | 'processing' | 'recycled'
}

export default function LandscapeBuilder() {
  const [totalPower, setTotalPower] = useState(5847293847)
  const [projects, setProjects] = useState<LandscapeProject[]>([
    {
      id: '1',
      name: 'Amazon Reforestation',
      type: 'forest',
      progress: 78,
      gaiaInvested: 125000,
      environmentalImpact: 95,
      status: 'active'
    },
    {
      id: '2',
      name: 'Ocean Cleanup Pacific',
      type: 'ocean',
      progress: 45,
      gaiaInvested: 87500,
      environmentalImpact: 82,
      status: 'active'
    },
    {
      id: '3',
      name: 'Sahara Solar Farm',
      type: 'desert',
      progress: 92,
      gaiaInvested: 245000,
      environmentalImpact: 88,
      status: 'active'
    }
  ])

  const [scrapyardItems, setScrapyardItems] = useState<ScrapyardItem[]>([
    {
      id: 'scrap_1',
      name: 'Aluminum Cans',
      type: 'metal',
      value: 150,
      recyclePotential: 95,
      status: 'available'
    },
    {
      id: 'scrap_2',
      name: 'Plastic Bottles',
      type: 'plastic',
      value: 85,
      recyclePotential: 78,
      status: 'available'
    },
    {
      id: 'scrap_3',
      name: 'Old Electronics',
      type: 'electronic',
      value: 320,
      recyclePotential: 88,
      status: 'processing'
    }
  ])

  useEffect(() => {
    console.log('🏔️ LANDSCAPE BUILDER + AURA LAND SCRAPYARD - ACTIVE')
    console.log('🌍 TOTAL ENVIRONMENTAL POWER:', totalPower.toLocaleString())
    console.log('♻️ SCRAPYARD INTEGRATION - RECYCLE TO REBUILD')
    
    const growthInterval = setInterval(() => {
      setTotalPower(prev => Math.floor(prev * 1.001))
    }, 2000)

    return () => clearInterval(growthInterval)
  }, [])

  const createLandscape = (type: string) => {
    const newProject: LandscapeProject = {
      id: `project_${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Project`,
      type: type as LandscapeProject['type'],
      progress: 0,
      gaiaInvested: 0,
      environmentalImpact: 0,
      status: 'planning'
    }
    
    setProjects(prev => [newProject, ...prev])
    toast.success('🌍 New Landscape Project Created!', {
      description: `${newProject.name} has been added to your portfolio`,
      duration: 4000
    })
  }

  const recycleItem = (itemId: string) => {
    setScrapyardItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'recycled' as const }
          : item
      )
    )
    
    const item = scrapyardItems.find(i => i.id === itemId)
    if (item) {
      toast.success('♻️ Item Recycled Successfully!', {
        description: `${item.name} converted to ${item.value} GAiA tokens`,
        duration: 4000
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'forest': return <Trees className="h-5 w-5 text-green-400" />
      case 'ocean': return <Waves className="h-5 w-5 text-blue-400" />
      case 'mountain': return <Mountain className="h-5 w-5 text-gray-400" />
      case 'desert': return <Sparkles className="h-5 w-5 text-yellow-400" />
      case 'urban': return <Globe className="h-5 w-5 text-purple-400" />
      default: return <Leaf className="h-5 w-5 text-green-400" />
    }
  }

  const getScrapIcon = (type: string) => {
    switch (type) {
      case 'metal': return <Hammer className="h-4 w-4 text-gray-400" />
      case 'plastic': return <Recycle className="h-4 w-4 text-blue-400" />
      case 'electronic': return <Zap className="h-4 w-4 text-purple-400" />
      case 'organic': return <Leaf className="h-4 w-4 text-green-400" />
      default: return <Trash2 className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            🏔️ Landscape Builder + ♻️ Aura Land Scrapyard
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Build sustainable landscapes • Recycle to rebuild • Environmental regeneration
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-green-600">POWER: {totalPower.toLocaleString()}</Badge>
            <Badge className="bg-blue-600">PROJECTS: {projects.length}</Badge>
            <Badge className="bg-purple-600">RECYCLING ACTIVE</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">🏔️ Landscape Builder</TabsTrigger>
          <TabsTrigger value="scrapyard">♻️ Aura Land Scrapyard</TabsTrigger>
          <TabsTrigger value="impact">🌍 Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Button 
              onClick={() => createLandscape('forest')}
              className="bg-green-600 hover:bg-green-700 h-20 flex-col"
            >
              <Trees className="h-8 w-8 mb-2" />
              Create Forest
            </Button>
            <Button 
              onClick={() => createLandscape('ocean')}
              className="bg-blue-600 hover:bg-blue-700 h-20 flex-col"
            >
              <Waves className="h-8 w-8 mb-2" />
              Restore Ocean
            </Button>
            <Button 
              onClick={() => createLandscape('mountain')}
              className="bg-gray-600 hover:bg-gray-700 h-20 flex-col"
            >
              <Mountain className="h-8 w-8 mb-2" />
              Build Mountains
            </Button>
            <Button 
              onClick={() => createLandscape('desert')}
              className="bg-yellow-600 hover:bg-yellow-700 h-20 flex-col"
            >
              <Sparkles className="h-8 w-8 mb-2" />
              Transform Desert
            </Button>
            <Button 
              onClick={() => createLandscape('urban')}
              className="bg-purple-600 hover:bg-purple-700 h-20 flex-col"
            >
              <Globe className="h-8 w-8 mb-2" />
              Green Cities
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    {getTypeIcon(project.type)}
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">GAiA Invested</div>
                      <div className="font-bold text-green-400">{project.gaiaInvested.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Impact Score</div>
                      <div className="font-bold text-blue-400">{project.environmentalImpact}%</div>
                    </div>
                  </div>
                  
                  <Badge className={
                    project.status === 'active' ? 'bg-green-600' :
                    project.status === 'completed' ? 'bg-blue-600' :
                    'bg-yellow-600'
                  }>
                    {project.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scrapyard" className="space-y-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">♻️ AURA LAND SCRAPYARD - RECYCLE TO REBUILD</CardTitle>
              <p className="text-muted-foreground">
                Convert waste into GAiA tokens and environmental restoration materials
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-900/40 rounded-lg">
                  <Recycle className="h-8 w-8 mx-auto text-green-400 mb-2" />
                  <div className="text-2xl font-bold text-green-400">♻️</div>
                  <div className="text-sm text-muted-foreground">Recycle Active</div>
                </div>
                <div className="text-center p-4 bg-blue-900/40 rounded-lg">
                  <Coins className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-blue-400">12,450</div>
                  <div className="text-sm text-muted-foreground">GAiA Earned</div>
                </div>
                <div className="text-center p-4 bg-purple-900/40 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-purple-400">88%</div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
                <div className="text-center p-4 bg-yellow-900/40 rounded-lg">
                  <Leaf className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">5.2T</div>
                  <div className="text-sm text-muted-foreground">CO2 Saved</div>
                </div>
              </div>

              <div className="space-y-4">
                {scrapyardItems.map((item) => (
                  <Card key={item.id} className="border-gray-500/30 bg-gray-900/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {getScrapIcon(item.type)}
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Value: {item.value} GAiA • Potential: {item.recyclePotential}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            item.status === 'recycled' ? 'bg-green-600' :
                            item.status === 'processing' ? 'bg-yellow-600' :
                            'bg-blue-600'
                          }>
                            {item.status.toUpperCase()}
                          </Badge>
                          {item.status === 'available' && (
                            <Button 
                              size="sm"
                              onClick={() => recycleItem(item.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Recycle className="h-3 w-3 mr-1" />
                              Recycle
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🌍 Environmental Restoration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Forests Restored</span>
                    <span className="font-bold text-green-400">47 Projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oceans Cleaned</span>
                    <span className="font-bold text-blue-400">23 Projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Renewable Energy</span>
                    <span className="font-bold text-yellow-400">89 MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CO2 Offset</span>
                    <span className="font-bold text-purple-400">125,000 tons</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">♻️ Recycling Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Materials Recycled</span>
                    <span className="font-bold text-green-400">2.5M kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GAiA Generated</span>
                    <span className="font-bold text-blue-400">847,293</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waste Diverted</span>
                    <span className="font-bold text-yellow-400">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy Saved</span>
                    <span className="font-bold text-purple-400">45,000 kWh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
