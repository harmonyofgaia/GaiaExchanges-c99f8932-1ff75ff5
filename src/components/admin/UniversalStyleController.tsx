
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Palette, 
  Type, 
  Settings, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Sparkles,
  Zap,
  Crown,
  Shield,
  Brush,
  Image,
  Layers,
  Rainbow,
  Wand2,
  Contrast,
  Sun,
  Moon,
  Star,
  Flame
} from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { toast } from 'sonner'

interface StyleState {
  typography: {
    mainTitle: string
    bodyFont: string
    size: number
    weight: number
    letterSpacing: number
    lineHeight: number
  }
  background: {
    style: string
    intensity: number
    neural: boolean
    matrix: boolean
    particles: boolean
    waves: boolean
    gradient: string
    opacity: number
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  effects: {
    shadows: boolean
    glow: boolean
    blur: number
    contrast: number
    brightness: number
    saturation: number
    hue: number
  }
  layout: {
    spacing: number
    borderRadius: number
    animation: string
    transition: string
  }
  matrix: {
    enabled: boolean
    speed: number
    density: number
    color: string
    fadeEffect: boolean
  }
}

interface VersionHistory {
  id: string
  timestamp: string
  state: StyleState
  description: string
}

export function UniversalStyleController() {
  const { isAdmin } = useSecureAdmin()
  const [isVisible, setIsVisible] = useState(false)
  const [currentStyle, setCurrentStyle] = useState<StyleState>({
    typography: {
      mainTitle: 'Playfair Display',
      bodyFont: 'Inter',
      size: 100,
      weight: 900,
      letterSpacing: 0,
      lineHeight: 1.5
    },
    background: {
      style: 'neural-matrix',
      intensity: 80,
      neural: true,
      matrix: true,
      particles: false,
      waves: false,
      gradient: 'radial',
      opacity: 90
    },
    colors: {
      primary: '#10b981',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      text: '#ffffff',
      background: '#000000'
    },
    effects: {
      shadows: true,
      glow: true,
      blur: 0,
      contrast: 100,
      brightness: 100,
      saturation: 100,
      hue: 0
    },
    layout: {
      spacing: 16,
      borderRadius: 8,
      animation: 'smooth',
      transition: 'all 0.3s ease'
    },
    matrix: {
      enabled: true,
      speed: 50,
      density: 20,
      color: '#00ff00',
      fadeEffect: true
    }
  })
  const [versionHistory, setVersionHistory] = useState<VersionHistory[]>([])
  const [showController, setShowController] = useState(false)
  const [activeSection, setActiveSection] = useState('typography')

  // Load admin preferences
  useEffect(() => {
    if (isAdmin) {
      const savedVisibility = localStorage.getItem('admin-style-controller-visible')
      setIsVisible(savedVisibility === 'true')
      
      const savedHistory = localStorage.getItem('admin-version-history')
      if (savedHistory) {
        setVersionHistory(JSON.parse(savedHistory))
      }
    }
  }, [isAdmin])

  if (!isAdmin) return null

  const fontOptions = [
    'Playfair Display', 'Cinzel', 'Cinzel Decorative', 'Georgia', 'Times New Roman',
    'Arial', 'Helvetica', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Dancing Script', 'Pacifico', 'Righteous', 'Orbitron', 'Exo 2', 'Audiowide'
  ]

  const backgroundStyles = [
    'neural-matrix', 'quantum-plasma', 'dragon-fire', 'cosmic-void', 'organic-forest',
    'electric-storm', 'digital-rain', 'holographic', 'neon-cyber', 'aurora-borealis',
    'underwater-depths', 'space-nebula', 'fire-phoenix', 'ice-crystal', 'rainbow-prism'
  ]

  const animationStyles = [
    'smooth', 'bouncy', 'elastic', 'sharp', 'slow-motion', 'hyper-speed',
    'pulsing', 'floating', 'rotating', 'sliding', 'fading', 'morphing'
  ]

  const saveVersion = (description: string) => {
    const newVersion: VersionHistory = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      state: { ...currentStyle },
      description
    }
    
    const updatedHistory = [newVersion, ...versionHistory.slice(0, 19)]
    setVersionHistory(updatedHistory)
    localStorage.setItem('admin-version-history', JSON.stringify(updatedHistory))
    
    toast.success('🎨 Style Version Saved!', {
      description: `"${description}" added to version history`,
      duration: 3000
    })
  }

  const rollbackToVersion = (version: VersionHistory) => {
    setCurrentStyle(version.state)
    applyGlobalStyles(version.state)
    
    toast.success('🔄 Rolled Back Successfully!', {
      description: `Restored to: ${version.description}`,
      duration: 3000
    })
  }

