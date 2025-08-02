import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Sparkles, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Cpu, 
  Zap,
  Palette,
  Layers,
  Download,
  Save,
  RefreshCw,
  Play,
  Pause,
  Settings,
  Wand2,
  Brush,
  Camera,
  Film
} from 'lucide-react'
import { toast } from 'sonner'

interface CreativeAsset {
  id: string
  name: string
  type: 'image' | 'video' | 'generated'
  url: string
  thumbnail: string
  metadata: {
    width: number
    height: number
    duration?: number
    size: number
    created: Date
  }
  processedVariants?: {
    abstract: string
    animated: string
    neural: string
    liquid: string
  }
}

interface DesignTemplate {
  id: string
  name: string
  description: string
  background: unknown
  colors: string[]
  animations: unknown[]
  effects: unknown[]
  created: Date
  isDefault?: boolean
}

interface CreativeEngineProps {
  className?: string
  onAssetGenerated?: (asset: CreativeAsset) => void
  onTemplateCreated?: (template: DesignTemplate) => void
}

export function CreativeEngine({ className = '', onAssetGenerated, onTemplateCreated }: CreativeEngineProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [assets, setAssets] = useState<CreativeAsset[]>([])
  const [templates, setTemplates] = useState<DesignTemplate[]>([])
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null)
  const [processingParams, setProcessingParams] = useState({
    style: 'abstract',
    intensity: 50,
    speed: 30,
    complexity: 40,
    colorHarmony: 'complementary',
    animationType: 'flowing',
    neuralDensity: 60
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved assets and templates
  useEffect(() => {
    const savedAssets = localStorage.getItem('gaia-creative-assets')
    const savedTemplates = localStorage.getItem('gaia-design-templates')
    
    if (savedAssets) {
      try {
        setAssets(JSON.parse(savedAssets))
      } catch (e) {
        console.warn('Failed to load saved assets')
      }
    }
    
    if (savedTemplates) {
      try {
        setTemplates(JSON.parse(savedTemplates))
      } catch (e) {
        console.warn('Failed to load saved templates')
      }
    }
  }, [])

  // Save assets and templates when they change
  useEffect(() => {
    localStorage.setItem('gaia-creative-assets', JSON.stringify(assets))
  }, [assets])

  useEffect(() => {
    localStorage.setItem('gaia-design-templates', JSON.stringify(templates))
  }, [templates])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsProcessing(true)
    
    try {
      for (const file of Array.from(files)) {
        const asset = await processUploadedFile(file)
        setAssets(prev => [...prev, asset])
        onAssetGenerated?.(asset)
      }
      toast.success(`Uploaded and processed ${files.length} file(s)`)
    } catch (error) {
      toast.error('Failed to process uploaded files')
    } finally {
      setIsProcessing(false)
    }
  }

  const processUploadedFile = async (file: File): Promise<CreativeAsset> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const url = e.target?.result as string
        
        const asset: CreativeAsset = {
          id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          url,
          thumbnail: url, // In real implementation, generate thumbnail
          metadata: {
            width: 1920, // Would be extracted from actual file
            height: 1080,
            duration: file.type.startsWith('video/') ? 30 : undefined,
            size: file.size,
            created: new Date()
          }
        }

        // Generate processed variants using the creative engine
        asset.processedVariants = await generateVariants(asset)
        resolve(asset)
      }
      reader.readAsDataURL(file)
    })
  }

  const generateVariants = async (asset: CreativeAsset): Promise<CreativeAsset['processedVariants']> => {
    // Simulate creative processing - in real implementation, this would use advanced algorithms
    const variants = {
      abstract: await generateAbstractVariant(asset),
      animated: await generateAnimatedVariant(asset),
      neural: await generateNeuralVariant(asset),
      liquid: await generateLiquidVariant(asset)
    }
    
    return variants
  }

  const generateAbstractVariant = async (asset: CreativeAsset): Promise<string> => {
    // Simulate abstract art generation from the source asset
    return asset.url // Placeholder - would process the asset into abstract art
  }

  const generateAnimatedVariant = async (asset: CreativeAsset): Promise<string> => {
    // Simulate living animation generation
    return asset.url // Placeholder - would create living animations
  }

  const generateNeuralVariant = async (asset: CreativeAsset): Promise<string> => {
    // Simulate neural network pattern generation
    return asset.url // Placeholder - would create neural-inspired patterns
  }

  const generateLiquidVariant = async (asset: CreativeAsset): Promise<string> => {
    // Simulate liquid animation generation
    return asset.url // Placeholder - would create liquid flow animations
  }

  const generateDesignFromAI = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate AI design generation
      const generatedAsset: CreativeAsset = {
        id: `generated-${Date.now()}`,
        name: `AI Generated Design ${Date.now()}`,
        type: 'generated',
        url: generateProceduralArt(),
        thumbnail: generateProceduralArt(),
        metadata: {
          width: 1920,
          height: 1080,
          size: 1024 * 1024, // 1MB simulated
          created: new Date()
        },
        processedVariants: {
          abstract: generateProceduralArt(),
          animated: generateProceduralArt(),
          neural: generateProceduralArt(),
          liquid: generateProceduralArt()
        }
      }
      
      setAssets(prev => [...prev, generatedAsset])
      onAssetGenerated?.(generatedAsset)
      toast.success('AI-generated design created successfully!')
    } catch (error) {
      toast.error('Failed to generate AI design')
    } finally {
      setIsProcessing(false)
    }
  }

  const generateProceduralArt = (): string => {
    // Create procedural art using canvas
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 300
    const ctx = canvas.getContext('2d')!
    
    // Generate abstract procedural pattern
    const gradient = ctx.createLinearGradient(0, 0, 400, 300)
    gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 50%)`)
    gradient.addColorStop(0.5, `hsl(${Math.random() * 360}, 70%, 40%)`)
    gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 30%)`)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 300)
    
    // Add procedural patterns
    for (let i = 0; i < 50; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * 400,
        Math.random() * 300,
        Math.random() * 20 + 5,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
      ctx.fill()
    }
    
    return canvas.toDataURL()
  }

  const createDesignTemplate = () => {
    if (!selectedAsset) {
      toast.error('Please select an asset first')
      return
    }

    const template: DesignTemplate = {
      id: `template-${Date.now()}`,
      name: `Template for ${selectedAsset.name}`,
      description: 'Auto-generated from creative asset',
      background: {
        type: 'custom',
        asset: selectedAsset,
        variant: 'abstract'
      },
      colors: extractColorsFromAsset(selectedAsset),
      animations: generateAnimationsFromAsset(selectedAsset),
      effects: generateEffectsFromAsset(selectedAsset),
      created: new Date()
    }

    setTemplates(prev => [...prev, template])
    onTemplateCreated?.(template)
    toast.success('Design template created!')
  }

  const extractColorsFromAsset = (asset: CreativeAsset): string[] => {
    // Simulate color extraction from asset
    return [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
    ]
  }

  const generateAnimationsFromAsset = (asset: CreativeAsset): unknown[] => {
    // Generate animation parameters based on asset properties
    return [
      { type: 'flow', speed: processingParams.speed / 100, direction: 'radial' },
      { type: 'pulse', intensity: processingParams.intensity / 100, frequency: 0.5 },
      { type: 'morph', complexity: processingParams.complexity / 100, style: processingParams.style }
    ]
  }

  const generateEffectsFromAsset = (asset: CreativeAsset): unknown[] => {
    // Generate visual effects based on asset
    return [
      { type: 'glow', intensity: 0.7, color: '#ffffff' },
      { type: 'blur', radius: 2, selective: true },
      { type: 'distortion', amount: 0.3, pattern: 'wave' }
    ]
  }

  return (
    <div className={`creative-engine ${className}`}>
      <Card className="bg-gray-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Sparkles className="w-5 h-5" />
            Creative Processing Engine
            <Badge variant="outline" className="ml-auto">
              {isProcessing ? 'Processing...' : 'Ready'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="generate">AI Generate</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-300 mb-4">
                  Upload images or videos to process with the creative engine
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
              </div>

              {assets.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {assets.map((asset) => (
                    <Card 
                      key={asset.id}
                      className={`cursor-pointer transition-all ${
                        selectedAsset?.id === asset.id 
                          ? 'ring-2 ring-purple-500 bg-purple-900/20' 
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-700 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                          {asset.type === 'video' ? (
                            <Film className="w-8 h-8 text-gray-400" />
                          ) : (
                            <img 
                              src={asset.thumbnail} 
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <p className="text-sm text-gray-300 truncate">{asset.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {asset.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Style</Label>
                    <Select value={processingParams.style} onValueChange={(value) => 
                      setProcessingParams(prev => ({ ...prev, style: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abstract">Abstract Art</SelectItem>
                        <SelectItem value="neural">Neural Networks</SelectItem>
                        <SelectItem value="liquid">Liquid Dynamics</SelectItem>
                        <SelectItem value="geometric">Geometric Patterns</SelectItem>
                        <SelectItem value="organic">Organic Forms</SelectItem>
                        <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Intensity: {processingParams.intensity}</Label>
                    <Slider
                      value={[processingParams.intensity]}
                      onValueChange={([value]) => 
                        setProcessingParams(prev => ({ ...prev, intensity: value }))
                      }
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Complexity: {processingParams.complexity}</Label>
                    <Slider
                      value={[processingParams.complexity]}
                      onValueChange={([value]) => 
                        setProcessingParams(prev => ({ ...prev, complexity: value }))
                      }
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Animation Speed: {processingParams.speed}</Label>
                    <Slider
                      value={[processingParams.speed]}
                      onValueChange={([value]) => 
                        setProcessingParams(prev => ({ ...prev, speed: value }))
                      }
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Neural Density: {processingParams.neuralDensity}</Label>
                    <Slider
                      value={[processingParams.neuralDensity]}
                      onValueChange={([value]) => 
                        setProcessingParams(prev => ({ ...prev, neuralDensity: value }))
                      }
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Color Harmony</Label>
                    <Select value={processingParams.colorHarmony} onValueChange={(value) => 
                      setProcessingParams(prev => ({ ...prev, colorHarmony: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complementary">Complementary</SelectItem>
                        <SelectItem value="triadic">Triadic</SelectItem>
                        <SelectItem value="analogous">Analogous</SelectItem>
                        <SelectItem value="monochromatic">Monochromatic</SelectItem>
                        <SelectItem value="rainbow">Rainbow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generateDesignFromAI}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isProcessing ? 'Generating...' : 'Generate AI Design'}
              </Button>
            </TabsContent>

            <TabsContent value="process" className="space-y-4">
              {selectedAsset ? (
                <div className="space-y-4">
                  <Card className="bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-200">
                        Processing: {selectedAsset.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedAsset.processedVariants && Object.entries(selectedAsset.processedVariants).map(([type, url]) => (
                          <Card key={type} className="bg-gray-700/50">
                            <CardContent className="p-4">
                              <div className="aspect-square bg-gray-600 rounded mb-2 flex items-center justify-center">
                                <img src={url} alt={`${type} variant`} className="w-full h-full object-cover rounded" />
                              </div>
                              <p className="text-sm text-gray-300 capitalize">{type}</p>
                              <Button 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={() => toast.success(`Applied ${type} variant`)}
                              >
                                Apply
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Button 
                        onClick={createDesignTemplate}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Create Template from Asset
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Cpu className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">Select an asset to process with the creative engine</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              {templates.length === 0 ? (
                <div className="text-center py-8">
                  <Layers className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">No design templates created yet</p>
                  <p className="text-sm text-gray-500">Process assets to create templates</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="bg-gray-800/50 hover:bg-gray-700/50 transition-all">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-3 flex items-center justify-center">
                          <Palette className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="font-medium text-gray-200 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                        <div className="flex gap-2 mb-3">
                          {template.colors.slice(0, 4).map((color, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full border border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Apply
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}