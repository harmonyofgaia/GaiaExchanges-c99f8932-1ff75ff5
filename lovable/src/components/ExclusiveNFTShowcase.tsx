
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Crown, 
  Gem, 
  Sparkles, 
  Eye, 
  Heart,
  Share2,
  ShoppingCart,
  Flame
} from 'lucide-react'

interface NFTData {
  id: string
  name: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  price: string
  attributes: Array<{ trait: string, value: string }>
  powerLevel: number
}

export function ExclusiveNFTShowcase() {
  const [exclusiveNFTs] = useState<NFTData[]>([
    {
      id: '1',
      name: 'Harmony Guardian Whale',
      rarity: 'Mythical',
      price: '2,500 GAiA',
      powerLevel: 9850,
      attributes: [
        { trait: 'Ocean Power', value: 'Supreme' },
        { trait: 'Harmony Level', value: 'Maximum' },
        { trait: 'Environmental Impact', value: '1000x' },
        { trait: 'Special Ability', value: 'Ocean Restoration' }
      ]
    },
    {
      id: '2',
      name: 'Neural Matrix Dolphin',
      rarity: 'Legendary',
      price: '1,800 GAiA',
      powerLevel: 8750,
      attributes: [
        { trait: 'Intelligence', value: 'Quantum' },
        { trait: 'Neural Pathways', value: 'Infinite' },
        { trait: 'Communication', value: 'Telepathic' },
        { trait: 'Special Ability', value: 'Matrix Navigation' }
      ]
    },
    {
      id: '3',
      name: 'Gaia Forest Spirit',
      rarity: 'Epic',
      price: '950 GAiA',
      powerLevel: 7200,
      attributes: [
        { trait: 'Nature Bond', value: 'Ancient' },
        { trait: 'Growth Power', value: 'Exponential' },
        { trait: 'Healing Aura', value: 'Regenerative' },
        { trait: 'Special Ability', value: 'Forest Awakening' }
      ]
    }
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythical': return 'from-purple-600 via-pink-600 to-purple-600'
      case 'Legendary': return 'from-yellow-600 via-orange-600 to-yellow-600'
      case 'Epic': return 'from-blue-600 via-cyan-600 to-blue-600'
      case 'Rare': return 'from-green-600 via-emerald-600 to-green-600'
      default: return 'from-gray-600 via-slate-600 to-gray-600'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Mythical': return <Crown className="w-5 h-5" />
      case 'Legendary': return <Star className="w-5 h-5" />
      case 'Epic': return <Gem className="w-5 h-5" />
      case 'Rare': return <Sparkles className="w-5 h-5" />
      default: return <Eye className="w-5 h-5" />
    }
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/20 relative">
      {/* Background logo decoration */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center">
        <img 
          src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
          alt="Gaia Logo"
          className="w-96 h-96 object-contain"
        />
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <Crown className="w-6 h-6" />
          👑 EXCLUSIVE HARMONY NFT COLLECTION
        </CardTitle>
        <p className="text-muted-foreground">
          Ultra-rare NFTs with real environmental impact and exclusive gaming powers
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exclusiveNFTs.map((nft) => (
            <Card 
              key={nft.id}
              className={`relative overflow-hidden border-2 bg-gradient-to-br ${getRarityColor(nft.rarity)} bg-opacity-10 hover:scale-105 transition-all duration-300 group`}
            >
              {/* NFT Image Placeholder with Neural Background */}
              <div className="relative h-48 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
                {/* Animated neural pathways */}
                <div className="absolute inset-0">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        height: `${Math.random() * 100 + 50}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Central NFT representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${getRarityColor(nft.rarity)} flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform`}>
                    {getRarityIcon(nft.rarity)}
                  </div>
                </div>

                {/* Rarity badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white border-none`}>
                    {nft.rarity}
                  </Badge>
                </div>

                {/* Power level indicator */}
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-yellow-600 text-white">
                    <Flame className="w-3 h-3 mr-1" />
                    {nft.powerLevel.toLocaleString()}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{nft.name}</h3>
                  <div className="text-2xl font-bold text-green-400">{nft.price}</div>
                </div>

                {/* Attributes */}
                <div className="space-y-2">
                  {nft.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{attr.trait}:</span>
                      <span className="text-cyan-400 font-medium">{attr.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-3">
                  <Button 
                    className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} hover:opacity-90 flex-1`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy NFT
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-500">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-500">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collection Stats */}
        <Card className="bg-black/30 border-purple-500/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">247</div>
                <div className="text-sm text-muted-foreground">Total NFTs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">89</div>
                <div className="text-sm text-muted-foreground">Owners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">12.5K</div>
                <div className="text-sm text-muted-foreground">Floor Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">456.8K</div>
                <div className="text-sm text-muted-foreground">Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">95%</div>
                <div className="text-sm text-muted-foreground">Listed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
