
import { EnhancedDownloadLinks } from '@/components/downloads/EnhancedDownloadLinks'
import { EnhancedWormsArena } from '@/components/EnhancedWormsArena'
import { EnhancedLandscapeShowcase } from '@/components/EnhancedLandscapeShowcase'
import { SnakeGame } from '@/components/SnakeGame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, Download, Gamepad2, Image } from 'lucide-react'

const Webshop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🛍️ HARMONY OF GAIA MARKETPLACE
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Digital Products, Games, and Creative Content • Powered by GAiA Token
          </p>
          <p className="text-green-400 mt-1">
            Visit www.gaiaexchanges.net for complete trading experience
          </p>
        </div>

        {/* Marketplace Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-cyan-500/50 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Download className="h-6 w-6" />
                Digital Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                High-quality digital content, wallpapers, and resources
              </p>
              <Badge className="bg-cyan-600 mt-2">Premium Content</Badge>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Gaming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Interactive games and entertainment experiences
              </p>
              <Badge className="bg-purple-600 mt-2">Play & Earn</Badge>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Image className="h-6 w-6" />
                Artwork
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Beautiful landscapes and creative digital artwork
              </p>
              <Badge className="bg-green-600 mt-2">Ultra HD</Badge>
            </CardContent>
          </Card>

          <Card className="border-orange-500/50 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Community-driven marketplace for digital goods
              </p>
              <Badge className="bg-orange-600 mt-2">Community</Badge>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced Download Links */}
        <EnhancedDownloadLinks />
        
        {/* Ultra-High Quality Landscape Showcase */}
        <EnhancedLandscapeShowcase />
        
        {/* Enhanced Space Worms Game */}
        <EnhancedWormsArena />
        
        {/* Snake Game */}
        <SnakeGame />
      </div>
    </div>
  )
}

export default Webshop
