
import { Navbar } from '@/components/Navbar'
import { PureInvestmentExchange } from '@/components/exchange/PureInvestmentExchange'
import { EnhancedSwapSystem } from '@/components/EnhancedSwapSystem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Heart, TrendingUp } from 'lucide-react'

export default function Swap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            🌱 Pure Investment Exchange
          </h1>
          <p className="text-muted-foreground mb-6">
            For believers, not traders • Stability over speculation • Community first
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              No Staking
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Heart className="h-3 w-3 mr-1" />
              Community First
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Long-term Focus
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="pure-investment" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pure-investment">🌱 Pure Investment Portal</TabsTrigger>
            <TabsTrigger value="enhanced-swap">⚙️ Advanced Swap Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="pure-investment" className="space-y-6">
            <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 text-center">
                  🛡️ NO STAKING = NO GAMBLING = STABLE FOREVER
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-300 mb-4">
                  We removed all staking features to prevent gambling and ensure long-term stability.
                  GAiA is for believers who want to change the world, not make quick profits.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-900/20 rounded-lg">
                    <h4 className="text-green-400 font-bold">✅ Pure Investment Focus</h4>
                    <p className="text-green-300 text-sm">Long-term growth, environmental impact, community building</p>
                  </div>
                  <div className="p-4 bg-red-900/20 rounded-lg">
                    <h4 className="text-red-400 font-bold">❌ No Daily Trading</h4>
                    <p className="text-red-300 text-sm">No staking, no gambling, no quick profits, no speculation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <PureInvestmentExchange />
          </TabsContent>

          <TabsContent value="enhanced-swap" className="space-y-6">
            <EnhancedSwapSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
