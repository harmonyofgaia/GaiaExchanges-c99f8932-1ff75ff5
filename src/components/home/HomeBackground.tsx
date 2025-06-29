
import { AbstractArtOverlay } from '@/components/ui/abstract-art-overlay'
import { MatrixHarmonyBackground } from '@/components/ui/matrix-harmony-background'

export const HomeBackground = () => {
  return (
    <>
      {/* Matrix Harmony Background - New Addition */}
      <MatrixHarmonyBackground />

      {/* Abstract Art Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Primary abstract background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/40" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/4 right-20 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-none rotate-45 blur-2xl animate-bounce" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-none rotate-12 blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Neural network patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <circle 
                cx={`${Math.random() * 100}%`} 
                cy={`${Math.random() * 100}%`} 
                r="2" 
                fill="url(#neuralGradient)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <line
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#neuralGradient)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Abstract art overlay */}
        <AbstractArtOverlay intensity="medium" artType="quantum" />
      </div>

      {/* Floating Abstract Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Floating artistic elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`art-${i}`}
            className="absolute opacity-60"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + Math.sin(i) * 30}%`,
              animation: `float-up 4s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className={`w-4 h-4 ${i % 4 === 0 ? 'bg-purple-400' : i % 4 === 1 ? 'bg-cyan-400' : i % 4 === 2 ? 'bg-pink-400' : 'bg-green-400'} rounded-full blur-sm`} />
          </div>
        ))}
        
        {/* Abstract energy trails */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute w-1 h-32 bg-gradient-to-t from-transparent via-purple-400/30 to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </>
  )
}
