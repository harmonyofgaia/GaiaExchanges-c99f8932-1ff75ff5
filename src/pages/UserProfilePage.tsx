
import { Navbar } from '@/components/Navbar'
import { UserProfile } from '@/components/user/UserProfile'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <EnhancedBackgroundManager 
        settings={{
          type: 'matrix',
          intensity: 'low',
          color: '#3b82f6',
          speed: 0.6,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <UserProfile isOwner={true} />
      </div>
    </div>
  )
}
