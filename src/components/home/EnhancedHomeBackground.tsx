
import { useEffect, useState } from 'react'
import { NeuralElectricMatrix } from '@/components/ui/neural-electric-matrix'

interface BackgroundStyle {
  style: string
  intensity: number
  neural: boolean
  matrix: boolean
}

export const EnhancedHomeBackground = () => {
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundStyle>({
    style: 'neural-matrix',
    intensity: 80,
    neural: true,
    matrix: true
  })

  useEffect(() => {
    // Listen for admin style updates
    const handleStyleUpdate = (event: CustomEvent) => {
      const { background } = event.detail
      setBackgroundConfig(background)
    }

    window.addEventListener('admin-style-update', handleStyleUpdate as EventListener)
    
    return () => {
      window.removeEventListener('admin-style-update', handleStyleUpdate as EventListener)
    }
  }, [])

  return (
    <>
      {/* Neural Electric Matrix Background - Matrix Neurologix Shocking Pathways */}
      {backgroundConfig.matrix && <NeuralElectricMatrix />}

      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Primary background with neural inspiration */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/30"
          style={{
            opacity: backgroundConfig.intensity / 100
          }}
        />
        
        {/* Dynamic style-based overlays */}
        {backgroundConfig.style === 'neural-matrix' && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-blue-900/20 to-purple-900/10" />
        )}
        
        {backgroundConfig.style === 'quantum-plasma' && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-purple-900/20 to-cyan-900/10" />
        )}
        
        {backgroundConfig.style === 'dragon-fire' && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-orange-900/20 to-yellow-900/10" />
        )}
      </div>

      {/* Enhanced Floating Neural Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Floating Neural-inspired elements */}
        {Array.from({ length: backgroundConfig.neural ? 20 : 10 }).map((_, i) => (
          <div
            key={`neural-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${5 + (i * 4.5)}%`,
              top: `${10 + Math.sin(i) * 40}%`,
              animation: `float-up ${4 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <div className={`w-2 h-2 ${
              i % 6 === 0 ? 'bg-cyan-400' : 
              i % 6 === 1 ? 'bg-purple-400' : 
              i % 6 === 2 ? 'bg-pink-400' : 
              i % 6 === 3 ? 'bg-yellow-400' : 
              i % 6 === 4 ? 'bg-green-400' : 
              'bg-blue-400'
            } rounded-full blur-sm shadow-lg`} />
          </div>
        ))}
      </div>
    </>
  )
}
