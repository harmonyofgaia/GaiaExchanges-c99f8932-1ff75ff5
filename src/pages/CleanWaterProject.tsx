/**
 * Clean Water Initiative Project - Enhanced with Cross-Project Synergy
 * Water Purification theme with Seed Splitter token exchange capability
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Droplets, 
  Sprout, 
  Zap, 
  TrendingUp, 
  Gift, 
  ArrowRightLeft,
  Filter,
  Waves,
  Beaker,
  Shield,
  CheckCircle
} from 'lucide-react';
import CrossProjectSynergyService from '@/services/CrossProjectSynergyService';
import RoutingRewardSystem from '@/components/RoutingRewardSystem';
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo';

const synergyService = CrossProjectSynergyService.getInstance();

interface WaterPurificationTask {
  id: string;
  name: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tokensReward: number;
  litersCleanedTarget: number;
  duration: number; // in minutes
  seedPacksUnlocked?: number;
  requirements: string[];
}

interface WaterQualityMetrics {
  purity: number;
  ph: number;
  bacteria: number;
  toxins: number;
  minerals: number;
}

export default function CleanWaterProject() {
  const [waterTokens, setWaterTokens] = useState(127);
  const [seedPacksUnlocked, setSeedPacksUnlocked] = useState(8);
  const [currentPurificationLevel, setCurrentPurificationLevel] = useState(9);
  const [totalLitersCleaned, setTotalLitersCleaned] = useState(24567);
  const [activePurificationSites, setActivePurificationSites] = useState(5);
  
  const [currentPurification, setCurrentPurification] = useState({
    progress: 78,
    litersProcessed: 156,
    target: 200,
    timeRemaining: '12 min'
  });

  const [waterQuality, setWaterQuality] = useState<WaterQualityMetrics>({
    purity: 94,
    ph: 7.2,
    bacteria: 2,
    toxins: 1,
    minerals: 85
  });

  const [availableTasks] = useState<WaterPurificationTask[]>([
    {
      id: 'basic-filtration',
      name: 'Basic Water Filtration',
      type: 'Filtration',
      difficulty: 'Easy',
      tokensReward: 15,
      litersCleanedTarget: 50,
      duration: 15,
      seedPacksUnlocked: 1,
      requirements: ['Level 1 Purification Skills']
    },
    {
      id: 'advanced-purification',
      name: 'Advanced Chemical Purification',
      type: 'Chemical Treatment',
      difficulty: 'Hard',
      tokensReward: 50,
      litersCleanedTarget: 200,
      duration: 45,
      seedPacksUnlocked: 3,
      requirements: ['Level 5 Purification Skills', 'Chemistry Knowledge']
    },
    {
      id: 'ecosystem-restoration',
      name: 'Natural Ecosystem Water Restoration',
      type: 'Ecosystem',
      difficulty: 'Expert',
      tokensReward: 100,
      litersCleanedTarget: 500,
      duration: 90,
      seedPacksUnlocked: 8,
      requirements: ['Level 8 Purification Skills', 'Ecosystem Understanding', 'Seed Splitter Partnership']
    },
    {
      id: 'coral-synergy-cleaning',
      name: 'Coral-Enhanced Ocean Purification',
      type: 'Marine',
      difficulty: 'Medium',
      tokensReward: 75,
      litersCleanedTarget: 300,
      duration: 60,
      seedPacksUnlocked: 5,
      requirements: ['Coral Restoration Partnership', 'Marine Biology Knowledge']
    }
  ]);

  const [crossProjectOffers] = useState([
    {
      targetProject: 'Seed Splitter Project',
      offer: 'Trade 10 Clean Water Tokens for Premium Seed Pack',
      benefit: 'Enhanced plant growth with purified water knowledge',
      exchangeRate: '10:1',
      bonus: '20% growth speed bonus for seeds',
      available: waterTokens >= 10
    },
    {
      targetProject: 'Coral Reef Restoration',
      offer: 'Share water purification techniques for ocean health',
      benefit: 'Improved coral growth through cleaner water',
      exchangeRate: '5:15',
      bonus: 'Unlock marine filtration systems',
      available: waterTokens >= 5
    },
    {
      targetProject: 'Earth Aquarium Shrooms',
      offer: 'Provide mineral-rich water for mushroom cultivation',
      benefit: 'Enhanced mushroom growth and nutritional value',
      exchangeRate: '8:12',
      bonus: 'Access to underground water sources',
      available: waterTokens >= 8
    }
  ]);

  useEffect(() => {
    // Simulate ongoing purification process
    const interval = setInterval(() => {
      if (currentPurification.progress < 100) {
        setCurrentPurification(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 2, 100),
          litersProcessed: Math.min(prev.litersProcessed + 4, prev.target)
        }));
      } else {
        // Complete the purification cycle
        setWaterTokens(prev => prev + 20);
        setSeedPacksUnlocked(prev => prev + 1);
        setTotalLitersCleaned(prev => prev + currentPurification.target);
        setCurrentPurification({
          progress: 0,
          litersProcessed: 0,
          target: 200,
          timeRemaining: '15 min'
        });
        synergyService.addHarmonyPoints(50, 1.3);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentProgress]);

  const startPurificationTask = (task: WaterPurificationTask) => {
    setCurrentPurification({
      progress: 0,
      litersProcessed: 0,
      target: task.litersCleanedTarget,
      timeRemaining: `${task.duration} min`
    });
  };

  const exchangeTokensForSeeds = (offer: any) => {
    const tokensRequired = parseInt(offer.exchangeRate.split(':')[0]);
    if (waterTokens >= tokensRequired) {
      setWaterTokens(prev => prev - tokensRequired);
      setSeedPacksUnlocked(prev => prev + parseInt(offer.exchangeRate.split(':')[1]));
      synergyService.addHarmonyPoints(100, 2.0); // Cross-project bonus
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

  const getQualityColor = (value: number, type: string) => {
    if (type === 'bacteria' || type === 'toxins') {
      return value <= 5 ? 'text-green-400' : value <= 15 ? 'text-yellow-400' : 'text-red-400';
    }
    return value >= 85 ? 'text-green-400' : value >= 70 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-cyan-900/20">
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

        <Card className="border-4 border-blue-500/50 bg-gradient-to-br from-blue-900/40 via-cyan-900/40 to-teal-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              💧 CLEAN WATER INITIATIVE
            </CardTitle>
            <div className="text-center text-2xl text-blue-300 font-bold">
              Purification • Conservation • Life Sustaining
            </div>
          </CardHeader>
        </Card>

        {/* Cross-Project Synergy Alert */}
        <Alert className="mb-6 border-green-500 bg-green-900/30">
          <Sprout className="h-4 w-4" />
          <AlertDescription className="text-green-300">
            <strong>Seed Splitter Synergy Available!</strong> Your Clean Water tokens can be exchanged for Premium Seed Packs. 
            Your water purification expertise enhances plant growth by 25%!
          </AlertDescription>
        </Alert>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="p-4 text-center">
              <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-bounce" />
              <div className="text-2xl font-bold text-blue-400">{waterTokens}</div>
              <div className="text-sm text-blue-300">Clean Water Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="p-4 text-center">
              <Gift className="h-8 w-8 text-green-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-green-400">{seedPacksUnlocked}</div>
              <div className="text-sm text-green-300">Seed Packs Unlocked</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-violet-900/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{currentPurificationLevel}</div>
              <div className="text-sm text-purple-300">Purification Level</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-teal-900/30">
            <CardContent className="p-4 text-center">
              <Waves className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{totalLitersCleaned.toLocaleString()}</div>
              <div className="text-sm text-cyan-300">Liters Cleaned</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Purification Process */}
        <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400">Active Purification Process</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Advanced Multi-Stage Filtration - {currentPurification.litersProcessed}/{currentPurification.target} liters</span>
                <span>{currentPurification.progress}% Complete</span>
              </div>
              <Progress value={currentPurification.progress} className="h-4" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-2 bg-blue-900/50 rounded">
                  <Filter className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-blue-300">Pre-Filtration</div>
                  <CheckCircle className="h-4 w-4 text-green-400 mx-auto mt-1" />
                </div>
                <div className="p-2 bg-purple-900/50 rounded">
                  <Beaker className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-purple-300">Chemical Treatment</div>
                  {currentPurification.progress > 25 && <CheckCircle className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-green-900/50 rounded">
                  <Shield className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-green-300">UV Sterilization</div>
                  {currentPurification.progress > 50 && <CheckCircle className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
                <div className="p-2 bg-cyan-900/50 rounded">
                  <Droplets className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs text-cyan-300">Final Polish</div>
                  {currentPurification.progress > 75 && <CheckCircle className="h-4 w-4 text-green-400 mx-auto mt-1" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Quality Metrics */}
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400">Water Quality Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getQualityColor(waterQuality.purity, 'purity')}`}>
                  {waterQuality.purity}%
                </div>
                <div className="text-sm text-gray-300">Purity</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getQualityColor(waterQuality.ph, 'ph')}`}>
                  {waterQuality.ph}
                </div>
                <div className="text-sm text-gray-300">pH Level</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getQualityColor(waterQuality.bacteria, 'bacteria')}`}>
                  {waterQuality.bacteria}
                </div>
                <div className="text-sm text-gray-300">Bacteria PPM</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getQualityColor(waterQuality.toxins, 'toxins')}`}>
                  {waterQuality.toxins}
                </div>
                <div className="text-sm text-gray-300">Toxins PPM</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded">
                <div className={`text-2xl font-bold ${getQualityColor(waterQuality.minerals, 'minerals')}`}>
                  {waterQuality.minerals}%
                </div>
                <div className="text-sm text-gray-300">Minerals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-Project Token Exchange */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-yellow-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-green-400" />
              <span className="text-green-400">Cross-Project Token Exchange</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crossProjectOffers.map((offer, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${offer.available ? 'border-green-500 bg-green-900/20' : 'border-gray-500 bg-gray-900/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-bold ${offer.available ? 'text-green-400' : 'text-gray-400'}`}>
                        {offer.targetProject}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">{offer.offer}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-blue-400">Exchange: {offer.exchangeRate}</span>
                        <span className="text-purple-400">{offer.bonus}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={offer.available ? 'bg-green-600' : 'bg-gray-600'}>
                        {offer.available ? 'Available' : 'Insufficient Tokens'}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!offer.available}
                        onClick={() => exchangeTokensForSeeds(offer)}
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

        {/* Purification Tasks */}
        <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-purple-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Waves className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400">Available Purification Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableTasks.map((task) => (
                <Card key={task.id} className={`border-2 ${getDifficultyColor(task.difficulty).split(' ')[1]}/50`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className={getDifficultyColor(task.difficulty).split(' ')[0]}>{task.name}</span>
                      <Badge className={`${getDifficultyColor(task.difficulty).split(' ')[1].replace('border-', 'bg-').replace('/50', '')}`}>
                        {task.difficulty}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Type: <span className="text-blue-400">{task.type}</span></div>
                        <div>Duration: <span className="text-yellow-400">{task.duration} min</span></div>
                        <div>Target: <span className="text-cyan-400">{task.litersCleanedTarget} L</span></div>
                        <div>Reward: <span className="text-green-400">{task.tokensReward} tokens</span></div>
                      </div>
                      
                      {task.seedPacksUnlocked && (
                        <div className="p-2 bg-green-900/30 rounded text-center">
                          <Sprout className="h-4 w-4 text-green-400 inline mr-2" />
                          <span className="text-green-400">Unlocks {task.seedPacksUnlocked} Seed Pack(s)</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Requirements:</div>
                        {task.requirements.map((req, idx) => (
                          <div key={idx} className="text-xs text-gray-300">• {req}</div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => startPurificationTask(task)}
                      >
                        Start Task
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