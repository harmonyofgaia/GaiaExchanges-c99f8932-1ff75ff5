
import React from 'react'

interface GaiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white-fade' | 'full-color'
  className?: string
  onClick?: () => void
}

export const GaiaLogo: React.FC<GaiaLogoProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const getLogoStyle = () => {
    switch (variant) {
      case 'white-fade':
        return {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.1) 100%)',
          borderRadius: '12px',
          padding: '8px'
        }
      case 'full-color':
        return {
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '4px'
        }
      default:
        return {}
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
    }
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${className} cursor-pointer hover:scale-105 transition-transform duration-300`}
      style={getLogoStyle()}
      onClick={handleClick}
      title="Gaia of Harmony - GAiA Token"
    >
      <img 
        src="/lovable-uploads/cd880f33-2b91-4417-bb7b-8f80a79e1e58.png"
        alt="Gaia of Harmony - GAiA Token Official Logo"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  )
}
