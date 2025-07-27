
import { Navbar } from '@/components/Navbar'
import { NFTMarketplace } from '@/components/marketplace/NFTMarketplace'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'

export default function NFTMarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <EnhancedBackgroundManager 
        settings={{
          type: 'neural',
          intensity: 'medium',
          color: '#8b5cf6',
          speed: 0.8,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <NFTMarketplace />
      </div>
    </div>
  )
}
