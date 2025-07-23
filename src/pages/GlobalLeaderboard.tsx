/**
 * Global Leaderboard Page
 * Comprehensive leaderboard system for all eco-activities and contributions
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Leaf, 
  Coins, 
  Users, 
  Target, 
  Star,
  Medal,
  Crown,
  Award,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';

const GlobalLeaderboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('overall');

  const leaderboardCategories = [
    { id: 'overall', name: 'Overall Impact', icon: Trophy },
    { id: 'eco', name: 'Eco Actions', icon: Leaf },
    { id: 'nft', name: 'NFT Collection', icon: Star },
    { id: 'missions', name: 'Missions', icon: Target },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'games', name: 'Gaming', icon: Zap }
  ];

  const topContributors = [
    {
      rank: 1,
      username: "EcoWarrior2024",
      avatar: "/api/placeholder/40/40",
      points: 15420,
      ecoScore: 98,
      badges: ["🌱 Tree Planter", "🐋 Ocean Saver", "👑 Eco Champion"],
      level: 47,
      country: "🇳🇴 Norway"
    },
    {
      rank: 2,
      username: "GreenHero",
      avatar: "/api/placeholder/40/40",
      points: 14850,
      ecoScore: 96,
      badges: ["🌊 Water Guardian", "🔋 Energy Saver", "🦋 Biodiversity"],
      level: 45,
      country: "🇨🇦 Canada"
    },
    {
      rank: 3,
      username: "NatureDefender",
      avatar: "/api/placeholder/40/40",
      points: 14200,
      ecoScore: 94,
      badges: ["🌳 Forest Protector", "♻️ Recycling Master", "🌟 Impact Leader"],
      level: 43,
      country: "🇩🇰 Denmark"
    },
    {
      rank: 4,
      username: "PlanetSaver",
      avatar: "/api/placeholder/40/40",
      points: 13750,
      ecoScore: 92,
      badges: ["🌍 Global Impact", "🌱 Carbon Negative", "🏆 Achievement"],
      level: 41,
      country: "🇸🇪 Sweden"
    },
    {
      rank: 5,
      username: "EcoInnovator",
      avatar: "/api/placeholder/40/40",
      points: 13500,
      ecoScore: 90,
      badges: ["💡 Innovation", "🔬 Research", "🚀 Tech Pioneer"],
      level: 40,
      country: "🇫🇮 Finland"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const stats = {
    totalContributors: 15674,
    totalImpact: "2.4M",
    treesPlanted: "875K",
    carbonSaved: "1.2M kg"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Global Eco Leaderboard
            </h1>
            <Globe className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating our planet's heroes and their environmental impact contributions
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalContributors.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalImpact}</p>
                  <p className="text-sm text-muted-foreground">Total Impact Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.treesPlanted}</p>
                  <p className="text-sm text-muted-foreground">Trees Planted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.carbonSaved}</p>
                  <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            {leaderboardCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {leaderboardCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5" />
                    <span>{category.name} Leaderboard</span>
                  </CardTitle>
                  <CardDescription>
                    Top contributors in {category.name.toLowerCase()} activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor) => (
                      <div
                        key={contributor.username}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                          contributor.rank <= 3 
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(contributor.rank)}
                          </div>
                          
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={contributor.avatar} />
                            <AvatarFallback>{contributor.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold">{contributor.username}</p>
                              <Badge variant="outline" className="text-xs">
                                Lv. {contributor.level}
                              </Badge>
                              <span className="text-sm">{contributor.country}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {contributor.badges.slice(0, 3).map((badge, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{contributor.points.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Eco Score:</span>
                            <Progress value={contributor.ecoScore} className="w-20 h-2" />
                            <span className="text-sm font-medium">{contributor.ecoScore}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Global Achievements</span>
            </CardTitle>
            <CardDescription>
              Collective milestones achieved by our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-bold text-2xl text-green-600">1M+</p>
                <p className="text-sm text-muted-foreground">Trees Planted</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="font-bold text-2xl text-blue-600">195</p>
                <p className="text-sm text-muted-foreground">Countries Participating</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="font-bold text-2xl text-purple-600">50M+</p>
                <p className="text-sm text-muted-foreground">Green Actions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;