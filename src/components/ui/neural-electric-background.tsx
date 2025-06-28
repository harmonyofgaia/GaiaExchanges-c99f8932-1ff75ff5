
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
  organicRadius: number
  dendrites: Array<{ angle: number; length: number; branches: Array<{ angle: number; length: number }> }>
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

interface OrganicParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  type: 'spore' | 'dendrite' | 'synapse'
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
  const [organicParticles, setOrganicParticles] = useState<OrganicParticle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const nodeCount = intensity === 'low' ? 40 : intensity === 'medium' ? 65 : 100

  const styleConfigs = {
    classic: {
      nodeColor: '#22c55e',
      connectionColor: '#16a34a',
      glowColor: '#22c55e',
      synapseColor: '#fbbf24',
      background: 'linear-gradient(135deg, #0a0f0a 0%, #1a2e1a 50%, #0a0f0a 100%)',
      organicIntensity: 0.6
    },
    plasma: {
      nodeColor: '#a855f7',
      connectionColor: '#8b5cf6',
      glowColor: '#c084fc',
      synapseColor: '#ec4899',
      background: 'linear-gradient(135deg, #1e0a3d 0%, #4c1d95 50%, #1e0a3d 100%)',
      organicIntensity: 0.8
    },
    galaxy: {
      nodeColor: '#3b82f6',
      connectionColor: '#1d4ed8',
      glowColor: '#60a5fa',
      synapseColor: '#f59e0b',
      background: 'linear-gradient(135deg, #0c0a2e 0%, #1e3a8a 50%, #0c0a2e 100%)',
      organicIntensity: 0.9
    },
    forest: {
      nodeColor: '#10b981',
      connectionColor: '#059669',
      glowColor: '#34d399',
      synapseColor: '#f97316',
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)',
      organicIntensity: 1.0
    },
    ocean: {
      nodeColor: '#06b6d4',
      connectionColor: '#0891b2',
      glowColor: '#22d3ee',
      synapseColor: '#f59e0b',
      background: 'linear-gradient(135deg, #164e63 0%, #0e7490 50%, #164e63 100%)',
      organicIntensity: 0.7
    },
    fire: {
      nodeColor: '#ef4444',
      connectionColor: '#dc2626',
      glowColor: '#f87171',
      synapseColor: '#fb923c',
      background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
      organicIntensity: 0.9
    },
    ice: {
      nodeColor: '#06b6d4',
      connectionColor: '#0891b2',
      glowColor: '#67e8f9',
      synapseColor: '#a78bfa',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0c4a6e 100%)',
      organicIntensity: 0.5
    },
    void: {
      nodeColor: '#6b7280',
      connectionColor: '#4b5563',
      glowColor: '#9ca3af',
      synapseColor: '#fbbf24',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
      organicIntensity: 0.3
    },
    rainbow: {
      nodeColor: '#f59e0b',
      connectionColor: '#d97706',
      glowColor: '#fbbf24',
      synapseColor: '#ec4899',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #7c2d12 25%, #1e3a8a 50%, #166534 75%, #1e1b4b 100%)',
      organicIntensity: 1.2
    },
    matrix: {
      nodeColor: '#22c55e',
      connectionColor: '#16a34a',
      glowColor: '#4ade80',
      synapseColor: '#22c55e',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      organicIntensity: 0.8
    }
  }

  const currentStyle = styleConfigs[style]

  // Generate electric shock with organic branching
  const generateElectricShock = (clickX: number, clickY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const shockCount = 2 + Math.floor(Math.random() * 4)
    const newShocks: ElectricShock[] = []

    for (let i = 0; i < shockCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 150 + Math.random() * 250
      const startX = clickX + Math.cos(angle) * distance
      const startY = clickY + Math.sin(angle) * distance

      const boundedStartX = Math.max(-100, Math.min(canvas.width + 100, startX))
      const boundedStartY = Math.max(-100, Math.min(canvas.height + 100, startY))

      const shock: ElectricShock = {
        id: Date.now() + i,
        startX: boundedStartX,
        startY: boundedStartY,
        endX: clickX,
        endY: clickY,
        intensity: 0.7 + Math.random() * 0.5,
        duration: 600 + Math.random() * 600,
        timestamp: Date.now()
      }

      newShocks.push(shock)
    }

    setElectricShocks(prev => [...prev, ...newShocks])

    // Add organic particles at click
    const newParticles: OrganicParticle[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const speed = 1 + Math.random() * 2
      newParticles.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color: currentStyle.synapseColor,
        life: 60 + Math.random() * 60,
        type: Math.random() < 0.3 ? 'spore' : Math.random() < 0.6 ? 'dendrite' : 'synapse'
      })
    }
    setOrganicParticles(prev => [...prev, ...newParticles])

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

    // Initialize organic neural nodes
    const initialNodes: NeuralNode[] = Array.from({ length: nodeCount }, (_, i) => {
      const dendrites = Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => ({
        angle: Math.random() * Math.PI * 2,
        length: 20 + Math.random() * 40,
        branches: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
          angle: Math.random() * Math.PI * 2,
          length: 10 + Math.random() * 20
        }))
      }))

      return {
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        connections: [],
        energy: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2,
        organicRadius: 8 + Math.random() * 12,
        dendrites
      }
    })

    // Create organic connections
    initialNodes.forEach((node, i) => {
      const nearbyNodes = initialNodes
        .filter((other, j) => {
          if (i === j) return false
          const distance = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
          return distance < 180
        })
        .slice(0, 2 + Math.floor(Math.random() * 2))
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
      // Clear with organic fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Update organic particles
      setOrganicParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vx: particle.vx * 0.99,
          vy: particle.vy * 0.99
        })).filter(particle => particle.life > 0)
      )

      // Draw organic particles
      organicParticles.forEach(particle => {
        const alpha = particle.life / 120
        ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        
        switch (particle.type) {
          case 'spore':
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'dendrite':
            ctx.strokeStyle = particle.color + Math.floor(alpha * 128).toString(16).padStart(2, '0')
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle.x + particle.vx * 10, particle.y + particle.vy * 10)
            ctx.stroke()
            break
          case 'synapse':
            ctx.shadowColor = particle.color
            ctx.shadowBlur = 8
            ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
            break
        }
      })

      // Update neural nodes with organic movement
      nodesRef.current.forEach(node => {
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mousePosition.x, 2) + Math.pow(node.y - mousePosition.y, 2)
        )
        
        const mouseInfluence = Math.max(0, 180 - mouseDistance) / 180
        
        let targetX = node.targetX
        let targetY = node.targetY

        if (mouseInfluence > 0.1) {
          const angle = Math.atan2(mousePosition.y - node.y, mousePosition.x - node.x)
          targetX = node.x + Math.cos(angle) * mouseInfluence * 40
          targetY = node.y + Math.sin(angle) * mouseInfluence * 40
        } else {
          // Organic drift
          targetX += (Math.random() - 0.5) * 0.3
          targetY += (Math.random() - 0.5) * 0.3
        }

        targetX = Math.max(50, Math.min(canvas.width - 50, targetX))
        targetY = Math.max(50, Math.min(canvas.height - 50, targetY))

        node.x = node.x + (targetX - node.x) * 0.015
        node.y = node.y + (targetY - node.y) * 0.015
        node.targetX = targetX
        node.targetY = targetY
        node.energy = (Math.sin(time + node.pulsePhase) + 1) / 2
        node.pulsePhase = node.pulsePhase + 0.015
      })

      // Draw organic electric shocks
      const currentTime = Date.now()
      electricShocks.forEach(shock => {
        const elapsed = currentTime - shock.timestamp
        const progress = Math.min(elapsed / shock.duration, 1)
        
        if (progress < 1) {
          const opacity = (1 - progress) * shock.intensity
          
          // Organic branching electric effect
          ctx.strokeStyle = currentStyle.synapseColor + Math.floor(opacity * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = 1 + opacity * 2
          ctx.shadowColor = currentStyle.synapseColor
          ctx.shadowBlur = 6 + opacity * 12
          
          ctx.beginPath()
          ctx.moveTo(shock.startX, shock.startY)
          
          // Create organic branching pattern
          const segments = 6
          for (let i = 1; i <= segments; i++) {
            const segmentProgress = i / segments
            const x = shock.startX + (shock.endX - shock.startX) * segmentProgress
            const y = shock.startY + (shock.endY - shock.startY) * segmentProgress
            
            // Add organic curves and branches
            const branchIntensity = opacity * 15 * Math.sin(segmentProgress * Math.PI)
            const offsetX = Math.sin(time * 2 + shock.id) * branchIntensity
            const offsetY = Math.cos(time * 2 + shock.id) * branchIntensity
            
            if (i === segments) {
              ctx.lineTo(shock.endX, shock.endY)
            } else {
              ctx.lineTo(x + offsetX, y + offsetY)
              
              // Add small branches
              if (Math.random() < 0.3) {
                ctx.moveTo(x + offsetX, y + offsetY)
                const branchAngle = Math.random() * Math.PI * 2
                const branchLength = 10 + Math.random() * 20
                ctx.lineTo(
                  x + offsetX + Math.cos(branchAngle) * branchLength,
                  y + offsetY + Math.sin(branchAngle) * branchLength
                )
                ctx.moveTo(x + offsetX, y + offsetY)
              }
            }
          }
          
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      })

      // Draw organic connections between nodes
      nodesRef.current.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = nodesRef.current.find(n => n.id === connectionId)
          if (!connectedNode) return

          const distance = Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2)
          )

          if (distance < 220) {
            const opacity = (220 - distance) / 220 * (node.energy + connectedNode.energy) / 2 * currentStyle.organicIntensity
            
            // Organic curved connections
            ctx.strokeStyle = currentStyle.connectionColor + Math.floor(opacity * 200).toString(16).padStart(2, '0')
            ctx.lineWidth = 0.5 + opacity * 1.2
            ctx.shadowColor = currentStyle.glowColor
            ctx.shadowBlur = 2 + opacity * 6
            
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            
            // Organic curve with natural flow
            const controlOffset = 20 + Math.sin(time * 0.5 + node.id + connectionId) * 15
            const midX = (node.x + connectedNode.x) / 2 + controlOffset
            const midY = (node.y + connectedNode.y) / 2 + Math.cos(time * 0.5 + node.id + connectionId) * controlOffset
            
            ctx.quadraticCurveTo(midX, midY, connectedNode.x, connectedNode.y)
            ctx.stroke()
            
            // Add synaptic activity pulses
            if (opacity > 0.5 && Math.random() < 0.02) {
              const pulseT = Math.random()
              const pulseX = node.x + (connectedNode.x - node.x) * pulseT
              const pulseY = node.y + (connectedNode.y - node.y) * pulseT
              
              ctx.fillStyle = currentStyle.synapseColor
              ctx.shadowColor = currentStyle.synapseColor
              ctx.shadowBlur = 8
              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 2 + Math.random() * 2, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        })
      })

      // Draw organic neural nodes with dendrites
      nodesRef.current.forEach(node => {
        const baseSize = node.organicRadius * (0.3 + node.energy * 0.7)
        const glowSize = baseSize * 2.5

        // Draw dendrites (branching structures)
        node.dendrites.forEach(dendrite => {
          const dendriteOpacity = node.energy * 0.6
          ctx.strokeStyle = currentStyle.connectionColor + Math.floor(dendriteOpacity * 150).toString(16).padStart(2, '0')
          ctx.lineWidth = 1 + node.energy
          ctx.shadowColor = currentStyle.glowColor
          ctx.shadowBlur = 3
          
          // Main dendrite
          const endX = node.x + Math.cos(dendrite.angle + time * 0.1) * dendrite.length
          const endY = node.y + Math.sin(dendrite.angle + time * 0.1) * dendrite.length
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(endX, endY)
          ctx.stroke()
          
          // Dendrite branches
          dendrite.branches.forEach(branch => {
            const branchStartX = node.x + Math.cos(dendrite.angle + time * 0.1) * dendrite.length * 0.7
            const branchStartY = node.y + Math.sin(dendrite.angle + time * 0.1) * dendrite.length * 0.7
            const branchEndX = branchStartX + Math.cos(branch.angle + time * 0.05) * branch.length
            const branchEndY = branchStartY + Math.sin(branch.angle + time * 0.05) * branch.length
            
            ctx.beginPath()
            ctx.moveTo(branchStartX, branchStartY)
            ctx.lineTo(branchEndX, branchEndY)
            ctx.stroke()
          })
        })

        // Outer organic glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize)
        gradient.addColorStop(0, currentStyle.glowColor + '40')
        gradient.addColorStop(0.7, currentStyle.glowColor + '20')
        gradient.addColorStop(1, currentStyle.glowColor + '00')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Neural soma (cell body)
        ctx.fillStyle = currentStyle.nodeColor
        ctx.shadowColor = currentStyle.glowColor
        ctx.shadowBlur = 4 + node.energy * 4
        ctx.beginPath()
        ctx.arc(node.x, node.y, baseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Neural nucleus
        ctx.fillStyle = currentStyle.synapseColor + '80'
        ctx.shadowBlur = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, baseSize * 0.4, 0, Math.PI * 2)
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
  }, [mousePosition, currentStyle, electricShocks, organicParticles])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Organic background gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: currentStyle.background }}
      />
      
      {/* Canvas with organic neural network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ 
          opacity: 0.5,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Artistic fade zones for content visibility */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top artistic fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        
        {/* Bottom artistic fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Left artistic fade */}
        <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        
        {/* Right artistic fade */}
        <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-black/50 via-black/25 to-transparent" />
        
        {/* Center content enhancement */}
        <div className="absolute top-1/5 left-1/5 right-1/5 bottom-1/5 bg-gradient-radial from-transparent via-black/20 to-transparent rounded-2xl" />
      </div>
    </div>
  )
}
