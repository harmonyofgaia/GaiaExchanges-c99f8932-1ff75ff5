import { useEffect, useRef } from 'react'

interface NeuroBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
  className?: string
}

export function NeuroBackground({ 
  intensity = 'medium', 
  color = '#ff00ff', 
  speed = 1,
  className = ''
}: NeuroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

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

    // Neural network parameters
    const nodeCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100
    const nodes = []
    const connections = []
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 3 + Math.random() * 5,
        activity: Math.random(),
        activitySpeed: 0.01 + Math.random() * 0.02,
        pulse: 0
      })
    }
    
    // Create a quadtree for spatial partitioning
    class Quadtree {
      constructor(boundary, capacity) {
        this.boundary = boundary
        this.capacity = capacity
        this.points = []
        this.divided = false
      }
      insert(point) { /* Implementation of quadtree insertion */ }
      query(range, found) { /* Implementation of quadtree range query */ }
      subdivide() { /* Implementation of quadtree subdivision */ }
    }

    const quadtree = new Quadtree(
      { x: 0, y: 0, width: canvas.width, height: canvas.height },
      4
    )
    nodes.forEach((node, index) => quadtree.insert({ ...node, index }))

    // Create connections using quadtree
    nodes.forEach((node, i) => {
      const range = { x: node.x - 150, y: node.y - 150, width: 300, height: 300 }
      const nearbyNodes = quadtree.query(range, [])
      nearbyNodes.forEach((other) => {
        if (other.index !== i) {
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150 && Math.random() > 0.7) {
            connections.push({
              from: i,
              to: other.index,
              strength: Math.random(),
              pulse: 0,
              pulseSpeed: 0.05 + Math.random() * 0.1
            })
          }
        }
      })
    })
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dark neural background
      const bgGradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)/2
      )
      bgGradient.addColorStop(0, 'rgba(5, 0, 15, 0.9)')
      bgGradient.addColorStop(0.5, 'rgba(10, 0, 30, 0.8)')
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)')
      
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from]
        const toNode = nodes[connection.to]
        
        // Update pulse
        connection.pulse += connection.pulseSpeed * speed
        if (connection.pulse > 1) connection.pulse = 0
        
        // Calculate pulse position
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulse
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulse
        
        // Draw connection line
        const opacity = connection.strength * 0.3
        ctx.strokeStyle = `rgba(255, 0, 255, ${opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
        
        // Draw pulse
        if (connection.pulse > 0.1 && connection.pulse < 0.9) {
          const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 10)
          pulseGradient.addColorStop(0, `rgba(255, 100, 255, 0.8)`)
          pulseGradient.addColorStop(1, 'rgba(255, 100, 255, 0)')
          
          ctx.fillStyle = pulseGradient
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx * speed
        node.y += node.vy * speed
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        
        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
        
        // Update activity
        node.activity += node.activitySpeed * speed
        node.pulse = Math.sin(node.activity) * 0.5 + 0.5
        
        // Draw node
        const nodeOpacity = 0.3 + node.pulse * 0.5
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        )
        nodeGradient.addColorStop(0, `rgba(255, 50, 255, ${nodeOpacity})`)
        nodeGradient.addColorStop(0.5, `rgba(200, 0, 200, ${nodeOpacity * 0.7})`)
        nodeGradient.addColorStop(1, 'rgba(100, 0, 100, 0)')
        
        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + node.pulse * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw core
        ctx.fillStyle = `rgba(255, 150, 255, ${nodeOpacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add brain wave effect
      ctx.strokeStyle = `rgba(255, 0, 255, 0.1)`
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height/2 + 
                   Math.sin(x * 0.01 + time + i) * 50 +
                   Math.sin(x * 0.005 + time * 2 + i) * 30
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      time += 0.02 * speed
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity, color, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}