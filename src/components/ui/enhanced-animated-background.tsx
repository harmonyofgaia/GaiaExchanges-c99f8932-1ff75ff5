
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  direction: number
}

export function EnhancedAnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        direction: Math.random() * 360
      }))
      setParticles(newParticles)
    }

    createParticles()
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed + 100) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.2 + 0.2
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base gradient backgrounds with nature images */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-5 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-3 mix-blend-overlay" />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-500/5 to-blue-500/8 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/3 via-transparent to-green-500/5 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      {/* Floating radial gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-green-400/15 via-green-400/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-400/12 via-blue-400/4 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-purple-400/10 via-purple-400/3 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '5s' }} />
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-green-400/30 to-blue-400/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.size * 2}px currentColor`
          }}
        />
      ))}
      
      {/* Matrix-style overlay lines */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-green-400/20 to-transparent"
            style={{
              left: `${(i * 5) % 100}%`,
              top: '0',
              width: '1px',
              height: '100%',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
