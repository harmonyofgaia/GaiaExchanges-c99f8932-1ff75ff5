
import { useEffect, useRef } from 'react'

interface QuantumAnimatedBackgroundProps {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

export function QuantumAnimatedBackground({ 
  primaryColor = '#00ff00',
  secondaryColor = '#00ffff', 
  accentColor = '#ff00ff'
}: QuantumAnimatedBackgroundProps) {
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

    // Quantum particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      phase: number
      quantum: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: [primaryColor, secondaryColor, accentColor][Math.floor(Math.random() * 3)],
        phase: Math.random() * Math.PI * 2,
        quantum: Math.random()
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Quantum behavior - particles can teleport
        if (Math.random() < 0.001) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.phase += 0.05

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw quantum particle with wave interference
        const alpha = 0.2 + Math.sin(particle.phase) * 0.1
        const size = particle.size + Math.sin(particle.phase * 2) * 0.5

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', `, ${alpha})`)
        ctx.fill()

        // Quantum entanglement lines
        particles.forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100 && particle.quantum > 0.8) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color.replace(')', `, 0.1)`)
            ctx.lineWidth = 0.5
            ctx.stroke()
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
  }, [primaryColor, secondaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen', opacity: 0.3 }}
    />
  )
}
