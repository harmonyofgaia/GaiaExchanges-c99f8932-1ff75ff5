import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Target, 
  MapPin, 
  Clock,
  Star,
  Zap,
  Recycle,
  TreePine,
  Droplets,
  Globe,
  Users,
  Award,
  CheckCircle,
  RefreshCw,
  Calendar,
  TrendingUp,
  Lightbulb,
  Heart,
  Shield,
  Gift,
  ChevronRight,
  Settings
} from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'cleanup' | 'conservation' | 'education' | 'community' | 'energy' | 'water' | 'transport';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  location: string;
  distance: number;
  rewards: {
    points: number;
    gaia: number;
    exp: number;
  };
  requirements: string[];
  impact: string;
  participants?: number;
  deadline?: string;
  status: 'available' | 'active' | 'completed' | 'expired';
  progress?: number;
  maxProgress?: number;
}

interface UserPreferences {
  availableTime: number; // hours per week
  travelRadius: number; // km
  preferredCategories: string[];
  difficultyLevel: 'easy' | 'medium' | 'hard' | 'mixed';
  groupActivity: boolean;
  sustainabilityFocus: string[];
}

const EcoMissionGenerator = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    availableTime: 4,
    travelRadius: 15,
    preferredCategories: ['cleanup', 'conservation'],
    difficultyLevel: 'medium',
    groupActivity: true,
    sustainabilityFocus: ['plastic-reduction', 'biodiversity']
  });

  const [activeMissions, setActiveMissions] = useState<Mission[]>([
    {
      id: 'mission-001',
      title: 'Riverside Cleanup Challenge',
      description: 'Join a community effort to clean plastic waste from the local river system',
      category: 'cleanup',
      difficulty: 'medium',
      duration: '3 hours',
      location: 'Riverside Park',
      distance: 2.3,
      rewards: { points: 250, gaia: 50, exp: 150 },
      requirements: ['Gloves provided', 'Bring water bottle', 'Weather appropriate clothing'],
      impact: 'Remove 50-100kg of plastic waste, protect aquatic life',
      participants: 47,
      deadline: '2024-02-20',
      status: 'active',
      progress: 65,
      maxProgress: 100
    },
    {
      id: 'mission-002',
      title: 'Urban Garden Maintenance',
      description: 'Help maintain the community garden by watering, weeding, and harvesting',
      category: 'conservation',
      difficulty: 'easy',
      duration: '2 hours',
      location: 'Community Center Garden',
      distance: 1.8,
      rewards: { points: 150, gaia: 30, exp: 100 },
      requirements: ['Garden tools provided', 'Comfortable clothes', 'Sun protection'],
      impact: 'Support local food production, reduce carbon footprint',
      participants: 23,
      deadline: '2024-02-18',
      status: 'active',
      progress: 40,
      maxProgress: 60
    }
  ]);

  const [suggestedMissions, setSuggestedMissions] = useState<Mission[]>([
    {
      id: 'mission-101',
      title: 'Beach Plastic Survey',
      description: 'Conduct a scientific survey of plastic pollution on local beaches',
      category: 'cleanup',
      difficulty: 'medium',
      duration: '4 hours',
      location: 'Sunset Beach',
      distance: 8.5,
      rewards: { points: 300, gaia: 75, exp: 200 },
      requirements: ['Data collection app', 'Camera', 'Transportation'],
      impact: 'Contribute to marine pollution research',
      status: 'available'
    },
    {
      id: 'mission-102',
      title: 'Tree Planting Initiative',
      description: 'Plant native trees in areas affected by deforestation',
      category: 'conservation',
      difficulty: 'hard',
      duration: '6 hours',
      location: 'Green Valley Reserve',
      distance: 12.3,
      rewards: { points: 500, gaia: 125, exp: 350 },
      requirements: ['Physical fitness', 'Work gloves', 'Lunch provided'],
      impact: 'Plant 100+ trees, restore ecosystem',
      participants: 156,
      status: 'available'
    },
    {
      id: 'mission-103',
      title: 'Energy Audit Workshop',
      description: 'Learn to conduct home energy audits and help neighbors reduce consumption',
      category: 'energy',
      difficulty: 'easy',
      duration: '3 hours',
      location: 'Local Library',
      distance: 3.2,
      rewards: { points: 200, gaia: 40, exp: 120 },
      requirements: ['Note-taking materials', 'Calculator app'],
      impact: 'Help 10 households reduce energy use by 15%',
      participants: 12,
      status: 'available'
    }
  ]);

  const [userStats] = useState({
    completedMissions: 23,
    totalPoints: 5840,
    totalGaia: 1680,
    currentLevel: 12,
    weeklyGoal: 8,
    weeklyProgress: 5,
    streak: 7,
    impactScore: 2450
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleanup': return Recycle;
      case 'conservation': return TreePine;
      case 'education': return Lightbulb;
      case 'community': return Users;
      case 'energy': return Zap;
      case 'water': return Droplets;
      case 'transport': return Globe;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'conservation': return 'text-green-600 bg-green-100 border-green-300';
      case 'education': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'community': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'energy': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'water': return 'text-cyan-600 bg-cyan-100 border-cyan-300';
      case 'transport': return 'text-indigo-600 bg-indigo-100 border-indigo-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'hard': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'expired': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const generateNewMissions = () => {
    // Simulate AI-powered mission generation based on user preferences
    console.log('Generating new missions based on preferences:', userPreferences);
    // In a real implementation, this would call an AI service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 to-blue-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            🎯 Eco-Mission Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AI-powered personalized environmental missions tailored to your location, schedule, and interests. 
            Make a real impact while earning rewards!
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-teal-600 text-white px-4 py-2">
              Level {userStats.currentLevel}
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">
              {userStats.streak} Day Streak
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              {userStats.totalPoints} Points
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="active">Active Missions</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* User Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Missions</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.completedMissions}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +3 this week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                  <Star className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.impactScore.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <Heart className="h-3 w-3 inline mr-1" />
                    Environmental impact
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GAIA Earned</CardTitle>
                  <Gift className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalGaia}</div>
                  <p className="text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 inline mr-1" />
                    Lifetime earnings
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                  <Target className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.weeklyProgress}/{userStats.weeklyGoal}</div>
                  <p className="text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Missions completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Weekly Mission Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>This Week's Goal</span>
                    <span>{userStats.weeklyProgress} / {userStats.weeklyGoal} missions</span>
                  </div>
                  <Progress value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} className="h-3" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  You're doing great! Complete {userStats.weeklyGoal - userStats.weeklyProgress} more missions to reach your weekly goal.
                </div>
              </CardContent>
            </Card>

            {/* Quick Mission Generator */}
            <Card className="border-teal-500/30 bg-teal-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-600">
                  <RefreshCw className="h-5 w-5" />
                  Quick Mission Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get personalized mission recommendations based on your location, schedule, and preferences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <div className="font-medium">Right Now</div>
                    <div className="text-sm text-muted-foreground">30min - 2 hours</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <div className="font-medium">This Weekend</div>
                    <div className="text-sm text-muted-foreground">Half or full day</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <MapPin className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <div className="font-medium">Near Me</div>
                    <div className="text-sm text-muted-foreground">Within {userPreferences.travelRadius}km</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                  onClick={generateNewMissions}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Personalized Missions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              {activeMissions.map((mission) => {
                const CategoryIcon = getCategoryIcon(mission.category);
                return (
                  <Card key={mission.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{mission.title}</h3>
                            <Badge className={getCategoryColor(mission.category)}>
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {mission.category}
                            </Badge>
                            <Badge className={getDifficultyColor(mission.difficulty)}>
                              {mission.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{mission.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.participants} joined</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">Due {mission.deadline}</span>
                            </div>
                          </div>

                          {mission.progress !== undefined && mission.maxProgress && (
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{mission.progress}% complete</span>
                              </div>
                              <Progress value={mission.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-green-600">+{mission.rewards.points} Points</span>
                            <span className="text-blue-600">+{mission.rewards.gaia} GAIA</span>
                            <span className="text-purple-600">+{mission.rewards.exp} XP</span>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <Badge className={`${getStatusColor(mission.status)} text-white`}>
                            {mission.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                          View Details
                        </Button>
                        <Button variant="outline">
                          Share Mission
                        </Button>
                        {mission.status === 'active' && (
                          <Button variant="outline" className="text-red-600 border-red-300">
                            Pause Mission
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recommended Missions</h2>
                <Button variant="outline" onClick={generateNewMissions}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Recommendations
                </Button>
              </div>

              {suggestedMissions.map((mission) => {
                const CategoryIcon = getCategoryIcon(mission.category);
                return (
                  <Card key={mission.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{mission.title}</h3>
                            <Badge className={getCategoryColor(mission.category)}>
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {mission.category}
                            </Badge>
                            <Badge className={getDifficultyColor(mission.difficulty)}>
                              {mission.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{mission.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.location} ({mission.distance}km)</span>
                            </div>
                            {mission.participants && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-600" />
                                <span className="text-sm">{mission.participants} interested</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{mission.impact}</span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <h4 className="font-medium">Requirements:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {mission.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-green-600">+{mission.rewards.points} Points</span>
                            <span className="text-blue-600">+{mission.rewards.gaia} GAIA</span>
                            <span className="text-purple-600">+{mission.rewards.exp} XP</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                          <ChevronRight className="h-4 w-4 mr-2" />
                          Accept Mission
                        </Button>
                        <Button variant="outline">
                          Learn More
                        </Button>
                        <Button variant="outline">
                          Save for Later
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-cyan-500/30 bg-cyan-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-600">
                  <Settings className="h-5 w-5" />
                  Mission Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Available Time per Week</Label>
                    <div className="mt-2">
                      <Slider
                        value={[userPreferences.availableTime]}
                        onValueChange={(value) => setUserPreferences(prev => ({ ...prev, availableTime: value[0] }))}
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1 hour</span>
                        <span className="font-medium">{userPreferences.availableTime} hours</span>
                        <span>20 hours</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Travel Radius</Label>
                    <div className="mt-2">
                      <Slider
                        value={[userPreferences.travelRadius]}
                        onValueChange={(value) => setUserPreferences(prev => ({ ...prev, travelRadius: value[0] }))}
                        max={50}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1 km</span>
                        <span className="font-medium">{userPreferences.travelRadius} km</span>
                        <span>50 km</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Preferred Categories</Label>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { key: 'cleanup', label: 'Cleanup', icon: Recycle },
                        { key: 'conservation', label: 'Conservation', icon: TreePine },
                        { key: 'education', label: 'Education', icon: Lightbulb },
                        { key: 'community', label: 'Community', icon: Users },
                        { key: 'energy', label: 'Energy', icon: Zap },
                        { key: 'water', label: 'Water', icon: Droplets },
                        { key: 'transport', label: 'Transport', icon: Globe }
                      ].map(({ key, label, icon: Icon }) => (
                        <Button
                          key={key}
                          variant={userPreferences.preferredCategories.includes(key) ? "default" : "outline"}
                          className="h-16 flex flex-col gap-1"
                          onClick={() => {
                            setUserPreferences(prev => ({
                              ...prev,
                              preferredCategories: prev.preferredCategories.includes(key)
                                ? prev.preferredCategories.filter(c => c !== key)
                                : [...prev.preferredCategories, key]
                            }));
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Difficulty Preference</Label>
                    <div className="mt-3 flex gap-3">
                      {['easy', 'medium', 'hard', 'mixed'].map((level) => (
                        <Button
                          key={level}
                          variant={userPreferences.difficultyLevel === level ? "default" : "outline"}
                          onClick={() => setUserPreferences(prev => ({ ...prev, difficultyLevel: level as any }))}
                          className="capitalize"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-600">Mission History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: 'Park Cleanup Drive', 
                      date: '2024-01-15', 
                      category: 'cleanup', 
                      status: 'completed',
                      impact: 'Collected 25kg of litter',
                      rewards: { points: 200, gaia: 40, exp: 120 }
                    },
                    { 
                      title: 'Tree Planting Workshop', 
                      date: '2024-01-08', 
                      category: 'conservation', 
                      status: 'completed',
                      impact: 'Planted 15 native trees',
                      rewards: { points: 300, gaia: 60, exp: 180 }
                    },
                    { 
                      title: 'Energy Conservation Talk', 
                      date: '2024-01-03', 
                      category: 'education', 
                      status: 'completed',
                      impact: 'Educated 30 community members',
                      rewards: { points: 150, gaia: 30, exp: 90 }
                    }
                  ].map((mission, index) => {
                    const CategoryIcon = getCategoryIcon(mission.category);
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                            <CategoryIcon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{mission.title}</span>
                            <Badge className={getCategoryColor(mission.category)}>
                              {mission.category}
                            </Badge>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {mission.impact}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-green-600">+{mission.rewards.points} Points</span>
                            <span className="text-blue-600">+{mission.rewards.gaia} GAIA</span>
                            <span className="text-purple-600">+{mission.rewards.exp} XP</span>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {mission.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcoMissionGenerator;