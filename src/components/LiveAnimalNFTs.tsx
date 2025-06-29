
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ShoppingCart, 
  Heart, 
  Fish, 
  TreePine,
  Waves,
  Mountain,
  Flame,
  Shield,
  Star,
  Crown,
  Zap,
  Globe,
  MapPin,
  Camera,
  Home,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { gaiaTokenService } from '@/services/gaiaTokenService'

interface AnimalNFT {
  id: string
  name: string
  species: string
  emoji: string
  price: number
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  conservationImpact: string
  tokensForConservation: number
  healthStatus: number
  location: string
  liveFeed: boolean
  currentHabitat: string
  needsRelocation: boolean
  targetAmount: number
  raisedAmount: number
  ownedBy?: string
  virtualExploration: boolean
}

export function LiveAnimalNFTs() {
  const [availableNFTs] = useState<AnimalNFT[]>([
    {
      id: '1',
      name: 'Azure Ocean Guardian',
      species: 'Blue Whale',
      emoji: '🐋',
      price: 850,
      rarity: 'Mythical',
      conservationImpact: 'Protects 10,000 sq km of ocean',
      tokensForConservation: 200,
      healthStatus: 95,
      location: 'Pacific Ocean Sanctuary',
      liveFeed: true,
      currentHabitat: 'Deep Ocean Trench',
      needsRelocation: false,
      targetAmount: 1000,
      raisedAmount: 850,
      virtualExploration: true
    },
    {
      id: '2',
      name: 'Rainbow Wing Protector',
      species: 'Monarch Butterfly',
      emoji: '🦋',
      price: 250,
      rarity: 'Rare',
      conservationImpact: 'Saves 500 butterfly habitats',
      tokensForConservation: 50,
      healthStatus: 88,
      location: 'Mexican Mountain Reserve',
      liveFeed: true,
      currentHabitat: 'Polluted Valley',
      needsRelocation: true,
      targetAmount: 400,
      raisedAmount: 180,
      virtualExploration: true
    },
    {
      id: '3',
      name: 'Sky Sovereign',
      species: 'Golden Eagle',
      emoji: '🦅',
      price: 450,
      rarity: 'Epic',
      conservationImpact: 'Preserves 2,500 acres of sky habitat',
      tokensForConservation: 85,
      healthStatus: 92,
      location: 'Rocky Mountain Heights',
      liveFeed: true,
      currentHabitat: 'Mountain Peak',
      needsRelocation: false,
      targetAmount: 600,
      raisedAmount: 450,
      virtualExploration: true
    },
    {
      id: '4',
      name: 'Jungle Heart',
      species: 'Siberian Tiger',
      emoji: '🐅',
      price: 750,
      rarity: 'Legendary',
      conservationImpact: 'Protects 5,000 acres of jungle',
      tokensForConservation: 150,
      healthStatus: 90,
      location: 'Siberian Wildlife Reserve',
      liveFeed: true,
      currentHabitat: 'Deforested Area',
      needsRelocation: true,
      targetAmount: 1200,
      raisedAmount: 350,
      virtualExploration: true
    },
    {
      id: '5',
      name: 'Ancient Forest Keeper',
      species: 'Giant Panda',
      emoji: '🐼',
      price: 650,
      rarity: 'Epic',
      conservationImpact: 'Saves 1,000 bamboo forests',
      tokensForConservation: 120,
      healthStatus: 87,
      location: 'Chinese Bamboo Mountains',
      liveFeed: true,
      currentHabitat: 'Bamboo Grove',
      needsRelocation: false,
      targetAmount: 800,
      raisedAmount: 650,
      virtualExploration: true
    },
    {
      id: '6',
      name: 'Desert Wanderer',
      species: 'Arabian Oryx',
      emoji: '🦌',
      price: 400,
      rarity: 'Rare',
      conservationImpact: 'Preserves 3,000 acres of desert',
      tokensForConservation: 75,
      healthStatus: 94,
      location: 'Arabian Desert Reserve',
      liveFeed: true,
      currentHabitat: 'Desert Oasis',
      needsRelocation: false,
      targetAmount: 500,
      raisedAmount: 400,
      virtualExploration: true
    }
  ])

  const [myNFTs, setMyNFTs] = useState<AnimalNFT[]>([])
  const [totalConservationImpact, setTotalConservationImpact] = useState(0)
  const [liveFeeds, setLiveFeeds] = useState<{[key: string]: string}>({})
  const [exploreMode, setExploreMode] = useState<string | null>(null)

  useEffect(() => {
    // Simulate live feed updates
    const interval = setInterval(() => {
      const feedMessages = [
        'Feeding time - enjoying fresh food',
        'Playing with companions',
        'Resting in natural habitat',
        'Exploring new territory',
        'Healthy and active',
        'Interacting with researchers',
        'Enjoying environmental enrichment',
        'Searching for better habitat',
        'Receiving medical care',
        'Teaching young ones'
      ]
      
      const newFeeds: {[key: string]: string} = {}
      availableNFTs.forEach(nft => {
        if (nft.liveFeed) {
          newFeeds[nft.id] = feedMessages[Math.floor(Math.random() * feedMessages.length)]
        }
      })
      setLiveFeeds(newFeeds)
    }, 5000)

    return () => clearInterval(interval)
  }, [availableNFTs])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythical': return 'from-purple-600 to-pink-600'
      case 'Legendary': return 'from-yellow-600 to-orange-600'
      case 'Epic': return 'from-blue-600 to-cyan-600'
      case 'Rare': return 'from-green-600 to-emerald-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const purchaseAnimalNFT = async (nft: AnimalNFT) => {
    try {
      // Burn tokens for conservation
      const burnSuccess = await gaiaTokenService.burnTokens(nft.tokensForConservation, `Conservation for ${nft.name}`)
      
      if (burnSuccess) {
        setMyNFTs(prev => [...prev, nft])
        setTotalConservationImpact(prev => prev + nft.tokensForConservation)
        
        toast.success(`🦋 ${nft.name} Adopted!`, {
          description: `${nft.conservationImpact} | ${nft.tokensForConservation} GAiA tokens burned for conservation!`,
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Adoption failed - please try again')
    }
  }

  const exploreHabitat = (nft: AnimalNFT) => {
    setExploreMode(nft.id)
    toast.success(`🌍 Virtual Habitat Exploration Started!`, {
      description: `Exploring ${nft.currentHabitat} with ${nft.name}`,
      duration: 3000
    })
  }

  const fundRelocation = async (nft: AnimalNFT) => {
    const donationAmount = 50
    try {
      const burnSuccess = await gaiaTokenService.burnTokens(donationAmount, `Relocation fund for ${nft.name}`)
      
      if (burnSuccess) {
        toast.success(`💚 Relocation Fund Donation!`, {
          description: `${donationAmount} GAiA tokens burned to help ${nft.name} find a better home!`,
          duration: 4000
        })
      }
    } catch (error) {
      toast.error('Donation failed - please try again')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-pink-400 flex items-center gap-2">
            <Fish className="h-6 w-6" />
            🦋 Live Animal NFT Sanctuary - Real Conservation Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{myNFTs.length}</div>
              <div className="text-sm text-muted-foreground">Animals Adopted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalConservationImpact}</div>
              <div className="text-sm text-muted-foreground">GAiA Burned for Conservation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{availableNFTs.length}</div>
              <div className="text-sm text-muted-foreground">Animals Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-muted-foreground">Live Feed Coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Animal NFTs */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">🌍 Available Animal NFTs - Real Wildlife Conservation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableNFTs.map((nft) => (
              <Card 
                key={nft.id}
                className={`bg-gradient-to-br ${getRarityColor(nft.rarity)}/20 border-2 hover:scale-105 transition-all duration-300 ${
                  exploreMode === nft.id ? 'ring-4 ring-cyan-400 animate-pulse' : ''
                }`}
              >
                <CardContent className="p-4 space-y-4">
                  {/* Animal Display */}
                  <div className="relative h-32 bg-gradient-to-br from-black/30 to-gray-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-6xl animate-pulse">{nft.emoji}</div>
                    <div className="absolute top-2 left-2">
                      <Badge className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
                        {nft.rarity}
                      </Badge>
                    </div>
                    {nft.liveFeed && (
                      <div className="absolute top-2 right-2">
                        <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                      </div>
                    )}
                    {nft.needsRelocation && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-orange-600 text-white text-xs">
                          <Home className="h-2 w-2 mr-1" />
                          Needs New Home
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Animal Info */}
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground">{nft.species}</p>
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <MapPin className="h-3 w-3" />
                      {nft.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <TreePine className="h-3 w-3" />
                      Current: {nft.currentHabitat}
                    </div>
                  </div>

                  {/* Health Status */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Status:</span>
                      <span className="text-green-400 font-bold">{nft.healthStatus}%</span>
                    </div>
                    <Progress value={nft.healthStatus} className="h-2" />
                  </div>

                  {/* Relocation Progress */}
                  {nft.needsRelocation && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Relocation Fund:</span>
                        <span className="text-yellow-400 font-bold">
                          {nft.raisedAmount}/{nft.targetAmount} GAiA
                        </span>
                      </div>
                      <Progress value={(nft.raisedAmount / nft.targetAmount) * 100} className="h-2" />
                      <Button
                        onClick={() => fundRelocation(nft)}
                        size="sm"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Fund Relocation (50 GAiA)
                      </Button>
                    </div>
                  )}

                  {/* Live Feed */}
                  {liveFeeds[nft.id] && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                      <div className="text-xs text-blue-400 font-bold mb-1">📡 Live Update:</div>
                      <div className="text-xs text-muted-foreground">{liveFeeds[nft.id]}</div>
                    </div>
                  )}

                  {/* Conservation Impact */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-green-400">Conservation Impact:</div>
                    <p className="text-xs text-muted-foreground">{nft.conservationImpact}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">GAiA for Conservation:</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-400" />
                        <span className="text-orange-400 font-bold">{nft.tokensForConservation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Virtual Exploration */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => exploreHabitat(nft)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Camera className="h-3 w-3 mr-1" />
                      Explore Habitat
                    </Button>
                    <Button
                      onClick={() => setExploreMode(null)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      View World
                    </Button>
                  </div>

                  {/* Price and Purchase */}
                  <div className="space-y-3 pt-2 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{nft.price} GAiA</div>
                      <div className="text-xs text-muted-foreground">Adoption Price</div>
                    </div>
                    <Button 
                      onClick={() => purchaseAnimalNFT(nft)}
                      className={`w-full bg-gradient-to-r ${getRarityColor(nft.rarity)} hover:opacity-90`}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Adopt & Support Conservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Animal NFTs */}
      {myNFTs.length > 0 && (
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🏠 My Animal Sanctuary - Adopted NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myNFTs.map((nft, index) => (
                <Card key={`owned-${index}`} className="border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{nft.emoji}</div>
                    <h4 className="font-bold text-green-400">{nft.name}</h4>
                    <p className="text-sm text-muted-foreground">{nft.species}</p>
                    <Badge className="mt-2 bg-green-600">Helping Conservation</Badge>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Camera className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Care
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* GAiA Token Integration */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            🚀 Powered by GAiA Token Conservation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-sm text-green-400">
              <strong>Contract:</strong> <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
            <div className="text-sm text-blue-400">
              <strong>Wallet:</strong> <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">{GAIA_TOKEN.WALLET_ADDRESS}</code>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Every Animal NFT purchase burns GAiA tokens directly for real wildlife conservation projects.
              Connect with real animals and make a genuine environmental impact!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
