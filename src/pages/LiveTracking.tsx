
import { LiveTrackingEngine } from '@/components/tracking/LiveTrackingEngine'
import { LiveChartsGrid } from '@/components/tracking/LiveChartsGrid'
import { AdminDashboard } from '@/components/tracking/AdminDashboard'
import { WhitepaperGenerator } from '@/components/whitepaper/WhitepaperGenerator'
import { TradingInterface } from '@/components/TradingInterface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, BarChart3, Shield, FileText, TrendingUp } from 'lucide-react'

const LiveTracking = () => {
  console.log("LiveTracking component loaded successfully");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAIA Live Tracking & Analytics Center
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Real-Time Charts • Live Performance • Admin Controls • Global Monitoring
          </p>
          <p className="text-sm text-green-400 mt-2">
            🚀 Always 10x Faster, Stronger & More Secure Than Any Competitor
          </p>
        </div>

        <Card className="mb-6 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-600 text-white animate-pulse px-4 py-2">
                <Activity className="h-4 w-4 mr-2" />
                Live Data Stream Active
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <BarChart3 className="h-4 w-4 mr-2" />
                Real-time Charts
              </Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance 10x Enhanced
              </Badge>
              <Badge className="bg-red-600 text-white px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Admin Controls
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="live-charts" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="live-charts" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📊 Live Charts & Graphs
            </TabsTrigger>
            <TabsTrigger value="tracking-engine" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔄 Tracking Engine
            </TabsTrigger>
            <TabsTrigger value="trading-interface" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              💰 Trading Charts
            </TabsTrigger>
            <TabsTrigger value="admin-dashboard" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🔒 Admin Dashboard
            </TabsTrigger>
            <TabsTrigger value="whitepaper" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              📄 Documentation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live-charts" className="space-y-6 mt-6">
            <LiveChartsGrid />
          </TabsContent>
          
          <TabsContent value="tracking-engine" className="space-y-6 mt-6">
            <LiveTrackingEngine />
          </TabsContent>
          
          <TabsContent value="trading-interface" className="space-y-6 mt-6">
            <TradingInterface />
          </TabsContent>
          
          <TabsContent value="admin-dashboard" className="space-y-6 mt-6">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="whitepaper" className="space-y-6 mt-6">
            <WhitepaperGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default LiveTracking
