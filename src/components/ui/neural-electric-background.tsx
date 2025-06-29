
import { useEffect, useRef, useState } from 'react'

interface NeuralNode {
  x: number
  y: number
  connections: number[]
  energy: number
  pulsePhase: number
  targetX: number
  targetY: number
  speed: number
}

interface ElectricShock {
  x: number
  y: number
  intensity: number
  duration: number
  branches: { x: number; y: number; length: number; angle: number }[]
}

interface MouseParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
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
  const animationRef = useRef<number>(0)
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [shocks, setShocks] = useState<ElectricShock[]>([])
  const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mouseInfluenceRadius] = useState(150)

  const getStyleColors = (style: string) => {
    switch (style) {
      case 'plasma': return {
        primary: 'rgba(147, 51, 234, 0.6)',
        secondary: 'rgba(236, 72, 153, 0.4)',
        accent: 'rgba(59, 130, 246, 0.3)',
        shock: 'rgba(236, 72, 153, 1)'
      }
      case 'galaxy': return {
        primary: 'rgba(139, 92, 246, 0.6)',
        secondary: 'rgba(59, 130, 246, 0.4)',
        accent: 'rgba(16, 185, 129, 0.3)',
        shock: 'rgba(139, 92, 246, 1)'
      }
      case 'forest': return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(16, 185, 129, 0.4)',
        accent: 'rgba(132, 204, 22, 0.3)',
        shock: 'rgba(34, 197, 94, 1)'
      }
      case 'ocean': return {
        primary: 'rgba(59, 130, 246, 0.6)',
        secondary: 'rgba(14, 165, 233, 0.4)',
        accent: 'rgba(6, 182, 212, 0.3)',
        shock: 'rgba(14, 165, 233, 1)'
      }
      case 'fire': return {
        primary: 'rgba(239, 68, 68, 0.6)',
        secondary: 'rgba(245, 101, 101, 0.4)',
        accent: 'rgba(251, 146, 60, 0.3)',
        shock: 'rgba(255, 255, 100, 1)'
      }
      case 'ice': return {
        primary: 'rgba(147, 197, 253, 0.6)',
        secondary: 'rgba(186, 230, 253, 0.4)',
        accent: 'rgba(219, 234, 254, 0.3)',
        shock: 'rgba(147, 197, 253, 1)'
      }
      case 'void': return {
        primary: 'rgba(75, 85, 99, 0.6)',
        secondary: 'rgba(107, 114, 128, 0.4)',
        accent: 'rgba(156, 163, 175, 0.3)',
        shock: 'rgba(156, 163, 175, 1)'
      }
      case 'rainbow': return {
        primary: 'rgba(168, 85, 247, 0.6)',
        secondary: 'rgba(236, 72, 153, 0.4)',
        accent: 'rgba(59, 130, 246, 0.3)',
        shock: 'rgba(255, 255, 255, 1)'
      }
      case 'matrix': return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(16, 185, 129, 0.4)',
        accent: 'rgba(5, 150, 105, 0.3)',
        shock: 'rgba(0, 255, 0, 1)'
      }
      default: return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(59, 130, 246, 0.4)',
        accent: 'rgba(147, 51, 234, 0.3)',
        shock: 'rgba(255, 255, 100, 1)'
      }
    }
  }

  const getIntensityMultiplier = (intensity: string) => {
    switch (intensity) {
      case 'low': return 0.5
      case 'high': return 2
      default: return 1
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodeCount = Math.floor(50 * getIntensityMultiplier(intensity))
      const newNodes: NeuralNode[] = []
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        newNodes.push({
          x,
          y,
          targetX: x,
          targetY: y,
          connections: [],
          energy: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.03
        })
      }

      // Create connections
      newNodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 4) + 1
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * newNodes.length)
          if (targetIndex !== i && !node.connections.includes(targetIndex)) {
            const distance = Math.sqrt(
              Math.pow(newNodes[targetIndex].x - node.x, 2) +
              Math.pow(newNodes[targetIndex].y - node.y, 2)
            )
            if (distance < 200) {
              node.connections.push(targetIndex)
            }
          }
        }
      })

      setNodes(newNodes)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      setMousePos(newMousePos)

      // Update node targets to follow mouse
      setNodes(prev => prev.map(node => {
        const distanceToMouse = Math.sqrt(
          Math.pow(newMousePos.x - node.x, 2) +
          Math.pow(newMousePos.y - node.y, 2)
        )
        
        if (distanceToMouse < mouseInfluenceRadius) {
          const influence = 1 - (distanceToMouse / mouseInfluenceRadius)
          const pullStrength = influence * 30
          const angle = Math.atan2(newMousePos.y - node.y, newMousePos.x - node.x)
          
          return {
            ...node,
            targetX: node.x + Math.cos(angle) * pullStrength * influence,
            targetY: node.y + Math.sin(angle) * pullStrength * influence
          }
        }
        
        // Return to original position when mouse is far
        return {
          ...node,
          targetX: node.x + (Math.random() - 0.5) * 2,
          targetY: node.y + (Math.random() - 0.5) * 2
        }
      }))

      // Add mouse following particles
      setMouseParticles(prev => {
        const newParticles = [...prev]
        
        if (Math.random() < 0.4) {
          newParticles.push({
            x: newMousePos.x + (Math.random() - 0.5) * 30,
            y: newMousePos.y + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 0,
            maxLife: 80
          })
        }

        return newParticles.slice(-100)
      })
    }

    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Create enhanced electric shock effect with multiple layers
      const branches = []
      const branchCount = Math.floor(Math.random() * 12) + 8
      
      for (let i = 0; i < branchCount; i++) {
        branches.push({
          x: clickX,
          y: clickY,
          length: Math.random() * 80 + 40,
          angle: (Math.PI * 2 * i) / branchCount + (Math.random() - 0.5) * 0.8
        })
      }

      // Add multiple shock effects for more dramatic effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setShocks(prev => [...prev, {
            x: clickX + (Math.random() - 0.5) * 20,
            y: clickY + (Math.random() - 0.5) * 20,
            intensity: 1 - (i * 0.3),
            duration: 25 - (i * 5),
            branches: branches.map(branch => ({
              ...branch,
              length: branch.length * (1 - i * 0.2)
            }))
          }])
        }, i * 50)
      }

      // Create shock waves affecting nearby nodes
      setNodes(prev => prev.map(node => {
        const distance = Math.sqrt(
          Math.pow(clickX - node.x, 2) +
          Math.pow(clickY - node.y, 2)
        )
        
        if (distance < 200) {
          const force = (1 - distance / 200) * 50
          const angle = Math.atan2(node.y - clickY, node.x - clickX)
          
          return {
            ...node,
            targetX: node.x + Math.cos(angle) * force,
            targetY: node.y + Math.sin(angle) * force,
            energy: Math.min(1, node.energy + 0.5)
          }
        }
        
        return node
      }))
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const colors = getStyleColors(style)
      const intensityMult = getIntensityMultiplier(intensity)

      // Update node positions (smooth following)
      setNodes(prev => prev.map(node => ({
        ...node,
        x: node.x + (node.targetX - node.x) * node.speed,
        y: node.y + (node.targetY - node.y) * node.speed,
        energy: node.energy * 0.98 // Gradually reduce energy
      })))

      // Draw neural connections with enhanced mouse interaction
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const targetNode = nodes[connectionIndex]
          if (!targetNode) return

          const pulse = Math.sin(Date.now() * 0.003 + node.pulsePhase) * 0.5 + 0.5
          const mouseDistance = Math.sqrt(
            Math.pow(mousePos.x - (node.x + targetNode.x) / 2, 2) +
            Math.pow(mousePos.y - (node.y + targetNode.y) / 2, 2)
          )
          
          const mouseInfluence = mouseDistance < mouseInfluenceRadius ? 
            (1 - mouseDistance / mouseInfluenceRadius) * 2 : 0
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = colors.primary.replace('0.6', `${0.3 + pulse * 0.4 + mouseInfluence * 0.5}`)
          ctx.lineWidth = (1 + pulse * 2 + mouseInfluence * 3) * intensityMult
          ctx.stroke()

          // Enhanced energy flow effect
          const progress = (Date.now() * 0.002) % 1
          const flowX = node.x + (targetNode.x - node.x) * progress
          const flowY = node.y + (targetNode.y - node.y) * progress
          
          ctx.beginPath()
          ctx.arc(flowX, flowY, 2 + pulse * 3 + mouseInfluence * 2, 0, Math.PI * 2)
          ctx.fillStyle = colors.secondary.replace('0.4', `${0.6 + mouseInfluence * 0.4}`)
          ctx.fill()
        })
      })

      // Draw enhanced neural nodes
      nodes.forEach(node => {
        const pulse = Math.sin(Date.now() * 0.005 + node.pulsePhase) * 0.5 + 0.5
        const mouseDistance = Math.sqrt(
          Math.pow(mousePos.x - node.x, 2) +
          Math.pow(mousePos.y - node.y, 2)
        )
        const mouseInfluence = mouseDistance < mouseInfluenceRadius ? 
          (1 - mouseDistance / mouseInfluenceRadius) : 0
        
        const nodeSize = 3 + pulse * 4 + mouseInfluence * 5 + node.energy * 3
        const glowSize = 8 + pulse * 6 + mouseInfluence * 10 + node.energy * 5
        
        // Main node
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * intensityMult, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent.replace('0.3', `${0.5 + mouseInfluence * 0.3 + node.energy * 0.2}`)
        ctx.fill()
        
        // Enhanced glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize * intensityMult, 0, Math.PI * 2)
        ctx.fillStyle = colors.primary.replace('0.6', `${0.1 + pulse * 0.2 + mouseInfluence * 0.3 + node.energy * 0.2}`)
        ctx.fill()
      })

      // Draw enhanced electric shocks
      setShocks(prev => prev.map(shock => {
        const colors = getStyleColors(style)
        
        shock.branches.forEach(branch => {
          const endX = shock.x + Math.cos(branch.angle) * branch.length
          const endY = shock.y + Math.sin(branch.angle) * branch.length
          
          ctx.beginPath()
          ctx.moveTo(shock.x, shock.y)
          
          // Create more dramatic jagged electric lines
          const segments = 8
          for (let i = 1; i <= segments; i++) {
            const progress = i / segments
            const x = shock.x + (endX - shock.x) * progress + (Math.random() - 0.5) * 15
            const y = shock.y + (endY - shock.y) * progress + (Math.random() - 0.5) * 15
            ctx.lineTo(x, y)
          }
          
          // Multiple shock layers for more dramatic effect
          ctx.strokeStyle = colors.shock.replace('1', `${shock.intensity}`)
          ctx.lineWidth = Math.random() * 4 + 2
          ctx.stroke()
          
          // Add glow effect to shocks
          ctx.strokeStyle = colors.shock.replace('1', `${shock.intensity * 0.3}`)
          ctx.lineWidth = Math.random() * 8 + 4
          ctx.stroke()
        })
        
        return {
          ...shock,
          intensity: shock.intensity * 0.85,
          duration: shock.duration - 1
        }
      }).filter(shock => shock.duration > 0))

      // Draw enhanced mouse particles
      setMouseParticles(prev => prev.map(particle => {
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Enhanced attraction to mouse
        if (distance > 5) {
          particle.vx += dx * 0.002
          particle.vy += dy * 0.002
        }
        particle.vx *= 0.95
        particle.vy *= 0.95
        
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const alpha = 1 - (particle.life / particle.maxLife)
        const size = 2 + Math.sin(particle.life * 0.1) * 1.5
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = colors.secondary.replace('0.4', `${alpha * 0.9}`)
        ctx.fill()
        
        // Add glow to particles
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent.replace('0.3', `${alpha * 0.3}`)
        ctx.fill()

        return particle
      }).filter(particle => particle.life < particle.maxLife))

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createNodes()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleMouseClick)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleMouseClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [style, intensity, mousePos, mouseInfluenceRadius])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
