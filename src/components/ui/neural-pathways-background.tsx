import { useEffect, useRef } from 'react'

interface NeuralNode {
  x: number
  y: number
  connections: number[]
  pulseIntensity: number
  pulsePhase: number
}

export function NeuralPathwaysBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Generate neural network nodes
    const nodes: NeuralNode[] = []
    const nodeCount = 80
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulseIntensity: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          )
          if (distance < 150 && node.connections.length < 4) {
            node.connections.push(j)
          }
        }
      })
    })

    let time = 0

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Draw connections (neural pathways)
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes[connectionIndex]
          
          // Calculate pulse along the connection
          const pulsePosition = (Math.sin(time * 2 + node.pulsePhase) + 1) / 2
          const connectionStrength = (node.pulseIntensity + connectedNode.pulseIntensity) / 2
          
          // Draw pathway
          const gradient = ctx.createLinearGradient(
            node.x, node.y,
            connectedNode.x, connectedNode.y
          )
          
          gradient.addColorStop(0, `rgba(34, 197, 94, ${connectionStrength * 0.3})`)
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${connectionStrength * 0.6})`)
          gradient.addColorStop(1, `rgba(168, 85, 247, ${connectionStrength * 0.3})`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1 + connectionStrength * 2
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connectedNode.x, connectedNode.y)
          ctx.stroke()

          // Draw pulse traveling along pathway
          const pulseX = node.x + (connectedNode.x - node.x) * pulsePosition
          const pulseY = node.y + (connectedNode.y - node.y) * pulsePosition
          
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 255, ${connectionStrength})`
          ctx.fill()
        })
      })

      // Draw nodes (neurons)
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.5 + 0.5
        const nodeSize = 2 + pulse * 4
        
        // Neuron body
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2)
        
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, nodeSize * 2
        )
        nodeGradient.addColorStop(0, `rgba(34, 197, 94, ${node.pulseIntensity})`)
        nodeGradient.addColorStop(0.5, `rgba(59, 130, 246, ${node.pulseIntensity * 0.7})`)
        nodeGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = nodeGradient
        ctx.fill()

        // Neuron core
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`
        ctx.fill()

        // Update node position (slight drift)
        node.x += (Math.sin(time + i) * 0.2)
        node.y += (Math.cos(time + i * 0.7) * 0.2)
        
        // Keep nodes within bounds
        if (node.x < 0 || node.x > canvas.width) node.x = Math.random() * canvas.width
        if (node.y < 0 || node.y > canvas.height) node.y = Math.random() * canvas.height
      })

      // Matrix-style falling characters
      const matrix = 'GAiA01ハーチャクモニー'
      ctx.fillStyle = 'rgba(0, 255, 65, 0.1)'
      ctx.font = '14px monospace'
      
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const char = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(char, x, y)
      }

      // Draw logo decorations at strategic positions
      const logoPositions = [
        { x: canvas.width * 0.1, y: canvas.height * 0.1 },
        { x: canvas.width * 0.9, y: canvas.height * 0.1 },
        { x: canvas.width * 0.1, y: canvas.height * 0.9 },
        { x: canvas.width * 0.9, y: canvas.height * 0.9 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5 }
      ]

      logoPositions.forEach((pos, index) => {
        const logoAlpha = Math.sin(time + index) * 0.02 + 0.03
        ctx.globalAlpha = logoAlpha
        
        // Create a simple representation of the logo (since we can't load images in canvas easily)
        ctx.fillStyle = `rgba(64, 224, 208, ${logoAlpha})`
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', updateSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,20,40,0.9) 0%, rgba(0,0,0,0.95) 100%)'
      }}
    />
  )
}
