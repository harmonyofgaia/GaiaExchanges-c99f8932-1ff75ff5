/**
 * Coral Reef Restoration Project - Enhanced with Cross-Project Synergy
 * Ocean Protection theme with Mushroom wellness tour unlocks
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Waves, 
  Mountain, 
  Zap, 
  TrendingUp, 
  Gift, 
  ArrowRightLeft,
  Fish,
  Thermometer,
  Activity,
  Shield,
  Heart,
  Camera
} from 'lucide-react';
import CrossProjectSynergyService from '@/services/CrossProjectSynergyService';
import RoutingRewardSystem from '@/components/RoutingRewardSystem';
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo';

const synergyService = CrossProjectSynergyService.getInstance();

interface CoralMission {
  id: string;
  name: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tokensReward: number;
  coralAreaRestored: number; // in square meters
  duration: number; // in minutes
  mushroomToursUnlocked?: number;
  requirements: string[];
}

interface ReefHealth {
  biodiversity: number;
  temperature: number;
  ph: number;
  algaeGrowth: number;
  coralCoverage: number;
}

export default function CoralReefRestorationProject() {
  const [coralTokens, setCoralTokens] = useState(156);
  const [mushroomToursUnlocked, setMushroomToursUnlocked] = useState(3);
  const [currentRestorationLevel, setCurrentRestorationLevel] = useState(8);
  const [totalAreaRestored, setTotalAreaRestored] = useState(12847); // square meters
  const [activeRestorationSites, setActiveRestorationSites] = useState(7);
  
  const [currentRestoration, setCurrentRestoration] = useState({
    progress: 62,
    areaWorked: 78,
    target: 125,
    timeRemaining: '18 min',
    technique: 'Sonic Restoration'
  });

  const [reefHealth, setReefHealth] = useState<ReefHealth>({
    biodiversity: 89,
    temperature: 26.5,
    ph: 8.2,
    algaeGrowth: 15,
    coralCoverage: 74
  });

  const [availableMissions] = useState<CoralMission[]>([
    {
      id: 'sonic-healing',
      name: 'Sonic Coral Healing Session',
      type: 'Sound Therapy',
      difficulty: 'Easy',
      tokensReward: 25,
      coralAreaRestored: 50,
      duration: 20,
      mushroomToursUnlocked: 1,
      requirements: ['Basic Sound Therapy Knowledge']
    },
    {
      id: 'symbiotic-cultivation',
      name: 'Symbiotic Algae Cultivation',
      type: 'Biological Enhancement',
      difficulty: 'Medium',
      tokensReward: 60,
      coralAreaRestored: 150,
      duration: 45,
      mushroomToursUnlocked: 2,
      requirements: ['Marine Biology Level 3', 'Symbiosis Understanding']
    },
    {
      id: 'deep-reef-restoration',
      name: 'Deep Ocean Reef Reconstruction',
      type: 'Advanced Engineering',
      difficulty: 'Hard',
      tokensReward: 120,
      coralAreaRestored: 300,
      duration: 90,
      mushroomToursUnlocked: 4,
      requirements: ['Deep Sea Certification', 'Advanced Restoration Tech']
    },
    {
      id: 'mushroom-coral-fusion',
      name: 'Mycelium-Coral Network Integration',
      type: 'Cross-Ecosystem',
      difficulty: 'Expert',
      tokensReward: 200,
      coralAreaRestored: 500,
      duration: 120,
      mushroomToursUnlocked: 8,
      requirements: ['Earth Aquarium Partnership', 'Symbiotic Mastery', 'Network Theory']
    }
  ]);

  const [crossProjectOffers] = useState([
    {
      targetProject: 'Earth Aquarium Mushrooms',
      offer: 'Unlock exclusive underground wellness tours through ocean expertise',
      benefit: 'Ocean symbiosis knowledge enhances mushroom cultivation understanding',
      exchangeRate: '15:1',
      bonus: 'Access to rare deep-sea mineral nutrients for mushrooms',
      available: coralTokens >= 15
    },
    {
      targetProject: 'Clean Water Initiative',
      offer: 'Share marine filtration techniques for water purification',
      benefit: 'Ocean purification methods improve freshwater systems',
      exchangeRate: '8:20',
      bonus: 'Marine-grade filtration technology access',
      available: coralTokens >= 8
    },
    {
      targetProject: 'Heart of Gaia',
      offer: 'Channel ocean life force for planetary healing',
      benefit: 'Deep ocean connection enhances earth element mastery',
      exchangeRate: '25:1',
      bonus: 'Oceanic meditation techniques unlocked',
      available: coralTokens >= 25
    }
  ]);

  useEffect(() => {
    // Simulate ongoing restoration process
    const interval = setInterval(() => {
      if (currentRestoration.progress < 100) {
        setCurrentRestoration(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 3, 100),
          areaWorked: Math.min(prev.areaWorked + 2, prev.target)
        }));
      } else {
        // Complete the restoration cycle
        setCoralTokens(prev => prev + 30);
        setMushroomToursUnlocked(prev => prev + 1);
        setTotalAreaRestored(prev => prev + currentRestoration.target);
        setCurrentRestoration({
          progress: 0,
          areaWorked: 0,
          target: 125,
          timeRemaining: '20 min',
          technique: 'Sonic Restoration'
        });
        synergyService.addHarmonyPoints(75, 1.4);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentRestoration.progress]);

  const startRestorationMission = (mission: CoralMission) => {
    setCurrentRestoration({
      progress: 0,
      areaWorked: 0,
      target: mission.coralAreaRestored,
      timeRemaining: `${mission.duration} min`,
      technique: mission.type
    });
  };

  const exchangeForMushroomTours = (offer: any) => {
    const tokensRequired = parseInt(offer.exchangeRate.split(':')[0]);
    if (coralTokens >= tokensRequired) {
      setCoralTokens(prev => prev - tokensRequired);
      setMushroomToursUnlocked(prev => prev + parseInt(offer.exchangeRate.split(':')[1]));
      synergyService.addHarmonyPoints(150, 2.2); // High cross-project bonus
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 border-green-500';
      case 'Medium': return 'text-yellow-400 border-yellow-500';
      case 'Hard': return 'text-orange-400 border-orange-500';
      case 'Expert': return 'text-red-400 border-red-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getHealthColor = (value: number, type: string) => {
    if (type === 'algaeGrowth') {
      return value <= 20 ? 'text-green-400' : value <= 40 ? 'text-yellow-400' : 'text-red-400';
    }
    if (type === 'temperature') {
      return value >= 25 && value <= 28 ? 'text-green-400' : 'text-yellow-400';
    }
    return value >= 80 ? 'text-green-400' : value >= 60 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-purple-900/20">
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

        <Card className="border-4 border-blue-500/50 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-cyan-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              🪸 CORAL REEF RESTORATION
            </CardTitle>
            <div className="text-center text-2xl text-blue-300 font-bold">
              Ocean Protection • Marine Biodiversity • Symbiotic Healing
            </div>
          </CardHeader>
        </Card>

        {/* Cross-Project Synergy Alert */}
        <Alert className="mb-6 border-purple-500 bg-purple-900/30">
          <Mountain className="h-4 w-4" />
          <AlertDescription className="text-purple-300">
            <strong>Mushroom Synergy Unlocked!</strong> Your coral restoration expertise unlocks exclusive underground wellness tours. 
            Ocean symbiosis knowledge enhances mushroom cultivation by 40%!
          </AlertDescription>
        </Alert>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="p-4 text-center">
              <Waves className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-bounce" />
              <div className="text-2xl font-bold text-blue-400">{coralTokens}</div>
              <div className="text-sm text-blue-300">Coral Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="p-4 text-center">
              <Mountain className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-purple-400">{mushroomToursUnlocked}</div>
              <div className="text-sm text-purple-300">Mushroom Tours</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{currentRestorationLevel}</div>
              <div className="text-sm text-green-300">Restoration Level</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{totalAreaRestored.toLocaleString()}</div>
              <div className="text-sm text-orange-300">m² Restored</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Restoration Process */}
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Waves className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400">Active Restoration: {currentRestoration.technique}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Restoring coral habitat - {currentRestoration.areaWorked}/{currentRestoration.target} m²</span>
                <span>{currentRestoration.progress}% Complete</span>
              </div>
              <Progress value={currentRestoration.progress} className="h-4" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-2 bg-blue-900/50 rounded">
                  <Waves className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-blue-300">Sound Waves</div>
                  <Activity className="h-4 w-4 text-green-400 mx-auto mt-1" />
                </div>
                <div className="p-2 bg-purple-900/50 rounded">
                  <Fish className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-purple-300">Marine Life</div>
                  {currentRestoration.progress > 25 && <Activity className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-green-900/50 rounded">
                  <Heart className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-green-300">Symbiosis</div>
                  {currentRestoration.progress > 50 && <Activity className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-cyan-900/50 rounded">
                  <Shield className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs text-cyan-300">Protection</div>
                  {currentRestoration.progress > 75 && <Activity className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reef Health Metrics */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-teal-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-green-400" />
              <span className="text-green-400">Reef Health Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(reefHealth.biodiversity, 'biodiversity')}`}>
                  {reefHealth.biodiversity}%
                </div>
                <div className="text-sm text-gray-300">Biodiversity</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(reefHealth.temperature, 'temperature')}`}>
                  {reefHealth.temperature}°C
                </div>
                <div className="text-sm text-gray-300">Temperature</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(reefHealth.ph, 'ph')}`}>
                  {reefHealth.ph}
                </div>
                <div className="text-sm text-gray-300">pH Level</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(reefHealth.algaeGrowth, 'algaeGrowth')}`}>
                  {reefHealth.algaeGrowth}%
                </div>
                <div className="text-sm text-gray-300">Algae Growth</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getHealthColor(reefHealth.coralCoverage, 'coralCoverage')}`}>
                  {reefHealth.coralCoverage}%
                </div>
                <div className="text-sm text-gray-300">Coral Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-Project Exchanges */}
        <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-purple-400" />
              <span className="text-purple-400">Cross-Project Ecosystem Exchange</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crossProjectOffers.map((offer, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${offer.available ? 'border-purple-500 bg-purple-900/20' : 'border-gray-500 bg-gray-900/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-bold ${offer.available ? 'text-purple-400' : 'text-gray-400'}`}>
                        {offer.targetProject}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">{offer.offer}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-blue-400">Exchange: {offer.exchangeRate}</span>
                        <span className="text-green-400">{offer.bonus}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={offer.available ? 'bg-purple-600' : 'bg-gray-600'}>
                        {offer.available ? 'Available' : 'Insufficient Tokens'}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={!offer.available}
                        onClick={() => exchangeForMushroomTours(offer)}
                      >
                        Exchange Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Restoration Missions */}
        <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400">Available Restoration Missions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableMissions.map((mission) => (
                <Card key={mission.id} className={`border-2 ${getDifficultyColor(mission.difficulty).split(' ')[1]}/50`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className={getDifficultyColor(mission.difficulty).split(' ')[0]}>{mission.name}</span>
                      <Badge className={`${getDifficultyColor(mission.difficulty).split(' ')[1].replace('border-', 'bg-').replace('/50', '')}`}>
                        {mission.difficulty}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Type: <span className="text-blue-400">{mission.type}</span></div>
                        <div>Duration: <span className="text-yellow-400">{mission.duration} min</span></div>
                        <div>Area: <span className="text-cyan-400">{mission.coralAreaRestored} m²</span></div>
                        <div>Reward: <span className="text-green-400">{mission.tokensReward} tokens</span></div>
                      </div>
                      
                      {mission.mushroomToursUnlocked && (
                        <div className="p-2 bg-purple-900/30 rounded text-center">
                          <Mountain className="h-4 w-4 text-purple-400 inline mr-2" />
                          <span className="text-purple-400">Unlocks {mission.mushroomToursUnlocked} Mushroom Tour(s)</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Requirements:</div>
                        {mission.requirements.map((req, idx) => (
                          <div key={idx} className="text-xs text-gray-300">• {req}</div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => startRestorationMission(mission)}
                      >
                        Start Mission
                      </Button>
                    </div>
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