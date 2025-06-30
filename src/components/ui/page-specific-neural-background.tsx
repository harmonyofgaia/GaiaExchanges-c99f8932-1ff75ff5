
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export function PageSpecificNeuralBackground() {
  const location = useLocation()
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

    // Page-specific colors based on route
    const getPageColors = (pathname: string) => {
      switch (pathname) {
        case '/gaming':
          return { primary: '#ff4500', secondary: '#ff6600', accent: '#ffff00' }
        case '/admin':
          return { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc' }
        case '/analytics':
          return { primary: '#06b6d4', secondary: '#0891b2', accent: '#0e7490' }
        case '/nfts':
          return { primary: '#ec4899', secondary: '#db2777', accent: '#be185d' }
        case '/exchange':
          return { primary: '#10b981', secondary: '#059669', accent: '#048773' }
        default:
          return { primary: '#00ff00', secondary: '#00ffff', accent: '#ff00ff' }
      }
    }

    const colors = getPageColors(location.pathname)

    // Neural network nodes
    const nodes: Array<{
      x: number
      y: number
      connections: number[]
      pulse: number
      activity: number
    }> = []

    // Create neural network structure
    const gridSize = 8
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        nodes.push({
          x: (canvas.width / gridSize) * i + (canvas.width / gridSize) / 2,
          y: (canvas.height / gridSize) * j + (canvas.height / gridSize) / 2,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          activity: Math.random()
        })
      }
    }

    // Connect neurons
    nodes.forEach((node, index) => {
      const connections = Math.floor(Math.random() * 4) + 2
      for (let i = 0; i < connections; i++) {
        const targetIndex = Math.floor(Math.random() * nodes.length)
        if (targetIndex !== index && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex)
        }
      }
    })

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update neural activity
      nodes.forEach((node) => {
        node.pulse += 0.02
        node.activity = 0.3 + Math.sin(node.pulse) * 0.3
      })

      // Draw neural connections
      nodes.forEach((node, index) => {
        node.connections.forEach((connectionIndex) => {
          const target = nodes[connectionIndex]
          if (target) {
            const activity = (node.activity + target.activity) / 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = `${colors.primary}${Math.floor(activity * 100).toString(16).padStart(2, '0')}`
            ctx.lineWidth = activity * 2
            ctx.stroke()

            // Neural impulses
            if (Math.random() < 0.01) {
              const midX = (node.x + target.x) / 2
              const midY = (node.y + target.y) / 2
              ctx.beginPath()
              ctx.arc(midX, midY, activity * 3, 0, Math.PI * 2)
              ctx.fillStyle = colors.accent
              ctx.fill()
            }
          }
        })
      })

      // Draw neural nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2 + node.activity * 3, 0, Math.PI * 2)
        ctx.fillStyle = `${colors.secondary}${Math.floor(node.activity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Neural glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8 + node.activity * 5, 0, Math.PI * 2)
        ctx.fillStyle = `${colors.primary}10`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [location.pathname])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.4 }}
    />
  )
}
