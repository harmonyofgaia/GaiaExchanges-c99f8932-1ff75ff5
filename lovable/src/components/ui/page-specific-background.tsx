
import { useLocation } from 'react-router-dom'
import { NeuralElectricBackground } from './neural-electric-background'
import { QuantumAnimatedBackground } from './quantum-animated-background'

interface PageBackgroundConfig {
  style: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix' | 'neural' | 'synaptic' | 'bioelectric'
  intensity: 'low' | 'medium' | 'high'
  useQuantum?: boolean
  useNeural?: boolean
  disableMouseInteraction?: boolean
}

const pageBackgrounds: Record<string, PageBackgroundConfig> = {
  '/': { style: 'neural', intensity: 'medium', useNeural: true },
  '/gaming': { style: 'bioelectric', intensity: 'medium', useNeural: true },
  '/gaias-exchange': { style: 'synaptic', intensity: 'low', useNeural: true },
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
  '/gaia-fighter-game': { style: 'bioelectric', intensity: 'high', useNeural: true },
  '/live-tracking': { style: 'synaptic', intensity: 'low', disableMouseInteraction: true, useNeural: true },
  '/profile': { style: 'neural', intensity: 'low', useNeural: true },
  '/contact': { style: 'ocean', intensity: 'low' },
  '/docs': { style: 'ice', intensity: 'low' }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const config = pageBackgrounds[location.pathname] || { 
    style: 'neural', 
    intensity: 'low',
    useNeural: true
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ zIndex: -1 }}>
      {config.useQuantum ? (
        <QuantumAnimatedBackground />
      ) : config.useNeural ? (
        <NeuralElectricBackground 
          style={config.style}
          intensity={config.intensity}
        />
      ) : (
        <NeuralElectricBackground 
          style={config.style}
          intensity={config.intensity}
        />
      )}
      
      {/* Reduced opacity background layers with proper z-index */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-black/3 to-black/8 ${
        config.disableMouseInteraction ? 'opacity-10' : ''
      }`} style={{ zIndex: -1 }} />
      
      {/* Very subtle neural network inspired overlays */}
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png')] bg-cover bg-center opacity-1 mix-blend-soft-light ${
        config.disableMouseInteraction ? 'opacity-1' : ''
      }`} style={{ zIndex: -1 }} />
      <div className={`absolute inset-0 bg-[url('/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png')] bg-cover bg-center opacity-1 mix-blend-overlay ${
        config.disableMouseInteraction ? 'opacity-1' : ''
      }`} style={{ zIndex: -1 }} />
      
      {/* Neural pathway gradients */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.08)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-5' : ''
      }`} style={{ zIndex: -1 }} />
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,100,200,0.06)_0%,transparent_50%)] ${
        config.disableMouseInteraction ? 'opacity-5' : ''
      }`} style={{ zIndex: -1 }} />
    </div>
  )
}
