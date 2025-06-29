
import { useEffect, useState } from 'react'

export const ArtisticTitle = () => {
  const [glowIntensity, setGlowIntensity] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.5 : 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mb-12 flex flex-col items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div 
          className="text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-600 via-green-400 to-green-200"
          style={{
            fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', serif",
            transform: 'rotate(-2deg) scale(1.2)',
            filter: 'blur(8px)'
          }}
        >
          🌳
        </div>
      </div>

      {/* Main Title */}
      <div className="relative z-10">
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex justify-center">
          <div className="text-6xl animate-pulse opacity-80">🌿</div>
        </div>

        <div className="absolute -top-8 left-0 transform -translate-x-full flex gap-4 text-3xl opacity-70">
          <span className="text-green-400 animate-bounce" style={{animationDelay: '0s'}}>🍃</span>
          <span className="text-emerald-400 animate-bounce" style={{animationDelay: '0.5s'}}>🌱</span>
        </div>
        
        <div className="absolute -top-8 right-0 transform translate-x-full flex gap-4 text-3xl opacity-70">
          <span className="text-green-400 animate-bounce" style={{animationDelay: '0.3s'}}>🌱</span>
          <span className="text-emerald-400 animate-bounce" style={{animationDelay: '0.8s'}}>🍃</span>
        </div>

        {/* Enhanced Shadow Layers */}
        <div className="absolute inset-0 scale-110 opacity-50">
          <div 
            className="text-8xl font-bold text-green-200 blur-3xl"
            style={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              letterSpacing: '0.15em',
              textShadow: `
                0 0 60px rgba(34, 197, 94, 0.8),
                0 0 120px rgba(22, 163, 74, 0.6),
                0 0 180px rgba(21, 128, 61, 0.4)
              `,
              transform: `scale(${glowIntensity})`,
              transition: 'transform 3s ease-in-out'
            }}
          >
            HARMONY OF GAIA
          </div>
        </div>

        {/* Multi-Layer Typography with new font */}
        <div 
          className="relative text-8xl font-bold"
          style={{
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            letterSpacing: '0.15em',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}
        >
          {/* Layer 1: Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, 
                  #065f46 0%,
                  #059669 15%,
                  #10b981 30%,
                  #34d399 45%,
                  #6ee7b7 60%,
                  #a7f3d0 75%,
                  #d1fae5 90%,
                  #065f46 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '300% 300%',
              animation: 'organic-flow 12s ease infinite'
            }}
          >
            HARMONY OF GAIA
          </div>

          {/* Layer 2: Texture Effect */}
          <div 
            className="absolute inset-0"
            style={{
              WebkitTextStroke: '3px transparent',
              background: `
                linear-gradient(90deg, 
                  #92400e 0%,
                  #a3a3a3 20%,
                  #065f46 40%,
                  #059669 60%,
                  #92400e 80%,
                  #a3a3a3 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'bark-texture 10s ease infinite reverse',
              filter: `brightness(${glowIntensity * 1.3})`
            }}
          >
            HARMONY OF GAIA
          </div>

          {/* Layer 3: Main Text with Glow */}
          <div 
            className="relative"
            style={{
              textShadow: `
                4px 4px 8px rgba(0,0,0,0.8),
                0 0 40px rgba(34, 197, 94, ${0.7 * glowIntensity}),
                0 0 80px rgba(22, 163, 74, ${0.6 * glowIntensity}),
                0 0 120px rgba(21, 128, 61, ${0.5 * glowIntensity}),
                0 0 160px rgba(5, 150, 105, ${0.4 * glowIntensity})
              `,
              background: `
                linear-gradient(145deg, 
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(240, 253, 244, 0.8) 30%,
                  rgba(220, 252, 231, 0.9) 70%,
                  rgba(255, 255, 255, 0.95) 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 30px rgba(34, 197, 94, ${0.6 * glowIntensity}))`
            }}
          >
            HARMONY OF GAIA
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-16 text-4xl opacity-80">
          <span className="text-amber-600 animate-pulse" style={{animationDelay: '0s'}}>🌰</span>
          <span className="text-green-600 animate-pulse" style={{animationDelay: '0.7s'}}>🌿</span>
          <span className="text-emerald-600 animate-pulse" style={{animationDelay: '1.4s'}}>🌰</span>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`element-${i}`}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: `linear-gradient(45deg, 
                  ${i % 4 === 0 ? '#22c55e' : i % 4 === 1 ? '#16a34a' : i % 4 === 2 ? '#15803d' : '#166534'} 0%,
                  ${i % 4 === 0 ? '#16a34a' : i % 4 === 1 ? '#15803d' : i % 4 === 2 ? '#166534' : '#14532d'} 100%
                )`,
                boxShadow: `0 0 20px ${i % 4 === 0 ? '#22c55e' : i % 4 === 1 ? '#16a34a' : i % 4 === 2 ? '#15803d' : '#166534'}`,
                animation: `float-up ${10 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.7}s`,
                left: '50%',
                top: '50%',
                transformOrigin: `${80 + i * 25}px 0px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div className="relative mt-12 z-10">
        <p 
          className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-500"
          style={{
            fontFamily: "'Cinzel', 'Merriweather', serif",
            letterSpacing: '0.15em',
            textShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
          }}
        >
          🌳 Where Nature's Wisdom Guards Digital Realms 🌳
        </p>
        <div className="mt-4 flex justify-center gap-6 text-2xl opacity-90">
          <span className="animate-pulse" style={{animationDelay: '0s'}}>🌱</span>
          <span className="animate-pulse" style={{animationDelay: '0.5s'}}>🍃</span>
          <span className="animate-pulse" style={{animationDelay: '1s'}}>🌿</span>
          <span className="animate-pulse" style={{animationDelay: '1.5s'}}>🌳</span>
          <span className="animate-pulse" style={{animationDelay: '2s'}}>🌿</span>
          <span className="animate-pulse" style={{animationDelay: '2.5s'}}>🍃</span>
          <span className="animate-pulse" style={{animationDelay: '3s'}}>🌱</span>
        </div>
      </div>
    </div>
  )
}
