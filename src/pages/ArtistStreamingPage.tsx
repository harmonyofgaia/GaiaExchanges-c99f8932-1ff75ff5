
import { Navbar } from '@/components/Navbar'
import { ArtistStreamingPlatform } from '@/components/streaming/ArtistStreamingPlatform'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'

export default function ArtistStreamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <EnhancedBackgroundManager 
        settings={{
          type: 'neural',
          intensity: 'medium',
          color: '#a855f7',
          speed: 1.0,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <ArtistStreamingPlatform />
      </div>
    </div>
  )
}
