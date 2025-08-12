
import { useEffect, useRef } from 'react'

interface MatrixRainBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
}

export function MatrixRainBackground({ 
  intensity = 'medium', 
  color = '#00ff00', 
  speed = 1 
}: MatrixRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

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

    // Matrix characters
    const chars = 'GAiAEXCHANGE01234567890ハーチャクモニー龍神様'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }

    const densityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color
      ctx.font = `${fontSize}px monospace`
      ctx.shadowBlur = 15
      ctx.shadowColor = color

      for (let i = 0; i < drops.length * densityMultiplier; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = (i % columns) * fontSize
        const y = drops[i % drops.length] * fontSize

        // Glowing effect
        ctx.globalAlpha = Math.random() * 0.8 + 0.2
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i % drops.length] = 0
        }

        drops[i % drops.length] += speed
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
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #001100 50%, #000000 100%)',
        opacity: 0.7 
      }}
    />
  )
}
