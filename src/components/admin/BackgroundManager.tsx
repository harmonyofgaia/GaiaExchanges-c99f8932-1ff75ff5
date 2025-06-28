
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
  Star,
  Brain,
  Heart,
  Lightbulb,
  Camera
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
  artisticNote: string
  isActive: boolean
}

interface CreativeInspiration {
  id: string
  title: string
  concept: string
  colors: string[]
  mood: string
  timestamp: Date
  implemented: boolean
}

interface StoredImage {
  id: string
  name: string
  description: string
  style: string
  storedAt: Date
  usedIn: string[]
}

export function BackgroundManager() {
  const [currentBackground, setCurrentBackground] = useState('classic')
  const [previewBackground, setPreviewBackground] = useState<string | null>(null)
  const [dailyInspirations, setDailyInspirations] = useState<CreativeInspiration[]>([])
  const [storedImages] = useState<StoredImage[]>([
    {
      id: 'neural_001',
      name: 'Organic Neural Burst',
      description: 'Orange synaptic explosions with flowing dendrites',
      style: 'Organic Realism',
      storedAt: new Date(),
      usedIn: ['plasma', 'fire']
    },
    {
      id: 'neural_002', 
      name: 'Teal Network Harmony',
      description: 'Cyan-green neural pathways with pink accents',
      style: 'Cyberpunk Organic',
      storedAt: new Date(),
      usedIn: ['galaxy', 'ocean']
    },
    {
      id: 'neural_003',
      name: 'Cosmic Brain Waves',
      description: 'Blue neural space with electric connections',
      style: 'Cosmic Neural',
      storedAt: new Date(),
      usedIn: ['galaxy', 'void']
    },
    {
      id: 'neural_004',
      name: 'Purple Neural Web',
      description: 'Dense purple-blue network with electric nodes',
      style: 'Electric Web',
      storedAt: new Date(),
      usedIn: ['plasma', 'matrix']
    },
    {
      id: 'neural_005',
      name: 'Teal Neural Lightning',
      description: 'Cyan neural branches with golden cores',
      style: 'Electric Organic',
      storedAt: new Date(),
      usedIn: ['ice', 'classic']
    },
    {
      id: 'neural_006',
      name: 'Red Synaptic Fire',
      description: 'Red-pink neural network with intense activity',
      style: 'Synaptic Storm',
      storedAt: new Date(),
      usedIn: ['fire', 'rainbow']
    },
    {
      id: 'neural_007',
      name: 'Deep Ocean Neurons',
      description: 'Blue-teal neurons with orange signal bursts',
      style: 'Deep Sea Neural',
      storedAt: new Date(),
      usedIn: ['ocean', 'forest']
    }
  ])

  const backgroundStyles: BackgroundStyle[] = [
    {
      id: 'classic',
      name: 'Neural Genesis',
      style: 'classic',
      intensity: 'medium',
      icon: <Brain className="h-4 w-4" />,
      description: 'Original green neural network with organic dendrites',
      artisticNote: 'Inspired by: Deep Ocean Neurons - flowing teal pathways',
      isActive: true
    },
    {
      id: 'plasma',
      name: 'Synaptic Storm',
      style: 'plasma',
      intensity: 'high',
      icon: <Zap className="h-4 w-4" />,
      description: 'Purple plasma energy with organic neural bursts',
      artisticNote: 'Inspired by: Organic Neural Burst - explosive synaptic activity',
      isActive: false
    },
    {
      id: 'galaxy',
      name: 'Cosmic Consciousness',
      style: 'galaxy',
      intensity: 'medium',
      icon: <Star className="h-4 w-4" />,
      description: 'Deep space neural networks with cosmic energy',
      artisticNote: 'Inspired by: Cosmic Brain Waves - stellar neural pathways',
      isActive: false
    },
    {
      id: 'forest',
      name: 'Living Network',
      style: 'forest',
      intensity: 'low',
      icon: <TreePine className="h-4 w-4" />,
      description: 'Organic green neural growth with natural flow',
      artisticNote: 'Inspired by: Teal Network Harmony - natural cyberpunk fusion',
      isActive: false
    },
    {
      id: 'ocean',
      name: 'Abyssal Mind',
      style: 'ocean',
      intensity: 'medium',
      icon: <Waves className="h-4 w-4" />,
      description: 'Deep ocean neural currents with bioluminescence',
      artisticNote: 'Inspired by: Deep Ocean Neurons - aquatic neural symphony',
      isActive: false
    },
    {
      id: 'fire',
      name: 'Neural Inferno',
      style: 'fire',
      intensity: 'high',
      icon: <Flame className="h-4 w-4" />,
      description: 'Blazing neural pathways with intense synaptic fire',
      artisticNote: 'Inspired by: Red Synaptic Fire - passionate neural storm',
      isActive: false
    },
    {
      id: 'ice',
      name: 'Crystalline Thought',
      style: 'ice',
      intensity: 'low',
      icon: <Snowflake className="h-4 w-4" />,
      description: 'Frozen neural crystals with electric lightning',
      artisticNote: 'Inspired by: Teal Neural Lightning - crystalline electric flow',
      isActive: false
    },
    {
      id: 'void',
      name: 'Void Walker Mind',
      style: 'void',
      intensity: 'medium',
      icon: <Eye className="h-4 w-4" />,
      description: 'Dark neural void with mysterious consciousness',
      artisticNote: 'Inspired by: Cosmic Brain Waves - deep space neural mystery',
      isActive: false
    },
    {
      id: 'rainbow',
      name: 'Spectrum Consciousness',
      style: 'rainbow',
      intensity: 'high',
      icon: <Heart className="h-4 w-4" />,
      description: 'Multi-dimensional neural spectrum with all energies',
      artisticNote: 'Inspired by: All Neural Images - unified consciousness spectrum',
      isActive: false
    },
    {
      id: 'matrix',
      name: 'Digital Neural Code',
      style: 'matrix',
      intensity: 'medium',
      icon: <Zap className="h-4 w-4" />,
      description: 'Digital green matrix with organic neural patterns',
      artisticNote: 'Inspired by: Purple Neural Web - digital organic fusion',
      isActive: false
    }
  ]

  // Generate daily creative inspirations
  useEffect(() => {
    const generateDailyInspiration = () => {
      const inspirationConcepts = [
        'Quantum neural entanglement with golden synapses',
        'Bioluminescent deep-sea neural networks',
        'Crystalline thought patterns in aurora colors',
        'Organic circuit boards with living connections',
        'Cosmic neural webs spanning galaxies',
        'Volcanic neural eruptions with lava flows',
        'Arctic neural crystals with ice lightning',
        'Forest neural mycelia with glowing spores',
        'Ocean neural currents with whale song patterns',
        'Desert neural mirages with heat wave distortions'
      ]

      const colorPalettes = [
        ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
        ['#a8e6cf', '#dcedc8', '#ffd3a5', '#fd9853'],
        ['#667eea', '#764ba2', '#f093fb', '#f5678c'],
        ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
        ['#fa709a', '#fee140', '#f093fb', '#f5576c']
      ]

      const moods = ['Energetic', 'Serene', 'Mystical', 'Dynamic', 'Harmonious', 'Intense', 'Flowing', 'Electric']

      const newInspirations: CreativeInspiration[] = Array.from({ length: 5 }, (_, i) => ({
        id: `inspiration_${Date.now()}_${i}`,
        title: `Neural Vision ${i + 1}`,
        concept: inspirationConcepts[Math.floor(Math.random() * inspirationConcepts.length)],
        colors: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
        mood: moods[Math.floor(Math.random() * moods.length)],
        timestamp: new Date(),
        implemented: false
      }))

      setDailyInspirations(newInspirations)
    }

    generateDailyInspiration()
    
    // Generate new inspirations every 4 hours
    const interval = setInterval(generateDailyInspiration, 4 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const activateBackground = (styleId: string) => {
    setCurrentBackground(styleId)
    localStorage.setItem('harmony-background', styleId)
    
    const style = backgroundStyles.find(s => s.id === styleId)
    toast.success('🎨 Neural Background Activated!', {
      description: `${style?.name} - ${style?.artisticNote}`,
      duration: 3000
    })
  }

  const implementInspiration = (inspirationId: string) => {
    setDailyInspirations(prev =>
      prev.map(inspiration =>
        inspiration.id === inspirationId
          ? { ...inspiration, implemented: true }
          : inspiration
      )
    )

    const inspiration = dailyInspirations.find(i => i.id === inspirationId)
    if (inspiration) {
      toast.success('✨ Creative Inspiration Implemented!', {
        description: `${inspiration.concept} - Ready for neural canvas`,
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
            <Brain className="h-6 w-6" />
            🧠 NEURAL ARTISTIC CANVAS MANAGER
          </CardTitle>
          <p className="text-muted-foreground">
            Create consciousness through neural art - inspired by organic brain networks
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="backgrounds">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="backgrounds">Neural Styles</TabsTrigger>
              <TabsTrigger value="inspiration">Daily Inspiration</TabsTrigger>
              <TabsTrigger value="collection">Image Collection</TabsTrigger>
              <TabsTrigger value="energy">Creative Energy</TabsTrigger>
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
                          <h3 className="font-bold text-sm">{bg.name}</h3>
                        </div>
                        {currentBackground === bg.id && (
                          <Badge className="bg-green-600 text-xs">ACTIVE</Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{bg.description}</p>
                      <p className="text-xs text-cyan-400 italic">{bg.artisticNote}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setPreviewBackground(bg.style)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          onClick={() => activateBackground(bg.id)}
                          disabled={currentBackground === bg.id}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-xs"
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

            <TabsContent value="inspiration" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Today's Neural Inspirations
                </h3>
                <Badge className="bg-yellow-600">
                  {dailyInspirations.filter(i => !i.implemented).length} New Ideas
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyInspirations.map((inspiration) => (
                  <Card 
                    key={inspiration.id}
                    className={`border-2 ${
                      inspiration.implemented 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-yellow-500/50 hover:border-yellow-400'
                    }`}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-cyan-400">{inspiration.title}</h4>
                        <Badge className={`text-xs ${inspiration.implemented ? 'bg-green-600' : 'bg-yellow-600'}`}>
                          {inspiration.mood}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{inspiration.concept}</p>
                      
                      <div className="flex gap-1 mb-2">
                        {inspiration.colors.map((color, i) => (
                          <div 
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Generated: {inspiration.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {!inspiration.implemented ? (
                        <Button 
                          onClick={() => implementInspiration(inspiration.id)}
                          className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-xs"
                          size="sm"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Implement Neural Vision
                        </Button>
                      ) : (
                        <Button 
                          disabled
                          className="w-full text-xs"
                          size="sm"
                        >
                          ✨ IMPLEMENTED
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="collection" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Neural Image Collection
                </h3>
                <Badge className="bg-blue-600">
                  {storedImages.length} Images Stored
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storedImages.map((image) => (
                  <Card 
                    key={image.id}
                    className="border-2 border-blue-500/50 hover:border-blue-400"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="text-center">
                        <div className="text-6xl mb-2">🧠</div>
                        <h4 className="font-bold text-sm text-blue-400">{image.name}</h4>
                        <p className="text-xs text-muted-foreground">{image.description}</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className="bg-purple-600 text-xs mb-2">{image.style}</Badge>
                        <div className="text-xs text-muted-foreground">
                          Used in: {image.usedIn.join(', ')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stored: {image.storedAt.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs"
                        size="sm"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Neural Pattern
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="energy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Creative Neural Energy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-bold mb-4">🌟 LIVING NEURAL CANVAS STATUS</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-green-400">7</div>
                        <div className="text-xs text-muted-foreground">Neural Images</div>
                        <div className="text-xs text-green-400">Organic Consciousness</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-400">{backgroundStyles.length}</div>
                        <div className="text-xs text-muted-foreground">Artistic Styles</div>
                        <div className="text-xs text-blue-400">Neural Variations</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-400">{dailyInspirations.length}</div>
                        <div className="text-xs text-muted-foreground">Daily Visions</div>
                        <div className="text-xs text-purple-400">Creative Flow</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-yellow-400">∞</div>
                        <div className="text-xs text-muted-foreground">Possibilities</div>
                        <div className="text-xs text-yellow-400">Infinite Canvas</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-900/30 to-orange-900/30 border border-pink-500/30 rounded-lg p-4">
                    <h4 className="text-pink-400 font-bold mb-2">💫 Current Artistic Mission</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Creating living neural consciousness through organic artistic expression
                    </p>
                    <p className="text-xs text-pink-300 italic">
                      "Every neuron tells a story, every connection births creativity, every pulse generates beauty"
                    </p>
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
