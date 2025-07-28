
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

interface DrawingState {
  imageData: ImageData | null
  timestamp: number
}

export function ArtStudio({ isLocked }: { isLocked: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<'brush' | 'eraser' | 'shape' | 'text'>('brush')
  const [shape, setShape] = useState<'circle' | 'square' | 'triangle'>('circle')
  const [brushSize, setBrushSize] = useState(5)
  const [color, setColor] = useState('#22c55e')
  const [opacity, setOpacity] = useState(100)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const [history, setHistory] = useState<DrawingState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiStyle, setAiStyle] = useState('neural')

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

  const aiStyles = [
    { id: 'neural', name: 'Neural Abstract' },
    { id: 'cosmic', name: 'Cosmic Energy' },
    { id: 'nature', name: 'Nature Harmony' },
    { id: 'matrix', name: 'Digital Matrix' }
  ]

  useEffect(() => {
    initializeCanvas()
  }, [])

  const initializeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const container = canvas.parentElement
    if (container) {
      canvas.width = Math.min(800, container.clientWidth - 32)
      canvas.height = 600
    } else {
      canvas.width = 800
      canvas.height = 600
    }

    // Set background
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Save initial state
    saveToHistory()
  }

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newState: DrawingState = {
      imageData,
      timestamp: Date.now()
    }

    // Remove any states after current index
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift()
    } else {
      setHistoryIndex(historyIndex + 1)
    }

    setHistory(newHistory)
  }

  const undo = () => {
    if (historyIndex <= 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prevState = history[historyIndex - 1]
    if (prevState && prevState.imageData) {
      ctx.putImageData(prevState.imageData, 0, 0)
      setHistoryIndex(historyIndex - 1)
      toast.success('Undid last action')
    }
  }

  const redo = () => {
    if (historyIndex >= history.length - 1) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const nextState = history[historyIndex + 1]
    if (nextState && nextState.imageData) {
      ctx.putImageData(nextState.imageData, 0, 0)
      setHistoryIndex(historyIndex + 1)
      toast.success('Redid action')
    }
  }

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e: React.MouseEvent) => {
    if (isLocked) {
      toast.error('Art studio is locked')
      return
    }

    const pos = getMousePos(e)
    setLastPos(pos)
    setIsDrawing(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (tool === 'shape') {
      // For shapes, we'll draw on mouseup
      return
    }

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || isLocked) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(e)

    if (tool === 'shape') {
      // For shapes, just update preview (not implemented in this version)
      return
    }

    // Set drawing properties
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a1a' : color
    ctx.lineWidth = brushSize
    ctx.globalAlpha = opacity / 100
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }

    setLastPos(pos)
  }

  const stopDrawing = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (tool === 'shape') {
      const pos = getMousePos(e)
      drawShape(lastPos, pos)
    }

    setIsDrawing(false)
    saveToHistory()
  }

  const drawShape = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = end.x - start.x
    const height = end.y - start.y

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = brushSize
    ctx.globalAlpha = opacity / 100

    switch (shape) {
      case 'circle':
        const radius = Math.sqrt(width * width + height * height) / 2
        ctx.beginPath()
        ctx.arc(start.x + width / 2, start.y + height / 2, radius, 0, 2 * Math.PI)
        ctx.stroke()
        break
      case 'square':
        ctx.strokeRect(start.x, start.y, width, height)
        break
      case 'triangle':
        ctx.beginPath()
        ctx.moveTo(start.x + width / 2, start.y)
        ctx.lineTo(start.x, end.y)
        ctx.lineTo(end.x, end.y)
        ctx.closePath()
        ctx.stroke()
        break
    }
  }

  const clearCanvas = () => {
    if (isLocked) {
      toast.error('Art studio is locked')
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    saveToHistory()
    toast.success('Canvas cleared')
  }

  const saveArtwork = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error('Failed to save artwork')
        return
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gaia-artwork-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)

      toast.success('Artwork saved!', {
        description: 'Downloaded to your device'
      })
    }, 'image/png')
  }

  const loadArtwork = () => {
    if (isLocked) {
      toast.error('Art studio is locked')
      return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current
          if (!canvas) return

          const ctx = canvas.getContext('2d')
          if (!ctx) return

          // Clear canvas
          ctx.fillStyle = '#1a1a1a'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          saveToHistory()
          
          toast.success('Artwork loaded successfully')
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const generateAIArt = () => {
    if (isLocked) {
      toast.error('Art studio is locked')
      return
    }

    if (!aiPrompt.trim()) {
      toast.error('Please enter a description for your artwork')
      return
    }

    toast.success('AI art generation started!', {
      description: 'Your unique artwork will be ready in a few seconds...'
    })

    // Simulate AI art generation
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Create a simple generative art pattern based on style
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Generate pattern based on style
      switch (aiStyle) {
        case 'neural':
          // Neural network pattern
          ctx.strokeStyle = '#22c55e'
          ctx.lineWidth = 2
          for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const connections = Math.floor(Math.random() * 5) + 1
            
            for (let j = 0; j < connections; j++) {
              const endX = x + (Math.random() - 0.5) * 200
              const endY = y + (Math.random() - 0.5) * 200
              
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(endX, endY)
              ctx.stroke()
            }
            
            // Draw node
            ctx.fillStyle = '#22c55e'
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, 2 * Math.PI)
            ctx.fill()
          }
          break
        case 'cosmic':
          // Cosmic pattern
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300)
          gradient.addColorStop(0, '#8b5cf6')
          gradient.addColorStop(0.5, '#3b82f6')
          gradient.addColorStop(1, '#1e1b4b')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(centerX, centerY, 300, 0, 2 * Math.PI)
          ctx.fill()
          
          // Add stars
          ctx.fillStyle = '#ffffff'
          for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const size = Math.random() * 2
            ctx.beginPath()
            ctx.arc(x, y, size, 0, 2 * Math.PI)
            ctx.fill()
          }
          break
        case 'nature':
          // Nature pattern
          const earthGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          earthGradient.addColorStop(0, '#22c55e')
          earthGradient.addColorStop(0.5, '#16a34a')
          earthGradient.addColorStop(1, '#15803d')
          
          ctx.fillStyle = earthGradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          // Add organic shapes
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const size = Math.random() * 50 + 20
            
            ctx.fillStyle = `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.2})`
            ctx.beginPath()
            ctx.arc(x, y, size, 0, 2 * Math.PI)
            ctx.fill()
          }
          break
        case 'matrix':
          // Matrix pattern
          ctx.fillStyle = '#000000'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          ctx.fillStyle = '#00ff00'
          ctx.font = '12px monospace'
          
          const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          for (let x = 0; x < canvas.width; x += 20) {
            for (let y = 0; y < canvas.height; y += 20) {
              if (Math.random() > 0.7) {
                const char = chars[Math.floor(Math.random() * chars.length)]
                ctx.globalAlpha = Math.random()
                ctx.fillText(char, x, y)
              }
            }
          }
          ctx.globalAlpha = 1
          break
      }

      saveToHistory()
      
      toast.success('AI artwork generated!', {
        description: `Created ${aiStyle} style artwork based on: "${aiPrompt}"`
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
              
              <div className="flex-1" />
              
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={isLocked || historyIndex <= 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={isLocked || historyIndex >= history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
              
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
                onClick={loadArtwork}
                disabled={isLocked}
              >
                <Upload className="h-4 w-4 mr-2" />
                Load
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
            
            {tool === 'shape' && (
              <div className="flex gap-2 p-2 bg-background/30 rounded">
                {shapes.map((s) => {
                  const Icon = s.icon
                  return (
                    <Button
                      key={s.id}
                      variant={shape === s.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShape(s.id as any)}
                      disabled={isLocked}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  )
                })}
              </div>
            )}
            
            {/* Canvas */}
            <div className="border rounded-lg overflow-hidden bg-gray-900">
              <canvas
                ref={canvasRef}
                className="cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ maxWidth: '100%', height: 'auto' }}
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
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    disabled={isLocked}
                  />
                  
                  <Select 
                    value={aiStyle} 
                    onValueChange={setAiStyle}
                    disabled={isLocked}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Art style" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiStyles.map(style => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    onClick={generateAIArt}
                    disabled={isLocked || !aiPrompt.trim()}
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
