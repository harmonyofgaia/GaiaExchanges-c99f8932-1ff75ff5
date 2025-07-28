
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, Zap, Shield, Wallet } from 'lucide-react'
import { toast } from 'sonner'

interface AnimalNFT {
  id: string
  name: string
  species: string
  emoji: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  price: number
  animalId: string
  benefits: string[]
  image: string
}

export function AnimalNFTMarketplace() {
  const [nfts] = useState<AnimalNFT[]>([
    {
      id: 'nft_1',
      name: 'Maya Guardian NFT',
      species: 'Bengal Tiger',
      emoji: '🐅',
      rarity: 'legendary',
      price: 2500,
      animalId: '1',
      benefits: ['Direct wallet access', 'VR visitation rights', 'Monthly updates', 'Rehab progress reports'],
      image: '/api/placeholder/300/300'
    },
    {
      id: 'nft_2',
      name: 'Charlie Protector NFT',
      species: 'Rescued Elephant',
      emoji: '🐘',
      rarity: 'epic',
      price: 3500,
      animalId: '2',
      benefits: ['Wallet transparency', 'Release ceremony invite', 'Caretaker communications', 'Photo updates'],
      image: '/api/placeholder/300/300'
    },
    {
      id: 'nft_3',
      name: 'Luna Supporter NFT',
      species: 'Arctic Wolf',
      emoji: '🐺',
      rarity: 'rare',
      price: 1500,
      animalId: '3',
      benefits: ['Medical updates', 'Recovery tracking', 'Feeding schedule access', 'Progress videos'],
      image: '/api/placeholder/300/300'
    }
  ])

  const buyNFT = (nft: AnimalNFT) => {
    toast.success(`🎉 Purchased ${nft.name}!`, {
      description: `Your ${nft.price} GAiA tokens went directly to ${nft.name.split(' ')[0]}'s wallet!`,
      duration: 5000
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-500/50 bg-purple-900/20'
      case 'epic': return 'border-blue-500/50 bg-blue-900/20'
      case 'rare': return 'border-green-500/50 bg-green-900/20'
      case 'common': return 'border-gray-500/50 bg-gray-900/20'
      default: return 'border-gray-500/30'
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-600'
      case 'epic': return 'bg-blue-600'
      case 'rare': return 'bg-green-600'
      case 'common': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Star className="h-6 w-6" />
            🏪 Animal Guardian NFT Marketplace
          </CardTitle>
          <p className="text-muted-foreground">
            Purchase NFTs to become an official guardian. 100% of proceeds go to the animal's dedicated wallet.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className={`${getRarityColor(nft.rarity)} border-2`}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-6xl border border-white/10">
                  {nft.emoji}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{nft.name}</h3>
                    <Badge className={getRarityBadge(nft.rarity)}>
                      {nft.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{nft.species}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Guardian Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {nft.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-bold text-xl text-yellow-400">{nft.price} GAiA</span>
                  </div>
                  
                  <Button 
                    onClick={() => buyNFT(nft)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Become Guardian
                  </Button>
                </div>

                <div className="bg-black/40 p-3 rounded border border-green-500/20">
                  <div className="text-xs text-green-400 font-semibold">100% Direct Funding</div>
                  <div className="text-xs text-muted-foreground">
                    Your purchase goes directly to this animal's wallet for care, food, and rehabilitation.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
