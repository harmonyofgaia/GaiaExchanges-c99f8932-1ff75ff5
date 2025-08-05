
import { useEffect, useState, useRef } from 'react'

interface NeuralNode {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  connections: number[]
  activity: number
  type: 'neuron' | 'synapse' | 'quantum' | 'matrix'
  color: string
  pulsePhase: number
}

interface MatrixCode {
  id: number
  x: number
  y: number
  characters: string[]
  speed: number
  opacity: number
  color: string
}

export function NeuralMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [matrixCodes, setMatrixCodes] = useState<MatrixCode[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [brainWavePhase, setBrainWavePhase] = useState(0)

  // Matrix characters for the digital rain effect
  const matrixChars = ['GAIA', 'HARMONY', '生命', '自然', 'LOVE', 'PEACE', '🌍', '🌱', '💚', '🎵', '∞', '☯', '✨', '🔮']
  const binaryChars = ['0', '1', '∞', '◊', '◈', '◇', '♦', '♢']

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize neural network
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // Create neural nodes
      const newNodes: NeuralNode[] = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        connections: [],
        activity: Math.random(),
        type: ['neuron', 'synapse', 'quantum', 'matrix'][Math.floor(Math.random() * 4)] as NeuralNode['type'],
        color: ['#22c55e', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 5)],
        pulsePhase: Math.random() * Math.PI * 2
      }))

      // Create connections between nearby nodes
      newNodes.forEach((node, i) => {
        const nearbyNodes = newNodes.filter((other, j) => {
          if (i === j) return false
          const distance = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2)
          return distance < 150
        })
        node.connections = nearbyNodes.slice(0, 3).map(n => n.id)
      })

      setNodes(newNodes)

      // Create matrix code streams
      const newMatrixCodes: MatrixCode[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height - 200,
        characters: Array.from({ length: 10 }, () => 
          Math.random() > 0.7 ? 
          matrixChars[Math.floor(Math.random() * matrixChars.length)] :
          binaryChars[Math.floor(Math.random() * binaryChars.length)]
        ),
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: ['#22c55e', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)]
      }))

      setMatrixCodes(newMatrixCodes)
    }
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let time = 0

    const animate = () => {
      // Clear with neural fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.016
      setBrainWavePhase(prev => prev + 0.02)

      // Draw brain wave patterns
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height * 0.3 + 
                 Math.sin(x * 0.01 + time * 2) * 30 +
                 Math.sin(x * 0.005 + time * 1.5) * 50 +
                 Math.cos(x * 0.008 + time) * 20
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Second brain wave
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)'
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height * 0.7 + 
                 Math.sin(x * 0.012 + time * 1.8) * 40 +
                 Math.cos(x * 0.007 + time * 2.2) * 25
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Update and draw matrix code rain
      setMatrixCodes(currentCodes => {
        return currentCodes.map(code => {
          code.y += code.speed
          if (code.y > canvas.height + 100) {
            code.y = -100
            code.x = Math.random() * canvas.width
          }

          // Draw matrix characters
          ctx.font = '14px monospace'
          code.characters.forEach((char, i) => {
            const charY = code.y + i * 20
            const alpha = Math.max(0, code.opacity - (i * 0.1))
            ctx.fillStyle = code.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
            
            // Add shimmer effect
            const shimmer = Math.sin(time * 3 + i) * 0.3 + 0.7
            ctx.shadowColor = code.color
            ctx.shadowBlur = shimmer * 10
            
            ctx.fillText(char, code.x, charY)
          })

          return code
        })
      })

      // Update and draw neural network
      setNodes(currentNodes => {
        return currentNodes.map(node => {
          // Update neural activity
          node.activity = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5
          node.pulsePhase += 0.01

          // Slight movement for organic feel
          node.x += node.vx + Math.sin(time * 0.5 + node.id) * 0.1
          node.y += node.vy + Math.cos(time * 0.7 + node.id) * 0.1

          // Boundary wrapping
          if (node.x < 0) node.x = canvas.width
          if (node.x > canvas.width) node.x = 0
          if (node.y < 0) node.y = canvas.height
          if (node.y > canvas.height) node.y = 0

          // Draw neural connections with activity-based intensity
          node.connections.forEach(connectionId => {
            const connectedNode = currentNodes[connectionId]
            if (connectedNode) {
              const activityLevel = (node.activity + connectedNode.activity) / 2
              ctx.strokeStyle = `${node.color}${Math.floor(activityLevel * 100).toString(16).padStart(2, '0')}`
              ctx.lineWidth = activityLevel * 2
              
              // Neural pulse effect
              const pulseOffset = Math.sin(time * 4 + node.id) * 5
              ctx.setLineDash([5, 10])
              ctx.lineDashOffset = pulseOffset
              
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(connectedNode.x, connectedNode.y)
              ctx.stroke()
              ctx.setLineDash([])
            }
          })

          // Draw neural node
          ctx.save()
          
          const nodeSize = node.size * (1 + node.activity * 0.5)
          const alpha = 0.3 + node.activity * 0.7
          
          // Glow effect
          ctx.shadowColor = node.color
          ctx.shadowBlur = nodeSize * 4 * node.activity
          
          switch (node.type) {
            case 'neuron':
              // Main neuron body
              ctx.fillStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
              ctx.beginPath()
              ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2)
              ctx.fill()
              
              // Neural dendrites
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6 + time * 0.5
                const length = nodeSize * 2 * node.activity
                ctx.strokeStyle = node.color + '40'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(
                  node.x + Math.cos(angle) * length,
                  node.y + Math.sin(angle) * length
                )
                ctx.stroke()
              }
              break

            case 'synapse':
              // Synaptic gap visualization
              ctx.strokeStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
              ctx.lineWidth = 3
              ctx.beginPath()
              for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8
                const innerRadius = nodeSize * 0.5
                const outerRadius = nodeSize * 1.5
                ctx.moveTo(
                  node.x + Math.cos(angle) * innerRadius,
                  node.y + Math.sin(angle) * innerRadius
                )
                ctx.lineTo(
                  node.x + Math.cos(angle) * outerRadius,
                  node.y + Math.sin(angle) * outerRadius
                )
              }
              ctx.stroke()
              break

            case 'quantum':
              // Quantum entanglement visualization
              ctx.strokeStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
              ctx.lineWidth = 2
              for (let ring = 1; ring <= 3; ring++) {
                const radius = nodeSize * ring * (0.5 + node.activity * 0.5)
                const segments = 12
                ctx.beginPath()
                for (let i = 0; i < segments; i++) {
                  const angle1 = (i * Math.PI * 2) / segments + time * ring
                  const angle2 = ((i + 1) * Math.PI * 2) / segments + time * ring
                  if (i % 2 === 0) {
                    ctx.moveTo(
                      node.x + Math.cos(angle1) * radius,
                      node.y + Math.sin(angle1) * radius
                    )
                    ctx.lineTo(
                      node.x + Math.cos(angle2) * radius,
                      node.y + Math.sin(angle2) * radius
                    )
                  }
                }
                ctx.stroke()
              }
              break

            case 'matrix':
              // Matrix-style digital node
              ctx.fillStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
              ctx.fillRect(node.x - nodeSize, node.y - nodeSize, nodeSize * 2, nodeSize * 2)
              
              // Digital glitch effect
              if (Math.random() > 0.95) {
                ctx.fillStyle = '#ffffff80'
                ctx.fillRect(
                  node.x - nodeSize * 1.2, 
                  node.y - nodeSize * 0.2, 
                  nodeSize * 2.4, 
                  nodeSize * 0.4
                )
              }
              break
          }
          
          ctx.restore()
          return node
        })
      })

      // Draw brain hemisphere connections
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.05)'
      ctx.lineWidth = 3
      for (let i = 0; i < 5; i++) {
        const y = canvas.height * 0.2 + i * (canvas.height * 0.6) / 5
        const curve = Math.sin(time + i) * 50
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.2, y)
        ctx.bezierCurveTo(
          canvas.width * 0.4, y + curve,
          canvas.width * 0.6, y - curve,
          canvas.width * 0.8, y
        )
        ctx.stroke()
      }

      // Neural text overlay
      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)'
      const neuralTerms = ['CONSCIOUSNESS', 'NEURAL PATHWAYS', 'SYNAPTIC FIRING', 'QUANTUM COGNITION', 'BRAIN WAVES']
      neuralTerms.forEach((term, i) => {
        const x = 20 + (i % 3) * (canvas.width / 3)
        const y = 20 + Math.floor(i / 3) * 20
        const flicker = Math.sin(time * 2 + i) * 0.3 + 0.7
        ctx.fillStyle = `rgba(34, 197, 94, ${flicker * 0.3})`
        ctx.fillText(term, x, y)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes, matrixCodes, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)',
        mixBlendMode: 'screen'
      }}
    />
  )
}
