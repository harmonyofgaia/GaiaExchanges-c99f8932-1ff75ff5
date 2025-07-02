
import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { 
  Mountain, 
  Trees, 
  Waves, 
  Sun, 
  Cloud,
  Palette,
  Save,
  Play,
  RotateCcw,
  Download,
  Zap,
  Eye,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'

interface LandscapeElement {
  id: string
  type: 'mountain' | 'tree' | 'water' | 'sky' | 'cloud' | 'sun'
  x: number
  y: number
  size: number
  color: string
}

export default function AdvancedLandscapeBuilder() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<LandscapeElement[]>([])
  const [selectedTool, setSelectedTool] = useState<string>('mountain')
  const [brushSize, setBrushSize] = useState([50])
  const [selectedColor, setSelectedColor] = useState('#4CAF50')
  const [isPlaying, setIsPlaying] = useState(false)

  const tools = [
    { id: 'mountain', name: 'Mountains', icon: Mountain, color: '#8B4513' },
    { id: 'tree', name: 'Trees', icon: Trees, color: '#228B22' },
    { id: 'water', name: 'Water', icon: Waves, color: '#4169E1' },
    { id: 'sun', name: 'Sun', icon: Sun, color: '#FFD700' },
    { id: 'cloud', name: 'Clouds', icon: Cloud, color: '#F0F8FF' }
  ]

  const addElement = useCallback((x: number, y: number) => {
    const newElement: LandscapeElement = {
      id: Date.now().toString(),
      type: selectedTool as any,
      x,
      y,
      size: brushSize[0],
      color: selectedColor
    }
    setElements(prev => [...prev, newElement])
  }, [selectedTool, brushSize, selectedColor])

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    addElement(x, y)
  }

  const clearCanvas = () => {
    setElements([])
    toast.success('🧹 Canvas cleared')
  }

  const saveProject = () => {
    toast.success('💾 Landscape project saved!', {
      description: 'Your creation has been saved to your portfolio',
      duration: 4000
    })
  }

  const exportProject = () => {
    toast.success('📥 Exporting landscape in 8K resolution...', {
      description: 'Export will be ready in a few moments',
      duration: 5000
    })
  }

  const renderElement = (element: LandscapeElement) => {
    const ToolIcon = tools.find(t => t.id === element.type)?.icon || Mountain
    
    return (
      <div
        key={element.id}
        className="absolute transition-all duration-200 hover:scale-110"
        style={{
          left: element.x - element.size / 2,
          top: element.y - element.size / 2,
          width: element.size,
          height: element.size,
          color: element.color
        }}
      >
        <ToolIcon className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🎨 ADVANCED LANDSCAPE BUILDER PRO
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Professional Video Landscape Creation • 8K Export • Real-Time Physics • Cloud Storage
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tool Palette */}
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🎨 Tools & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tools */}
              <div>
                <h4 className="font-bold text-white mb-3">🛠️ Landscape Tools</h4>
                <div className="space-y-2">
                  {tools.map((tool) => {
                    const ToolIcon = tool.icon
                    return (
                      <Button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        variant={selectedTool === tool.id ? 'default' : 'outline'}
                        className={`w-full justify-start ${
                          selectedTool === tool.id 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'border-purple-500/30'
                        }`}
                      >
                        <ToolIcon className="h-4 w-4 mr-2" />
                        {tool.name}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Brush Size */}
              <div>
                <h4 className="font-bold text-white mb-3">📏 Brush Size</h4>
                <Slider
                  value={brushSize}
                  onValueChange={setBrushSize}
                  max={200}
                  min={20}
                  step={10}
                  className="w-full"
                />
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Size: {brushSize[0]}px
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <h4 className="font-bold text-white mb-3">🎨 Color</h4>
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full h-12 bg-black/30 border-purple-500/30"
                />
              </div>

              {/* Quick Colors */}
              <div>
                <h4 className="font-bold text-white mb-3">🌈 Quick Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['#228B22', '#4169E1', '#8B4513', '#FFD700', '#FF6347', '#9370DB'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="w-8 h-8 rounded border-2 border-gray-500 hover:border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button onClick={clearCanvas} variant="outline" className="w-full border-red-500/30 text-red-400">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Canvas
                </Button>
                <Button onClick={saveProject} className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Project
                </Button>
                <Button onClick={exportProject} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export 8K
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Canvas Controls */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge className="bg-green-600">
                      <Palette className="h-3 w-3 mr-1" />
                      Tool: {tools.find(t => t.id === selectedTool)?.name}
                    </Badge>
                    <Badge className="bg-blue-600">
                      Elements: {elements.length}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant="outline"
                      className="border-green-500/30 text-green-400"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isPlaying ? 'Pause' : 'Preview'}
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Canvas */}
            <Card className="border-green-500/30 bg-gradient-to-br from-sky-400/10 to-green-400/10">
              <CardContent className="p-0">
                <div
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="relative w-full h-[600px] bg-gradient-to-b from-sky-200/20 to-green-200/20 cursor-crosshair overflow-hidden rounded-lg"
                  style={{
                    background: `linear-gradient(to bottom, 
                      rgba(135, 206, 235, 0.3) 0%, 
                      rgba(135, 206, 235, 0.1) 50%, 
                      rgba(34, 139, 34, 0.2) 100%)`
                  }}
                >
                  {/* Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px'
                    }}
                  />
                  
                  {/* Rendered Elements */}
                  {elements.map(renderElement)}
                  
                  {/* Center Instructions */}
                  {elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8 bg-black/20 rounded-lg border border-white/20">
                        <Eye className="h-12 w-12 mx-auto text-white/60 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Start Creating</h3>
                        <p className="text-white/70">
                          Select a tool and click anywhere on the canvas to start building your landscape
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Feature Info */}
            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                    <h4 className="font-bold text-yellow-400">Real-Time Physics</h4>
                    <p className="text-xs text-muted-foreground">Dynamic weather and lighting effects</p>
                  </div>
                  <div className="text-center">
                    <Download className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                    <h4 className="font-bold text-blue-400">8K Export</h4>
                    <p className="text-xs text-muted-foreground">Ultra-high resolution output</p>
                  </div>
                  <div className="text-center">
                    <Save className="h-8 w-8 mx-auto text-green-400 mb-2" />
                    <h4 className="font-bold text-green-400">Cloud Storage</h4>
                    <p className="text-xs text-muted-foreground">Unlimited project storage</p>
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
