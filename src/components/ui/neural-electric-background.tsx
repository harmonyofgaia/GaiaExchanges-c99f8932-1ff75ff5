
import { useEffect, useRef, useState } from 'react'

interface NeuralNode {
  x: number
  y: number
  connections: number[]
  energy: number
  pulsePhase: number
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

  const getStyleColors = (style: string) => {
    switch (style) {
      case 'plasma': return {
        primary: 'rgba(147, 51, 234, 0.6)',
        secondary: 'rgba(236, 72, 153, 0.4)',
        accent: 'rgba(59, 130, 246, 0.3)'
      }
      case 'galaxy': return {
        primary: 'rgba(139, 92, 246, 0.6)',
        secondary: 'rgba(59, 130, 246, 0.4)',
        accent: 'rgba(16, 185, 129, 0.3)'
      }
      case 'forest': return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(16, 185, 129, 0.4)',
        accent: 'rgba(132, 204, 22, 0.3)'
      }
      case 'ocean': return {
        primary: 'rgba(59, 130, 246, 0.6)',
        secondary: 'rgba(14, 165, 233, 0.4)',
        accent: 'rgba(6, 182, 212, 0.3)'
      }
      case 'fire': return {
        primary: 'rgba(239, 68, 68, 0.6)',
        secondary: 'rgba(245, 101, 101, 0.4)',
        accent: 'rgba(251, 146, 60, 0.3)'
      }
      case 'ice': return {
        primary: 'rgba(147, 197, 253, 0.6)',
        secondary: 'rgba(186, 230, 253, 0.4)',
        accent: 'rgba(219, 234, 254, 0.3)'
      }
      case 'void': return {
        primary: 'rgba(75, 85, 99, 0.6)',
        secondary: 'rgba(107, 114, 128, 0.4)',
        accent: 'rgba(156, 163, 175, 0.3)'
      }
      case 'rainbow': return {
        primary: 'rgba(168, 85, 247, 0.6)',
        secondary: 'rgba(236, 72, 153, 0.4)',
        accent: 'rgba(59, 130, 246, 0.3)'
      }
      case 'matrix': return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(16, 185, 129, 0.4)',
        accent: 'rgba(5, 150, 105, 0.3)'
      }
      default: return {
        primary: 'rgba(34, 197, 94, 0.6)',
        secondary: 'rgba(59, 130, 246, 0.4)',
        accent: 'rgba(147, 51, 234, 0.3)'
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
        newNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          connections: [],
          energy: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2
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

      // Add mouse following particles
      setMouseParticles(prev => {
        const newParticles = [...prev]
        
        // Add new particle
        if (Math.random() < 0.3) {
          newParticles.push({
            x: newMousePos.x + (Math.random() - 0.5) * 20,
            y: newMousePos.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: 60
          })
        }

        return newParticles.slice(-50) // Keep only recent particles
      })
    }

    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Create electric shock effect
      const branches = []
      const branchCount = Math.floor(Math.random() * 8) + 4
      
      for (let i = 0; i < branchCount; i++) {
        branches.push({
          x: clickX,
          y: clickY,
          length: Math.random() * 50 + 20,
          angle: (Math.PI * 2 * i) / branchCount + (Math.random() - 0.5) * 0.5
        })
      }

      setShocks(prev => [...prev, {
        x: clickX,
        y: clickY,
        intensity: 1,
        duration: 30,
        branches
      }])
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const colors = getStyleColors(style)
      const intensityMult = getIntensityMultiplier(intensity)

      // Draw neural connections
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const targetNode = nodes[connectionIndex]
          if (!targetNode) return

          const pulse = Math.sin(Date.now() * 0.003 + node.pulsePhase) * 0.5 + 0.5
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = colors.primary.replace('0.6', `${0.3 + pulse * 0.4}`)
          ctx.lineWidth = 1 + pulse * 2 * intensityMult
          ctx.stroke()

          // Add energy flow effect
          const progress = (Date.now() * 0.002) % 1
          const flowX = node.x + (targetNode.x - node.x) * progress
          const flowY = node.y + (targetNode.y - node.y) * progress
          
          ctx.beginPath()
          ctx.arc(flowX, flowY, 2 + pulse * 3, 0, Math.PI * 2)
          ctx.fillStyle = colors.secondary
          ctx.fill()
        })
      })

      // Draw neural nodes
      nodes.forEach(node => {
        const pulse = Math.sin(Date.now() * 0.005 + node.pulsePhase) * 0.5 + 0.5
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3 + pulse * 4 * intensityMult, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent
        ctx.fill()
        
        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8 + pulse * 6 * intensityMult, 0, Math.PI * 2)
        ctx.fillStyle = colors.primary.replace('0.6', `${0.1 + pulse * 0.2}`)
        ctx.fill()
      })

      // Draw electric shocks
      setShocks(prev => prev.map(shock => {
        shock.branches.forEach(branch => {
          const endX = shock.x + Math.cos(branch.angle) * branch.length
          const endY = shock.y + Math.sin(branch.angle) * branch.length
          
          ctx.beginPath()
          ctx.moveTo(shock.x, shock.y)
          
          // Create jagged electric line
          const segments = 5
          for (let i = 1; i <= segments; i++) {
            const progress = i / segments
            const x = shock.x + (endX - shock.x) * progress + (Math.random() - 0.5) * 10
            const y = shock.y + (endY - shock.y) * progress + (Math.random() - 0.5) * 10
            ctx.lineTo(x, y)
          }
          
          ctx.strokeStyle = `rgba(255, 255, 100, ${shock.intensity})`
          ctx.lineWidth = Math.random() * 3 + 1
          ctx.stroke()
        })
        
        return {
          ...shock,
          intensity: shock.intensity * 0.9,
          duration: shock.duration - 1
        }
      }).filter(shock => shock.duration > 0))

      // Draw mouse particles
      setMouseParticles(prev => prev.map(particle => {
        // Move towards mouse with some delay
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        particle.vx += dx * 0.001
        particle.vy += dy * 0.001
        particle.vx *= 0.98
        particle.vy *= 0.98
        
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2 + Math.sin(particle.life * 0.1) * 1, 0, Math.PI * 2)
        ctx.fillStyle = colors.secondary.replace('0.4', `${alpha * 0.8}`)
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
  }, [style, intensity, mousePos])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
