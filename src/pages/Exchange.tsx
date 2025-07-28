
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowUpDown, DollarSign, BarChart3 } from 'lucide-react'
import { GaiasExchange } from '@/components/GaiasExchange'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { FullyFunctionalExchange } from '@/components/FullyFunctionalExchange'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { GaiaFeeManager } from '@/components/GaiaFeeManager'
import { BlockchainStatus } from '@/components/blockchain/BlockchainStatus'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
              <TrendingUp className="h-12 w-12 text-blue-400 animate-pulse" />
              ⚡ GAIA Exchange Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Complete Trading Ecosystem - Powered by GAIA Blockchain
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-blue-600">🚀 High Performance</Badge>
              <Badge className="bg-green-600">🌱 Eco Tokens</Badge>
              <Badge className="bg-purple-600">⚡ Lightning Fast</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Blockchain Network Status */}
        <div className="mb-8">
          <BlockchainStatus />
        </div>

        <Tabs defaultValue="live-exchange" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live-exchange">🔥 Live Exchange</TabsTrigger>
            <TabsTrigger value="fee-manager">💰 Fee Options</TabsTrigger>
            <TabsTrigger value="investors">👥 Investors</TabsTrigger>
            <TabsTrigger value="listings">📋 Listings</TabsTrigger>
            <TabsTrigger value="platform">🌍 Full Platform</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live-exchange" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-blue-500/50 bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <ArrowUpDown className="h-6 w-6" />
                    Token Swapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instantly swap between environmental and utility tokens via GAIA blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500/50 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    Yield Farming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn rewards by providing liquidity to eco-friendly token pairs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/50 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    Advanced Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professional trading tools and real-time market analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
            <FullyFunctionalExchange />
          </TabsContent>
          
          <TabsContent value="fee-manager" className="space-y-6">
            <GaiaFeeManager />
          </TabsContent>
          
          <TabsContent value="investors" className="space-y-6">
            <InvestorScoutingSystem />
          </TabsContent>
          
          <TabsContent value="listings" className="space-y-6">
            <MultiExchangeIntegration />
          </TabsContent>
          
          <TabsContent value="platform" className="space-y-6">
            <GaiasExchange />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
