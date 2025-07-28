
import { useEffect, useState } from 'react'

interface UniversalGaiaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive'
  variant?: 'default' | 'white' | 'dark' | 'colorful' | 'exchange'
  position?: 'left' | 'center' | 'right'
  animated?: boolean
  showText?: boolean
  className?: string
  onClick?: () => void
}

export function UniversalGaiaLogo({ 
  size = 'md', 
  variant = 'default', 
  position = 'left',
  animated = true,
  showText = true,
  className = '',
  onClick
}: UniversalGaiaLogoProps) {
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(1)

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12', 
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    responsive: 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20'
  }

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl', 
    xl: 'text-4xl',
    responsive: 'text-sm md:text-lg lg:text-2xl'
  }

  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  const variantStyles = {
    default: 'filter-none',
    white: 'brightness-0 invert',
    dark: 'brightness-0',
    colorful: 'hue-rotate-180 saturate-150',
    exchange: 'opacity-90 hover:opacity-100'
  }

  useEffect(() => {
    if (!animated) return
    
    const animationInterval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 4)
    }, 3000)

    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.8 : 1)
    }, 2000)
    
    return () => {
      clearInterval(animationInterval)
      clearInterval(glowInterval)
    }
  }, [animated])

  const getAnimationClass = () => {
    if (!animated) return ''
    
    switch (currentAnimation) {
      case 0: return 'animate-pulse'
      case 1: return 'animate-bounce'
      case 2: return 'hover:scale-110 transition-transform duration-500'
      case 3: return 'animate-spin'
      default: return ''
    }
  }

  const getAdvancedGlowStyle = () => {
    if (!animated) return {}
    
    return {
      filter: `drop-shadow(0 0 ${20 * glowIntensity}px rgba(34, 197, 94, ${0.8 * glowIntensity})) 
               drop-shadow(0 0 ${40 * glowIntensity}px rgba(22, 163, 74, ${0.6 * glowIntensity}))
               drop-shadow(0 0 ${60 * glowIntensity}px rgba(21, 128, 61, ${0.4 * glowIntensity}))`,
      transition: 'filter 2s ease-in-out'
    }
  }

  return (
    <div className={`flex items-center gap-3 ${positionClasses[position]} ${className}`}>
      {/* Enhanced Animated Background Effect */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse rounded-full blur-2xl" 
               style={{ animationDuration: '4s' }} />
          <div className="absolute w-full h-full bg-gradient-to-l from-emerald-500/15 via-transparent to-blue-500/15 animate-pulse rounded-full" 
               style={{ animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-green-300/20 via-transparent to-cyan-400/20 animate-pulse rounded-full" 
               style={{ animationDuration: '8s', animationDelay: '4s' }} />
        </div>
      )}
      
      {/* Logo Container with Enhanced Effects */}
      <div 
        className={`relative ${sizeClasses[size]} ${getAnimationClass()} cursor-pointer group`}
        onClick={onClick}
        style={getAdvancedGlowStyle()}
      >
        {/* Multi-Layer Glow Effects */}
        {animated && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-emerald-400/20 to-cyan-400/30 rounded-full blur-xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 bg-gradient-to-tl from-green-300/25 via-transparent to-blue-400/25 rounded-full blur-lg animate-pulse" 
                 style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-green-500/15 rounded-full blur-2xl animate-ping" 
                 style={{ animationDuration: '4s' }} />
          </>
        )}
        
        {/* Main Logo with Enhanced Animations */}
        <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
          <img 
            src="/lovable-uploads/92accea3-19a3-48db-bd65-888252fd27e7.png"
            alt="Gaia's Exchanges Logo"
            className={`w-full h-full object-contain ${variantStyles[variant]} transition-all duration-300 
                       group-hover:brightness-110 group-hover:saturate-110`}
          />
        </div>
        
        {/* Enhanced Overlay Effects */}
        {animated && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-400/15 to-transparent rounded-full animate-spin opacity-60" 
                 style={{ animationDuration: '12s' }} />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-emerald-400/15 to-transparent rounded-full animate-spin opacity-40" 
                 style={{ animationDuration: '16s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rounded-full animate-pulse opacity-50" 
                 style={{ animationDuration: '6s' }} />
          </>
        )}

        {/* Orbiting Particles */}
        {animated && (
          <>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-80" 
                 style={{ animationDelay: '0s', animationDuration: '2s' }} />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60" 
                 style={{ animationDelay: '1s', animationDuration: '3s' }} />
            <div className="absolute top-0 -left-3 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-70" 
                 style={{ animationDelay: '2s', animationDuration: '4s' }} />
          </>
        )}
      </div>

      {/* Company Text with Enhanced Styling */}
      {showText && (
        <div className="relative z-10">
          <div className={`font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent ${textSizeClasses[size]}
                          ${animated ? 'animate-pulse' : ''}`}
               style={animated ? { 
                 textShadow: `0 0 20px rgba(34, 197, 94, 0.5)`,
                 animationDuration: '3s' 
               } : {}}>
            Gaia's Exchanges
          </div>
          {size !== 'xs' && size !== 'sm' && (
            <div className={`text-muted-foreground ${size === 'responsive' ? 'text-xs md:text-sm' : 'text-xs'} opacity-80
                            ${animated ? 'animate-pulse' : ''}`}
                 style={animated ? { animationDuration: '4s', animationDelay: '1s' } : {}}>
              Ultimate Web3 Platform
            </div>
          )}
        </div>
      )}

      {/* Additional Ambient Glow */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-full bg-gradient-to-r from-green-500/5 via-emerald-400/10 to-cyan-500/5 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '8s' }} />
        </div>
      )}
    </div>
  )
}
