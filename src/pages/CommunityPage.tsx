
import { Navbar } from '@/components/Navbar'
import { CommunityHub } from '@/components/community/CommunityHub'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <EnhancedBackgroundManager 
        settings={{
          type: 'matrix',
          intensity: 'low',
          color: '#00ff00',
          speed: 0.5,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <CommunityHub />
      </div>
    </div>
  )
}
