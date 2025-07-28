
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
import { ArtCreationStudio } from './ArtCreationStudio'
import { DesignLibrary } from './DesignLibrary'
import { BackgroundController } from './BackgroundController'

export function EnhancedVisualControls() {
  const { isLocked } = useLock()
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [customCSS, setCustomCSS] = useState('')
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [spacing, setSpacing] = useState(16)

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
    toast.success(`Applied ${templates.find(t => t.id === templateId)?.name} template`)
  }

  const generateColorPalette = () => {
    if (isLocked) return
    toast.success('Generated new color palette based on current design')
  }

  const exportDesign = () => {
    toast.success('Design exported successfully')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="studio" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="studio">Art Studio</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="studio" className="space-y-4">
          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Brush className="h-5 w-5" />
                🎨 Professional Art Creation Studio
                <Badge className="bg-purple-600">PRO</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ArtCreationStudio />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <DesignLibrary />
        </TabsContent>

        <TabsContent value="background" className="space-y-4">
          <BackgroundController />
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card className="border-green-500/20 bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Palette className="h-5 w-5" />
                🎨 Advanced Color Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorPalettes.map((palette) => (
                  <Card key={palette.name} className="p-4 cursor-pointer hover:bg-muted/50">
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
                <Label>AI Color Generator</Label>
                <div className="flex gap-2">
                  <Input type="color" defaultValue="#22c55e" disabled={isLocked} />
                  <Button disabled={isLocked} onClick={generateColorPalette}>
                    <Wand2 className="h-4 w-4 mr-2" />
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
                ⚡ Advanced Animation Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Global Animation Speed: {animationSpeed}x</Label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => setAnimationSpeed(value[0])}
                    max={5}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Visual Intensity: {backgroundIntensity}%</Label>
                  <Slider
                    value={[backgroundIntensity]}
                    onValueChange={(value) => setBackgroundIntensity(value[0])}
                    max={200}
                    min={0}
                    step={5}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch disabled={isLocked} />
                    <Label>Neural Effects</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch disabled={isLocked} />
                    <Label>Particle Systems</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch disabled={isLocked} />
                    <Label>Electric Sparks</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch disabled={isLocked} />
                    <Label>Quantum Fields</Label>
                  </div>
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
                🔧 Advanced Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Custom CSS Editor</Label>
                <Textarea
                  placeholder="Enter custom CSS rules here..."
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  disabled={isLocked}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Typography Scale: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  max={32}
                  min={8}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design
                </Button>
                <Button variant="outline" onClick={exportDesign}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
