
import { CoralReefNFTMarketplace } from '@/components/CoralReefNFTMarketplace'

const Webshop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🌊 HARMONY OF GAIA MARKETPLACE
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Purchase NFTs that make a real difference in the world
          </p>
        </div>
        
        {/* Coral Reef NFT Marketplace */}
        <CoralReefNFTMarketplace />
      </div>
    </div>
  )
}

export default Webshop
