
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mountain, TreePine, Cloud, Palette, Save, Share, Upload } from 'lucide-react'
import { toast } from 'sonner'

export default function LandscapeBuilder() {
  const [activeProject, setActiveProject] = useState('Mystical Forest')
  const [cloudStorage, setCloudStorage] = useState(85.6)
  const [aiGeneration, setAiGeneration] = useState(true)

  const projects = [
    { name: 'Mystical Forest', type: 'Forest', progress: 78, size: '2.4 GB' },
    { name: 'Crystal Mountains', type: 'Mountain', progress: 45, size: '1.8 GB' },
    { name: 'Ocean Paradise', type: 'Water', progress: 92, size: '3.1 GB' },
    { name: 'Desert Oasis', type: 'Desert', progress: 23, size: '1.2 GB' }
  ]

  const generateWithAI = () => {
    toast.success('🤖 AI Generation Started', {
      description: 'Creating a new landscape based on your preferences',
      duration: 5000
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          🌍 LANDSCAPE BUILDER PRO
        </h1>
        <p className="text-muted-foreground mt-2">
          Unlimited cloud storage & AI generation
        </p>
      </div>

      {/* Cloud Storage Status */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Cloud className="h-6 w-6" />
            Cloud Storage Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-sm text-muted-foreground">Total Storage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{cloudStorage} GB</div>
              <div className="text-sm text-muted-foreground">Used Space</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">240p</div>
              <div className="text-sm text-muted-foreground">Max Quality</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="ai-gen">AI Generator</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Mountain className="h-6 w-6" />
                    Canvas: {activeProject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-lg border-2 border-dashed border-green-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <Mountain className="h-12 w-12 mx-auto text-green-400 mb-4" />
                      <div className="text-lg font-bold text-green-400">3D Landscape Canvas</div>
                      <div className="text-sm text-muted-foreground">Drag and drop elements to build your world</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-purple-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Palette className="h-6 w-6" />
                  Tools & Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <TreePine className="h-4 w-4 mr-2" />
                      Trees
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mountain className="h-4 w-4 mr-2" />
                      Mountains
                    </Button>
                    <Button variant="outline" size="sm">
                      <Cloud className="h-4 w-4 mr-2" />
                      Weather
                    </Button>
                    <Button variant="outline" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Textures
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Quick Actions</div>
                    <Button className="w-full" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Project
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">{project.name}</div>
                    <Badge variant="outline">{project.type}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Size: {project.size} • Progress: {project.progress}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Open</Button>
                    <Button size="sm" variant="outline">Duplicate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-gen" className="space-y-4">
          <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                🤖 AI Landscape Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Describe your landscape:</label>
                  <Input 
                    placeholder="e.g., A mystical forest with glowing mushrooms and floating islands..."
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" size="sm">Fantasy</Button>
                  <Button variant="outline" size="sm">Realistic</Button>
                  <Button variant="outline" size="sm">Sci-Fi</Button>
                  <Button variant="outline" size="sm">Abstract</Button>
                </div>
                
                <Button 
                  onClick={generateWithAI}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                >
                  🚀 Generate with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((item) => (
              <Card key={item} className="cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg mb-3"></div>
                  <div className="font-bold">Landscape #{item}</div>
                  <div className="text-sm text-muted-foreground">Community Creation</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
