
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Palette, Star, Zap, Crown, Heart, Sparkles } from 'lucide-react'

const NFTs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          🎨 GAiA PREMIUM NFT COLLECTION VAULT
        </h1>
        <p className="text-xl text-white/90 mt-4 drop-shadow-lg font-semibold">
          Exclusive environmental NFTs • Conservation powered • Digital art revolution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-pink-500/50 bg-pink-900/30 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-300">
              <Palette className="h-6 w-6" />
              🌍 Environmental Genesis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg mb-4 flex items-center justify-center border border-pink-500/20 shadow-inner">
              <div className="text-6xl animate-pulse">🌍</div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-pink-200 text-lg">Gaia's Harmony Genesis #001</h3>
              <div className="flex justify-between items-center">
                <Badge className="bg-pink-600 shadow-lg">LEGENDARY</Badge>
                <span className="text-pink-300 font-bold">0.123 ETH</span>
              </div>
              <Progress value={89} className="h-2" />
              <p className="text-sm text-pink-100/80">89% Environmental Impact Achieved</p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg">
                <Crown className="h-4 w-4 mr-2" />
                ACQUIRE MASTERPIECE
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-900/30 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Star className="h-6 w-6" />
              🐯 Conservation Elite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg mb-4 flex items-center justify-center border border-purple-500/20 shadow-inner">
              <div className="text-6xl animate-bounce">🐯</div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-purple-200 text-lg">Wildlife Guardian Supreme #042</h3>
              <div className="flex justify-between items-center">
                <Badge className="bg-purple-600 shadow-lg">MYTHICAL</Badge>
                <span className="text-purple-300 font-bold">0.456 ETH</span>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-sm text-purple-100/80">95% Conservation Power Unlocked</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                <Heart className="h-4 w-4 mr-2" />
                PROTECT WILDLIFE
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/50 bg-blue-900/30 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-300">
              <Zap className="h-6 w-6" />
              ⚡ Neural Quantum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg mb-4 flex items-center justify-center border border-blue-500/20 shadow-inner">
              <div className="text-6xl animate-spin">⚡</div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-blue-200 text-lg">Quantum Neural Matrix #123</h3>
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-600 shadow-lg">TRANSCENDENT</Badge>
                <span className="text-blue-300 font-bold">0.789 ETH</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-sm text-blue-100/80">100% Neural Power Activated</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                ASCEND CONSCIOUSNESS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-500/50 bg-yellow-900/30 backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300 text-xl">
            <Crown className="h-6 w-6" />
            👑 EXCLUSIVE GAiA NFT IMPACT DASHBOARD
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-300">47</div>
              <div className="text-sm text-green-100/80">Exclusive Collections</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-300">2,847</div>
              <div className="text-sm text-blue-100/80">Environmental Actions</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-300">934</div>
              <div className="text-sm text-purple-100/80">Wildlife Saved</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-300">∞</div>
              <div className="text-sm text-orange-100/80">Infinite Impact</div>
            </div>
          </div>
          
          <p className="text-yellow-200 mb-4 text-center font-medium">
            Every GAiA NFT purchase directly funds real environmental projects. 
            Your digital art collection becomes a force for planetary healing and wildlife protection.
          </p>
          
          <div className="text-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold px-8 py-3 shadow-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              CREATE LEGENDARY NFT COLLECTION
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NFTs
