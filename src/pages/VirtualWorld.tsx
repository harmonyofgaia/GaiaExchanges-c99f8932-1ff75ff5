import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, Users, Gamepad2, Zap, Crown, Star, Rocket, Cpu, Palette, Mountain, Trees, Waves, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { UltimateLandscapeBuilder } from '@/components/landscapes/UltimateLandscapeBuilder'
import { VirtualLandscapeCreator } from '@/components/landscapes/VirtualLandscapeCreator'
import { LandscapeToolbox } from '@/components/landscapes/LandscapeToolbox'
import { LandscapePreview } from '@/components/gaming/LandscapePreview'
import { GameStyleSelector } from '@/components/gaming/GameStyleSelector'
import { AgeLandscapeSelector } from '@/components/AgeLandscapeSelector'
import { EnhancedLandscapeShowcase } from '@/components/EnhancedLandscapeShowcase'
import { MyLandscapeManager } from '@/components/landscapes/MyLandscapeManager'

export default function VirtualWorld() {
  const [worldState, setWorldState] = useState({
    isActive: false,
    playersOnline: 47523,
    worldsCreated: 1247,
    graphicsQuality: '8K Ultra',
    currentWorld: 'Underground Winter Fortress',
    gameEngine: 'Harmony Quantum Engine v3.0',
    myLandscapes: 0,
    totalStorage: '∞ TB'
  })

  const [selectedAge, setSelectedAge] = useState('17+')
  const [activeCreationMode, setActiveCreationMode] = useState('builder')

  useEffect(() => {
    if (worldState.isActive) {
      const worldEngine = setInterval(() => {
        setWorldState(prev => ({
          ...prev,
          playersOnline: prev.playersOnline + Math.floor(Math.random() * 100),
          worldsCreated: prev.worldsCreated + Math.floor(Math.random() * 5),
          myLandscapes: prev.myLandscapes + Math.floor(Math.random() * 2)
        }))

        // World events for landscape creation
        if (Math.random() < 0.08) {
          const events = [
            '🏔️ New Mountain Range Generated - Epic Heights Await!',
            '🌊 Ocean World Created - Dive into Blue Paradise!',
            '🌲 Enchanted Forest Born - Magic Grows Here!',
            '🏰 Castle Realm Built - Medieval Glory!',
            '🚀 Space Station Launched - Cosmic Adventures!',
            '❄️ Ice Kingdom Forged - Frozen Majesty!',
            '🔥 Volcanic World Erupted - Molten Challenges!',
            '🌈 Rainbow Dimension Opened - Colors Beyond Reality!'
          ]
          const event = events[Math.floor(Math.random() * events.length)]
          toast.success('🌍 LANDSCAPE EVENT!', {
            description: event,
            duration: 4000
          })
        }
      }, 4000)

      return () => clearInterval(worldEngine)
    }
  }, [worldState.isActive])

  const enterVirtualWorld = () => {
    setWorldState(prev => ({ ...prev, isActive: true }))
    toast.success('🌍 GAIA\'S VIRTUAL WORLD ACTIVATED!', {
      description: 'Ultimate Landscape Creation Suite Online - Build Your Universe!',
      duration: 6000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-4 border-cyan-500/50 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 GAIA'S VIRTUAL LANDSCAPE UNIVERSE
            </CardTitle>
            <div className="text-center text-2xl text-cyan-300 font-bold">
              Ultimate Landscape Creator • All Biomes • Unlimited Possibilities
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* World Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-cyan-900/50 rounded-lg border-2 border-cyan-500/50">
                <Users className="h-8 w-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-cyan-400">{worldState.playersOnline.toLocaleString()}</div>
                <div className="text-sm text-cyan-300">Players Online</div>
              </div>
              
              <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
                <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-spin" />
                <div className="text-2xl font-black text-blue-400">{worldState.worldsCreated}</div>
                <div className="text-sm text-blue-300">Worlds Created</div>
              </div>
              
              <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
                <Mountain className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-black text-purple-400">{worldState.myLandscapes}</div>
                <div className="text-sm text-purple-300">My Landscapes</div>
              </div>
              
              <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
                <Cpu className="h-8 w-8 text-green-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-green-400">{worldState.graphicsQuality}</div>
                <div className="text-sm text-green-300">Graphics Quality</div>
              </div>
              
              <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
                <Rocket className="h-8 w-8 text-orange-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-orange-400">{worldState.totalStorage}</div>
                <div className="text-sm text-orange-300">Storage</div>
              </div>
            </div>

            {/* Age Group Selection */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center text-white">👥 Select Your Experience Level</h3>
              <AgeLandscapeSelector selectedAge={selectedAge} onAgeSelect={setSelectedAge} />
            </div>

            {/* Main Landscape Creation Interface */}
            <Tabs value={activeCreationMode} onValueChange={setActiveCreationMode} className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="builder">🏗️ Builder</TabsTrigger>
                <TabsTrigger value="creator">🎨 Creator</TabsTrigger>
                <TabsTrigger value="showcase">🌟 Showcase</TabsTrigger>
                <TabsTrigger value="toolbox">🔧 Toolbox</TabsTrigger>
                <TabsTrigger value="styles">🎭 Styles</TabsTrigger>
                <TabsTrigger value="gallery">🖼️ Gallery</TabsTrigger>
                <TabsTrigger value="manage">📁 My Worlds</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-6">
                <UltimateLandscapeBuilder />
              </TabsContent>

              <TabsContent value="creator" className="space-y-6">
                <VirtualLandscapeCreator />
              </TabsContent>

              <TabsContent value="showcase" className="space-y-6">
                <EnhancedLandscapeShowcase />
              </TabsContent>

              <TabsContent value="toolbox" className="space-y-6">
                <LandscapeToolbox />
              </TabsContent>

              <TabsContent value="styles" className="space-y-6">
                <GameStyleSelector />
                
                <Card className="border-rainbow-500/30 bg-gradient-to-br from-red-900/20 via-yellow-900/20 to-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-rainbow-400">🌈 All Available Landscape Styles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Ocean Paradise', icon: '🌊', color: 'blue' },
                        { name: 'Mountain Fortress', icon: '🏔️', color: 'gray' },
                        { name: 'Jungle Kingdom', icon: '🌲', color: 'green' },
                        { name: 'Desert Empire', icon: '🏜️', color: 'yellow' },
                        { name: 'Ice Kingdom', icon: '❄️', color: 'cyan' },
                        { name: 'Volcanic Realm', icon: '🌋', color: 'red' },
                        { name: 'Sky Islands', icon: '☁️', color: 'purple' },
                        { name: 'Cosmic Station', icon: '🚀', color: 'pink' }
                      ].map((style, index) => (
                        <Button
                          key={index}
                          className={`h-20 flex flex-col items-center gap-2 bg-${style.color}-600 hover:bg-${style.color}-700`}
                        >
                          <div className="text-2xl">{style.icon}</div>
                          <span className="text-xs">{style.name}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <LandscapePreview />
              </TabsContent>

              <TabsContent value="manage" className="space-y-6">
                <MyLandscapeManager />
              </TabsContent>
            </Tabs>

            {/* Virtual World Canvas */}
            <div className="aspect-video bg-gradient-to-br from-black via-cyan-900/30 to-purple-900/30 rounded-lg border-4 border-cyan-500/50 relative overflow-hidden">
              {worldState.isActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-8xl animate-pulse">🌍</div>
                    <div className="text-4xl font-black text-cyan-400 animate-bounce">
                      LANDSCAPE UNIVERSE ONLINE
                    </div>
                    <div className="text-xl text-cyan-300">
                      Active Mode: {activeCreationMode.charAt(0).toUpperCase() + activeCreationMode.slice(1)}
                    </div>
                    <div className="text-lg text-blue-300">
                      Experience Level: {selectedAge}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">∞</div>
                        <div>Biomes Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">8K</div>
                        <div>Ultra Graphics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">VR</div>
                        <div>Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    onClick={enterVirtualWorld}
                    className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-black text-3xl px-16 py-8 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    <Globe className="h-10 w-10 mr-6 animate-spin" />
                    ENTER LANDSCAPE UNIVERSE
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Creation Tools */}
            <div className="bg-black/50 rounded-lg p-6 border-2 border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">
                🚀 QUICK LANDSCAPE CREATION TOOLS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col items-center gap-2 h-20 bg-blue-600 hover:bg-blue-700">
                  <Mountain className="h-6 w-6" />
                  Create Mountains
                </Button>
                <Button className="flex flex-col items-center gap-2 h-20 bg-green-600 hover:bg-green-700">
                  <Trees className="h-6 w-6" />
                  Plant Forests
                </Button>
                <Button className="flex flex-col items-center gap-2 h-20 bg-cyan-600 hover:bg-cyan-700">
                  <Waves className="h-6 w-6" />
                  Create Oceans
                </Button>
                <Button className="flex flex-col items-center gap-2 h-20 bg-yellow-600 hover:bg-yellow-700">
                  <Sun className="h-6 w-6" />
                  Weather Control
                </Button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400 mb-2">
                🌌 UNLIMITED LANDSCAPE CREATION 🌌
              </div>
              <div className="text-xl text-cyan-300">
                Build • Explore • Share • Experience Your Perfect World
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
