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
import { EnhancedLevel2Defense } from '@/components/security/EnhancedLevel2Defense'
import { ExchangeComplianceDocuments } from '@/components/legal/ExchangeComplianceDocuments'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { ExchangeLinks } from '@/components/home/ExchangeLinks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
      <EnhancedLevel2Defense />
      {isAdmin && <AdminLayoutEditor />}
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        <HeroSection />
        
        {/* New Blockchain Movie Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 mb-6">
                🎬 DISCOVER GAIA'S PRIVATE BLOCKCHAIN
              </h2>
              
              <div className="relative w-full max-w-4xl mx-auto h-64 bg-black rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🔗</div>
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      THE WORLD'S MOST SECURE BLOCKCHAIN
                    </div>
                    <div className="text-lg text-blue-400 mb-4 animate-pulse">
                      Quantum-Protected • Dragon-Secured • Eco-Friendly
                    </div>
                    
                    <div className="flex justify-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                      <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 text-lg"
              >
                <a href="/blockchain">
                  🔗 EXPLORE OUR PRIVATE BLOCKCHAIN
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

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
