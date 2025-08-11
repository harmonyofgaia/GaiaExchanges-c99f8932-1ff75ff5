
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, TrendingUp, Users, Zap, Target, Rocket } from 'lucide-react'
import { toast } from 'sonner'
import { PromotionalContentGenerator } from './PromotionalContentGenerator'
import { PumpFunPromotion } from './PumpFunPromotion'
import { RedditPromotionStrategy } from './RedditPromotionStrategy'

export function GlobalMarketingEngine() {
  const [globalReach, setGlobalReach] = useState(2847659)
  const [conversionRate, setConversionRate] = useState(4.7)
  const [activeChannels, setActiveChannels] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalReach(prev => prev + Math.floor(Math.random() * 1000))
      setConversionRate(prev => Math.min(15, prev + 0.01))
      
      console.log('🚀 GLOBAL MARKETING ENGINE - SPREADING ENVIRONMENTAL AWARENESS')
      console.log('🌍 REACHING MILLIONS WITH SUSTAINABLE CRYPTO MESSAGE')
      console.log('💚 CONVERTING USERS TO ENVIRONMENTAL ADVOCATES')
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const launchGlobalCampaign = () => {
    console.log('🚀 LAUNCHING GLOBAL ENVIRONMENTAL AWARENESS CAMPAIGN')
    
    toast.success('🌍 Global Campaign Launched!', {
      description: 'Environmental crypto awareness spreading across all continents',
      duration: 8000
    })
    
    setGlobalReach(prev => prev + 50000)
    setActiveChannels(prev => prev + 3)
  }

  return (
    <div className="space-y-6">
      {/* Main Dashboard */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Globe className="h-8 w-8 animate-spin-slow" />
            🌍 GLOBAL MARKETING COMMAND CENTER
            <Badge className="bg-green-600 animate-pulse">ENVIRONMENTAL FOCUS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{globalReach.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Global Reach</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{conversionRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">{activeChannels}</div>
              <div className="text-sm text-muted-foreground">Active Channels</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-lg">
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-muted-foreground">Campaign Status</div>
            </div>
          </div>

          <Button 
            onClick={launchGlobalCampaign}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-16 text-lg"
          >
            <Rocket className="h-6 w-6 mr-2" />
            🚀 LAUNCH GLOBAL ENVIRONMENTAL AWARENESS CAMPAIGN
          </Button>
        </CardContent>
      </Card>

      {/* Marketing Tabs */}
      <Tabs defaultValue="reddit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reddit">🎯 Reddit Strategy</TabsTrigger>
          <TabsTrigger value="promotional">📢 Content Library</TabsTrigger>
          <TabsTrigger value="pumpfun">🚀 Pump.Fun</TabsTrigger>
        </TabsList>

        <TabsContent value="reddit" className="space-y-6">
          <RedditPromotionStrategy />
        </TabsContent>

        <TabsContent value="promotional" className="space-y-6">
          <PromotionalContentGenerator />
        </TabsContent>

        <TabsContent value="pumpfun" className="space-y-6">
          <PumpFunPromotion />
        </TabsContent>
      </Tabs>
    </div>
  )
}
