import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mountain, Volcano, Moon, Globe, TreePine, Skull, Sparkles, Hammer } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { VirtualLandscapeCreator } from '@/components/landscapes/VirtualLandscapeCreator'
import { LandscapeToolbox } from '@/components/landscapes/LandscapeToolbox'
import { LandscapeGallery } from '@/components/landscapes/LandscapeGallery'

const AuraLandScrapyard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-green-900/20 to-blue-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
                🌍 AURA LAND SCRAPYARD
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Create, Craft & Command Virtual Landscapes Across Multiple Dimensions
              </p>
              <div className="text-center mt-4 space-y-2">
                <div className="text-lg text-green-400 font-bold">
                  🚀 Infinite Landscape Possibilities • Virtual Reality Compatible • NFT Ready
                </div>
                <div className="text-sm text-purple-400">
                  Connected to GAiA Ecosystem • Quantum-Secured Creation • Real-Time Collaboration
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="creator" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="creator">🎨 Landscape Creator</TabsTrigger>
              <TabsTrigger value="types">🌍 Land Types</TabsTrigger>
              <TabsTrigger value="toolbox">🔧 Advanced Tools</TabsTrigger>
              <TabsTrigger value="gallery">🖼️ My Creations</TabsTrigger>
            </TabsList>

            <TabsContent value="creator" className="space-y-6">
              <VirtualLandscapeCreator />
            </TabsContent>

            <TabsContent value="types" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Vulcan Lands', icon: <Volcano className="h-8 w-8" />, color: 'from-red-600 to-orange-600', description: 'Molten lava flows, volcanic peaks, fire-based ecosystems' },
                  { name: 'Moon Lands', icon: <Moon className="h-8 w-8" />, color: 'from-gray-400 to-blue-400', description: 'Lunar surfaces, crater formations, zero-gravity environments' },
                  { name: 'Dark Web Lands', icon: <Skull className="h-8 w-8" />, color: 'from-purple-600 to-black', description: 'Digital underworld, cyber landscapes, matrix environments' },
                  { name: 'Forest Lands', icon: <TreePine className="h-8 w-8" />, color: 'from-green-600 to-emerald-600', description: 'Ancient forests, mystical trees, nature sanctuaries' },
                  { name: 'Crystal Realms', icon: <Sparkles className="h-8 w-8" />, color: 'from-cyan-400 to-purple-400', description: 'Crystal caves, gem formations, magical energy fields' },
                  { name: 'Digital Plains', icon: <Globe className="h-8 w-8" />, color: 'from-blue-400 to-green-400', description: 'Cyber landscapes, digital terrains, virtual ecosystems' }
                ].map((land, index) => (
                  <Card key={index} className={`bg-gradient-to-br ${land.color}/20 border-2 hover:scale-105 transition-all`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="text-white">{land.icon}</div>
                        {land.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{land.description}</p>
                      <Button className={`w-full bg-gradient-to-r ${land.color} hover:opacity-90`}>
                        <Hammer className="h-4 w-4 mr-2" />
                        Create {land.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="toolbox" className="space-y-6">
              <LandscapeToolbox />
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <LandscapeGallery />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default AuraLandScrapyard
