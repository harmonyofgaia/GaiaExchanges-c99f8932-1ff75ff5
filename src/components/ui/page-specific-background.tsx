
import { useLocation } from 'react-router-dom'
import { NeuralElectricBackground } from './neural-electric-background'
import { QuantumAnimatedBackground } from './quantum-animated-background'

interface PageBackgroundConfig {
  style: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'
  intensity: 'low' | 'medium' | 'high'
  useQuantum?: boolean
  disableMouseInteraction?: boolean
}

const pageBackgrounds: Record<string, PageBackgroundConfig> = {
  '/': { style: 'classic', intensity: 'high' },
  '/gaming': { style: 'fire', intensity: 'high' },
  '/gaias-exchange': { style: 'matrix', intensity: 'medium' },
  '/markets': { style: 'plasma', intensity: 'high' },
  '/artist-streaming': { style: 'rainbow', intensity: 'medium' },
  '/virtual-world': { style: 'galaxy', intensity: 'high' },
  '/wallet': { style: 'ice', intensity: 'medium' },
  '/ultimate-security': { style: 'void', intensity: 'high', useQuantum: true },
  '/system-status': { style: 'ocean', intensity: 'low' },
  '/comprehensive-status': { style: 'forest', intensity: 'medium' },
  '/downloads': { style: 'forest', intensity: 'low' },
  '/marketing': { style: 'ocean', intensity: 'medium' },
  '/transparency': { style: 'galaxy', intensity: 'low' },
  '/admin': { style: 'void', intensity: 'high', useQuantum: true },
  '/gaia-fighter-game': { style: 'fire', intensity: 'high' },
  '/live-tracking': { style: 'matrix', intensity: 'low', disableMouseInteraction: true },
  '/profile': { style: 'plasma', intensity: 'medium' },
  '/contact': { style: 'ocean', intensity: 'medium' },
  '/docs': { style: 'ice', intensity: 'low' }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const config = pageBackgrounds[location.pathname] || { 
    style: 'classic', 
    intensity: 'medium' 
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {config.useQuantum ? (
        <QuantumAnimatedBackground />
      ) : (
        <NeuralElectricBackground 
          style={config.style}
          intensity={config.intensity}
        />
      )}
      
      {/* Enhanced visual layers with art textures */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 ${
        config.disableMouseInteraction ? 'opacity-30' : ''
      }`} />
      
      {/* Nature art overlay with uploaded images */}
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-5 mix-blend-soft-light ${
        config.disableMouseInteraction ? 'opacity-3' : ''
      }`} />
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-3 mix-blend-overlay ${
        config.disableMouseInteraction ? 'opacity-2' : ''
      }`} />
      
      {/* Dynamic color gradients based on page style */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-20' : ''
      }`} />
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-20' : ''
      }`} />
      
      {/* Disable mouse attraction background for live-tracking */}
      {config.disableMouseInteraction && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      )}
    </div>
  )
}
