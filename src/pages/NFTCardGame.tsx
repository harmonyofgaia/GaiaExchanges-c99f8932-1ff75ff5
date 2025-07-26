
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Crown, Star, Zap, Target, Users } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { NFTCard, parseJsonField } from '@/types/ui-types'
import { supabase } from '@/integrations/supabase/client'

interface GameStats {
  totalCards: number
  battlesWon: number
  tokensEarned: number
  collectionValue: number
}

interface BattleResult {
  id: string
  opponent: string
  result: 'won' | 'lost' | 'draw'
  cardsUsed: string[]
  tokensWon: number
}

export default function NFTCardGame() {
  const [playerCards, setPlayerCards] = useState<NFTCard[]>([])
  const [gameStats, setGameStats] = useState<GameStats>({
    totalCards: 0,
    battlesWon: 0,
    tokensEarned: 0,
    collectionValue: 0
  })
  const [recentBattles, setRecentBattles] = useState<BattleResult[]>([])
  const [selectedCard, setSelectedCard] = useState<NFTCard | null>(null)
  const [loading, setLoading] = useState(true)

  // Define functions before useEffect calls them
  const loadCollection = async () => {
    try {
      const { data, error } = await supabase
        .from('nft_cards')
        .select('*')
        .eq('user_id', 'current-user')
        .order('minted_at', { ascending: false })

      if (error) {
        console.error('Error loading collection:', error)
        return
      }

      const mappedCards: NFTCard[] = data?.map(card => ({
        id: card.id,
        card_name: card.card_name,
        card_type: card.card_type,
        rarity: card.rarity,
        power_level: card.power_level,
        biodiversity_category: card.biodiversity_category,
        user_id: card.user_id,
        minted_at: card.minted_at,
        is_tradeable: card.is_tradeable,
        card_metadata: parseJsonField(card.card_metadata, {
          image_url: '',
          description: '',
          traits: [],
          conservation_info: '',
          abilities: []
        })
      })) || []

      if (mappedCards.length === 0) {
        // Add mock data if no real data available
        const mockCards: NFTCard[] = [
          {
            id: 'card-1',
            card_name: 'Ancient Forest Guardian',
            card_type: 'Creature',
            rarity: 'Legendary',
            power_level: 95,
            biodiversity_category: 'Forest',
            user_id: 'current-user',
            minted_at: new Date().toISOString(),
            is_tradeable: true,
            card_metadata: {
              image_url: '🌲',
              description: 'A powerful guardian of ancient forests',
              traits: [
                { trait_type: 'Element', value: 'Nature' },
                { trait_type: 'Habitat', value: 'Forest' }
              ],
              conservation_info: 'Protects endangered forest ecosystems',
              abilities: ['Forest Regeneration', 'Wildlife Protection']
            }
          },
          {
            id: 'card-2',
            card_name: 'Ocean Spirit',
            card_type: 'Elemental',
            rarity: 'Epic',
            power_level: 78,
            biodiversity_category: 'Marine',
            user_id: 'current-user',
            minted_at: new Date().toISOString(),
            is_tradeable: true,
            card_metadata: {
              image_url: '🌊',
              description: 'Mystical spirit of the deep ocean',
              traits: [
                { trait_type: 'Element', value: 'Water' },
                { trait_type: 'Habitat', value: 'Ocean' }
              ],
              conservation_info: 'Cleanses ocean pollution',
              abilities: ['Tidal Wave', 'Marine Healing']
            }
          }
        ]
        setPlayerCards(mockCards)
      } else {
        setPlayerCards(mappedCards)
      }
    } catch (error) {
      console.error('Error in loadCollection:', error)
    }
  }

  const loadGameStats = async () => {
    try {
      // Mock game stats
      setGameStats({
        totalCards: playerCards.length,
        battlesWon: 23,
        tokensEarned: 1456,
        collectionValue: 5800
      })
    } catch (error) {
      console.error('Error loading game stats:', error)
    }
  }

  const loadRecentBattles = async () => {
    try {
      // Mock battle results
      const mockBattles: BattleResult[] = [
        {
          id: 'battle-1',
          opponent: 'EcoWarrior92',
          result: 'won',
          cardsUsed: ['card-1'],
          tokensWon: 150
        },
        {
          id: 'battle-2',
          opponent: 'NatureMaster',
          result: 'won',
          cardsUsed: ['card-2'],
          tokensWon: 125
        }
      ]
      setRecentBattles(mockBattles)
    } catch (error) {
      console.error('Error loading battles:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await loadCollection()
      await loadGameStats()
      await loadRecentBattles()
      setLoading(false)
    }
    
    loadData()
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'from-yellow-600 to-orange-600'
      case 'epic': return 'from-purple-600 to-pink-600'
      case 'rare': return 'from-blue-600 to-cyan-600'
      case 'common': return 'from-gray-600 to-slate-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const getRarityBorderColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'border-yellow-500/50'
      case 'epic': return 'border-purple-500/50'
      case 'rare': return 'border-blue-500/50'
      case 'common': return 'border-gray-500/50'
      default: return 'border-gray-500/50'
    }
  }

  const startBattle = () => {
    // Mock battle start
    console.log('Starting battle with selected cards')
  }

  const mintNewCard = async () => {
    try {
      const newCard: NFTCard = {
        id: `card-${Date.now()}`,
        card_name: 'New Eco Card',
        card_type: 'Creature',
        rarity: 'Common',
        power_level: Math.floor(Math.random() * 50) + 25,
        biodiversity_category: 'Forest',
        user_id: 'current-user',
        minted_at: new Date().toISOString(),
        is_tradeable: true,
        card_metadata: {
          image_url: '🌱',
          description: 'A newly discovered eco-friendly creature',
          traits: [
            { trait_type: 'Element', value: 'Nature' }
          ],
          conservation_info: 'Helps with ecosystem restoration',
          abilities: ['Growth', 'Healing']
        }
      }

      setPlayerCards(prev => [...prev, newCard])
      setGameStats(prev => ({ ...prev, totalCards: prev.totalCards + 1 }))
    } catch (error) {
      console.error('Error minting card:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl text-green-400">Loading NFT Card Game...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🃏 NFT Card Game
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Battle with eco-themed NFT cards and earn GAiA tokens
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">{gameStats.totalCards}</div>
                  <div className="text-sm text-muted-foreground">Cards Owned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-green-400">{gameStats.battlesWon}</div>
                  <div className="text-sm text-muted-foreground">Battles Won</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">{gameStats.tokensEarned.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">GAiA Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{gameStats.collectionValue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Collection Value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card Collection */}
        <Card className="mb-8 bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6" />
              Your Card Collection
            </CardTitle>
            <Button onClick={mintNewCard} className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Zap className="h-4 w-4 mr-2" />
              Mint New Card
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playerCards.map((card) => (
                <Card 
                  key={card.id} 
                  className={`${getRarityBorderColor(card.rarity)} bg-gradient-to-br ${getRarityColor(card.rarity)}/20 cursor-pointer transition-all duration-300 hover:scale-105 ${selectedCard?.id === card.id ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => setSelectedCard(card)}
                >
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{card.card_metadata.image_url}</div>
                      <h3 className="font-bold text-lg text-white">{card.card_name}</h3>
                      <Badge className={`bg-gradient-to-r ${getRarityColor(card.rarity)} text-white`}>
                        {card.rarity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Power Level</span>
                        <span className="font-bold text-yellow-400">{card.power_level}</span>
                      </div>
                      <Progress value={card.power_level} className="h-1" />
                      
                      <div className="text-xs text-muted-foreground">
                        <p className="mb-2">{card.card_metadata.description}</p>
                        <p className="text-green-400">{card.card_metadata.conservation_info}</p>
                      </div>
                      
                      {card.card_metadata.abilities && (
                        <div className="flex flex-wrap gap-1">
                          {card.card_metadata.abilities.map((ability, index) => (
                            <Badge key={index} className="bg-blue-600 text-xs">
                              {ability}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Battle Section */}
        <Card className="mb-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Target className="h-6 w-6" />
              Battle Arena
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              {selectedCard ? (
                <div>
                  <p className="text-muted-foreground mb-4">
                    Selected: <span className="text-white font-bold">{selectedCard.card_name}</span>
                  </p>
                  <Button onClick={startBattle} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    <Target className="h-4 w-4 mr-2" />
                    Start Battle
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Select a card from your collection to start battling</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Battles */}
        <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-6 w-6" />
              Recent Battles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBattles.map((battle) => (
                <div key={battle.id} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={battle.result === 'won' ? 'bg-green-600' : battle.result === 'lost' ? 'bg-red-600' : 'bg-gray-600'}>
                      {battle.result.toUpperCase()}
                    </Badge>
                    <span className="text-white">vs {battle.opponent}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">+{battle.tokensWon} GAiA</div>
                    <div className="text-xs text-muted-foreground">{battle.cardsUsed.length} cards used</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
