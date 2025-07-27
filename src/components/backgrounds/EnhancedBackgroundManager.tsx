
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

interface EnhancedBackgroundManagerProps {
  settings: EnhancedBackgroundSettings
  className?: string
}

const ANIMATION_CYCLE_DURATION = 30000 // 30 seconds

export function EnhancedBackgroundManager({ 
  settings, 
  className = '' 
}: EnhancedBackgroundManagerProps) {
  const [currentSettings, setCurrentSettings] = useState(settings)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-generate new backgrounds
  useEffect(() => {
    if (!settings.autoGenerate) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        const backgroundTypes: EnhancedBackgroundType[] = ['matrix', 'neural', 'puzzle']
        const colors = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0080']
        const intensities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high']
        
        const newSettings: EnhancedBackgroundSettings = {
          type: backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)],
          intensity: intensities[Math.floor(Math.random() * intensities.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          autoGenerate: true,
          pattern: 'default',
          neuralDensity: Math.floor(Math.random() * 100) + 20
        }
        
        setCurrentSettings(newSettings)
        setIsTransitioning(false)
      }, 1000)
    }, ANIMATION_CYCLE_DURATION)

    return () => clearInterval(interval)
  }, [settings.autoGenerate])

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
      <div
        className={`transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderBackground()}
      </div>
    </div>
  )
}
