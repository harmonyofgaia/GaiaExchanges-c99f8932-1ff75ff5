
import { useEffect, useState } from 'react'

interface BackgroundStyle {
  style: string
  intensity: number
  neural: boolean
  matrix: boolean
}

export const EnhancedHomeBackground = () => {
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundStyle>({
    style: 'neural-matrix',
    intensity: 40, // Reduced from 80
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
      {/* Simplified floating neural elements - reduced count */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: backgroundConfig.neural ? 8 : 4 }).map((_, i) => (
          <div
            key={`neural-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              animation: `float-up ${6 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className={`w-1 h-1 ${
              i % 3 === 0 ? 'bg-cyan-400 shadow-cyan-400/30' : 
              i % 3 === 1 ? 'bg-purple-400 shadow-purple-400/30' : 
              'bg-green-400 shadow-green-400/30'
            } rounded-full blur-sm shadow-sm animate-pulse`} 
            style={{
              boxShadow: `0 0 10px currentColor`
            }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
