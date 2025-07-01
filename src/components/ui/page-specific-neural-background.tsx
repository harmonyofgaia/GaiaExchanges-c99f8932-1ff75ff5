
import { useLocation } from 'react-router-dom'
import { NeuralElectricMatrix } from './neural-electric-matrix'
import { NeuralElectricBackground } from './neural-electric-background'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

interface PageStyle {
  backgroundType: 'matrix' | 'neural' | 'hybrid'
  intensity: 'low' | 'medium' | 'high'
  colorScheme: 'cyan' | 'purple' | 'green' | 'rainbow' | 'fire' | 'bioelectric' | 'synaptic'
  flowDirection: 'horizontal' | 'vertical' | 'radial' | 'spiral'
  logoPosition: 'top-left' | 'top-center' | 'top-right'
}

const pageStyles: Record<string, PageStyle> = {
  '/': { 
    backgroundType: 'hybrid', 
    intensity: 'high', 
    colorScheme: 'rainbow',
    flowDirection: 'radial',
    logoPosition: 'top-right'
  },
  '/admin': { 
    backgroundType: 'matrix', 
    intensity: 'high', 
    colorScheme: 'purple',
    flowDirection: 'spiral',
    logoPosition: 'top-left'
  },
  '/gaming': { 
    backgroundType: 'neural', 
    intensity: 'high', 
    colorScheme: 'fire',
    flowDirection: 'vertical',
    logoPosition: 'top-center'
  },
  '/landscape-builder': { 
    backgroundType: 'hybrid', 
    intensity: 'medium', 
    colorScheme: 'green',
    flowDirection: 'radial',
    logoPosition: 'top-left'
  },
  '/gaia-fighter-game': { 
    backgroundType: 'neural', 
    intensity: 'high', 
    colorScheme: 'bioelectric',
    flowDirection: 'spiral',
    logoPosition: 'top-right'
  },
  '/coin-crafter': { 
    backgroundType: 'matrix', 
    intensity: 'medium', 
    colorScheme: 'cyan',
    flowDirection: 'horizontal',
    logoPosition: 'top-center'
  },
  '/ultimate-security': { 
    backgroundType: 'hybrid', 
    intensity: 'high', 
    colorScheme: 'synaptic',
    flowDirection: 'spiral',
    logoPosition: 'top-left'
  }
}

export function PageSpecificNeuralBackground() {
  const location = useLocation()
  const style = pageStyles[location.pathname] || pageStyles['/']

  const handleLogoClick = () => {
    window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }}>
      {/* Base neural background with deep space feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Matrix overlay for matrix or hybrid types */}
      {(style.backgroundType === 'matrix' || style.backgroundType === 'hybrid') && (
        <NeuralElectricMatrix />
      )}
      
      {/* Neural pathways for neural or hybrid types */}
      {(style.backgroundType === 'neural' || style.backgroundType === 'hybrid') && (
        <NeuralElectricBackground 
          style={style.colorScheme} 
          intensity={style.intensity}
        />
      )}
      
      {/* Flowing electrical currents based on direction */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: style.intensity === 'high' ? 12 : style.intensity === 'medium' ? 8 : 5 }).map((_, i) => (
          <div
            key={`flow-${i}`}
            className={`absolute opacity-20 animate-pulse`}
            style={{
              ...(style.flowDirection === 'horizontal' ? {
                width: '100%',
                height: '2px',
                top: `${10 + i * 15}%`,
                left: '0',
                background: `linear-gradient(to right, transparent 0%, ${
                  style.colorScheme === 'cyan' ? '#00ffff' :
                  style.colorScheme === 'purple' ? '#ff00ff' :
                  style.colorScheme === 'green' ? '#00ff00' :
                  style.colorScheme === 'fire' ? '#ff4500' :
                  style.colorScheme === 'bioelectric' ? '#00ff88' :
                  style.colorScheme === 'synaptic' ? '#ff00ff' : '#ffffff'
                } 50%, transparent 100%)`
              } : {
                width: '2px',
                height: '100%',
                left: `${15 + i * 12}%`,
                top: '0',
                background: `linear-gradient(to bottom, transparent 0%, ${
                  style.colorScheme === 'cyan' ? '#00ffff' :
                  style.colorScheme === 'purple' ? '#ff00ff' :
                  style.colorScheme === 'green' ? '#00ff00' :
                  style.colorScheme === 'fire' ? '#ff4500' :
                  style.colorScheme === 'bioelectric' ? '#00ff88' :
                  style.colorScheme === 'synaptic' ? '#ff00ff' : '#ffffff'
                } 50%, transparent 100%)`
              }),
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.4}s`
            }}
          />
        ))}
      </div>
      
      {/* Corner neural node clusters */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent animate-pulse" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent animate-pulse" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-500/10 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-500/10 to-transparent animate-pulse" />
      
      {/* Universal Gaia Logo positioned per page */}
      <div className="pointer-events-auto">
        <UniversalGaiaLogo 
          size="md"
          animated={true}
          position={style.logoPosition}
          onClick={handleLogoClick}
        />
      </div>
    </div>
  )
}
