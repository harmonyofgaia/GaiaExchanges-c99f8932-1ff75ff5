import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Settings, 
  Wand2, 
  Download, 
  Upload, 
  Brush,
  Monitor,
  Lock,
  Unlock,
  Zap,
  Library
} from 'lucide-react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/useDebounce'
import { VisualLibrary } from './VisualLibrary'

type BackgroundType = 'matrix' | 'neural' | 'puzzle' | 'cyberpunk' | 'quantum' | 'bioelectric' | 'holographic'
type BackgroundIntensity = 'low' | 'medium' | 'high'

interface BackgroundSettings {
  type: BackgroundType
  intensity: BackgroundIntensity
  color: string
  speed: number
  autoGenerate: boolean
}

export function EnhancedVisualControls() {
  // Background settings state
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    type: 'matrix',
    intensity: 'medium',
    color: '#00ff00',
    speed: 1,
    autoGenerate: false
  })

  // UI control states
  const [fontSize, setFontSize] = useState(16)
  const [spacing, setSpacing] = useState(16)
  const [isLocked, setIsLocked] = useState(false)
  const [particleEffects, setParticleEffects] = useState(true)

  // Debounce settings to prevent too frequent updates
  const debouncedSettings = useDebounce(backgroundSettings, 300)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('gaia-background-settings')
    const savedLock = localStorage.getItem('gaia-background-lock')
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setBackgroundSettings(parsed)
      } catch (error) {
        console.warn('Failed to parse saved background settings')
      }
    }

    if (savedLock) {
      setIsLocked(savedLock === 'true')
    }
  }, [])

  // Apply background settings when they change
  useEffect(() => {
    if (!isLocked) {
      // Save to localStorage
      localStorage.setItem('gaia-background-settings', JSON.stringify(debouncedSettings))
      
      // Dispatch custom event to update background
      window.dispatchEvent(new CustomEvent('background-settings-changed', {
        detail: debouncedSettings
      }))
    }
  }, [debouncedSettings, isLocked])

  const handleBackgroundTypeChange = (type: BackgroundType) => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to make changes' })
      return
    }
    setBackgroundSettings(prev => ({ ...prev, type }))
  }

  const handleIntensityChange = (intensity: BackgroundIntensity) => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to make changes' })
      return
    }
    setBackgroundSettings(prev => ({ ...prev, intensity }))
  }

  const handleColorChange = (color: string) => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to make changes' })
      return
    }
    setBackgroundSettings(prev => ({ ...prev, color }))
  }

  const handleSpeedChange = (speed: number[]) => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to make changes' })
      return
    }
    setBackgroundSettings(prev => ({ ...prev, speed: speed[0] }))
  }

  const toggleAutoGenerate = () => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to make changes' })
      return
    }
    setBackgroundSettings(prev => ({ ...prev, autoGenerate: !prev.autoGenerate }))
    toast.success(
      backgroundSettings.autoGenerate ? 'Auto-generation disabled' : 'Auto-generation enabled',
      { description: backgroundSettings.autoGenerate ? 'Background will stay fixed' : 'Background will change automatically' }
    )
  }

  const toggleLock = () => {
    const newLockState = !isLocked
    setIsLocked(newLockState)
    localStorage.setItem('gaia-background-lock', newLockState.toString())
    
    toast.success(
      newLockState ? 'Background locked' : 'Background unlocked',
      { description: newLockState ? 'Settings are now protected' : 'Settings can now be modified' }
    )
  }

  const applyChanges = () => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to apply changes' })
      return
    }
    
    // Force immediate update
    window.dispatchEvent(new CustomEvent('background-settings-changed', {
      detail: backgroundSettings
    }))
    toast.success('Background settings applied!')
  }

  const resetToDefaults = () => {
    if (isLocked) {
      toast.error('Background is locked', { description: 'Unlock to reset settings' })
      return
    }

    const defaultSettings: BackgroundSettings = {
      type: 'matrix',
      intensity: 'medium',
      color: '#00ff00',
      speed: 1,
      autoGenerate: false
    }
    
    setBackgroundSettings(defaultSettings)
    setFontSize(16)
    setSpacing(16)
    toast.success('Settings reset to defaults')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="controls">Background Controls</TabsTrigger>
          <TabsTrigger value="library">
            <Library className="h-4 w-4 mr-2" />
            Style Library
          </TabsTrigger>
          <TabsTrigger value="settings">UI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="space-y-6">
          {/* Lock Control */}
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-yellow-400">
                <div className="flex items-center gap-2">
                  {isLocked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                  Background Lock
                </div>
                <Badge variant={isLocked ? 'destructive' : 'secondary'}>
                  {isLocked ? 'Locked' : 'Unlocked'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isLocked 
                      ? 'Background settings are protected from changes'
                      : 'Background settings can be modified'
                    }
                  </p>
                </div>
                <Button
                  onClick={toggleLock}
                  variant={isLocked ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {isLocked ? 'Unlock' : 'Lock'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Background Controls */}
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Monitor className="h-5 w-5" />
                Enhanced Background Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Background Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Background Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['matrix', 'neural', 'puzzle', 'cyberpunk', 'quantum', 'bioelectric', 'holographic'] as BackgroundType[]).map((type) => (
                    <Button
                      key={type}
                      onClick={() => handleBackgroundTypeChange(type)}
                      variant={backgroundSettings.type === type ? "default" : "outline"}
                      size="sm"
                      disabled={isLocked}
                      className="capitalize"
                    >
                      {type === 'bioelectric' ? 'Bio' : type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Intensity</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as BackgroundIntensity[]).map((intensity) => (
                    <Button
                      key={intensity}
                      onClick={() => handleIntensityChange(intensity)}
                      variant={backgroundSettings.intensity === intensity ? "default" : "outline"}
                      size="sm"
                      disabled={isLocked}
                      className="capitalize"
                    >
                      {intensity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color and Speed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Matrix Color</Label>
                  <Input
                    type="color"
                    value={backgroundSettings.color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    disabled={isLocked}
                    className="h-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Animation Speed: {backgroundSettings.speed.toFixed(1)}x</Label>
                  <Slider
                    value={[backgroundSettings.speed]}
                    onValueChange={handleSpeedChange}
                    max={3}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Auto Generation Toggle */}
              <div className="flex items-center justify-between p-4 border border-muted rounded-lg">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Auto-Generate Background</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically change background every 30 seconds
                  </p>
                </div>
                <Switch
                  checked={backgroundSettings.autoGenerate}
                  onCheckedChange={toggleAutoGenerate}
                  disabled={isLocked}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library">
          <VisualLibrary />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* UI Controls */}
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-5 w-5" />
                UI Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size: {fontSize}px</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    max={24}
                    min={12}
                    step={1}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Spacing: {spacing}px</Label>
                  <Slider
                    value={[spacing]}
                    onValueChange={(value) => setSpacing(value[0])}
                    max={32}
                    min={8}
                    step={2}
                    disabled={isLocked}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-muted rounded-lg">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Particle Effects</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable floating particle animations
                  </p>
                </div>
                <Switch
                  checked={particleEffects}
                  onCheckedChange={setParticleEffects}
                  disabled={isLocked}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={applyChanges} 
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          disabled={isLocked}
        >
          <Wand2 className="h-4 w-4" />
          Apply Changes
        </Button>
        
        <Button 
          onClick={resetToDefaults}
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isLocked}
        >
          <Zap className="h-4 w-4" />
          Reset Defaults
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Settings
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import Settings
        </Button>
      </div>
    </div>
  )
}
