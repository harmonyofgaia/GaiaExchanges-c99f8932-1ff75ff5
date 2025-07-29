
import { GaiasExchange } from '@/components/GaiasExchange'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { FullyFunctionalExchange } from '@/components/FullyFunctionalExchange'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { GaiaFeeManager } from '@/components/GaiaFeeManager'
import { PrivateBlockchainNetwork } from '@/components/admin/PrivateBlockchainNetwork'
import { SwapSystem } from '@/components/SwapSystem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftRight, TrendingUp, Shield, Database, Network, Crown } from 'lucide-react'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🔄 GAIA Token Exchange & Private Blockchain Network
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Our Own Private Blockchain Network • Zero Fees • Quantum Security
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge className="bg-green-600 text-white animate-pulse">
              <Crown className="h-4 w-4 mr-1" />
              PRIMARY EXCHANGE
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Shield className="h-4 w-4 mr-1" />
              PRIVATE BLOCKCHAIN
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <Database className="h-4 w-4 mr-1" />
              QUANTUM SECURED
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="private-blockchain" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="private-blockchain">🔗 Private Blockchain</TabsTrigger>
            <TabsTrigger value="swap-system">🔄 Swap System</TabsTrigger>
            <TabsTrigger value="exchange">📈 Live Exchange</TabsTrigger>
            <TabsTrigger value="fee-manager">💰 Fee Options</TabsTrigger>
            <TabsTrigger value="investors">🕵️ Investor Scouting</TabsTrigger>
            <TabsTrigger value="listings">🌐 Exchange Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="private-blockchain" className="space-y-6">
            <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Crown className="h-6 w-6" />
                  🏆 GAiA's Private Blockchain Network - Our Primary Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h3 className="font-medium text-green-400 mb-2">Primary Exchange Features</h3>
                  <ul className="text-sm space-y-1 text-green-300">
                    <li>• Our own private blockchain network</li>
                    <li>• Zero trading fees on all transactions</li>
                    <li>• Quantum-resistant security</li>
                    <li>• 100,000+ TPS transaction speed</li>
                    <li>• Complete transparency & control</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                    <Network className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold text-green-400">Private Network</h4>
                    <p className="text-green-300 text-sm">Our own blockchain infrastructure</p>
                  </div>
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-bold text-blue-400">Quantum Security</h4>
                    <p className="text-blue-300 text-sm">Unbreakable encryption</p>
                  </div>
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-bold text-purple-400">Zero Fees</h4>
                    <p className="text-purple-300 text-sm">No transaction costs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <PrivateBlockchainNetwork />
          </TabsContent>
          
          <TabsContent value="swap-system" className="space-y-6">
            <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <ArrowLeftRight className="h-6 w-6" />
                  🔄 GAiA Private Blockchain Swap System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-blue-400 mb-2">Powered by Our Private Blockchain</h3>
                  <p className="text-sm text-blue-300">
                    All swaps processed through GAiA's private blockchain network for maximum security and zero fees
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <SwapSystem />
          </TabsContent>
          
          <TabsContent value="exchange" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <ArrowLeftRight className="h-5 w-5" />
                    Private Blockchain Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="font-medium text-green-400 mb-2">Primary Exchange Features</h3>
                    <ul className="text-sm space-y-1 text-green-300">
                      <li>• Our own private blockchain</li>
                      <li>• Zero trading fees</li>
                      <li>• Quantum security</li>
                      <li>• Instant transactions</li>
                      <li>• Full transparency</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Crown className="h-4 w-4 mr-2" />
                    Trade on Primary Exchange
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <TrendingUp className="h-5 w-5" />
                    Private Blockchain Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-medium text-blue-400 mb-2">Live Network Data</h3>
                    <ul className="text-sm space-y-1 text-blue-300">
                      <li>• Real-time blockchain metrics</li>
                      <li>• Node health monitoring</li>
                      <li>• Transaction analytics</li>
                      <li>• Security status</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Database className="h-4 w-4 mr-2" />
                    View Network Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <FullyFunctionalExchange />
          </TabsContent>
          
          <TabsContent value="fee-manager" className="space-y-6">
            <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-6 w-6" />
                  💰 Private Blockchain Fee Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-purple-400 mb-2">Zero Fees on Primary Exchange</h3>
                  <p className="text-sm text-purple-300">
                    Our private blockchain network eliminates all trading fees for GAiA token transactions
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <GaiaFeeManager />
          </TabsContent>
          
          <TabsContent value="investors" className="space-y-6">
            <InvestorScoutingSystem />
          </TabsContent>
          
          <TabsContent value="listings" className="space-y-6">
            <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Network className="h-6 w-6" />
                  🌐 Multi-Exchange Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-orange-400 mb-2">Primary: GAiA Private Blockchain</h3>
                  <p className="text-sm text-orange-300">
                    While we integrate with other exchanges, our private blockchain remains the primary and preferred trading platform
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <MultiExchangeIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
