
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Star, Zap } from 'lucide-react'

const NFTs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🎨 GAiA NFT Collection
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Unique environmental NFTs • Support conservation • Own digital art
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-pink-500/30 bg-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-400">
              <Palette className="h-6 w-6" />
              Environmental Art
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🌍</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-pink-400">Gaia's Harmony #001</h3>
              <Badge className="bg-pink-600">Rare</Badge>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                View Collection
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Star className="h-6 w-6" />
              Conservation Series
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🐯</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-purple-400">Wildlife Guardian #042</h3>
              <Badge className="bg-purple-600">Limited</Badge>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Mint Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Zap className="h-6 w-6" />
              Energy Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">⚡</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-blue-400">Neural Network #123</h3>
              <Badge className="bg-blue-600">Exclusive</Badge>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Explore
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NFTs
