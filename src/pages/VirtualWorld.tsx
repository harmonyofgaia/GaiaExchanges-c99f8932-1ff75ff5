
import { useState } from 'react'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { GameChatSystem } from '@/components/virtualworld/GameChatSystem'
import { LandscapeMarketplace } from '@/components/virtualworld/LandscapeMarketplace'
import { VRConnectionManager } from '@/components/virtualworld/VRConnectionManager'
import { GameSecurityPanel } from '@/components/virtualworld/GameSecurityPanel'
import { PlayerInventory } from '@/components/virtualworld/PlayerInventory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  MessageCircle, 
  ShoppingCart, 
  Settings,
  Package,
  Shield,
  Users,
  Headphones,
  Flame,
  Coins,
  TreePine,
  Fish,
  Bird,
  Rabbit,
  Turtle,
  Butterfly
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

const VirtualWorld = () => {
  const [activeUsers, setActiveUsers] = useState(247)
  const [currentLandscape, setCurrentLandscape] = useState('🌊 Ocean Paradise with Token Burning')
  const [vrConnected, setVrConnected] = useState(false)
  const [tokensBurned, setTokensBurned] = useState(15847)
  const [animalsHelped, setAnimalsHelped] = useState(2847)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 relative overflow-hidden">
      
      {/* Animated Background with Token Burning Theme */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Animals */}
        {Array.from({ length: 20 }).map((_, i) => {
          const animals = [Bird, Fish, Butterfly, Rabbit, Turtle]
          const Animal = animals[i % animals.length]
          return (
            <div
              key={i}
              className="absolute animate-bounce opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Animal className="h-6 w-6 text-green-400" />
            </div>
          )
        })}
        
        {/* Burning Tokens Animation */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            <Flame className="h-4 w-4 text-orange-400/30" />
          </div>
        ))}
        
        {/* GAiA Coins Floating */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-spin"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '8s'
            }}
          >
            <Coins className="h-3 w-3 text-yellow-400/20" />
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            🌍 GAIA VIRTUAL WORLD - TOKEN BURNING PARADISE
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Build, Chat, Explore - Your Virtual Reality Awaits • Every Action Burns GAiA Tokens for Nature
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <Badge className="bg-green-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} Eco-Warriors Online
            </Badge>
            <Badge className="bg-blue-600 text-white">
              Current: {currentLandscape}
            </Badge>
            <Badge className="bg-orange-600 text-white animate-pulse">
              <Flame className="h-3 w-3 mr-1" />
              {tokensBurned} Tokens Burned for Nature
            </Badge>
            <Badge className="bg-purple-600 text-white">
              🐾 {animalsHelped} Animals Helped
            </Badge>
            {vrConnected && (
              <Badge className="bg-pink-600 text-white animate-pulse">
                <Headphones className="h-3 w-3 mr-1" />
                VR Connected to GAiA Ecosystem
              </Badge>
            )}
          </div>
        </div>

        {/* Token Burning Impact Dashboard */}
        <Card className="mb-6 border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2 justify-center">
              <Flame className="h-6 w-6" />
              🔥 LIVE TOKEN BURNING - ENVIRONMENTAL IMPACT TRACKER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/20">
                <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-400">45,847</div>
                <div className="text-xs text-muted-foreground">Trees Planted via Token Burns</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20">
                <Fish className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-400">8,524</div>
                <div className="text-xs text-muted-foreground">Ocean Animals Saved</div>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/20">
                <Butterfly className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-yellow-400">25,680</div>
                <div className="text-xs text-muted-foreground">Insects Protected</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/20">
                <Coins className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-400">$487,520</div>
                <div className="text-xs text-muted-foreground">Total Environmental Investment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Game Interface with Token Burning Integration */}
        <Tabs defaultValue="world" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md">
            <TabsTrigger value="world" className="data-[state=active]:bg-purple-500/20">
              <Gamepad2 className="h-4 w-4 mr-2" />
              🌍 World
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-blue-500/20">
              <MessageCircle className="h-4 w-4 mr-2" />
              💬 Chat
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-green-500/20">
              <ShoppingCart className="h-4 w-4 mr-2" />
              🛒 Marketplace
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-orange-500/20">
              <Package className="h-4 w-4 mr-2" />
              📦 Inventory
            </TabsTrigger>
            <TabsTrigger value="vr" className="data-[state=active]:bg-pink-500/20">
              <Headphones className="h-4 w-4 mr-2" />
              🥽 VR Connection
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-500/20">
              <Shield className="h-4 w-4 mr-2" />
              🛡️ Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="world" className="mt-6">
            <VirtualWorldCanvas 
              currentLandscape={currentLandscape}
              onLandscapeChange={setCurrentLandscape}
            />
            
            {/* Gaming Actions that Burn Tokens */}
            <Card className="mt-4 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  🎮 ECO-GAMING ACTIONS - Every Action Burns GAiA for Nature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => setTokensBurned(prev => prev + 1)}
                  >
                    <TreePine className="h-4 w-4 mr-2" />
                    Plant Virtual Tree (Burns 1 GAiA)
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    onClick={() => setAnimalsHelped(prev => prev + 1)}
                  >
                    <Fish className="h-4 w-4 mr-2" />
                    Save Ocean Animal (Burns 2 GAiA)
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                    onClick={() => setTokensBurned(prev => prev + 3)}
                  >
                    <Butterfly className="h-4 w-4 mr-2" />
                    Protect Butterfly Garden (Burns 3 GAiA)
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setTokensBurned(prev => prev + 5)}
                  >
                    <Flame className="h-4 w-4 mr-2" />
                    Mega Environmental Action (Burns 5 GAiA)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <GameChatSystem activeUsers={activeUsers} />
          </TabsContent>

          <TabsContent value="marketplace" className="mt-6">
            <LandscapeMarketplace onPurchase={setCurrentLandscape} />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <PlayerInventory />
          </TabsContent>

          <TabsContent value="vr" className="mt-6">
            <VRConnectionManager 
              onConnectionChange={setVrConnected}
              isConnected={vrConnected}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <GameSecurityPanel />
          </TabsContent>
        </Tabs>

        {/* GAiA Token Information Footer */}
        <Card className="mt-6 border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2 justify-center">
              <Coins className="h-6 w-6" />
              🌊 Official GAiA Token Integration - Pump.fun
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">Contract: <code className="text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code></p>
              <p className="text-muted-foreground">Wallet: <code className="text-blue-400 bg-blue-900/20 px-2 py-1 rounded">{GAIA_TOKEN.WALLET_ADDRESS}</code></p>
              <p className="text-green-400 font-bold">Every action in this virtual world burns GAiA tokens for real environmental projects!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VirtualWorld
