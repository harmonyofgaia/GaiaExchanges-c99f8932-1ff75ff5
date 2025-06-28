
import { useEffect, useState } from 'react'

interface AbstractArtOverlayProps {
  intensity?: 'subtle' | 'medium' | 'strong'
  artType?: 'matrix' | 'waves' | 'fractals' | 'quantum'
  className?: string
}

export function AbstractArtOverlay({ 
  intensity = 'subtle', 
  artType = 'waves',
  className = '' 
}: AbstractArtOverlayProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const getIntensityOpacity = () => {
    switch (intensity) {
      case 'subtle': return 0.1
      case 'medium': return 0.2
      case 'strong': return 0.3
      default: return 0.1
    }
  }

  const renderMatrixArt = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono text-xs animate-pulse"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${Math.sin(animationPhase * 0.01 + i) * 50 + 50}%`,
            opacity: getIntensityOpacity(),
            transform: `translateY(${Math.sin(animationPhase * 0.02 + i) * 20}px)`,
            animationDelay: `${i * 0.1}s`
          }}
        >
          {['GAIA', 'HARMONY', '01001', '11010', '🌍', '🎵'][i % 6]}
        </div>
      ))}
    </div>
  )

  const renderWaveArt = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={getIntensityOpacity()} />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity={getIntensityOpacity() * 0.5} />
            <stop offset="100%" stopColor="#a855f7" stopOpacity={getIntensityOpacity()} />
          </linearGradient>
        </defs>
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={i}
            d={`M 0 ${50 + i * 20} Q 25 ${30 + Math.sin(animationPhase * 0.01 + i) * 20} 50 ${50 + i * 20} T 100 ${50 + i * 20}`}
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            opacity={getIntensityOpacity()}
            style={{
              transform: `translateX(${Math.sin(animationPhase * 0.005 + i) * 10}px)`
            }}
          />
        ))}
      </svg>
    </div>
  )

  const renderFractalArt = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute border border-purple-400 rounded-full"
          style={{
            left: `${25 + (i * 10) % 50}%`,
            top: `${25 + (i * 15) % 50}%`,
            width: `${20 + i * 5}px`,
            height: `${20 + i * 5}px`,
            opacity: getIntensityOpacity(),
            transform: `rotate(${animationPhase + i * 36}deg) scale(${1 + Math.sin(animationPhase * 0.01) * 0.3})`,
            borderColor: ['#22c55e', '#3b82f6', '#a855f7', '#ec4899'][i % 4]
          }}
        />
      ))}
    </div>
  )

  const renderQuantumArt = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: getIntensityOpacity(),
            transform: `scale(${1 + Math.sin(animationPhase * 0.02 + i) * 0.5})`,
            boxShadow: `0 0 ${Math.sin(animationPhase * 0.01 + i) * 10 + 5}px #06b6d4`
          }}
        />
      ))}
      {/* Quantum connections */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={`${Math.sin(animationPhase * 0.01 + i) * 50 + 50}%`}
            y1={`${Math.cos(animationPhase * 0.01 + i) * 50 + 50}%`}
            x2={`${Math.sin(animationPhase * 0.015 + i + 1) * 50 + 50}%`}
            y2={`${Math.cos(animationPhase * 0.015 + i + 1) * 50 + 50}%`}
            stroke="#06b6d4"
            strokeWidth="1"
            opacity={getIntensityOpacity()}
          />
        ))}
      </svg>
    </div>
  )

  const renderArt = () => {
    switch (artType) {
      case 'matrix': return renderMatrixArt()
      case 'waves': return renderWaveArt()
      case 'fractals': return renderFractalArt()
      case 'quantum': return renderQuantumArt()
      default: return renderWaveArt()
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {renderArt()}
    </div>
  )
}
