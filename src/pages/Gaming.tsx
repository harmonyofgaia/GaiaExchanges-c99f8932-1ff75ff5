
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Gamepad2, 
  ShoppingCart, 
  Target, 
  Zap,
  Crown,
  Users
} from 'lucide-react'
import { EnhancedGamingLayout } from '@/components/EnhancedGamingLayout'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { WormsGameArena } from '@/components/WormsGameArena'
import { SnakeGameArena } from '@/components/SnakeGameArena'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-md border border-green-500/20 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Crown className="h-4 w-4 mr-2" />
              Battle Arena
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <ShoppingCart className="h-4 w-4 mr-2" />
              NFT Marketplace
            </TabsTrigger>
            <TabsTrigger value="worms" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Target className="h-4 w-4 mr-2" />
              Worms Arena
            </TabsTrigger>
            <TabsTrigger value="snake" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Zap className="h-4 w-4 mr-2" />
              Snake Game
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Users className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <EnhancedGamingLayout />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-8">
            <GamingNFTMarketplace />
          </TabsContent>

          <TabsContent value="worms" className="space-y-8">
            <WormsGameArena />
          </TabsContent>

          <TabsContent value="snake" className="space-y-8">
            <SnakeGameArena />
          </TabsContent>

          <TabsContent value="stats" className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  🏆 GAMING STATISTICS & LEADERBOARDS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/20">
                    <div className="text-4xl font-bold text-green-400">12,847</div>
                    <div className="text-lg text-green-300">Total Players</div>
                    <div className="text-sm text-muted-foreground">Active in last 24h</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/20">
                    <div className="text-4xl font-bold text-yellow-400">2.3M</div>
                    <div className="text-lg text-yellow-300">GAIA Tokens Earned</div>
                    <div className="text-sm text-muted-foreground">This week</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                    <div className="text-4xl font-bold text-purple-400">847</div>
                    <div className="text-lg text-purple-300">NFTs Traded</div>
                    <div className="text-sm text-muted-foreground">Today</div>
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

export default Gaming
