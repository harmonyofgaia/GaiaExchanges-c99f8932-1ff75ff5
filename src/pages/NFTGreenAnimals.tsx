
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Coins, Leaf, Star, Shield } from 'lucide-react'

export default function NFTGreenAnimals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 to-emerald-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              🌱 GAiA NFT Green Animals Collection
            </CardTitle>
            <div className="text-center space-y-2">
              <div className="text-xl text-green-400 font-bold">
                Protecting Wildlife • Earning Tokens • Building Green Future
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge className="bg-green-600 animate-pulse">ECO FRIENDLY</Badge>
                <Badge className="bg-blue-600 animate-pulse">BLOCKCHAIN POWERED</Badge>
                <Badge className="bg-purple-600 animate-pulse">COMMUNITY DRIVEN</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* NFT Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { name: 'Green Dragon Guardian', rarity: 'Legendary', tokens: 500, emoji: '🐉' },
            { name: 'Emerald Eagle', rarity: 'Epic', tokens: 300, emoji: '🦅' },
            { name: 'Forest Wolf Pack', rarity: 'Rare', tokens: 200, emoji: '🐺' },
            { name: 'Ocean Whale Protector', rarity: 'Epic', tokens: 350, emoji: '🐋' },
            { name: 'Mountain Lion Spirit', rarity: 'Rare', tokens: 250, emoji: '🦁' },
            { name: 'Bamboo Panda Sage', rarity: 'Common', tokens: 100, emoji: '🐼' }
          ].map((nft, index) => (
            <Card key={index} className="border-green-500/30 bg-green-900/20 hover:bg-green-800/30 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-green-400">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{nft.emoji}</span>
                    <span className="text-sm">{nft.name}</span>
                  </div>
                  <Badge className={`${
                    nft.rarity === 'Legendary' ? 'bg-yellow-600' :
                    nft.rarity === 'Epic' ? 'bg-purple-600' :
                    nft.rarity === 'Rare' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {nft.rarity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Earn Potential:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{nft.tokens} GAiA</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Adopt & Protect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Statistics */}
        <Card className="border-emerald-500/30 bg-emerald-900/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-900/30 rounded-lg">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">12,847</div>
                <div className="text-xs text-muted-foreground">Trees Planted</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <Star className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">5,432</div>
                <div className="text-xs text-muted-foreground">NFTs Adopted</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <Coins className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">1.2M</div>
                <div className="text-xs text-muted-foreground">Tokens Earned</div>
              </div>
              <div className="p-4 bg-emerald-900/30 rounded-lg">
                <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-400">89</div>
                <div className="text-xs text-muted-foreground">Species Protected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
