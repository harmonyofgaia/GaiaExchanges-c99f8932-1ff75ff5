
import { useEffect, useRef } from 'react'

export interface MatrixRainBackgroundProps {
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

    // Matrix rain configuration with GAiA theme
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops with staggered start positions for smooth effect
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height
    }

    // Enhanced matrix characters with GAiA symbols
    const matrixChars = 'GAiAEXCHANGE01234567890ハーチャクモニー龍神様ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?'
    const gaiaSymbols = ['🌍', '🌿', '⚡', '💎', '🐉', '🌱', '✨', '🔮']

    // Get intensity-based settings
    const densityMultiplier = intensity === 'low' ? 0.7 : intensity === 'high' ? 1.5 : 1
    const trailOpacity = intensity === 'low' ? 0.08 : intensity === 'high' ? 0.03 : 0.05

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      // Draw matrix rain
      for (let i = 0; i < drops.length * densityMultiplier; i++) {
        const columnIndex = i % columns
        const x = columnIndex * fontSize
        const y = drops[columnIndex] * fontSize

        // Randomly choose character type
        let char: string
        if (Math.random() < 0.95) {
          char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        } else {
          char = gaiaSymbols[Math.floor(Math.random() * gaiaSymbols.length)]
        }

        // Create glow effect for special characters
        const isSpecial = gaiaSymbols.includes(char)
        
        if (isSpecial) {
          // Glow effect for GAiA symbols
          ctx.shadowColor = color
          ctx.shadowBlur = 15
          ctx.fillStyle = color
          ctx.globalAlpha = 0.8
        } else {
          // Regular matrix characters with varying opacity
          ctx.shadowBlur = 5
          ctx.shadowColor = color
          ctx.fillStyle = color
          ctx.globalAlpha = Math.random() * 0.8 + 0.2
        }

        ctx.fillText(char, x, y)
        
        // Reset shadow
        ctx.shadowBlur = 0

        // Move drop down and reset if needed
        if (drops[columnIndex] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[columnIndex] = Math.random() * -100
        }
        drops[columnIndex] += speed * (Math.random() * 0.5 + 0.5)
      }

      ctx.globalAlpha = 1
    }

    // Use consistent animation timing
    const animationId = setInterval(draw, 50) // 20 FPS for smooth consistent animation

    return () => {
      clearInterval(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [intensity, color, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #001100 30%, #000800 70%, #000000 100%)',
        opacity: 0.8 
      }}
    />
  )
}
