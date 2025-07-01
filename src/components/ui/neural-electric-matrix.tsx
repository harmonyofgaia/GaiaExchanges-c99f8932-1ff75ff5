
import { useEffect, useRef, useState } from 'react'

interface NeuralConnection {
  id: string
  startX: number
  startY: number
  endX: number
  endY: number
  intensity: number
  color: string
  pulseSpeed: number
}

interface NeuralNode {
  id: string
  x: number
  y: number
  radius: number
  pulseIntensity: number
  color: string
  connections: string[]
}

export function NeuralElectricMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [connections, setConnections] = useState<NeuralConnection[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize neural network
    const initializeNetwork = () => {
      const newNodes: NeuralNode[] = []
      const newConnections: NeuralConnection[] = []

      // Create nodes
      for (let i = 0; i < 25; i++) {
        const node: NeuralNode = {
          id: `node-${i}`,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 4 + 2,
          pulseIntensity: Math.random() * 0.8 + 0.2,
          color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080'][Math.floor(Math.random() * 5)],
          connections: []
        }
        newNodes.push(node)
      }

      // Create connections between nearby nodes
      newNodes.forEach((node, index) => {
        newNodes.slice(index + 1).forEach((otherNode) => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          )

          if (distance < 200 && Math.random() < 0.3) {
            const connection: NeuralConnection = {
              id: `conn-${node.id}-${otherNode.id}`,
              startX: node.x,
              startY: node.y,
              endX: otherNode.x,
              endY: otherNode.y,
              intensity: Math.random() * 0.8 + 0.2,
              color: node.color,
              pulseSpeed: Math.random() * 2 + 1
            }
            newConnections.push(connection)
            node.connections.push(otherNode.id)
          }
        })
      })

      setNodes(newNodes)
      setConnections(newConnections)
    }

    initializeNetwork()

    // Animation loop
    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Draw connections with electrical pulses
      connections.forEach((connection) => {
        const pulse = Math.sin(time * connection.pulseSpeed) * 0.5 + 0.5
        const alpha = connection.intensity * pulse * 0.6

        // Main connection line
        ctx.strokeStyle = `rgba(${connection.color === '#00ffff' ? '0,255,255' : 
          connection.color === '#ff00ff' ? '255,0,255' :
          connection.color === '#ffff00' ? '255,255,0' :
          connection.color === '#00ff00' ? '0,255,0' : '255,0,128'}, ${alpha})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(connection.startX, connection.startY)
        ctx.lineTo(connection.endX, connection.endY)
        ctx.stroke()

        // Electrical spark effect
        if (pulse > 0.8) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Draw nodes with pulsing effect
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.x * 0.01) * 0.3 + 0.7
        const radius = node.radius * pulse

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3)
        gradient.addColorStop(0, `rgba(${node.color === '#00ffff' ? '0,255,255' : 
          node.color === '#ff00ff' ? '255,0,255' :
          node.color === '#ffff00' ? '255,255,0' :
          node.color === '#00ff00' ? '0,255,0' : '255,0,128'}, ${node.pulseIntensity * 0.3})`)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core node
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Electric spark at core
        if (pulse > 0.9) {
          ctx.fillStyle = 'rgba(255,255,255,0.8)'
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Mouse interaction effect
      const mouseDistance = 150
      nodes.forEach((node) => {
        const distance = Math.sqrt(
          Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2)
        )

        if (distance < mouseDistance) {
          const influence = 1 - distance / mouseDistance
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30)
          gradient.addColorStop(0, `rgba(255,255,255,${influence * 0.5})`)
          gradient.addColorStop(1, 'rgba(255,255,255,0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, 30, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
