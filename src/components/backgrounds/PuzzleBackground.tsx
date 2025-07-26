import { useEffect, useRef } from 'react'

interface PuzzleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
  className?: string
}

export function PuzzleBackground({ 
  intensity = 'medium', 
  color = '#00ff00', 
  speed = 1,
  className = ''
}: PuzzleBackgroundProps) {
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

    // Puzzle piece parameters
    const pieceSize = intensity === 'low' ? 120 : intensity === 'medium' ? 80 : 60
    const pieces = []
    
    for (let x = 0; x < canvas.width + pieceSize; x += pieceSize) {
      for (let y = 0; y < canvas.height + pieceSize; y += pieceSize) {
        pieces.push({
          x,
          y,
          size: pieceSize,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02 * speed,
          alpha: 0.1 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    let time = 0

    const drawPuzzlePiece = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save()
      ctx.translate(x + size/2, y + size/2)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha
      
      // Draw puzzle piece shape
      ctx.beginPath()
      ctx.moveTo(-size/2, -size/2)
      ctx.lineTo(size/2, -size/2)
      
      // Top knob
      if (Math.random() > 0.5) {
        ctx.arc(0, -size/2, size/8, 0, Math.PI, false)
      }
      
      ctx.lineTo(size/2, size/2)
      
      // Right knob
      if (Math.random() > 0.5) {
        ctx.arc(size/2, 0, size/8, -Math.PI/2, Math.PI/2, false)
      }
      
      ctx.lineTo(-size/2, size/2)
      
      // Bottom knob
      if (Math.random() > 0.5) {
        ctx.arc(0, size/2, size/8, Math.PI, 0, false)
      }
      
      ctx.lineTo(-size/2, -size/2)
      
      // Left knob
      if (Math.random() > 0.5) {
        ctx.arc(-size/2, 0, size/8, Math.PI/2, -Math.PI/2, false)
      }
      
      ctx.closePath()
      
      // Create gradient fill
      const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2)
      gradient.addColorStop(0, `${color}60`)
      gradient.addColorStop(0.5, `${color}40`)
      gradient.addColorStop(1, `${color}20`)
      
      ctx.fillStyle = gradient
      ctx.fill()
      
      // Add border
      ctx.strokeStyle = `${color}80`
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dark background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw puzzle pieces
      pieces.forEach((piece, index) => {
        piece.rotation += piece.rotationSpeed
        
        // Add floating effect
        const floatY = piece.y + Math.sin(time + piece.phase) * 10
        
        drawPuzzlePiece(
          piece.x, 
          floatY, 
          piece.size, 
          piece.rotation, 
          piece.alpha + Math.sin(time * 2 + index) * 0.1
        )
      })

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