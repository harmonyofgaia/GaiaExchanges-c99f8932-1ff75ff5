
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, DollarSign, BarChart3, Zap } from 'lucide-react'
import { TradingInterface } from '@/components/TradingInterface'
import { PhantomWalletIntegration } from '@/components/PhantomWalletIntegration'

const Exchange = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-900/20 to-green-900/20">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-green-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400 text-3xl">
              <TrendingUp className="h-8 w-8" />
              💱 GAiA Exchange - Complete Trading Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💱</div>
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                Trade GAiA Tokens with Phantom Integration
              </h2>
              <p className="text-muted-foreground">
                High-speed quantum trading with zero fees and emergency unlock protocols
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
                <DollarSign className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="font-bold text-green-400">Zero Fees</div>
              </div>
              <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
                <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="font-bold text-yellow-400">Instant Trading</div>
              </div>
              <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
                <BarChart3 className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="font-bold text-purple-400">Advanced Charts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="phantom" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phantom">👻 Phantom Wallet</TabsTrigger>
            <TabsTrigger value="trading">📈 Trading Interface</TabsTrigger>
          </TabsList>

          <TabsContent value="phantom" className="space-y-6 mt-6">
            <PhantomWalletIntegration />
          </TabsContent>

          <TabsContent value="trading" className="space-y-6 mt-6">
            <TradingInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Exchange
