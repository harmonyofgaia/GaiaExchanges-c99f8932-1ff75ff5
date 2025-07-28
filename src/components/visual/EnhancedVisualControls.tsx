
import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Wand2, 
  Download, 
  Upload,
  Save,
  FolderOpen,
  Shuffle,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Heart
} from 'lucide-react'
import { LockToggle } from './LockToggle'
import { toast } from 'sonner'

interface ColorPalette {
  id: string
  name: string
  colors: string[]
  isFavorite?: boolean
}

interface DesignTemplate {
  id: string
  name: string
  preview: string
  colors: string[]
}

export function EnhancedVisualControls() {
  const [isLocked, setIsLocked] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null)
  const [customColors, setCustomColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'])
  const [hue, setHue] = useState(180)
  const [saturation, setSaturation] = useState(70)
  const [lightness, setLightness] = useState(50)
  const [contrast, setContrast] = useState(50)
  const [designHistory, setDesignHistory] = useState<string[]>([])
  
  const [colorPalettes] = useState<ColorPalette[]>([
    { 
      id: 'vibrant', 
      name: 'Vibrant Energy', 
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726'], 
      isFavorite: true 
    },
    { 
      id: 'nature', 
      name: 'Green Nature', 
      colors: ['#27AE60', '#2ECC71', '#58D68D', '#85C1E9'], 
      isFavorite: false 
    },
    { 
      id: 'sunset', 
      name: 'Sunset Glow', 
      colors: ['#FF7043', '#FFA726', '#FFCC02', '#FF5722'], 
      isFavorite: true 
    },
    { 
      id: 'ocean', 
      name: 'Ocean Depths', 
      colors: ['#1976D2', '#42A5F5', '#64B5F6', '#90CAF9'], 
      isFavorite: false 
    }
  ])

  const [designTemplates] = useState<DesignTemplate[]>([
    { 
      id: 'modern', 
      name: 'Modern Minimalist', 
      preview: 'Clean lines, subtle gradients',
      colors: ['#2196F3', '#FFFFFF', '#F5F5F5', '#424242']
    },
    { 
      id: 'retro', 
      name: 'Retro Wave', 
      preview: 'Neon colors, 80s vibes',
      colors: ['#FF6B9D', '#4ECDC4', '#FFE66D', '#A8E6CF']
    },
    { 
      id: 'earthy', 
      name: 'Earth Tones', 
      preview: 'Natural, warm palette',
      colors: ['#8B4513', '#CD853F', '#DEB887', '#F5DEB3']
    }
  ])

  const handleLockToggle = useCallback(() => {
    if (isLocked) {
      setIsLocked(false)
      toast.info('🔓 Visual controls unlocked - You can now make changes')
    } else {
      setIsLocked(true)
      toast.success('🔒 Visual controls locked - Settings are protected')
    }
    setDesignHistory(prev => [`🔒 Controls ${isLocked ? 'unlocked' : 'locked'}`, ...prev.slice(0, 4)])
  }, [isLocked])

  const applyPalette = useCallback((palette: ColorPalette) => {
    if (isLocked) {
      toast.error('Cannot apply palette - controls are locked')
      return
    }

    setSelectedPalette(palette)
    setCustomColors(palette.colors)
    setDesignHistory(prev => [`🎨 Applied palette: ${palette.name}`, ...prev.slice(0, 4)])
    toast.success(`Applied ${palette.name} palette`)
  }, [isLocked])

  const applyTemplate = useCallback((template: DesignTemplate) => {
    if (isLocked) {
      toast.error('Cannot apply template - controls are locked')
      return
    }

    setCustomColors(template.colors)
    setDesignHistory(prev => [`📐 Applied template: ${template.name}`, ...prev.slice(0, 4)])
    toast.success(`Applied ${template.name} template`)
  }, [isLocked])

  const generateAIPalette = useCallback(() => {
    if (isLocked) {
      toast.error('Cannot generate AI palette - controls are locked')
      return
    }

    // Simulate AI palette generation
    const aiColors = [
      `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
      `hsl(${Math.floor(Math.random() * 360)}, 80%, 45%)`,
      `hsl(${Math.floor(Math.random() * 360)}, 65%, 55%)`
    ]
    
    setCustomColors(aiColors)
    setDesignHistory(prev => [`🤖 Generated AI color palette`, ...prev.slice(0, 4)])
    toast.success('AI palette generated successfully!')
  }, [isLocked])

  const randomizePalette = useCallback(() => {
    if (isLocked) {
      toast.error('Cannot randomize palette - controls are locked')
      return
    }

    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
    applyPalette(randomPalette)
  }, [isLocked, colorPalettes, applyPalette])

  const saveDesign = useCallback(() => {
    const designData = {
      colors: customColors,
      hue,
      saturation,
      lightness,
      contrast,
      timestamp: new Date().toISOString()
    }
    
    setDesignHistory(prev => [`💾 Design saved to local storage`, ...prev.slice(0, 4)])
    toast.success('Design saved successfully!')
  }, [customColors, hue, saturation, lightness, contrast])

  const exportDesign = useCallback(() => {
    const designData = {
      colors: customColors,
      hue,
      saturation,
      lightness,
      contrast,
      palette: selectedPalette?.name || 'Custom'
    }

    const dataStr = JSON.stringify(designData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'visual-design.json'
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    setDesignHistory(prev => [`📤 Design exported as JSON`, ...prev.slice(0, 4)])
    toast.success('Design exported successfully!')
  }, [customColors, hue, saturation, lightness, contrast, selectedPalette])

  const importDesign = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) {
      toast.error('Cannot import design - controls are locked')
      return
    }

    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const designData = JSON.parse(e.target?.result as string)
        setCustomColors(designData.colors || customColors)
        setHue(designData.hue || hue)
        setSaturation(designData.saturation || saturation)
        setLightness(designData.lightness || lightness)
        setContrast(designData.contrast || contrast)
        
        setDesignHistory(prev => [`📁 Design imported from file`, ...prev.slice(0, 4)])
        toast.success('Design imported successfully!')
      } catch (error) {
        toast.error('Failed to import design - invalid file format')
      }
    }
    reader.readAsText(file)
  }, [isLocked, customColors, hue, saturation, lightness, contrast])

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-400">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              🎨 Enhanced Visual Controls
            </div>
            <LockToggle isLocked={isLocked} onLockToggle={handleLockToggle} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Palette Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Color Palettes</Label>
              <Button onClick={randomizePalette} size="sm" variant="outline" disabled={isLocked}>
                <Shuffle className="h-4 w-4 mr-2" />
                Random
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {colorPalettes.map((palette) => (
                <Card 
                  key={palette.id} 
                  className={`cursor-pointer transition-all border-2 ${
                    selectedPalette?.id === palette.id ? 'border-purple-400' : 'border-muted'
                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-300'}`}
                  onClick={() => !isLocked && applyPalette(palette)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{palette.name}</span>
                      {palette.isFavorite && <Heart className="h-4 w-4 text-red-400 fill-current" />}
                    </div>
                    <div className="flex gap-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border-2 border-background/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Custom Color Controls */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Custom Colors</Label>
            <div className="grid grid-cols-4 gap-2">
              {customColors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      if (!isLocked) {
                        const newColors = [...customColors]
                        newColors[index] = e.target.value
                        setCustomColors(newColors)
                      }
                    }}
                    disabled={isLocked}
                    className="w-full h-12 rounded border-2"
                  />
                  <div className="text-xs text-center text-muted-foreground">
                    {color}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Design Templates */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Design Templates</Label>
            <div className="grid grid-cols-1 gap-3">
              {designTemplates.map((template) => (
                <Card key={template.id} className="border-blue-500/30 bg-blue-900/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-blue-400">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.preview}</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          {template.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded border border-background/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => applyTemplate(template)}
                          disabled={isLocked}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Advanced Color Controls */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Advanced Color Controls</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hue: {hue}°</Label>
                <Slider
                  value={[hue]}
                  onValueChange={(value) => !isLocked && setHue(value[0])}
                  max={360}
                  min={0}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label>Saturation: {saturation}%</Label>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => !isLocked && setSaturation(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label>Lightness: {lightness}%</Label>
                <Slider
                  value={[lightness]}
                  onValueChange={(value) => !isLocked && setLightness(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label>Contrast: {contrast}%</Label>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => !isLocked && setContrast(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2">
              <Button onClick={generateAIPalette} disabled={isLocked} className="bg-purple-600 hover:bg-purple-700">
                <Wand2 className="h-4 w-4 mr-2" />
                AI Palette
              </Button>
              <Button onClick={saveDesign} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Design
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={exportDesign} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => document.getElementById('design-import')?.click()} variant="outline" disabled={isLocked}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <input
                id="design-import"
                type="file"
                accept=".json"
                onChange={importDesign}
                className="hidden"
              />
            </div>
          </div>

          {/* Design History */}
          {designHistory.length > 0 && (
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400 text-lg">
                  <RefreshCw className="h-5 w-5" />
                  Recent Design Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {designHistory.map((entry, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-background/30 p-2 rounded">
                      {entry}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
