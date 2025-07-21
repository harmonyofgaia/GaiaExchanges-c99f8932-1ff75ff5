import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Heart, 
  Sparkles, 
  TreePine, 
  Droplets, 
  Zap, 
  Globe,
  Star,
  Award,
  Shirt,
  Crown,
  Shield,
  Gem,
  Palette,
  Users,
  MessageCircle,
  Gift,
  TrendingUp
} from 'lucide-react';

interface EcoAvatar {
  id: string;
  name: string;
  level: number;
  soulPoints: number;
  experience: number;
  nextLevelExp: number;
  bodyType: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  outfit: string;
  accessories: string[];
  aura: string;
  evolutionStage: string;
}

interface GaiaSoulProfile {
  alignment: string;
  consciousness: number;
  harmony: number;
  wisdom: number;
  compassion: number;
  environmentalActions: number;
  communityContributions: number;
  spiritualGrowth: number;
}

interface CustomizationItem {
  id: string;
  name: string;
  category: 'outfit' | 'accessory' | 'hair' | 'aura';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  cost: number;
  requiredLevel: number;
  ecoActionsRequired?: number;
  unlocked: boolean;
}

const EcoAvatarGaiaSoulSystem = () => {
  const [avatar, setAvatar] = useState<EcoAvatar>({
    id: 'user-001',
    name: 'EcoWarrior',
    level: 15,
    soulPoints: 2847,
    experience: 7500,
    nextLevelExp: 10000,
    bodyType: 'athletic',
    skinTone: 'medium',
    hairStyle: 'flowing',
    hairColor: 'green',
    eyeColor: 'emerald',
    outfit: 'nature-guardian',
    accessories: ['leaf-crown', 'crystal-pendant'],
    aura: 'forest-glow',
    evolutionStage: 'guardian'
  });

  const [gaiaSoul, setGaiaSoul] = useState<GaiaSoulProfile>({
    alignment: 'Nature Guardian',
    consciousness: 85,
    harmony: 92,
    wisdom: 78,
    compassion: 88,
    environmentalActions: 234,
    communityContributions: 56,
    spiritualGrowth: 73
  });

  const [customizationItems] = useState<CustomizationItem[]>([
    {
      id: 'eco-warrior-outfit',
      name: 'Eco Warrior Armor',
      category: 'outfit',
      rarity: 'epic',
      cost: 1500,
      requiredLevel: 20,
      ecoActionsRequired: 100,
      unlocked: false
    },
    {
      id: 'crystal-wings',
      name: 'Crystal Wings',
      category: 'accessory',
      rarity: 'legendary',
      cost: 5000,
      requiredLevel: 25,
      ecoActionsRequired: 500,
      unlocked: false
    },
    {
      id: 'ocean-aura',
      name: 'Ocean Protection Aura',
      category: 'aura',
      rarity: 'rare',
      cost: 800,
      requiredLevel: 12,
      ecoActionsRequired: 50,
      unlocked: true
    }
  ]);

  const [friends] = useState([
    { name: 'TreeHugger92', level: 18, avatar: '🌳', status: 'online' },
    { name: 'OceanDefender', level: 22, avatar: '🌊', status: 'offline' },
    { name: 'SolarSage', level: 16, avatar: '☀️', status: 'online' }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-200';
      case 'rare': return 'text-blue-600 border-blue-200';
      case 'epic': return 'text-purple-600 border-purple-200';
      case 'legendary': return 'text-orange-600 border-orange-200';
      default: return 'text-gray-600 border-gray-200';
    }
  };

  const getEvolutionStages = () => [
    { name: 'Seedling', level: '1-5', icon: '🌱' },
    { name: 'Sprout', level: '6-10', icon: '🌿' },
    { name: 'Guardian', level: '11-20', icon: '🛡️', current: true },
    { name: 'Protector', level: '21-30', icon: '⚔️' },
    { name: 'Master', level: '31-50', icon: '👑' },
    { name: 'Transcendent', level: '51+', icon: '✨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 to-green-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600">
            🧘‍♀️ Eco-Avatar & GaiaSoul System
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Express your environmental consciousness through a personalized avatar that evolves with your eco-actions and spiritual growth.
          </p>
        </div>

        <Tabs defaultValue="avatar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="avatar">My Avatar</TabsTrigger>
            <TabsTrigger value="gaia-soul">GaiaSoul</TabsTrigger>
            <TabsTrigger value="customization">Customize</TabsTrigger>
            <TabsTrigger value="evolution">Evolution</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="avatar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Avatar Display */}
              <Card className="lg:col-span-1 border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-purple-600">
                    {avatar.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Image Placeholder */}
                  <div className="relative mx-auto w-48 h-48 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-purple-300 to-green-300 rounded-full flex items-center justify-center text-6xl">
                      🧙‍♀️
                    </div>
                    {/* Aura Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-pulse"></div>
                  </div>

                  {/* Level and Experience */}
                  <div className="text-center space-y-2">
                    <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                      Level {avatar.level} {avatar.evolutionStage}
                    </Badge>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Experience</span>
                        <span>{avatar.experience.toLocaleString()} / {avatar.nextLevelExp.toLocaleString()}</span>
                      </div>
                      <Progress value={(avatar.experience / avatar.nextLevelExp) * 100} className="h-2" />
                    </div>
                  </div>

                  {/* Soul Points */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ✨ {avatar.soulPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">GaiaSoul Points</div>
                  </div>
                </CardContent>
              </Card>

              {/* Avatar Stats & Traits */}
              <Card className="lg:col-span-2 border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-600">Avatar Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Appearance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Appearance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Body Type:</span>
                          <span className="capitalize">{avatar.bodyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Skin Tone:</span>
                          <span className="capitalize">{avatar.skinTone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hair Style:</span>
                          <span className="capitalize">{avatar.hairStyle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hair Color:</span>
                          <span className="capitalize">{avatar.hairColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eye Color:</span>
                          <span className="capitalize">{avatar.eyeColor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Equipment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Outfit:</span>
                          <span className="capitalize">{avatar.outfit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Aura:</span>
                          <span className="capitalize">{avatar.aura}</span>
                        </div>
                        <div>
                          <span>Accessories:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {avatar.accessories.map((accessory, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {accessory}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                      <Palette className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      Share Avatar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-600">Recent Eco-Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <TreePine className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">Planted Trees</div>
                      <div className="text-sm text-muted-foreground">+50 Soul Points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Droplets className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Ocean Cleanup</div>
                      <div className="text-sm text-muted-foreground">+75 Soul Points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Zap className="h-8 w-8 text-yellow-600" />
                    <div>
                      <div className="font-medium">Solar Energy</div>
                      <div className="text-sm text-muted-foreground">+30 Soul Points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaia-soul" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Soul Alignment */}
              <Card className="border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-600">
                    <Heart className="h-5 w-5" />
                    Soul Alignment: {gaiaSoul.alignment}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Environmental Consciousness</span>
                        <span>{gaiaSoul.consciousness}%</span>
                      </div>
                      <Progress value={gaiaSoul.consciousness} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Harmony with Nature</span>
                        <span>{gaiaSoul.harmony}%</span>
                      </div>
                      <Progress value={gaiaSoul.harmony} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Ecological Wisdom</span>
                        <span>{gaiaSoul.wisdom}%</span>
                      </div>
                      <Progress value={gaiaSoul.wisdom} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Universal Compassion</span>
                        <span>{gaiaSoul.compassion}%</span>
                      </div>
                      <Progress value={gaiaSoul.compassion} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Soul Statistics */}
              <Card className="border-cyan-500/30 bg-cyan-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-600">
                    <Star className="h-5 w-5" />
                    Soul Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-green-600" />
                        <span>Environmental Actions</span>
                      </div>
                      <span className="font-bold">{gaiaSoul.environmentalActions}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span>Community Contributions</span>
                      </div>
                      <span className="font-bold">{gaiaSoul.communityContributions}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span>Spiritual Growth</span>
                      </div>
                      <span className="font-bold">{gaiaSoul.spiritualGrowth}%</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                    Meditate for Soul Points
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Soul Traits */}
            <Card className="border-violet-500/30 bg-violet-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-violet-600">Spiritual Traits & Abilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <TreePine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <h4 className="font-medium">Forest Whisperer</h4>
                    <p className="text-sm text-muted-foreground">Connect with plant life</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Droplets className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <h4 className="font-medium">Water Guardian</h4>
                    <p className="text-sm text-muted-foreground">Purify water sources</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                    <h4 className="font-medium">Energy Harmonizer</h4>
                    <p className="text-sm text-muted-foreground">Balance energy flows</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Heart className="h-8 w-8 mx-auto text-pink-600 mb-2" />
                    <h4 className="font-medium">Empathic Healer</h4>
                    <p className="text-sm text-muted-foreground">Heal emotional wounds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {customizationItems.map((item) => (
                <Card key={item.id} className={`${getRarityColor(item.rarity)} border-2`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm">{item.name}</CardTitle>
                      <Badge className={getRarityColor(item.rarity)}>
                        {item.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <Shirt className="h-8 w-8 text-gray-600" />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cost:</span>
                        <span>{item.cost} SP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span>{item.requiredLevel}</span>
                      </div>
                      {item.ecoActionsRequired && (
                        <div className="flex justify-between">
                          <span>Eco Actions:</span>
                          <span>{item.ecoActionsRequired}</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full" 
                      disabled={!item.unlocked}
                    >
                      {item.unlocked ? 'Equip' : 'Locked'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Customization Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Shirt className="h-6 w-6" />
                    Outfits
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Crown className="h-6 w-6" />
                    Accessories
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Palette className="h-6 w-6" />
                    Hair Styles
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Sparkles className="h-6 w-6" />
                    Auras
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolution" className="space-y-6">
            <Card className="border-amber-500/30 bg-amber-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-600">Evolution Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEvolutionStages().map((stage, index) => (
                    <div 
                      key={stage.name} 
                      className={`flex items-center gap-4 p-4 border rounded-lg ${
                        stage.current ? 'bg-amber-50 border-amber-300' : 'bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl">{stage.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{stage.name}</h4>
                        <p className="text-sm text-muted-foreground">Level {stage.level}</p>
                      </div>
                      {stage.current && (
                        <Badge className="bg-amber-600 text-white">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-pink-500/30 bg-pink-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-600">
                    <Users className="h-5 w-5" />
                    Avatar Friends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {friends.map((friend, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="text-2xl">{friend.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium">{friend.name}</div>
                        <div className="text-sm text-muted-foreground">Level {friend.level}</div>
                      </div>
                      <Badge variant={friend.status === 'online' ? 'default' : 'secondary'}>
                        {friend.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-teal-500/30 bg-teal-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-600">
                    <Gift className="h-5 w-5" />
                    Community Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Join Avatar Guilds
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Avatar Competitions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Gift className="h-4 w-4 mr-2" />
                    Gift Exchange
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Avatar Chat Rooms
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcoAvatarGaiaSoulSystem;