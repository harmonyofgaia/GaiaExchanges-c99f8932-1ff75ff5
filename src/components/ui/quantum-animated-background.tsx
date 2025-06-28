
import { useEffect, useState, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  type: 'star' | 'gaia' | 'coral' | 'quantum' | 'harmony'
  life: number
  maxLife: number
  rotation: number
  rotationSpeed: number
}

interface WaveSystem {
  amplitude: number
  frequency: number
  phase: number
  speed: number
  color: string
}

export function QuantumAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Wave systems for fluid motion
  const waveSystems: WaveSystem[] = [
    { amplitude: 50, frequency: 0.02, phase: 0, speed: 0.01, color: 'rgba(34, 197, 94, 0.1)' },
    { amplitude: 30, frequency: 0.03, phase: Math.PI / 2, speed: 0.015, color: 'rgba(59, 130, 246, 0.1)' },
    { amplitude: 40, frequency: 0.025, phase: Math.PI, speed: 0.008, color: 'rgba(168, 85, 247, 0.1)' },
    { amplitude: 25, frequency: 0.035, phase: Math.PI * 1.5, speed: 0.012, color: 'rgba(236, 72, 153, 0.1)' }
  ]

  // Initialize particles with quantum properties
  const createParticle = (id: number): Particle => {
    const types: Particle['type'][] = ['star', 'gaia', 'coral', 'quantum', 'harmony']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const colors = {
      star: ['#fbbf24', '#f59e0b', '#d97706'],
      gaia: ['#10b981', '#059669', '#047857'],
      coral: ['#06b6d4', '#0891b2', '#0e7490'],
      quantum: ['#8b5cf6', '#7c3aed', '#6d28d9'],
      harmony: ['#ec4899', '#db2777', '#be185d']
    }

    return {
      id,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[type][Math.floor(Math.random() * colors[type].length)],
      type,
      life: Math.random() * 1000,
      maxLife: 1000 + Math.random() * 500,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }
  }

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newParticles = Array.from({ length: 150 }, (_, i) => createParticle(i))
      setParticles(newParticles)
    }
  }, [dimensions])

  // Mouse tracking for quantum interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Quantum animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let time = 0

    const animate = () => {
      // Clear with quantum fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.016 // 60fps target

      // Draw quantum wave systems
      waveSystems.forEach((wave, index) => {
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.beginPath()

        const wavePhase = wave.phase + time * wave.speed
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height / 2 + 
                   Math.sin(x * wave.frequency + wavePhase) * wave.amplitude +
                   Math.sin(x * wave.frequency * 2 + wavePhase * 1.5) * (wave.amplitude * 0.3)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })

      // Update and draw particles with quantum effects
      setParticles(currentParticles => {
        return currentParticles.map(particle => {
          // Quantum mouse attraction
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200) {
            const force = (200 - distance) / 200 * 0.5
            particle.vx += (dx / distance) * force * 0.1
            particle.vy += (dy / distance) * force * 0.1
          }

          // Update position with quantum fluctuations
          particle.x += particle.vx + Math.sin(time * 0.01 + particle.id) * 0.5
          particle.y += particle.vy + Math.cos(time * 0.01 + particle.id) * 0.5
          
          // Quantum tunneling (wrap around screen)
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Update life and rotation
          particle.life += 1
          particle.rotation += particle.rotationSpeed

          // Quantum regeneration
          if (particle.life > particle.maxLife) {
            return createParticle(particle.id)
          }

          // Draw particle with quantum effects
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)

          // Quantum glow effect
          const alpha = Math.sin(particle.life * 0.01) * 0.3 + 0.7
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 3
          
          ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
          
          // Draw different shapes based on type
          switch (particle.type) {
            case 'star':
              // 5-pointed star
              ctx.beginPath()
              for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5
                const radius = i % 2 === 0 ? particle.size : particle.size * 0.5
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              }
              ctx.closePath()
              ctx.fill()
              break

            case 'gaia':
              // Organic circular shape
              ctx.beginPath()
              ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
              ctx.fill()
              // Add organic tendrils
              for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI * 2) / 4 + particle.rotation
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(Math.cos(angle) * particle.size * 2, Math.sin(angle) * particle.size * 2)
                ctx.lineWidth = 1
                ctx.strokeStyle = particle.color
                ctx.stroke()
              }
              break

            case 'coral':
              // Coral-like branching structure
              ctx.strokeStyle = particle.color
              ctx.lineWidth = 2
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(
                  Math.cos(angle) * particle.size * 1.5,
                  Math.sin(angle) * particle.size * 1.5
                )
                // Add sub-branches
                ctx.lineTo(
                  Math.cos(angle + 0.5) * particle.size * 0.8,
                  Math.sin(angle + 0.5) * particle.size * 0.8
                )
                ctx.stroke()
              }
              break

            case 'quantum':
              // Quantum interference pattern
              ctx.strokeStyle = particle.color
              ctx.lineWidth = 1
              for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8
                const radius = particle.size * (1 + Math.sin(time * 0.1 + i) * 0.5)
                ctx.beginPath()
                ctx.arc(0, 0, radius, angle, angle + Math.PI / 4)
                ctx.stroke()
              }
              break

            case 'harmony':
              // Musical note-like shape
              ctx.fillStyle = particle.color
              ctx.beginPath()
              ctx.arc(0, 0, particle.size * 0.8, 0, Math.PI * 2)
              ctx.fill()
              // Add note stem
              ctx.beginPath()
              ctx.rect(particle.size * 0.6, -particle.size * 2, 2, particle.size * 2)
              ctx.fill()
              break
          }

          ctx.restore()

          return particle
        })
      })

      // Draw quantum connections between nearby particles
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)'
      ctx.lineWidth = 1
      
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const alpha = (100 - distance) / 100
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.2})`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Add quantum text effect in corners
      ctx.font = '12px monospace'
      ctx.fillStyle = 'rgba(34, 197, 94, 0.3)'
      const quantumText = ['QUANTUM', 'HARMONY', 'GAIA', 'LIBERATION', 'INFINITE']
      quantumText.forEach((text, i) => {
        const x = 20 + (i % 2) * (canvas.width - 100)
        const y = 30 + Math.floor(i / 2) * 25
        const flicker = Math.sin(time * 0.1 + i) * 0.3 + 0.7
        ctx.fillStyle = `rgba(34, 197, 94, ${flicker * 0.5})`
        ctx.fillText(text, x, y)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, mousePos, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)'
      }}
    />
  )
}
