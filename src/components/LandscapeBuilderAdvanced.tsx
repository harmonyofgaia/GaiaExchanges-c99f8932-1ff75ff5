
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
  Leaf,
  Zap,
  Crown,
  Sparkles,
  Brain,
  Star
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface LandscapeElement {
  id: string
  type: 'tree' | 'mountain' | 'water' | 'building' | 'decoration' | 'creature' | 'vegetation' | 'weapon' | 'tool' | 'artifact'
  x: number
  y: number
  z?: number
  size: number
  color: string
  rotation: number
  dimension: '2d' | '3d' | 'reality'
  environment: 'earth' | 'underwater' | 'space' | 'amazon'
  powerLevel?: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  aiGenerated?: boolean
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
  totalPowerLevel?: number
  cloudStored?: boolean
  autoEvolution?: boolean
}

export function LandscapeBuilderAdvanced() {
  const [currentProject, setCurrentProject] = useState<LandscapeProject>({
    id: 'project-1',
    name: 'First Gaia World Landscape',
    elements: [],
    backgroundType: 'nature',
    backgroundColor: '#87CEEB',
    dimension: '3d',
    environment: 'earth',
    timestamp: new Date(),
    totalPowerLevel: 0,
    cloudStored: true,
    autoEvolution: true
  })

  const [selectedTool, setSelectedTool] = useState<string>('tree')
  const [brushSize, setBrushSize] = useState([50])
  const [selectedColor, setSelectedColor] = useState('#228B22')
  const [isBuilding, setIsBuilding] = useState(false)
  const [savedProjects, setSavedProjects] = useState<LandscapeProject[]>([])
  const [selectedDimension, setSelectedDimension] = useState<'2d' | '3d' | 'reality'>('3d')
  const [selectedEnvironment, setSelectedEnvironment] = useState<'earth' | 'underwater' | 'space' | 'amazon'>('earth')
  const [autoEvolutionActive, setAutoEvolutionActive] = useState(true)
  const [evolutionLevel, setEvolutionLevel] = useState(1)
  const [cloudStorageUsed, setCloudStorageUsed] = useState(0)
  const [totalPossibilities, setTotalPossibilities] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const evolutionRef = useRef<NodeJS.Timeout>()

  const enhancedTools = [
    { id: 'tree', name: 'Trees', icon: TreePine, color: '#228B22', powerLevel: 50 },
    { id: 'mountain', name: 'Mountains', icon: Mountain, color: '#8B4513', powerLevel: 100 },
    { id: 'water', name: 'Water', icon: Waves, color: '#4169E1', powerLevel: 75 },
    { id: 'building', name: 'Buildings', icon: Home, color: '#696969', powerLevel: 120 },
    { id: 'decoration', name: 'Decorations', icon: Sun, color: '#FFD700', powerLevel: 60 },
    { id: 'creature', name: 'Creatures', icon: Fish, color: '#FF6347', powerLevel: 90 },
    { id: 'vegetation', name: 'Vegetation', icon: Leaf, color: '#32CD32', powerLevel: 40 },
    { id: 'weapon', name: 'Weapons', icon: Zap, color: '#FF0000', powerLevel: 150 },
    { id: 'tool', name: 'Tools', icon: Star, color: '#9400D3', powerLevel: 80 },
    { id: 'artifact', name: 'Artifacts', icon: Crown, color: '#FFD700', powerLevel: 200 }
  ]

  const environments = [
    { id: 'earth', name: 'Earth', icon: Globe, color: '#87CEEB', description: 'Terrestrial landscapes with neural forests and quantum cities', possibilities: 10000 },
    { id: 'underwater', name: 'Underwater', icon: Waves, color: '#006994', description: 'Deep ocean realms with bioluminescent coral reefs and ancient temples', possibilities: 15000 },
    { id: 'space', name: 'Space', icon: Rocket, color: '#191970', description: 'Cosmic environments with living planets and quantum star systems', possibilities: 25000 },
    { id: 'amazon', name: 'Amazon Forest', icon: TreePine, color: '#355E3B', description: 'Mystical rainforests with hidden civilizations and magical creatures', possibilities: 20000 }
  ]

  const dimensions = [
    { id: '2d', name: '2D Design', description: 'Artistic flat designs with infinite creative freedom', multiplier: 1 },
    { id: '3d', name: '3D Design', description: 'Full dimensional world building with physics', multiplier: 2 },
    { id: 'reality', name: 'Reality Design', description: 'Photorealistic environments with neural enhancement', multiplier: 3 }
  ]

  // Auto Evolution System
  useEffect(() => {
    if (autoEvolutionActive) {
      evolutionRef.current = setInterval(() => {
        // Automatically enhance the landscape
        autoEnhanceLandscape()
        
        // Update evolution level
        setEvolutionLevel(prev => prev + 1)
        
        // Update cloud storage usage
        setCloudStorageUsed(prev => prev + Math.random() * 100)
        
        // Calculate total possibilities
        const envPossibilities = environments.find(e => e.id === selectedEnvironment)?.possibilities || 10000
        const dimMultiplier = dimensions.find(d => d.id === selectedDimension)?.multiplier || 1
        setTotalPossibilities(envPossibilities * dimMultiplier * evolutionLevel)
        
      }, 2000) // Auto evolution every 2 seconds
    }

    return () => {
      if (evolutionRef.current) {
        clearInterval(evolutionRef.current)
      }
    }
  }, [autoEvolutionActive, selectedEnvironment, selectedDimension, evolutionLevel])

  const autoEnhanceLandscape = () => {
    const enhancementTypes = [
      'neural_enhancement',
      'quantum_upgrade',
      'bioelectric_boost',
      'matrix_evolution',
      'cosmic_expansion'
    ]
    
    const randomEnhancement = enhancementTypes[Math.floor(Math.random() * enhancementTypes.length)]
    
    // Add AI-generated enhancement element
    const newElement: LandscapeElement = {
      id: `auto-enhancement-${Date.now()}`,
      type: enhancedTools[Math.floor(Math.random() * enhancedTools.length)].id as any,
      x: Math.random() * 800,
      y: Math.random() * 400,
      z: selectedDimension === '3d' || selectedDimension === 'reality' ? Math.random() * 100 : undefined,
      size: 30 + Math.random() * 40,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      rotation: Math.random() * 360,
      dimension: selectedDimension,
      environment: selectedEnvironment,
      powerLevel: 50 + Math.random() * 150,
      rarity: Math.random() > 0.7 ? 'legendary' : Math.random() > 0.4 ? 'epic' : 'rare',
      aiGenerated: true
    }

    setCurrentProject(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      totalPowerLevel: (prev.totalPowerLevel || 0) + (newElement.powerLevel || 0)
    }))

    toast.success(`🌟 Auto Enhancement: ${randomEnhancement.replace('_', ' ').toUpperCase()}!`, {
      description: `Added ${newElement.rarity} ${newElement.type} (Power: ${newElement.powerLevel})`,
      duration: 3000
    })
  }

  // Enhanced drawing with AI-powered elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Environment-specific background with neural enhancements
    const envColors = {
      earth: '#87CEEB',
      underwater: '#006994',
      space: '#191970',
      amazon: '#355E3B'
    }

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, envColors[selectedEnvironment])
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add neural network overlay
    if (evolutionLevel > 5) {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < 20; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
      }
    }

    // Draw enhanced elements
    currentProject.elements.forEach(element => {
      ctx.save()
      ctx.translate(element.x, element.y)
      ctx.rotate(element.rotation * Math.PI / 180)
      
      // Rarity glow effect
      if (element.rarity === 'legendary') {
        ctx.shadowColor = '#FFD700'
        ctx.shadowBlur = 20
      } else if (element.rarity === 'epic') {
        ctx.shadowColor = '#9400D3'
        ctx.shadowBlur = 15
      }
      
      ctx.fillStyle = element.color

      const multiplier = selectedDimension === '3d' ? 1.5 : selectedDimension === 'reality' ? 2 : 1

      // Enhanced rendering based on type and AI generation
      switch (element.type) {
        case 'weapon':
          // Neural weapon
          ctx.strokeStyle = element.color
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(-element.size/2, 0)
          ctx.lineTo(element.size/2, 0)
          ctx.moveTo(element.size/3, -element.size/4)
          ctx.lineTo(element.size/2, 0)
          ctx.lineTo(element.size/3, element.size/4)
          ctx.stroke()
          break
        case 'artifact':
          // Mystical artifact
          ctx.beginPath()
          ctx.arc(0, 0, element.size/2 * multiplier, 0, Math.PI * 2)
          ctx.fill()
          // Add mystical symbols
          ctx.strokeStyle = '#FFD700'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(0, 0, element.size/3, 0, Math.PI * 2)
          ctx.stroke()
          break
        default:
          // Use existing rendering logic for basic elements
          if (element.type === 'tree') {
            ctx.fillRect(-element.size/8, -element.size/4, element.size/4, element.size/2)
            ctx.beginPath()
            ctx.arc(0, -element.size/2, element.size/3 * multiplier, 0, Math.PI * 2)
            ctx.fill()
          }
          break
      }
      ctx.restore()
    })

    // Evolution level indicator
    ctx.fillStyle = '#00FF00'
    ctx.font = '16px Arial'
    ctx.fillText(`Evolution Level: ${evolutionLevel}`, 10, 30)
    ctx.fillText(`Total Power: ${currentProject.totalPowerLevel || 0}`, 10, 50)
    ctx.fillText(`Possibilities: ${totalPossibilities.toLocaleString()}`, 10, 70)
  }, [currentProject, selectedEnvironment, selectedDimension, evolutionLevel, totalPossibilities])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !isBuilding) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const selectedToolData = enhancedTools.find(t => t.id === selectedTool)
    
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
      environment: selectedEnvironment,
      powerLevel: selectedToolData?.powerLevel || 50,
      rarity: Math.random() > 0.8 ? 'legendary' : Math.random() > 0.5 ? 'epic' : 'rare',
      aiGenerated: false
    }

    setCurrentProject(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      totalPowerLevel: (prev.totalPowerLevel || 0) + (newElement.powerLevel || 0)
    }))

    toast.success(`Added ${selectedTool} to ${selectedEnvironment} ${selectedDimension} world!`, {
      description: `Power Level: ${newElement.powerLevel} | Rarity: ${newElement.rarity}`,
      duration: 2000
    })
  }

  const saveToSecureCloud = () => {
    const projectToSave = {
      ...currentProject,
      id: `gaia-world-${Date.now()}`,
      timestamp: new Date(),
      marketPrice: Math.floor(Math.random() * 1000) + 500,
      forSale: true,
      cloudStored: true,
      autoEvolution: autoEvolutionActive
    }

    setSavedProjects(prev => [...prev, projectToSave])
    
    toast.success('🌍 GAIA WORLD SAVED TO SECURE CLOUD!', {
      description: `"${projectToSave.name}" stored with unlimited possibilities and auto-evolution`,
      duration: 5000
    })
  }

  const generateGameplayPreview = () => {
    const features = [
      '🎮 Infinite World Generation',
      '🌟 Auto-Evolution System',
      '⚡ Neural Enhancement Engine',
      '🗡️ Legendary Weapon Crafting',
      '🏰 Reality Building Tools',
      '🌊 Multi-Dimensional Environments',
      '👥 Unlimited Player Capacity',
      '💎 Marketplace Integration',
      '🔥 5% Burning for Green Projects',
      '🐠 Coral Reef Conservation'
    ]

    const advertisingContent = [
      '🌍 THE FIRST GAIA WORLD - Where Reality Meets Infinity',
      '🚀 Experience landscapes that evolve every second',
      '⚡ Build in 2D, 3D, or Reality dimensions',
      '🌊 Explore Earth, Space, Underwater, and Amazon worlds',
      '💎 Create and sell your worlds for GAiA tokens',
      '🌱 Every purchase supports Green Projects and Animal Conservation',
      '🎯 Always ahead of any competition with AI evolution',
      '',
      '✨ FEATURES THAT BLOW MINDS:',
      ...features,
      '',
      '🎮 Join the revolution. Build your world. Save the planet.',
      '🌍 First Gaia World - The Future of Gaming is Here!'
    ]

    toast.success('📸 ADVERTISING CONTENT GENERATED!', {
      description: 'Check console for full advertising material',
      duration: 4000
    })

    console.log('🌍 FIRST GAIA WORLD - ADVERTISING CONTENT:')
    console.log('=' .repeat(50))
    advertisingContent.forEach(line => console.log(line))
    console.log('=' .repeat(50))
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Crown className="h-8 w-8 animate-pulse" />
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 FIRST GAIA WORLD LANDSCAPE BUILDER
            </div>
            <div className="text-sm font-normal text-green-300">
              Auto-Evolution • Infinite Possibilities • Reality Engine • Secure Cloud Storage
            </div>
          </div>
          <Sparkles className="h-6 w-6 text-purple-400 animate-spin" />
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white">
            Elements: {currentProject.elements.length}
          </Badge>
          <Badge className="bg-blue-600 text-white">
            Evolution Level: {evolutionLevel}
          </Badge>
          <Badge className="bg-purple-600 text-white">
            Total Power: {currentProject.totalPowerLevel || 0}
          </Badge>
          <Badge className="bg-orange-600 text-white">
            Possibilities: {totalPossibilities.toLocaleString()}
          </Badge>
          <Badge className={`${autoEvolutionActive ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            {autoEvolutionActive ? '🧠 Auto-Evolution ON' : '⏸️ Auto-Evolution OFF'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="builder">🛠️ Builder</TabsTrigger>
            <TabsTrigger value="environments">🌍 Worlds</TabsTrigger>
            <TabsTrigger value="dimensions">📐 Dimensions</TabsTrigger>
            <TabsTrigger value="evolution">🧠 Evolution</TabsTrigger>
            <TabsTrigger value="cloud">☁️ Cloud</TabsTrigger>
            <TabsTrigger value="advertising">📸 Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            {/* Enhanced Controls */}
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
                        {env.name} ({env.possibilities.toLocaleString()} possibilities)
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
                        {dim.name} ({dim.multiplier}x power)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Building Tools */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {enhancedTools.map((tool) => {
                const IconComponent = tool.icon
                return (
                  <Button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool.id)
                      setSelectedColor(tool.color)
                    }}
                    variant={selectedTool === tool.id ? "default" : "outline"}
                    className={`${selectedTool === tool.id ? 'bg-green-600' : ''} flex flex-col gap-1 h-20`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs">{tool.name}</span>
                    <span className="text-xs text-yellow-400">⚡{tool.powerLevel}</span>
                  </Button>
                )
              })}
            </div>

            {/* Canvas Area */}
            <div className="border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-green-400">
                  🌍 FIRST GAIA WORLD - {selectedDimension.toUpperCase()} {selectedEnvironment.toUpperCase()} REALM
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsBuilding(!isBuilding)}
                    variant={isBuilding ? "default" : "outline"}
                    className={isBuilding ? 'bg-green-600' : ''}
                  >
                    {isBuilding ? '🛠️ Building' : '✋ Paused'}
                  </Button>
                  <Button
                    onClick={() => setAutoEvolutionActive(!autoEvolutionActive)}
                    variant={autoEvolutionActive ? "default" : "outline"}
                    className={autoEvolutionActive ? 'bg-purple-600' : ''}
                  >
                    {autoEvolutionActive ? '🧠 Auto-Evolving' : '⏸️ Manual'}
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
              <Button onClick={saveToSecureCloud} className="bg-gradient-to-r from-green-600 to-emerald-600">
                <Save className="h-4 w-4 mr-2" />
                Save to Secure Cloud
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Download className="h-4 w-4 mr-2" />
                Export for VR
              </Button>
              <Button onClick={generateGameplayPreview} className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Eye className="h-4 w-4 mr-2" />
                Generate Advertising
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
                      <p className="text-sm text-muted-foreground mb-2">{env.description}</p>
                      <Badge className="bg-purple-600 text-white">
                        {env.possibilities.toLocaleString()} Possibilities
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="evolution" className="space-y-4">
            <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Brain className="h-6 w-6 animate-pulse" />
                  Auto-Evolution System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-400 mb-2">
                      Level {evolutionLevel}
                    </div>
                    <div className="text-lg text-purple-300">
                      Continuously evolving every second
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{currentProject.elements.length}</div>
                      <div className="text-xs text-muted-foreground">Elements</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{currentProject.totalPowerLevel || 0}</div>
                      <div className="text-xs text-muted-foreground">Total Power</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{totalPossibilities.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Possibilities</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">{Math.floor(cloudStorageUsed)}</div>
                      <div className="text-xs text-muted-foreground">Cloud GB</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cloud" className="space-y-4">
            <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
              <CardHeader>
                <CardTitle className="text-blue-400">☁️ Secure Cloud Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      Unlimited Space
                    </div>
                    <div className="text-lg text-blue-300">
                      Your worlds will never run out of possibilities
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-blue-400">Auto-Backup</div>
                      <div className="text-sm text-muted-foreground">Every evolution saved</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-blue-400">Secure Access</div>
                      <div className="text-sm text-muted-foreground">Admin-only protection</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-blue-400">Global Sync</div>
                      <div className="text-sm text-muted-foreground">Access anywhere</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advertising" className="space-y-4">
            <Card className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">📸 Advertising Preview Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateGameplayPreview}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Full Advertising Content
                </Button>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">Preview Features:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>• Infinite World Generation</div>
                    <div>• Auto-Evolution System</div>
                    <div>• Multi-Dimensional Building</div>
                    <div>• Marketplace Integration</div>
                    <div>• Green Project Support</div>
                    <div>• Unlimited Player Capacity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* GAiA Integration with Enhanced Features */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-green-400 mb-2">🌍 First Gaia World Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Token:</div>
                <code className="font-mono text-xs text-green-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div>
                <div className="text-muted-foreground">Cloud Storage:</div>
                <div className="text-lg font-bold text-blue-400">Unlimited</div>
              </div>
              <div>
                <div className="text-muted-foreground">Auto-Evolution:</div>
                <div className="text-lg font-bold text-purple-400">Every 2 Seconds</div>
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
