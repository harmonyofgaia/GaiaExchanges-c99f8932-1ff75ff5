
import { useEffect, useState } from 'react'

export const ArtisticTitle = () => {
  const [glowIntensity, setGlowIntensity] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.5 : 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mb-8 flex flex-col items-center">
      {/* Revolutionary New Artistic Style Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-8">
        <div 
          className="text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-3xl animate-pulse"
          style={{
            fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', serif",
            transform: 'rotate(-3deg) scale(1.3)',
            animation: 'gradient-shift 10s ease infinite'
          }}
        >
          ℌ𝔞𝔯𝔪𝔬𝔫𝔶 𝔬𝔣 𝔊𝔞𝔦𝔞
        </div>
      </div>

      {/* Main Revolutionary Title with New Artistic Design */}
      <div className="relative z-10">
        {/* Enhanced Shadow Layers for Depth */}
        <div className="absolute inset-0 scale-110 opacity-60">
          <div 
            className="text-8xl font-bold text-white blur-2xl"
            style={{
              fontFamily: "'Orbitron', 'Exo 2', monospace",
              letterSpacing: '0.3em',
              textShadow: `
                0 0 50px rgba(255, 255, 255, 0.8),
                0 0 100px rgba(147, 51, 234, 0.6),
                0 0 150px rgba(59, 130, 246, 0.4)
              `,
              transform: `scale(${glowIntensity})`,
              transition: 'transform 2s ease-in-out'
            }}
          >
            HARMONY OF GAIA
          </div>
        </div>

        {/* Revolutionary Multi-Layer Typography */}
        <div 
          className="relative text-8xl font-bold"
          style={{
            fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', monospace",
            letterSpacing: '0.3em',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}
        >
          {/* Layer 1: Base Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(45deg, 
                  #ff0080 0%, 
                  #ff8c00 15%, 
                  #ffd700 30%, 
                  #00ff80 45%, 
                  #00bfff 60%, 
                  #8a2be2 75%, 
                  #ff1493 90%, 
                  #ff0080 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 8s ease infinite'
            }}
          >
            HARMONY OF GAIA
          </div>

          {/* Layer 2: Electric Outline */}
          <div 
            className="absolute inset-0"
            style={{
              WebkitTextStroke: '2px transparent',
              background: `
                linear-gradient(90deg, 
                  #00ffff 0%,
                  #ff00ff 25%,
                  #ffff00 50%,
                  #00ff00 75%,
                  #00ffff 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 6s ease infinite reverse',
              filter: `brightness(${glowIntensity * 1.2})`
            }}
          >
            HARMONY OF GAIA
          </div>

          {/* Layer 3: Main Text with Dynamic Glow */}
          <div 
            className="relative"
            style={{
              textShadow: `
                3px 3px 6px rgba(0,0,0,0.9),
                0 0 30px rgba(255, 0, 128, ${0.6 * glowIntensity}),
                0 0 60px rgba(0, 191, 255, ${0.5 * glowIntensity}),
                0 0 90px rgba(138, 43, 234, ${0.4 * glowIntensity}),
                0 0 120px rgba(255, 215, 0, ${0.3 * glowIntensity})
              `,
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%,
                  rgba(255, 255, 255, 0.7) 50%,
                  rgba(255, 255, 255, 0.9) 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 20px rgba(255, 255, 255, ${0.5 * glowIntensity}))`
            }}
          >
            HARMONY OF GAIA
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-8 text-4xl opacity-90">
          <span className="text-yellow-400 animate-bounce" style={{animationDelay: '0s'}}>⚡</span>
          <span className="text-cyan-400 animate-bounce" style={{animationDelay: '0.3s'}}>⚡</span>
          <span className="text-pink-400 animate-bounce" style={{animationDelay: '0.6s'}}>⚡</span>
        </div>
        
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-12 text-3xl opacity-80">
          <span className="text-emerald-400 animate-pulse" style={{animationDelay: '0s'}}>🌿</span>
          <span className="text-blue-400 animate-pulse" style={{animationDelay: '0.5s'}}>💎</span>
          <span className="text-purple-400 animate-pulse" style={{animationDelay: '1s'}}>🌿</span>
        </div>

        {/* Orbiting Energy Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(45deg, 
                  ${i % 3 === 0 ? '#ff0080' : i % 3 === 1 ? '#00bfff' : '#ffd700'} 0%,
                  ${i % 3 === 0 ? '#ff8c00' : i % 3 === 1 ? '#8a2be2' : '#00ff80'} 100%
                )`,
                boxShadow: `0 0 15px ${i % 3 === 0 ? '#ff0080' : i % 3 === 1 ? '#00bfff' : '#ffd700'}`,
                animation: `particle-orbit ${8 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                left: '50%',
                top: '50%',
                transformOrigin: `${60 + i * 20}px 0px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Revolutionary Subtitle */}
      <div className="relative mt-8 z-10">
        <p 
          className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300"
          style={{
            fontFamily: "'Cinzel', serif",
            letterSpacing: '0.2em',
            textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
          }}
        >
          ⚔️ Where Digital Dragons Guard Eternal Realms ⚔️
        </p>
      </div>
    </div>
  )
}
