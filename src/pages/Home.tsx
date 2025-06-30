
import { RobotAdvertisement } from '@/components/advertising/RobotAdvertisement'
import { HeroSection } from '@/components/home/HeroSection'
import { FeatureGrid } from '@/components/home/FeatureGrid'
import { CommunityStats } from '@/components/home/CommunityStats'
import { CallToAction } from '@/components/home/CallToAction'
import { SecurityPreview } from '@/components/home/SecurityPreview'
import { GameUpdatePreview } from '@/components/home/GameUpdatePreview'
import { HomeBackground } from '@/components/home/HomeBackground'
import { MatrixBackground } from '@/components/ui/matrix-background'
import { UniversalStyleController } from '@/components/admin/UniversalStyleController'
import { HoverSidebar } from '@/components/HoverSidebar'
import { WorldRankingDashboard } from '@/components/home/WorldRankingDashboard'
import { AdminLayoutEditor } from '@/components/admin/AdminLayoutEditor'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { InvisibleAdminProtection } from '@/components/security/InvisibleAdminProtection'
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { ExchangeComplianceDocuments } from '@/components/legal/ExchangeComplianceDocuments'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { ExchangeLinks } from '@/components/home/ExchangeLinks'

const Home = () => {
  const { isAdmin } = useSecureAdmin()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HomeBackground />
      <MatrixBackground speed={60} density={15} color="#00ff41" fadeEffect={true} />
      <RobotAdvertisement />
      <UniversalStyleController />
      <HoverSidebar />
      <InvisibleSecurityCore />
      <InvisibleAdminProtection />
      <InvisibleAttachmentSystem />
      {isAdmin && <AdminLayoutEditor />}
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        <HeroSection />
        <WorldRankingDashboard />
        <FeatureGrid />
        <CommunityStats />
        <GameUpdatePreview />
        <CallToAction />
        <SecurityPreview />
        <ExchangeLinks />
        {isAdmin && <ExchangeComplianceDocuments />}
      </div>
    </div>
  )
}

export default Home
