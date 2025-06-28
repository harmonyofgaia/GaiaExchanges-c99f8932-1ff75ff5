
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'

const ArtistStreaming = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <GlobalAnnouncement />
        <div className="mt-12">
          <ArtistStreamingPlatform />
        </div>
      </div>
    </div>
  )
}

export default ArtistStreaming
