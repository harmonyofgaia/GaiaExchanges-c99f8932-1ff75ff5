import { useState, useEffect } from 'react'
import { MatrixRainBackground } from '@/components/ui/matrix-rain-background'
import { LiquidBackground } from './LiquidBackground'
import { PuzzleBackground } from './PuzzleBackground'
import { WaterBackground } from './WaterBackground'
import { NeuroBackground } from './NeuroBackground'

export type EnhancedBackgroundType = 
  | 'matrix' 
  | 'liquid' 
  | 'puzzle' 
  | 'water' 
  | 'neuro' 
  | 'animated'
  | 'daily-theme'

export interface BackgroundConfig {
  type: EnhancedBackgroundType
  intensity: 'low' | 'medium' | 'high'
  color: string
  speed: number
  autoGenerate?: boolean
}

interface EnhancedBackgroundManagerProps {
  config?: BackgroundConfig
  className?: string
}

export function EnhancedBackgroundManager({ 
  config,
  className = ''
}: EnhancedBackgroundManagerProps) {
  const [currentConfig, setCurrentConfig] = useState<BackgroundConfig>(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('gaia-enhanced-background-config')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.warn('Failed to parse saved background config')
      }
    }
    
    return config || {
      type: 'matrix',
      intensity: 'medium',
      color: '#00ff00',
      speed: 1,
      autoGenerate: false
    }
  })

  const [dailyTheme, setDailyTheme] = useState<BackgroundConfig | null>(null)

  // Daily theme generator
  useEffect(() => {
    const generateDailyTheme = () => {
      const today = new Date().toDateString()
      const savedDaily = localStorage.getItem('gaia-daily-theme')
      const savedDate = localStorage.getItem('gaia-daily-theme-date')
      
      if (savedDaily && savedDate === today) {
        try {
          setDailyTheme(JSON.parse(savedDaily))
          return
        } catch (e) {
          console.warn('Failed to parse daily theme')
        }
      }
      
      // Generate new daily theme
      const themes: EnhancedBackgroundType[] = ['matrix', 'liquid', 'puzzle', 'water', 'neuro']
      const colors = ['#00ff00', '#0080ff', '#ff00ff', '#ffff00', '#ff8000', '#8000ff']
      const intensities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']
      
      const newDailyTheme: BackgroundConfig = {
        type: themes[Math.floor(Math.random() * themes.length)],
        intensity: intensities[Math.floor(Math.random() * intensities.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5,
        autoGenerate: true
      }
      
      setDailyTheme(newDailyTheme)
      localStorage.setItem('gaia-daily-theme', JSON.stringify(newDailyTheme))
      localStorage.setItem('gaia-daily-theme-date', today)
    }

    // Generate daily theme if auto-generate is enabled
    if (currentConfig.autoGenerate || currentConfig.type === 'daily-theme') {
      generateDailyTheme()
    }

    // Check for daily theme updates every hour
    const interval = setInterval(generateDailyTheme, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [currentConfig.autoGenerate, currentConfig.type])

  // Save config changes to localStorage
  useEffect(() => {
    localStorage.setItem('gaia-enhanced-background-config', JSON.stringify(currentConfig))
  }, [currentConfig])

  // Determine active config
  const activeConfig = currentConfig.type === 'daily-theme' && dailyTheme 
    ? dailyTheme 
    : currentConfig

  const renderBackground = () => {
    switch (activeConfig.type) {
      case 'matrix':
        return (
          <MatrixRainBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
      case 'liquid':
        return (
          <LiquidBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
      case 'puzzle':
        return (
          <PuzzleBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
      case 'water':
        return (
          <WaterBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
      case 'neuro':
        return (
          <NeuroBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
      case 'animated':
        // Cycle through different backgrounds
        const animatedTypes: EnhancedBackgroundType[] = ['matrix', 'liquid', 'water', 'neuro']
        const currentType = animatedTypes[Math.floor(Date.now() / ANIMATION_CYCLE_DURATION) % animatedTypes.length]
        return renderBackgroundByType(currentType, activeConfig)
      default:
        return (
          <MatrixRainBackground
            intensity={activeConfig.intensity}
            color={activeConfig.color}
            speed={activeConfig.speed}
            className={className}
          />
        )
    }
  }

  const renderBackgroundByType = (type: EnhancedBackgroundType, config: BackgroundConfig) => {
    switch (type) {
      case 'matrix':
        return <MatrixRainBackground {...config} className={className} />
      case 'liquid':
        return <LiquidBackground {...config} className={className} />
      case 'puzzle':
        return <PuzzleBackground {...config} className={className} />
      case 'water':
        return <WaterBackground {...config} className={className} />
      case 'neuro':
        return <NeuroBackground {...config} className={className} />
      default:
        return <MatrixRainBackground {...config} className={className} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {renderBackground()}
      
      {/* Daily theme indicator */}
      {(currentConfig.type === 'daily-theme' || currentConfig.autoGenerate) && (
        <div className="fixed top-4 left-4 z-50 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-green-400 border border-green-500/30">
            🌍 Daily Theme: {activeConfig.type.charAt(0).toUpperCase() + activeConfig.type.slice(1)}
          </div>
        </div>
      )}
    </div>
  )
}

// Export function to update background config
export const updateBackgroundConfig = (newConfig: Partial<BackgroundConfig>) => {
  const current = localStorage.getItem('gaia-enhanced-background-config')
  const currentConfig = current ? JSON.parse(current) : {
    type: 'matrix',
    intensity: 'medium',
    color: '#00ff00',
    speed: 1,
    autoGenerate: false
  }
  
  const updatedConfig = { ...currentConfig, ...newConfig }
  localStorage.setItem('gaia-enhanced-background-config', JSON.stringify(updatedConfig))
  
  // Trigger storage event for other components to update
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'gaia-enhanced-background-config',
    newValue: JSON.stringify(updatedConfig)
  }))
}