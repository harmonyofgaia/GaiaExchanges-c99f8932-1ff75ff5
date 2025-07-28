
import { UniversalMarketplace } from '@/components/marketplace/UniversalMarketplace'

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🏪 UNIVERSAL MARKETPLACE
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Create, Buy, Sell • Cross-Game Compatible • Powered by GAiA
          </p>
        </div>
        
        <UniversalMarketplace />
      </div>
    </div>
  )
}
