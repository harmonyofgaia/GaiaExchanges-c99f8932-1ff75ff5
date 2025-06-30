
import { useEffect, useRef } from 'react'

interface NeuralElectricBackgroundProps {
  style?: 'bioelectric' | 'quantum' | 'matrix'
  intensity?: 'low' | 'medium' | 'high' | 'extreme'
}

export function NeuralElectricBackground({ 
  style = 'bioelectric', 
  intensity = 'medium' 
}: NeuralElectricBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Electric nodes and connections
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      charge: number
      pulse: number
    }> = []

    const nodeCount = intensity === 'extreme' ? 50 : intensity === 'high' ? 30 : 20

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        charge: Math.random(),
        pulse: Math.random() * Math.PI * 2
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.1

        // Boundary collision
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw electric node
        const alpha = 0.3 + Math.sin(node.pulse) * 0.2
        const size = 2 + Math.sin(node.pulse) * 1
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.fill()

        // Electric connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = otherNode.x - node.x
            const dy = otherNode.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.3
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()

              // Electric sparks
              if (Math.random() < 0.01) {
                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(otherNode.x, otherNode.y)
                ctx.strokeStyle = `rgba(255, 255, 0, ${opacity * 2})`
                ctx.lineWidth = 2
                ctx.stroke()
              }
            }
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [style, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
