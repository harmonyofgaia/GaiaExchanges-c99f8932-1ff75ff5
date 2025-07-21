import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Trophy, 
  Star,
  Zap,
  Shield,
  Heart,
  Sword,
  Gem,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Crown,
  Sparkles,
  Globe,
  TreePine,
  Droplets,
  Wind,
  Flame
} from 'lucide-react';

interface GameCard {
  id: string;
  name: string;
  element: 'earth' | 'water' | 'air' | 'fire';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  attack: number;
  defense: number;
  energy: number;
  ability: string;
  description: string;
  image: string;
  owned: boolean;
  quantity?: number;
  level?: number;
}

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  maxParticipants: number;
  prize: string;
  entryFee: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface PlayerStats {
  rank: number;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  ecoPoints: number;
  cardsCollected: number;
  totalCards: number;
  favoriteElement: string;
}

const NFTCardGame = () => {
  const [playerStats] = useState<PlayerStats>({
    rank: 247,
    totalGames: 156,
    wins: 98,
    losses: 58,
    winRate: 62.8,
    ecoPoints: 3567,
    cardsCollected: 87,
    totalCards: 250,
    favoriteElement: 'earth'
  });

  const [playerCards] = useState<GameCard[]>([
    {
      id: 'card-001',
      name: 'Ancient Forest Guardian',
      element: 'earth',
      rarity: 'legendary',
      attack: 85,
      defense: 120,
      energy: 8,
      ability: 'Forest Regeneration',
      description: 'Heals all earth allies and creates protective barriers',
      image: '🌳',
      owned: true,
      quantity: 1,
      level: 3
    },
    {
      id: 'card-002',
      name: 'Ocean Tide Caller',
      element: 'water',
      rarity: 'epic',
      attack: 70,
      defense: 90,
      energy: 6,
      ability: 'Tsunami Wave',
      description: 'Massive water attack that affects all enemies',
      image: '🌊',
      owned: true,
      quantity: 2,
      level: 2
    },
    {
      id: 'card-003',
      name: 'Solar Wind Spirit',
      element: 'air',
      rarity: 'rare',
      attack: 60,
      defense: 45,
      energy: 4,
      ability: 'Speed Boost',
      description: 'Increases all air allies attack speed by 50%',
      image: '💨',
      owned: true,
      quantity: 3,
      level: 1
    }
  ]);

  const [availableCards] = useState<GameCard[]>([
    {
      id: 'card-101',
      name: 'Volcanic Eruption Dragon',
      element: 'fire',
      rarity: 'mythic',
      attack: 150,
      defense: 100,
      energy: 12,
      ability: 'Apocalyptic Burn',
      description: 'Unleashes devastating fire damage across the battlefield',
      image: '🔥',
      owned: false
    },
    {
      id: 'card-102',
      name: 'Crystal Cave Dweller',
      element: 'earth',
      rarity: 'epic',
      attack: 75,
      defense: 110,
      energy: 7,
      ability: 'Crystal Armor',
      description: 'Grants immunity to next 2 attacks',
      image: '💎',
      owned: false
    }
  ]);

  const [tournaments] = useState<Tournament[]>([
    {
      id: 'tour-001',
      name: 'Earth Day Championship',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      status: 'active',
      participants: 1247,
      maxParticipants: 2000,
      prize: '10,000 GAIA + Legendary Card',
      entryFee: 50,
      difficulty: 'advanced'
    },
    {
      id: 'tour-002',
      name: 'Ocean Conservation Cup',
      startDate: '2024-02-25',
      endDate: '2024-02-28',
      status: 'upcoming',
      participants: 0,
      maxParticipants: 1500,
      prize: '5,000 GAIA + Epic Card Pack',
      entryFee: 25,
      difficulty: 'intermediate'
    },
    {
      id: 'tour-003',
      name: 'Renewable Energy Masters',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'completed',
      participants: 856,
      maxParticipants: 1000,
      prize: '15,000 GAIA + Mythic Card',
      entryFee: 100,
      difficulty: 'expert'
    }
  ]);

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'earth': return TreePine;
      case 'water': return Droplets;
      case 'air': return Wind;
      case 'fire': return Flame;
      default: return Sparkles;
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'earth': return 'text-green-600 bg-green-100 border-green-300';
      case 'water': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'air': return 'text-cyan-600 bg-cyan-100 border-cyan-300';
      case 'fire': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300';
      case 'epic': return 'text-purple-600 border-purple-300';
      case 'legendary': return 'text-orange-600 border-orange-300';
      case 'mythic': return 'text-pink-600 border-pink-300';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-orange-600';
      case 'expert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            🎮 Environmental NFT Card Game
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Strategic card battles with environmental education. Collect, trade, and battle with cards representing 
            ecosystems, species, and conservation efforts.
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-indigo-600 text-white px-4 py-2">
              Rank #{playerStats.rank}
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              {playerStats.ecoPoints} Eco Points
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="battle">Battle Arena</TabsTrigger>
            <TabsTrigger value="stats">Player Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            {/* Collection Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Gem className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">{playerStats.cardsCollected}</div>
                      <div className="text-sm text-muted-foreground">Cards Collected</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{playerStats.wins}</div>
                      <div className="text-sm text-muted-foreground">Battles Won</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">{playerStats.winRate}%</div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/10 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">#{playerStats.rank}</div>
                      <div className="text-sm text-muted-foreground">Global Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Collection Progress */}
            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Collection Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Collection</span>
                    <span>{playerStats.cardsCollected} / {playerStats.totalCards}</span>
                  </div>
                  <Progress value={(playerStats.cardsCollected / playerStats.totalCards) * 100} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">34%</div>
                    <div className="text-sm text-muted-foreground">Earth Cards</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">28%</div>
                    <div className="text-sm text-muted-foreground">Water Cards</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-cyan-600">22%</div>
                    <div className="text-sm text-muted-foreground">Air Cards</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">16%</div>
                    <div className="text-sm text-muted-foreground">Fire Cards</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playerCards.map((card) => {
                const ElementIcon = getElementIcon(card.element);
                return (
                  <Card 
                    key={card.id} 
                    className={`${getRarityColor(card.rarity)} border-2 transform hover:scale-105 transition-transform`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={getElementColor(card.element)}>
                          <ElementIcon className="h-3 w-3 mr-1" />
                          {card.element}
                        </Badge>
                        <Badge variant="outline" className={getRarityColor(card.rarity)}>
                          {card.rarity}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{card.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Card Image */}
                      <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                        {card.image}
                      </div>

                      {/* Card Stats */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <Sword className="h-4 w-4 mx-auto text-red-600" />
                          <div className="font-bold">{card.attack}</div>
                          <div className="text-xs text-muted-foreground">ATK</div>
                        </div>
                        <div className="text-center">
                          <Shield className="h-4 w-4 mx-auto text-blue-600" />
                          <div className="font-bold">{card.defense}</div>
                          <div className="text-xs text-muted-foreground">DEF</div>
                        </div>
                        <div className="text-center">
                          <Zap className="h-4 w-4 mx-auto text-yellow-600" />
                          <div className="font-bold">{card.energy}</div>
                          <div className="text-xs text-muted-foreground">ENR</div>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-purple-600">{card.ability}</div>
                        <div className="text-xs text-muted-foreground">{card.description}</div>
                      </div>

                      {/* Card Level & Quantity */}
                      {card.owned && (
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="text-sm">
                            Level {card.level}
                          </div>
                          <div className="text-sm">
                            x{card.quantity}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Upgrade
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Trade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <Card className="border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-600">Card Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCards.map((card) => {
                    const ElementIcon = getElementIcon(card.element);
                    return (
                      <Card 
                        key={card.id} 
                        className={`${getRarityColor(card.rarity)} border-2`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Badge className={getElementColor(card.element)}>
                              <ElementIcon className="h-3 w-3 mr-1" />
                              {card.element}
                            </Badge>
                            <Badge variant="outline" className={getRarityColor(card.rarity)}>
                              {card.rarity}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                            {card.image}
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <Sword className="h-4 w-4 mx-auto text-red-600" />
                              <div className="font-bold">{card.attack}</div>
                            </div>
                            <div className="text-center">
                              <Shield className="h-4 w-4 mx-auto text-blue-600" />
                              <div className="font-bold">{card.defense}</div>
                            </div>
                            <div className="text-center">
                              <Zap className="h-4 w-4 mx-auto text-yellow-600" />
                              <div className="font-bold">{card.energy}</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm font-medium text-purple-600">{card.ability}</div>
                            <div className="text-xs text-muted-foreground">{card.description}</div>
                          </div>

                          <div className="text-center pt-2 border-t">
                            <div className="text-lg font-bold text-green-600">2,500 GAIA</div>
                            <Button className="w-full mt-2">
                              Purchase Card
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="space-y-4">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{tournament.name}</h3>
                        <p className="text-muted-foreground">
                          {tournament.startDate} - {tournament.endDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(tournament.status)} text-white`}>
                          {tournament.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <Users className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                        <div className="font-bold">{tournament.participants}</div>
                        <div className="text-sm text-muted-foreground">Participants</div>
                      </div>
                      <div className="text-center">
                        <Trophy className="h-5 w-5 mx-auto text-yellow-600 mb-1" />
                        <div className="font-bold">{tournament.prize}</div>
                        <div className="text-sm text-muted-foreground">Prize</div>
                      </div>
                      <div className="text-center">
                        <Gem className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                        <div className="font-bold">{tournament.entryFee} GAIA</div>
                        <div className="text-sm text-muted-foreground">Entry Fee</div>
                      </div>
                      <div className="text-center">
                        <Target className="h-5 w-5 mx-auto text-red-600 mb-1" />
                        <div className={`font-bold ${getDifficultyColor(tournament.difficulty)}`}>
                          {tournament.difficulty}
                        </div>
                        <div className="text-sm text-muted-foreground">Difficulty</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Spots: {tournament.participants} / {tournament.maxParticipants}
                        </div>
                        <Progress 
                          value={(tournament.participants / tournament.maxParticipants) * 100} 
                          className="h-2 w-48" 
                        />
                      </div>
                      <Button 
                        disabled={tournament.status === 'completed' || tournament.participants >= tournament.maxParticipants}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600"
                      >
                        {tournament.status === 'upcoming' ? 'Register' : 
                         tournament.status === 'active' ? 'Join Now' : 'View Results'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="battle" className="space-y-6">
            <Card className="border-red-500/30 bg-red-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Sword className="h-5 w-5" />
                  Battle Arena
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">⚔️</div>
                  <h3 className="text-2xl font-bold">Ready for Battle?</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Test your strategic skills against other players in real-time card battles. 
                    Earn rewards and climb the leaderboards!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-600">Ranked Battle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Compete against players of similar skill level. Win to gain rank points and unlock exclusive rewards.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                        Find Ranked Match
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-600">Casual Battle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practice your strategies in a relaxed environment. Perfect for testing new deck combinations.
                      </p>
                      <Button variant="outline" className="w-full border-blue-500 text-blue-600">
                        Start Casual Game
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-600">Daily Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Win 3 battles using only Earth cards</div>
                          <div className="text-sm text-muted-foreground">Progress: 1/3</div>
                        </div>
                        <Badge variant="outline">500 XP</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Deal 1000 total damage in battles</div>
                          <div className="text-sm text-muted-foreground">Progress: 750/1000</div>
                        </div>
                        <Badge variant="outline">300 GAIA</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-cyan-500/30 bg-cyan-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-600">Battle Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{playerStats.wins}</div>
                      <div className="text-sm text-muted-foreground">Total Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{playerStats.losses}</div>
                      <div className="text-sm text-muted-foreground">Total Losses</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Win Rate</span>
                      <span>{playerStats.winRate}%</span>
                    </div>
                    <Progress value={playerStats.winRate} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{playerStats.totalGames}</div>
                      <div className="text-sm text-muted-foreground">Total Games Played</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-600">Achievements & Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                    <div>
                      <div className="font-medium">Tournament Champion</div>
                      <div className="text-sm text-muted-foreground">Won first place in Earth Day Championship</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Crown className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="font-medium">Legendary Collector</div>
                      <div className="text-sm text-muted-foreground">Obtained 10 legendary cards</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Star className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Eco Warrior</div>
                      <div className="text-sm text-muted-foreground">Completed 100 environmental challenges</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Element Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <TreePine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <div className="font-bold text-green-600">Expert</div>
                    <div className="text-sm text-muted-foreground">Earth Element</div>
                    <Progress value={85} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Droplets className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <div className="font-bold text-blue-600">Advanced</div>
                    <div className="text-sm text-muted-foreground">Water Element</div>
                    <Progress value={72} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Wind className="h-8 w-8 mx-auto text-cyan-600 mb-2" />
                    <div className="font-bold text-cyan-600">Intermediate</div>
                    <div className="text-sm text-muted-foreground">Air Element</div>
                    <Progress value={58} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Flame className="h-8 w-8 mx-auto text-red-600 mb-2" />
                    <div className="font-bold text-red-600">Beginner</div>
                    <div className="text-sm text-muted-foreground">Fire Element</div>
                    <Progress value={34} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NFTCardGame;