  const applyGlobalStyles = (style: StyleState) => {
    const root = document.documentElement
    
    // Typography
    root.style.setProperty('--admin-title-font', style.typography.mainTitle)
    root.style.setProperty('--admin-body-font', style.typography.bodyFont)
    root.style.setProperty('--admin-font-size', `${style.typography.size}%`)
    root.style.setProperty('--admin-font-weight', style.typography.weight.toString())
    root.style.setProperty('--admin-letter-spacing', `${style.typography.letterSpacing}px`)
    root.style.setProperty('--admin-line-height', style.typography.lineHeight.toString())
    
    // Colors
    root.style.setProperty('--admin-primary', style.colors.primary)
    root.style.setProperty('--admin-secondary', style.colors.secondary)
    root.style.setProperty('--admin-accent', style.colors.accent)
    root.style.setProperty('--admin-text', style.colors.text)
    root.style.setProperty('--admin-bg', style.colors.background)
    
    // Effects
    root.style.setProperty('--admin-blur', `${style.effects.blur}px`)
    root.style.setProperty('--admin-contrast', `${style.effects.contrast}%`)
    root.style.setProperty('--admin-brightness', `${style.effects.brightness}%`)
    root.style.setProperty('--admin-saturation', `${style.effects.saturation}%`)
    root.style.setProperty('--admin-hue', `${style.effects.hue}deg`)
    
    // Layout
    root.style.setProperty('--admin-spacing', `${style.layout.spacing}px`)
    root.style.setProperty('--admin-border-radius', `${style.layout.borderRadius}px`)
    root.style.setProperty('--admin-transition', style.layout.transition)
    
    // Matrix Effects
    root.style.setProperty('--matrix-speed', `${style.matrix.speed}s`)
    root.style.setProperty('--matrix-color', style.matrix.color)
    root.style.setProperty('--matrix-density', `${style.matrix.density}%`)
    
    window.dispatchEvent(new CustomEvent('admin-style-update', { detail: style }))
  }

  const handleStyleChange = (category: keyof StyleState, property: string, value: string | number) => {
    const updatedStyle = {
      ...currentStyle,
      [category]: {
        ...currentStyle[category],
        [property]: value
      }
    }
    setCurrentStyle(updatedStyle)
    applyGlobalStyles(updatedStyle)
  }

  const toggleVisibility = () => {
    const newVisibility = !isVisible
    setIsVisible(newVisibility)
    localStorage.setItem('admin-style-controller-visible', newVisibility.toString())
    
    toast.success(`God Mode Controls ${newVisibility ? 'Enabled' : 'Disabled'}`, {
      description: `Ultimate style master is now ${newVisibility ? 'active' : 'hidden'}`,
      duration: 3000
    })
  }

  const sections = {
    typography: { icon: Type, label: 'Typography Master', color: 'text-green-400' },
    background: { icon: Image, label: 'Neural Matrix Control', color: 'text-blue-400' },
    colors: { icon: Palette, label: 'Color Spectrum', color: 'text-purple-400' },
    effects: { icon: Sparkles, label: 'Visual Effects', color: 'text-orange-400' },
    layout: { icon: Layers, label: 'Layout Engine', color: 'text-cyan-400' },
    matrix: { icon: Zap, label: 'Matrix Code Rain', color: 'text-red-400' }
  }

