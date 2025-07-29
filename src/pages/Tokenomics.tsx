
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { PieChart, TrendingUp, Coins } from 'lucide-react'

export default function Tokenomics() {
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
      
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            📊 Tokenomics Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            GAiA token economics and distribution model
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <PieChart className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Token Distribution</div>
              <div className="text-sm text-muted-foreground">Fair allocation model</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <TrendingUp className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Value Growth</div>
              <div className="text-sm text-muted-foreground">Sustainable economics</div>
            </div>

            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <Coins className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">Token Utility</div>
              <div className="text-sm text-muted-foreground">Multi-purpose usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
