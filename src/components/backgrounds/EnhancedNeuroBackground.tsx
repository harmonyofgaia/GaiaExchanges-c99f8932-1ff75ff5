import { useEffect, useRef } from 'react'

interface EnhancedNeuroBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
  className?: string
  pattern?: 'default' | 'creative' | 'abstract' | 'organic' | 'geometric'
  neuralDensity?: number
}

export function EnhancedNeuroBackground({ 
  intensity = 'medium', 
  color = '#4fc3f7', 
  speed = 1,
  className = '',
  pattern = 'creative',
  neuralDensity = 60
}: EnhancedNeuroBackgroundProps) {
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

    // Enhanced neural network parameters based on pattern
    const nodeCount = Math.floor((intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100) * (neuralDensity / 100))
    const nodes: unknown[] = []
    const connections: unknown[] = []
    const particles: unknown[] = []
    
    // Helper function to convert hex to RGB
    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 79, g: 195, b: 247 }
    }

    // Helper function to create pattern-specific nodes
    function createPatternNode(index: number, total: number, canvas: HTMLCanvasElement, pattern: string) {
      let node: unknown
      
      switch (pattern) {
        case 'creative':
          node = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 3 * speed,
            vy: (Math.random() - 0.5) * 3 * speed,
            radius: 2 + Math.random() * 8,
            activity: Math.random(),
            activitySpeed: 0.008 + Math.random() * 0.025,
            pulse: 0,
            type: Math.floor(Math.random() * 4), // Different node types
            resonance: Math.random() * Math.PI * 2,
            harmonic: 1 + Math.random() * 3
          }
          break
          
        case 'abstract':
          const angle = (index / total) * Math.PI * 2 + Math.random() * 0.5
          const radius = 100 + Math.random() * 200
          node = {
            x: canvas.width/2 + Math.cos(angle) * radius + Math.random() * 100,
            y: canvas.height/2 + Math.sin(angle) * radius + Math.random() * 100,
            vx: Math.cos(angle + Math.PI/2) * speed,
            vy: Math.sin(angle + Math.PI/2) * speed,
            radius: 3 + Math.random() * 6,
            activity: Math.random(),
            activitySpeed: 0.01 + Math.random() * 0.02,
            pulse: 0,
            morphing: true,
            morphSpeed: 0.005 + Math.random() * 0.01
          }
          break
          
        case 'organic':
          node = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2 * speed,
            vy: (Math.random() - 0.5) * 2 * speed,
            radius: 4 + Math.random() * 7,
            activity: Math.random(),
            activitySpeed: 0.005 + Math.random() * 0.015,
            pulse: 0,
            organic: true,
            flowField: { x: Math.random() * Math.PI * 2, y: Math.random() * Math.PI * 2 },
            breathing: Math.random() * Math.PI * 2
          }
          break
          
        case 'geometric':
          const gridSize = Math.sqrt(total)
          const cellWidth = canvas.width / gridSize
          const cellHeight = canvas.height / gridSize
          const gridX = (index % gridSize) * cellWidth + cellWidth/2
          const gridY = Math.floor(index / gridSize) * cellHeight + cellHeight/2
          
          node = {
            x: gridX + (Math.random() - 0.5) * 50,
            y: gridY + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            radius: 3 + Math.random() * 5,
            activity: Math.random(),
            activitySpeed: 0.01 + Math.random() * 0.02,
            pulse: 0,
            geometric: true,
            sides: 3 + Math.floor(Math.random() * 5)
          }
          break
          
        default: // 'default'
          node = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2 * speed,
            vy: (Math.random() - 0.5) * 2 * speed,
            radius: 3 + Math.random() * 5,
            activity: Math.random(),
            activitySpeed: 0.01 + Math.random() * 0.02,
            pulse: 0
          }
      }
      
      return node
    }

    // Create enhanced nodes with pattern-specific properties
    for (let i = 0; i < nodeCount; i++) {
      const node = createPatternNode(i, nodeCount, canvas, pattern)
      nodes.push(node)
    }

    // Create synaptic particles for living neural activity
    for (let i = 0; i < nodeCount * 2; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4 * speed,
        vy: (Math.random() - 0.5) * 4 * speed,
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 3
      })
    }

    // Create connections with enhanced patterns
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Pattern-specific connection logic
          let shouldConnect = false
          let connectionStrength = 0
          
          switch (pattern) {
            case 'creative':
              shouldConnect = distance < 120 && Math.random() > 0.75
              connectionStrength = Math.random() * 0.8 + 0.2
              break
            case 'abstract':
              shouldConnect = distance < 180 && Math.random() > 0.6
              connectionStrength = (1 - distance / 180) * 0.7
              break
            case 'organic':
              shouldConnect = distance < 100 && Math.random() > 0.8
              connectionStrength = Math.random() * 0.6 + 0.4
              break
            case 'geometric':
              shouldConnect = distance < 80 && Math.random() > 0.7
              connectionStrength = 0.5 + Math.random() * 0.3
              break
            default:
              shouldConnect = distance < 150 && Math.random() > 0.7
              connectionStrength = Math.random() * 0.5 + 0.3
          }
          
          if (shouldConnect) {
            connections.push({
              from: i,
              to: j,
              strength: connectionStrength,
              pulse: Math.random(),
              pulseSpeed: 0.02 + Math.random() * 0.08,
              distance: distance,
              pattern: pattern
            })
          }
        }
      })
    })

    let time = 0

    // Helper function to create pattern-specific backgrounds
    function createPatternBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, pattern: string, time: number, color: string) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.max(canvas.width, canvas.height) / 2
      
      let gradient
      
      switch (pattern) {
        case 'creative':
          gradient = ctx.createRadialGradient(
            centerX + Math.sin(time) * 50, 
            centerY + Math.cos(time) * 50, 0,
            centerX, centerY, maxRadius
          )
          gradient.addColorStop(0, 'rgba(20, 0, 40, 0.9)')
          gradient.addColorStop(0.3, 'rgba(40, 0, 80, 0.8)')
          gradient.addColorStop(0.7, 'rgba(10, 0, 30, 0.85)')
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)')
          break
          
        case 'abstract':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, `rgba(${Math.sin(time) * 20 + 10}, 0, ${Math.cos(time) * 30 + 20}, 0.9)`)
          gradient.addColorStop(0.5, 'rgba(5, 0, 15, 0.8)')
          gradient.addColorStop(1, `rgba(0, ${Math.sin(time + 1) * 10 + 5}, ${Math.cos(time + 1) * 20 + 10}, 0.95)`)
          break
          
        case 'organic':
          gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius)
          gradient.addColorStop(0, 'rgba(0, 20, 10, 0.9)')
          gradient.addColorStop(0.4, 'rgba(0, 40, 20, 0.8)')
          gradient.addColorStop(0.8, 'rgba(0, 15, 5, 0.85)')
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)')
          break
          
        case 'geometric':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
          gradient.addColorStop(0, 'rgba(30, 30, 30, 0.9)')
          gradient.addColorStop(0.5, 'rgba(10, 10, 10, 0.8)')
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)')
          break
          
        default:
          gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius)
          gradient.addColorStop(0, 'rgba(5, 0, 15, 0.9)')
          gradient.addColorStop(0.5, 'rgba(10, 0, 30, 0.8)')
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)')
      }
      
      return gradient
    }

    // Helper function to update pattern-specific nodes
    function updatePatternNode(node: unknown, pattern: string, time: number, speed: number, canvas: HTMLCanvasElement) {
      switch (pattern) {
        case 'creative':
          // Creative resonance behavior
          node.resonance += 0.05 * speed
          node.vx += Math.sin(node.resonance * node.harmonic) * 0.1
          node.vy += Math.cos(node.resonance * node.harmonic) * 0.1
          break
          
        case 'abstract':
          // Abstract morphing behavior
          if (node.morphing) {
            node.vx *= 0.99
            node.vy *= 0.99
            node.vx += (Math.random() - 0.5) * 0.2
            node.vy += (Math.random() - 0.5) * 0.2
          }
          break
          
        case 'organic':
          // Organic flow field behavior
          node.flowField.x += 0.02 * speed
          node.flowField.y += 0.015 * speed
          node.breathing += 0.03 * speed
          
          node.vx += Math.sin(node.flowField.x) * 0.15
          node.vy += Math.cos(node.flowField.y) * 0.15
          node.radius = (node.radius * 0.9) + (4 + Math.sin(node.breathing) * 3) * 0.1
          break
          
        case 'geometric':
          // Geometric precision movement
          node.vx *= 0.95
          node.vy *= 0.95
          break
      }
      
      // Update position
      node.x += node.vx * speed
      node.y += node.vy * speed
      
      // Boundary behavior
      if (pattern === 'organic') {
        // Organic boundaries - gentle wrapping
        if (node.x < -50) node.x = canvas.width + 50
        if (node.x > canvas.width + 50) node.x = -50
        if (node.y < -50) node.y = canvas.height + 50
        if (node.y > canvas.height + 50) node.y = -50
      } else {
        // Standard boundaries - bouncing
        if (node.x < 0 || node.x > canvas.width) node.vx *= -0.8
        if (node.y < 0 || node.y > canvas.height) node.vy *= -0.8
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      }
    }

    // Helper function to draw pattern-specific connections
    function drawPatternConnection(ctx: CanvasRenderingContext2D, fromNode: unknown, toNode: unknown, connection: unknown, pattern: string, time: number, color: string) {
      const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulse
      const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulse
      
      // Base color extraction
      const colorValues = hexToRgb(color)
      
      switch (pattern) {
        case 'creative':
          // Creative multi-colored connections
          const creativePulse = Math.sin(time * 3 + connection.pulse * Math.PI * 2)
          const creativeOpacity = connection.strength * 0.4 * (0.5 + creativePulse * 0.5)
          
          ctx.strokeStyle = `rgba(${colorValues.r + creativePulse * 50}, ${colorValues.g + creativePulse * 30}, ${colorValues.b}, ${creativeOpacity})`
          ctx.lineWidth = 1 + Math.abs(creativePulse) * 2
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
          
          // Creative pulse effect
          if (connection.pulse > 0.1 && connection.pulse < 0.9) {
            const pulseSize = 5 + Math.abs(creativePulse) * 10
            const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, pulseSize)
            pulseGradient.addColorStop(0, `rgba(${colorValues.r}, ${colorValues.g + 100}, ${colorValues.b}, 0.9)`)
            pulseGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g + 100}, ${colorValues.b}, 0)`)
            
            ctx.fillStyle = pulseGradient
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2)
            ctx.fill()
          }
          break
          
        case 'abstract':
          // Abstract flowing connections
          const abstractWave = Math.sin(time * 2 + connection.distance * 0.01)
          const abstractOpacity = connection.strength * 0.3 * (0.7 + abstractWave * 0.3)
          
          ctx.strokeStyle = `rgba(${colorValues.r}, ${colorValues.g + abstractWave * 80}, ${colorValues.b + abstractWave * 50}, ${abstractOpacity})`
          ctx.lineWidth = 1
          
          // Wavy connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          
          const midX = (fromNode.x + toNode.x) / 2 + Math.sin(time * 3) * 20
          const midY = (fromNode.y + toNode.y) / 2 + Math.cos(time * 3) * 20
          
          ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y)
          ctx.stroke()
          break
          
        case 'organic':
          // Organic flowing connections
          const organicFlow = Math.sin(time + connection.distance * 0.02)
          const organicOpacity = connection.strength * 0.5 * (0.6 + organicFlow * 0.4)
          
          ctx.strokeStyle = `rgba(${Math.floor(colorValues.r * 0.7)}, ${colorValues.g + 50}, ${Math.floor(colorValues.b * 0.8)}, ${organicOpacity})`
          ctx.lineWidth = 2 + Math.abs(organicFlow)
          
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
          
          // Organic pulse particles
          if (connection.pulse > 0.2 && connection.pulse < 0.8) {
            ctx.fillStyle = `rgba(${colorValues.r}, 255, ${colorValues.b}, 0.6)`
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 3 + organicFlow * 2, 0, Math.PI * 2)
            ctx.fill()
          }
          break
          
        case 'geometric':
          // Geometric precise connections
          const geometricOpacity = connection.strength * 0.4
          
          ctx.strokeStyle = `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${geometricOpacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
          
          // Geometric pulse squares
          if (connection.pulse > 0.1 && connection.pulse < 0.9) {
            ctx.fillStyle = `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0.7)`
            ctx.fillRect(pulseX - 2, pulseY - 2, 4, 4)
          }
          break
          
        default:
          // Default connection rendering
          const opacity = connection.strength * 0.3
          ctx.strokeStyle = `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
      }
    }

    // Helper function to draw pattern-specific nodes
    function drawPatternNode(ctx: CanvasRenderingContext2D, node: unknown, pattern: string, time: number, color: string) {
      const colorValues = hexToRgb(color)
      const activityGlow = 0.5 + node.activity * 0.5
      
      switch (pattern) {
        case 'creative':
          // Creative multi-type nodes
          const creativeGlow = Math.sin(time * 2 + node.resonance) * 0.3 + 0.7
          const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2)
          
          switch (node.type) {
            case 0: // Pulsing circle
              nodeGradient.addColorStop(0, `rgba(${colorValues.r}, ${colorValues.g + 100}, ${colorValues.b}, ${activityGlow})`)
              nodeGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
              break
            case 1: // Sparkling star
              nodeGradient.addColorStop(0, `rgba(255, ${colorValues.g + 150}, 255, ${activityGlow})`)
              nodeGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
              break
            case 2: // Energy core
              nodeGradient.addColorStop(0, `rgba(${colorValues.r + 100}, 255, ${colorValues.b + 100}, ${activityGlow})`)
              nodeGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
              break
            case 3: // Harmonic resonator
              nodeGradient.addColorStop(0, `rgba(255, 255, ${colorValues.b + 150}, ${activityGlow})`)
              nodeGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
              break
          }
          
          ctx.fillStyle = nodeGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * creativeGlow, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'abstract':
          // Abstract morphing nodes
          const morphGlow = node.morphing ? Math.sin(time * 4) * 0.3 + 0.7 : 1
          const abstractGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 1.5)
          abstractGradient.addColorStop(0, `rgba(${colorValues.r + 50}, ${colorValues.g + 80}, ${colorValues.b + 50}, ${activityGlow * morphGlow})`)
          abstractGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
          
          ctx.fillStyle = abstractGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * morphGlow, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'organic':
          // Organic breathing nodes
          const breathingRadius = node.radius * (0.8 + Math.sin(node.breathing) * 0.2)
          const organicGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, breathingRadius * 1.2)
          organicGradient.addColorStop(0, `rgba(${Math.floor(colorValues.r * 0.8)}, ${colorValues.g + 80}, ${Math.floor(colorValues.b * 0.9)}, ${activityGlow})`)
          organicGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
          
          ctx.fillStyle = organicGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, breathingRadius, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'geometric':
          // Geometric shaped nodes
          const geometricGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius)
          geometricGradient.addColorStop(0, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${activityGlow})`)
          geometricGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
          
          ctx.fillStyle = geometricGradient
          ctx.beginPath()
          
          // Draw polygon based on sides
          const angleStep = (Math.PI * 2) / node.sides
          ctx.moveTo(
            node.x + Math.cos(0) * node.radius,
            node.y + Math.sin(0) * node.radius
          )
          
          for (let i = 1; i <= node.sides; i++) {
            ctx.lineTo(
              node.x + Math.cos(angleStep * i) * node.radius,
              node.y + Math.sin(angleStep * i) * node.radius
            )
          }
          
          ctx.closePath()
          ctx.fill()
          break
          
        default:
          // Default node rendering
          const defaultGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius)
          defaultGradient.addColorStop(0, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${activityGlow})`)
          defaultGradient.addColorStop(1, `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, 0)`)
          
          ctx.fillStyle = defaultGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
          ctx.fill()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01 * speed
      
      // Enhanced background with pattern-specific gradients
      const bgGradient = createPatternBackground(ctx, canvas, pattern, time, color)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update particles for living neural activity
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life += 0.01 * speed
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Reset particle when life expires
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }
        
        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update and draw enhanced connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from]
        const toNode = nodes[connection.to]
        
        // Update pulse with pattern-specific behavior
        connection.pulse += connection.pulseSpeed * speed
        if (connection.pulse > 1) connection.pulse = 0
        
        // Pattern-specific connection rendering
        drawPatternConnection(ctx, fromNode, toNode, connection, pattern, time, color)
      })

      // Update and draw enhanced nodes
      nodes.forEach((node, index) => {
        // Update node activity
        node.activity += node.activitySpeed * speed
        if (node.activity > 1) node.activity = 0
        
        // Pattern-specific node updates
        updatePatternNode(node, pattern, time, speed, canvas)
        
        // Pattern-specific node rendering
        drawPatternNode(ctx, node, pattern, time, color)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity, color, speed, pattern, neuralDensity])

  return (
    <canvas
      ref={canvasRef}
      className={`${className} fixed inset-0 -z-10`}
      style={{ 
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  )
}