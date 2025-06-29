
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TreePine, 
  Mountain, 
  Waves, 
  Sun, 
  Moon, 
  Cloud, 
  Zap, 
  Flame,
  Snowflake,
  Leaf,
  Star,
  Plus,
  Save,
  Eye,
  Palette
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface LandscapeElement {
  id: string
  type: 'tree' | 'mountain' | 'water' | 'fire' | 'ice' | 'lightning' | 'nature'
  x: number
  y: number
  size: 'small' | 'medium' | 'large'
  power: number
}

const LandscapeBuilder = () => {
  const [landscapeName, setLandscapeName] = useState<string>('')
  const [selectedTool, setSelectedTool] = useState<string>('tree')
  const [elements, setElements] = useState<LandscapeElement[]>([])
  const [totalPower, setTotalPower] = useState<number>(0)
  const [isBuilding, setIsBuilding] = useState<boolean>(false)

  const tools = [
    { id: 'tree', name: 'Ancient Trees', icon: TreePine, color: 'text-green-400', power: 25 },
    { id: 'mountain', name: 'Mystic Mountains', icon: Mountain, color: 'text-gray-400', power: 50 },
    { id: 'water', name: 'Sacred Waters', icon: Waves, color: 'text-blue-400', power: 35 },
    { id: 'fire', name: 'Dragon Fire', icon: Flame, color: 'text-red-400', power: 75 },
    { id: 'ice', name: 'Frozen Crystals', icon: Snowflake, color: 'text-cyan-400', power: 40 },
    { id: 'lightning', name: 'Thunder Strikes', icon: Zap, color: 'text-yellow-400', power: 60 },
    { id: 'nature', name: 'Life Force', icon: Leaf, color: 'text-emerald-400', power: 30 }
  ]

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool || !landscapeName.trim()) {
      toast.error('Please enter a landscape name and select a tool first!')
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const tool = tools.find(t => t.id === selectedTool)
    if (!tool) return

    const newElement: LandscapeElement = {
      id: `${selectedTool}-${Date.now()}`,
      type: selectedTool as any,
      x,
      y,
      size: 'medium',
      power: tool.power
    }

    setElements(prev => [...prev, newElement])
    setTotalPower(prev => prev + tool.power)
    
    toast.success(`Added ${tool.name}!`, {
      description: `Power increased by ${tool.power}. Total: ${totalPower + tool.power}`
    })
  }

  const clearLandscape = () => {
    setElements([])
    setTotalPower(0)
    toast.success('Landscape cleared!')
  }

  const saveLandscape = () => {
    if (!landscapeName.trim()) {
      toast.error('Please enter a landscape name!')
      return
    }

    if (elements.length === 0) {
      toast.error('Please add some elements to your landscape!')
      return
    }

    setIsBuilding(true)
    
    setTimeout(() => {
      toast.success(`🌍 "${landscapeName}" Created!`, {
        description: `Landscape saved with ${elements.length} elements and ${totalPower} total power. Ready for battles!`,
        duration: 5000
      })
      setIsBuilding(false)
    }, 2000)
  }

  const previewLandscape = () => {
    toast.success('🔮 Landscape Preview Mode', {
      description: `Viewing "${landscapeName}" with ${elements.length} elements`,
      duration: 3000
    })
  }

  const getElementIcon = (type: string) => {
    const tool = tools.find(t => t.id === type)
    return tool ? tool.icon : TreePine
  }

  const getElementColor = (type: string) => {
    const tool = tools.find(t => t.id === type)
    return tool ? tool.color : 'text-green-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-brown-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🏗️ GAIA LANDSCAPE BUILDER
          </h1>
          <p className="text-muted-foreground mb-4">
            Build and design virtual landscapes for epic battles and exploration
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-w-2xl mx-auto">
            <div className="text-sm text-green-400">
              <strong>Powered by GAIA:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Building Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Landscape Name</label>
                  <Input
                    placeholder="Enter landscape name..."
                    value={landscapeName}
                    onChange={(e) => setLandscapeName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Tool</label>
                  <div className="grid grid-cols-1 gap-2">
                    {tools.map((tool) => {
                      const IconComponent = tool.icon
                      return (
                        <Button
                          key={tool.id}
                          variant={selectedTool === tool.id ? "default" : "outline"}
                          className={`justify-start ${selectedTool === tool.id ? 'bg-green-600' : ''}`}
                          onClick={() => setSelectedTool(tool.id)}
                        >
                          <IconComponent className={`h-4 w-4 mr-2 ${tool.color}`} />
                          <span className="text-xs">{tool.name}</span>
                          <Badge className="ml-auto text-xs">+{tool.power}</Badge>
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Landscape Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Elements:</span>
                  <span className="text-green-400 font-bold">{elements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Power:</span>
                  <span className="text-yellow-400 font-bold">{totalPower}</span>
                </div>
                <div className="flex justify-between">
                  <span>Battle Rating:</span>
                  <span className="text-purple-400 font-bold">
                    {totalPower > 500 ? 'Legendary' : 
                     totalPower > 300 ? 'Epic' : 
                     totalPower > 150 ? 'Rare' : 'Common'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button onClick={clearLandscape} variant="outline" className="w-full">
                Clear All
              </Button>
              <Button onClick={previewLandscape} variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={saveLandscape} 
                disabled={isBuilding}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isBuilding ? (
                  <>Building...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Landscape
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
              <CardHeader>
                <CardTitle className="text-green-400">
                  🌍 {landscapeName || 'Unnamed Landscape'} - Canvas
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Click anywhere on the canvas to place your selected tool
                </p>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative w-full h-96 bg-gradient-to-b from-sky-900/30 via-green-900/30 to-brown-900/30 border-2 border-dashed border-green-500/30 rounded-lg cursor-crosshair overflow-hidden"
                  onClick={handleCanvasClick}
                >
                  {/* Background Elements */}
                  <div className="absolute inset-0 opacity-10">
                    <Sun className="absolute top-4 right-4 h-8 w-8 text-yellow-400" />
                    <Cloud className="absolute top-8 left-1/4 h-6 w-6 text-gray-300" />
                    <Cloud className="absolute top-12 right-1/3 h-4 w-4 text-gray-300" />
                  </div>

                  {/* Placed Elements */}
                  {elements.map((element) => {
                    const IconComponent = getElementIcon(element.type)
                    return (
                      <div
                        key={element.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                        style={{
                          left: `${element.x}%`,
                          top: `${element.y}%`
                        }}
                      >
                        <IconComponent 
                          className={`h-6 w-6 ${getElementColor(element.type)} drop-shadow-lg`}
                        />
                      </div>
                    )
                  })}

                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`v-${i}`} className="absolute bg-white w-px h-full" style={{ left: `${i * 10}%` }} />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={`h-${i}`} className="absolute bg-white h-px w-full" style={{ top: `${i * 12.5}%` }} />
                    ))}
                  </div>

                  {/* Instructions Overlay */}
                  {elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Click to place elements</p>
                        <p className="text-sm">Build your mystical landscape</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Landscapes */}
            <Card className="mt-6 border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">🏆 Featured Landscapes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-black/20 rounded-lg">
                    <h4 className="font-bold text-green-400">Dragon's Sanctuary</h4>
                    <p className="text-sm text-muted-foreground">Power: 850 • 12 elements</p>
                    <div className="flex gap-1 mt-2">
                      <TreePine className="h-3 w-3 text-green-400" />
                      <Flame className="h-3 w-3 text-red-400" />
                      <Mountain className="h-3 w-3 text-gray-400" />
                      <Zap className="h-3 w-3 text-yellow-400" />
                    </div>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg">
                    <h4 className="font-bold text-blue-400">Crystal Ocean</h4>
                    <p className="text-sm text-muted-foreground">Power: 620 • 8 elements</p>
                    <div className="flex gap-1 mt-2">
                      <Waves className="h-3 w-3 text-blue-400" />
                      <Snowflake className="h-3 w-3 text-cyan-400" />
                      <Mountain className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandscapeBuilder
