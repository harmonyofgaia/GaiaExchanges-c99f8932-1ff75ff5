
import { useLocation } from 'react-router-dom'
import { NeuralElectricBackground } from './neural-electric-background'
import { QuantumAnimatedBackground } from './quantum-animated-background'

interface PageBackgroundConfig {
  style: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'
  intensity: 'low' | 'medium' | 'high'
  useQuantum?: boolean
}

const pageBackgrounds: Record<string, PageBackgroundConfig> = {
  '/': { style: 'classic', intensity: 'medium' },
  '/about': { style: 'galaxy', intensity: 'high' },
  '/wallet': { style: 'matrix', intensity: 'medium' },
  '/markets': { style: 'fire', intensity: 'high' },
  '/smart-contracts': { style: 'plasma', intensity: 'medium' },
  '/ultimate-security': { style: 'void', intensity: 'high', useQuantum: true },
  '/system-status': { style: 'ice', intensity: 'medium' },
  '/comprehensive-status': { style: 'rainbow', intensity: 'high' },
  '/downloads': { style: 'forest', intensity: 'low' },
  '/marketing': { style: 'ocean', intensity: 'medium' },
  '/reinvestments': { style: 'plasma', intensity: 'high' },
  '/transparency': { style: 'galaxy', intensity: 'low' },
  '/admin': { style: 'void', intensity: 'high', useQuantum: true },
  '/gaming': { style: 'fire', intensity: 'high' },
  '/gaia-fighter-game': { style: 'plasma', intensity: 'high' },
  '/live-tracking': { style: 'matrix', intensity: 'medium' }
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
      
      {/* Enhanced visual layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
    </div>
  )
}
