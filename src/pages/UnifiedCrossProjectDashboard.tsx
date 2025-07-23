/**
 * Unified Cross-Project Dashboard
 * Shows Harmony Points, project progress, synergies, and cross-project interactions
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Trophy, 
  Zap, 
  Sparkles, 
  ArrowRightLeft, 
  Target, 
  Users, 
  TrendingUp,
  Leaf,
  Droplets,
  Waves,
  Sprout,
  Mountain,
  Heart,
  Globe,
  Star
} from 'lucide-react';
import CrossProjectSynergyService, { PROJECT_HEADS } from '@/services/CrossProjectSynergyService';
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo';

const synergyService = CrossProjectSynergyService.getInstance();

export default function UnifiedCrossProjectDashboard() {
  const [harmonyPoints, setHarmonyPoints] = useState(synergyService.getHarmonyPoints());
  const [tokenSynergies, setTokenSynergies] = useState(synergyService.getTokenSynergyExamples());
  const [skillTransfers, setSkillTransfers] = useState(synergyService.getSkillTransferQuests());
  const [crossProjectMissions, setCrossProjectMissions] = useState(synergyService.generateCrossProjectMissions());
  const [eventBonuses, setEventBonuses] = useState(synergyService.getActiveEventBonuses());
  const [globalBadges, setGlobalBadges] = useState(synergyService.getGlobalRecognitionBadges());
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project progress data
  const [projectProgress] = useState([
    { 
      project: PROJECT_HEADS.HEART_OF_GAIA, 
      name: 'Heart of Gaia', 
      level: 8, 
      progress: 75, 
      tokens: 1247, 
      icon: Heart, 
      color: 'text-red-400',
      theme: 'Nature/Mystical'
    },
    { 
      project: PROJECT_HEADS.SEED_SPLITTER, 
      name: 'Seed Splitter', 
      level: 12, 
      progress: 90, 
      tokens: 2834, 
      icon: Sprout, 
      color: 'text-green-400',
      theme: 'Growth/Evolution'
    },
    { 
      project: PROJECT_HEADS.CLEAN_WATER, 
      name: 'Clean Water Initiative', 
      level: 6, 
      progress: 60, 
      tokens: 945, 
      icon: Droplets, 
      color: 'text-blue-400',
      theme: 'Water Purification'
    },
    { 
      project: PROJECT_HEADS.CORAL_REEF_RESTORATION, 
      name: 'Coral Reef Restoration', 
      level: 10, 
      progress: 85, 
      tokens: 1567, 
      icon: Waves, 
      color: 'text-orange-400',
      theme: 'Ocean Protection'
    },
    { 
      project: PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS, 
      name: 'Earth Aquarium of Shrooms', 
      level: 5, 
      progress: 45, 
      tokens: 723, 
      icon: Mountain, 
      color: 'text-purple-400',
      theme: 'Underground/Bio'
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update harmony points periodically
      synergyService.addHarmonyPoints(Math.floor(Math.random() * 50), 1.2);
      setHarmonyPoints(synergyService.getHarmonyPoints());
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getProjectIcon = (projectId: string) => {
    const project = projectProgress.find(p => p.project === projectId);
    return project ? project.icon : Star;
  };

  const getProjectColor = (projectId: string) => {
    const project = projectProgress.find(p => p.project === projectId);
    return project ? project.color : 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20">
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

        <Card className="border-4 border-green-500/50 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 HARMONY OF GAIA UNIFIED DASHBOARD
            </CardTitle>
            <div className="text-center text-2xl text-green-300 font-bold">
              Cross-Project Synergy • Token Economy • Universal Recognition
            </div>
          </CardHeader>
        </Card>

        {/* Harmony Points Display */}
        <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Crown className="h-12 w-12 text-yellow-400 animate-pulse" />
                <div>
                  <h3 className="text-3xl font-bold text-yellow-400">Harmony Points</h3>
                  <p className="text-yellow-300">Universal Recognition Currency</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-yellow-400">{harmonyPoints.balance.toLocaleString()}</div>
                <div className="text-sm text-yellow-300">
                  Total Earned: {harmonyPoints.earned.toLocaleString()} | Multiplier: {harmonyPoints.multiplier}x
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 border border-green-500/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="synergies">Token Synergies</TabsTrigger>
            <TabsTrigger value="skills">Skill Transfers</TabsTrigger>
            <TabsTrigger value="missions">Cross Missions</TabsTrigger>
            <TabsTrigger value="events">Event Bonuses</TabsTrigger>
            <TabsTrigger value="recognition">Recognition</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectProgress.map((project) => {
                const IconComponent = project.icon;
                return (
                  <Card key={project.project} className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className={`h-8 w-8 ${project.color}`} />
                        <Badge className="bg-blue-600 text-white">Level {project.level}</Badge>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{project.name}</h4>
                      <p className="text-sm text-gray-300 mb-4">{project.theme}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">{project.tokens} tokens</span>
                          <span className="text-blue-400">Active</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Token Synergies Tab */}
          <TabsContent value="synergies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tokenSynergies.map((synergy, index) => {
                const SourceIcon = getProjectIcon(synergy.sourceProject);
                const TargetIcon = getProjectIcon(synergy.targetProject);
                return (
                  <Card key={index} className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SourceIcon className={`h-6 w-6 ${getProjectColor(synergy.sourceProject)}`} />
                          <ArrowRightLeft className="h-4 w-4 text-purple-400" />
                          <TargetIcon className={`h-6 w-6 ${getProjectColor(synergy.targetProject)}`} />
                        </div>
                        <Badge className="bg-purple-600">{synergy.bonusMultiplier}x Bonus</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-lg font-bold text-purple-400">
                            Exchange Rate: {synergy.exchangeRate}:1
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-white">Unlock Conditions:</p>
                          {synergy.unlockConditions.map((condition, idx) => (
                            <p key={idx} className="text-xs text-gray-300">• {condition}</p>
                          ))}
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Exchange Tokens
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Skill Transfers Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillTransfers.map((skill) => {
                const SourceIcon = getProjectIcon(skill.sourceProject);
                const TargetIcon = skill.targetProject === 'all' ? Globe : getProjectIcon(skill.targetProject);
                return (
                  <Card key={skill.id} className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SourceIcon className={`h-6 w-6 ${getProjectColor(skill.sourceProject)}`} />
                          <Zap className="h-4 w-4 text-orange-400" />
                          <TargetIcon className="h-6 w-6 text-orange-400" />
                        </div>
                        <Badge className="bg-orange-600">+{skill.bonusPercentage}%</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-orange-400">{skill.skillType}</h4>
                        <p className="text-sm text-gray-300">{skill.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Required Level: {skill.level}</span>
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Transfer Skill
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Cross Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            <div className="space-y-6">
              {crossProjectMissions.map((mission) => (
                <Card key={mission.id} className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-teal-900/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-green-400">{mission.title}</CardTitle>
                      <Badge className={mission.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                        {mission.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">{mission.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Target className="h-6 w-6 text-green-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">Projects</p>
                          <p className="text-sm font-bold text-white">{mission.requiredProjects.length}</p>
                        </div>
                        <div className="text-center">
                          <Crown className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">Harmony Points</p>
                          <p className="text-sm font-bold text-yellow-400">{mission.harmonyPointsReward}</p>
                        </div>
                        <div className="text-center">
                          <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">Participants</p>
                          <p className="text-sm font-bold text-blue-400">{mission.participants}/{mission.maxParticipants}</p>
                        </div>
                        <div className="text-center">
                          <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">Rewards</p>
                          <p className="text-sm font-bold text-purple-400">{mission.rewards.length} types</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {mission.requiredProjects.map((projectId, idx) => {
                            const ProjectIcon = getProjectIcon(projectId);
                            return (
                              <ProjectIcon key={idx} className={`h-5 w-5 ${getProjectColor(projectId)}`} />
                            );
                          })}
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Join Mission
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Event Bonuses Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventBonuses.map((event) => (
                <Card key={event.id} className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-yellow-400">{event.name}</span>
                      <Badge className="bg-yellow-600">{event.multiplier}x</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-300">{event.description}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">Conditions:</p>
                        {event.conditions.map((condition, idx) => (
                          <p key={idx} className="text-xs text-gray-300">• {condition}</p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          Ends: {event.endDate.toLocaleDateString()}
                        </span>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Activate Bonus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recognition Tab */}
          <TabsContent value="recognition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalBadges.map((badge) => (
                <Card key={badge.badgeId} className={`border-2 ${badge.earned ? 'border-gold-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30' : 'border-gray-500/50 bg-gradient-to-br from-gray-900/30 to-gray-800/30'}`}>
                  <CardContent className="p-6 text-center">
                    <Trophy className={`h-12 w-12 mx-auto mb-4 ${badge.earned ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <h4 className={`text-lg font-bold mb-2 ${badge.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {badge.name}
                    </h4>
                    <p className="text-sm text-gray-300 mb-4">{badge.description}</p>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Requirements:</div>
                      {badge.criteria.map((criterion, idx) => (
                        <div key={idx} className="text-xs text-gray-300">• {criterion}</div>
                      ))}
                      <div className="text-sm font-bold text-purple-400">
                        {badge.harmonyPointsRequired} Harmony Points Required
                      </div>
                    </div>
                    {badge.earned && badge.earnedDate && (
                      <Badge className="mt-4 bg-yellow-600">
                        Earned {badge.earnedDate.toLocaleDateString()}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}