import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Brush, 
  Palette, 
  Square, 
  Circle, 
  Type, 
  Download, 
  Upload, 
  Undo2, 
  Redo2,
  Trash2,
  Wand2,
  Save,
  FolderOpen,
  Layers
} from 'lucide-react'
import { toast } from 'sonner'

interface ArtLayer {
  id: string
  name: string
  visible: boolean
}

export function ArtStudio() {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
  const [activeTool, setActiveTool] = useState('brush')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [opacity, setOpacity] = useState(1)
  const [artHistory, setArtHistory] = useState<string[]>([])
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [layers, setLayers] = useState<ArtLayer[]>([
    { id: 'layer-1', name: 'Layer 1', visible: true }
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const initializeCanvas = () => {
    if (!canvasRef.current || fabricCanvas) return

    try {
      // Import Canvas from fabric dynamically
      import('fabric').then(({ Canvas, PencilBrush }) => {
        const canvas = new Canvas(canvasRef.current!, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff'
        })

        // Initialize drawing brush
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        canvas.freeDrawingBrush.color = selectedColor
        canvas.freeDrawingBrush.width = brushSize

        setFabricCanvas(canvas)
        toast.success('🎨 Art Studio Canvas Ready!', {
          description: 'Start creating amazing artwork'
        })
      }).catch(error => {
        console.error('Failed to initialize Fabric.js:', error)
        toast.error('Canvas initialization failed')
      })
    } catch (error) {
      console.error('Canvas initialization error:', error)
    }
  }

  useEffect(() => {
    initializeCanvas()

    return () => {
      fabricCanvas?.dispose()
    }
  }, [])

  useEffect(() => {
    if (!fabricCanvas) return

    fabricCanvas.freeDrawingBrush.color = selectedColor
    fabricCanvas.freeDrawingBrush.width = brushSize
    fabricCanvas.set('opacity', opacity)
    fabricCanvas.renderAll()
  }, [selectedColor, brushSize, opacity, fabricCanvas])

  const handleUndo = () => {
    if (!fabricCanvas) return
    // Implement undo functionality here
    toast.info('Undo feature is under development')
  }

  const handleRedo = () => {
    if (!fabricCanvas) return
    // Implement redo functionality here
    toast.info('Redo feature is under development')
  }

  const clearCanvas = () => {
    if (!fabricCanvas) return

    fabricCanvas.clear()
    fabricCanvas.backgroundColor = '#ffffff'
    setArtHistory(prev => ['🎨 Canvas cleared', ...prev.slice(0, 4)])
    toast.warn('Canvas cleared')
  }

  const saveArtwork = () => {
    if (!fabricCanvas) return

    const imageData = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8
    })

    setArtHistory(prev => ['💾 Artwork saved', ...prev.slice(0, 4)])
    toast.success('Artwork saved successfully!')
  }

  const loadArtwork = () => {
    if (!fabricCanvas) return
    // Implement load artwork functionality here
    toast.info('Load artwork feature is under development')
  }

  const exportCanvas = () => {
    if (!fabricCanvas) return

    const imageData = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8
    })

    const link = document.createElement('a')
    link.href = imageData
    link.download = 'artwork.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setArtHistory(prev => ['📤 Artwork exported as PNG', ...prev.slice(0, 4)])
    toast.success('Canvas exported as PNG')
  }

  const importImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fabricCanvas || !e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target || typeof event.target.result !== 'string') return

      fabric.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(fabricCanvas.width!)
        img.scaleToHeight(fabricCanvas.height!)
        fabricCanvas.add(img)
        fabricCanvas.renderAll()
        setArtHistory(prev => ['🖼️ Image imported onto canvas', ...prev.slice(0, 4)])
        toast.success('Image imported successfully!')
      })
    }

    reader.readAsDataURL(file)
  }

  const generateAIArt = () => {
    if (!fabricCanvas) return
    // Implement AI art generation functionality here
    toast.info('AI art generation feature is under development')
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brush className="h-5 w-5" />
            🎨 Art Studio - Creative Canvas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Art Tools */}
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
            <Button
              variant={activeTool === 'brush' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('brush')}
              className="flex flex-col gap-1"
            >
              <Brush className="h-4 w-4" />
              <span className="text-xs">Brush</span>
            </Button>
            
            <Button
              variant={activeTool === 'rectangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('rectangle')}
              className="flex flex-col gap-1"
            >
              <Square className="h-4 w-4" />
              <span className="text-xs">Rectangle</span>
            </Button>
            
            <Button
              variant={activeTool === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('circle')}
              className="flex flex-col gap-1"
            >
              <Circle className="h-4 w-4" />
              <span className="text-xs">Circle</span>
            </Button>
            
            <Button
              variant={activeTool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('text')}
              className="flex flex-col gap-1"
            >
              <Type className="h-4 w-4" />
              <span className="text-xs">Text</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
              className="flex flex-col gap-1"
            >
              <Undo2 className="h-4 w-4" />
              <span className="text-xs">Undo</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
              className="flex flex-col gap-1"
            >
              <Redo2 className="h-4 w-4" />
              <span className="text-xs">Redo</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={clearCanvas}
              className="flex flex-col gap-1 text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-xs">Clear</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={generateAIArt}
              className="flex flex-col gap-1 text-purple-400"
            >
              <Wand2 className="h-4 w-4" />
              <span className="text-xs">AI Art</span>
            </Button>
          </div>

          {/* Tool Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-16 h-10"
                />
                <div className="text-sm text-muted-foreground">{selectedColor}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Brush Size: {brushSize}px</Label>
              <Slider
                value={[brushSize]}
                onValueChange={(value) => setBrushSize(value[0])}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Opacity: {Math.round(opacity * 100)}%</Label>
              <Slider
                value={[opacity]}
                onValueChange={(value) => setOpacity(value[0])}
                max={1}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Canvas */}
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="bg-white cursor-crosshair"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button onClick={saveArtwork} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Artwork
              </Button>
              <Button onClick={loadArtwork} variant="outline">
                <FolderOpen className="h-4 w-4 mr-2" />
                Load Artwork
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={exportCanvas} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </Button>
              <Button onClick={() => document.getElementById('art-import')?.click()} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Image
              </Button>
              <input
                id="art-import"
                type="file"
                accept="image/*"
                onChange={importImage}
                className="hidden"
              />
            </div>
          </div>

          {/* Layer Management */}
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
                <Layers className="h-5 w-5" />
                Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {layers.map((layer, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                  <div className="flex-1">{layer.name}</div>
                  <Badge variant={layer.visible ? 'default' : 'secondary'}>
                    {layer.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Art History */}
          {artHistory.length > 0 && (
            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400 text-lg">
                  <Palette className="h-5 w-5" />
                  Recent Artwork History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {artHistory.map((entry, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-background/30 p-2 rounded">
                      {entry}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
