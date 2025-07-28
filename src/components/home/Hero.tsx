
import { HeroSection } from './HeroSection'
import { CommunityStats } from './CommunityStats'
import { ExchangeLinks } from './ExchangeLinks'
import { FeatureGrid } from './FeatureGrid'
import { EnhancedHomeBackground } from './EnhancedHomeBackground'

export const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <EnhancedHomeBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <HeroSection />
        <CommunityStats />
        <ExchangeLinks />
        <FeatureGrid />
      </div>
    </div>
  )
}
