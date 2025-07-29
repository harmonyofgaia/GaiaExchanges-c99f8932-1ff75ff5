
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Coins, ArrowRightLeft, PiggyBank } from 'lucide-react'

export default function DeFi() {
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
      
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            🏦 DeFi Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Decentralized Finance for the GAiA Ecosystem
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <Coins className="h-12 w-12 mx-auto text-cyan-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-cyan-400">Liquidity Pools</div>
              <div className="text-sm text-muted-foreground">Provide liquidity & earn</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <ArrowRightLeft className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Token Swaps</div>
              <div className="text-sm text-muted-foreground">Instant exchanges</div>
            </div>

            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <PiggyBank className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">Yield Farming</div>
              <div className="text-sm text-muted-foreground">Maximize returns</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
