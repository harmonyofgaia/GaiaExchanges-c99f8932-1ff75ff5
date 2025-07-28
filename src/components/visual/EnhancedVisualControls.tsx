
import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Palette, Settings, Wand2, Download, Upload, Brush, Eraser,
  Square, Circle, Type, Undo2, Redo2, Save, FolderOpen,
  Shuffle, RotateCcw, Eye, EyeOff, Lock, Unlock, Play, Pause,
  Grid, List, Search, Heart, Star, Dice1, Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import { useLock } from '@/components/providers/ThemeProvider'
import { useGlobalBackground } from '@/hooks/useGlobalBackground'
import { useDebounce } from '@/hooks/useDebounce'

interface ColorPalette {
  name: string
  colors: string[]
  id: string
}

interface DesignAsset {
  id: string
  name: string
  type: 'template' | 'color' | 'pattern'
  data: any
  favorite: boolean
  tags: string[]
}

export function EnhancedVisualControls() {
  const { isLocked } = useLock()
  const { backgroundStyle, changeBackground } = useGlobalBackground()
  
  // Color Palette State
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null)
  const [customColors, setCustomColors] = useState(['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'])
  const [isGeneratingPalette, setIsGeneratingPalette] = useState(false)
  
  // Background Controls State
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [backgroundSpeed, setBackgroundSpeed] = useState(1)
  const [isBackgroundLocked, setIsBackgroundLocked] = useState(false)
  const [autoChangeTimer, setAutoChangeTimer] = useState(0)
  const [layerVisibility, setLayerVisibility] = useState({
    particles: true,
    waves: true,
    neural: true
  })
  
  // Art Studio State
  const [canvasRef] = useState(useRef<HTMLCanvasElement>(null))
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#22c55e')
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser' | 'text' | 'shape'>('brush')
  const [drawHistory, setDrawHistory] = useState<string[]>([])
  const [historyStep, setHistoryStep] = useState(0)
  
  // Design Library State
  const [designAssets, setDesignAssets] = useState<DesignAsset[]>([])
  const [libraryView, setLibraryView] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  
  const debouncedIntensity = useDebounce(backgroundIntensity, 300)
  const debouncedSpeed = useDebounce(backgroundSpeed, 300)

  // Predefined color palettes
  const colorPalettes: ColorPalette[] = [
    {
      id: 'gaia',
      name: 'GAiA Harmony',
      colors: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']
    },
    {
      id: 'ocean',
      name: 'Deep Ocean',
      colors: ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e']
    },
    {
      id: 'sunset',
      name: 'Cosmic Sunset',
      colors: ['#f97316', '#ea580c', '#dc2626', '#b91c1c', '#991b1b']
    },
    {
      id: 'forest',
      name: 'Mystic Forest',
      colors: ['#059669', '#047857', '#065f46', '#064e3b', '#022c22']
    },
    {
      id: 'galaxy',
      name: 'Galaxy Dreams',
      colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95']
    }
  ]

  // Apply color palette to DOM
  const applyColorPalette = useCallback((colors: string[]) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    const root = document.documentElement as HTMLElement
    colors.forEach((color, index) => {
      root.style.setProperty(`--color-accent-${index + 1}`, color)
    })
    
    toast.success('Color palette applied successfully!')
  }, [isLocked])

  // Background control effects
  useEffect(() => {
    if (isLocked) return

    const root = document.documentElement as HTMLElement
    root.style.setProperty('--bg-intensity', `${debouncedIntensity}%`)
    root.style.setProperty('--bg-speed', `${debouncedSpeed}`)
  }, [debouncedIntensity, debouncedSpeed, isLocked])

  // Auto background change timer
  useEffect(() => {
    if (!autoChangeTimer || isBackgroundLocked) return

    const interval = setInterval(() => {
      const styles = ['plasma', 'galaxy', 'forest', 'ocean', 'fire', 'ice']
      const currentIndex = styles.indexOf(backgroundStyle)
      const nextIndex = (currentIndex + 1) % styles.length
      changeBackground(styles[nextIndex] as any)
    }, autoChangeTimer * 1000)

    return () => clearInterval(interval)
  }, [autoChangeTimer, isBackgroundLocked, backgroundStyle, changeBackground])

  const generateAIPalette = async () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    setIsGeneratingPalette(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const aiColors = [
        `hsl(${Math.random() * 360}, 70%, 50%)`,
        `hsl(${Math.random() * 360}, 70%, 50%)`,
        `hsl(${Math.random() * 360}, 70%, 50%)`,
        `hsl(${Math.random() * 360}, 70%, 50%)`,
        `hsl(${Math.random() * 360}, 70%, 50%)`
      ]
      setCustomColors(aiColors)
      applyColorPalette(aiColors)
      setIsGeneratingPalette(false)
      toast.success('AI color palette generated!')
    }, 2000)
  }

  const shuffleBackground = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    const styles = ['classic', 'plasma', 'galaxy', 'forest', 'ocean', 'fire', 'ice', 'void', 'rainbow', 'matrix']
    const randomStyle = styles[Math.floor(Math.random() * styles.length)]
    changeBackground(randomStyle as any)
    toast.success(`Background changed to ${randomStyle}`)
  }

  const resetBackground = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }

    changeBackground('classic')
    setBackgroundIntensity(50)
    setBackgroundSpeed(1)
    toast.success('Background reset to defaults')
  }

  const saveCanvas = () => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'gaia-artwork.png'
    link.href = dataURL
    link.click()
    
    toast.success('Artwork saved!')
  }

  const clearCanvas = () => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      toast.success('Canvas cleared!')
    }
  }

  const exportDesigns = () => {
    const designData = {
      palettes: colorPalettes,
      customColors,
      backgroundSettings: {
        style: backgroundStyle,
        intensity: backgroundIntensity,
        speed: backgroundSpeed
      },
      assets: designAssets
    }
    
    const dataStr = JSON.stringify(designData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'gaia-designs.json'
    link.click()
    
    URL.revokeObjectURL(url)
    toast.success('Designs exported!')
  }

  const importDesigns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        // Apply imported settings
        if (data.customColors) setCustomColors(data.customColors)
        if (data.backgroundSettings) {
          setBackgroundIntensity(data.backgroundSettings.intensity)
          setBackgroundSpeed(data.backgroundSettings.speed)
        }
        toast.success('Designs imported successfully!')
      } catch (error) {
        toast.error('Invalid design file format')
      }
    }
    reader.readAsText(file)
  }

  const filteredAssets = designAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFavorites = !showFavorites || asset.favorite
    return matchesSearch && matchesFavorites
  })

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">🎨 Colors</TabsTrigger>
          <TabsTrigger value="backgrounds">🌈 Backgrounds</TabsTrigger>
          <TabsTrigger value="studio">🖌️ Art Studio</TabsTrigger>
          <TabsTrigger value="library">📚 Library</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Palette className="h-5 w-5" />
                Advanced Color Palette Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Predefined Palettes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Choose Predefined Palette</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {colorPalettes.map((palette) => (
                    <div key={palette.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{palette.name}</span>
                        <Badge variant="secondary">{palette.colors.length} colors</Badge>
                      </div>
                      <div className="flex gap-1">
                        {palette.colors.map((color, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 rounded border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <Button 
                        onClick={() => applyColorPalette(palette.colors)}
                        size="sm"
                        className="w-full"
                        disabled={isLocked}
                      >
                        <Wand2 className="h-3 w-3 mr-1" />
                        Apply {palette.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Custom Color Palette</Label>
                <div className="grid grid-cols-5 gap-2">
                  {customColors.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...customColors]
                          newColors[index] = e.target.value
                          setCustomColors(newColors)
                        }}
                        disabled={isLocked}
                        className="h-12 w-full"
                      />
                      <div className="text-xs text-center text-muted-foreground">
                        Color {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => applyColorPalette(customColors)}
                    disabled={isLocked}
                    className="flex-1"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Apply Custom
                  </Button>
                  <Button
                    onClick={generateAIPalette}
                    disabled={isLocked || isGeneratingPalette}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGeneratingPalette ? 'Generating...' : 'AI Generate'}
                  </Button>
                </div>
              </div>

              {/* Import/Export */}
              <div className="flex gap-2">
                <Button onClick={exportDesigns} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Palette
                </Button>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept=".json"
                    onChange={importDesigns}
                    disabled={isLocked}
                    className="hidden"
                    id="import-designs"
                  />
                  <Button asChild variant="outline" className="w-full">
                    <label htmlFor="import-designs" className="cursor-pointer flex items-center justify-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Palette
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backgrounds" className="space-y-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-5 w-5" />
                Advanced Background Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Background Style Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Background Style</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['classic', 'plasma', 'galaxy', 'forest', 'ocean', 'fire', 'ice', 'void', 'rainbow', 'matrix'].map((style) => (
                    <Button
                      key={style}
                      onClick={() => changeBackground(style as any)}
                      variant={backgroundStyle === style ? 'default' : 'outline'}
                      size="sm"
                      disabled={isLocked}
                      className="capitalize"
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Intensity and Speed Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Background Intensity: {backgroundIntensity}%
                  </Label>
                  <Slider
                    value={[backgroundIntensity]}
                    onValueChange={(value) => setBackgroundIntensity(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    disabled={isLocked}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Animation Speed: {backgroundSpeed}x
                  </Label>
                  <Slider
                    value={[backgroundSpeed]}
                    onValueChange={(value) => setBackgroundSpeed(value[0])}
                    max={3}
                    min={0.1}
                    step={0.1}
                    disabled={isLocked}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Layer Visibility */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Layer Visibility</Label>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(layerVisibility).map(([layer, visible]) => (
                    <div key={layer} className="flex items-center space-x-2">
                      <Switch
                        checked={visible}
                        onCheckedChange={(checked) => 
                          setLayerVisibility(prev => ({ ...prev, [layer]: checked }))
                        }
                        disabled={isLocked}
                      />
                      <Label className="capitalize">{layer}</Label>
                      {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Lock and Auto-change */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isBackgroundLocked}
                    onCheckedChange={setIsBackgroundLocked}
                    disabled={isLocked}
                  />
                  <Label>Lock Background</Label>
                  {isBackgroundLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="text-sm">Auto-change (seconds):</Label>
                  <Input
                    type="number"
                    value={autoChangeTimer}
                    onChange={(e) => setAutoChangeTimer(Number(e.target.value))}
                    min="0"
                    max="300"
                    disabled={isLocked}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button onClick={shuffleBackground} disabled={isLocked} variant="outline">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
                <Button onClick={resetBackground} disabled={isLocked} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={() => setAutoChangeTimer(autoChangeTimer > 0 ? 0 : 10)}
                  disabled={isLocked}
                  variant="outline"
                >
                  {autoChangeTimer > 0 ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  Auto-change
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="studio" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Brush className="h-5 w-5" />
                GAiA Art Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drawing Tools */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-1">
                  {[
                    { tool: 'brush', icon: Brush },
                    { tool: 'eraser', icon: Eraser },
                    { tool: 'text', icon: Type },
                    { tool: 'shape', icon: Square }
                  ].map(({ tool, icon: Icon }) => (
                    <Button
                      key={tool}
                      onClick={() => setCurrentTool(tool as any)}
                      variant={currentTool === tool ? 'default' : 'outline'}
                      size="sm"
                      disabled={isLocked}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Size:</Label>
                  <Slider
                    value={[brushSize]}
                    onValueChange={(value) => setBrushSize(value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="w-20"
                    disabled={isLocked}
                  />
                  <span className="text-sm w-8">{brushSize}</span>
                </div>
                
                <Input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  disabled={isLocked}
                  className="w-12 h-8"
                />
              </div>

              {/* Canvas */}
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 min-h-[300px] bg-white/5">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="border border-muted-foreground/20 rounded bg-white w-full max-w-full h-auto"
                  style={{ cursor: currentTool === 'eraser' ? 'crosshair' : 'crosshair' }}
                />
              </div>

              {/* Canvas Actions */}
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => {}} disabled={isLocked || historyStep <= 0} size="sm">
                  <Undo2 className="h-4 w-4 mr-1" />
                  Undo
                </Button>
                <Button onClick={() => {}} disabled={isLocked || historyStep >= drawHistory.length - 1} size="sm">
                  <Redo2 className="h-4 w-4 mr-1" />
                  Redo
                </Button>
                <Button onClick={saveCanvas} disabled={isLocked} size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button onClick={clearCanvas} disabled={isLocked} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Clear
                </Button>
                <Button onClick={() => {}} disabled={isLocked} variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <FolderOpen className="h-5 w-5" />
                Design Library & Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Library Controls */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setLibraryView('grid')}
                    variant={libraryView === 'grid' ? 'default' : 'outline'}
                    size="sm"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setLibraryView('list')}
                    variant={libraryView === 'list' ? 'default' : 'outline'}
                    size="sm"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setShowFavorites(!showFavorites)}
                    variant={showFavorites ? 'default' : 'outline'}
                    size="sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search designs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-48"
                    />
                  </div>
                </div>
              </div>

              {/* Asset Grid/List */}
              <div className={`${
                libraryView === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
                  : 'space-y-2'
              }`}>
                {filteredAssets.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No design assets found</p>
                    <p className="text-sm">Upload some designs to get started!</p>
                  </div>
                ) : (
                  filteredAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className={`border border-muted-foreground/20 rounded-lg p-3 hover:border-primary/50 transition-colors ${
                        libraryView === 'list' ? 'flex items-center gap-4' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{asset.name}</h4>
                          <Button
                            onClick={() => {
                              setDesignAssets(prev => 
                                prev.map(a => 
                                  a.id === asset.id 
                                    ? { ...a, favorite: !a.favorite }
                                    : a
                                )
                              )
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            {asset.favorite ? (
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <Star className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {asset.type}
                        </Badge>
                        <div className="flex gap-1 mt-2">
                          {asset.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground mb-2">Drop design files here or click to upload</p>
                <Button size="sm" disabled={isLocked}>
                  Choose Files
                </Button>
              </div>

              {/* Library Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-muted-foreground/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{designAssets.length}</div>
                  <div className="text-xs text-muted-foreground">Total Assets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {designAssets.filter(a => a.favorite).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {new Set(designAssets.flatMap(a => a.tags)).size}
                  </div>
                  <div className="text-xs text-muted-foreground">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
