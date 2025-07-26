
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HoverSidebar from '@/components/HoverSidebar'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { RealTimeAnimalTracker } from '@/components/RealTimeAnimalTracker'
import { AnimalNFTCreator } from '@/components/nft/AnimalNFTCreator'
import { AnimalConservationHub } from '@/components/nft/AnimalConservationHub'
import { LiveAnimalNFTs } from '@/components/LiveAnimalNFTs'
import { GlobalInvestorMagnet } from '@/components/investor/GlobalInvestorMagnet'
import { AIAnimalSearch } from '@/components/animal-welfare/AIAnimalSearch'
import { DualFundingMechanisms } from '@/components/animal-welfare/DualFundingMechanisms'
import { CommunityVaultSystem } from '@/components/animal-welfare/CommunityVaultSystem'
import { LiveProgressDashboard } from '@/components/animal-welfare/LiveProgressDashboard'

const NFTGreenAnimalPlatform = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-emerald-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                🐾 NFT GREEN ANIMAL PLATFORM - EXPANDED
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Conservation Through Technology • Real Animals • Real Impact • Real-Time Tracking
              </p>
              <div className="text-center mt-4 space-y-2">
                <div className="text-lg text-green-400 font-bold">
                  🌍 Dual Funding Mechanisms • 🤖 AI Search • 🎁 Community Vault • 📊 Live Transparency
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="living-animals" className="w-full">
            <TabsList className="grid w-full grid-cols-9">
              <TabsTrigger value="living-animals">🦋 Living Animals</TabsTrigger>
              <TabsTrigger value="ai-search">🤖 AI Search</TabsTrigger>
              <TabsTrigger value="dual-funding">🔄 Dual Funding</TabsTrigger>
              <TabsTrigger value="community-vault">🎁 Vault System</TabsTrigger>
              <TabsTrigger value="live-dashboard">📊 Live Dashboard</TabsTrigger>
              <TabsTrigger value="marketplace">🏪 Marketplace</TabsTrigger>
              <TabsTrigger value="tracking">📡 Live Tracking</TabsTrigger>
              <TabsTrigger value="creator">🎨 Creator</TabsTrigger>
              <TabsTrigger value="conservation">🌱 Conservation</TabsTrigger>
            </TabsList>

            <TabsContent value="living-animals" className="space-y-6">
              <LiveAnimalNFTs />
            </TabsContent>

            <TabsContent value="ai-search" className="space-y-6">
              <AIAnimalSearch />
            </TabsContent>

            <TabsContent value="dual-funding" className="space-y-6">
              <DualFundingMechanisms />
            </TabsContent>

            <TabsContent value="community-vault" className="space-y-6">
              <CommunityVaultSystem />
            </TabsContent>

            <TabsContent value="live-dashboard" className="space-y-6">
              <LiveProgressDashboard />
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-6">
              <GamingNFTMarketplace />
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <RealTimeAnimalTracker />
            </TabsContent>

            <TabsContent value="creator" className="space-y-6">
              <AnimalNFTCreator />
            </TabsContent>

            <TabsContent value="conservation" className="space-y-6">
              <AnimalConservationHub />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default NFTGreenAnimalPlatform
