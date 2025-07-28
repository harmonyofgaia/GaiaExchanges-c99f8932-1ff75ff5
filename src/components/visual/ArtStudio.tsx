
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brush, 
  Eraser, 
  Palette, 
  Layers, 
  Undo, 
  Redo,
  Save,
  Download,
  Upload,
  Paintbrush,
  Circle,
  Square,
  Triangle,
  Type,
  Image,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

export function ArtStudio({ isLocked }: { isLocked: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<'brush' | 'eraser' | 'shape' | 'text'>('brush')
  const [brushSize, setBrushSize] = useState(5)
  const [color, setColor] = useState('#22c55e')
  const [opacity, setOpacity] = useState(100)
  const [isDrawing, setIsDrawing] = useState(false)

  const tools = [
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'eraser', name: 'Eraser', icon: Eraser },
    { id: 'shape', name: 'Shapes', icon: Circle },
    { id: 'text', name: 'Text', icon: Type }
  ]

  const shapes = [
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'square', name: 'Square', icon: Square },
    { id: 'triangle', name: 'Triangle', icon: Triangle }
  ]

  const colorPalette = [
    '#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b',
    '#ef4444', '#ec4899', '#06b6d4', '#84cc16',
    '#f97316', '#6366f1', '#14b8a6', '#f43f5e'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Set background
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent) => {
    if (isLocked) return
    setIsDrawing(true)
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || isLocked) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.lineTo(x, y)
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a1a' : color
    ctx.lineWidth = brushSize
    ctx.globalAlpha = opacity / 100
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (isLocked) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    toast.success('Canvas cleared')
  }

  const saveArtwork = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.toBlob((blob) => {
      if (!blob) return
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gaia-artwork-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
      
      toast.success('Artwork saved!')
    })
  }

  const generateAIArt = () => {
    if (isLocked) return
    
    // Simulate AI art generation
    toast.success('AI art generation started!', {
      description: 'Your unique artwork will be ready in a few seconds...'
    })
    
    setTimeout(() => {
      toast.success('AI artwork generated!', {
        description: 'Check your design library for the new creation'
      })
    }, 3000)
  }

  return (
    <Card className="border-pink-500/20 bg-pink-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-400">
          <Paintbrush className="h-5 w-5" />
          Digital Art Studio
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs defaultValue="canvas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="ai-gen">AI Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="canvas" className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-4 bg-background/50 rounded-lg">
              {tools.map((t) => {
                const Icon = t.icon
                return (
                  <Button
                    key={t.id}
                    variant={tool === t.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTool(t.id as any)}
                    disabled={isLocked}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {t.name}
                  </Button>
                )
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                disabled={isLocked}
              >
                Clear
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={saveArtwork}
              >
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            
            {/* Canvas */}
            <div className="border rounded-lg overflow-hidden bg-gray-900">
              <canvas
                ref={canvasRef}
                className="cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-4">
            {/* Brush Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Brush Size: {brushSize}px</Label>
                <Slider
                  value={[brushSize]}
                  onValueChange={([value]) => setBrushSize(value)}
                  min={1}
                  max={50}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Opacity: {opacity}%</Label>
                <Slider
                  value={[opacity]}
                  onValueChange={([value]) => setOpacity(value)}
                  min={1}
                  max={100}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Color Palette</Label>
                <div className="grid grid-cols-6 gap-2">
                  {colorPalette.map((c) => (
                    <Button
                      key={c}
                      className="h-10 w-10 p-0 rounded-full border-2"
                      style={{ 
                        backgroundColor: c,
                        borderColor: color === c ? '#white' : 'transparent'
                      }}
                      onClick={() => setColor(c)}
                      disabled={isLocked}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={isLocked}
                    className="w-20"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={isLocked}
                    placeholder="#hex"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-gen" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="p-8 border-2 border-dashed border-muted rounded-lg">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-lg font-semibold mb-2">AI Art Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Generate unique neural network inspired artwork
                </p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <Input
                    placeholder="Describe your artwork..."
                    disabled={isLocked}
                  />
                  
                  <Select disabled={isLocked}>
                    <SelectTrigger>
                      <SelectValue placeholder="Art style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neural">Neural Abstract</SelectItem>
                      <SelectItem value="cosmic">Cosmic Energy</SelectItem>
                      <SelectItem value="nature">Nature Harmony</SelectItem>
                      <SelectItem value="matrix">Digital Matrix</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    onClick={generateAIArt}
                    disabled={isLocked}
                    className="w-full"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Art
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
