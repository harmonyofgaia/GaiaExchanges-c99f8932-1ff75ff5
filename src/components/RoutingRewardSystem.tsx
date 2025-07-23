/**
 * Routing Reward System
 * Tracks user navigation between projects and rewards multi-project participation
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Route, 
  Trophy, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Gift,
  Clock,
  Star,
  Target,
  Users
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CrossProjectSynergyService, { PROJECT_HEADS } from '@/services/CrossProjectSynergyService';

interface RouteVisit {
  route: string;
  projectId: string;
  timestamp: Date;
  duration: number;
  actionsPerformed: number;
}

interface RoutingReward {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  harmonyPointsReward: number;
  tokenReward: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface RouteStreak {
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: Date;
  consecutiveDays: number;
}

const synergyService = CrossProjectSynergyService.getInstance();

export default function RoutingRewardSystem() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [visitHistory, setVisitHistory] = useState<RouteVisit[]>([]);
  const [routingRewards, setRoutingRewards] = useState<RoutingReward[]>([]);
  const [routeStreak, setRouteStreak] = useState<RouteStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastVisitDate: new Date(),
    consecutiveDays: 0
  });
  const [dailyProgress, setDailyProgress] = useState(0);
  const [weeklyChallenge, setWeeklyChallenge] = useState({
    target: 15,
    completed: 8,
    timeRemaining: '3 days'
  });

  // Initialize routing rewards
  useEffect(() => {
    const rewards: RoutingReward[] = [
      {
        id: 'explorer-novice',
        name: 'Project Explorer',
        description: 'Visit 3 different project pages in one session',
        criteria: ['Visit Heart of Gaia', 'Visit Seed Splitter', 'Visit Clean Water'],
        harmonyPointsReward: 100,
        tokenReward: 50,
        unlocked: false,
        progress: 0,
        maxProgress: 3
      },
      {
        id: 'harmony-seeker',
        name: 'Harmony Seeker',
        description: 'Complete the full project circuit in 24 hours',
        criteria: ['Visit all 5 major projects', 'Perform action in each', 'Within 24 hours'],
        harmonyPointsReward: 500,
        tokenReward: 200,
        unlocked: false,
        progress: 0,
        maxProgress: 5
      },
      {
        id: 'synergy-master',
        name: 'Synergy Master',
        description: 'Use token exchange between 3 different project pairs',
        criteria: ['Exchange tokens 3 times', 'Different project combinations', 'Single session'],
        harmonyPointsReward: 750,
        tokenReward: 300,
        unlocked: false,
        progress: 0,
        maxProgress: 3
      },
      {
        id: 'daily-wanderer',
        name: 'Daily Wanderer',
        description: 'Visit projects every day for a week',
        criteria: ['Daily project visits', '7 consecutive days', 'At least 2 projects per day'],
        harmonyPointsReward: 1000,
        tokenReward: 500,
        unlocked: false,
        progress: 0,
        maxProgress: 7
      },
      {
        id: 'cross-pollinator',
        name: 'Cross-Pollinator',
        description: 'Transfer skills between 5 different project combinations',
        criteria: ['Complete skill transfers', '5 different combinations', 'Within one month'],
        harmonyPointsReward: 1500,
        tokenReward: 750,
        unlocked: false,
        progress: 0,
        maxProgress: 5
      }
    ];
    setRoutingRewards(rewards);
  }, []);

  // Track route visits
  useEffect(() => {
    const projectRouteMap: Record<string, string> = {
      '/gaias-projects': PROJECT_HEADS.HEART_OF_GAIA,
      '/seed-splitter': PROJECT_HEADS.SEED_SPLITTER,
      '/clean-water': PROJECT_HEADS.CLEAN_WATER,
      '/coral-reef-restoration': PROJECT_HEADS.CORAL_REEF_RESTORATION,
      '/earth-aquarium-shrooms': PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS,
      '/eco-missions': PROJECT_HEADS.RAILING_ENERGY,
      '/planet-cleaning': PROJECT_HEADS.FREEZE_CAPITAL
    };

    const currentRoute = location.pathname;
    const projectId = projectRouteMap[currentRoute];

    if (projectId) {
      const newVisit: RouteVisit = {
        route: currentRoute,
        projectId,
        timestamp: new Date(),
        duration: 0,
        actionsPerformed: 0
      };

      setVisitHistory(prev => {
        const updated = [...prev, newVisit];
        // Keep only last 50 visits
        return updated.slice(-50);
      });

      // Update daily progress
      const today = new Date().toDateString();
      const todayVisits = visitHistory.filter(v => v.timestamp.toDateString() === today).length;
      setDailyProgress(Math.min((todayVisits / 5) * 100, 100));

      // Check and update rewards
      checkRewardProgress(newVisit);
    }
  }, [location.pathname]);

  const checkRewardProgress = (newVisit: RouteVisit) => {
    setRoutingRewards(prev => prev.map(reward => {
      const updated = { ...reward };

      switch (reward.id) {
        case 'explorer-novice':
          const recentProjects = getRecentUniqueProjects(3);
          updated.progress = recentProjects.length;
          if (recentProjects.length >= 3 && !reward.unlocked) {
            updated.unlocked = true;
            synergyService.addHarmonyPoints(reward.harmonyPointsReward);
          }
          break;

        case 'harmony-seeker':
          const last24Hours = visitHistory.filter(v => 
            Date.now() - v.timestamp.getTime() < 24 * 60 * 60 * 1000
          );
          const uniqueProjects24h = new Set(last24Hours.map(v => v.projectId)).size;
          updated.progress = uniqueProjects24h;
          if (uniqueProjects24h >= 5 && !reward.unlocked) {
            updated.unlocked = true;
            synergyService.addHarmonyPoints(reward.harmonyPointsReward);
          }
          break;

        case 'daily-wanderer':
          updated.progress = routeStreak.consecutiveDays;
          if (routeStreak.consecutiveDays >= 7 && !reward.unlocked) {
            updated.unlocked = true;
            synergyService.addHarmonyPoints(reward.harmonyPointsReward);
          }
          break;
      }

      return updated;
    }));
  };

  const getRecentUniqueProjects = (hours: number = 1): string[] => {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    const recentVisits = visitHistory.filter(v => v.timestamp.getTime() > cutoff);
    return Array.from(new Set(recentVisits.map(v => v.projectId)));
  };

  const navigateToProject = (route: string) => {
    navigate(route);
  };

  const getRewardColor = (reward: RoutingReward) => {
    if (reward.unlocked) return 'text-yellow-400 border-yellow-500';
    if (reward.progress > 0) return 'text-blue-400 border-blue-500';
    return 'text-gray-400 border-gray-500';
  };

  const getStreakBonus = () => {
    if (routeStreak.currentStreak >= 10) return 3.0;
    if (routeStreak.currentStreak >= 5) return 2.0;
    if (routeStreak.currentStreak >= 3) return 1.5;
    return 1.0;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-teal-900/30">
          <CardContent className="p-4 text-center">
            <Route className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{visitHistory.length}</div>
            <div className="text-sm text-green-300">Total Visits</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{getRecentUniqueProjects(24).length}/5</div>
            <div className="text-sm text-blue-300">Projects Today</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{routeStreak.currentStreak}</div>
            <div className="text-sm text-purple-300">Current Streak</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{getStreakBonus()}x</div>
            <div className="text-sm text-yellow-300">Streak Bonus</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-orange-400" />
            <span className="text-orange-400">Daily Exploration Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Daily Target: Visit 5 Different Projects</span>
              <span>{Math.floor(dailyProgress)}%</span>
            </div>
            <Progress value={dailyProgress} className="h-3" />
            <div className="text-sm text-gray-400">
              Visited {getRecentUniqueProjects(24).length} projects today
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-cyan-400" />
              <span className="text-cyan-400">Weekly Cross-Project Challenge</span>
            </div>
            <Badge className="bg-cyan-600">
              {weeklyChallenge.timeRemaining} left
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-300">Complete 15 cross-project actions this week</p>
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{weeklyChallenge.completed}/{weeklyChallenge.target}</span>
            </div>
            <Progress value={(weeklyChallenge.completed / weeklyChallenge.target) * 100} className="h-3" />
            <div className="text-sm text-cyan-400">
              Reward: 2000 Harmony Points + Special Badge
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routing Rewards */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center text-white">🏆 Routing Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routingRewards.map(reward => (
            <Card key={reward.id} className={`border-2 ${getRewardColor(reward).split(' ')[1]}/50`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className={getRewardColor(reward).split(' ')[0]}>{reward.name}</span>
                  <div className="flex items-center space-x-2">
                    {reward.unlocked && <Trophy className="h-5 w-5 text-yellow-400" />}
                    <Badge className={reward.unlocked ? 'bg-yellow-600' : 'bg-gray-600'}>
                      {reward.progress}/{reward.maxProgress}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">{reward.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">Criteria:</div>
                    {reward.criteria.map((criterion, idx) => (
                      <div key={idx} className="text-xs text-gray-300">• {criterion}</div>
                    ))}
                  </div>
                  <Progress value={(reward.progress / reward.maxProgress) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-400">
                      {reward.harmonyPointsReward} Harmony Points
                    </span>
                    <span className="text-green-400">
                      {reward.tokenReward} Tokens
                    </span>
                  </div>
                  {reward.unlocked && (
                    <Badge className="w-full text-center bg-yellow-600">
                      ✅ Reward Claimed!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-green-400" />
            <span className="text-green-400">Quick Project Navigation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/gaias-projects')}
              className="border-red-500/50 text-red-400 hover:bg-red-900/30"
            >
              💚 Heart of Gaia
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/seed-splitter')}
              className="border-green-500/50 text-green-400 hover:bg-green-900/30"
            >
              🌱 Seed Splitter
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/clean-water')}
              className="border-blue-500/50 text-blue-400 hover:bg-blue-900/30"
            >
              💧 Clean Water
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/coral-reef-restoration')}
              className="border-orange-500/50 text-orange-400 hover:bg-orange-900/30"
            >
              🪸 Coral Restoration
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/earth-aquarium-shrooms')}
              className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30"
            >
              🍄 Earth Aquarium
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigateToProject('/unified-cross-project-dashboard')}
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/30"
            >
              🌍 Unified Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}