
import { GaiaCoinCrafter } from '@/components/GaiaCoinCrafter'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'

const GaiaCoinCrafterPage = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🔥 GAIA COIN CRAFTER
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Automated Market Supply & Burning System
          </p>
        </div>
        
        <div className="space-y-8">
          <MatrixWalletDisplay />
          <GaiaCoinCrafter />
        </div>
      </div>
    </div>
  )
}

export default GaiaCoinCrafterPage
