
import { DownloadManager } from '@/components/downloads/DownloadManager'
import { AutomatedGrowthEngine } from '@/components/downloads/AutomatedGrowthEngine'
import { AppStoreLinks } from '@/components/AppStoreLinks'
import { AppStoreDeployment } from '@/components/appstore/AppStoreDeployment'
import { MouseAttractionBackground } from '@/components/ui/mouse-attraction-background'

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-emerald-900/10 relative">
      {/* Mouse Attraction Background */}
      <MouseAttractionBackground />
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            📱 HARMONY OF GAIA DOWNLOADS
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            🌍 Global Access - 100% Working Links - Full App Store Deployment
          </p>
          <p className="text-sm text-green-400 mt-2">
            🦁🐬 Lions + Dolphins Power - Complete Cross-Platform Solution
          </p>
        </div>

        <div className="space-y-8">
          <AutomatedGrowthEngine />
          <AppStoreDeployment />
          <DownloadManager />
          <AppStoreLinks />
        </div>
      </div>
    </div>
  )
}

export default Downloads
