
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Crown, 
  Star, 
  Gem,
  Eye,
  Search,
  Filter,
  Sword,
  Shield,
  TreePine,
  Mountain,
  Waves,
  Flame
} from 'lucide-react'
import { toast } from 'sonner'

interface LandscapeNFT {
  id: string
  name: string
  level: number
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  price: number
  attackPower: number
  defenseBonus: number
  specialAbility: string
  creator: string
  sold: boolean
  image: string
}

export function GamingNFTMarketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('All')

  const [landscapeNFTs] = useState<LandscapeNFT[]>([
    {
      id: '1',
      name: 'Ancient Forest Stronghold',
      level: 95,
      rarity: 'Mythical',
      price: 2500,
      attackPower: 950,
      defenseBonus: 800,
      specialAbility: 'Forest Regeneration',
      creator: 'DragonMaster88',
      sold: true,
      image: '🌲'
    },
    {
      id: '2',
      name: 'Volcanic Fire Domain',
      level: 87,
      rarity: 'Legendary',
      price: 1800,
      attackPower: 870,
      defenseBonus: 650,
      specialAbility: 'Lava Strike',
      creator: 'FireElemental',
      sold: false,
      image: '🌋'
    },
    {
      id: '3',
      name: 'Frozen Crystal Palace',
      level: 75,
      rarity: 'Epic',
      price: 950,
      attackPower: 750,
      defenseBonus: 900,
      specialAbility: 'Ice Shield',
      creator: 'IceQueen42',
      sold: false,
      image: '❄️'
    },
    {
      id: '4',
      name: 'Ocean Depths Fortress',
      level: 68,
      rarity: 'Epic',
      price: 750,
      attackPower: 680,
      defenseBonus: 720,
      specialAbility: 'Tsunami Wave',
      creator: 'SeaKing77',
      sold: true,
      image: '🌊'
    },
    {
      id: '5',
      name: 'Desert Sand Citadel',
      level: 45,
      rarity: 'Rare',
      price: 350,
      attackPower: 450,
      defenseBonus: 380,
      specialAbility: 'Sandstorm',
      creator: 'DesertNomad',
      sold: false,
      image: '🏜️'
    }
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythical': return 'from-purple-600 to-pink-600'
      case 'Legendary': return 'from-yellow-600 to-orange-600'
      case 'Epic': return 'from-blue-600 to-cyan-600'
      case 'Rare': return 'from-green-600 to-emerald-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const buyNFT = (nft: LandscapeNFT) => {
    toast.success(`🎮 Purchased ${nft.name}!`, {
      description: `Attack Power: ${nft.attackPower} | Defense: ${nft.defenseBonus} | Ability: ${nft.specialAbility}`,
      duration: 5000
    })
  }

  const filteredNFTs = landscapeNFTs.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === 'All' || nft.rarity === selectedRarity
    return matchesSearch && matchesRarity
  })

  return (
    <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/50">
      <CardHeader>
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          🏪 LANDSCAPE ATTACK NFT MARKETPLACE
        </CardTitle>
        <p className="text-muted-foreground">
          Purchase NFT landscapes to attack and reform other players' worlds
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search landscapes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-4 py-2 bg-muted border border-border rounded-md"
          >
            <option value="All">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
            <option value="Mythical">Mythical</option>
          </select>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <Card 
              key={nft.id}
              className={`bg-gradient-to-br ${getRarityColor(nft.rarity)}/20 border-2 hover:scale-105 transition-all duration-300 relative`}
            >
              {nft.sold && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-red-600 text-white">SOLD</Badge>
                </div>
              )}

              <CardContent className="p-4 space-y-4">
                {/* NFT Image/Icon */}
                <div className="relative h-32 bg-gradient-to-br from-black/30 to-gray-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-6xl">{nft.image}</div>
                  <div className="absolute top-2 left-2">
                    <Badge className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 text-white font-bold">
                    Lv.{nft.level}
                  </div>
                </div>

                {/* NFT Details */}
                <div>
                  <h3 className="font-bold text-lg text-white mb-2">{nft.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Sword className="h-3 w-3 text-red-400" />
                        Attack:
                      </span>
                      <span className="text-red-400 font-bold">{nft.attackPower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-blue-400" />
                        Defense:
                      </span>
                      <span className="text-blue-400 font-bold">{nft.defenseBonus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-400">Special:</span>
                      <span className="text-purple-400 font-bold">{nft.specialAbility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator:</span>
                      <span className="text-cyan-400">{nft.creator}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Buy */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{nft.price} GAIA</div>
                  </div>
                  <Button 
                    onClick={() => buyNFT(nft)}
                    disabled={nft.sold}
                    className={`w-full bg-gradient-to-r ${getRarityColor(nft.rarity)} hover:opacity-90 disabled:opacity-50`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {nft.sold ? 'SOLD OUT' : 'BUY LANDSCAPE NFT'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Marketplace Stats */}
        <Card className="bg-black/30 border-purple-500/20 mt-8">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">247</div>
                <div className="text-sm text-muted-foreground">Total NFTs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">89</div>
                <div className="text-sm text-muted-foreground">Sold</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">158</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">45.2K</div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
