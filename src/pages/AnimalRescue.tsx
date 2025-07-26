
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { AnimalRescueNFT } from '@/components/nft/AnimalRescueNFT'
import { AIAnimalSearch } from '@/components/animal-welfare/AIAnimalSearch'
import { DualFundingMechanisms } from '@/components/animal-welfare/DualFundingMechanisms'
import { CommunityVaultSystem } from '@/components/animal-welfare/CommunityVaultSystem'
import { LiveProgressDashboard } from '@/components/animal-welfare/LiveProgressDashboard'

export default function AnimalRescue() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              🛡️ GAiA ANIMAL RESCUE - EXPANDED PLATFORM
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              AI-Powered Search • Dual Funding Mechanisms • Community Vault • Live Impact Tracking
            </p>
            <div className="text-center mt-4 space-y-2">
              <div className="text-lg text-green-400 font-bold">
                🤖 Individual Blockchain Wallets • 🎁 Legacy Product Gifts • 📊 Transparent Progress
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="ai-search" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ai-search">🤖 AI Animal Search</TabsTrigger>
            <TabsTrigger value="dual-funding">🔄 Dual Funding</TabsTrigger>
            <TabsTrigger value="community-vault">🎁 Community Vault</TabsTrigger>
            <TabsTrigger value="live-dashboard">📊 Live Dashboard</TabsTrigger>
            <TabsTrigger value="animal-nfts">🦋 Animal NFTs</TabsTrigger>
          </TabsList>

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

          <TabsContent value="animal-nfts" className="space-y-6">
            <AnimalRescueNFT />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
