
import { useState, useEffect } from 'react'
import { MatrixRainBackground } from './MatrixRainBackground'
import { NeuroBackground } from './NeuroBackground'
import { PuzzleBackground } from './PuzzleBackground'

export type EnhancedBackgroundType = 'matrix' | 'neural' | 'puzzle' | 'particles' | 'waves'

export interface EnhancedBackgroundSettings {
  type: EnhancedBackgroundType
  intensity: 'low' | 'medium' | 'high'
  color: string
  speed: number
  autoGenerate?: boolean
  pattern?: string
  neuralDensity?: number
}

export interface BackgroundConfig {
  type: EnhancedBackgroundType
  intensity: 'low' | 'medium' | 'high'
  color: string
  speed: number
  autoGenerate?: boolean
  pattern?: string
  neuralDensity?: number
}

interface EnhancedBackgroundManagerProps {
  settings?: EnhancedBackgroundSettings
  className?: string
}

// Default stable matrix settings
const DEFAULT_MATRIX_SETTINGS: EnhancedBackgroundSettings = {
  type: 'matrix',
  intensity: 'medium',
  color: '#00ff00',
  speed: 1,
  autoGenerate: false
}

export function EnhancedBackgroundManager({ 
  settings = DEFAULT_MATRIX_SETTINGS, 
  className = '' 
}: EnhancedBackgroundManagerProps) {
  const [currentSettings] = useState(settings)

  const renderBackground = () => {
    const baseProps = {
      intensity: currentSettings.intensity,
      color: currentSettings.color,
      speed: currentSettings.speed
    }

    switch (currentSettings.type) {
      case 'matrix':
        return <MatrixRainBackground {...baseProps} />
      
      case 'neural':
        return (
          <NeuroBackground 
            {...baseProps} 
            pattern={currentSettings.pattern as 'default' | 'creative' | 'abstract' | 'organic' | 'geometric'}
            neuralDensity={currentSettings.neuralDensity}
          />
        )
      
      case 'puzzle':
        return <PuzzleBackground {...baseProps} />
      
      default:
        return <MatrixRainBackground {...baseProps} />
    }
  }

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {renderBackground()}
    </div>
  )
}

export function updateBackgroundConfig(config: BackgroundConfig) {
  console.log('Updating background config:', config)
}
