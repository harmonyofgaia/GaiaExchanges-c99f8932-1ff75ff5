import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Palette, 
  Lock, 
  Unlock, 
  Settings, 
  Upload, 
  Download,
  RefreshCw,
  Eye,
  Save,
  Trash2,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'
import { EnhancedBackgroundType, BackgroundConfig, updateBackgroundConfig } from '../backgrounds/EnhancedBackgroundManager'

interface ThemeDesignerProps {
  isLocked?: boolean
  onLockToggle?: () => void
}

export function ThemeDesigner({ isLocked = false, onLockToggle }: ThemeDesignerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<BackgroundConfig>(() => {
    const saved = localStorage.getItem('gaia-enhanced-background-config')
    return saved ? JSON.parse(saved) : {
      type: 'matrix' as EnhancedBackgroundType,
      intensity: 'medium' as const,
      color: '#00ff00',
      speed: 1,
      autoGenerate: false
    }
  })
  
  const [presets, setPresets] = useState(() => {
    const saved = localStorage.getItem('gaia-theme-presets')
    return saved ? JSON.parse(saved) : []
  })

  const [presetName, setPresetName] = useState('')

  const backgroundTypes: { value: EnhancedBackgroundType, label: string, description: string, patterns?: string[] }[] = [
    { value: 'matrix', label: 'Matrix', description: 'Classic digital rain effect' },
    { value: 'liquid', label: 'Liquid', description: 'Flowing liquid animations' },
    { value: 'puzzle', label: 'Puzzle', description: 'Floating puzzle pieces' },
    { value: 'water', label: 'Water', description: 'Rippling water surface' },
    { 
      value: 'neuro', 
      label: 'Enhanced Neural', 
      description: 'Advanced neural network patterns',
      patterns: ['creative', 'abstract', 'organic', 'geometric', 'default']
    },
    { value: 'animated', label: 'Animated Cycle', description: 'Cycles through effects' },
    { value: 'daily-theme', label: 'Daily Theme', description: 'Auto-generated daily' }
  ]

  const colorPresets = [
    { name: 'Matrix Green', value: '#00ff00' },
    { name: 'Ocean Blue', value: '#0080ff' },
    { name: 'Cyber Purple', value: '#ff00ff' },
    { name: 'Electric Yellow', value: '#ffff00' },
    { name: 'Flame Orange', value: '#ff8000' },
    { name: 'Deep Purple', value: '#8000ff' },
    { name: 'Neon Pink', value: '#ff0080' },
    { name: 'Arctic Blue', value: '#00ffff' }
  ]

  useEffect(() => {
    // Listen for config changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gaia-enhanced-background-config' && e.newValue) {
        setConfig(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleConfigUpdate = (updates: Partial<BackgroundConfig>) => {
    if (isLocked) {
      toast.error('Theme Designer is locked', {
        description: 'Unlock to modify themes',
        duration: 3000
      })
      return
    }

    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    updateBackgroundConfig(updates)
    
    toast.success('Theme updated', {
      description: 'Background settings applied',
      duration: 2000
    })
  }

  const savePreset = () => {
    if (!presetName.trim()) {
      toast.error('Please enter a preset name')
      return
    }

    const newPreset = {
      id: Date.now().toString(),
      name: presetName.trim(),
      config: { ...config },
      createdAt: new Date().toISOString()
    }

    const updatedPresets = [...presets, newPreset]
    setPresets(updatedPresets)
    localStorage.setItem('gaia-theme-presets', JSON.stringify(updatedPresets))
    setPresetName('')
    
    toast.success(`Preset "${newPreset.name}" saved!`)
  }

  const loadPreset = (preset: any) => {
    handleConfigUpdate(preset.config)
    toast.success(`Loaded preset "${preset.name}"`)
  }

  const deletePreset = (presetId: string) => {
    const updatedPresets = presets.filter((p: any) => p.id !== presetId)
    setPresets(updatedPresets)
    localStorage.setItem('gaia-theme-presets', JSON.stringify(updatedPresets))
    toast.success('Preset deleted')
  }

  const exportConfig = () => {
    const exportData = {
      config,
      presets,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gaia-theme-config-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Configuration exported!')
  }

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        
        if (importData.config) {
          handleConfigUpdate(importData.config)
        }
        
        if (importData.presets) {
          setPresets(importData.presets)
          localStorage.setItem('gaia-theme-presets', JSON.stringify(importData.presets))
        }
        
        toast.success('Configuration imported!')
      } catch (error) {
        toast.error('Failed to import configuration')
      }
    }
    reader.readAsText(file)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
        >
          <Palette className="h-5 w-5 mr-2" />
          Theme Designer
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 border-primary/30 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Palette className="h-6 w-6 text-green-400" />
              🎨 Theme Designer Studio
            </DialogTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onLockToggle}
                className={isLocked ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"}
              >
                {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                {isLocked ? 'Locked' : 'Unlocked'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="upload">Assets</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="background" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400">Background Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={config.type}
                    onValueChange={(value) => handleConfigUpdate({ type: value as EnhancedBackgroundType })}
                    disabled={isLocked}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label>Intensity</Label>
                    <Select
                      value={config.intensity}
                      onValueChange={(value) => handleConfigUpdate({ intensity: value as any })}
                      disabled={isLocked}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Speed: {config.speed.toFixed(1)}x</Label>
                    <Slider
                      value={[config.speed]}
                      onValueChange={([value]) => handleConfigUpdate({ speed: value })}
                      min={0.1}
                      max={3}
                      step={0.1}
                      disabled={isLocked}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.autoGenerate}
                      onCheckedChange={(checked) => handleConfigUpdate({ autoGenerate: checked })}
                      disabled={isLocked}
                    />
                    <Label>Auto-generate daily themes</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-400">Color Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={config.color}
                        onChange={(e) => handleConfigUpdate({ color: e.target.value })}
                        className="w-12 h-10 p-1 rounded"
                        disabled={isLocked}
                      />
                      <Input
                        type="text"
                        value={config.color}
                        onChange={(e) => handleConfigUpdate({ color: e.target.value })}
                        className="flex-1"
                        disabled={isLocked}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Color Presets</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorPresets.map((preset) => (
                        <Button
                          key={preset.value}
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfigUpdate({ color: preset.value })}
                          className="flex items-center gap-2 h-auto p-2"
                          disabled={isLocked}
                        >
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.value }}
                          />
                          <span className="text-xs">{preset.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-black rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-green-400">
                    <Eye className="h-8 w-8 mr-2" />
                    Background preview active in main window
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="border-green-500/50 text-green-400">
                    Type: {config.type}
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    Intensity: {config.intensity}
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    Speed: {config.speed}x
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="presets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-400">Save Current Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter preset name..."
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={savePreset} disabled={!presetName.trim()}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-400">Saved Presets</CardTitle>
              </CardHeader>
              <CardContent>
                {presets.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No saved presets yet. Create some custom themes!
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {presets.map((preset: any) => (
                      <div key={preset.id} className="flex items-center justify-between p-3 border border-primary/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.config.color }}
                          />
                          <div>
                            <div className="font-medium">{preset.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {preset.config.type} • {preset.config.intensity} • {preset.config.speed}x
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadPreset(preset)}
                          >
                            Load
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deletePreset(preset.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-400">Custom Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 border-2 border-dashed border-primary/30 rounded-lg">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Upload custom images, videos, or artwork for backgrounds
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF, WebP, MP4, WebM
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-400">Import/Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={exportConfig} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Config
                  </Button>
                  <div className="relative">
                    <Button variant="outline" asChild>
                      <label htmlFor="import-config" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Config
                      </label>
                    </Button>
                    <input
                      id="import-config"
                      type="file"
                      accept=".json"
                      onChange={importConfig}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-400">Daily Themes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-generate new themes daily</p>
                    <p className="text-sm text-muted-foreground">
                      Creates unique background combinations every day
                    </p>
                  </div>
                  <Switch
                    checked={config.autoGenerate}
                    onCheckedChange={(checked) => handleConfigUpdate({ autoGenerate: checked })}
                  />
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handleConfigUpdate({ type: 'daily-theme' })}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Daily Theme
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}