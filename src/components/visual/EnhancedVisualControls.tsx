
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Palette, 
  Layout, 
  Type, 
  Zap, 
  Brush, 
  Settings, 
  Sparkles,
  Copy,
  Download,
  Upload,
  Wand2,
  Eye,
  Image,
  Layers
} from 'lucide-react'
import { useLock } from '@/components/providers/ThemeProvider'
import { toast } from 'sonner'
import { DesignLibrary } from './DesignLibrary'
import { AdvancedBackgroundControls } from './AdvancedBackgroundControls'
import { ArtStudio } from './ArtStudio'

export function EnhancedVisualControls() {
  const { isLocked } = useLock()
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [customCSS, setCustomCSS] = useState('')
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [spacing, setSpacing] = useState(16)
  const [particleEffects, setParticleEffects] = useState(true)
  const [smoothTransitions, setSmoothTransitions] = useState(true)

  const colorPalettes = [
    { name: 'Ocean Breeze', colors: ['#0369a1', '#0891b2', '#06b6d4', '#22d3ee'] },
    { name: 'Forest Green', colors: ['#065f46', '#059669', '#10b981', '#34d399'] },
    { name: 'Sunset Glow', colors: ['#dc2626', '#ea580c', '#f59e0b', '#eab308'] },
    { name: 'Purple Dream', colors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'] },
    { name: 'Gaia Nature', colors: ['#22c55e', '#16a34a', '#15803d', '#166534'] }
  ]

  const templates = [
    { id: 'modern', name: 'Modern Minimal', description: 'Clean and professional' },
    { id: 'nature', name: 'Nature Harmony', description: 'Earth tones and organic feel' },
    { id: 'cosmic', name: 'Cosmic Energy', description: 'Space-inspired design' },
    { id: 'forest', name: 'Forest Shield', description: 'Green protection theme' },
    { id: 'ocean', name: 'Ocean Depths', description: 'Deep blue serenity' }
  ]

  const applyTemplate = (templateId: string) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    
    setSelectedTemplate(templateId)
    const template = templates.find(t => t.id === templateId)
    
    // Apply template styles to document root
    const root = document.documentElement
    switch (templateId) {
      case 'modern':
        root.style.setProperty('--primary', '0 0% 9%')
        root.style.setProperty('--primary-foreground', '0 0% 98%')
        break
      case 'nature':
        root.style.setProperty('--primary', '142 76% 36%')
        root.style.setProperty('--primary-foreground', '355 7% 97%')
        break
      case 'cosmic':
        root.style.setProperty('--primary', '263 70% 50%')
        root.style.setProperty('--primary-foreground', '210 20% 98%')
        break
      case 'forest':
        root.style.setProperty('--primary', '120 60% 30%')
        root.style.setProperty('--primary-foreground', '0 0% 100%')
        break
      case 'ocean':
        root.style.setProperty('--primary', '200 100% 40%')
        root.style.setProperty('--primary-foreground', '0 0% 100%')
        break
    }
    
    toast.success(`Applied ${template?.name} template`, {
      description: 'Theme colors and styling updated'
    })
  }

  const applyColorPalette = (palette: typeof colorPalettes[0]) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    
    const root = document.documentElement
    const [primary, secondary, accent, background] = palette.colors
    
    // Convert hex to HSL and apply
    root.style.setProperty('--primary', hexToHsl(primary))
    root.style.setProperty('--secondary', hexToHsl(secondary))
    root.style.setProperty('--accent', hexToHsl(accent))
    
    toast.success(`Applied ${palette.name} color palette`)
  }

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  const generateColorPalette = () => {
    if (isLocked) return
    
    // Generate random HSL colors
    const colors = []
    for (let i = 0; i < 4; i++) {
      const h = Math.floor(Math.random() * 360)
      const s = Math.floor(Math.random() * 50) + 50 // 50-100%
      const l = Math.floor(Math.random() * 40) + 30 // 30-70%
      colors.push(`hsl(${h}, ${s}%, ${l}%)`)
    }
    
    const newPalette = {
      name: 'Generated Palette',
      colors: colors.map(hsl => {
        // Convert HSL back to hex for display
        const [h, s, l] = hsl.match(/\d+/g)?.map(Number) || [0, 0, 0]
        return hslToHex(h, s, l)
      })
    }
    
    applyColorPalette(newPalette)
    toast.success('Generated new color palette based on current design')
  }

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const exportDesign = () => {
    const designData = {
      template: selectedTemplate,
      customCSS,
      backgroundIntensity,
      animationSpeed,
      fontSize,
      spacing,
      particleEffects,
      smoothTransitions,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(designData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gaia-design-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Design exported successfully')
  }

  const importDesign = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const designData = JSON.parse(e.target?.result as string)
          setSelectedTemplate(designData.template || '')
          setCustomCSS(designData.customCSS || '')
          setBackgroundIntensity(designData.backgroundIntensity || 50)
          setAnimationSpeed(designData.animationSpeed || 1)
          setFontSize(designData.fontSize || 16)
          setSpacing(designData.spacing || 16)
          setParticleEffects(designData.particleEffects ?? true)
          setSmoothTransitions(designData.smoothTransitions ?? true)
          
          toast.success('Design imported successfully')
        } catch (error) {
          toast.error('Failed to import design file')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const previewChanges = () => {
    const root = document.documentElement
    root.style.setProperty('--font-size-base', `${fontSize}px`)
    root.style.setProperty('--spacing-base', `${spacing}px`)
    
    if (customCSS) {
      let styleElement = document.getElementById('custom-preview-styles')
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'custom-preview-styles'
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = customCSS
    }
    
    toast.success('Changes previewed successfully', {
      description: 'Your customizations are now visible'
    })
  }

  const applyAnimationSettings = () => {
    const root = document.documentElement
    root.style.setProperty('--animation-speed', `${animationSpeed}s`)
    root.style.setProperty('--background-intensity', `${backgroundIntensity}%`)
    
    // Toggle particle effects
    const particleElements = document.querySelectorAll('.particle-effect')
    particleElements.forEach(el => {
      (el as HTMLElement).style.display = particleEffects ? 'block' : 'none'
    })
    
    // Apply smooth transitions
    if (smoothTransitions) {
      root.style.setProperty('--transition-duration', '0.3s')
    } else {
      root.style.setProperty('--transition-duration', '0s')
    }
    
    toast.success('Animation settings applied')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="backgrounds" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="art-studio">Art Studio</TabsTrigger>
          <TabsTrigger value="design">Templates</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="backgrounds" className="space-y-4">
          <AdvancedBackgroundControls isLocked={isLocked} />
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <DesignLibrary isLocked={isLocked} />
        </TabsContent>

        <TabsContent value="art-studio" className="space-y-4">
          <ArtStudio isLocked={isLocked} />
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Wand2 className="h-5 w-5" />
                Template Designer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer border transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-purple-500 bg-purple-900/20' 
                        : 'border-border hover:border-purple-500/50'
                    } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => !isLocked && applyTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-bold text-purple-400">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      {selectedTemplate === template.id && (
                        <Badge className="mt-2 bg-purple-600">Active</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={generateColorPalette} disabled={isLocked}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Palette
                </Button>
                <Button variant="outline" onClick={exportDesign}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Design
                </Button>
                <Button variant="outline" onClick={importDesign} disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card className="border-green-500/20 bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Palette className="h-5 w-5" />
                Color Palette Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorPalettes.map((palette) => (
                  <Card 
                    key={palette.name} 
                    className={`p-4 cursor-pointer hover:bg-muted/50 ${
                      isLocked ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                    onClick={() => !isLocked && applyColorPalette(palette)}
                  >
                    <h4 className="font-bold mb-2">{palette.name}</h4>
                    <div className="flex gap-2">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label>Custom Color Generator</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    defaultValue="#22c55e" 
                    disabled={isLocked}
                    onChange={(e) => {
                      if (!isLocked) {
                        const color = e.target.value
                        const hsl = hexToHsl(color)
                        document.documentElement.style.setProperty('--primary', hsl)
                      }
                    }}
                  />
                  <Button onClick={generateColorPalette} disabled={isLocked}>
                    <Copy className="h-4 w-4 mr-2" />
                    Generate Palette
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animation" className="space-y-4">
          <Card className="border-orange-500/20 bg-orange-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Zap className="h-5 w-5" />
                Animation Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Animation Speed: {animationSpeed}x</Label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => {
                      setAnimationSpeed(value[0])
                      applyAnimationSettings()
                    }}
                    max={3}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Background Intensity: {backgroundIntensity}%</Label>
                  <Slider
                    value={[backgroundIntensity]}
                    onValueChange={(value) => {
                      setBackgroundIntensity(value[0])
                      applyAnimationSettings()
                    }}
                    max={100}
                    min={0}
                    step={5}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={particleEffects}
                    onCheckedChange={(checked) => {
                      setParticleEffects(checked)
                      applyAnimationSettings()
                    }}
                    disabled={isLocked} 
                  />
                  <Label>Enable Particle Effects</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={smoothTransitions}
                    onCheckedChange={(checked) => {
                      setSmoothTransitions(checked)
                      applyAnimationSettings()
                    }}
                    disabled={isLocked} 
                  />
                  <Label>Smooth Transitions</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="border-red-500/20 bg-red-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Settings className="h-5 w-5" />
                Advanced Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Custom CSS</Label>
                <Textarea
                  placeholder="Enter custom CSS rules here..."
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  disabled={isLocked}
                  rows={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Typography Scale: {fontSize}px</Label>
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
                <Label>Spacing Scale: {spacing}px</Label>
                <Slider
                  value={[spacing]}
                  onValueChange={(value) => setSpacing(value[0])}
                  max={32}
                  min={8}
                  step={2}
                  disabled={isLocked}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={importDesign} disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design
                </Button>
                <Button variant="outline" onClick={previewChanges} disabled={isLocked}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Changes
                </Button>
                <Button onClick={exportDesign}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Current
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
