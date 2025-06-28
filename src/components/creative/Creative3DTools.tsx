
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Box, 
  Sphere, 
  Cylinder, 
  Zap, 
  Palette, 
  RotateCcw, 
  Download,
  Sparkles,
  Wand2,
  Eye,
  Layers,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'

export function Creative3DTools() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTool, setSelectedTool] = useState('cube')
  const [currentColor, setCurrentColor] = useState('#00ff00')
  const [brushSize, setBrushSize] = useState([5])
  const [rotationSpeed, setRotationSpeed] = useState([1])
  const [animationStyle, setAnimationStyle] = useState('float')
  const [scene3D, setScene3D] = useState<any>(null)

  const tools3D = [
    { id: 'cube', name: '3D Cube', icon: Box, color: 'from-blue-600 to-cyan-600' },
    { id: 'sphere', name: '3D Sphere', icon: Sphere, color: 'from-purple-600 to-pink-600' },
    { id: 'cylinder', name: '3D Cylinder', icon: Cylinder, color: 'from-green-600 to-emerald-600' },
    { id: 'neural', name: 'Neural Network', icon: Zap, color: 'from-yellow-600 to-orange-600' },
    { id: 'fractal', name: 'Fractal Generator', icon: Sparkles, color: 'from-red-600 to-rose-600' },
    { id: 'particle', name: 'Particle System', icon: Layers, color: 'from-indigo-600 to-violet-600' }
  ]

  const animationStyles = [
    'float', 'rotate', 'pulse', 'wave', 'spiral', 'morph', 'fractal', 'neural'
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
    canvas.width = 800
    canvas.height = 600

    // Create gradient background with green snail glue effect
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, '#000814')
    gradient.addColorStop(0.5, '#001d3d')
    gradient.addColorStop(1, '#003566')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)

    // Add green snail glue dripping effect
    addGreenSnailGlue(ctx)
    
    // Start animation loop
    animate(ctx)
  }

  const addGreenSnailGlue = (ctx: CanvasRenderingContext2D) => {
    // Create holes with dripping green snail glue
    const holes = [
      { x: 100, y: 50 }, { x: 300, y: 80 }, { x: 500, y: 60 }, { x: 700, y: 40 },
      { x: 150, y: 200 }, { x: 400, y: 180 }, { x: 650, y: 220 },
      { x: 50, y: 350 }, { x: 250, y: 380 }, { x: 550, y: 340 }, { x: 750, y: 360 }
    ]

    holes.forEach((hole, index) => {
      // Create hole
      ctx.beginPath()
      ctx.arc(hole.x, hole.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#000000'
      ctx.fill()

      // Create dripping green glue effect
      const time = Date.now() * 0.001
      const dripLength = 20 + Math.sin(time + index) * 10
      
      const gradient = ctx.createLinearGradient(hole.x, hole.y, hole.x, hole.y + dripLength)
      gradient.addColorStop(0, '#39ff14')
      gradient.addColorStop(0.5, '#32cd32')
      gradient.addColorStop(1, 'rgba(50, 205, 50, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(hole.x - 2, hole.y, 4, dripLength)
    })
  }

  const animate = (ctx: CanvasRenderingContext2D) => {
    const animateFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 800, 600)
      
      // Redraw background
      const gradient = ctx.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, '#000814')
      gradient.addColorStop(0.5, '#001d3d')  
      gradient.addColorStop(1, '#003566')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 800, 600)

      // Add animated green snail glue
      addGreenSnailGlue(ctx)

      // Draw 3D-like objects based on selected tool
      draw3DObject(ctx)

      requestAnimationFrame(animateFrame)
    }
    animateFrame()
  }

  const draw3DObject = (ctx: CanvasRenderingContext2D) => {
    const time = Date.now() * 0.001 * rotationSpeed[0]
    const centerX = 400
    const centerY = 300

    ctx.save()
    ctx.translate(centerX, centerY)
    
    switch (selectedTool) {
      case 'cube':
        draw3DCube(ctx, time)
        break
      case 'sphere':
        draw3DSphere(ctx, time)
        break
      case 'cylinder':
        draw3DCylinder(ctx, time)
        break
      case 'neural':
        drawNeuralNetwork(ctx, time)
        break
      case 'fractal':
        drawFractal(ctx, time)
        break
      case 'particle':
        drawParticleSystem(ctx, time)
        break
    }
    
    ctx.restore()
  }

  const draw3DCube = (ctx: CanvasRenderingContext2D, time: number) => {
    const size = 80
    const rotation = time

    // Create 3D effect with multiple faces
    ctx.fillStyle = currentColor
    ctx.shadowColor = currentColor
    ctx.shadowBlur = 20

    // Front face
    ctx.fillRect(-size/2, -size/2, size, size)
    
    // Right face (darker)
    ctx.fillStyle = adjustBrightness(currentColor, -30)
    ctx.beginPath()
    ctx.moveTo(size/2, -size/2)
    ctx.lineTo(size/2 + 30, -size/2 - 30)
    ctx.lineTo(size/2 + 30, size/2 - 30)
    ctx.lineTo(size/2, size/2)
    ctx.fill()

    // Top face (lighter)
    ctx.fillStyle = adjustBrightness(currentColor, 30)
    ctx.beginPath()
    ctx.moveTo(-size/2, -size/2)
    ctx.lineTo(-size/2 + 30, -size/2 - 30)
    ctx.lineTo(size/2 + 30, -size/2 - 30)
    ctx.lineTo(size/2, -size/2)
    ctx.fill()
  }

  const draw3DSphere = (ctx: CanvasRenderingContext2D, time: number) => {
    const radius = 60
    
    // Create gradient for 3D effect
    const gradient = ctx.createRadialGradient(-20, -20, 0, 0, 0, radius)
    gradient.addColorStop(0, adjustBrightness(currentColor, 50))
    gradient.addColorStop(1, adjustBrightness(currentColor, -50))
    
    ctx.fillStyle = gradient
    ctx.shadowColor = currentColor
    ctx.shadowBlur = 25
    
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const draw3DCylinder = (ctx: CanvasRenderingContext2D, time: number) => {
    const width = 80
    const height = 120
    
    ctx.fillStyle = currentColor
    ctx.shadowColor = currentColor
    ctx.shadowBlur = 20
    
    // Main cylinder body
    ctx.fillRect(-width/2, -height/2, width, height)
    
    // Top ellipse
    ctx.fillStyle = adjustBrightness(currentColor, 30)
    ctx.beginPath()
    ctx.ellipse(0, -height/2, width/2, 15, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Bottom ellipse
    ctx.fillStyle = adjustBrightness(currentColor, -30)
    ctx.beginPath()
    ctx.ellipse(0, height/2, width/2, 15, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, time: number) => {
    const nodes = [
      { x: -100, y: -50 }, { x: -100, y: 0 }, { x: -100, y: 50 },
      { x: 0, y: -25 }, { x: 0, y: 25 },
      { x: 100, y: 0 }
    ]
    
    // Draw connections
    ctx.strokeStyle = currentColor
    ctx.lineWidth = 2
    ctx.shadowColor = currentColor
    ctx.shadowBlur = 10
    
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i < j) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.stroke()
        }
      })
    })
    
    // Draw nodes
    ctx.fillStyle = currentColor
    nodes.forEach(node => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawFractal = (ctx: CanvasRenderingContext2D, time: number) => {
    const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
      if (depth === 0) return
      
      const endX = x + Math.cos(angle) * length
      const endY = y + Math.sin(angle) * length
      
      ctx.strokeStyle = currentColor
      ctx.lineWidth = depth
      ctx.shadowColor = currentColor
      ctx.shadowBlur = 5
      
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      
      drawBranch(endX, endY, length * 0.7, angle - 0.5 + Math.sin(time) * 0.3, depth - 1)
      drawBranch(endX, endY, length * 0.7, angle + 0.5 + Math.cos(time) * 0.3, depth - 1)
    }
    
    drawBranch(0, 100, 60, -Math.PI/2, 8)
  }

  const drawParticleSystem = (ctx: CanvasRenderingContext2D, time: number) => {
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2 + time
      const radius = 50 + Math.sin(time + i) * 30
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      ctx.fillStyle = currentColor
      ctx.shadowColor = currentColor
      ctx.shadowBlur = 5
      
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const adjustBrightness = (color: string, amount: number) => {
    const hex = color.replace('#', '')
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount))
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount))
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount))
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const generateArtwork = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const imageData = canvas.toDataURL('image/png')
    
    try {
      // Save the generated 3D artwork
      const response = await fetch('/functions/v1/generate-artwork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePrompt: `3D ${selectedTool} design with ${animationStyle} animation`,
          artworkType: '3d_generated',
          style: 'futuristic_3d'
        })
      })

      if (response.ok) {
        toast.success('🎨 3D Artwork Generated!', {
          description: `${selectedTool} design saved successfully`
        })
      }
    } catch (error) {
      console.error('Error generating artwork:', error)
      toast.error('Failed to generate artwork')
    }
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `3d-${selectedTool}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    toast.success('🎨 3D Design Downloaded!', {
      description: 'Ready for NFT minting or further editing'
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-cyan-300">
            <Box className="h-8 w-8 animate-spin text-cyan-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Futuristic 3D Creative Tools
              </div>
              <div className="text-sm font-normal text-cyan-400">
                Advanced 3D Design & Animation Studio
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tool Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tools3D.map((tool) => (
              <Button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`h-16 flex flex-col items-center gap-2 ${
                  selectedTool === tool.id 
                    ? `bg-gradient-to-r ${tool.color} text-white` 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <tool.icon className="h-6 w-6" />
                <span className="text-xs">{tool.name}</span>
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-full h-10 rounded border-0 cursor-pointer"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Brush Size: {brushSize[0]}</label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rotation Speed: {rotationSpeed[0]}</label>
              <Slider
                value={rotationSpeed}
                onValueChange={setRotationSpeed}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Animation Style</label>
            <Select value={animationStyle} onValueChange={setAnimationStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {animationStyles.map(style => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)} Animation
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Canvas */}
          <div className="relative rounded-lg overflow-hidden border-2 border-cyan-500/30">
            <canvas
              ref={canvasRef}
              className="w-full h-auto bg-black"
              style={{ maxHeight: '400px' }}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge className="bg-cyan-600 text-white">
                {selectedTool.toUpperCase()}
              </Badge>
              <Badge className="bg-purple-600 text-white">
                {animationStyle.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={generateArtwork}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Generate 3D Artwork
            </Button>
            
            <Button
              onClick={downloadCanvas}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Design
            </Button>
            
            <Button
              onClick={() => initializeCanvas()}
              variant="outline"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
