
import { GaiaCoinCrafter } from '@/components/GaiaCoinCrafter'
import { AnimatedCoinCrafting } from '@/components/AnimatedCoinCrafting'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'

const GaiaCoinCrafterPage = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🔥 OFFICIAL GAiA COIN CRAFTER
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Connected to Official GAiA Token - Coin Crafting System & Market Supply Management
          </p>
          <div className="mt-4 text-sm text-green-400">
            Official Wallet: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh
          </div>
          <div className="text-sm text-purple-400">
            Contract: t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump
          </div>
        </div>
        
        <div className="space-y-8">
          <MatrixWalletDisplay />
          <AnimatedCoinCrafting />
          <GaiaCoinCrafter />
        </div>
      </div>
    </div>
  )
}

export default GaiaCoinCrafterPage
