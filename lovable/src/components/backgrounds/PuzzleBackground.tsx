
import { useEffect, useRef } from 'react'

interface PuzzleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
}

export function PuzzleBackground({ 
  intensity = 'medium', 
  color = '#0084ff', 
  speed = 1 
}: PuzzleBackgroundProps) {
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

    const pieceSize = intensity === 'low' ? 80 : intensity === 'high' ? 40 : 60
    const pieces: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      rotation: number
      alpha: number
    }> = []

    // Initialize puzzle pieces
    for (let x = 0; x < canvas.width; x += pieceSize) {
      for (let y = 0; y < canvas.height; y += pieceSize) {
        pieces.push({
          x: x + Math.random() * 20 - 10,
          y: y + Math.random() * 20 - 10,
          targetX: x,
          targetY: y,
          rotation: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.5 + 0.3
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pieces.forEach((piece, index) => {
        // Animate piece movement
        piece.x += (piece.targetX - piece.x) * 0.02 * speed
        piece.y += (piece.targetY - piece.y) * 0.02 * speed
        piece.rotation += 0.01 * speed

        // Puzzle piece shape
        ctx.save()
        ctx.translate(piece.x + pieceSize/2, piece.y + pieceSize/2)
        ctx.rotate(piece.rotation)
        ctx.globalAlpha = piece.alpha

        // Draw puzzle piece with tabs and blanks
        ctx.strokeStyle = color
        ctx.fillStyle = color + '40'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        // Basic rectangle with puzzle connectors
        ctx.rect(-pieceSize/2, -pieceSize/2, pieceSize, pieceSize)
        
        // Add tabs and blanks
        const tabSize = pieceSize * 0.2
        if (Math.sin(Date.now() * 0.001 + index) > 0) {
          // Right tab
          ctx.arc(pieceSize/2, 0, tabSize, 0, Math.PI * 2)
        }
        if (Math.cos(Date.now() * 0.001 + index) > 0) {
          // Bottom tab
          ctx.arc(0, pieceSize/2, tabSize, 0, Math.PI * 2)
        }

        ctx.fill()
        ctx.stroke()
        ctx.restore()
      })

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
      style={{ opacity: 0.4 }}
    />
  )
}
