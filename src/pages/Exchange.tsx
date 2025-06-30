
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, DollarSign, BarChart3, Shield } from 'lucide-react'

const Exchange = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          💱 GAiA Exchange
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Trade GAiA tokens • Secure decentralized exchange • Environmental impact trading
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <DollarSign className="h-6 w-6" />
              GAiA Trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-green-400">$0.000123</div>
              <div className="text-sm text-muted-foreground">Current GAiA Price</div>
              <Badge className="bg-green-600">+12.34%</Badge>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Trade GAiA
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <BarChart3 className="h-6 w-6" />
              Market Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-blue-400">$847K</div>
              <div className="text-sm text-muted-foreground">24h Volume</div>
              <Badge className="bg-blue-600">Active</Badge>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Charts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield className="h-6 w-6" />
              Secure Trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
              <Badge className="bg-purple-600">Protected</Badge>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-yellow-500/30 bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <TrendingUp className="h-6 w-6" />
            🌍 Environmental Impact Trading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-300 mb-4">
            Every GAiA token trade contributes to real environmental projects. 
            Your trading activity helps plant trees, clean oceans, and protect wildlife.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-xl font-bold text-green-400">2,847</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-xl font-bold text-blue-400">1,653</div>
              <div className="text-sm text-muted-foreground">Ocean Cleanup Projects</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-xl font-bold text-purple-400">934</div>
              <div className="text-sm text-muted-foreground">Wildlife Protected</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Exchange
