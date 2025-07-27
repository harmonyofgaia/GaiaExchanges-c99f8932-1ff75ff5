import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Palette, LayoutDashboard, Zap, Eye } from 'lucide-react'

export interface VisualControlSettings {
  style: string
  intensity: number
  neural: boolean
  matrix: boolean
}

export const EnhancedVisualControls = () => {
  const [backgroundConfig, setBackgroundConfig] = useState<VisualControlSettings>({
    style: 'neural-matrix',
    intensity: 80,
    neural: true,
    matrix: true
  })

  const handleBackgroundChange = (key: string, value: string | number | boolean) => {
    setBackgroundConfig(prev => ({
      ...prev,
      [key]: value
    }))

    // Dispatch custom event to notify components of the style update
    const event = new CustomEvent('admin-style-update', {
      detail: { background: backgroundConfig }
    })
    window.dispatchEvent(event)
  }
  
  const [advancedSettings, setAdvancedSettings] = useState({
    particleCount: 50,
    animationSpeed: 1.0,
    blurIntensity: 0.5,
    glowStrength: 0.7,
    colorShift: 0.3,
    waveAmplitude: 0.8,
    fractalComplexity: 0.6,
    hologramIntensity: 0.4,
    matrixDensity: 0.5,
    neuralConnections: 0.7
  })

  const [templateSettings, setTemplateSettings] = useState({
    selectedTemplate: 'default',
    customization: {
      primaryColor: '#00ff00',
      secondaryColor: '#0080ff',
      accentColor: '#ff00ff',
      backgroundPattern: 'matrix',
      fontFamily: 'Inter',
      borderRadius: 8,
      spacing: 16,
      shadows: true,
      animations: true
    }
  })

  const predefinedTemplates = [
    {
      id: 'eco-forest',
      name: 'Eco Forest',
      description: 'Nature-inspired green theme',
      preview: '🌲',
      settings: {
        primaryColor: '#22c55e',
        secondaryColor: '#16a34a',
        accentColor: '#65a30d',
        backgroundPattern: 'organic',
        animations: true
      }
    },
    {
      id: 'ocean-depths',
      name: 'Ocean Depths',
      description: 'Deep ocean blue theme',
      preview: '🌊',
      settings: {
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        accentColor: '#0369a1',
        backgroundPattern: 'waves',
        animations: true
      }
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'High-tech neon theme',
      preview: '⚡',
      settings: {
        primaryColor: '#a855f7',
        secondaryColor: '#9333ea',
        accentColor: '#7c3aed',
        backgroundPattern: 'matrix',
        animations: true
      }
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean and simple design',
      preview: '⚪',
      settings: {
        primaryColor: '#64748b',
        secondaryColor: '#475569',
        accentColor: '#334155',
        backgroundPattern: 'none',
        animations: false
      }
    }
  ]

  const handleTemplateSelect = (template: any) => {
    setTemplateSettings(prev => ({
      ...prev,
      selectedTemplate: template.id,
      customization: {
        ...prev.customization,
        ...template.settings
      }
    }))
    
    // Apply template immediately
    document.documentElement.style.setProperty('--primary-color', template.settings.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', template.settings.secondaryColor)
    document.documentElement.style.setProperty('--accent-color', template.settings.accentColor)
  }

  const handleAdvancedSettingChange = (key: string, value: number) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            Design Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {predefinedTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all ${
                  templateSettings.selectedTemplate === template.id
                    ? 'border-purple-400 bg-purple-900/20'
                    : 'border-gray-600 hover:border-purple-500/50'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{template.preview}</div>
                  <h3 className="font-semibold text-purple-400">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Visual Settings */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Zap className="h-5 w-5" />
            Advanced Visual Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(advancedSettings).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-blue-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <span className="text-sm text-muted-foreground">{value.toFixed(2)}</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={([newValue]) => handleAdvancedSettingChange(key, newValue)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Palette className="h-5 w-5" />
            Color Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-green-400">Primary Color</Label>
              <Input
                type="color"
                value={templateSettings.customization.primaryColor}
                onChange={(e) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    primaryColor: e.target.value
                  }
                }))}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-green-400">Secondary Color</Label>
              <Input
                type="color"
                value={templateSettings.customization.secondaryColor}
                onChange={(e) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    secondaryColor: e.target.value
                  }
                }))}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-green-400">Accent Color</Label>
              <Input
                type="color"
                value={templateSettings.customization.accentColor}
                onChange={(e) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    accentColor: e.target.value
                  }
                }))}
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Controls */}
      <Card className="border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <LayoutDashboard className="h-5 w-5" />
            Layout Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-orange-400">Spacing</Label>
              <Select
                value={templateSettings.customization.spacing.toString()}
                onValueChange={(value) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    spacing: parseInt(value)
                  }
                }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Tight</SelectItem>
                  <SelectItem value="16">Normal</SelectItem>
                  <SelectItem value="24">Comfortable</SelectItem>
                  <SelectItem value="32">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-orange-400">Border Radius</Label>
              <Select
                value={templateSettings.customization.borderRadius.toString()}
                onValueChange={(value) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    borderRadius: parseInt(value)
                  }
                }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Sharp</SelectItem>
                  <SelectItem value="4">Subtle</SelectItem>
                  <SelectItem value="8">Rounded</SelectItem>
                  <SelectItem value="16">Very Rounded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-orange-400">Font Family</Label>
              <Select
                value={templateSettings.customization.fontFamily}
                onValueChange={(value) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    fontFamily: value
                  }
                }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-orange-400">Drop Shadows</Label>
              <Switch
                checked={templateSettings.customization.shadows}
                onCheckedChange={(checked) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    shadows: checked
                  }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-orange-400">Animations</Label>
              <Switch
                checked={templateSettings.customization.animations}
                onCheckedChange={(checked) => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    animations: checked
                  }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Effects */}
      <Card className="border-pink-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-400">
            <Eye className="h-5 w-5" />
            Background Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['matrix', 'neural', 'organic', 'waves', 'particles', 'geometric', 'fractal', 'hologram'].map((effect) => (
              <Button
                key={effect}
                variant={templateSettings.customization.backgroundPattern === effect ? 'default' : 'outline'}
                className="capitalize"
                onClick={() => setTemplateSettings(prev => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    backgroundPattern: effect
                  }
                }))}
              >
                {effect}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Changes */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            // Reset to default
            setTemplateSettings({
              selectedTemplate: 'default',
              customization: {
                primaryColor: '#00ff00',
                secondaryColor: '#0080ff',
                accentColor: '#ff00ff',
                backgroundPattern: 'matrix',
                fontFamily: 'Inter',
                borderRadius: 8,
                spacing: 16,
                shadows: true,
                animations: true
              }
            })
          }}
        >
          Reset to Default
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={() => {
            // Apply all changes
            console.log('Applying visual changes:', templateSettings, advancedSettings)
            // Here you would actually apply the changes to the UI
          }}
        >
          Apply Changes
        </Button>
      </div>
    </div>
  )
}
