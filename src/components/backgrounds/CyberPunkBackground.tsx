
import { useEffect, useRef } from 'react'

interface CyberPunkBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
}

export function CyberPunkBackground({ 
  intensity = 'medium', 
  color = '#ff00ff', 
  speed = 1 
}: CyberPunkBackgroundProps) {
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

    // Cyberpunk elements
    const gridSize = intensity === 'low' ? 80 : intensity === 'high' ? 40 : 60
    const glitchLines: Array<{ x: number; y: number; width: number; opacity: number }> = []
    
    // Initialize glitch lines
    for (let i = 0; i < 10; i++) {
      glitchLines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 50,
        opacity: Math.random() * 0.5
      })
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = color + '20'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw glitch lines
      glitchLines.forEach((line, index) => {
        ctx.fillStyle = color + Math.floor(line.opacity * 255).toString(16).padStart(2, '0')
        ctx.fillRect(line.x, line.y, line.width, 2)
        
        // Animate glitch
        line.y += speed * 2
        line.opacity = Math.sin(Date.now() * 0.01 + index) * 0.5 + 0.5
        
        if (line.y > canvas.height) {
          line.y = -10
          line.x = Math.random() * canvas.width
        }
      })

      // Add scan lines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.02)'
        ctx.fillRect(0, y, canvas.width, 1)
      }

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
