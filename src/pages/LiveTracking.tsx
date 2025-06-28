
import { LiveTrackingEngine } from '@/components/tracking/LiveTrackingEngine'
import { WhitepaperGenerator } from '@/components/whitepaper/WhitepaperGenerator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const LiveTracking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAIA Live Tracking & Performance Center
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Real-Time Global Monitoring • 10x Performance • Love & Joy Protocol Active
          </p>
          <p className="text-sm text-green-400 mt-2">
            🚀 Always 10x Faster, Stronger & More Secure Than Any Competitor
          </p>
        </div>

        <Tabs defaultValue="live-tracking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="live-tracking" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📊 Live Tracking Engine
            </TabsTrigger>
            <TabsTrigger value="whitepaper" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              📄 Whitepaper Generator
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live-tracking" className="space-y-6 mt-6">
            <LiveTrackingEngine />
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
