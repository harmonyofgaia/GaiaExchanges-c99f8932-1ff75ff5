
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
import { ArtistRegistration } from '@/components/ArtistRegistration'
import { LiveTVScreen } from '@/components/LiveTVScreen'
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ArtistStreaming = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <GlobalAnnouncement />
        
        <div className="mt-12">
          <Tabs defaultValue="live-tv" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="live-tv">Live TV Shows</TabsTrigger>
              <TabsTrigger value="streaming">Artist Streaming</TabsTrigger>
              <TabsTrigger value="register">Artist Registration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live-tv">
              <LiveTVScreen />
            </TabsContent>
            
            <TabsContent value="streaming">
              <ArtistStreamingPlatform />
            </TabsContent>
            
            <TabsContent value="register">
              <ArtistRegistration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ArtistStreaming
