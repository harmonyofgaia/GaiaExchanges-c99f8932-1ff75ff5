
import { useState, useEffect } from 'react'

interface UniversalGaiaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showText?: boolean
  onClick?: () => void
  className?: string
  position?: 'top-left' | 'top-center' | 'top-right' | 'center' | 'floating'
}

export function UniversalGaiaLogo({ 
  size = 'md', 
  animated = true, 
  showText = false,
  onClick,
  className = '',
  position = 'top-left'
}: UniversalGaiaLogoProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setPulse(true)
        setTimeout(() => setPulse(false), 1000)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [animated])

  const sizeClasses = {
    xs: 'w-6 h-6 text-lg',
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-3xl',
    lg: 'w-16 h-16 text-4xl',
    xl: 'w-24 h-24 text-6xl'
  }

  const positionClasses = {
    'top-left': 'fixed top-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'top-right': 'fixed top-4 right-4 z-50',
    'center': 'flex items-center justify-center',
    'floating': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
  }

  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          bg-black/20 backdrop-blur-sm rounded-full 
          flex items-center justify-center cursor-pointer
          transition-all duration-300 hover:scale-110
          ${pulse ? 'animate-pulse shadow-lg shadow-green-400/50' : ''}
          ${animated ? 'hover:shadow-xl hover:shadow-cyan-400/30' : ''}
        `}
        onClick={onClick}
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
          border: '2px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <span 
          className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-blue-400 to-purple-400"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.5))',
            textShadow: '0 0 20px rgba(0,255,255,0.3)'
          }}
        >
          🌍
        </span>
      </div>
      
      {showText && (
        <div className="ml-3 flex flex-col">
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            GAiA
          </span>
          <span className="text-xs text-green-300/80">
            Harmony of Culture
          </span>
        </div>
      )}
      
      {animated && (
        <div className="absolute inset-0 rounded-full">
          {/* Electric ring animation */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border border-green-400/20 animate-pulse" />
        </div>
      )}
    </div>
  )
}
