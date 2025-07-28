
import { GAIA_BRANDING } from '@/constants/branding'

interface GaiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'matrix' | 'glow'
  className?: string
  showText?: boolean
  animated?: boolean
}

export function GaiaLogo({ 
  size = 'md', 
  variant = 'default', 
  className = '', 
  showText = true,
  animated = false
}: GaiaLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  }

  const variantClasses = {
    default: 'text-green-400',
    matrix: 'text-green-400 animate-pulse shadow-green-400/50',
    glow: 'text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]'
  }

  const animationClass = animated ? 'animate-spin' : ''

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} flex items-center gap-3`}>
      <div className="relative">
        {/* Main Logo Symbol */}
        <div className={`text-4xl font-bold relative ${animationClass}`}>
          🌍
          {variant === 'matrix' && (
            <div className="absolute inset-0 text-green-300 animate-ping opacity-30">
              🌍
            </div>
          )}
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute -top-1 -right-1 text-green-400 text-xs animate-spin">
          ⚡
        </div>
        <div className="absolute -bottom-1 -left-1 text-blue-400 text-xs animate-pulse">
          💎
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-green-400 leading-tight">
            {GAIA_BRANDING.NAME}
          </span>
          <span className="text-xs text-green-300 opacity-80 leading-tight">
            Web3 Exchange
          </span>
        </div>
      )}
    </div>
  )
}
