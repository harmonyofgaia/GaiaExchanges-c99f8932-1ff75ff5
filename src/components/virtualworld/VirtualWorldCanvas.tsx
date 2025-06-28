
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Move, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Home,
  TreePine,
  Waves,
  Mountain,
  Building,
  Users
} from 'lucide-react'
import { toast } from 'sonner'

interface Player {
  id: string
  name: string
  x: number
  y: number
  avatar: string
}

interface VirtualWorldCanvasProps {
  currentLandscape: string
  onLandscapeChange: (landscape: string) => void
}

export function VirtualWorldCanvas({ currentLandscape, onLandscapeChange }: VirtualWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'You', x: 200, y: 200, avatar: '🧑‍💼' },
    { id: '2', name: 'Alice', x: 300, y: 150, avatar: '👩‍🎨' },
    { id: '3', name: 'Bob', x: 150, y: 300, avatar: '👨‍💻' }
  ])
  const [playerPosition, setPlayerPosition] = useState({ x: 200, y: 200 })
  const [selectedTool, setSelectedTool] = useState('move')

  const landscapes = [
    { id: 'forest', name: 'Forest Paradise', icon: TreePine, bg: '#2d5016' },
    { id: 'underwater', name: 'Ocean Depths', icon: Waves, bg: '#1e40af' },
    { id: 'mountain', name: 'Mountain Peak', icon: Mountain, bg: '#7c3aed' },
    { id: 'city', name: 'Urban Plaza', icon: Building, bg: '#dc2626' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw landscape background
    const currentLandscapeData = landscapes.find(l => l.name === currentLandscape)
    ctx.fillStyle = currentLandscapeData?.bg || '#2d5016'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw players
    players.forEach(player => {
      // Player circle
      ctx.fillStyle = player.id === '1' ? '#10b981' : '#3b82f6'
      ctx.beginPath()
      ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI)
      ctx.fill()

      // Player name
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(player.name, player.x, player.y - 25)
      
      // Avatar emoji
      ctx.font = '20px Arial'
      ctx.fillText(player.avatar, player.x, player.y + 5)
    })

    // Draw landscape elements based on type
    if (currentLandscape === 'Forest Paradise') {
      // Trees
      ctx.fillStyle = '#166534'
      for (let i = 0; i < 5; i++) {
        const x = 100 + i * 150
        const y = 100 + (i % 2) * 200
        ctx.fillRect(x - 5, y, 10, 30)
        ctx.beginPath()
        ctx.arc(x, y - 10, 15, 0, 2 * Math.PI)
        ctx.fill()
      }
    } else if (currentLandscape === 'Ocean Depths') {
      // Bubbles and coral
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        ctx.beginPath()
        ctx.arc(x, y, 5 + Math.random() * 10, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }, [players, currentLandscape])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'move') return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setPlayerPosition({ x, y })
    setPlayers(prev => prev.map(player => 
      player.id === '1' ? { ...player, x, y } : player
    ))

    toast.success('🚶‍♂️ Moved to new position!')
  }

  return (
    <div className="space-y-6">
      {/* Landscape Selector */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Home className="h-5 w-5" />
            Select Your Landscape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {landscapes.map((landscape) => (
              <Button
                key={landscape.id}
                onClick={() => onLandscapeChange(landscape.name)}
                variant={currentLandscape === landscape.name ? "default" : "outline"}
                className="h-20 flex flex-col gap-2"
              >
                <landscape.icon className="h-6 w-6" />
                <span className="text-xs">{landscape.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Canvas */}
      <Card className="bg-black/50 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-400">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {currentLandscape} - Virtual World
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-600">{players.length} Players</Badge>
              <Badge className="bg-blue-600">Tool: {selectedTool}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tools */}
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              onClick={() => setSelectedTool('move')}
              variant={selectedTool === 'move' ? 'default' : 'outline'}
            >
              <Move className="h-4 w-4 mr-1" />
              Move
            </Button>
            <Button
              size="sm"
              onClick={() => setSelectedTool('build')}
              variant={selectedTool === 'build' ? 'default' : 'outline'}
            >
              <Building className="h-4 w-4 mr-1" />
              Build
            </Button>
            <Button
              size="sm"
              onClick={() => setSelectedTool('rotate')}
              variant={selectedTool === 'rotate' ? 'default' : 'outline'}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Rotate
            </Button>
          </div>

          {/* Canvas */}
          <div className="relative border-2 border-purple-500/30 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onClick={handleCanvasClick}
              className="cursor-crosshair bg-gradient-to-br from-green-800/20 to-blue-800/20"
            />
            
            {/* Instructions overlay */}
            <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
              <p>🎮 Click to move your character</p>
              <p>🏗️ Use tools to build and modify the world</p>
              <p>💬 Chat with other players in real-time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
