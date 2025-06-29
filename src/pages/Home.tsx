
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { HeroSection } from '@/components/home/HeroSection'
import { FeatureGrid } from '@/components/home/FeatureGrid'
import { CommunityStats } from '@/components/home/CommunityStats'
import { CallToAction } from '@/components/home/CallToAction'
import { SecurityPreview } from '@/components/home/SecurityPreview'
import { HomeBackground } from '@/components/home/HomeBackground'
import { UniversalStyleController } from '@/components/admin/UniversalStyleController'
import { HoverSidebar } from '@/components/HoverSidebar'

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <HomeBackground />
      <RobotAdvertisement />
      <UniversalStyleController />
      <HoverSidebar />
      
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
