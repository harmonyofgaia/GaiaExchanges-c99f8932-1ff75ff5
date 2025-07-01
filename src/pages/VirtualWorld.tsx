
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { VirtualAnimalWalk } from '@/components/VirtualAnimalWalk'
import { LiveAnimalNFTs } from '@/components/LiveAnimalNFTs'
import { RealTimeAnimalTracker } from '@/components/RealTimeAnimalTracker'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Globe, Gamepad2, Zap, Shield } from 'lucide-react'

const VirtualWorld = () => {
  const [currentLandscape, setCurrentLandscape] = useState('🌊 Ocean Paradise with Token Burning')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header with Gaia Logo */}
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="xl" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="mb-8 border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
              🌍 VIRTUAL WORLD GALAXY
            </CardTitle>
            <p className="text-center text-2xl text-muted-foreground mt-4">
              A Plan That Humanity Will Never Forget!
            </p>
            <div className="text-center mt-6 space-y-3">
              <div className="text-xl text-purple-400 font-bold">
                🚀 Infinite Possibilities • Real Animals • Quantum Defense • Environmental Impact
              </div>
              <div className="text-lg text-blue-400">
                🌟 Self-Training AI • Dragon Protection • Universal Currency • Galaxy-Wide Platform
              </div>
              <div className="text-md text-green-400">
                ⚡ Admin God Powers • Unbreakable Security • Token Burning Ecosystem • Virtual Reality Ready
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="world-canvas" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="world-canvas" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              🌍 Virtual Canvas
            </TabsTrigger>
            <TabsTrigger value="animal-walks" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              🦋 Animal Walks
            </TabsTrigger>
            <TabsTrigger value="live-animals" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              🐾 Live Animals
            </TabsTrigger>
            <TabsTrigger value="animal-tracker" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              📡 Animal Tracker
            </TabsTrigger>
            <TabsTrigger value="world-status" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              🌟 World Status
            </TabsTrigger>
            <TabsTrigger value="quantum-power" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              ⚡ Quantum Power
            </TabsTrigger>
          </TabsList>

          <TabsContent value="world-canvas" className="space-y-6">
            <VirtualWorldCanvas 
              currentLandscape={currentLandscape}
              onLandscapeChange={setCurrentLandscape}
            />
          </TabsContent>

          <TabsContent value="animal-walks" className="space-y-6">
            <VirtualAnimalWalk />
          </TabsContent>

          <TabsContent value="live-animals" className="space-y-6">
            <LiveAnimalNFTs />
          </TabsContent>

          <TabsContent value="animal-tracker" className="space-y-6">
            <RealTimeAnimalTracker />
          </TabsContent>

          <TabsContent value="world-status" className="space-y-6">
            <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 text-center">
                  🌍 VIRTUAL WORLD STATUS - GALAXY COMMAND CENTER
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-green-400">999,999,999+</div>
                    <div className="text-sm text-muted-foreground">Active Worlds</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">INFINITE</div>
                    <div className="text-sm text-muted-foreground">Quantum Defense</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-purple-400">100%</div>
                    <div className="text-sm text-muted-foreground">Admin Control</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-400">SUPREME</div>
                    <div className="text-sm text-muted-foreground">Galaxy Power</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quantum-power" className="space-y-6">
            <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-red-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400 text-center">
                  ⚡ QUANTUM POWER CORE - UNBREAKABLE SUPREMACY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="text-8xl animate-pulse">⚡🌍⚡</div>
                  <div className="text-2xl font-bold text-purple-400">
                    QUANTUM DEFENSE: ACTIVE & INVINCIBLE
                  </div>
                  <div className="text-lg text-blue-400">
                    Self-Training Dragons • Immortal Firewall • Galaxy-Wide Protection
                  </div>
                  <div className="text-md text-green-400">
                    Admin God Powers • Unbreakable Security • Universal Control System
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                      <div className="text-2xl font-bold text-red-400">🐲</div>
                      <div className="text-lg font-bold text-red-400">Dragon Core</div>
                      <div className="text-sm text-muted-foreground">Trained & Immortal</div>
                    </div>
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-400">🛡️</div>
                      <div className="text-lg font-bold text-blue-400">Quantum Shield</div>
                      <div className="text-sm text-muted-foreground">Unbreakable Defense</div>
                    </div>
                    <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                      <div className="text-2xl font-bold text-green-400">👑</div>
                      <div className="text-lg font-bold text-green-400">Admin Power</div>
                      <div className="text-sm text-muted-foreground">Supreme Control</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default VirtualWorld
