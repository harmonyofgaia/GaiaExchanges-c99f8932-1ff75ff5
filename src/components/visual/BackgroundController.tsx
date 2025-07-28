
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { 
  Lock, 
  Unlock, 
  Pause, 
  Play, 
  RotateCcw, 
  Settings, 
  Eye,
  EyeOff,
  Timer,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface BackgroundSettings {
  autoChange: boolean
  changeInterval: number
  locked: boolean
  visible: boolean
  intensity: number
  speed: number
  currentStyle: string
}

export function BackgroundController() {
  const [settings, setSettings] = useState<BackgroundSettings>({
    autoChange: true,
    changeInterval: 5000, // 5 seconds
    locked: false,
    visible: true,
    intensity: 80,
    speed: 1,
    currentStyle: 'neural-matrix'
  })

  const backgroundStyles = [
    { id: 'neural-matrix', name: 'Neural Matrix', description: 'Electric neural pathways' },
    { id: 'cosmic-energy', name: 'Cosmic Energy', description: 'Cosmic particle fields' },
    { id: 'nature-harmony', name: 'Nature Harmony', description: 'Organic forest patterns' },
    { id: 'quantum-field', name: 'Quantum Field', description: 'Quantum resonance waves' },
    { id: 'digital-rain', name: 'Digital Rain', description: 'Matrix code streams' },
    { id: 'bioelectric', name: 'Bioelectric', description: 'Biological energy flows' }
  ]

  const updateSetting = (key: keyof BackgroundSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    
    // Broadcast settings to background components
    window.dispatchEvent(new CustomEvent('backgroundSettingsUpdate', {
      detail: { [key]: value, ...settings, [key]: value }
    }))
  }

  const toggleLock = () => {
    const newLocked = !settings.locked
    updateSetting('locked', newLocked)
    
    toast.success(
      newLocked 
        ? '🔒 Background locked - no more automatic changes' 
        : '🔓 Background unlocked - changes enabled',
      { duration: 3000 }
    )
  }

  const toggleAutoChange = () => {
    const newAutoChange = !settings.autoChange
    updateSetting('autoChange', newAutoChange)
    
    toast.success(
      newAutoChange 
        ? '▶️ Auto-change enabled' 
        : '⏸️ Auto-change paused'
    )
  }

  const forceBackgroundChange = () => {
    if (settings.locked) {
      toast.error('🔒 Background is locked! Unlock to change.')
      return
    }
    
    const currentIndex = backgroundStyles.findIndex(s => s.id === settings.currentStyle)
    const nextIndex = (currentIndex + 1) % backgroundStyles.length
    const nextStyle = backgroundStyles[nextIndex]
    
    updateSetting('currentStyle', nextStyle.id)
    toast.success(`🎨 Changed to: ${nextStyle.name}`)
  }

  const setSpecificBackground = (styleId: string) => {
    if (settings.locked) {
      toast.error('🔒 Background is locked! Unlock to change.')
      return
    }
    
    const style = backgroundStyles.find(s => s.id === styleId)
    updateSetting('currentStyle', styleId)
    toast.success(`🎨 Applied: ${style?.name}`)
  }

  // Auto-change timer effect
  useEffect(() => {
    if (!settings.autoChange || settings.locked) return

    const interval = setInterval(() => {
      forceBackgroundChange()
    }, settings.changeInterval)

    return () => clearInterval(interval)
  }, [settings.autoChange, settings.locked, settings.changeInterval, settings.currentStyle])

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Settings className="h-6 w-6" />
            🎨 Background Controller
            <Badge className={settings.locked ? 'bg-red-600' : 'bg-green-600'}>
              {settings.locked ? 'LOCKED' : 'ACTIVE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lock Controls */}
          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-blue-500/20">
            <div className="space-y-1">
              <div className="font-medium text-blue-400">Background Lock</div>
              <div className="text-sm text-muted-foreground">
                {settings.locked ? 'Background is locked and won\'t change' : 'Background changes automatically'}
              </div>
            </div>
            <Button
              onClick={toggleLock}
              variant={settings.locked ? 'destructive' : 'outline'}
              className="flex items-center gap-2"
            >
              {settings.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              {settings.locked ? 'Unlock' : 'Lock'}
            </Button>
          </div>

          {/* Auto-Change Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-blue-400">Auto-Change Background</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.autoChange}
                  onCheckedChange={toggleAutoChange}
                  disabled={settings.locked}
                />
                <Button
                  variant="outline"
                  onClick={toggleAutoChange}
                  disabled={settings.locked}
                  className="border-blue-500/50"
                >
                  {settings.autoChange ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {settings.autoChange && !settings.locked && (
              <div className="space-y-2">
                <Label className="text-blue-400">
                  Change Interval: {settings.changeInterval / 1000}s
                </Label>
                <Slider
                  value={[settings.changeInterval]}
                  onValueChange={([value]) => updateSetting('changeInterval', value)}
                  max={30000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1s</span>
                  <span>30s</span>
                </div>
              </div>
            )}
          </div>

          {/* Manual Controls */}
          <div className="flex gap-2">
            <Button
              onClick={forceBackgroundChange}
              disabled={settings.locked}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Change Now
            </Button>
            <Button
              variant="outline"
              onClick={() => updateSetting('visible', !settings.visible)}
              className="border-blue-500/50"
            >
              {settings.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Style Selection */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-6 w-6" />
            Background Styles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {backgroundStyles.map((style) => (
              <Card 
                key={style.id}
                className={`cursor-pointer border transition-all ${
                  settings.currentStyle === style.id 
                    ? 'border-green-500 bg-green-900/30' 
                    : 'border-border hover:border-green-500/50'
                } ${settings.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setSpecificBackground(style.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-green-400">{style.name}</h4>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </div>
                    {settings.currentStyle === style.id && (
                      <Badge className="bg-green-600">Active</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Timer className="h-6 w-6" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label className="text-purple-400">Intensity: {settings.intensity}%</Label>
              <Slider
                value={[settings.intensity]}
                onValueChange={([value]) => updateSetting('intensity', value)}
                max={100}
                min={10}
                step={5}
                className="mt-2"
                disabled={settings.locked}
              />
            </div>

            <div>
              <Label className="text-purple-400">Animation Speed: {settings.speed}x</Label>
              <Slider
                value={[settings.speed]}
                onValueChange={([value]) => updateSetting('speed', value)}
                max={3}
                min={0.1}
                step={0.1}
                className="mt-2"
                disabled={settings.locked}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
