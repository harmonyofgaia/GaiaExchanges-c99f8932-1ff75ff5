
import { CoralReefNFTMarketplace } from '@/components/CoralReefNFTMarketplace'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { EnhancedDownloadLinks } from '@/components/downloads/EnhancedDownloadLinks'
import { EnhancedWormsArena } from '@/components/EnhancedWormsArena'

const Webshop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🌊 HARMONY OF GAIA MARKETPLACE
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Purchase NFTs that make a real difference in the world • Powered by GAiA Token
          </p>
          <p className="text-green-400 mt-1">
            Visit www.gaiaexchange.net for complete trading experience
          </p>
        </div>
        
        {/* Enhanced Download Links */}
        <EnhancedDownloadLinks />
        
        {/* GAiA Landscape NFT Marketplace */}
        <GamingNFTMarketplace />
        
        {/* Enhanced Space Worms Game */}
        <EnhancedWormsArena />
        
        {/* Coral Reef NFT Marketplace */}
        <CoralReefNFTMarketplace />
      </div>
    </div>
  )
}

export default Webshop
