
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  Heart, 
  Coins, 
  Star, 
  MapPin,
  Gamepad2,
  Trophy,
  Zap,
  Shield,
  Sword,
  Crown,
  Target,
  Users,
  TrendingUp,
  Home,
  DollarSign,
  Sparkles,
  Play,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

const AnimalNFTCommunity = () => {
  const [animalNFTs, setAnimalNFTs] = useState([
    {
      id: 1,
      name: 'Luna the Wolf',
      species: 'Arctic Wolf',
      rarity: 'Legendary',
      level: 47,
      power: 2850,
      health: 8500,
      location: 'Harmony Sanctuary - Alaska',
      earnings: 4250.75,
      rescueDate: '2023-08-15',
      owner: '0x742d...8f3a',
      price: 0.85,
      abilities: ['Pack Leader', 'Ice Resistance', 'Night Vision'],
      habitat: 'Premium Arctic Enclosure - 50 acres',
      status: 'Training',
      battleWins: 23,
      experience: 15750
    },
    {
      id: 2,
      name: 'Koda the Bear',
      species: 'Brown Bear',
      rarity: 'Epic',
      level: 52,
      power: 3200,
      health: 9800,
      location: 'Mountain Paradise Sanctuary - Canada',
      earnings: 6820.40,
      rescueDate: '2023-06-22',
      owner: '0x8a1b...4c9d',
      price: 1.25,
      abilities: ['Mountain Strength', 'Forest Guardian', 'Hibernation Power'],
      habitat: 'Massive Forest Reserve - 100 acres',
      status: 'Champion',
      battleWins: 41,
      experience: 22400
    },
    {
      id: 3,
      name: 'Zara the Lioness',
      species: 'African Lion',
      rarity: 'Legendary',
      level: 61,
      power: 4100,
      health: 11200,
      location: 'Savanna Freedom Park - Kenya',
      earnings: 8960.20,
      rescueDate: '2023-04-10',
      owner: '0xd7f2...6e8a',
      price: 2.15,
      abilities: ['Royal Roar', 'Savanna Speed', 'Pride Leader'],
      habitat: 'Royal Savanna Territory - 200 acres',
      status: 'Elite Warrior',
      battleWins: 67,
      experience: 35600
    },
    {
      id: 4,
      name: 'Storm the Eagle',
      species: 'Golden Eagle',
      rarity: 'Mythic',
      level: 38,
      power: 2200,
      health: 6500,
      location: 'Sky Haven Sanctuary - Colorado',
      earnings: 3140.85,
      rescueDate: '2023-09-03',
      owner: '0x3f5e...7b2c',
      price: 0.95,
      abilities: ['Sky Dominance', 'Lightning Strike', 'Eagle Eye'],
      habitat: 'Mountain Peak Aviary - 25 acres',
      status: 'Sky Guardian',
      battleWins: 19,
      experience: 12800
    },
    {
      id: 5,
      name: 'Neptune the Dolphin',
      species: 'Bottlenose Dolphin',
      rarity: 'Epic',
      level: 44,
      power: 2600,
      health: 7800,
      location: 'Ocean Freedom Center - Australia',
      earnings: 5420.60,
      rescueDate: '2023-07-18',
      owner: '0x9c4d...1a5f',
      price: 1.45,
      abilities: ['Sonic Wave', 'Ocean Master', 'Healing Waters'],
      habitat: 'Natural Ocean Lagoon - 75 acres',
      status: 'Ocean Champion',
      battleWins: 34,
      experience: 18900
    },
    {
      id: 6,
      name: 'Blaze the Tiger',
      species: 'Siberian Tiger',
      rarity: 'Legendary',
      level: 56,
      power: 3800,
      health: 10500,
      location: 'Tiger Paradise - Russia',
      earnings: 7680.30,
      rescueDate: '2023-05-12',
      owner: '0x2e8f...9d4a',
      price: 1.85,
      abilities: ['Tiger Fury', 'Stealth Hunter', 'Fire Spirit'],
      habitat: 'Siberian Forest Territory - 150 acres',
      status: 'Apex Predator',
      battleWins: 52,
      experience: 28700
    }
  ])

  const [communityStats, setCommunityStats] = useState({
    totalNFTs: 0,
    totalEarnings: 0,
    animalsRescued: 0,
    totalBattles: 0,
    activePlayers: 15400,
    sanctuaries: 47
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('All')

  // Update community stats
  useEffect(() => {
    const stats = animalNFTs.reduce((acc, nft) => ({
      totalNFTs: acc.totalNFTs + 1,
      totalEarnings: acc.totalEarnings + nft.earnings,
      animalsRescued: acc.animalsRescued + 1,
      totalBattles: acc.totalBattles + nft.battleWins
    }), { totalNFTs: 0, totalEarnings: 0, animalsRescued: 0, totalBattles: 0 })

    setCommunityStats(prev => ({ ...prev, ...stats }))
  }, [animalNFTs])

  // Real-time updates simulation
  useEffect(() => {
    const updateEarnings = () => {
      setAnimalNFTs(prev => prev.map(nft => ({
        ...nft,
        earnings: nft.earnings + (Math.random() * 5),
        experience: nft.experience + Math.floor(Math.random() * 50)
      })))
    }

    const interval = setInterval(updateEarnings, 8000)
    return () => clearInterval(interval)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'bg-gradient-to-r from-purple-600 to-pink-600'
      case 'Legendary': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'Epic': return 'bg-gradient-to-r from-blue-500 to-purple-500'
      case 'Rare': return 'bg-gradient-to-r from-green-500 to-blue-500'
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  const battleAnimal = (animalId: number) => {
    const animal = animalNFTs.find(nft => nft.id === animalId)
    if (animal) {
      const earnedGaia = Math.floor(Math.random() * 100) + 50
      setAnimalNFTs(prev => prev.map(nft => 
        nft.id === animalId 
          ? { 
              ...nft, 
              battleWins: nft.battleWins + 1,
              earnings: nft.earnings + earnedGaia,
              experience: nft.experience + 250
            }
          : nft
      ))

      toast.success(`⚔️ ${animal.name} Won the Battle!`, {
        description: `Earned ${earnedGaia} GAIA tokens! +250 XP gained!`,
        duration: 5000
      })
    }
  }

  const visitHabitat = (animalId: number) => {
    const animal = animalNFTs.find(nft => nft.id === animalId)
    if (animal) {
      toast.success(`🏠 Visiting ${animal.name}'s Habitat!`, {
        description: `Welcome to ${animal.habitat} - ${animal.location}`,
        duration: 4000
      })
    }
  }

  const filteredNFTs = animalNFTs.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === 'All' || nft.rarity === selectedRarity
    return matchesSearch && matchesRarity
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Community Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 ANIMAL NFT GAMING COMMUNITY
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            🎮 Battle • Earn • Rescue • Build Sanctuaries for Every Animal
          </p>
          <p className="text-sm text-green-400 mt-2">
            🐾 Every NFT = Real Animal Rescued | Every Battle = More Freedom
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/40 to-emerald-900/40">
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{communityStats.totalNFTs}</div>
              <div className="text-xs text-muted-foreground">Animals Rescued</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/40 to-orange-900/40">
            <CardContent className="pt-4 text-center">
              <Coins className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{communityStats.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">GAIA Earned</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/40 to-pink-900/40">
            <CardContent className="pt-4 text-center">
              <Sword className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{communityStats.totalBattles}</div>
              <div className="text-xs text-muted-foreground">Total Battles</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-cyan-900/40">
            <CardContent className="pt-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{communityStats.activePlayers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-pink-900/40">
            <CardContent className="pt-4 text-center">
              <Home className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{communityStats.sanctuaries}</div>
              <div className="text-xs text-muted-foreground">Sanctuaries Built</div>
            </CardContent>
          </Card>

          <Card className="border-pink-500/30 bg-gradient-to-br from-pink-900/40 to-rose-900/40">
            <CardContent className="pt-4 text-center">
              <Globe className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">50+</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-cyan-500/20 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <Input
                placeholder="Search animals by name or species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-64"
              />
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-md"
              >
                <option value="All">All Rarities</option>
                <option value="Mythic">Mythic</option>
                <option value="Legendary">Legendary</option>
                <option value="Epic">Epic</option>
                <option value="Rare">Rare</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Animal NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNFTs.map((nft) => (
            <Card key={nft.id} className="border-2 border-border/50 hover:border-green-500/50 transition-all duration-300 bg-gradient-to-br from-gray-900/50 to-black/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold">{nft.name}</CardTitle>
                  <Badge className={`${getRarityColor(nft.rarity)} text-white font-bold`}>
                    {nft.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{nft.species}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Animal Avatar Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg flex items-center justify-center border border-green-500/20">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-400">Level {nft.level}</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Power: {nft.power}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span>Health: {nft.health}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-gold-400" />
                    <span>Wins: {nft.battleWins}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-purple-400" />
                    <span>XP: {nft.experience}</span>
                  </div>
                </div>

                {/* Location & Habitat */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">{nft.location}</span>
                  </div>
                  <div className="text-xs text-muted-foreground bg-green-900/20 p-2 rounded border border-green-500/20">
                    🏠 <strong>Habitat:</strong> {nft.habitat}
                  </div>
                </div>

                {/* Earnings */}
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-400" />
                      <span className="text-sm">GAIA Earned:</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-400">
                      {nft.earnings.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Real money helping this animal daily!
                  </div>
                </div>

                {/* Abilities */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-purple-400">Special Abilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {nft.abilities.map((ability, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-purple-900/20 border-purple-500/30">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Status & Price */}
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 text-white">{nft.status}</Badge>
                  <div className="text-lg font-bold text-green-400">{nft.price} ETH</div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => battleAnimal(nft.id)}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Sword className="h-4 w-4 mr-1" />
                    Battle
                  </Button>
                  <Button 
                    onClick={() => visitHabitat(nft.id)}
                    variant="outline"
                    className="border-green-500/50 hover:bg-green-500/10"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
                </div>

                {/* Owner Info */}
                <div className="text-xs text-muted-foreground border-t border-border/20 pt-2">
                  <div>Owner: {nft.owner}</div>
                  <div>Rescued: {nft.rescueDate}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 BREAKING THE CAGE WORLD TOGETHER</h3>
            <p className="text-muted-foreground mb-4">
              Every NFT battle, every token earned, every habitat built - it all goes toward freeing real animals from cages and creating paradise sanctuaries. 
              We're not just playing games - we're revolutionizing animal welfare through blockchain gaming.
            </p>
            <p className="text-sm text-green-400 font-bold">
              🎵 "Seeds Will Form Into Music" - Every battle creates harmony for all living beings! 🎵
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalNFTCommunity
