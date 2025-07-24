
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export default function NFTs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            🎨 NFT Marketplace
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Discover and trade unique digital assets on the GAiA Network
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              Our NFT marketplace is under development. Stay tuned for exclusive digital art and collectibles!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
