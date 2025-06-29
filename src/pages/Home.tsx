
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { HeroSection } from '@/components/home/HeroSection'
import { FeatureGrid } from '@/components/home/FeatureGrid'
import { CommunityStats } from '@/components/home/CommunityStats'
import { CallToAction } from '@/components/home/CallToAction'
import { SecurityPreview } from '@/components/home/SecurityPreview'
import { EnhancedHomeBackground } from '@/components/home/EnhancedHomeBackground'
import { UniversalStyleController } from '@/components/admin/UniversalStyleController'

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <EnhancedHomeBackground />
      <RobotAdvertisement />
      <UniversalStyleController />
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        <HeroSection />

        {/* ETERNAL DRAGON with artistic enhancement */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-xl" />
          <div className="relative">
            <EternalDragonDisplay />
          </div>
        </div>

        <FeatureGrid />
        <CommunityStats />
        <CallToAction />
        <SecurityPreview />
      </div>
    </div>
  )
}

export default Home
