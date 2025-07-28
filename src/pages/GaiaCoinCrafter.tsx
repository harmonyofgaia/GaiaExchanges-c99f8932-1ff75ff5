
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Factory, 
  Coins, 
  Flame, 
  TrendingUp, 
  Calendar,
  Zap,
  Target,
  Recycle,
  Copy,
  ExternalLink,
  BarChart3,
  Hammer
} from 'lucide-react'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'
import { toast } from 'sonner'
import { EnhancedCoinCrafter } from '@/components/EnhancedCoinCrafter'
import { RealTimeCoinCrafter } from '@/components/RealTimeCoinCrafter'
import { AnimatedCoinCrafting } from '@/components/AnimatedCoinCrafting'
import HoverSidebar from '@/components/HoverSidebar'

const GaiaCoinCrafterPage = () => {
  const [monthlyProgress, setMonthlyProgress] = useState(67)
  const [totalCrafted, setTotalCrafted] = useState(245678)
  const [burnedForReinvestment, setBurnedForReinvestment] = useState(12459)
  const [nextCraftingIn, setNextCraftingIn] = useState(13)

  const copyOfficialWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Official GAiA Wallet Address Copied!', {
      description: 'Connected to official GAiA wallet address',
      duration: 3000
    })
  }

  const copyOfficialContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('Official GAiA Contract Address Copied!', {
      description: 'Connected to official GAiA contract address',
      duration: 3000
    })
  }

  const openOfficialPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
    toast.info('🚀 Opening Official GAiA on Pump.fun', {
      description: 'Redirecting to official GAiA token page...',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400">
              🔥 GAiA COIN CRAFTER - ENDLESS SUPPLY
            </h1>
            <p className="text-muted-foreground mt-2">
              Crafting GAiA coins endlessly for our amazing community
            </p>
          </div>

          {/* Official GAiA Token Info */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Coins className="h-6 w-6" />
                🌍 Official GAiA Token - Endless Coin Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Official Wallet Address */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-bold">Official GAiA Wallet:</span>
                    <div className="flex gap-2">
                      <Button onClick={copyOfficialWalletAddress} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button onClick={openOfficialPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Charts
                      </Button>
                    </div>
                  </div>
                  <code className="text-blue-300 font-mono text-xs break-all block bg-blue-900/10 p-2 rounded">
                    {GAIA_TOKEN.WALLET_ADDRESS}
                  </code>
                </div>

                {/* Official Contract Address */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-400 font-bold">Official GAiA Contract:</span>
                    <Button onClick={copyOfficialContractAddress} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-purple-300 font-mono text-xs break-all block bg-purple-900/10 p-2 rounded">
                    {GAIA_TOKEN.CONTRACT_ADDRESS}
                  </code>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatGaiaPrice(GAIA_TOKEN.INITIAL_PRICE)}</div>
                  <div className="text-muted-foreground">Official GAiA Price</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{formatGaiaNumber(GAIA_METRICS.INITIAL_HOLDERS)}</div>
                  <div className="text-muted-foreground">Official Holders</div>
                </div>
                <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{formatGaiaPrice(GAIA_METRICS.INITIAL_MARKET_CAP)}</div>
                  <div className="text-muted-foreground">Official Market Cap</div>
                </div>
                <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{formatGaiaPrice(GAIA_METRICS.INITIAL_VOLUME)}</div>
                  <div className="text-muted-foreground">Official Volume 24h</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Coin Crafting Systems */}
          <Tabs defaultValue="enhanced" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="enhanced">Enhanced Crafter</TabsTrigger>
              <TabsTrigger value="realtime">Real-Time Forge</TabsTrigger>
              <TabsTrigger value="animated">Original Crafter</TabsTrigger>
            </TabsList>

            <TabsContent value="enhanced" className="space-y-4">
              <EnhancedCoinCrafter />
            </TabsContent>

            <TabsContent value="realtime" className="space-y-4">
              <RealTimeCoinCrafter />
            </TabsContent>

            <TabsContent value="animated" className="space-y-4">
              <AnimatedCoinCrafting />
            </TabsContent>
          </Tabs>

          {/* Community Supply Information */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Factory className="h-6 w-6" />
                🏭 ENDLESS SUPPLY FOR OUR COMMUNITY
              </CardTitle>
              <p className="text-muted-foreground">
                Our crafters work 24/7 to ensure endless GAiA coin supply for our amazing community
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Monthly Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400">Community Supply Progress</span>
                  <Badge className="bg-purple-600 text-white">
                    {monthlyProgress.toFixed(1)}% Complete
                  </Badge>
                </div>
                
                <Progress value={monthlyProgress} className="h-4" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{totalCrafted.toLocaleString()}</div>
                    <div className="text-muted-foreground">GAiA Coins Crafted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{burnedForReinvestment.toLocaleString()}</div>
                    <div className="text-muted-foreground">Burned for Community</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{nextCraftingIn}</div>
                    <div className="text-muted-foreground">Days to Next Craft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">∞</div>
                    <div className="text-muted-foreground">Endless Supply</div>
                  </div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Hammer className="h-4 w-4 mr-2" />
                  Craft More GAiA
                </Button>
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Flame className="h-4 w-4 mr-2" />
                  Boost Production
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Community Goals
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Supply Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GaiaCoinCrafterPage
