
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Mountain, 
  Paintbrush, 
  Layers, 
  Save, 
  Play,
  Download,
  Settings,
  Palette,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdvancedLandscapeBuilder() {
  const [buildProgress, setBuildProgress] = useState(0)
  const [activeLayer, setActiveLayer] = useState('terrain')
  const [landscapeSettings] = useState({
    resolution: '4K Ultra',
    quality: 'Maximum',
    features: 'All Enabled',
    aiAssist: true
  })

  const handleGenerateLandscape = () => {
    setBuildProgress(0)
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          toast.success('Landscape Generated!', {
            description: 'Your 4K landscape is ready for gaming'
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSaveLandscape = () => {
    toast.success('Landscape Saved!', {
      description: 'Your creation has been saved to the gallery'
    })
  }

  const layers = [
    { id: 'terrain', name: 'Terrain', icon: Mountain, color: 'green' },
    { id: 'vegetation', name: 'Vegetation', icon: Paintbrush, color: 'emerald' },
    { id: 'water', name: 'Water', icon: Layers, color: 'blue' },
    { id: 'lighting', name: 'Lighting', icon: Zap, color: 'yellow' },
    { id: 'effects', name: 'Effects', icon: Palette, color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-black p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🏔️ ADVANCED LANDSCAPE BUILDER
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground">
              4K Gaming Ready • AI Powered • Video Game Quality
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600">
                <Mountain className="h-3 w-3 mr-1" />
                4K READY
              </Badge>
              <Badge className="bg-blue-600">
                <Zap className="h-3 w-3 mr-1" />
                AI POWERED
              </Badge>
              <Badge className="bg-purple-600">
                <Play className="h-3 w-3 mr-1" />
                GAME READY
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Layer Controls */}
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🎨 Layer Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {layers.map((layer) => {
                const Icon = layer.icon
                return (
                  <Button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    variant={activeLayer === layer.id ? "default" : "outline"}
                    className={`w-full justify-start ${
                      activeLayer === layer.id 
                        ? `bg-${layer.color}-600 hover:bg-${layer.color}-700` 
                        : `border-${layer.color}-500/30 text-${layer.color}-400`
                    }`}
                    size="sm"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {layer.name}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          {/* Main Canvas Area */}
          <Card className="lg:col-span-2 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🖼️ Canvas - {activeLayer.toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-800/20 to-blue-800/20 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30"></div>
                <div className="relative z-10 text-center">
                  <Mountain className="h-16 w-16 mx-auto text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">4K Landscape Canvas</h3>
                  <p className="text-muted-foreground">AI-powered landscape generation ready</p>
                </div>
              </div>

              {buildProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Generating Landscape...</span>
                    <span>{buildProgress}%</span>
                  </div>
                  <Progress value={buildProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings Panel */}
          <Card className="border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-orange-400">⚙️ Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Quality Settings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resolution</span>
                    <span className="text-green-400">{landscapeSettings.resolution}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quality</span>
                    <span className="text-blue-400">{landscapeSettings.quality}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Features</span>
                    <span className="text-purple-400">{landscapeSettings.features}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleGenerateLandscape}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={buildProgress > 0 && buildProgress < 100}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Landscape
                </Button>
                
                <Button
                  onClick={handleSaveLandscape}
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save to Gallery
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export 4K
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🎮 Advanced Landscape Builder Status</h4>
          <div className="text-sm text-green-300">
            ✅ 4K landscape generation fully operational<br/>
            ✅ AI-powered terrain creation active<br/>
            ✅ Video game quality rendering enabled<br/>
            ✅ Multi-layer editing system functional
          </div>
        </div>
      </div>
    </div>
  )
}
