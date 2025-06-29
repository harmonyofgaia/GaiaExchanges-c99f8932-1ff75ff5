
import { useEffect, useRef } from 'react'

interface AbstractArtOverlayProps {
  intensity?: 'low' | 'medium' | 'high'
  artType?: 'geometric' | 'organic' | 'quantum'
}

export function AbstractArtOverlay({ 
  intensity = 'medium', 
  artType = 'geometric' 
}: AbstractArtOverlayProps) {
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

    const intensityMap = {
      low: 0.1,
      medium: 0.3,
      high: 0.6
    }

    const alpha = intensityMap[intensity]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      if (artType === 'geometric') {
        // Draw geometric patterns
        for (let i = 0; i < 20; i++) {
          const x = Math.sin(time + i) * 200 + canvas.width / 2
          const y = Math.cos(time + i * 0.5) * 200 + canvas.height / 2
          const size = Math.sin(time + i) * 50 + 100

          ctx.save()
          ctx.globalAlpha = alpha * 0.5
          ctx.fillStyle = `hsl(${(time * 50 + i * 30) % 360}, 70%, 50%)`
          ctx.fillRect(x - size/2, y - size/2, size, size)
          ctx.restore()
        }
      } else if (artType === 'organic') {
        // Draw organic flowing shapes
        for (let i = 0; i < 15; i++) {
          const x = Math.sin(time + i * 0.3) * 300 + canvas.width / 2
          const y = Math.cos(time + i * 0.7) * 200 + canvas.height / 2
          const radius = Math.sin(time + i) * 30 + 50

          ctx.save()
          ctx.globalAlpha = alpha * 0.4
          ctx.fillStyle = `hsl(${(time * 30 + i * 45) % 360}, 60%, 60%)`
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      } else if (artType === 'quantum') {
        // Draw quantum-inspired patterns
        for (let i = 0; i < 30; i++) {
          const x = Math.sin(time * 2 + i * 0.1) * 400 + canvas.width / 2
          const y = Math.cos(time * 1.5 + i * 0.2) * 300 + canvas.height / 2
          const size = Math.sin(time + i) * 20 + 30

          ctx.save()
          ctx.globalAlpha = alpha * 0.3
          ctx.strokeStyle = `hsl(${(time * 100 + i * 12) % 360}, 80%, 60%)`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
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
  }, [intensity, artType])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.2 }}
    />
  )
}
