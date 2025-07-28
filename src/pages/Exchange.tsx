
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowUpDown, DollarSign, BarChart3 } from 'lucide-react'
import { PrivateBlockchainNetwork } from '@/components/admin/PrivateBlockchainNetwork'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
              <TrendingUp className="h-12 w-12 text-blue-400 animate-pulse" />
              📈 GAiA Exchange Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Advanced Trading Platform with Private Blockchain Network
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-blue-600">🚀 High Performance</Badge>
              <Badge className="bg-green-600">🌱 Eco Tokens</Badge>
              <Badge className="bg-purple-600">⚡ Lightning Fast</Badge>
              <Badge className="bg-cyan-600">🔗 Private Blockchain</Badge>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="blockchain" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blockchain">Private Blockchain</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="farming">Yield Farming</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blockchain" className="space-y-6">
            <PrivateBlockchainNetwork />
          </TabsContent>
          
          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-blue-500/50 bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <ArrowUpDown className="h-6 w-6" />
                    Token Swapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instantly swap between different environmental and utility tokens with minimal fees.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500/50 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    Spot Trading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trade environmental tokens with advanced order types and real-time market data.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/50 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    Portfolio Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track and manage your environmental token portfolio with detailed analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="farming" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-purple-500/50 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Advanced Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access professional trading tools and real-time market analytics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
