
import { useEffect, useRef, useState } from 'react'

export interface EnhancedBackgroundSettings {
  type: EnhancedBackgroundType
  intensity: 'low' | 'medium' | 'high'
  color: string
  speed: number
  autoGenerate: boolean
}

export type EnhancedBackgroundType = 'neural' | 'matrix' | 'creative'

interface EnhancedBackgroundManagerProps {
  settings: EnhancedBackgroundSettings
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

// Global state for background config
let globalBackgroundConfig: EnhancedBackgroundSettings = {
  type: 'neural',
  intensity: 'medium',
  color: '#00ffff',
  speed: 1.5,
  autoGenerate: false
}

// Export function to update background config globally
export const updateBackgroundConfig = (config: Partial<EnhancedBackgroundSettings>) => {
  globalBackgroundConfig = { ...globalBackgroundConfig, ...config }
  
  // Dispatch custom event for components to listen to
  window.dispatchEvent(new CustomEvent('background-config-updated', {
    detail: globalBackgroundConfig
  }))
  
  console.log('🎨 Background config updated:', globalBackgroundConfig)
}

// Export function to get current background config
export const getCurrentBackgroundConfig = (): EnhancedBackgroundSettings => {
  return globalBackgroundConfig
}

export function EnhancedBackgroundManager({ settings }: EnhancedBackgroundManagerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [isActive, setIsActive] = useState(true)
  const [currentSettings, setCurrentSettings] = useState(settings)
  
  // Listen for background config updates
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      setCurrentSettings(event.detail)
    }
    
    window.addEventListener('background-config-updated', handleConfigUpdate as EventListener)
    
    return () => {
      window.removeEventListener('background-config-updated', handleConfigUpdate as EventListener)
    }
  }, [])
  
  // Reduced particle count for better performance
  const getParticleCount = () => {
    switch (currentSettings.intensity) {
      case 'low': return 8   // Further reduced for performance
      case 'medium': return 15
      case 'high': return 25
      default: return 8
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
          vx: (Math.random() - 0.5) * currentSettings.speed * 0.3,
          vy: (Math.random() - 0.5) * currentSettings.speed * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() * 60 + 100
        })
      }
    }

    // Optimized animation loop with reduced frequency
    let lastFrame = 0
    const animate = (currentTime: number) => {
      // Limit to 24 FPS for better performance
      if (currentTime - lastFrame < 42) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = currentTime

      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Clear with optimized alpha for subtle trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle based on type
        ctx.globalAlpha = particle.opacity * 0.5
        
        if (currentSettings.type === 'matrix') {
          ctx.fillStyle = currentSettings.color || '#00ff00'
          ctx.font = `${particle.size * 6}px monospace`
          ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), particle.x, particle.y)
        } else if (currentSettings.type === 'creative') {
          ctx.fillStyle = `hsl(${(particle.hue + Date.now() * 0.01) % 360}, 70%, 50%)`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Neural network style
          ctx.fillStyle = currentSettings.color || '#00ffff'
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
    
    // Protected cloud engine logging
    console.log('🛡️ PROTECTED CLOUD ENGINE: Background Manager Secured')
    console.log('☁️ DEFENSE WALL: Visual systems protected')

    window.addEventListener('resize', resizeCanvas)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentSettings, isActive])

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
