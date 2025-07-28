
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, Heart, Sparkles } from 'lucide-react'

export default function NFTGreenAnimals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-purple-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 flex items-center justify-center gap-3">
              <Sparkles className="h-12 w-12 text-green-400 animate-pulse" />
              🐾 NFT Green Animals
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Collectible Animal NFTs Supporting Conservation
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🐾 Animals</Badge>
              <Badge className="bg-purple-600">🎨 NFTs</Badge>
              <Badge className="bg-blue-600">🌍 Conservation</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Collect & Trade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Collect unique animal NFTs that support real wildlife conservation efforts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Conservation Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every NFT purchase directly funds animal rescue and habitat protection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Coins className="h-6 w-6" />
                Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Stake your animal NFTs to earn GAiA tokens and contribute to eco-projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
