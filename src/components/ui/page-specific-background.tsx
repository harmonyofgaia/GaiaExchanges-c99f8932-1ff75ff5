
import { useLocation } from 'react-router-dom'
import { NeuralMatrixBackground } from './neural-matrix-background'
import { NeuralElectricBackground } from './neural-electric-background'
import { QuantumAnimatedBackground } from './quantum-animated-background'

interface PageBackgroundStyle {
  type: 'neural-matrix' | 'neural-electric' | 'quantum' | 'hybrid'
  intensity: 'low' | 'medium' | 'high' | 'extreme'
  primaryColor: string
  secondaryColor: string
  accentColor: string
  effects: string[]
}

const pageBackgroundStyles: Record<string, PageBackgroundStyle> = {
  '/': {
    type: 'hybrid',
    intensity: 'extreme',
    primaryColor: '#00ff00',
    secondaryColor: '#00ffff',
    accentColor: '#ff00ff',
    effects: ['electrodes', 'matrix-rain', 'neural-pulses', 'quantum-entanglement']
  },
  '/gaming': {
    type: 'neural-electric',
    intensity: 'extreme',
    primaryColor: '#ff4500',
    secondaryColor: '#ff6600',
    accentColor: '#ffff00',
    effects: ['electric-shocks', 'gaming-matrix', 'power-surges']
  },
  '/admin': {
    type: 'neural-matrix',
    intensity: 'high',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a855f7',
    accentColor: '#c084fc',
    effects: ['admin-codes', 'security-grid', 'data-streams']
  },
  '/landscape-builder': {
    type: 'quantum',
    intensity: 'high',
    primaryColor: '#22c55e',
    secondaryColor: '#16a34a',
    accentColor: '#65a30d',
    effects: ['nature-matrix', 'growth-patterns', 'eco-waves']
  },
  '/gaia-fighter-game': {
    type: 'neural-electric',
    intensity: 'extreme',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    accentColor: '#f97316',
    effects: ['combat-electrodes', 'battle-matrix', 'power-lightning']
  },
  '/coin-crafter': {
    type: 'hybrid',
    intensity: 'high',
    primaryColor: '#eab308',
    secondaryColor: '#f59e0b',
    accentColor: '#d97706',
    effects: ['crypto-matrix', 'token-streams', 'blockchain-grid']
  },
  '/virtual-world': {
    type: 'quantum',
    intensity: 'extreme',
    primaryColor: '#3b82f6',
    secondaryColor: '#2563eb',
    accentColor: '#1d4ed8',
    effects: ['virtual-reality', 'dimension-shifts', 'reality-matrix']
  },
  '/exchange': {
    type: 'neural-matrix',
    intensity: 'high',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#048773',
    effects: ['trading-streams', 'market-matrix', 'price-waves']
  },
  '/nfts': {
    type: 'neural-electric',
    intensity: 'high',
    primaryColor: '#ec4899',
    secondaryColor: '#db2777',
    accentColor: '#be185d',
    effects: ['art-electrodes', 'creative-matrix', 'digital-sparks']
  },
  '/analytics': {
    type: 'hybrid',
    intensity: 'medium',
    primaryColor: '#06b6d4',
    secondaryColor: '#0891b2',
    accentColor: '#0e7490',
    effects: ['data-visualization', 'analytics-grid', 'metrics-flow']
  }
}

export function PageSpecificBackground() {
  const location = useLocation()
  const style = pageBackgroundStyles[location.pathname] || pageBackgroundStyles['/']

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(ellipse at center, ${style.primaryColor}10 0%, ${style.secondaryColor}05 50%, transparent 100%)`
      }}
    >
      {/* Base neural matrix for all pages */}
      {(style.type === 'neural-matrix' || style.type === 'hybrid') && (
        <NeuralMatrixBackground />
      )}
      
      {/* Electric effects for high-intensity pages */}
      {(style.type === 'neural-electric' || style.type === 'hybrid') && (
        <NeuralElectricBackground 
          style="bioelectric" 
          intensity={style.intensity} 
        />
      )}
      
      {/* Quantum animations for special pages */}
      {(style.type === 'quantum' || style.type === 'hybrid') && (
        <QuantumAnimatedBackground 
          primaryColor={style.primaryColor}
          secondaryColor={style.secondaryColor}
          accentColor={style.accentColor}
        />
      )}
      
      {/* Page-specific electrode effects */}
      <div className="absolute inset-0">
        {style.effects.includes('electrodes') && (
          <div className="electrode-field">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`electrode-${i}`}
                className="absolute w-1 h-1 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: style.accentColor,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random()}s`,
                  boxShadow: `0 0 10px ${style.accentColor}`
                }}
              />
            ))}
          </div>
        )}
        
        {style.effects.includes('electric-shocks') && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={`shock-${i}`}>
                <line
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke={style.primaryColor}
                  strokeWidth="2"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{
                    filter: `drop-shadow(0 0 5px ${style.primaryColor})`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              </g>
            ))}
          </svg>
        )}
      </div>
      
      {/* Enhanced visibility overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 0%, ${style.primaryColor}02 25%, transparent 50%, ${style.secondaryColor}02 75%, transparent 100%)`,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
    </div>
  )
}
