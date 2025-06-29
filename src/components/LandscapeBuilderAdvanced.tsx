import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  TreePine, 
  Mountain, 
  Waves, 
  Sun, 
  Home, 
  Palette, 
  Save, 
  Download, 
  Eye, 
  Layers,
  Rocket,
  Globe,
  Fish,
  Leaf
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface LandscapeElement {
  id: string
  type: 'tree' | 'mountain' | 'water' | 'building' | 'decoration' | 'creature' | 'vegetation'
  x: number
  y: number
  z?: number
  size: number
  color: string
  rotation: number
  dimension: '2d' | '3d' | 'reality'
  environment: 'earth' | 'underwater' | 'space' | 'amazon'
}

interface LandscapeProject {
  id: string
  name: string
  elements: LandscapeElement[]
  backgroundType: string
  backgroundColor: string
  dimension: '2d' | '3d' | 'reality'
  environment: 'earth' | 'underwater' | 'space' | 'amazon'
  timestamp: Date
  marketPrice?: number
  forSale?: boolean
}

export function LandscapeBuilderAdvanced() {
  const [currentProject, setCurrentProject] = useState<LandscapeProject>({
    id: 'project-1',
    name: 'My Advanced Gaia World',
    elements: [],
    backgroundType: 'nature',
    backgroundColor: '#87CEEB',
    dimension: '3d',
    environment: 'earth',
    timestamp: new Date()
  })

  const [selectedTool, setSelectedTool] = useState<string>('tree')
  const [brushSize, setBrushSize] = useState([50])
  const [selectedColor, setSelectedColor] = useState('#228B22')
  const [isBuilding, setIsBuilding] = useState(false)
  const [savedProjects, setSavedProjects] = useState<LandscapeProject[]>([])
  const [selectedDimension, setSelectedDimension] = useState<'2d' | '3d' | 'reality'>('3d')
  const [selectedEnvironment, setSelectedEnvironment] = useState<'earth' | 'underwater' | 'space' | 'amazon'>('earth')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const tools = [
    { id: 'tree', name: 'Trees', icon: TreePine, color: '#228B22' },
    { id: 'mountain', name: 'Mountains', icon: Mountain, color: '#8B4513' },
    { id: 'water', name: 'Water', icon: Waves, color: '#4169E1' },
    { id: 'building', name: 'Buildings', icon: Home, color: '#696969' },
    { id: 'decoration', name: 'Decorations', icon: Sun, color: '#FFD700' },
    { id: 'creature', name: 'Creatures', icon: Fish, color: '#FF6347' },
    { id: 'vegetation', name: 'Vegetation', icon: Leaf, color: '#32CD32' }
  ]

  const environments = [
    { id: 'earth', name: 'Earth', icon: Globe, color: '#87CEEB', description: 'Terrestrial landscapes with mountains, forests, and cities' },
    { id: 'underwater', name: 'Underwater', icon: Waves, color: '#006994', description: 'Deep ocean environments with coral reefs and sea life' },
    { id: 'space', name: 'Space', icon: Rocket, color: '#191970', description: 'Cosmic environments with planets, asteroids, and space stations' },
    { id: 'amazon', name: 'Amazon Forest', icon: TreePine, color: '#355E3B', description: 'Dense rainforest with exotic wildlife and hidden secrets' }
  ]

  const dimensions = [
    { id: '2d', name: '2D Design', description: 'Classic flat design with artistic flair' },
    { id: '3d', name: '3D Design', description: 'Full three-dimensional world building' },
    { id: 'reality', name: 'Reality Design', description: 'Photorealistic environments with physics' }
  ]

  // Enhanced drawing with environment-specific elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Environment-specific background
    const envColors = {
      earth: '#87CEEB',
      underwater: '#006994',
      space: '#191970',
      amazon: '#355E3B'
    }

    ctx.fillStyle = envColors[selectedEnvironment]
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw environment-specific background patterns
    if (selectedEnvironment === 'underwater') {
      // Add water effects
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.quadraticCurveTo(i + 25, 20, i + 50, 0)
        ctx.stroke()
      }
    } else if (selectedEnvironment === 'space') {
      // Add stars
      ctx.fillStyle = 'white'
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        ctx.fillRect(x, y, 1, 1)
      }
    }

    // Draw elements with dimension-specific rendering
    currentProject.elements.forEach(element => {
      ctx.save()
      ctx.translate(element.x, element.y)
      ctx.rotate(element.rotation * Math.PI / 180)
      ctx.fillStyle = element.color

      // Enhanced rendering based on dimension
      const multiplier = selectedDimension === '3d' ? 1.5 : selectedDimension === 'reality' ? 2 : 1

      switch (element.type) {
        case 'tree':
          // Environment-specific trees
          if (selectedEnvironment === 'amazon') {
            // Tropical tree
            ctx.fillStyle = '#8B4513'
            ctx.fillRect(-element.size/12, -element.size/3, element.size/6, element.size/2)
            ctx.fillStyle = '#228B22'
            ctx.beginPath()
            ctx.arc(0, -element.size/2, element.size/2.5 * multiplier, 0, Math.PI * 2)
            ctx.fill()
          } else if (selectedEnvironment === 'underwater') {
            // Kelp/seaweed
            ctx.strokeStyle = element.color
            ctx.lineWidth = element.size/10
            ctx.beginPath()
            ctx.moveTo(0, element.size/2)
            ctx.quadraticCurveTo(-element.size/4, 0, 0, -element.size/2)
            ctx.stroke()
          } else {
            // Regular tree
            ctx.fillRect(-element.size/8, -element.size/4, element.size/4, element.size/2)
            ctx.beginPath()
            ctx.arc(0, -element.size/2, element.size/3 * multiplier, 0, Math.PI * 2)
            ctx.fill()
          }
          break
        case 'creature':
          // Environment-specific creatures
          if (selectedEnvironment === 'underwater') {
            // Fish
            ctx.beginPath()
            ctx.ellipse(0, 0, element.size/2 * multiplier, element.size/4, 0, 0, 2 * Math.PI)
            ctx.fill()
            // Tail
            ctx.beginPath()
            ctx.moveTo(-element.size/2, 0)
            ctx.lineTo(-element.size, -element.size/4)
            ctx.lineTo(-element.size, element.size/4)
            ctx.closePath()
            ctx.fill()
          } else if (selectedEnvironment === 'amazon') {
            // Jungle animal
            ctx.beginPath()
            ctx.arc(0, 0, element.size/3 * multiplier, 0, Math.PI * 2)
            ctx.fill()
          }
          break
        case 'mountain':
          // Draw triangle mountain
          ctx.beginPath()
          ctx.moveTo(0, element.size/2)
          ctx.lineTo(-element.size/2, element.size/2)
          ctx.lineTo(0, -element.size/2)
          ctx.lineTo(element.size/2, element.size/2)
          ctx.closePath()
          ctx.fill()
          break
        case 'water':
          // Draw water waves
          ctx.beginPath()
          for (let i = -element.size/2; i <= element.size/2; i += 10) {
            const y = Math.sin(i / 10) * 5
            if (i === -element.size/2) {
              ctx.moveTo(i, y)
            } else {
              ctx.lineTo(i, y)
            }
          }
          ctx.stroke()
          break
        case 'building':
          // Draw simple building
          ctx.fillRect(-element.size/2, -element.size/2, element.size, element.size)
          ctx.fillStyle = '#FF0000'
          ctx.beginPath()
          ctx.moveTo(-element.size/2, -element.size/2)
          ctx.lineTo(0, -element.size)
          ctx.lineTo(element.size/2, -element.size/2)
          ctx.closePath()
          ctx.fill()
          break
        case 'decoration':
          // Draw star decoration
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5
            const x = Math.cos(angle) * element.size/2
            const y = Math.sin(angle) * element.size/2
            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.fill()
          break
        case 'vegetation':
          // Draw vegetation
          ctx.fillStyle = element.color
          ctx.beginPath()
          ctx.arc(0, 0, element.size/4 * multiplier, 0, Math.PI * 2)
          ctx.fill()
          break
        default:
          // Default rendering
          ctx.fillRect(-element.size/2, -element.size/2, element.size * multiplier, element.size * multiplier)
      }
      ctx.restore()
    })
  }, [currentProject, selectedEnvironment, selectedDimension])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !isBuilding) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newElement: LandscapeElement = {
      id: `element-${Date.now()}`,
      type: selectedTool as any,
      x,
      y,
      z: selectedDimension === '3d' || selectedDimension === 'reality' ? Math.random() * 100 : undefined,
      size: brushSize[0],
      color: selectedColor,
      rotation: Math.random() * 360,
      dimension: selectedDimension,
      environment: selectedEnvironment
    }

    setCurrentProject(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      dimension: selectedDimension,
      environment: selectedEnvironment
    }))

    toast.success(`Added ${selectedTool} to ${selectedEnvironment} ${selectedDimension} world!`, {
      description: 'Building your ultimate landscape',
      duration: 2000
    })
  }

  const saveToMarketplace = () => {
    const projectToSave = {
      ...currentProject,
      id: `project-${Date.now()}`,
      timestamp: new Date(),
      marketPrice: Math.floor(Math.random() * 500) + 100,
      forSale: true
    }

    setSavedProjects(prev => [...prev, projectToSave])
    
    toast.success('🏪 Landscape Added to Marketplace!', {
      description: `"${projectToSave.name}" is now available for ${projectToSave.marketPrice} GAiA tokens`,
      duration: 4000
    })
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Palette className="h-6 w-6" />
          🌍 ADVANCED GAIA LANDSCAPE BUILDER - Multi-Dimensional Worlds
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-600 text-white">
            Elements: {currentProject.elements.length}
          </Badge>
          <Badge className="bg-blue-600 text-white">
            {selectedDimension.toUpperCase()} • {selectedEnvironment.toUpperCase()}
          </Badge>
          <Badge className="bg-purple-600 text-white">
            Projects: {savedProjects.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder">🛠️ Builder</TabsTrigger>
            <TabsTrigger value="environments">🌍 Environments</TabsTrigger>
            <TabsTrigger value="dimensions">📐 Dimensions</TabsTrigger>
            <TabsTrigger value="marketplace">🏪 Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            {/* Environment & Dimension Selection */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-400">Environment</label>
                <Select value={selectedEnvironment} onValueChange={(value: any) => setSelectedEnvironment(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {environments.map(env => (
                      <SelectItem key={env.id} value={env.id}>
                        {env.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-400">Dimension</label>
                <Select value={selectedDimension} onValueChange={(value: any) => setSelectedDimension(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensions.map(dim => (
                      <SelectItem key={dim.id} value={dim.id}>
                        {dim.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Building Tools */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {tools.map((tool) => {
                const IconComponent = tool.icon
                return (
                  <Button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool.id)
                      setSelectedColor(tool.color)
                    }}
                    variant={selectedTool === tool.id ? "default" : "outline"}
                    className={`${selectedTool === tool.id ? 'bg-green-600' : ''} flex flex-col gap-1 h-16`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs">{tool.name}</span>
                  </Button>
                )
              })}
            </div>

            {/* Canvas Area */}
            <div className="border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-green-400">
                  {selectedDimension.toUpperCase()} {selectedEnvironment.toUpperCase()} Canvas
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsBuilding(!isBuilding)}
                    variant={isBuilding ? "default" : "outline"}
                    className={isBuilding ? 'bg-green-600' : ''}
                  >
                    {isBuilding ? '🛠️ Building' : '✋ Paused'}
                  </Button>
                </div>
              </div>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                onClick={handleCanvasClick}
                className="w-full border border-gray-500/30 rounded cursor-crosshair"
                style={{ maxHeight: '400px', backgroundColor: environments.find(e => e.id === selectedEnvironment)?.color }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button onClick={saveToMarketplace} className="bg-gradient-to-r from-green-600 to-emerald-600">
                <Save className="h-4 w-4 mr-2" />
                Save to Marketplace
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Download className="h-4 w-4 mr-2" />
                Export {selectedDimension.toUpperCase()}
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Eye className="h-4 w-4 mr-2" />
                VR Preview
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="environments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {environments.map((env) => {
                const IconComponent = env.icon
                return (
                  <Card 
                    key={env.id} 
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedEnvironment === env.id ? 'border-green-500 bg-green-900/20' : 'border-gray-500/20'
                    }`}
                    onClick={() => setSelectedEnvironment(env.id as any)}
                  >
                    <CardContent className="p-6 text-center">
                      <IconComponent className="h-12 w-12 mx-auto mb-4 text-green-400" />
                      <h3 className="text-xl font-bold text-white mb-2">{env.name}</h3>
                      <p className="text-sm text-muted-foreground">{env.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="dimensions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dimensions.map((dim) => (
                <Card 
                  key={dim.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedDimension === dim.id ? 'border-purple-500 bg-purple-900/20' : 'border-gray-500/20'
                  }`}
                  onClick={() => setSelectedDimension(dim.id as any)}
                >
                  <CardContent className="p-6 text-center">
                    <Layers className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-bold text-white mb-2">{dim.name}</h3>
                    <p className="text-sm text-muted-foreground">{dim.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedProjects.filter(p => p.forSale).map((project) => (
                <Card key={project.id} className="border border-green-500/20 bg-gradient-to-br from-green-900/10 to-blue-900/10">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-4xl">🌍</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">{project.name}</h4>
                      
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600 text-white text-xs">
                          {project.dimension?.toUpperCase()}
                        </Badge>
                        <Badge className="bg-blue-600 text-white text-xs">
                          {project.environment?.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-bold">
                          {project.marketPrice} GAiA
                        </span>
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                          Purchase
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {project.elements.length} elements • 5% to Green Projects
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* GAiA Integration */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-green-400 mb-2">🌍 Harmony of Gaia Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Token:</div>
                <code className="font-mono text-xs text-green-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div>
                <div className="text-muted-foreground">Marketplace:</div>
                <div className="text-lg font-bold text-green-400">✅ Active</div>
              </div>
              <div>
                <div className="text-muted-foreground">Green Projects:</div>
                <div className="text-lg font-bold text-green-400">5% Donation</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
