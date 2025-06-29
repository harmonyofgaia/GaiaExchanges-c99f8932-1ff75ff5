
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
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
  Shield
} from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { toast } from 'sonner'

interface StyleState {
  typography: {
    mainTitle: string
    bodyFont: string
    size: number
    weight: number
  }
  background: {
    style: string
    intensity: number
    neural: boolean
    matrix: boolean
  }
  colors: {
    primary: string
    secondary: string
    accent: string
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
      weight: 900
    },
    background: {
      style: 'neural-matrix',
      intensity: 80,
      neural: true,
      matrix: true
    },
    colors: {
      primary: '#10b981',
      secondary: '#8b5cf6',
      accent: '#f59e0b'
    }
  })
  const [versionHistory, setVersionHistory] = useState<VersionHistory[]>([])
  const [showController, setShowController] = useState(false)

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
    'Playfair Display',
    'Cinzel',
    'Cinzel Decorative',
    'Georgia',
    'Times New Roman',
    'Arial',
    'Helvetica',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins'
  ]

  const backgroundStyles = [
    'neural-matrix',
    'quantum-plasma',
    'dragon-fire',
    'cosmic-void',
    'organic-forest',
    'electric-storm',
    'digital-rain',
    'holographic'
  ]

  const saveVersion = (description: string) => {
    const newVersion: VersionHistory = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      state: { ...currentStyle },
      description
    }
    
    const updatedHistory = [newVersion, ...versionHistory.slice(0, 9)]
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
    // Apply styles to document root
    const root = document.documentElement
    
    // Typography
    root.style.setProperty('--admin-title-font', style.typography.mainTitle)
    root.style.setProperty('--admin-body-font', style.typography.bodyFont)
    root.style.setProperty('--admin-font-size', `${style.typography.size}%`)
    root.style.setProperty('--admin-font-weight', style.typography.weight.toString())
    
    // Colors
    root.style.setProperty('--admin-primary', style.colors.primary)
    root.style.setProperty('--admin-secondary', style.colors.secondary)
    root.style.setProperty('--admin-accent', style.colors.accent)
    
    // Background
    root.style.setProperty('--admin-bg-intensity', `${style.background.intensity}%`)
    
    // Trigger background update
    window.dispatchEvent(new CustomEvent('admin-style-update', { detail: style }))
  }

  const handleStyleChange = (category: keyof StyleState, property: string, value: any) => {
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
    
    toast.success(`Admin Controls ${newVisibility ? 'Enabled' : 'Disabled'}`, {
      description: `Style controller is now ${newVisibility ? 'visible' : 'hidden'}`,
      duration: 3000
    })
  }

  return (
    <>
      {/* Visibility Toggle - Always visible for admin */}
      <Button
        onClick={toggleVisibility}
        className="fixed top-16 right-4 z-50 bg-purple-600 hover:bg-purple-700 opacity-70 hover:opacity-100 transition-all duration-300"
        size="sm"
      >
        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <Crown className="h-3 w-3 ml-1" />
      </Button>

      {/* Main Controller */}
      {isVisible && (
        <div className="fixed top-32 right-4 z-50 w-80 max-h-[70vh] overflow-y-auto">
          <Card className="bg-black/90 backdrop-blur-sm border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-purple-400 text-sm">
                <Palette className="h-4 w-4" />
                🎨 ADMIN STYLE MASTER
                <Badge className="bg-green-600 text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  SECURE
                </Badge>
              </CardTitle>
              <div className="flex gap-1">
                <Button size="sm" onClick={() => setShowController(!showController)} className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  {showController ? 'Hide' : 'Show'} Controls
                </Button>
                <Button size="sm" onClick={() => saveVersion('Manual Save')} className="text-xs bg-blue-600">
                  💾 Save
                </Button>
              </div>
            </CardHeader>

            {showController && (
              <CardContent className="space-y-4 text-xs">
                {/* Typography Controls */}
                <div className="space-y-2">
                  <h4 className="text-green-400 font-semibold flex items-center gap-1">
                    <Type className="h-3 w-3" />
                    Typography Master
                  </h4>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-gray-300 text-xs">Main Title Font</label>
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
                    </div>
                    
                    <div>
                      <label className="text-gray-300 text-xs">Size: {currentStyle.typography.size}%</label>
                      <Slider
                        value={[currentStyle.typography.size]}
                        onValueChange={([value]) => handleStyleChange('typography', 'size', value)}
                        min={50}
                        max={200}
                        step={5}
                        className="h-4"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Controls */}
                <div className="space-y-2">
                  <h4 className="text-blue-400 font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Neural Matrix Control
                  </h4>
                  
                  <div className="space-y-2">
                    <Select 
                      value={currentStyle.background.style}
                      onValueChange={(value) => handleStyleChange('background', 'style', value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundStyles.map(style => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div>
                      <label className="text-gray-300 text-xs">Intensity: {currentStyle.background.intensity}%</label>
                      <Slider
                        value={[currentStyle.background.intensity]}
                        onValueChange={([value]) => handleStyleChange('background', 'intensity', value)}
                        min={10}
                        max={100}
                        step={5}
                        className="h-4"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={currentStyle.background.neural}
                          onCheckedChange={(checked) => handleStyleChange('background', 'neural', checked)}
                        />
                        <span className="text-xs">Neural</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={currentStyle.background.matrix}
                          onCheckedChange={(checked) => handleStyleChange('background', 'matrix', checked)}
                        />
                        <span className="text-xs">Matrix</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Version History */}
                <div className="space-y-2">
                  <h4 className="text-orange-400 font-semibold flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" />
                    Version History ({versionHistory.length}/10)
                  </h4>
                  
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {versionHistory.map((version) => (
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
