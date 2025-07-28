import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, DollarSign, Leaf, Globe, Shield } from 'lucide-react'

export default function GreenInvestments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Investments
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Invest in a sustainable future with transparent and impactful projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Leaf className="h-5 w-5 text-green-400" />
                Renewable Energy Fund
              </CardTitle>
              <Badge className="bg-green-600">High Growth</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Invest in solar, wind, and hydro energy projects worldwide
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-green-400 font-bold">75%</span>
                </div>
                <Progress value={75} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Returns</span>
                  <span className="text-green-400 font-bold">+12.5% YTD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="text-orange-400 font-bold">Medium</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TreePine className="h-5 w-5 text-blue-400" />
                Sustainable Forestry Bonds
              </CardTitle>
              <Badge className="bg-blue-600">Stable Income</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Support reforestation and sustainable forest management practices
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-green-400 font-bold">92%</span>
                </div>
                <Progress value={92} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Yield</span>
                  <span className="text-green-400 font-bold">5.2% Annual</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maturity</span>
                  <span className="text-white font-bold">5 Years</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Droplets className="h-5 w-5 text-purple-400" />
                Clean Water Initiative
              </CardTitle>
              <Badge className="bg-purple-600">Impact Focus</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Provide clean and safe drinking water to communities in need
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-green-400 font-bold">60%</span>
                </div>
                <Progress value={60} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impact</span>
                  <span className="text-green-400 font-bold">50,000 People</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="text-white font-bold">Africa</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Invest Green?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="h-5 w-5" />
                  Financial Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Green investments offer competitive financial returns while
                  supporting sustainable practices.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Globe className="h-5 w-5" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your investments contribute directly to environmental
                  conservation and restoration efforts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-5 w-5" />
                  Transparency & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform ensures transparency and security for all
                  investment transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
