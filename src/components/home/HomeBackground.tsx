
import { NeuralElectricMatrix } from '@/components/ui/neural-electric-matrix'

export const HomeBackground = () => {
  return (
    <>
      {/* Neural Electric Matrix Background - the matrix neurologix shocking pathways */}
      <NeuralElectricMatrix />

      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Primary background with neural inspiration */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/30" />
      </div>

      {/* Enhanced Floating Neural Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Floating Neural-inspired elements */}
        {Array.from({ length: 20 }).map((_, i) => (
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
