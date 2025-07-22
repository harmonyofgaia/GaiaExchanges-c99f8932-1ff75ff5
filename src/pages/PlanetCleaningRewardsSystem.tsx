import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trash2, 
  Camera, 
  MapPin, 
  Trophy,
  Users,
  Target,
  CheckCircle,
  Upload,
  Recycle,
  Globe,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Gift,
  Zap,
  Heart,
  Shield
} from 'lucide-react';

interface CleanupActivity {
  id: string;
  userId: string;
  username: string;
  location: string;
  coordinates: { lat: number; lng: number };
  wasteType: string;
  weightKg: number;
  timestamp: string;
  verified: boolean;
  rewards: number;
  photos: string[];
  description: string;
  impactScore: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  timeLimit: string;
  reward: number;
  participants: number;
  status: 'active' | 'completed' | 'upcoming';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface UserStats {
  totalWasteCollected: number;
  totalRewards: number;
  activitiesCompleted: number;
  globalRank: number;
  impactScore: number;
  streak: number;
  level: number;
  nextLevelProgress: number;
}

const PlanetCleaningRewardsSystem = () => {
  const [userStats] = useState<UserStats>({
    totalWasteCollected: 147.5,
    totalRewards: 8940,
    activitiesCompleted: 89,
    globalRank: 342,
    impactScore: 2847,
    streak: 12,
    level: 8,
    nextLevelProgress: 67
  });

  const [recentActivities] = useState<CleanupActivity[]>([
    {
      id: 'act-001',
      userId: 'user-123',
      username: 'EcoWarrior2024',
      location: 'Central Park Beach',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      wasteType: 'Plastic bottles',
      weightKg: 12.5,
      timestamp: '2024-01-15T14:30:00Z',
      verified: true,
      rewards: 125,
      photos: ['photo1.jpg', 'photo2.jpg'],
      description: 'Cleaned up plastic bottles and containers from the beach area',
      impactScore: 150
    },
    {
      id: 'act-002',
      userId: 'user-456',
      username: 'OceanDefender',
      location: 'Santa Monica Pier',
      coordinates: { lat: 34.0194, lng: -118.4912 },
      wasteType: 'Mixed debris',
      weightKg: 8.3,
      timestamp: '2024-01-14T16:45:00Z',
      verified: true,
      rewards: 95,
      photos: ['photo3.jpg'],
      description: 'Collected various debris including cigarette butts and food wrappers',
      impactScore: 110
    }
  ]);

  const [activeChallenges] = useState<Challenge[]>([
    {
      id: 'chal-001',
      title: 'Ocean Cleanup Challenge',
      description: 'Collect plastic waste from beaches and waterways',
      target: 1000,
      current: 673,
      unit: 'kg',
      timeLimit: '7 days',
      reward: 5000,
      participants: 2847,
      status: 'active',
      difficulty: 'medium'
    },
    {
      id: 'chal-002',
      title: 'City Park Restoration',
      description: 'Clean up litter from urban parks and green spaces',
      target: 500,
      current: 234,
      unit: 'kg',
      timeLimit: '14 days',
      reward: 2500,
      participants: 1456,
      status: 'active',
      difficulty: 'easy'
    },
    {
      id: 'chal-003',
      title: 'Extreme Environment Cleanup',
      description: 'Tackle waste in hard-to-reach or hazardous areas',
      target: 100,
      current: 0,
      unit: 'kg',
      timeLimit: '30 days',
      reward: 10000,
      participants: 0,
      status: 'upcoming',
      difficulty: 'hard'
    }
  ]);

  const [newActivity, setNewActivity] = useState({
    location: '',
    wasteType: '',
    weight: '',
    description: '',
    photos: [] as File[]
  });

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
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'upcoming': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    const files = Array.from(event.target.files || []).filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type not allowed: ${file.name}`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File is too large (max 5 MB): ${file.name}`);
        return false;
      }
      return true;
    });
    setNewActivity(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-blue-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            🌍 Planet Cleaning Rewards System
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take action to clean our planet and earn rewards for verified environmental cleanup activities. 
            Every piece of waste removed makes a difference!
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-green-600 text-white px-4 py-2">
              Level {userStats.level}
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">
              Rank #{userStats.globalRank}
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              {userStats.streak} Day Streak
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submit">Submit Activity</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* User Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste Collected</CardTitle>
                  <Trash2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalWasteCollected} kg</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12.5 kg this week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                  <Gift className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalRewards.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 inline mr-1" />
                    +450 this week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                  <Star className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.impactScore.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <Heart className="h-3 w-3 inline mr-1" />
                    Top 15% globally
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activities</CardTitle>
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.activitiesCompleted}</div>
                  <p className="text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 inline mr-1" />
                    98% verified rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Level Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Level {userStats.level}</span>
                  <span>Level {userStats.level + 1}</span>
                </div>
                <Progress value={userStats.nextLevelProgress} className="h-4" />
                <div className="text-sm text-muted-foreground text-center">
                  {userStats.nextLevelProgress}% to next level
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-teal-500/30 bg-teal-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-600">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <Trash2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{activity.username}</span>
                        {activity.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {activity.location}
                      </div>
                      <div className="text-sm mb-2">{activity.description}</div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium">{activity.weightKg} kg {activity.wasteType}</span>
                        <span className="text-green-600">+{activity.rewards} rewards</span>
                        <span className="text-purple-600">Impact: {activity.impactScore}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <Card className="border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <Upload className="h-5 w-5" />
                  Submit Cleanup Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter cleanup location"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type</Label>
                    <Input
                      id="waste-type"
                      placeholder="e.g., Plastic bottles, Food containers"
                      value={newActivity.wasteType}
                      onChange={(e) => setNewActivity({...newActivity, wasteType: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight Collected (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={newActivity.weight}
                    onChange={(e) => setNewActivity({...newActivity, weight: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Describe your cleanup activity"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photos">Upload Photos (Required for Verification)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <div className="text-sm text-muted-foreground mb-2">
                      Drag and drop photos here, or click to select
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      Select Photos
                    </Button>
                  </div>
                  {newActivity.photos.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {newActivity.photos.length} photo(s) selected
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Verification Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Clear photos showing before and after cleanup</li>
                    <li>• GPS location will be automatically recorded</li>
                    <li>• Accurate weight estimation (will be verified)</li>
                    <li>• Activities are reviewed within 24 hours</li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit for Verification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{challenge.title}</h3>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(challenge.status)} text-white`}>
                          {challenge.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <Target className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                        <div className="font-bold">{challenge.current} / {challenge.target}</div>
                        <div className="text-sm text-muted-foreground">{challenge.unit} collected</div>
                      </div>
                      <div className="text-center">
                        <Gift className="h-5 w-5 mx-auto text-green-600 mb-1" />
                        <div className="font-bold">{challenge.reward.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Reward Points</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                        <div className="font-bold">{challenge.participants.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Participants</div>
                      </div>
                      <div className="text-center">
                        <Clock className="h-5 w-5 mx-auto text-orange-600 mb-1" />
                        <div className="font-bold">{challenge.timeLimit}</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{calculateProgress(challenge.current, challenge.target).toFixed(1)}%</span>
                      </div>
                      <Progress value={calculateProgress(challenge.current, challenge.target)} className="h-3" />
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty.toUpperCase()}
                      </Badge>
                      <Button 
                        disabled={challenge.status === 'completed'}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600"
                      >
                        {challenge.status === 'upcoming' ? 'Join Challenge' : 
                         challenge.status === 'active' ? 'Participate' : 'View Results'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-yellow-500/30 bg-yellow-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Trophy className="h-5 w-5" />
                  Global Cleanup Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, username: 'EcoChampion', points: 15420, waste: 345.2, badge: '🥇' },
                    { rank: 2, username: 'PlanetGuardian', points: 14850, waste: 298.7, badge: '🥈' },
                    { rank: 3, username: 'GreenHero2024', points: 13990, waste: 287.3, badge: '🥉' },
                    { rank: 4, username: 'OceanSaver', points: 12540, waste: 234.8, badge: '⭐' },
                    { rank: 5, username: 'EcoWarrior', points: 11780, waste: 198.5, badge: '⭐' }
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-2xl">{user.badge}</div>
                      <div className="flex-1">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.waste} kg collected • {user.points.toLocaleString()} points
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">#{user.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">🌟</div>
                    <div className="flex-1">
                      <div className="font-medium">Your Position</div>
                      <div className="text-sm text-muted-foreground">
                        {userStats.totalWasteCollected} kg collected • {userStats.totalRewards.toLocaleString()} points
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">#{userStats.globalRank}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="border-pink-500/30 bg-pink-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-pink-600">Available Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Eco-Friendly Water Bottle', cost: 500, category: 'Physical', icon: '💧' },
                    { name: '1000 GAIA Tokens', cost: 1000, category: 'Crypto', icon: '🪙' },
                    { name: 'Tree Planting Certificate', cost: 750, category: 'Impact', icon: '🌳' },
                    { name: 'Reusable Shopping Bag', cost: 300, category: 'Physical', icon: '🛍️' },
                    { name: 'Carbon Offset Credits', cost: 1500, category: 'Impact', icon: '🌍' },
                    { name: 'Eco Warrior NFT Badge', cost: 2000, category: 'Digital', icon: '🏆' }
                  ].map((reward, index) => (
                    <Card key={index} className="border-2 border-gray-200">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-4xl">{reward.icon}</div>
                          <h3 className="font-medium">{reward.name}</h3>
                          <Badge variant="outline">{reward.category}</Badge>
                          <div className="text-lg font-bold text-green-600">
                            {reward.cost} Points
                          </div>
                          <Button 
                            className="w-full"
                            disabled={userStats.totalRewards < reward.cost}
                          >
                            {userStats.totalRewards >= reward.cost ? 'Redeem' : 'Insufficient Points'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanetCleaningRewardsSystem;