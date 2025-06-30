
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, ArrowUpDown, DollarSign, BarChart3, Zap } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const Exchange = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                💱 GAiA Exchange
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Trade GAiA tokens and support environmental initiatives
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="h-6 w-6" />
                  Live Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Real-time GAiA token trading with instant execution.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Trading
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <ArrowUpDown className="h-6 w-6" />
                  Token Swap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Seamlessly swap between GAiA and other cryptocurrencies.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Swap Tokens
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <BarChart3 className="h-6 w-6" />
                  Market Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Advanced charts and market analysis tools.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Charts
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">📊 Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">$0.0001</div>
                  <div className="text-sm text-muted-foreground">GAiA Price</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">+12.5%</div>
                  <div className="text-sm text-muted-foreground">24h Change</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">1.2M</div>
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Exchange
