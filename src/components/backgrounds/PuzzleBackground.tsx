import { useEffect, useRef } from 'react'

export interface PuzzleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  speed?: number
}

export function PuzzleBackground({
  intensity = 'medium',
  color = '#8b5cf6',
  speed = 1
}: PuzzleBackgroundProps) {
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

    // Puzzle pieces configuration
    const pieceSize = intensity === 'low' ? 80 : intensity === 'high' ? 40 : 60
    const cols = Math.ceil(canvas.width / pieceSize)
    const rows = Math.ceil(canvas.height / pieceSize)

    interface PuzzlePiece {
      x: number
      y: number
      targetX: number
      targetY: number
      rotation: number
      alpha: number
      size: number
    }

    const pieces: PuzzlePiece[] = []

    // Initialize puzzle pieces
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece: PuzzlePiece = {
          x: col * pieceSize + Math.random() * 20 - 10,
          y: row * pieceSize + Math.random() * 20 - 10,
          targetX: col * pieceSize,
          targetY: row * pieceSize,
          rotation: Math.random() * 360,
          alpha: Math.random() * 0.5 + 0.1,
          size: pieceSize
        }
        pieces.push(piece)
      }
    }

    const drawPuzzlePiece = (piece: PuzzlePiece) => {
      ctx.save()
      ctx.translate(piece.x + piece.size / 2, piece.y + piece.size / 2)
      ctx.rotate((piece.rotation * Math.PI) / 180)
      ctx.globalAlpha = piece.alpha

      // Draw puzzle piece shape
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 2

      const size = piece.size * 0.8
      const tabSize = size * 0.3

      ctx.beginPath()
      ctx.moveTo(-size / 2, -size / 2)
      
      // Top edge with tab
      ctx.lineTo(-tabSize / 2, -size / 2)
      ctx.arc(0, -size / 2 - tabSize / 2, tabSize / 2, 0, Math.PI, false)
      ctx.lineTo(tabSize / 2, -size / 2)
      ctx.lineTo(size / 2, -size / 2)
      
      // Right edge with tab
      ctx.lineTo(size / 2, -tabSize / 2)
      ctx.arc(size / 2 + tabSize / 2, 0, tabSize / 2, Math.PI, 0, false)
      ctx.lineTo(size / 2, tabSize / 2)
      ctx.lineTo(size / 2, size / 2)
      
      // Bottom edge with tab
      ctx.lineTo(tabSize / 2, size / 2)
      ctx.arc(0, size / 2 + tabSize / 2, tabSize / 2, Math.PI, 0, false)
      ctx.lineTo(-tabSize / 2, size / 2)
      ctx.lineTo(-size / 2, size / 2)
      
      // Left edge with tab
      ctx.lineTo(-size / 2, tabSize / 2)
      ctx.arc(-size / 2 - tabSize / 2, 0, tabSize / 2, 0, Math.PI, false)
      ctx.lineTo(-size / 2, -tabSize / 2)
      ctx.closePath()

      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pieces.forEach(piece => {
        drawPuzzlePiece(piece)

        // Animate piece movement towards target
        piece.x += (piece.targetX - piece.x) * 0.01 * speed
        piece.y += (piece.targetY - piece.y) * 0.01 * speed
        piece.rotation += speed * 0.5

        // Randomly change target occasionally
        if (Math.random() < 0.001) {
          piece.targetX = piece.targetX + (Math.random() - 0.5) * 100
          piece.targetY = piece.targetY + (Math.random() - 0.5) * 100
        }

        // Keep within bounds
        if (piece.targetX < 0) piece.targetX = 0
        if (piece.targetX > canvas.width - piece.size) piece.targetX = canvas.width - piece.size
        if (piece.targetY < 0) piece.targetY = 0
        if (piece.targetY > canvas.height - piece.size) piece.targetY = canvas.height - piece.size
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [intensity, color, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  )
}
