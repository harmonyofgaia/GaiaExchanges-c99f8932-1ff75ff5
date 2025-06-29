
import { useEffect, useState, useRef } from 'react'

interface MatrixText {
  id: number
  x: number
  y: number
  text: string
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
  size: number
}

export function MatrixHarmonyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [matrixTexts, setMatrixTexts] = useState<MatrixText[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Text variations for the matrix effect
  const harmonyTexts = [
    'Harmony', 'of', 'GAiA', 'HARMONY', 'GAIA', 
    '🌍', '🌱', '💚', '✨', '∞', '☯', '🎵'
  ]

  // Update dimensions
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

  // Initialize matrix texts
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newTexts: MatrixText[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        text: harmonyTexts[Math.floor(Math.random() * harmonyTexts.length)],
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        size: Math.random() * 16 + 12
      }))

      setMatrixTexts(newTexts)
    }
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let time = 0

    const animate = () => {
      // Clear with slight fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.016

      // Update and draw matrix texts
      setMatrixTexts(currentTexts => {
        return currentTexts.map(textObj => {
          // Update position with twirling motion
          const spiralRadius = 50 + Math.sin(time + textObj.id) * 30
          const spiralAngle = time * textObj.rotationSpeed + textObj.id * 0.5
          
          textObj.x += Math.cos(spiralAngle) * 0.5
          textObj.y += textObj.speed + Math.sin(spiralAngle) * 0.3
          textObj.rotation += textObj.rotationSpeed

          // Wrap around screen
          if (textObj.y > canvas.height + 50) {
            textObj.y = -50
            textObj.x = Math.random() * canvas.width
            textObj.text = harmonyTexts[Math.floor(Math.random() * harmonyTexts.length)]
          }
          if (textObj.x < -50) textObj.x = canvas.width + 50
          if (textObj.x > canvas.width + 50) textObj.x = -50

          // Update opacity with pulse
          textObj.opacity = 0.1 + Math.sin(time * 2 + textObj.id) * 0.15

          // Draw the text
          ctx.save()
          ctx.translate(textObj.x, textObj.y)
          ctx.rotate((textObj.rotation * Math.PI) / 180)
          
          // Set font and style
          ctx.font = `${textObj.size}px 'Courier New', monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          // Neon green glow effect
          ctx.shadowColor = '#00ff41'
          ctx.shadowBlur = 8
          ctx.fillStyle = `rgba(0, 255, 65, ${textObj.opacity})`
          
          // Draw the text
          ctx.fillText(textObj.text, 0, 0)
          
          // Add extra glow
          ctx.shadowBlur = 15
          ctx.fillStyle = `rgba(0, 255, 65, ${textObj.opacity * 0.5})`
          ctx.fillText(textObj.text, 0, 0)
          
          ctx.restore()

          return textObj
        })
      })

      // Draw connecting lines between nearby texts (subtle)
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)'
      ctx.lineWidth = 1
      matrixTexts.forEach((text1, i) => {
        matrixTexts.slice(i + 1, i + 3).forEach(text2 => {
          const distance = Math.sqrt((text1.x - text2.x) ** 2 + (text1.y - text2.y) ** 2)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(text1.x, text1.y)
            ctx.lineTo(text2.x, text2.y)
            ctx.stroke()
          }
        })
      })

      // Add subtle matrix rain lines
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.03)'
      ctx.lineWidth = 1
      for (let i = 0; i < 10; i++) {
        const x = (i * canvas.width) / 10 + Math.sin(time + i) * 20
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [matrixTexts, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.6
      }}
    />
  )
}
