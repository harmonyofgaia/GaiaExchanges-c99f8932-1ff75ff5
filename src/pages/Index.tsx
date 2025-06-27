
import { MarketData } from '@/components/MarketData'
import { TradingInterface } from '@/components/TradingInterface'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Globe, Users, Leaf, Flame, Recycle } from 'lucide-react'

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Harmony of Gaia Dashboard</h1>
          <p className="text-muted-foreground">Environmental sustainability through transparent cryptocurrency operations</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Eco-System Active</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-green-400">$2.1M</div>
            <p className="text-xs text-green-400">+15.2% this month</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Burned</CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-orange-400">1.25M</div>
            <p className="text-xs text-orange-400">25K this week</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-blue-400">47.3K</div>
            <p className="text-xs text-green-400">+8.1% growth</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reinvestment Pool</CardTitle>
            <Recycle className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-purple-400">$890K</div>
            <p className="text-xs text-purple-400">Ready for projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Market Data */}
        <div className="lg:col-span-1 space-y-6">
          <MarketData />
        </div>

        {/* Right Column - Trading & Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          <TradingInterface />
          <PortfolioOverview />
        </div>
      </div>
    </div>
  )
};

export default Index;
