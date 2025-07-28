
import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brush, 
  Palette, 
  Layers, 
  Sparkles, 
  Wand2, 
  Download, 
  Upload, 
  Save,
  Eraser,
  Circle,
  Square,
  Triangle,
  Move,
  RotateCcw,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react'
import { toast } from 'sonner'

export function ArtCreationStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTool, setSelectedTool] = useState('brush')
  const [brushSize, setBrushSize] = useState([10])
  const [opacity, setOpacity] = useState([100])
  const [selectedColor, setSelectedColor] = useState('#00ff88')
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true, locked: false },
    { id: 2, name: 'Layer 1', visible: true, locked: false }
  ])

  const tools = [
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'eraser', name: 'Eraser', icon: Eraser },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'square', name: 'Rectangle', icon: Square },
    { id: 'triangle', name: 'Triangle', icon: Triangle },
    { id: 'move', name: 'Move', icon: Move },
    { id: 'magic', name: 'Magic Wand', icon: Wand2 }
  ]

  const colorPalettes = [
    { name: 'Gaia Nature', colors: ['#00ff88', '#22c55e', '#16a34a', '#15803d'] },
    { name: 'Ocean Deep', colors: ['#0ea5e9', '#0284c7', '#0369a1', '#075985'] },
    { name: 'Cosmic Purple', colors: ['#a855f7', '#9333ea', '#7c3aed', '#6b21f8'] },
    { name: 'Fire Energy', colors: ['#f59e0b', '#d97706', '#b45309', '#92400e'] },
    { name: 'Neural Electric', colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75'] }
  ]

  const effects = [
    { name: 'Glow', intensity: [50] },
    { name: 'Shadow', intensity: [30] },
    { name: 'Blur', intensity: [20] },
    { name: 'Sharpen', intensity: [40] },
    { name: 'Neon', intensity: [70] },
    { name: 'Holographic', intensity: [60] }
  ]

  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length}`,
      visible: true,
      locked: false
    }
    setLayers([...layers, newLayer])
    toast.success('New layer added!')
  }

  const toggleLayerVisibility = (id: number) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ))
  }

  const toggleLayerLock = (id: number) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ))
  }

  const applyEffect = (effectName: string) => {
    toast.success(`${effectName} effect applied to artwork!`)
  }

  const saveArtwork = () => {
    toast.success('🎨 Masterpiece saved to your design library!')
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      {/* Tools Panel */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brush className="h-5 w-5" />
            Art Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? 'default' : 'outline'}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-3 h-auto ${
                    selectedTool === tool.id 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-purple-500/50'
                  }`}
                >
                  <div className="text-center">
                    <Icon className="h-5 w-5 mb-1" />
                    <div className="text-xs">{tool.name}</div>
                  </div>
                </Button>
              )
            })}
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-purple-400">Brush Size: {brushSize[0]}px</Label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                max={100}
                min={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-purple-400">Opacity: {opacity[0]}%</Label>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={100}
                min={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-purple-400">Color</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-10 p-1 border-purple-500/50"
                />
                <div className="flex-1 bg-purple-900/40 rounded px-3 py-2 text-sm">
                  {selectedColor}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Area */}
      <div className="xl:col-span-2 space-y-4">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Sparkles className="h-5 w-5" />
              🎨 Art Canvas
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={saveArtwork} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Art
              </Button>
              <Button variant="outline" className="border-green-500/50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/90 rounded-lg border border-green-500/30 flex items-center justify-center relative overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="absolute inset-0 cursor-crosshair"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              <div className="text-center text-green-400/60 pointer-events-none">
                <Palette className="h-16 w-16 mx-auto mb-2" />
                <div className="text-lg font-bold">Create Your Masterpiece</div>
                <div className="text-sm">Use the tools to start painting</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palettes */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Palette className="h-5 w-5" />
              Color Palettes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {colorPalettes.map((palette, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">{palette.name}</span>
                  <div className="flex gap-1">
                    {palette.colors.map((color, colorIndex) => (
                      <button
                        key={colorIndex}
                        onClick={() => setSelectedColor(color)}
                        className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layers & Effects Panel */}
      <div className="space-y-4">
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Layers className="h-5 w-5" />
              Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center gap-2 p-2 bg-black/30 rounded">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleLayerVisibility(layer.id)}
                  className="p-1 h-6 w-6"
                >
                  {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleLayerLock(layer.id)}
                  className="p-1 h-6 w-6"
                >
                  {layer.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                </Button>
                <span className="flex-1 text-sm">{layer.name}</span>
              </div>
            ))}
            <Button onClick={addLayer} className="w-full bg-orange-600 hover:bg-orange-700">
              Add Layer
            </Button>
          </CardContent>
        </Card>

        <Card className="border-pink-500/30 bg-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-400">
              <Zap className="h-5 w-5" />
              Effects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {effects.map((effect, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{effect.name}</span>
                  <Badge className="bg-pink-600">Pro</Badge>
                </div>
                <div className="flex gap-2">
                  <Slider
                    value={effect.intensity}
                    max={100}
                    min={0}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => applyEffect(effect.name)}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
