
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mountain, 
  Trees, 
  Waves, 
  Sun, 
  Moon, 
  Cloud,
  Zap,
  Camera,
  Video,
  Palette,
  Wand2,
  Eye,
  Download,
  Share2,
  Play
} from 'lucide-react'
import { toast } from 'sonner'
import HoverSidebar from '@/components/HoverSidebar'

export default function LandscapeBuilder() {
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('realistic')
  const [resolution, setResolution] = useState('1920x1080')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  const landscapeElements = [
    { id: 'mountain', name: 'Mountains', icon: Mountain, color: 'text-gray-400' },
    { id: 'forest', name: 'Forest', icon: Trees, color: 'text-green-400' },
    { id: 'ocean', name: 'Ocean', icon: Waves, color: 'text-blue-400' },
    { id: 'desert', name: 'Desert', icon: Sun, color: 'text-yellow-400' },
    { id: 'night', name: 'Night Sky', icon: Moon, color: 'text-purple-400' },
    { id: 'clouds', name: 'Clouds', icon: Cloud, color: 'text-gray-300' }
  ]

  const artStyles = [
    'Realistic', 'Fantasy', 'Cyberpunk', 'Watercolor', 'Oil Painting', 
    'Digital Art', 'Anime', 'Abstract', 'Vintage', 'Futuristic'
  ]

  const resolutions = [
    '1920x1080', '3840x2160', '2560x1440', '1366x768', '1920x1200', '2048x1152'
  ]

  const toggleElement = (elementId: string) => {
    setSelectedElements(prev => 
      prev.includes(elementId) 
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    )
  }

  const generateLandscape = async (type: 'image' | 'video') => {
    if (selectedElements.length === 0 && !prompt) {
      toast.error('Please select elements or enter a prompt')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const mockContent = type === 'video' 
        ? '/lovable-uploads/landscape-video-demo.mp4'
        : '/lovable-uploads/landscape-image-demo.jpg'
      
      setGeneratedContent(mockContent)
      setIsGenerating(false)
      
      toast.success(`${type === 'video' ? 'Video' : 'Image'} Generated Successfully!`, {
        description: `Your ${style} landscape ${type} is ready`,
        duration: 5000
      })
    }, 3000)
  }

  const downloadContent = () => {
    if (generatedContent) {
      toast.success('Download Started!', {
        description: 'Your landscape content is being downloaded'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🌄 Advanced Landscape Builder
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Create stunning landscapes with AI - Images & Videos
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="builder">Landscape Builder</TabsTrigger>
              <TabsTrigger value="video">Video Creator</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Element Selection */}
                <Card className="border-green-500/30 bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <Palette className="h-6 w-6" />
                      Landscape Elements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {landscapeElements.map((element) => {
                        const Icon = element.icon
                        const isSelected = selectedElements.includes(element.id)
                        return (
                          <Button
                            key={element.id}
                            onClick={() => toggleElement(element.id)}
                            variant={isSelected ? "default" : "outline"}
                            className={`h-16 flex flex-col gap-1 ${
                              isSelected 
                                ? 'bg-green-600 border-green-500' 
                                : 'border-green-500/30 hover:bg-green-900/50'
                            }`}
                          >
                            <Icon className={`h-6 w-6 ${element.color}`} />
                            <span className="text-xs">{element.name}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Prompt */}
                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <Wand2 className="h-6 w-6" />
                      Custom Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your perfect landscape... (e.g., 'A mystical forest with glowing trees under starlight')"
                      className="bg-black/30 border-blue-500/30 text-blue-300 min-h-[100px]"
                    />
                    
                    <div className="space-y-2">
                      <label className="text-sm text-blue-300">Art Style</label>
                      <select 
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="w-full bg-black/30 border border-blue-500/30 rounded px-3 py-2 text-blue-300"
                      >
                        {artStyles.map(artStyle => (
                          <option key={artStyle} value={artStyle.toLowerCase()}>{artStyle}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-blue-300">Resolution</label>
                      <select 
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full bg-black/30 border border-blue-500/30 rounded px-3 py-2 text-blue-300"
                      >
                        {resolutions.map(res => (
                          <option key={res} value={res}>{res}</option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Generation Controls */}
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardContent className="pt-6">
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => generateLandscape('image')}
                      disabled={isGenerating}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 h-12"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      {isGenerating ? 'Generating...' : 'Generate Image'}
                    </Button>
                    <Button
                      onClick={() => generateLandscape('video')}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12"
                    >
                      <Video className="h-5 w-5 mr-2" />
                      {isGenerating ? 'Creating...' : 'Create Video'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Content Preview */}
              {generatedContent && (
                <Card className="border-yellow-500/30 bg-yellow-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <Eye className="h-6 w-6" />
                      Generated Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="bg-black/30 rounded-lg p-8 border border-yellow-500/30">
                        <div className="text-yellow-400 text-lg mb-4">
                          🎨 Your {style} landscape is ready!
                        </div>
                        <Badge className="bg-yellow-600 text-white">
                          {resolution} • {style} Style
                        </Badge>
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={downloadContent} className="bg-green-600 hover:bg-green-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="border-blue-500/30 text-blue-400">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <Card className="border-red-500/30 bg-red-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Video className="h-6 w-6" />
                    Video Landscape Creator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-red-300">Video Duration</label>
                      <select className="w-full bg-black/30 border border-red-500/30 rounded px-3 py-2 text-red-300">
                        <option value="5">5 seconds</option>
                        <option value="10">10 seconds</option>
                        <option value="15">15 seconds</option>
                        <option value="30">30 seconds</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-red-300">Animation Style</label>
                      <select className="w-full bg-black/30 border border-red-500/30 rounded px-3 py-2 text-red-300">
                        <option value="smooth">Smooth Movement</option>
                        <option value="dynamic">Dynamic Changes</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="peaceful">Peaceful Flow</option>
                      </select>
                    </div>
                  </div>
                  <Button 
                    onClick={() => generateLandscape('video')}
                    disabled={isGenerating}
                    className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Create Landscape Video
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <Card className="border-orange-500/30 bg-orange-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Eye className="h-6 w-6" />
                    Your Landscape Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your created landscapes will appear here</p>
                    <p className="text-sm">Start building to see your amazing creations!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Zap className="h-6 w-6" />
                    Advanced Creation Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col">
                      <Wand2 className="h-6 w-6 mb-1" />
                      AI Style Transfer
                    </Button>
                    <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col">
                      <Trees className="h-6 w-6 mb-1" />
                      Nature AI Enhancement
                    </Button>
                    <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col">
                      <Waves className="h-6 w-6 mb-1" />
                      Weather Simulation
                    </Button>
                    <Button className="h-16 bg-yellow-600 hover:bg-yellow-700 flex flex-col">
                      <Sun className="h-6 w-6 mb-1" />
                      Lighting Studio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
