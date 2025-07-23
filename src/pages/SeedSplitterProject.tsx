/**
 * Seed Splitter Project - Enhanced with Cross-Project Synergy
 * Growth/Evolution theme with Clean Water token integration
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sprout, 
  Droplets, 
  Zap, 
  TrendingUp, 
  Gift, 
  ArrowRightLeft,
  TreePine,
  Sun,
  Cloud,
  Leaf
} from 'lucide-react';
import CrossProjectSynergyService from '@/services/CrossProjectSynergyService';
import RoutingRewardSystem from '@/components/RoutingRewardSystem';
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo';

const synergyService = CrossProjectSynergyService.getInstance();

interface SeedPack {
  id: string;
  name: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  price: number;
  cleanWaterTokenPrice?: number;
  germinationRate: number;
  growthTime: number;
  environmentalImpact: {
    co2Absorption: number;
    soilImprovement: number;
    biodiversityBonus: number;
  };
}

export default function SeedSplitterProject() {
  const [userSeeds, setUserSeeds] = useState(0);
  const [cleanWaterTokens, setCleanWaterTokens] = useState(127); // Mock Clean Water tokens
  const [currentGrowthLevel, setCurrentGrowthLevel] = useState(7);
  const [growthProgress, setGrowthProgress] = useState(65);
  const [activePlants, setActivePlants] = useState(23);
  
  const [availableSeedPacks] = useState<SeedPack[]>([
    {
      id: 'harmony-flowers',
      name: 'Harmony Flower Seeds',
      type: 'Wildflower',
      rarity: 'Common',
      price: 50,
      cleanWaterTokenPrice: 40, // 20% discount with Clean Water tokens
      germinationRate: 85,
      growthTime: 14,
      environmentalImpact: {
        co2Absorption: 5,
        soilImprovement: 3,
        biodiversityBonus: 7
      }
    },
    {
      id: 'purification-trees',
      name: 'Air Purification Tree Saplings',
      type: 'Tree',
      rarity: 'Rare',
      price: 200,
      cleanWaterTokenPrice: 160, // Clean Water expertise enhances tree growth
      germinationRate: 75,
      growthTime: 90,
      environmentalImpact: {
        co2Absorption: 25,
        soilImprovement: 15,
        biodiversityBonus: 20
      }
    },
    {
      id: 'healing-herbs',
      name: 'Medicinal Healing Herbs',
      type: 'Herb',
      rarity: 'Epic',
      price: 350,
      cleanWaterTokenPrice: 245, // 30% discount for water purification knowledge
      germinationRate: 90,
      growthTime: 30,
      environmentalImpact: {
        co2Absorption: 8,
        soilImprovement: 12,
        biodiversityBonus: 15
      }
    },
    {
      id: 'legendary-gaia-seed',
      name: 'Legendary Gaia World Tree',
      type: 'Mythical Tree',
      rarity: 'Legendary',
      price: 1000,
      cleanWaterTokenPrice: 600, // Massive discount for water masters
      germinationRate: 95,
      growthTime: 365,
      environmentalImpact: {
        co2Absorption: 100,
        soilImprovement: 50,
        biodiversityBonus: 75
      }
    }
  ]);

  const [synergyBonuses] = useState([
    {
      sourceProject: 'Clean Water Initiative',
      bonus: 'Purified water increases germination rate by 25%',
      tokensRequired: 10,
      active: cleanWaterTokens >= 10
    },
    {
      sourceProject: 'Coral Reef Restoration',
      bonus: 'Ocean nutrients boost soil quality by 40%',
      tokensRequired: 5,
      active: false // Mock - would check coral tokens
    },
    {
      sourceProject: 'Earth Aquarium Shrooms',
      bonus: 'Mycelium network enhances root development by 60%',
      tokensRequired: 15,
      active: false // Mock - would check mushroom tokens
    }
  ]);

  useEffect(() => {
    // Simulate plant growth
    const interval = setInterval(() => {
      if (growthProgress < 100) {
        setGrowthProgress(prev => Math.min(prev + 1, 100));
      } else {
        setActivePlants(prev => prev + 1);
        setGrowthProgress(0);
        synergyService.addHarmonyPoints(25, 1.2);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const purchaseSeedPack = (seedPack: SeedPack, useCleanWaterTokens: boolean = false) => {
    const price = useCleanWaterTokens ? seedPack.cleanWaterTokenPrice : seedPack.price;
    const currency = useCleanWaterTokens ? 'Clean Water Tokens' : 'Seed Tokens';
    
    if (useCleanWaterTokens && cleanWaterTokens >= (price || 0)) {
      setCleanWaterTokens(prev => prev - (price || 0));
      setUserSeeds(prev => prev + 10);
      synergyService.addHarmonyPoints(50, 1.5); // Bonus for cross-project usage
    } else if (!useCleanWaterTokens && userSeeds >= (price || 0)) {
      setUserSeeds(prev => prev - (price || 0));
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-500';
      case 'Rare': return 'text-blue-400 border-blue-500';
      case 'Epic': return 'text-purple-400 border-purple-500';
      case 'Legendary': return 'text-yellow-400 border-yellow-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-brown-900/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-4 border-green-500/50 bg-gradient-to-br from-green-900/40 via-brown-900/40 to-yellow-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-green-400 via-yellow-400 to-brown-400 bg-clip-text text-transparent">
              🌱 SEED SPLITTER PROJECT
            </CardTitle>
            <div className="text-center text-2xl text-green-300 font-bold">
              Growth • Evolution • Life Multiplication
            </div>
          </CardHeader>
        </Card>

        {/* Cross-Project Synergy Alert */}
        <Alert className="mb-6 border-blue-500 bg-blue-900/30">
          <Droplets className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Cross-Project Synergy Active!</strong> Your Clean Water tokens can be used to purchase Seed Packs at discounted rates. 
            Water purification expertise enhances plant growth by 25%!
          </AlertDescription>
        </Alert>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="p-4 text-center">
              <Sprout className="h-8 w-8 text-green-400 mx-auto mb-2 animate-bounce" />
              <div className="text-2xl font-bold text-green-400">{userSeeds}</div>
              <div className="text-sm text-green-300">Seed Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="p-4 text-center">
              <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-blue-400">{cleanWaterTokens}</div>
              <div className="text-sm text-blue-300">Clean Water Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{currentGrowthLevel}</div>
              <div className="text-sm text-yellow-300">Growth Level</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="p-4 text-center">
              <TreePine className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{activePlants}</div>
              <div className="text-sm text-purple-300">Active Plants</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Growth Progress */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-lime-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-400" />
              <span className="text-green-400">Current Plant Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Harmony Flower Seeds - Stage 3/5</span>
                <span>{growthProgress}%</span>
              </div>
              <Progress value={growthProgress} className="h-4" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-2 bg-green-900/50 rounded">
                  <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-xs text-yellow-300">Sunlight: Optimal</div>
                </div>
                <div className="p-2 bg-blue-900/50 rounded">
                  <Droplets className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-blue-300">Water: Enhanced</div>
                </div>
                <div className="p-2 bg-brown-900/50 rounded">
                  <Mountain className="h-6 w-6 text-brown-400 mx-auto mb-1" />
                  <div className="text-xs text-brown-300">Soil: Purified</div>
                </div>
                <div className="p-2 bg-purple-900/50 rounded">
                  <Zap className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-purple-300">Growth: +25%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-Project Synergy Bonuses */}
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-teal-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400">Cross-Project Synergy Bonuses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {synergyBonuses.map((bonus, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${bonus.active ? 'border-green-500 bg-green-900/20' : 'border-gray-500 bg-gray-900/20'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-bold ${bonus.active ? 'text-green-400' : 'text-gray-400'}`}>
                        {bonus.sourceProject}
                      </h4>
                      <p className="text-sm text-gray-300">{bonus.bonus}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={bonus.active ? 'bg-green-600' : 'bg-gray-600'}>
                        {bonus.tokensRequired} tokens required
                      </Badge>
                      {bonus.active && <Zap className="h-5 w-5 text-yellow-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seed Pack Marketplace */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-6 w-6 text-green-400" />
              <span className="text-green-400">Seed Pack Marketplace</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableSeedPacks.map((seedPack) => (
                <Card key={seedPack.id} className={`border-2 ${getRarityColor(seedPack.rarity).split(' ')[1]}/50`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className={getRarityColor(seedPack.rarity).split(' ')[0]}>{seedPack.name}</span>
                      <Badge className={`${getRarityColor(seedPack.rarity).split(' ')[1].replace('border-', 'bg-').replace('/50', '')}`}>
                        {seedPack.rarity}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Type: <span className="text-green-400">{seedPack.type}</span></div>
                        <div>Germination: <span className="text-blue-400">{seedPack.germinationRate}%</span></div>
                        <div>Growth Time: <span className="text-yellow-400">{seedPack.growthTime} days</span></div>
                        <div>CO₂ Absorption: <span className="text-purple-400">{seedPack.environmentalImpact.co2Absorption}kg</span></div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => purchaseSeedPack(seedPack, false)}
                          disabled={userSeeds < seedPack.price}
                        >
                          Buy for {seedPack.price} Seed Tokens
                        </Button>
                        
                        {seedPack.cleanWaterTokenPrice && (
                          <Button 
                            variant="outline"
                            className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/30"
                            onClick={() => purchaseSeedPack(seedPack, true)}
                            disabled={cleanWaterTokens < seedPack.cleanWaterTokenPrice}
                          >
                            <Droplets className="h-4 w-4 mr-2" />
                            Use {seedPack.cleanWaterTokenPrice} Clean Water Tokens
                            <Badge className="ml-2 bg-blue-600">
                              {Math.round((1 - (seedPack.cleanWaterTokenPrice / seedPack.price)) * 100)}% OFF
                            </Badge>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Activities */}
        <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-green-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400">Growth & Evolution Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 bg-green-600 hover:bg-green-700">
                <div className="text-center">
                  <Sprout className="h-6 w-6 mx-auto mb-1" />
                  <div>Plant New Seeds</div>
                </div>
              </Button>
              <Button className="h-20 bg-blue-600 hover:bg-blue-700">
                <div className="text-center">
                  <Droplets className="h-6 w-6 mx-auto mb-1" />
                  <div>Water Plants</div>
                </div>
              </Button>
              <Button className="h-20 bg-purple-600 hover:bg-purple-700">
                <div className="text-center">
                  <TreePine className="h-6 w-6 mx-auto mb-1" />
                  <div>Harvest Crops</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Routing Rewards System */}
        <RoutingRewardSystem />
      </div>
    </div>
  );
}