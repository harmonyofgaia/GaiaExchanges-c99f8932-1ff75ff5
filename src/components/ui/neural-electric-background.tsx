import { useEffect, useState, useRef } from 'react'

interface NeuralNode {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  connections: number[]
  energy: number
  pulsePhase: number
}

interface ElectricShock {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  intensity: number
  duration: number
  timestamp: number
}

interface NeuralElectricBackgroundProps {
  style?: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'
  intensity?: 'low' | 'medium' | 'high'
}

export function NeuralElectricBackground({ 
  style = 'classic', 
  intensity = 'medium' 
}: NeuralElectricBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NeuralNode[]>([])
  const [electricShocks, setElectricShocks] = useState<ElectricShock[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const nodeCount = intensity === 'low' ? 50 : intensity === 'medium' ? 80 : 120

  const styleConfigs = {
    classic: {
      nodeColor: '#22c55e',
      connectionColor: '#16a34a',
      glowColor: '#22c55e',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)'
    },
    plasma: {
      nodeColor: '#a855f7',
      connectionColor: '#8b5cf6',
      glowColor: '#c084fc',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)'
    },
    galaxy: {
      nodeColor: '#3b82f6',
      connectionColor: '#1d4ed8',
      glowColor: '#60a5fa',
      background: 'linear-gradient(135deg, #0c0a1e 0%, #1e1b4b 50%, #0c0a1e 100%)'
    },
    forest: {
      nodeColor: '#10b981',
      connectionColor: '#059669',
      glowColor: '#34d399',
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)'
    },
    ocean: {
      nodeColor: '#06b6d4',
      connectionColor: '#0891b2',
      glowColor: '#22d3ee',
      background: 'linear-gradient(135deg, #164e63 0%, #0e7490 50%, #164e63 100%)'
    },
    fire: {
      nodeColor: '#ef4444',
      connectionColor: '#dc2626',
      glowColor: '#f87171',
      background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)'
    },
    ice: {
      nodeColor: '#06b6d4',
      connectionColor: '#0891b2',
      glowColor: '#67e8f9',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0c4a6e 100%)'
    },
    void: {
      nodeColor: '#6b7280',
      connectionColor: '#4b5563',
      glowColor: '#9ca3af',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)'
    },
    rainbow: {
      nodeColor: '#f59e0b',
      connectionColor: '#d97706',
      glowColor: '#fbbf24',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #7c2d12 25%, #1e3a8a 50%, #166534 75%, #1e1b4b 100%)'
    },
    matrix: {
      nodeColor: '#22c55e',
      connectionColor: '#16a34a',
      glowColor: '#4ade80',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
    }
  }

  const currentStyle = styleConfigs[style]

  // Generate electric shock on click
  const generateElectricShock = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create multiple shocks from different directions
    const shockCount = 3 + Math.floor(Math.random() * 3) // 3-5 shocks
    const newShocks: ElectricShock[] = []

    for (let i = 0; i < shockCount; i++) {
      // Random direction from edge of screen
      const angle = Math.random() * Math.PI * 2
      const distance = 200 + Math.random() * 300
      const startX = clickX + Math.cos(angle) * distance
      const startY = clickY + Math.sin(angle) * distance

      // Keep start points within reasonable bounds
      const boundedStartX = Math.max(-100, Math.min(canvas.width + 100, startX))
      const boundedStartY = Math.max(-100, Math.min(canvas.height + 100, startY))

      const shock: ElectricShock = {
        id: Date.now() + i,
        startX: boundedStartX,
        startY: boundedStartY,
        endX: clickX,
        endY: clickY,
        intensity: 0.8 + Math.random() * 0.4,
        duration: 800 + Math.random() * 400,
        timestamp: Date.now()
      }

      newShocks.push(shock)
    }

    setElectricShocks(prev => [...prev, ...newShocks])

    // Clean up old shocks after they expire
    setTimeout(() => {
      setElectricShocks(prev => 
        prev.filter(shock => 
          !newShocks.some(newShock => newShock.id === shock.id)
        )
      )
    }, 1200)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Initialize nodes only once
    const initialNodes: NeuralNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetX: Math.random() * canvas.width,
      targetY: Math.random() * canvas.height,
      connections: [],
      energy: Math.random(),
      pulsePhase: Math.random() * Math.PI * 2
    }))

    // Create connections between nearby nodes
    initialNodes.forEach((node, i) => {
      const nearbyNodes = initialNodes
        .filter((other, j) => {
          if (i === j) return false
          const distance = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
          return distance < 150
        })
        .slice(0, 3)
        .map(n => n.id)
      
      node.connections = nearbyNodes
    })

    nodesRef.current = initialNodes

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [nodeCount])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e: MouseEvent) => {
      generateElectricShock(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || nodesRef.current.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Update node positions directly in the ref
      nodesRef.current.forEach(node => {
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mousePosition.x, 2) + Math.pow(node.y - mousePosition.y, 2)
        )
        
        const mouseInfluence = Math.max(0, 200 - mouseDistance) / 200
        
        let targetX = node.targetX
        let targetY = node.targetY

        if (mouseInfluence > 0.1) {
          const angle = Math.atan2(mousePosition.y - node.y, mousePosition.x - node.x)
          targetX = node.x + Math.cos(angle) * mouseInfluence * 50
          targetY = node.y + Math.sin(angle) * mouseInfluence * 50
        } else {
          // Slow drift when not influenced by mouse
          targetX += (Math.random() - 0.5) * 0.5
          targetY += (Math.random() - 0.5) * 0.5
        }

        // Keep nodes within bounds
        targetX = Math.max(50, Math.min(canvas.width - 50, targetX))
        targetY = Math.max(50, Math.min(canvas.height - 50, targetY))

        // Update node properties
        node.x = node.x + (targetX - node.x) * 0.02
        node.y = node.y + (targetY - node.y) * 0.02
        node.targetX = targetX
        node.targetY = targetY
        node.energy = (Math.sin(time + node.pulsePhase) + 1) / 2
        node.pulsePhase = node.pulsePhase + 0.02
      })

      // Draw electric shocks
      const currentTime = Date.now()
      electricShocks.forEach(shock => {
        const elapsed = currentTime - shock.timestamp
        const progress = Math.min(elapsed / shock.duration, 1)
        
        if (progress < 1) {
          const opacity = (1 - progress) * shock.intensity
          
          // Blue neon electric shock
          ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`
          ctx.lineWidth = 2 + opacity * 3
          ctx.shadowColor = '#00aaff'
          ctx.shadowBlur = 8 + opacity * 15
          
          ctx.beginPath()
          ctx.moveTo(shock.startX, shock.startY)
          
          // Create zigzag electric effect
          const segments = 8
          for (let i = 1; i <= segments; i++) {
            const segmentProgress = i / segments
            const x = shock.startX + (shock.endX - shock.startX) * segmentProgress
            const y = shock.startY + (shock.endY - shock.startY) * segmentProgress
            
            // Add random zigzag
            const zigzagIntensity = opacity * 20 * (1 - Math.abs(segmentProgress - 0.5) * 2)
            const offsetX = (Math.random() - 0.5) * zigzagIntensity
            const offsetY = (Math.random() - 0.5) * zigzagIntensity
            
            if (i === segments) {
              ctx.lineTo(shock.endX, shock.endY)
            } else {
              ctx.lineTo(x + offsetX, y + offsetY)
            }
          }
          
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      })

      // Draw connections with electric effect
      nodesRef.current.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = nodesRef.current.find(n => n.id === connectionId)
          if (!connectedNode) return

          const distance = Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2)
          )

          if (distance < 200) {
            const opacity = (200 - distance) / 200 * (node.energy + connectedNode.energy) / 2
            
            // Electric connection effect
            ctx.strokeStyle = currentStyle.connectionColor + Math.floor(opacity * 255).toString(16).padStart(2, '0')
            ctx.lineWidth = 0.5 + opacity * 1.5
            ctx.shadowColor = currentStyle.glowColor
            ctx.shadowBlur = 3 + opacity * 8
            
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            
            // Add some electric zigzag effect
            const midX = (node.x + connectedNode.x) / 2 + (Math.random() - 0.5) * 15 * opacity
            const midY = (node.y + connectedNode.y) / 2 + (Math.random() - 0.5) * 15 * opacity
            
            ctx.quadraticCurveTo(midX, midY, connectedNode.x, connectedNode.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes with electric glow (smaller size)
      nodesRef.current.forEach(node => {
        const size = 1 + node.energy * 2
        const glowSize = 6 + node.energy * 12

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize)
        gradient.addColorStop(0, currentStyle.glowColor + '60')
        gradient.addColorStop(1, currentStyle.glowColor + '00')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Core node (smaller)
        ctx.fillStyle = currentStyle.nodeColor
        ctx.shadowColor = currentStyle.glowColor
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition, currentStyle, electricShocks])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="absolute inset-0"
        style={{ background: currentStyle.background }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-auto"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
