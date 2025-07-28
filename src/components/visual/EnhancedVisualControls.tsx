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
                    }`}
                    onClick={() => applyTemplate(template.id)}
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
                <Label>Custom Color Generator</Label>
                <div className="flex gap-2">
                  <Input type="color" defaultValue="#22c55e" disabled={isLocked} />
                  <Button disabled={isLocked}>
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
                  <Label>Animation Speed</Label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => setAnimationSpeed(value[0])}
                    max={3}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Background Animation</Label>
                  <Slider
                    value={[backgroundIntensity]}
                    onValueChange={(value) => setBackgroundIntensity(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch disabled={isLocked} />
                  <Label>Enable Particle Effects</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch disabled={isLocked} />
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
                <Label>Typography Scale</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  max={24}
                  min={12}
                  step={1}
                  disabled={isLocked}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
