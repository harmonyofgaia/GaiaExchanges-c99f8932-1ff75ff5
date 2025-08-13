
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1
      }))
      setParticles(newParticles)
    }

    createParticles()
    const interval = setInterval(createParticles, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-green-400/30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}
