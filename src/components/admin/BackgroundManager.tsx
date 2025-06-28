
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Eye, 
  Save, 
  Trash2, 
  Download, 
  Upload,
  Zap,
  Sparkles,
  Waves,
  Flame,
  Snowflake,
  TreePine,
  Star
} from 'lucide-react'
import { toast } from 'sonner'
import { NeuralElectricBackground } from '@/components/ui/neural-electric-background'

interface BackgroundStyle {
  id: string
  name: string
  style: 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'
  intensity: 'low' | 'medium' | 'high'
  icon: JSX.Element
  description: string
  isActive: boolean
}

interface GeneratedIllustration {
  id: string
  name: string
  style: string
  timestamp: Date
  sold: boolean
  price: number
  preview: string
}

export function BackgroundManager() {
  const [currentBackground, setCurrentBackground] = useState('classic')
  const [previewBackground, setPreviewBackground] = useState<string | null>(null)
  const [autoGenerate, setAutoGenerate] = useState(true)
  const [generatedIllustrations, setGeneratedIllustrations] = useState<GeneratedIllustration[]>([])

  const backgroundStyles: BackgroundStyle[] = [
    {
      id: 'classic',
      name: 'Classic Neural',
      style: 'classic',
      intensity: 'medium',
      icon: <Zap className="h-4 w-4" />,
      description: 'Original green neural network with electric nodes',
      isActive: true
    },
    {
      id: 'plasma',
      name: 'Plasma Storm',
      style: 'plasma',
      intensity: 'high',
      icon: <Sparkles className="h-4 w-4" />,
      description: 'Purple plasma energy with intense electrical activity',
      isActive: false
    },
    {
      id: 'galaxy',
      name: 'Galaxy Drift',
      style: 'galaxy',
      intensity: 'medium',
      icon: <Star className="h-4 w-4" />,
      description: 'Deep space blue with cosmic energy flows',
      isActive: false
    },
    {
      id: 'forest',
      name: 'Forest Essence',
      style: 'forest',
      intensity: 'low',
      icon: <TreePine className="h-4 w-4" />,
      description: 'Natural green energy with organic connections',
      isActive: false
    },
    {
      id: 'ocean',
      name: 'Ocean Depths',
      style: 'ocean',
      intensity: 'medium',
      icon: <Waves className="h-4 w-4" />,
      description: 'Deep ocean currents with flowing energy',
      isActive: false
    },
    {
      id: 'fire',
      name: 'Inferno',
      style: 'fire',
      intensity: 'high',
      icon: <Flame className="h-4 w-4" />,
      description: 'Blazing red energy with intense heat signatures',
      isActive: false
    },
    {
      id: 'ice',
      name: 'Frozen Crystal',
      style: 'ice',
      intensity: 'low',
      icon: <Snowflake className="h-4 w-4" />,
      description: 'Crystal clear ice with frozen lightning',
      isActive: false
    },
    {
      id: 'void',
      name: 'Void Walker',
      style: 'void',
      intensity: 'medium',
      icon: <Eye className="h-4 w-4" />,
      description: 'Dark void energy with mysterious connections',
      isActive: false
    },
    {
      id: 'rainbow',
      name: 'Rainbow Spectrum',
      style: 'rainbow',
      intensity: 'high',
      icon: <Palette className="h-4 w-4" />,
      description: 'Multi-colored energy with spectrum shifts',
      isActive: false
    },
    {
      id: 'matrix',
      name: 'Matrix Code',
      style: 'matrix',
      intensity: 'medium',
      icon: <Zap className="h-4 w-4" />,
      description: 'Digital green matrix with code-like patterns',
      isActive: false
    }
  ]

  // Auto-generate illustrations when idle
  useEffect(() => {
    if (!autoGenerate) return

    const generateInterval = setInterval(() => {
      const randomStyle = backgroundStyles[Math.floor(Math.random() * backgroundStyles.length)]
      const newIllustration: GeneratedIllustration = {
        id: `ill_${Date.now()}`,
        name: `${randomStyle.name} Abstract #${Date.now().toString().slice(-4)}`,
        style: randomStyle.name,
        timestamp: new Date(),
        sold: false,
        price: Math.floor(Math.random() * 500) + 100,
        preview: `🎨 ${randomStyle.name.slice(0, 2)}`
      }

      setGeneratedIllustrations(prev => [newIllustration, ...prev.slice(0, 19)]) // Keep last 20
      
      toast.success('🎨 New NFT Illustration Generated!', {
        description: `${newIllustration.name} - Ready for marketplace`,
        duration: 3000
      })
    }, 15000) // Generate every 15 seconds

    return () => clearInterval(generateInterval)
  }, [autoGenerate])

  const activateBackground = (styleId: string) => {
    setCurrentBackground(styleId)
    
    // Update localStorage for persistence
    localStorage.setItem('harmony-background', styleId)
    
    toast.success('Background Updated!', {
      description: `Applied ${backgroundStyles.find(s => s.id === styleId)?.name} background`,
      duration: 2000
    })
  }

  const sellIllustration = (illustrationId: string) => {
    setGeneratedIllustrations(prev =>
      prev.map(ill =>
        ill.id === illustrationId
          ? { ...ill, sold: true }
          : ill
      )
    )

    const illustration = generatedIllustrations.find(ill => ill.id === illustrationId)
    if (illustration) {
      toast.success('🎉 NFT Illustration Sold!', {
        description: `${illustration.name} sold for ${illustration.price} GAIA tokens`,
        duration: 4000
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Preview Background */}
      {previewBackground && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <NeuralElectricBackground 
              style={previewBackground as any}
              intensity="medium"
            />
            <div className="absolute top-4 right-4 z-10">
              <Button 
                onClick={() => setPreviewBackground(null)}
                className="bg-red-600 hover:bg-red-700"
              >
                Close Preview
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <Card className="bg-black/80 border-green-500/20">
                <CardContent className="p-4">
                  <p className="text-green-400 text-center">
                    Previewing: {backgroundStyles.find(s => s.style === previewBackground)?.name}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Palette className="h-6 w-6" />
            🎨 NEURAL BACKGROUND MANAGER
          </CardTitle>
          <p className="text-muted-foreground">
            Control interactive neural electric backgrounds and auto-generate NFT illustrations
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="backgrounds">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="backgrounds">Background Styles</TabsTrigger>
              <TabsTrigger value="illustrations">Generated NFTs</TabsTrigger>
              <TabsTrigger value="settings">Auto-Generate Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="backgrounds" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {backgroundStyles.map((bg) => (
                  <Card 
                    key={bg.id}
                    className={`border-2 hover:scale-105 transition-all duration-300 ${
                      currentBackground === bg.id 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-muted hover:border-purple-500/50'
                    }`}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {bg.icon}
                          <h3 className="font-bold">{bg.name}</h3>
                        </div>
                        {currentBackground === bg.id && (
                          <Badge className="bg-green-600">ACTIVE</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{bg.description}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setPreviewBackground(bg.style)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          onClick={() => activateBackground(bg.id)}
                          disabled={currentBackground === bg.id}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Activate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="illustrations" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-cyan-400">Auto-Generated NFT Illustrations</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">
                    {generatedIllustrations.filter(ill => !ill.sold).length} Available
                  </Badge>
                  <Badge className="bg-blue-600">
                    {generatedIllustrations.filter(ill => ill.sold).length} Sold
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {generatedIllustrations.map((illustration) => (
                  <Card 
                    key={illustration.id}
                    className={`border-2 ${
                      illustration.sold 
                        ? 'border-gray-500 opacity-50' 
                        : 'border-cyan-500/50 hover:border-cyan-400'
                    }`}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{illustration.preview}</div>
                        <h4 className="font-bold text-sm">{illustration.name}</h4>
                        <p className="text-xs text-muted-foreground">{illustration.style}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">{illustration.price} GAIA</div>
                        <div className="text-xs text-muted-foreground">
                          {illustration.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {!illustration.sold ? (
                        <Button 
                          onClick={() => sellIllustration(illustration.id)}
                          className="w-full bg-gradient-to-r from-green-600 to-cyan-600"
                          size="sm"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Sell to Marketplace
                        </Button>
                      ) : (
                        <Button 
                          disabled
                          className="w-full"
                          size="sm"
                        >
                          SOLD
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400">Auto-Generation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-Generate Illustrations</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically create new NFT illustrations when idle
                      </p>
                    </div>
                    <Button
                      onClick={() => setAutoGenerate(!autoGenerate)}
                      className={autoGenerate ? 'bg-green-600' : 'bg-gray-600'}
                    >
                      {autoGenerate ? 'ENABLED' : 'DISABLED'}
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-bold mb-2">📊 Generation Stats</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">{generatedIllustrations.length}</div>
                        <div className="text-xs text-muted-foreground">Total Generated</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {generatedIllustrations.filter(ill => ill.sold).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Sold</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {generatedIllustrations.reduce((sum, ill) => ill.sold ? sum + ill.price : sum, 0)}
                        </div>
                        <div className="text-xs text-muted-foreground">GAIA Earned</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
