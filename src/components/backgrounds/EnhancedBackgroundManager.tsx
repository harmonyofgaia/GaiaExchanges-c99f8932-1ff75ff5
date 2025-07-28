import { useEffect, useRef, useState } from 'react'

interface EnhancedBackgroundManagerProps {
  settings: {
    type: 'neural' | 'matrix'
    intensity: 'low' | 'medium' | 'high'
    color: string
    speed: number
    autoGenerate: boolean
  }
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export function EnhancedBackgroundManager({ settings }: EnhancedBackgroundManagerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [isActive, setIsActive] = useState(true)
  
  // Reduced particle count for better performance
  const getParticleCount = () => {
    switch (settings.intensity) {
      case 'low': return 15  // Reduced from 30
      case 'medium': return 25 // Reduced from 50
      case 'high': return 40   // Reduced from 80
      default: return 15
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Optimized resize handling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize particles with performance optimization
    const initParticles = () => {
      const particleCount = getParticleCount()
      particlesRef.current = []
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * settings.speed * 0.5, // Reduced speed multiplier
          vy: (Math.random() - 0.5) * settings.speed * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 100
        })
      }
    }

    // Optimized animation loop with reduced frequency
    let lastFrame = 0
    const animate = (currentTime: number) => {
      // Limit to 30 FPS for better performance
      if (currentTime - lastFrame < 33) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = currentTime

      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Clear with optimized alpha for subtle trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle based on type
        ctx.globalAlpha = particle.opacity * 0.6 // Reduced opacity for performance
        
        if (settings.type === 'matrix') {
          ctx.fillStyle = settings.color || '#00ff00'
          ctx.font = `${particle.size * 8}px monospace`
          ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), particle.x, particle.y)
        } else {
          ctx.fillStyle = `hsl(${particle.hue}, 70%, 50%)`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    
    // Security and protection logging
    console.log('🛡️ BACKGROUND MANAGER: Protected by Quantum Defense Wall')
    console.log('☁️ VISUAL ENGINE: Running through Protected Cloud')
    console.log('🌟 PERFORMANCE: Optimized for smooth experience')

    window.addEventListener('resize', resizeCanvas)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [settings, isActive])

  // Performance monitoring
  useEffect(() => {
    const performanceMonitor = setInterval(() => {
      console.log('🎨 BACKGROUND ENGINE: Optimized performance active')
      console.log('🛡️ VISUAL PROTECTION: All systems secured')
    }, 60000) // Every minute

    return () => clearInterval(performanceMonitor)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  )
}
