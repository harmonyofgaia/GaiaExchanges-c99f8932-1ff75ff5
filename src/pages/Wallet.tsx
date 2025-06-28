
import { GaiaWallet } from '@/components/GaiaWallet'
import { TransactionTracker } from '@/components/TransactionTracker'
import { GaiaTokenTracker } from '@/components/GaiaTokenTracker'
import { MatrixTransactionWallet } from '@/components/MatrixTransactionWallet'
import { NetworkTransactionMatrix } from '@/components/NetworkTransactionMatrix'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Wallet = () => {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced Multi-Layer Background System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
        
        {/* Primary background image with better opacity */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-8" />
        
        {/* Secondary artistic overlay */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png')] bg-cover bg-center opacity-6 mix-blend-overlay" />
        
        {/* NFT overlay layer */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-4 mix-blend-soft-light" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-green-500/3 to-blue-500/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-green-400/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-blue-400/8 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-radial from-purple-400/6 via-transparent to-transparent rounded-full blur-xl animate-pulse delay-500" />
        
        {/* Animated light rays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/2 to-transparent animate-pulse duration-3000" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-500/2 to-transparent animate-pulse duration-4000 delay-1000" />
      </div>

      <div className="relative space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Harmony of Gaia Wallet
            </h1>
            <p className="text-muted-foreground">Complete transparency with real-time updates every 5 seconds</p>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400/20 rounded-full animate-pulse" />
          </div>
        </div>
        
        <Tabs defaultValue="matrix" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="matrix" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              Personal Matrix
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Network Matrix
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              Main Wallet
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              All Transactions
            </TabsTrigger>
            <TabsTrigger value="gaia-tracker" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              GAiA Token Tracker
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
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Wallet
