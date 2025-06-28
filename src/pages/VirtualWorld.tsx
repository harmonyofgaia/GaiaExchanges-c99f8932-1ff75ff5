
import { useState } from 'react'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { GameChatSystem } from '@/components/virtualworld/GameChatSystem'
import { LandscapeMarketplace } from '@/components/virtualworld/LandscapeMarketplace'
import { VRConnectionManager } from '@/components/virtualworld/VRConnectionManager'
import { GameSecurityPanel } from '@/components/virtualworld/GameSecurityPanel'
import { PlayerInventory } from '@/components/virtualworld/PlayerInventory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  MessageCircle, 
  ShoppingCart, 
  Settings,
  Package,
  Shield,
  Users,
  Headphones
} from 'lucide-react'

const VirtualWorld = () => {
  const [activeUsers, setActiveUsers] = useState(247)
  const [currentLandscape, setCurrentLandscape] = useState('Forest Paradise')
  const [vrConnected, setVrConnected] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            🌍 GAIA VIRTUAL WORLD
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Build, Chat, Explore - Your Virtual Reality Awaits
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge className="bg-green-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} Online
            </Badge>
            <Badge className="bg-blue-600 text-white">
              Current: {currentLandscape}
            </Badge>
            {vrConnected && (
              <Badge className="bg-purple-600 text-white animate-pulse">
                <Headphones className="h-3 w-3 mr-1" />
                VR Connected
              </Badge>
            )}
          </div>
        </div>

        {/* Main Game Interface */}
        <Tabs defaultValue="world" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md">
            <TabsTrigger value="world" className="data-[state=active]:bg-purple-500/20">
              <Gamepad2 className="h-4 w-4 mr-2" />
              World
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-blue-500/20">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-green-500/20">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-orange-500/20">
              <Package className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="vr" className="data-[state=active]:bg-pink-500/20">
              <Headphones className="h-4 w-4 mr-2" />
              VR Connection
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-500/20">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="world" className="mt-6">
            <VirtualWorldCanvas 
              currentLandscape={currentLandscape}
              onLandscapeChange={setCurrentLandscape}
            />
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
      </div>
    </div>
  )
}

export default VirtualWorld
