
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
      <div className="relative w-12 h-12">
        {/* Core Earth with floating holographic effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Main earth globe with subtle rotation */}
            <div className="text-2xl animate-spin" style={{animationDuration: '30s', transformOrigin: 'center'}}>
              🌍
            </div>
            
            {/* Holographic glow layers */}
            <div className="absolute inset-0 text-2xl text-cyan-400 opacity-20 animate-pulse" 
                 style={{animationDelay: '0.3s', filter: 'blur(1px)'}}>
              🌍
            </div>
            <div className="absolute inset-0 text-2xl text-blue-300 opacity-15 animate-pulse" 
                 style={{animationDelay: '0.6s', filter: 'blur(2px)'}}>
              🌍
            </div>
          </div>
        </div>

        {/* Orbital energy rings */}
        <div className="absolute inset-0">
          {/* Inner energy ring */}
          <div className="absolute inset-2 border border-green-400/40 rounded-full animate-spin" 
               style={{animationDuration: '8s', animationDirection: 'reverse'}} />
          
          {/* Middle energy ring */}
          <div className="absolute inset-1 border border-blue-400/30 rounded-full animate-spin" 
               style={{animationDuration: '12s'}} />
          
          {/* Outer energy ring */}
          <div className="absolute inset-0 border border-cyan-300/20 rounded-full animate-spin" 
               style={{animationDuration: '16s', animationDirection: 'reverse'}} />
        </div>

        {/* Floating energy particles */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <div className="text-green-300 text-xs animate-bounce opacity-80" 
               style={{animationDelay: '0s', animationDuration: '2s'}}>
            ✨
          </div>
        </div>
        
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
          <div className="text-blue-300 text-xs animate-bounce opacity-80" 
               style={{animationDelay: '0.5s', animationDuration: '2.5s'}}>
            ⚡
          </div>
        </div>
        
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="text-cyan-300 text-xs animate-bounce opacity-80" 
               style={{animationDelay: '1s', animationDuration: '3s'}}>
            💫
          </div>
        </div>
        
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
          <div className="text-emerald-300 text-xs animate-bounce opacity-80" 
               style={{animationDelay: '1.5s', animationDuration: '2.2s'}}>
            🌟
          </div>
        </div>

        {/* Pulsing energy core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-ping opacity-60" 
               style={{animationDuration: '3s'}} />
        </div>

        {/* Matrix variant enhancements */}
        {variant === 'matrix' && (
          <>
            {/* Digital rain effect simulation */}
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-20">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-green-400 via-transparent to-green-400 animate-pulse" 
                   style={{animationDelay: '0.2s'}} />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-green-300 via-transparent to-green-300 animate-pulse" 
                   style={{animationDelay: '0.8s'}} />
              <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-green-500 via-transparent to-green-500 animate-pulse" 
                   style={{animationDelay: '1.2s'}} />
            </div>
            
            {/* Matrix code overlay */}
            <div className="absolute inset-0 text-green-400 text-xs opacity-10 animate-pulse font-mono">
              <div className="absolute top-1 left-1">1</div>
              <div className="absolute top-1 right-1">0</div>
              <div className="absolute bottom-1 left-1">0</div>
              <div className="absolute bottom-1 right-1">1</div>
            </div>
          </>
        )}
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
