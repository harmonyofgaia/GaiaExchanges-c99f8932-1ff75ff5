
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Settings, 
  Brush, 
  Layout, 
  Zap, 
  Eye,
  Sparkles,
  Layers,
  Grid3X3,
  Move,
  RotateCcw,
  Save,
  Download
} from 'lucide-react'
import { useLock } from '@/components/providers/ThemeProvider'

export function EnhancedVisualControls() {
  const { isLocked } = useLock()
  
  // Background Controls
  const [backgroundType, setBackgroundType] = useState('neural')
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [backgroundSpeed, setBackgroundSpeed] = useState(1)
  const [backgroundColor, setBackgroundColor] = useState('#00ff00')
  
  // Layout Controls
  const [gridSize, setGridSize] = useState(12)
  const [spacing, setSpacing] = useState(16)
  const [borderRadius, setBorderRadius] = useState(8)
  const [containerWidth, setContainerWidth] = useState(1200)
  
  // Animation Controls
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [enableParallax, setEnableParallax] = useState(true)
  const [enableTransitions, setEnableTransitions] = useState(true)
  
  // Theme Controls
  const [primaryColor, setPrimaryColor] = useState('#0070f3')
  const [secondaryColor, setSecondaryColor] = useState('#6c757d')
  const [accentColor, setAccentColor] = useState('#ff4581')
  
  const backgroundTypes = [
    { value: 'neural', label: 'Neural Network', icon: '🧠' },
    { value: 'matrix', label: 'Matrix Rain', icon: '🔢' },
    { value: 'particles', label: 'Particle System', icon: '✨' },
    { value: 'waves', label: 'Energy Waves', icon: '🌊' },
    { value: 'geometry', label: 'Sacred Geometry', icon: '🔮' },
    { value: 'plasma', label: 'Plasma Flow', icon: '💫' },
    { value: 'galaxy', label: 'Galaxy Spiral', icon: '🌌' },
    { value: 'fire', label: 'Fire Elements', icon: '🔥' }
  ]

  const applyChanges = () => {
    // Apply changes to the global theme
    document.documentElement.style.setProperty('--primary', primaryColor)
    document.documentElement.style.setProperty('--secondary', secondaryColor)
    document.documentElement.style.setProperty('--accent', accentColor)
    
    // Dispatch custom event for background changes
    window.dispatchEvent(new CustomEvent('visual-controls-update', {
      detail: {
        backgroundType,
        backgroundIntensity,
        backgroundSpeed,
        backgroundColor,
        gridSize,
        spacing,
        borderRadius,
        containerWidth,
        animationSpeed,
        enableParallax,
        enableTransitions
      }
    }))
  }

  const resetToDefaults = () => {
    setBackgroundType('neural')
    setBackgroundIntensity(50)
    setBackgroundSpeed(1)
    setBackgroundColor('#00ff00')
    setGridSize(12)
    setSpacing(16)
    setBorderRadius(8)
    setContainerWidth(1200)
    setAnimationSpeed(1)
    setEnableParallax(true)
    setEnableTransitions(true)
    setPrimaryColor('#0070f3')
    setSecondaryColor('#6c757d')
    setAccentColor('#ff4581')
  }

  const savePreset = () => {
    const preset = {
      backgroundType,
      backgroundIntensity,
      backgroundSpeed,
      backgroundColor,
      gridSize,
      spacing,
      borderRadius,
      containerWidth,
      animationSpeed,
      enableParallax,
      enableTransitions,
      primaryColor,
      secondaryColor,
      accentColor
    }
    localStorage.setItem('gaia-visual-preset', JSON.stringify(preset))
  }

  const loadPreset = () => {
    const saved = localStorage.getItem('gaia-visual-preset')
    if (saved) {
      const preset = JSON.parse(saved)
      setBackgroundType(preset.backgroundType || 'neural')
      setBackgroundIntensity(preset.backgroundIntensity || 50)
      setBackgroundSpeed(preset.backgroundSpeed || 1)
      setBackgroundColor(preset.backgroundColor || '#00ff00')
      setGridSize(preset.gridSize || 12)
      setSpacing(preset.spacing || 16)
      setBorderRadius(preset.borderRadius || 8)
      setContainerWidth(preset.containerWidth || 1200)
      setAnimationSpeed(preset.animationSpeed || 1)
      setEnableParallax(preset.enableParallax ?? true)
      setEnableTransitions(preset.enableTransitions ?? true)
      setPrimaryColor(preset.primaryColor || '#0070f3')
      setSecondaryColor(preset.secondaryColor || '#6c757d')
      setAccentColor(preset.accentColor || '#ff4581')
    }
  }

  useEffect(() => {
    loadPreset()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Enhanced Visual Controls</h2>
        <div className="flex gap-2">
          <Button onClick={savePreset} size="sm" disabled={isLocked}>
            <Save className="h-4 w-4 mr-2" />
            Save Preset
          </Button>
          <Button onClick={resetToDefaults} size="sm" variant="outline" disabled={isLocked}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Tabs defaultValue="background" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="background" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brush className="h-5 w-5" />
                Background Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {backgroundTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={backgroundType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBackgroundType(type.value)}
                    disabled={isLocked}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-xs">{type.label}</span>
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Intensity: {backgroundIntensity}%</Label>
                <Slider
                  value={[backgroundIntensity]}
                  onValueChange={(value) => setBackgroundIntensity(value[0])}
                  max={100}
                  step={1}
                  disabled={isLocked}
                />
              </div>

              <div className="space-y-2">
                <Label>Speed: {backgroundSpeed}x</Label>
                <Slider
                  value={[backgroundSpeed]}
                  onValueChange={(value) => setBackgroundSpeed(value[0])}
                  max={3}
                  min={0.1}
                  step={0.1}
                  disabled={isLocked}
                />
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  disabled={isLocked}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Layout Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Grid Columns: {gridSize}</Label>
                  <Slider
                    value={[gridSize]}
                    onValueChange={(value) => setGridSize(value[0])}
                    max={24}
                    min={1}
                    step={1}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Spacing: {spacing}px</Label>
                  <Slider
                    value={[spacing]}
                    onValueChange={(value) => setSpacing(value[0])}
                    max={48}
                    min={0}
                    step={2}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Border Radius: {borderRadius}px</Label>
                  <Slider
                    value={[borderRadius]}
                    onValueChange={(value) => setBorderRadius(value[0])}
                    max={24}
                    min={0}
                    step={1}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Container Width: {containerWidth}px</Label>
                  <Slider
                    value={[containerWidth]}
                    onValueChange={(value) => setContainerWidth(value[0])}
                    max={1920}
                    min={320}
                    step={10}
                    disabled={isLocked}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Animation Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Animation Speed: {animationSpeed}x</Label>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  max={3}
                  min={0.1}
                  step={0.1}
                  disabled={isLocked}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Parallax</Label>
                <Switch
                  checked={enableParallax}
                  onCheckedChange={setEnableParallax}
                  disabled={isLocked}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Transitions</Label>
                <Switch
                  checked={enableTransitions}
                  onCheckedChange={setEnableTransitions}
                  disabled={isLocked}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    disabled={isLocked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <Input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    disabled={isLocked}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Visual Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg">
                <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Advanced effects coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          onClick={applyChanges}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          disabled={isLocked}
        >
          <Settings className="h-5 w-5 mr-2" />
          Apply Changes
        </Button>
      </div>
    </div>
  )
}
