import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Award, 
  Target, 
  BookOpen, 
  Shield, 
  Trophy,
  Star,
  MapPin,
  Clock,
  Play,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Flame,
  TreePine,
  Droplets,
  Wind,
  Zap,
  Bell,
  Settings,
  TrendingUp,
  Globe,
  Radio
} from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionRate: number;
  userProgress: number;
  certificateAvailable: boolean;
  category: 'fire-safety' | 'equipment' | 'communication' | 'leadership';
}

interface Community {
  id: string;
  name: string;
  region: string;
  members: number;
  activeCannons: number;
  responseTime: number;
  safetyScore: number;
  recentAlerts: number;
  coordinator: {
    name: string;
    avatar: string;
    experience: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  rewards: string;
  unlocked: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community' | 'global';
  duration: string;
  participants: number;
  reward: string;
  progress: number;
  maxProgress: number;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

const CommunityEngagementHub = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [userLevel, setUserLevel] = useState(12);
  const [userExperience, setUserExperience] = useState(2450);
  const [nextLevelXp, setNextLevelXp] = useState(2800);

  const trainingModules: TrainingModule[] = [
    {
      id: 'fs-001',
      title: 'Wildfire Basics & Safety',
      description: 'Essential knowledge about wildfire behavior, safety protocols, and prevention strategies.',
      duration: 45,
      difficulty: 'beginner',
      completionRate: 87,
      userProgress: 100,
      certificateAvailable: true,
      category: 'fire-safety'
    },
    {
      id: 'fs-002',
      title: 'Sand Cannon Operation',
      description: 'Hands-on training for operating and maintaining forest defense sand cannon systems.',
      duration: 90,
      difficulty: 'intermediate',
      completionRate: 65,
      userProgress: 75,
      certificateAvailable: true,
      category: 'equipment'
    },
    {
      id: 'fs-003',
      title: 'Emergency Communication',
      description: 'Communication protocols, radio operation, and coordination during emergency responses.',
      duration: 60,
      difficulty: 'intermediate',
      completionRate: 72,
      userProgress: 45,
      certificateAvailable: true,
      category: 'communication'
    },
    {
      id: 'fs-004',
      title: 'Community Leadership',
      description: 'Advanced leadership skills for coordinating local forest defense initiatives.',
      duration: 120,
      difficulty: 'advanced',
      completionRate: 34,
      userProgress: 0,
      certificateAvailable: true,
      category: 'leadership'
    }
  ];

  const communities: Community[] = [
    {
      id: 'redwood-guardians',
      name: 'Redwood Guardians',
      region: 'Northern California',
      members: 147,
      activeCannons: 12,
      responseTime: 18,
      safetyScore: 94,
      recentAlerts: 3,
      coordinator: {
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        experience: 4
      }
    },
    {
      id: 'sierra-defenders',
      name: 'Sierra Defenders',
      region: 'Central California',
      members: 203,
      activeCannons: 18,
      responseTime: 22,
      safetyScore: 91,
      recentAlerts: 7,
      coordinator: {
        name: 'Mike Rodriguez',
        avatar: '/avatars/mike.jpg',
        experience: 6
      }
    },
    {
      id: 'olympic-shield',
      name: 'Olympic Shield',
      region: 'Washington State',
      members: 89,
      activeCannons: 8,
      responseTime: 15,
      safetyScore: 97,
      recentAlerts: 1,
      coordinator: {
        name: 'Emma Thompson',
        avatar: '/avatars/emma.jpg',
        experience: 3
      }
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-response',
      title: 'First Responder',
      description: 'Completed your first emergency response',
      icon: '🚨',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      rewards: '50 COMM tokens',
      unlocked: true
    },
    {
      id: 'fire-prevention',
      title: 'Fire Prevention Expert',
      description: 'Successfully prevented 10 potential wildfires',
      icon: '🛡️',
      rarity: 'rare',
      progress: 7,
      maxProgress: 10,
      rewards: '200 COMM tokens + Badge',
      unlocked: false
    },
    {
      id: 'community-leader',
      title: 'Community Leader',
      description: 'Led 5 successful community training sessions',
      icon: '👑',
      rarity: 'epic',
      progress: 3,
      maxProgress: 5,
      rewards: '500 COMM tokens + Leadership Certificate',
      unlocked: false
    },
    {
      id: 'guardian-legend',
      title: 'Forest Guardian Legend',
      description: 'Achieved legendary status in forest protection',
      icon: '🌲',
      rarity: 'legendary',
      progress: 2,
      maxProgress: 10,
      rewards: '1000 COMM tokens + Exclusive NFT',
      unlocked: false
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'winter-preparedness',
      title: 'Winter Preparedness Challenge',
      description: 'Prepare your community for winter fire season with equipment checks and training',
      type: 'community',
      duration: '2 weeks',
      participants: 1247,
      reward: '100 COMM per participant',
      progress: 8,
      maxProgress: 12,
      endDate: '2024-12-30T23:59:59Z',
      status: 'active'
    },
    {
      id: 'global-training-week',
      title: 'Global Training Week',
      description: 'Complete 3 training modules during the global training initiative',
      type: 'global',
      duration: '1 week',
      participants: 5643,
      reward: '250 COMM + Certificate',
      progress: 2,
      maxProgress: 3,
      endDate: '2024-12-25T23:59:59Z',
      status: 'active'
    },
    {
      id: 'rapid-response',
      title: 'Rapid Response Mastery',
      description: 'Achieve sub-15 minute response times in 5 consecutive alerts',
      type: 'individual',
      duration: '1 month',
      participants: 234,
      reward: '500 COMM + Expert Badge',
      progress: 3,
      maxProgress: 5,
      endDate: '2025-01-15T23:59:59Z',
      status: 'active'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fire-safety': return Flame;
      case 'equipment': return Settings;
      case 'communication': return Radio;
      case 'leadership': return Users;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-purple-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Community Engagement Hub</h1>
                <p className="text-lg text-gray-600">Training, coordination, and community building for forest defenders</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">Your Level</div>
                <div className="text-2xl font-bold text-purple-600">{userLevel}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Experience</div>
                <div className="text-lg font-semibold">{userExperience}/{nextLevelXp}</div>
                <Progress value={(userExperience / nextLevelXp) * 100} className="w-20 h-2 mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">Training</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3/4</div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <Badge variant="outline">Achievements</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1/4</div>
              <div className="text-sm text-gray-600">Unlocked</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Challenges</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Shield className="h-8 w-8 text-red-600" />
                <Badge variant="outline">Responses</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trainingModules.map((module) => {
                const CategoryIcon = getCategoryIcon(module.category);
                return (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className="h-6 w-6 text-blue-600" />
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Your Progress</span>
                          <span>{module.userProgress}%</span>
                        </div>
                        <Progress value={module.userProgress} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Duration</div>
                            <div className="font-semibold flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {module.duration} min
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Completion Rate</div>
                            <div className="font-semibold">{module.completionRate}%</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            {module.userProgress === 0 ? 'Start' : 
                             module.userProgress === 100 ? 'Review' : 'Continue'}
                          </Button>
                          {module.userProgress === 100 && module.certificateAvailable && (
                            <Button variant="outline">
                              <Award className="h-4 w-4 mr-2" />
                              Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Local Communities</CardTitle>
                    <CardDescription>
                      Connect with forest defense communities in your region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communities.map((community) => (
                        <div 
                          key={community.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedCommunity?.id === community.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedCommunity(community)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{community.name}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                {community.region}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Safety Score</div>
                              <div className="text-2xl font-bold text-green-600">{community.safetyScore}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Members</div>
                              <div className="font-semibold flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {community.members}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Cannons</div>
                              <div className="font-semibold flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                {community.activeCannons}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Response</div>
                              <div className="font-semibold flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {community.responseTime}min
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Alerts</div>
                              <div className="font-semibold flex items-center">
                                <Bell className="h-4 w-4 mr-1" />
                                {community.recentAlerts}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={community.coordinator.avatar} />
                                <AvatarFallback>
                                  {community.coordinator.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <div className="font-semibold">{community.coordinator.name}</div>
                                <div className="text-gray-600">{community.coordinator.experience}yr coordinator</div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Join Community
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedCommunity && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Details</CardTitle>
                      <CardDescription>{selectedCommunity.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Safety Score:</span>
                            <span className="font-semibold text-green-600">{selectedCommunity.safetyScore}/100</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-semibold">{selectedCommunity.responseTime} min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active Members:</span>
                            <span className="font-semibold">{selectedCommunity.members}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Defense Coverage:</span>
                            <span className="font-semibold">{selectedCommunity.activeCannons} cannons</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-semibold mb-3">Recent Activity</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Training session completed</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span>3 fire alerts this week</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span>12 new members joined</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Community Chat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? 'border-yellow-300 bg-yellow-50' : ''}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className={`flex items-center space-x-2 ${achievement.unlocked ? 'text-yellow-700' : ''}`}>
                          <span>{achievement.title}</span>
                          {achievement.unlocked && <CheckCircle className="h-5 w-5 text-yellow-600" />}
                        </CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                        <div className="text-sm font-semibold">
                          {achievement.progress}/{achievement.maxProgress}
                        </div>
                      </div>
                      
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2" 
                      />
                      
                      <div className="text-sm">
                        <div className="text-gray-600">Rewards:</div>
                        <div className="font-semibold text-green-600">{achievement.rewards}</div>
                      </div>

                      {achievement.unlocked && (
                        <Button className="w-full">
                          <Award className="h-4 w-4 mr-2" />
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          <span>{challenge.title}</span>
                        </CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                          {challenge.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {challenge.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Duration</div>
                          <div className="font-semibold flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {challenge.duration}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Participants</div>
                          <div className="font-semibold flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {challenge.participants.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Reward</div>
                          <div className="font-semibold text-green-600">{challenge.reward}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Ends</div>
                          <div className="font-semibold">
                            {new Date(challenge.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Progress: {challenge.progress}/{challenge.maxProgress}
                          </span>
                          <span className="text-sm text-gray-600">
                            {Math.round((challenge.progress / challenge.maxProgress) * 100)}% Complete
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Participate
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                    Top Responders
                  </CardTitle>
                  <CardDescription>Community members with fastest response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { rank: 1, name: 'Alex Forest', time: '12 min', responses: 45, avatar: '/avatars/alex.jpg' },
                      { rank: 2, name: 'Maria Silva', time: '14 min', responses: 42, avatar: '/avatars/maria.jpg' },
                      { rank: 3, name: 'John Oak', time: '15 min', responses: 38, avatar: '/avatars/john.jpg' },
                      { rank: 4, name: 'Lisa Green', time: '16 min', responses: 35, avatar: '/avatars/lisa.jpg' },
                      { rank: 5, name: 'David Pine', time: '17 min', responses: 33, avatar: '/avatars/david.jpg' }
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.rank}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.responses} responses</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{user.time}</div>
                          <div className="text-xs text-gray-500">avg time</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Top Contributors
                  </CardTitle>
                  <CardDescription>Most active community members this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { rank: 1, name: 'Sarah Chen', points: 2450, level: 15, avatar: '/avatars/sarah.jpg' },
                      { rank: 2, name: 'Mike Rodriguez', points: 2340, level: 14, avatar: '/avatars/mike.jpg' },
                      { rank: 3, name: 'Emma Thompson', points: 2120, level: 13, avatar: '/avatars/emma.jpg' },
                      { rank: 4, name: 'Carlos Martinez', points: 1980, level: 12, avatar: '/avatars/carlos.jpg' },
                      { rank: 5, name: 'Anna Wilson', points: 1850, level: 12, avatar: '/avatars/anna.jpg' }
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.rank}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-600">Level {user.level}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-purple-600">{user.points.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">XP</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-600" />
                  Global Statistics
                </CardTitle>
                <CardDescription>Forest Shield community impact worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">12,547</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-600">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">45,678</div>
                    <div className="text-sm text-gray-600">Training Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">2,890</div>
                    <div className="text-sm text-gray-600">Fires Prevented</div>
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

export default CommunityEngagementHub;