
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Coins, TrendingUp, Gift } from 'lucide-react'

export default function Earning() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
            💰 Earning Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Multiple ways to earn GAiA tokens and rewards
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <Coins className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">Token Earning</div>
              <div className="text-sm text-muted-foreground">Multiple earning streams</div>
            </div>

            <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <TrendingUp className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Yield Farming</div>
              <div className="text-sm text-muted-foreground">Passive income generation</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Gift className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Rewards Program</div>
              <div className="text-sm text-muted-foreground">Daily bonuses & airdrops</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
