
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface BackgroundEffect {
  type: 'particles' | 'waves' | 'matrix' | 'neural' | 'quantum'
  intensity: number
  color: string
  speed: number
}

export function BackgroundManager() {
  const location = useLocation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [effect, setEffect] = useState<BackgroundEffect>({
    type: 'particles',
    intensity: 0.5,
    color: '#22c55e',
    speed: 1
  })

  // Route-based background configuration
  useEffect(() => {
    const path = location.pathname
    
    const configs: Record<string, BackgroundEffect> = {
      '/': { type: 'particles', intensity: 0.6, color: '#22c55e', speed: 1 },
      '/gaming': { type: 'neural', intensity: 0.8, color: '#f59e0b', speed: 1.5 },
      '/markets': { type: 'waves', intensity: 0.7, color: '#3b82f6', speed: 1.2 },
      '/admin': { type: 'quantum', intensity: 0.9, color: '#a855f7', speed: 2 },
      '/security': { type: 'matrix', intensity: 0.8, color: '#ef4444', speed: 1.8 }
    }

    setEffect(configs[path] || configs['/'])
  }, [location.pathname])

  // Optimized animation system
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

    let time = 0
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    // Initialize particles based on effect type
    const particleCount = Math.floor(effect.intensity * 100)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * effect.speed,
        vy: (Math.random() - 0.5) * effect.speed,
        size: Math.random() * 4 + 1,
        alpha: Math.random() * 0.5 + 0.3
      })
    }

    const animate = () => {
      time += 0.016 * effect.speed

      // Clear with fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Render based on effect type
      switch (effect.type) {
        case 'particles':
          renderParticles(ctx, particles, effect, time)
          break
        case 'waves':
          renderWaves(ctx, effect, time)
          break
        case 'matrix':
          renderMatrix(ctx, effect, time)
          break
        case 'neural':
          renderNeural(ctx, particles, effect, time)
          break
        case 'quantum':
          renderQuantum(ctx, effect, time)
          break
      }

      // Update particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [effect])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.8 }}
    />
  )
}

// Render functions for different effects
function renderParticles(ctx: CanvasRenderingContext2D, particles: any[], effect: BackgroundEffect, time: number) {
  particles.forEach((particle, i) => {
    const pulse = Math.sin(time + i * 0.1) * 0.3 + 0.7
    ctx.fillStyle = effect.color + Math.floor(particle.alpha * pulse * 255).toString(16).padStart(2, '0')
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2)
    ctx.fill()
  })
}

function renderWaves(ctx: CanvasRenderingContext2D, effect: BackgroundEffect, time: number) {
  ctx.strokeStyle = effect.color + '40'
  ctx.lineWidth = 2
  
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(0, ctx.canvas.height / 2 + Math.sin(time + i) * 50)
    
    for (let x = 0; x < ctx.canvas.width; x += 10) {
      const y = ctx.canvas.height / 2 + Math.sin((x * 0.01) + time + i) * 50
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function renderMatrix(ctx: CanvasRenderingContext2D, effect: BackgroundEffect, time: number) {
  ctx.fillStyle = effect.color + '60'
  ctx.font = '12px monospace'
  
  const chars = 'GAiA01ハーチャクモニー'
  for (let i = 0; i < 50; i++) {
    const x = (i * 20) % ctx.canvas.width
    const y = (Math.sin(time + i) * 100 + 100) % ctx.canvas.height
    const char = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillText(char, x, y)
  }
}

function renderNeural(ctx: CanvasRenderingContext2D, particles: any[], effect: BackgroundEffect, time: number) {
  // Draw connections between nearby particles
  ctx.strokeStyle = effect.color + '30'
  ctx.lineWidth = 1
  
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
      if (dist < 100) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    })
  })
  
  renderParticles(ctx, particles, effect, time)
}

function renderQuantum(ctx: CanvasRenderingContext2D, effect: BackgroundEffect, time: number) {
  // Quantum field visualization
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2
  
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2 + time
    const radius = 100 + Math.sin(time * 2 + i) * 50
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    
    ctx.fillStyle = effect.color + Math.floor((Math.sin(time + i) * 0.5 + 0.5) * 255).toString(16).padStart(2, '0')
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}
