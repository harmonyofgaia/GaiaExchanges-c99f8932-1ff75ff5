
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
  '/ultimate-security': { style: 'void', intensity: 'high' },
  '/system-status': { style: 'ice', intensity: 'medium' },
  '/comprehensive-status': { style: 'rainbow', intensity: 'high' },
  '/downloads': { style: 'forest', intensity: 'low' },
  '/marketing': { style: 'ocean', intensity: 'medium' },
  '/reinvestments': { style: 'plasma', intensity: 'high' },
  '/transparency': { style: 'galaxy', intensity: 'low' },
  '/admin': { style: 'void', intensity: 'high', useQuantum: true }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const config = pageBackgrounds[location.pathname] || { style: 'classic', intensity: 'medium' }

  if (config.useQuantum) {
    return <QuantumAnimatedBackground />
  }

  return (
    <NeuralElectricBackground 
      style={config.style}
      intensity={config.intensity}
    />
  )
}
