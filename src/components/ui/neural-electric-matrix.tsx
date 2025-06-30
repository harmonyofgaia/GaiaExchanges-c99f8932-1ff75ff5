
import { useEffect, useState } from 'react'

interface MatrixCell {
  id: string
  x: number
  y: number
  char: string
  opacity: number
  speed: number
  color: string
}

export function NeuralElectricMatrix() {
  const [matrixCells, setMatrixCells] = useState<MatrixCell[]>([])

  useEffect(() => {
    const chars = '01ガイア龍虎猿海豚アバターコアラ量子神経電気'
    const colors = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff6600']
    
    const createCell = (index: number): MatrixCell => ({
      id: `cell-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    })

    const cells = Array.from({ length: 200 }, (_, i) => createCell(i))
    setMatrixCells(cells)

    const interval = setInterval(() => {
      setMatrixCells(prev => prev.map(cell => ({
        ...cell,
        y: (cell.y + cell.speed) % 110,
        char: Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : cell.char,
        opacity: Math.random() * 0.8 + 0.2
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {matrixCells.map((cell) => (
        <div
          key={cell.id}
          className="absolute font-mono text-xs font-bold animate-pulse"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            color: cell.color,
            opacity: cell.opacity,
            textShadow: `0 0 10px ${cell.color}`,
            animation: `pulse ${cell.speed}s infinite`
          }}
        >
          {cell.char}
        </div>
      ))}
      
      {/* Neural pathway lines */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <g key={`neural-${i}`}>
            <line
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="#00ffff"
              strokeWidth="0.5"
              opacity="0.3"
              className="animate-pulse"
            />
            <circle
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="#ff00ff"
              opacity="0.6"
              className="animate-ping"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
