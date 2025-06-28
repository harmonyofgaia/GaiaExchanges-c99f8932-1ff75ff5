
import React from 'react'
import { GaiaLogo } from './GaiaLogo'

interface AdvertisingHeaderProps {
  title?: string
  subtitle?: string
  className?: string
}

export const AdvertisingHeader: React.FC<AdvertisingHeaderProps> = ({
  title = "Gaia's Exchanges",
  subtitle = "Culture of Harmony - Together We Make The World A Better Place",
  className = ""
}) => {
  const handleLogoClick = () => {
    window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
  }

  return (
    <div 
      className={`relative w-full h-64 bg-cover bg-center rounded-lg overflow-hidden ${className}`}
      style={{ 
        backgroundImage: `url(/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png)` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-4">
            <GaiaLogo 
              size="xl" 
              variant="white-fade" 
              onClick={handleLogoClick}
              className="mx-auto"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-green-300 text-lg md:text-xl font-medium drop-shadow-md">
            {subtitle}
          </p>
          <div className="mt-4 px-6 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
            <span className="text-green-300 text-sm font-medium">
              World's Most Secure Crypto Exchange
            </span>
          </div>
          <div className="mt-3">
            <button
              onClick={handleLogoClick}
              className="text-xs text-blue-300 hover:text-blue-200 underline transition-colors duration-300"
            >
              🌍 Explore All Harmony of Gaia Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