  return (
    <>
      <Button
        onClick={toggleVisibility}
        className="fixed top-16 right-4 z-50 bg-purple-600 hover:bg-purple-700 opacity-70 hover:opacity-100 transition-all duration-300"
        size="sm"
      >
        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <Crown className="h-3 w-3 ml-1" />
      </Button>

      {isVisible && (
        <div className="fixed top-32 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
          <Card className="bg-black/95 backdrop-blur-sm border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-purple-400 text-sm">
                <Wand2 className="h-4 w-4" />
                🎨 GOD MODE STYLE MASTER
                <Badge className="bg-red-600 text-white text-xs animate-pulse">
                  <Shield className="h-3 w-3 mr-1" />
                  ULTIMATE
                </Badge>
              </CardTitle>
              <div className="flex gap-1 flex-wrap">
                <Button size="sm" onClick={() => setShowController(!showController)} className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  {showController ? 'Hide' : 'Show'} Controls
                </Button>
                <Button size="sm" onClick={() => saveVersion('Auto Save')} className="text-xs bg-blue-600">
                  💾 Save
                </Button>
                <Button size="sm" onClick={() => saveVersion('Master Style')} className="text-xs bg-green-600">
                  👑 Master Save
                </Button>
              </div>
            </CardHeader>

            {showController && (
              <CardContent className="space-y-4 text-xs">
                {/* Section Tabs */}
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(sections).map(([key, section]) => {
                    const Icon = section.icon
                    return (
                      <Button
                        key={key}
                        size="sm"
                        variant={activeSection === key ? "default" : "ghost"}
                        onClick={() => setActiveSection(key)}
                        className={`text-xs ${activeSection === key ? 'bg-purple-600' : ''}`}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {section.label.split(' ')[0]}
                      </Button>
                    )
                  })}
                </div>

                {/* Typography Controls */}
                {activeSection === 'typography' && (
                  <div className="space-y-3">
                    <h4 className="text-green-400 font-semibold flex items-center gap-1">
                      <Type className="h-3 w-3" />
                      Typography Master Control
                    </h4>
                    
                    <Select 
                      value={currentStyle.typography.mainTitle}
                      onValueChange={(value) => handleStyleChange('typography', 'mainTitle', value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map(font => (
                          <SelectItem key={font} value={font}>{font}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-300 text-xs">Size: {currentStyle.typography.size}%</label>
                        <Slider
                          value={[currentStyle.typography.size]}
                          onValueChange={([value]) => handleStyleChange('typography', 'size', value)}
                          min={50}
                          max={300}
                          step={5}
                          className="h-4"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-xs">Weight: {currentStyle.typography.weight}</label>
                        <Slider
                          value={[currentStyle.typography.weight]}
                          onValueChange={([value]) => handleStyleChange('typography', 'weight', value)}
                          min={100}
                          max={900}
                          step={100}
                          className="h-4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Matrix Effects */}
                {activeSection === 'matrix' && (
                  <div className="space-y-3">
                    <h4 className="text-red-400 font-semibold flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Matrix Code Rain Control
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={currentStyle.matrix.enabled}
                        onCheckedChange={(checked) => handleStyleChange('matrix', 'enabled', checked)}
                      />
                      <span className="text-xs">Enable Matrix Rain</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-300 text-xs">Speed: {currentStyle.matrix.speed}s</label>
                        <Slider
                          value={[currentStyle.matrix.speed]}
                          onValueChange={([value]) => handleStyleChange('matrix', 'speed', value)}
                          min={10}
                          max={100}
                          step={5}
                          className="h-4"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-xs">Density: {currentStyle.matrix.density}%</label>
                        <Slider
                          value={[currentStyle.matrix.density]}
                          onValueChange={([value]) => handleStyleChange('matrix', 'density', value)}
                          min={5}
                          max={50}
                          step={1}
                          className="h-4"
                        />
                      </div>
                    </div>
                    
                    <Input
                      type="color"
                      value={currentStyle.matrix.color}
                      onChange={(e) => handleStyleChange('matrix', 'color', e.target.value)}
                      className="h-8"
                    />
                  </div>
                )}

                {/* Effects Controls */}
                {activeSection === 'effects' && (
                  <div className="space-y-3">
                    <h4 className="text-orange-400 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Visual Effects Master
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={currentStyle.effects.shadows}
                          onCheckedChange={(checked) => handleStyleChange('effects', 'shadows', checked)}
                        />
                        <span className="text-xs">Shadows</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={currentStyle.effects.glow}
                          onCheckedChange={(checked) => handleStyleChange('effects', 'glow', checked)}
                        />
                        <span className="text-xs">Glow</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-300 text-xs">Brightness: {currentStyle.effects.brightness}%</label>
                        <Slider
                          value={[currentStyle.effects.brightness]}
                          onValueChange={([value]) => handleStyleChange('effects', 'brightness', value)}
                          min={50}
                          max={200}
                          step={5}
                          className="h-4"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-xs">Contrast: {currentStyle.effects.contrast}%</label>
                        <Slider
                          value={[currentStyle.effects.contrast]}
                          onValueChange={([value]) => handleStyleChange('effects', 'contrast', value)}
                          min={50}
                          max={200}
                          step={5}
                          className="h-4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Version History */}
                <div className="space-y-2">
                  <h4 className="text-orange-400 font-semibold flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" />
                    Version History ({versionHistory.length}/20)
                  </h4>
                  
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {versionHistory.slice(0, 5).map((version) => (
                      <div key={version.id} className="flex items-center justify-between p-1 bg-gray-800/50 rounded text-xs">
                        <div>
                          <div className="text-white">{version.description}</div>
                          <div className="text-gray-400 text-xs">{new Date(version.timestamp).toLocaleTimeString()}</div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => rollbackToVersion(version)}
                          className="h-6 px-2 text-xs bg-orange-600 hover:bg-orange-700"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
