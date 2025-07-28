
import { useEffect, useRef } from 'react'

interface BioElectricBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
}

export function BioElectricBackground({ 
  intensity = 'medium', 
  color = '#00ff80', 
  speed = 1 
}: BioElectricBackgroundProps) {
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

    const pulseCount = intensity === 'low' ? 3 : intensity === 'high' ? 8 : 5
    const pulses: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      alpha: number
    }> = []

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Generate new pulses
      if (Math.random() > 0.95 && pulses.length < pulseCount) {
        pulses.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 200 + 100,
          alpha: 1
        })
      }

      // Draw bio-electric grid pattern
      const gridSize = 50
      ctx.strokeStyle = color + '10'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const pulse = Math.sin(Date.now() * 0.005 + (x + y) * 0.01) * 0.5 + 0.5
          ctx.globalAlpha = pulse * 0.3
          ctx.strokeRect(x, y, gridSize, gridSize)
        }
      }

      // Draw electric pulses
      pulses.forEach((pulse, index) => {
        pulse.radius += speed * 2
        pulse.alpha = 1 - (pulse.radius / pulse.maxRadius)

        if (pulse.alpha > 0) {
          // Main pulse ring
          ctx.globalAlpha = pulse.alpha
          ctx.strokeStyle = color
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
          ctx.stroke()

          // Inner glow
          ctx.globalAlpha = pulse.alpha * 0.5
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1
          ctx.stroke()

          // Electric arcs
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6
            const arcLength = pulse.radius * 0.3
            ctx.globalAlpha = pulse.alpha * 0.7
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(
              pulse.x + Math.cos(angle) * pulse.radius,
              pulse.y + Math.sin(angle) * pulse.radius
            )
            ctx.lineTo(
              pulse.x + Math.cos(angle) * (pulse.radius + arcLength),
              pulse.y + Math.sin(angle) * (pulse.radius + arcLength)
            )
            ctx.stroke()
          }
        } else {
          pulses.splice(index, 1)
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
