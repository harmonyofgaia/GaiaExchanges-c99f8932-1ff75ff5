import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette,
  Monitor,
  Sparkles,
  Zap,
  Eye,
  Settings,
  Layout,
  Brush,
  Image,
  Sun,
  Moon,
  Contrast,
  Grid,
  Type,
  Download
} from 'lucide-react'
import { toast } from 'sonner'

export function AdminVisualControls() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('dark')
  const [animations, setAnimations] = useState(true)
  const [particles, setParticles] = useState(true)
  const [matrixEffects, setMatrixEffects] = useState(true)
  const [contrast, setContrast] = useState([100])
  const [brightness, setBrightness] = useState([100])
  const [saturation, setSaturation] = useState([100])

  const handleThemeChange = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode)
    toast.success(`Theme changed to ${mode} mode`)
  }

  const handleExportSettings = () => {
    const settings = {
      themeMode,
      animations,
      particles,
      matrixEffects,
      contrast: contrast[0],
      brightness: brightness[0],
      saturation: saturation[0]
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gaia-visual-settings.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Visual settings exported')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            Visual Controls & Theme Management
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600">UI Customization</Badge>
            <Badge className="bg-pink-600">Real-time Preview</Badge>
            <Badge className="bg-cyan-600">Export Settings</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{themeMode.toUpperCase()}</div>
              <p className="text-sm text-muted-foreground">Current Theme</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{animations ? 'ON' : 'OFF'}</div>
              <p className="text-sm text-muted-foreground">Animations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{particles ? 'ACTIVE' : 'DISABLED'}</div>
              <p className="text-sm text-muted-foreground">Particle Effects</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="theme">🎨 Theme</TabsTrigger>
          <TabsTrigger value="effects">✨ Effects</TabsTrigger>
          <TabsTrigger value="layout">📐 Layout</TabsTrigger>
          <TabsTrigger value="colors">🌈 Colors</TabsTrigger>
          <TabsTrigger value="export">💾 Export</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Monitor className="h-5 w-5" />
                Theme & Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-300">Theme Mode</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={themeMode === 'light' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('light')}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={themeMode === 'dark' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('dark')}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={themeMode === 'auto' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('auto')}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Auto
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-blue-300">Display Adjustments</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Contrast</label>
                    <span className="text-sm text-muted-foreground">{contrast[0]}%</span>
                  </div>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    max={200}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Brightness</label>
                    <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                  </div>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={150}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Saturation</label>
                    <span className="text-sm text-muted-foreground">{saturation[0]}%</span>
                  </div>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={200}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <Card className="bg-gradient-to-r from-green-900/10 to-emerald-900/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Sparkles className="h-5 w-5" />
                Visual Effects & Animations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Page Animations</h4>
                    <p className="text-sm text-muted-foreground">Enable smooth page transitions</p>
                  </div>
                  <Switch
                    checked={animations}
                    onCheckedChange={setAnimations}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Particle Effects</h4>
                    <p className="text-sm text-muted-foreground">Background particle animations</p>
                  </div>
                  <Switch
                    checked={particles}
                    onCheckedChange={setParticles}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Matrix Effects</h4>
                    <p className="text-sm text-muted-foreground">Matrix rain background effects</p>
                  </div>
                  <Switch
                    checked={matrixEffects}
                    onCheckedChange={setMatrixEffects}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Test Effects
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card className="bg-gradient-to-r from-orange-900/10 to-red-900/10 border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Layout className="h-5 w-5" />
                Layout & Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Grid className="h-6 w-6 mb-2" />
                  Grid Layout
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Layout className="h-6 w-6 mb-2" />
                  Card Layout
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-orange-300">Typography Settings</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" size="sm">
                    <Type className="h-4 w-4 mr-1" />
                    Small
                  </Button>
                  <Button variant="outline" size="sm">
                    <Type className="h-4 w-4 mr-1" />
                    Medium
                  </Button>
                  <Button variant="outline" size="sm">
                    <Type className="h-4 w-4 mr-1" />
                    Large
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-900/10 to-violet-900/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Brush className="h-5 w-5" />
                Color Scheme Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-center">
                  <div className="text-white font-medium">Ocean</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-center">
                  <div className="text-white font-medium">Forest</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-center">
                  <div className="text-white font-medium">Galaxy</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-800 text-center">
                  <div className="text-white font-medium">Sunset</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card className="bg-gradient-to-r from-cyan-900/10 to-teal-900/10 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Download className="h-5 w-5" />
                Export & Import Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleExportSettings} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Settings
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Import Settings
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Export your current visual settings as a JSON file for backup or sharing with other administrators.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}