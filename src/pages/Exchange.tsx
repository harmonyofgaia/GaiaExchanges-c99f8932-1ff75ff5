
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeftRight, TrendingUp, Shield } from 'lucide-react'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🔄 GAIA Token Exchange
          </h1>
          <p className="text-xl text-muted-foreground">
            Multi-chain token exchange with zero fees
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <ArrowLeftRight className="h-5 w-5" />
                Token Exchange
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="font-medium text-green-400 mb-2">Exchange Features</h3>
                <ul className="text-sm space-y-1 text-green-300">
                  <li>• Zero trading fees</li>
                  <li>• Multi-chain support</li>
                  <li>• Instant transactions</li>
                  <li>• Full transparency</li>
                </ul>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Trading
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="h-5 w-5" />
                Market Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-medium text-blue-400 mb-2">Live Market Data</h3>
                <ul className="text-sm space-y-1 text-blue-300">
                  <li>• Real-time price feeds</li>
                  <li>• Trading volume analytics</li>
                  <li>• Market depth charts</li>
                  <li>• Performance metrics</li>
                </ul>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
