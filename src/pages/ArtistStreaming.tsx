
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
import { ArtistRegistration } from '@/components/ArtistRegistration'
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
          <Tabs defaultValue="register" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="register">Artist Registration</TabsTrigger>
              <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
            </TabsList>
            
            <TabsContent value="register">
              <ArtistRegistration />
            </TabsContent>
            
            <TabsContent value="streaming">
              <ArtistStreamingPlatform />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ArtistStreaming
