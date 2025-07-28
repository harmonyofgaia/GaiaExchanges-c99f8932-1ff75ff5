
import { GAIA_BRANDING } from '@/constants/branding'

interface GaiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'matrix' | 'glow'
  className?: string
  showText?: boolean
}

export function GaiaLogo({ 
  size = 'md', 
  variant = 'default', 
  className = '', 
  showText = true 
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

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} flex items-center gap-3`}>
      <div className="relative">
        {/* Animated Earth Logo */}
        <div className="relative text-4xl font-bold">
          {/* Main Earth with rotating animation */}
          <div className="relative animate-spin" style={{animationDuration: '20s'}}>
            🌍
          </div>
          
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-ping" style={{animationDuration: '3s'}} />
          <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-pulse" style={{animationDuration: '2s'}} />
          
          {/* Matrix effect overlay */}
          {variant === 'matrix' && (
            <>
              <div className="absolute inset-0 text-green-300 animate-ping opacity-20" style={{animationDelay: '0.5s'}}>
                🌍
              </div>
              <div className="absolute inset-0 text-green-500 animate-pulse opacity-10" style={{animationDelay: '1s'}}>
                🌍
              </div>
            </>
          )}
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute -top-2 -right-2 text-yellow-400 text-xs animate-bounce" style={{animationDelay: '0.5s'}}>
          ⭐
        </div>
        <div className="absolute -bottom-2 -left-2 text-blue-400 text-xs animate-pulse" style={{animationDelay: '1s'}}>
          💎
        </div>
        <div className="absolute top-0 left-1/2 text-green-300 text-xs animate-ping" style={{animationDelay: '1.5s'}}>
          🌱
        </div>
        
        {/* Energy particles */}
        <div className="absolute top-1/2 -right-1 text-green-400 text-xs animate-pulse opacity-70" style={{animationDelay: '2s'}}>
          ⚡
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-green-400 leading-tight animate-pulse">
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
