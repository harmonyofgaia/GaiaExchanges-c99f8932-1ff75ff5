import { useEffect, useRef } from 'react'

interface WaterBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
  className?: string
}

export function WaterBackground({ 
  intensity = 'medium', 
  color = '#0080ff', 
  speed = 1,
  className = ''
}: WaterBackgroundProps) {
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

    // Water ripple parameters
    const ripples = []
    const rippleCount = intensity === 'low' ? 5 : intensity === 'medium' ? 10 : 15
    
    for (let i = 0; i < rippleCount; i++) {
      ripples.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 50 + Math.random() * 100,
        speed: 1 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5
      })
    }

    // Water surface parameters
    const wavePoints = []
    for (let x = 0; x <= canvas.width; x += 10) {
      wavePoints.push({
        x,
        baseY: canvas.height * 0.7,
        amplitude: 20 + Math.random() * 30,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create water gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, 'rgba(0, 20, 40, 0.9)')
      bgGradient.addColorStop(0.3, 'rgba(0, 40, 80, 0.8)')
      bgGradient.addColorStop(0.7, 'rgba(0, 80, 120, 0.7)')
      bgGradient.addColorStop(1, 'rgba(0, 100, 150, 0.6)')
      
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw water surface
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      
      wavePoints.forEach((point, index) => {
        const y = point.baseY + Math.sin(time * speed + point.phase) * point.amplitude
        if (index === 0) {
          ctx.moveTo(point.x, y)
        } else {
          const prevPoint = wavePoints[index - 1]
          const prevY = prevPoint.baseY + Math.sin(time * speed + prevPoint.phase) * prevPoint.amplitude
          const cpx = (prevPoint.x + point.x) / 2
          const cpy = (prevY + y) / 2
          ctx.quadraticCurveTo(cpx, cpy, point.x, y)
        }
      })
      
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      
      // Water surface gradient
      const waterGradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height)
      waterGradient.addColorStop(0, `${color}40`)
      waterGradient.addColorStop(0.5, `${color}60`)
      waterGradient.addColorStop(1, `${color}80`)
      
      ctx.fillStyle = waterGradient
      ctx.fill()

      // Draw ripples
      ripples.forEach((ripple, index) => {
        // Update ripple
        ripple.radius += ripple.speed
        if (ripple.radius > ripple.maxRadius) {
          ripple.radius = 0
          ripple.x = Math.random() * canvas.width
          ripple.y = Math.random() * canvas.height
        }

        // Draw ripple circles
        const opacity = ripple.opacity * (1 - ripple.radius / ripple.maxRadius)
        ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()

        // Draw inner ripple
        if (ripple.radius > 10) {
          ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.5})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Add caustic light effects
      ctx.globalCompositeOperation = 'screen'
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 30 + 10
        const opacity = Math.sin(time + i) * 0.1 + 0.1
        
        const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        lightGradient.addColorStop(0, `rgba(150, 200, 255, ${opacity})`)
        lightGradient.addColorStop(1, 'rgba(150, 200, 255, 0)')
        
        ctx.fillStyle = lightGradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      time += 0.01 * speed
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