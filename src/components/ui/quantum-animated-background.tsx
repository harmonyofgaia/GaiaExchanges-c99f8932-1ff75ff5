
import { useState, useEffect } from 'react'

interface QuantumParticle {
  id: string
  x: number
  y: number
  size: number
  speed: number
  angle: number
  color: string
  opacity: number
}

export function QuantumAnimatedBackground() {
  const [particles, setParticles] = useState<QuantumParticle[]>([])
  const [electricShocks, setElectricShocks] = useState<Array<{id: string, x1: number, y1: number, x2: number, y2: number}>>([])

  useEffect(() => {
    // Create quantum particles
    const createParticle = (index: number): QuantumParticle => ({
      id: `particle-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      angle: Math.random() * Math.PI * 2,
      color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.8 + 0.2
    })

    const newParticles = Array.from({ length: 80 }, (_, i) => createParticle(i))
    setParticles(newParticles)

    // Animate particles
    const animationInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.angle) * particle.speed) % 100,
        y: (particle.y + Math.sin(particle.angle) * particle.speed) % 100,
        angle: particle.angle + 0.05,
        opacity: Math.random() * 0.8 + 0.2
      })))
    }, 100)

    // Electric shock effects
    const shockInterval = setInterval(() => {
      const shocks = Array.from({ length: 3 }, (_, i) => ({
        id: `shock-${i}`,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100
      }))
      setElectricShocks(shocks)
      
      setTimeout(() => setElectricShocks([]), 150)
    }, 3000)

    return () => {
      clearInterval(animationInterval)
      clearInterval(shockInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Quantum field background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-black/40" />
      
      {/* Animated quantum particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}

      {/* Electric shock effects */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="quantumGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {electricShocks.map(shock => (
          <line
            key={shock.id}
            x1={`${shock.x1}%`}
            y1={`${shock.y1}%`}
            x2={`${shock.x2}%`}
            y2={`${shock.y2}%`}
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#quantumGlow)"
            className="animate-ping"
          />
        ))}
        
        {/* Quantum connection lines */}
        {particles.slice(0, 20).map((particle, index) => {
          const nextParticle = particles[(index + 1) % 20]
          return (
            <line
              key={`connection-${index}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke={particle.color}
              strokeWidth="0.5"
              opacity="0.3"
              filter="url(#quantumGlow)"
            />
          )
        })}
      </svg>

      {/* Quantum wave effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute border border-cyan-400/20 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  )
}
