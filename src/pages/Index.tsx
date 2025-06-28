
import { MarketData } from '@/components/MarketData'
import { TradingInterface } from '@/components/TradingInterface'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { AdvertisingHeader } from '@/components/AdvertisingHeader'
import { AutoIssueResolver } from '@/components/AutoIssueResolver'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Globe, Users, Leaf, Flame, Recycle } from 'lucide-react'

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Official Advertising Header */}
      <AdvertisingHeader />

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Gaia's Exchanges - World Leader Dashboard</h1>
          <p className="text-muted-foreground">The world's most secure and advanced cryptocurrency exchange platform</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Global Trading Network Active</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Impact</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-green-400">$5.2M</div>
            <p className="text-xs text-green-400">Environmental savings achieved</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Level</CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-orange-400">Military</div>
            <p className="text-xs text-orange-400">Grade protection active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trading Volume</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-blue-400">$847K</div>
            <p className="text-xs text-green-400">Daily volume growth</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">World Ranking</CardTitle>
            <Recycle className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-purple-400">#1</div>
            <p className="text-xs text-purple-400">Eco-friendly exchange</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Security System */}
      <AutoIssueResolver />

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
