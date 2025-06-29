
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
  '/': { style: 'classic', intensity: 'medium' },
  '/gaming': { style: 'fire', intensity: 'medium' },
  '/gaias-exchange': { style: 'matrix', intensity: 'low' },
  '/markets': { style: 'plasma', intensity: 'medium' },
  '/artist-streaming': { style: 'rainbow', intensity: 'low' },
  '/virtual-world': { style: 'galaxy', intensity: 'medium' },
  '/wallet': { style: 'ice', intensity: 'low' },
  '/ultimate-security': { style: 'void', intensity: 'medium', useQuantum: true },
  '/system-status': { style: 'ocean', intensity: 'low' },
  '/comprehensive-status': { style: 'forest', intensity: 'low' },
  '/downloads': { style: 'forest', intensity: 'low' },
  '/marketing': { style: 'ocean', intensity: 'low' },
  '/transparency': { style: 'galaxy', intensity: 'low' },
  '/admin': { style: 'void', intensity: 'medium', useQuantum: true },
  '/gaia-fighter-game': { style: 'fire', intensity: 'medium' },
  '/live-tracking': { style: 'matrix', intensity: 'low', disableMouseInteraction: true },
  '/profile': { style: 'plasma', intensity: 'low' },
  '/contact': { style: 'ocean', intensity: 'low' },
  '/docs': { style: 'ice', intensity: 'low' }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const config = pageBackgrounds[location.pathname] || { 
    style: 'classic', 
    intensity: 'low' 
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
      
      {/* Reduced opacity background layers to prevent content covering */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/15 ${
        config.disableMouseInteraction ? 'opacity-20' : ''
      }`} />
      
      {/* Very subtle nature art overlay */}
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-2 mix-blend-soft-light ${
        config.disableMouseInteraction ? 'opacity-1' : ''
      }`} />
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-1 mix-blend-overlay ${
        config.disableMouseInteraction ? 'opacity-1' : ''
      }`} />
      
      {/* Very subtle dynamic color gradients */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.05)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-10' : ''
      }`} />
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.05)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-10' : ''
      }`} />
    </div>
  )
}
