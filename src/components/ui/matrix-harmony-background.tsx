
import { useEffect, useRef } from 'react'

interface MatrixElement {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  color: string
}

export function MatrixHarmonyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementsRef = useRef<MatrixElement[]>([])
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

    // Initialize matrix elements with Gaia symbols and neural patterns
    const gaiaSymbols = ['🌍', '🌿', '⚡', '💎', '🐉', '🌱', '✨', '🔮', '🌊', '🍃']
    const neuralChars = ['◦', '●', '○', '◉', '◎', '⚬', '⚫', '⚪', '◆', '◇']
    
    for (let i = 0; i < 50; i++) {
      elementsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        char: Math.random() > 0.3 ? gaiaSymbols[Math.floor(Math.random() * gaiaSymbols.length)] : neuralChars[Math.floor(Math.random() * neuralChars.length)],
        opacity: 0.1 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? '#10b981' : '#06b6d4'
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element, index) => {
        // Move element down
        element.y += element.speed

        // Reset position when off screen
        if (element.y > canvas.height + 50) {
          element.y = -50
          element.x = Math.random() * canvas.width
        }

        // Draw element
        ctx.globalAlpha = element.opacity
        ctx.fillStyle = element.color
        ctx.font = `${20 + Math.sin(Date.now() * 0.001 + index) * 5}px Arial`
        ctx.fillText(element.char, element.x, element.y)

        // Add glowing effect for special elements
        if (gaiaSymbols.includes(element.char)) {
          ctx.shadowColor = element.color
          ctx.shadowBlur = 15
          ctx.fillText(element.char, element.x, element.y)
          ctx.shadowBlur = 0
        }
      })

      // Draw neural connections
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 1
      
      for (let i = 0; i < elementsRef.current.length; i++) {
        for (let j = i + 1; j < elementsRef.current.length; j++) {
          const dx = elementsRef.current[i].x - elementsRef.current[j].x
          const dy = elementsRef.current[i].y - elementsRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(elementsRef.current[i].x, elementsRef.current[i].y)
            ctx.lineTo(elementsRef.current[j].x, elementsRef.current[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
