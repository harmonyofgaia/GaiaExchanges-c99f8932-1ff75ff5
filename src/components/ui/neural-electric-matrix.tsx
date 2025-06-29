
import { useEffect, useRef } from 'react'

interface NeuralParticle {
  x: number
  y: number
  vx: number
  vy: number
  energy: number
  connections: number[]
  pulsing: boolean
  size: number
}

interface ElectricShock {
  startX: number
  startY: number
  endX: number
  endY: number
  intensity: number
  lifetime: number
  color: string
}

export function NeuralElectricMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<NeuralParticle[]>([])
  const shocksRef = useRef<ElectricShock[]>([])
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

    // Initialize neural particles
    const particleCount = 120
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        energy: Math.random() * 100,
        connections: [],
        pulsing: Math.random() > 0.7,
        size: 2 + Math.random() * 4
      })
    }

    // Generate electric shocks
    const generateElectricShock = () => {
      const particles = particlesRef.current
      if (particles.length < 2) return

      const start = particles[Math.floor(Math.random() * particles.length)]
      const end = particles[Math.floor(Math.random() * particles.length)]
      
      if (start !== end) {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff80', '#ff0080']
        shocksRef.current.push({
          startX: start.x,
          startY: start.y,
          endX: end.x,
          endY: end.y,
          intensity: 0.5 + Math.random() * 0.5,
          lifetime: 30 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw neural particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.energy += Math.sin(Date.now() * 0.001 + index) * 0.5

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with neural glow
        const glowSize = particle.pulsing ? 
          particle.size + Math.sin(Date.now() * 0.005 + index) * 2 : 
          particle.size

        ctx.save()
        ctx.globalAlpha = 0.8
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize * 3
        )
        gradient.addColorStop(0, `hsla(${(particle.energy * 3.6) % 360}, 80%, 60%, 0.8)`)
        gradient.addColorStop(0.5, `hsla(${(particle.energy * 3.6) % 360}, 80%, 60%, 0.3)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `hsla(${(particle.energy * 3.6) % 360}, 90%, 70%, 1)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw neural connections
      ctx.globalAlpha = 0.15
      ctx.strokeStyle = '#00ffaa'
      ctx.lineWidth = 1
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          
          if (distance < 120) {
            const opacity = 1 - (distance / 120)
            ctx.globalAlpha = opacity * 0.3
            
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Update and draw electric shocks
      shocksRef.current = shocksRef.current.filter(shock => {
        shock.lifetime--
        
        if (shock.lifetime <= 0) return false

        // Draw electric shock with branching effect
        const segments = 8
        const points = []
        
        for (let i = 0; i <= segments; i++) {
          const t = i / segments
          const x = shock.startX + (shock.endX - shock.startX) * t
          const y = shock.startY + (shock.endY - shock.startY) * t
          
          // Add random deviation for electric effect
          const deviation = (Math.random() - 0.5) * 20 * shock.intensity
          points.push({
            x: x + deviation,
            y: y + deviation
          })
        }

        ctx.save()
        ctx.globalAlpha = (shock.lifetime / 50) * shock.intensity
        ctx.strokeStyle = shock.color
        ctx.lineWidth = 2 + shock.intensity * 2
        ctx.lineCap = 'round'
        
        // Main shock
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()

        // Glow effect
        ctx.globalAlpha = (shock.lifetime / 50) * shock.intensity * 0.5
        ctx.lineWidth = 6 + shock.intensity * 4
        ctx.stroke()

        ctx.restore()
        return true
      })

      // Randomly generate electric shocks
      if (Math.random() < 0.08) {
        generateElectricShock()
      }

      // Add GAiA symbols floating through
      if (Math.random() < 0.02) {
        const gaiaSymbols = ['🌍', '🌿', '⚡', '💎', '🔮']
        const symbol = gaiaSymbols[Math.floor(Math.random() * gaiaSymbols.length)]
        
        ctx.save()
        ctx.font = `${20 + Math.random() * 10}px Arial`
        ctx.fillStyle = `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
        ctx.fillText(
          symbol,
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
