
import { useLocation } from 'react-router-dom'
import { NeuralElectricBackground } from './neural-electric-background'
import { QuantumAnimatedBackground } from './quantum-animated-background'
import { OptimizedMouseAttraction } from './optimized-mouse-attraction'
import { BackgroundManager } from './background-manager'

interface PageBackgroundConfig {
  style: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'
  intensity: 'low' | 'medium' | 'high'
  useQuantum?: boolean
  useOptimized?: boolean
  useManager?: boolean
}

const pageBackgrounds: Record<string, PageBackgroundConfig> = {
  '/': { style: 'classic', intensity: 'medium', useManager: true },
  '/about': { style: 'galaxy', intensity: 'high', useOptimized: true },
  '/wallet': { style: 'matrix', intensity: 'medium', useManager: true },
  '/markets': { style: 'fire', intensity: 'high', useOptimized: true },
  '/smart-contracts': { style: 'plasma', intensity: 'medium', useManager: true },
  '/ultimate-security': { style: 'void', intensity: 'high', useQuantum: true },
  '/system-status': { style: 'ice', intensity: 'medium', useManager: true },
  '/comprehensive-status': { style: 'rainbow', intensity: 'high', useOptimized: true },
  '/downloads': { style: 'forest', intensity: 'low', useManager: true },
  '/marketing': { style: 'ocean', intensity: 'medium', useOptimized: true },
  '/reinvestments': { style: 'plasma', intensity: 'high', useManager: true },
  '/transparency': { style: 'galaxy', intensity: 'low', useManager: true },
  '/admin': { style: 'void', intensity: 'high', useQuantum: true },
  '/gaming': { style: 'fire', intensity: 'high', useOptimized: true },
  '/gaia-fighter-game': { style: 'plasma', intensity: 'high', useManager: true },
  '/live-tracking': { style: 'matrix', intensity: 'medium', useOptimized: true }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const config = pageBackgrounds[location.pathname] || { 
    style: 'classic', 
    intensity: 'medium', 
    useManager: true 
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Performance optimized background selection */}
      {config.useQuantum && <QuantumAnimatedBackground />}
      {config.useOptimized && <OptimizedMouseAttraction />}
      {config.useManager && <BackgroundManager />}
      
      {/* Fallback for pages without specific optimization */}
      {!config.useQuantum && !config.useOptimized && !config.useManager && (
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
