
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement'
import { NeuralMatrixBackground } from '@/components/ui/neural-matrix-background'

const ArtistStreaming = () => {
  return (
    <div className="min-h-screen relative">
      <NeuralMatrixBackground />
      
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
