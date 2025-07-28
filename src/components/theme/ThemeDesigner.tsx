
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Palette, Brush, Wand2 } from 'lucide-react'
import { 
  updateBackgroundConfig, 
  type EnhancedBackgroundType, 
  type EnhancedBackgroundSettings 
} from '../backgrounds/EnhancedBackgroundManager'

export function ThemeDesigner() {
  const [currentTheme, setCurrentTheme] = useState({
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#00ff00',
    background: '#000000'
  })

  const presetThemes = [
    {
      name: 'Ocean Blue',
      colors: { primary: '#0066cc', secondary: '#00ccff', accent: '#66ff99', background: '#001122' }
    },
    {
      name: 'Forest Green',
      colors: { primary: '#00cc00', secondary: '#66ff66', accent: '#ffff00', background: '#002200' }
    },
    {
      name: 'Cosmic Purple',
      colors: { primary: '#6600cc', secondary: '#cc66ff', accent: '#ffcc00', background: '#220022' }
    },
    {
      name: 'Fire Red',
      colors: { primary: '#cc0000', secondary: '#ff6600', accent: '#ffff66', background: '#220000' }
    }
  ]

  const handleThemeChange = (theme: any) => {
    setCurrentTheme(theme.colors)
    
    // Update background with theme colors
    updateBackgroundConfig({
      color: theme.colors.primary,
      intensity: 'medium'
    })
    
    console.log('🎨 Theme applied:', theme.name)
  }

  const handleColorChange = (colorType: string, value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      [colorType]: value
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            Theme Designer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Customization */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary"
                  type="color"
                  value={currentTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={currentTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary"
                  type="color"
                  value={currentTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={currentTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent"
                  type="color"
                  value={currentTheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={currentTheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={currentTheme.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={currentTheme.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Preset Themes */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-400">Preset Themes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {presetThemes.map((theme, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{theme.name}</span>
                    <Badge variant="secondary">4 colors</Badge>
                  </div>
                  <div className="flex gap-1">
                    {Object.values(theme.colors).map((color, colorIndex) => (
                      <div 
                        key={colorIndex}
                        className="w-6 h-6 rounded border border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleThemeChange(theme)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Apply Theme
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-purple-400">Preview</h4>
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.primary
              }}
            >
              <div style={{ color: currentTheme.primary }} className="font-bold mb-2">
                Primary Text
              </div>
              <div style={{ color: currentTheme.secondary }} className="mb-2">
                Secondary Text
              </div>
              <div 
                className="inline-block px-3 py-1 rounded text-black font-medium"
                style={{ backgroundColor: currentTheme.accent }}
              >
                Accent Element
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
