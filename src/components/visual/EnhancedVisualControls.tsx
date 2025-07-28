
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
  Brush, 
  Image, 
  Settings, 
  Wand2, 
  Download, 
  Upload, 
  Play, 
  Pause, 
  RotateCcw, 
  Shuffle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Save,
  FolderOpen,
  Star,
  Grid,
  List,
  Search,
  Trash2,
  Plus,
  Minus
} from 'lucide-react'
import { toast } from 'sonner'
import { useLock } from '@/components/providers/ThemeProvider'

interface ColorPalette {
  name: string
  colors: string[]
  id: string
}

interface BackgroundSettings {
  type: 'neural' | 'matrix' | 'particles' | 'waves'
  intensity: number
  speed: number
  autoChange: boolean
  locked: boolean
  layersVisible: boolean
}

interface ArtTool {
  type: 'brush' | 'eraser' | 'rectangle' | 'circle' | 'text'
  size: number
  color: string
}

interface DesignAsset {
  id: string
  name: string
  type: 'template' | 'custom' | 'ai-generated'
  preview: string
  favorite: boolean
  created: Date
}

export function EnhancedVisualControls() {
  const { isLocked } = useLock()
  
  // Color Palette State
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([
    { id: '1', name: 'Ocean Breeze', colors: ['#0066cc', '#00ccff', '#66ffff', '#b3e5fc'] },
    { id: '2', name: 'Forest Harmony', colors: ['#2d5016', '#4caf50', '#8bc34a', '#c8e6c9'] },
    { id: '3', name: 'Sunset Glow', colors: ['#ff5722', '#ff9800', '#ffc107', '#fff3e0'] },
    { id: '4', name: 'Cosmic Purple', colors: ['#4a148c', '#7b1fa2', '#9c27b0', '#e1bee7'] }
  ])
  const [selectedPalette, setSelectedPalette] = useState<string>('')
  const [isGeneratingPalette, setIsGeneratingPalette] = useState(false)

  // Background Control State
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    type: 'neural',
    intensity: 50,
    speed: 1,
    autoChange: false,
    locked: false,
    layersVisible: true
  })
  const [autoTimer, setAutoTimer] = useState<NodeJS.Timeout | null>(null)

  // Art Studio State
  const [artTool, setArtTool] = useState<ArtTool>({
    type: 'brush',
    size: 10,
    color: '#00ff00'
  })
  const [canvasHistory, setCanvasHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isAiGenerating, setIsAiGenerating] = useState(false)

  // Design Library State
  const [designAssets, setDesignAssets] = useState<DesignAsset[]>([
    { id: '1', name: 'Neural Network', type: 'template', preview: '🧠', favorite: false, created: new Date() },
    { id: '2', name: 'Matrix Rain', type: 'template', preview: '🌧️', favorite: true, created: new Date() },
    { id: '3', name: 'Particle System', type: 'ai-generated', preview: '✨', favorite: false, created: new Date() }
  ])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('enhanced-visual-controls')
    if (saved) {
      try {
        const settings = JSON.parse(saved)
        setBackgroundSettings(prev => ({ ...prev, ...settings.background }))
        setSelectedPalette(settings.selectedPalette || '')
      } catch (error) {
        console.log('Could not load saved settings')
      }
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      background: backgroundSettings,
      selectedPalette,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('enhanced-visual-controls', JSON.stringify(settings))
  }

  // Auto-change background timer
  useEffect(() => {
    if (backgroundSettings.autoChange && !backgroundSettings.locked && !isLocked) {
      const timer = setInterval(() => {
        const types: BackgroundSettings['type'][] = ['neural', 'matrix', 'particles', 'waves']
        const currentIndex = types.indexOf(backgroundSettings.type)
        const nextType = types[(currentIndex + 1) % types.length]
        
        setBackgroundSettings(prev => ({ ...prev, type: nextType }))
        applyBackgroundChanges({ ...backgroundSettings, type: nextType })
        
        toast.success(`Background changed to ${nextType}`, { duration: 2000 })
      }, 10000) // Change every 10 seconds
      
      setAutoTimer(timer)
      return () => clearInterval(timer)
    } else if (autoTimer) {
      clearInterval(autoTimer)
      setAutoTimer(null)
    }
  }, [backgroundSettings.autoChange, backgroundSettings.locked, isLocked])

  // Apply color palette
  const applyColorPalette = (palette: ColorPalette) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    const root = document.documentElement
    palette.colors.forEach((color, index) => {
      root.style.setProperty(`--color-palette-${index + 1}`, color)
    })
    
    // Apply to primary theme colors
    root.style.setProperty('--primary', palette.colors[0])
    root.style.setProperty('--secondary', palette.colors[1])
    
    setSelectedPalette(palette.id)
    toast.success(`Applied ${palette.name} palette!`)
    saveSettings()
  }

  // Generate AI color palette
  const generateAIPalette = async () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    setIsGeneratingPalette(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const hues = [Math.random() * 360, Math.random() * 360, Math.random() * 360, Math.random() * 360]
      const colors = hues.map(hue => `hsl(${hue}, 70%, 50%)`)
      
      const newPalette: ColorPalette = {
        id: Date.now().toString(),
        name: `AI Generated ${new Date().getHours()}:${new Date().getMinutes()}`,
        colors
      }
      
      setColorPalettes(prev => [newPalette, ...prev])
      applyColorPalette(newPalette)
      setIsGeneratingPalette(false)
      
      toast.success('AI palette generated and applied!')
    }, 2000)
  }

  // Apply background changes
  const applyBackgroundChanges = (settings: BackgroundSettings) => {
    const backgroundElement = document.querySelector('.background-manager')
    if (backgroundElement) {
      backgroundElement.setAttribute('data-type', settings.type)
      backgroundElement.setAttribute('data-intensity', settings.intensity.toString())
      backgroundElement.setAttribute('data-speed', settings.speed.toString())
      backgroundElement.style.opacity = settings.layersVisible ? '1' : '0.3'
    }
    
    // Update CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--bg-intensity', (settings.intensity / 100).toString())
    root.style.setProperty('--bg-speed', settings.speed.toString())
    
    saveSettings()
  }

  // Shuffle background settings
  const shuffleBackground = () => {
    if (isLocked || backgroundSettings.locked) {
      toast.error('Background controls are locked')
      return
    }

    const types: BackgroundSettings['type'][] = ['neural', 'matrix', 'particles', 'waves']
    const newSettings = {
      ...backgroundSettings,
      type: types[Math.floor(Math.random() * types.length)],
      intensity: Math.floor(Math.random() * 100) + 1,
      speed: Math.random() * 3 + 0.5
    }
    
    setBackgroundSettings(newSettings)
    applyBackgroundChanges(newSettings)
    toast.success('Background shuffled!')
  }

  // Art Studio Functions
  const saveCanvasState = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const dataURL = canvas.toDataURL()
      const newHistory = canvasHistory.slice(0, historyIndex + 1)
      newHistory.push(dataURL)
      setCanvasHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const undoCanvas = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      // Apply previous state to canvas
      toast.success('Undo applied')
    }
  }

  const redoCanvas = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(historyIndex + 1)
      // Apply next state to canvas
      toast.success('Redo applied')
    }
  }

  const generateAIArt = async (style: string) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    setIsAiGenerating(true)
    toast.info(`Generating ${style} art...`)
    
    setTimeout(() => {
      const newAsset: DesignAsset = {
        id: Date.now().toString(),
        name: `AI ${style} Art`,
        type: 'ai-generated',
        preview: '🎨',
        favorite: false,
        created: new Date()
      }
      
      setDesignAssets(prev => [newAsset, ...prev])
      setIsAiGenerating(false)
      toast.success('AI art generated!')
    }, 3000)
  }

  // Design Library Functions
  const toggleFavorite = (assetId: string) => {
    setDesignAssets(prev => prev.map(asset =>
      asset.id === assetId ? { ...asset, favorite: !asset.favorite } : asset
    ))
    toast.success('Favorite updated')
  }

  const filteredAssets = designAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportSettings = () => {
    const settings = {
      colorPalettes,
      backgroundSettings,
      selectedPalette,
      designAssets,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'visual-controls-settings.json'
    a.click()
    
    toast.success('Settings exported!')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="palette" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="palette">🎨 Colors</TabsTrigger>
          <TabsTrigger value="background">🌈 Background</TabsTrigger>
          <TabsTrigger value="art">🖌️ Art Studio</TabsTrigger>
          <TabsTrigger value="library">📚 Library</TabsTrigger>
        </TabsList>

        {/* Color Palette Tab */}
        <TabsContent value="palette">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Palette className="h-5 w-5" />
                Color Palette Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorPalettes.map(palette => (
                  <div key={palette.id} className="p-4 border border-gray-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{palette.name}</h4>
                      <Badge variant={selectedPalette === palette.id ? 'default' : 'outline'}>
                        {selectedPalette === palette.id ? 'Active' : 'Apply'}
                      </Badge>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applyColorPalette(palette)}
                      disabled={isLocked}
                      className="w-full"
                    >
                      Apply Palette
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={generateAIPalette}
                  disabled={isLocked || isGeneratingPalette}
                  className="flex-1"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGeneratingPalette ? 'Generating...' : 'AI Generate'}
                </Button>
                <Button variant="outline" onClick={exportSettings}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Background Control Tab */}
        <TabsContent value="background">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Settings className="h-5 w-5" />
                Advanced Background Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Background Lock</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBackgroundSettings(prev => ({ ...prev, locked: !prev.locked }))}
                    disabled={isLocked}
                  >
                    {backgroundSettings.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                    {backgroundSettings.locked ? 'Locked' : 'Unlocked'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Background Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['neural', 'matrix', 'particles', 'waves'] as const).map(type => (
                      <Button
                        key={type}
                        variant={backgroundSettings.type === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          const newSettings = { ...backgroundSettings, type }
                          setBackgroundSettings(newSettings)
                          applyBackgroundChanges(newSettings)
                        }}
                        disabled={isLocked || backgroundSettings.locked}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Intensity: {backgroundSettings.intensity}%</Label>
                  <Slider
                    value={[backgroundSettings.intensity]}
                    onValueChange={(value) => {
                      const newSettings = { ...backgroundSettings, intensity: value[0] }
                      setBackgroundSettings(newSettings)
                      applyBackgroundChanges(newSettings)
                    }}
                    max={100}
                    min={0}
                    step={5}
                    disabled={isLocked || backgroundSettings.locked}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Speed: {backgroundSettings.speed.toFixed(1)}x</Label>
                  <Slider
                    value={[backgroundSettings.speed]}
                    onValueChange={(value) => {
                      const newSettings = { ...backgroundSettings, speed: value[0] }
                      setBackgroundSettings(newSettings)
                      applyBackgroundChanges(newSettings)
                    }}
                    max={5}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked || backgroundSettings.locked}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Layers Visible</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newSettings = { ...backgroundSettings, layersVisible: !backgroundSettings.layersVisible }
                      setBackgroundSettings(newSettings)
                      applyBackgroundChanges(newSettings)
                    }}
                    disabled={isLocked || backgroundSettings.locked}
                  >
                    {backgroundSettings.layersVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {backgroundSettings.layersVisible ? 'Visible' : 'Hidden'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={backgroundSettings.autoChange}
                    onCheckedChange={(checked) => 
                      setBackgroundSettings(prev => ({ ...prev, autoChange: checked }))
                    }
                    disabled={isLocked || backgroundSettings.locked}
                  />
                  <Label>Auto-change backgrounds</Label>
                </div>
                <Badge variant={backgroundSettings.autoChange ? 'default' : 'outline'}>
                  {backgroundSettings.autoChange ? 'ON' : 'OFF'}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={shuffleBackground}
                  disabled={isLocked || backgroundSettings.locked}
                  className="flex-1"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const resetSettings = {
                      type: 'neural' as const,
                      intensity: 50,
                      speed: 1,
                      autoChange: false,
                      locked: false,
                      layersVisible: true
                    }
                    setBackgroundSettings(resetSettings)
                    applyBackgroundChanges(resetSettings)
                    toast.success('Background reset!')
                  }}
                  disabled={isLocked}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Art Studio Tab */}
        <TabsContent value="art">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Brush className="h-5 w-5" />
                Art Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {(['brush', 'eraser', 'rectangle', 'circle', 'text'] as const).map(tool => (
                  <Button
                    key={tool}
                    variant={artTool.type === tool ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setArtTool(prev => ({ ...prev, type: tool }))}
                    disabled={isLocked}
                  >
                    {tool}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brush Size: {artTool.size}px</Label>
                  <Slider
                    value={[artTool.size]}
                    onValueChange={(value) => setArtTool(prev => ({ ...prev, size: value[0] }))}
                    max={50}
                    min={1}
                    step={1}
                    disabled={isLocked}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    type="color"
                    value={artTool.color}
                    onChange={(e) => setArtTool(prev => ({ ...prev, color: e.target.value }))}
                    disabled={isLocked}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={undoCanvas}
                  disabled={isLocked || historyIndex <= 0}
                  size="sm"
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Button
                  onClick={redoCanvas}
                  disabled={isLocked || historyIndex >= canvasHistory.length - 1}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Redo
                </Button>
                <Button onClick={saveCanvasState} disabled={isLocked} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button disabled={isLocked} size="sm">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Load
                </Button>
              </div>

              <div className="border-t border-gray-500/30 pt-4">
                <Label className="mb-3 block">AI Art Generation</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Abstract', 'Realistic', 'Cartoon', 'Artistic'].map(style => (
                    <Button
                      key={style}
                      variant="outline"
                      size="sm"
                      onClick={() => generateAIArt(style)}
                      disabled={isLocked || isAiGenerating}
                    >
                      {isAiGenerating ? 'Generating...' : style}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Design Library Tab */}
        <TabsContent value="library">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Image className="h-5 w-5" />
                Design Library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search designs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
              </div>

              <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredAssets.map(asset => (
                  <div
                    key={asset.id}
                    className="p-3 border border-gray-500/30 rounded-lg flex items-center gap-3"
                  >
                    <div className="text-2xl">{asset.preview}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{asset.name}</h4>
                      <p className="text-xs text-muted-foreground">{asset.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(asset.id)}
                      >
                        <Star className={`h-4 w-4 ${asset.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm" disabled={isLocked}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{filteredAssets.length} designs • {designAssets.filter(a => a.favorite).length} favorites</span>
                <Button variant="outline" size="sm" onClick={exportSettings}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
