
import { EnhancedGamingModes } from '@/components/EnhancedGamingModes'
import { LiveAnimalNFTs } from '@/components/LiveAnimalNFTs'
import { SnakeWormsIntegration } from '@/components/SnakeWormsIntegration'
import { CyberIceGlobeForest } from '@/components/landscapes/CyberIceGlobeForest'
import { Elite4KCharacters } from '@/components/characters/Elite4KCharacters'
import { EnhancedLandscapeShowcase } from '@/components/EnhancedLandscapeShowcase'
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Gamepad2, 
  Trophy,
  Users,
  Zap,
  Flame,
  Crown,
  Shield,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAIA_TOKEN } from '@/constants/gaia'

const Gaming = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <GlobalAnnouncement />
        
        {/* Gaming Header */}
        <Card className="mb-12 border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-br from-purple-900/30 to-red-900/30">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              🎮 HARMONY OF GAIA GAMING UNIVERSE
            </CardTitle>
            <p className="text-center text-2xl text-muted-foreground">
              Epic battles, environmental impact, and GAiA token rewards • 1000TB+ Landscapes
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
                <Trophy className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <div className="text-sm text-muted-foreground">Tournaments</div>
              </div>
              <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">87K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
                <Flame className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                <div className="text-2xl font-bold text-orange-400">1000TB</div>
                <div className="text-sm text-muted-foreground">Max Landscape</div>
              </div>
              <div className="p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
                <Crown className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">4K HD</div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gaming Tabs */}
        <Tabs defaultValue="landscapes" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md border border-purple-500/20">
            <TabsTrigger value="landscapes" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              🌍 New Landscape
            </TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              👥 4K Characters
            </TabsTrigger>
            <TabsTrigger value="showcase" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🎨 Showcase
            </TabsTrigger>
            <TabsTrigger value="gaming-modes" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🎮 Game Modes
            </TabsTrigger>
            <TabsTrigger value="nfts" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              🦁 Live NFTs
            </TabsTrigger>
            <TabsTrigger value="snake-worms" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🐍 Snake Wars
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="landscapes" className="space-y-6 mt-6">
            <CyberIceGlobeForest />
          </TabsContent>
          
          <TabsContent value="characters" className="space-y-6 mt-6">
            <Elite4KCharacters />
          </TabsContent>
          
          <TabsContent value="showcase" className="space-y-6 mt-6">
            <EnhancedLandscapeShowcase />
          </TabsContent>
          
          <TabsContent value="gaming-modes" className="space-y-6 mt-6">
            <EnhancedGamingModes />
          </TabsContent>
          
          <TabsContent value="nfts" className="space-y-6 mt-6">
            <LiveAnimalNFTs />
          </TabsContent>
          
          <TabsContent value="snake-worms" className="space-y-6 mt-6">
            <SnakeWormsIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Gaming
