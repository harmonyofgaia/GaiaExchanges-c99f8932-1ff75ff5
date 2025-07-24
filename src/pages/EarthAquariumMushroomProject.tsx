/**
 * Earth Aquarium Mushroom Project - Enhanced with Cross-Project Synergy
 * Underground/Bio theme with coral tour benefits and wellness experiences
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mountain, 
  Waves, 
  Zap, 
  TrendingUp, 
  Gift, 
  ArrowRightLeft,
  TreePine,
  Sun,
  Leaf,
  Heart,
  Sparkles,
  Clock
} from 'lucide-react';
import CrossProjectSynergyService from '@/services/CrossProjectSynergyService';
import RoutingRewardSystem from '@/components/RoutingRewardSystem';
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo';

const synergyService = CrossProjectSynergyService.getInstance();

interface MushroomCultivation {
  id: string;
  name: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mystical';
  tokensReward: number;
  growthTime: number; // in hours
  healingProperties: string[];
  wellnessBonus: number;
  coralSynergyBonus?: number;
}

interface WellnessTour {
  id: string;
  name: string;
  duration: number; // in minutes
  participants: number;
  maxParticipants: number;
  healingFactor: number;
  unlockedBy: string;
  description: string;
}

interface UndergroundEcosystem {
  humidity: number;
  soilRichness: number;
  myceliumNetwork: number;
  airQuality: number;
  temperature: number;
}

export default function EarthAquariumMushroomProject() {
  const [mushroomTokens, setMushroomTokens] = useState(89);
  const [coralWisdomUnlocked, setCoralWisdomUnlocked] = useState(true);
  const [currentCultivationLevel, setCultivationLevel] = useState(6);
  const [totalMushroomsGrown, setTotalMushroomsGrown] = useState(3456);
  const [activeWellnessTours, setActiveWellnessTours] = useState(4);
  
  const [currentCultivation, setCultivation] = useState({
    progress: 45,
    mushroomsGrowing: 12,
    target: 25,
    timeRemaining: '6 hours',
    strain: 'Harmony Healing Shiitake'
  });

  const [ecosystemHealth, setEcosystemHealth] = useState<UndergroundEcosystem>({
    humidity: 82,
    soilRichness: 91,
    myceliumNetwork: 87,
    airQuality: 94,
    temperature: 18.5
  });

  const [availableCultivations] = useState<MushroomCultivation[]>([
    {
      id: 'healing-shiitake',
      name: 'Harmony Healing Shiitake',
      type: 'Medicinal',
      rarity: 'Common',
      tokensReward: 15,
      growthTime: 4,
      healingProperties: ['Immune Boost', 'Energy Enhancement'],
      wellnessBonus: 10,
      coralSynergyBonus: 15
    },
    {
      id: 'ocean-pearl-oyster',
      name: 'Ocean Pearl Oyster Mushroom',
      type: 'Symbiotic',
      rarity: 'Rare',
      tokensReward: 35,
      growthTime: 8,
      healingProperties: ['Deep Relaxation', 'Marine Mineral Absorption'],
      wellnessBonus: 25,
      coralSynergyBonus: 40
    },
    {
      id: 'mystical-cordyceps',
      name: 'Mystical Cordyceps Fusion',
      type: 'Enhancement',
      rarity: 'Epic',
      tokensReward: 75,
      growthTime: 16,
      healingProperties: ['Vitality Surge', 'Mental Clarity', 'Endurance Boost'],
      wellnessBonus: 50,
      coralSynergyBonus: 75
    },
    {
      id: 'gaia-reishi',
      name: 'Ancient Gaia Reishi',
      type: 'Spiritual',
      rarity: 'Legendary',
      tokensReward: 150,
      growthTime: 24,
      healingProperties: ['Soul Alignment', 'Longevity', 'Wisdom Enhancement'],
      wellnessBonus: 100,
      coralSynergyBonus: 150
    },
    {
      id: 'universal-network',
      name: 'Universal Mycelium Network',
      type: 'Mystical',
      rarity: 'Mystical',
      tokensReward: 300,
      growthTime: 48,
      healingProperties: ['Planetary Connection', 'Cosmic Awareness', 'Healing Transmission'],
      wellnessBonus: 200,
      coralSynergyBonus: 300
    }
  ]);

  const [wellnessTours] = useState<WellnessTour[]>([
    {
      id: 'coral-underground',
      name: 'Coral-Enhanced Underground Meditation',
      duration: 60,
      participants: 8,
      maxParticipants: 12,
      healingFactor: 8.5,
      unlockedBy: 'Coral Reef Restoration participation',
      description: 'Deep underground meditation enhanced by ocean wisdom and marine minerals'
    },
    {
      id: 'symbiotic-breathing',
      name: 'Symbiotic Breathing Experience',
      duration: 45,
      participants: 15,
      maxParticipants: 20,
      healingFactor: 7.2,
      unlockedBy: 'Coral symbiosis understanding',
      description: 'Learn to breathe in harmony with both ocean and earth ecosystems'
    },
    {
      id: 'network-healing',
      name: 'Mycelium Network Healing Session',
      duration: 90,
      participants: 6,
      maxParticipants: 8,
      healingFactor: 9.8,
      unlockedBy: 'Advanced coral restoration completion',
      description: 'Connect with the planetary healing network through mushroom consciousness'
    }
  ]);

  const [crossProjectBenefits] = useState([
    {
      sourceProject: 'Coral Reef Restoration',
      benefit: 'Ocean minerals enhance mushroom nutritional value by 40%',
      mushroomBonus: 'Marine-enhanced cultivation techniques',
      active: coralWisdomUnlocked
    },
    {
      sourceProject: 'Clean Water Initiative',
      benefit: 'Purified water improves mushroom growth rate by 30%',
      mushroomBonus: 'Crystal-clear cultivation medium',
      active: false // Mock - would check water tokens
    },
    {
      sourceProject: 'Seed Splitter Project',
      benefit: 'Plant-mushroom symbiosis creates super-growth environments',
      mushroomBonus: 'Symbiotic cultivation networks',
      active: false // Mock - would check seed collaboration
    }
  ]);

  const updateCultivation = useCallback(() => {
    if (currentCultivation.progress < 100) {
      setCultivation(prev => ({
        ...prev,
        progress: Math.min(prev.progress + 2, 100),
        mushroomsGrowing: Math.min(prev.mushroomsGrowing + 1, prev.target)
      }));
    } else {
      // Complete the cultivation cycle
      setMushroomTokens(prev => prev + 25);
      setTotalMushroomsGrown(prev => prev + currentCultivation.target);
      setCultivation({
        progress: 0,
        mushroomsGrowing: 0,
        target: 25,
        timeRemaining: '8 hours',
        strain: 'Harmony Healing Shiitake'
      });
      synergyService.addHarmonyPoints(60, 1.6);
    }
  }, [currentCultivation.progress, currentCultivation.target, synergyService]);

  useEffect(() => {
    // Simulate ongoing cultivation process
    const interval = setInterval(updateCultivation, 5000);
    return () => clearInterval(interval);
  }, [updateCultivation]);

  const startCultivation = (cultivation: MushroomCultivation) => {
    setCultivation({
      progress: 0,
      mushroomsGrowing: 0,
      target: Math.floor(cultivation.tokensReward / 2),
      timeRemaining: `${cultivation.growthTime} hours`,
      strain: cultivation.name
    });
  };

  const joinWellnessTour = (tour: WellnessTour) => {
    if (tour.participants < tour.maxParticipants) {
      // Join the tour
      synergyService.addHarmonyPoints(tour.healingFactor * 20, 1.8);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-500';
      case 'Rare': return 'text-blue-400 border-blue-500';
      case 'Epic': return 'text-purple-400 border-purple-500';
      case 'Legendary': return 'text-yellow-400 border-yellow-500';
      case 'Mystical': return 'text-pink-400 border-pink-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getHealthColor = (value: number, type: string) => {
    if (type === 'temperature') {
      return value >= 15 && value <= 25 ? 'text-green-400' : 'text-yellow-400';
    }
    return value >= 85 ? 'text-green-400' : value >= 70 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-brown-900/20">
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

        <Card className="border-4 border-purple-500/50 bg-gradient-to-br from-purple-900/40 via-brown-900/40 to-green-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-purple-400 via-brown-400 to-green-400 bg-clip-text text-transparent">
              🍄 EARTH AQUARIUM MUSHROOMS
            </CardTitle>
            <div className="text-center text-2xl text-purple-300 font-bold">
              Underground Cultivation • Wellness Tours • Healing Networks
            </div>
          </CardHeader>
        </Card>

        {/* Cross-Project Synergy Alert */}
        <Alert className="mb-6 border-blue-500 bg-blue-900/30">
          <Waves className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Coral Wisdom Active!</strong> Your coral restoration expertise unlocks exclusive underground wellness tours. 
            Ocean minerals enhance mushroom nutritional value by 40%!
          </AlertDescription>
        </Alert>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="p-4 text-center">
              <Mountain className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
              <div className="text-2xl font-bold text-purple-400">{mushroomTokens}</div>
              <div className="text-sm text-purple-300">Mushroom Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="p-4 text-center">
              <Waves className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-blue-400">{activeWellnessTours}</div>
              <div className="text-sm text-blue-300">Wellness Tours</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{currentCultivationLevel}</div>
              <div className="text-sm text-green-300">Cultivation Level</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-brown-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="p-4 text-center">
              <TreePine className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{totalMushroomsGrown.toLocaleString()}</div>
              <div className="text-sm text-yellow-300">Mushrooms Grown</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Cultivation Process */}
        <Card className="border-2 border-brown-500/50 bg-gradient-to-br from-brown-900/30 to-green-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-brown-400" />
              <span className="text-brown-400">Active Cultivation: {currentCultivation.strain}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Growing underground garden - {currentCultivation.mushroomsGrowing}/{currentCultivation.target} mushrooms</span>
                <span>{currentCultivation.progress}% Complete</span>
              </div>
              <Progress value={currentCultivation.progress} className="h-4" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-2 bg-brown-900/50 rounded">
                  <TreePine className="h-6 w-6 text-brown-400 mx-auto mb-1" />
                  <div className="text-xs text-brown-300">Soil Prep</div>
                  <Sparkles className="h-4 w-4 text-green-400 mx-auto mt-1" />
                </div>
                <div className="p-2 bg-purple-900/50 rounded">
                  <Mountain className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-purple-300">Spore Inoculation</div>
                  {currentCultivation.progress > 25 && <Sparkles className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-green-900/50 rounded">
                  <Leaf className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-green-300">Mycelium Growth</div>
                  {currentCultivation.progress > 50 && <Sparkles className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-yellow-900/50 rounded">
                  <Gift className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-xs text-yellow-300">Harvest Ready</div>
                  {currentCultivation.progress > 75 && <Sparkles className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Underground Ecosystem Health */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-teal-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TreePine className="h-6 w-6 text-green-400" />
              <span className="text-green-400">Underground Ecosystem Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(ecosystemHealth.humidity, 'humidity')}`}>
                  {ecosystemHealth.humidity}%
                </div>
                <div className="text-sm text-gray-300">Humidity</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(ecosystemHealth.soilRichness, 'soilRichness')}`}>
                  {ecosystemHealth.soilRichness}%
                </div>
                <div className="text-sm text-gray-300">Soil Richness</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(ecosystemHealth.myceliumNetwork, 'myceliumNetwork')}`}>
                  {ecosystemHealth.myceliumNetwork}%
                </div>
                <div className="text-sm text-gray-300">Mycelium Network</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(ecosystemHealth.airQuality, 'airQuality')}`}>
                  {ecosystemHealth.airQuality}%
                </div>
                <div className="text-sm text-gray-300">Air Quality</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(ecosystemHealth.temperature, 'temperature')}`}>
                  {ecosystemHealth.temperature}°C
                </div>
                <div className="text-sm text-gray-300">Temperature</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-Project Benefits */}
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400">Cross-Project Cultivation Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crossProjectBenefits.map((benefit, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${benefit.active ? 'border-cyan-500 bg-cyan-900/20' : 'border-gray-500 bg-gray-900/20'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-bold ${benefit.active ? 'text-cyan-400' : 'text-gray-400'}`}>
                        {benefit.sourceProject}
                      </h4>
                      <p className="text-sm text-gray-300 mb-1">{benefit.benefit}</p>
                      <p className="text-xs text-purple-400">{benefit.mushroomBonus}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={benefit.active ? 'bg-cyan-600' : 'bg-gray-600'}>
                        {benefit.active ? 'Active' : 'Requires participation'}
                      </Badge>
                      {benefit.active && <Zap className="h-5 w-5 text-yellow-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mushroom Cultivation Options */}
        <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-purple-400" />
              <span className="text-purple-400">Available Mushroom Cultivations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCultivations.map((cultivation) => (
                <Card key={cultivation.id} className={`border-2 ${getRarityColor(cultivation.rarity).split(' ')[1]}/50`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className={getRarityColor(cultivation.rarity).split(' ')[0]}>{cultivation.name}</span>
                      <Badge className={`${getRarityColor(cultivation.rarity).split(' ')[1].replace('border-', 'bg-').replace('/50', '')}`}>
                        {cultivation.rarity}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Type: <span className="text-purple-400">{cultivation.type}</span></div>
                        <div>Growth: <span className="text-yellow-400">{cultivation.growthTime}h</span></div>
                        <div>Reward: <span className="text-green-400">{cultivation.tokensReward} tokens</span></div>
                        <div>Wellness: <span className="text-blue-400">+{cultivation.wellnessBonus}</span></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Healing Properties:</div>
                        {cultivation.healingProperties.map((prop, idx) => (
                          <div key={idx} className="text-xs text-green-300">• {prop}</div>
                        ))}
                      </div>

                      {cultivation.coralSynergyBonus && coralWisdomUnlocked && (
                        <div className="p-2 bg-blue-900/30 rounded text-center">
                          <Waves className="h-4 w-4 text-blue-400 inline mr-2" />
                          <span className="text-blue-400">Coral Synergy: +{cultivation.coralSynergyBonus}% bonus</span>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => startCultivation(cultivation)}
                      >
                        Start Cultivation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Tours */}
        <Card className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/30 to-purple-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-400" />
              <span className="text-pink-400">Exclusive Wellness Tours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessTours.map((tour) => (
                <Card key={tour.id} className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-pink-400">{tour.name}</h4>
                      <Badge className="bg-pink-600">
                        Healing: {tour.healingFactor}/10
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{tour.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-blue-300">{tour.duration} min</div>
                      </div>
                      <div>
                        <TreePine className="h-5 w-5 text-green-400 mx-auto mb-1" />
                        <div className="text-xs text-green-300">{tour.participants}/{tour.maxParticipants}</div>
                      </div>
                      <div>
                        <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                        <div className="text-xs text-purple-300">{tour.unlockedBy}</div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-pink-600 hover:bg-pink-700"
                      onClick={() => joinWellnessTour(tour)}
                      disabled={tour.participants >= tour.maxParticipants}
                    >
                      {tour.participants >= tour.maxParticipants ? 'Tour Full' : 'Join Wellness Tour'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Routing Rewards System */}
        <RoutingRewardSystem />
      </div>
    </div>
  );
}
