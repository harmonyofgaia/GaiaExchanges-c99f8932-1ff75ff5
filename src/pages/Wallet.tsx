
import { GaiaWallet } from '@/components/GaiaWallet'
import { TransactionTracker } from '@/components/TransactionTracker'
import { GaiaTokenTracker } from '@/components/GaiaTokenTracker'
import { MatrixTransactionWallet } from '@/components/MatrixTransactionWallet'
import { NetworkTransactionMatrix } from '@/components/NetworkTransactionMatrix'
import { PhantomWalletConnector } from '@/components/PhantomWalletConnector'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, Coins, TrendingUp, Zap } from 'lucide-react'

const Wallet = () => {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced Multi-Layer Background System with Token Burning Visualizations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient with burning animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
        
        {/* Primary background image with better opacity */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-8" />
        
        {/* Secondary artistic overlay */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png')] bg-cover bg-center opacity-6 mix-blend-overlay" />
        
        {/* NFT overlay layer */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-4 mix-blend-soft-light" />
        
        {/* Animated Token Burning Effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            >
              <Flame className="h-6 w-6 text-orange-400/30" />
            </div>
          ))}
        </div>
        
        {/* Floating GAiA Coins */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${5 + (i * 6)}%`,
                top: `${10 + Math.cos(i) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s'
              }}
            >
              <Coins className="h-4 w-4 text-green-400/20" />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-green-500/3 to-blue-500/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-green-400/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-blue-400/8 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-radial from-purple-400/6 via-transparent to-transparent rounded-full blur-xl animate-pulse delay-500" />
        
        {/* Animated light rays with token burning theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/2 to-transparent animate-pulse duration-3000" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-500/2 to-transparent animate-pulse duration-4000 delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/1 to-transparent animate-pulse duration-5000 delay-2000" />
      </div>

      <div className="relative space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 Harmony of Gaia Wallet - Token Burning Paradise
            </h1>
            <p className="text-muted-foreground">Complete transparency with real-time updates every 5 seconds + Token Burning Visualizations</p>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400/20 rounded-full animate-pulse" />
          </div>
          
          {/* Live Token Burning Indicator */}
          <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400 animate-pulse" />
                <div>
                  <div className="text-sm font-bold text-orange-400">🔥 LIVE BURNING</div>
                  <div className="text-xs text-muted-foreground">Every transaction burns GAiA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Phantom Wallet Integration */}
        <PhantomWalletConnector />
        
        <Tabs defaultValue="matrix" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="matrix" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🔥 Personal Matrix
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              🌐 Network Matrix
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              💰 Main Wallet
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📊 All Transactions
            </TabsTrigger>
            <TabsTrigger value="gaia-tracker" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🚀 GAiA Token Tracker
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="matrix" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-green-900/20 rounded-lg backdrop-blur-sm" />
              <div className="relative">
                <MatrixTransactionWallet />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-cyan-900/20 rounded-lg backdrop-blur-sm" />
              <div className="relative">
                <NetworkTransactionMatrix />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wallet" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-green-900/20 rounded-lg backdrop-blur-sm" />
              <div className="relative">
                <GaiaWallet />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-blue-900/20 rounded-lg backdrop-blur-sm" />
              <div className="relative">
                <TransactionTracker />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gaia-tracker" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/20 rounded-lg backdrop-blur-sm" />
              <div className="relative">
                <GaiaTokenTracker />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Token Burning Statistics Dashboard */}
        <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Flame className="h-6 w-6" />
              🔥 GAiA Token Burning Statistics - Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-900/20 rounded border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-400">15,847</div>
                <div className="text-sm text-muted-foreground">Tokens Burned Today</div>
                <Badge className="mt-2 bg-orange-600 text-white">🔥 ACTIVE</Badge>
              </div>
              <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">$247,580</div>
                <div className="text-sm text-muted-foreground">Environmental Projects Funded</div>
                <Badge className="mt-2 bg-green-600 text-white">🌍 IMPACT</Badge>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">98.7%</div>
                <div className="text-sm text-muted-foreground">Burn Rate Efficiency</div>
                <Badge className="mt-2 bg-blue-600 text-white">⚡ OPTIMAL</Badge>
              </div>
              <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-muted-foreground">Continuous Burning</div>
                <Badge className="mt-2 bg-purple-600 text-white">🚀 LIVE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Wallet
