import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Droplets,
  Carrot,
  Home,
  BookOpen,
  Users,
  Zap,
  TreePine,
  Coins,
  Trophy,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Globe,
  Accessibility,
  AlertTriangle,
  Clock,
  Palette,
  ShoppingBag,
  Star,
  MapPin,
  Vote,
  Recycle,
} from "lucide-react";
import { toast } from "sonner";

// Import all the earning activity components
import { WaterSavingActions } from "@/components/earning/WaterSavingActions";
import { HomeGrownFoodActions } from "@/components/earning/HomeGrownFoodActions";
import { BeeHotelActions } from "@/components/earning/BeeHotelActions";
import { EnvironmentalEducationActions } from "@/components/earning/EnvironmentalEducationActions";
import { ReferralSystem } from "@/components/earning/ReferralSystem";
import { SkillBasedEarning } from "@/components/earning/SkillBasedEarning";
import { CarbonCreditActions } from "@/components/earning/CarbonCreditActions";
import CarFreeEarnTile from "@/components/earning/CarFreeEarnTile";
import { useEarningActivities, useUserProfile } from "@/hooks/useEarningSystem";

interface NewEarningActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  pointsEarned: number;
  tokensEarned: number;
  timestamp: Date;
  verified: boolean;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
}

export default function EarningActivitiesDashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userLevel, setUserLevel] = useState(12);
  const [totalActivities, setTotalActivities] = useState(147);
  const [achievements, setAchievements] = useState([
    {
      id: "1",
      name: "Water Guardian",
      progress: 85,
      maxProgress: 100,
      icon: "💧",
      rarity: "rare",
    },
    {
      id: "2",
      name: "Green Thumb",
      progress: 92,
      maxProgress: 100,
      icon: "🌱",
      rarity: "epic",
    },
    {
      id: "3",
      name: "Bee Protector",
      progress: 67,
      maxProgress: 100,
      icon: "🐝",
      rarity: "uncommon",
    },
    {
      id: "4",
      name: "Carbon Warrior",
      progress: 78,
      maxProgress: 100,
      icon: "🌍",
      rarity: "rare",
    },
    {
      id: "5",
      name: "Innovation Master",
      progress: 45,
      maxProgress: 100,
      icon: "💡",
      rarity: "legendary",
    },
  ]);

  const { activities, isLoading } = useEarningActivities("user-123");
  const { profile, stats } = useUserProfile("user-123");

  // All comprehensive earning activities with complete types
  const allEarningActivities = [
    {
      id: "water_saving",
      title: "💧 Water Conservation",
      description: "Save water through various conservation methods",
      icon: <Droplets className="h-5 w-5" />,
      color: "from-blue-600 to-cyan-600",
      category: "environmental",
      basePoints: 10,
      component: <WaterSavingActions />,
      examples: [
        "Rain collection",
        "Greywater reuse",
        "Leak repair",
        "Low-flow fixtures",
      ],
    },
    {
      id: "home_grown_food",
      title: "🥕 Home Grown Food",
      description: "Grow your own food and share knowledge",
      icon: <Carrot className="h-5 w-5" />,
      color: "from-orange-600 to-red-600",
      category: "sustainability",
      basePoints: 20,
      component: <HomeGrownFoodActions />,
      examples: [
        "Vegetable gardens",
        "Herb cultivation",
        "Fruit trees",
        "Seed sharing",
      ],
    },
    {
      id: "bee_hotel",
      title: "🐝 Bee Hotel Maintenance",
      description: "Support local pollinators with bee hotels",
      icon: <Home className="h-5 w-5" />,
      color: "from-yellow-600 to-orange-600",
      category: "biodiversity",
      basePoints: 25,
      component: <BeeHotelActions />,
      examples: [
        "Bamboo tubes",
        "Wood blocks",
        "Clay tubes",
        "Mixed materials",
      ],
    },
    {
      id: "environmental_education",
      title: "📚 Environmental Education",
      description: "Learn and teach environmental topics",
      icon: <BookOpen className="h-5 w-5" />,
      color: "from-blue-600 to-purple-600",
      category: "education",
      basePoints: 15,
      component: <EnvironmentalEducationActions />,
      examples: [
        "Course completion",
        "Teaching others",
        "Content creation",
        "Research",
      ],
    },
    {
      id: "referral",
      title: "👥 Referral System",
      description: "Invite friends and earn ongoing bonuses",
      icon: <Users className="h-5 w-5" />,
      color: "from-purple-600 to-pink-600",
      category: "community",
      basePoints: 50,
      component: <ReferralSystem />,
      examples: [
        "Friend invitations",
        "Family referrals",
        "Community building",
        "Network growth",
      ],
    },
    {
      id: "skill_based",
      title: "⚡ Skill-Based Earning",
      description: "Use your professional skills for eco projects",
      icon: <Zap className="h-5 w-5" />,
      color: "from-cyan-600 to-blue-600",
      category: "professional",
      basePoints: 10,
      component: <SkillBasedEarning />,
      examples: [
        "Programming",
        "Design",
        "Writing",
        "Consulting",
        "Teaching",
        "Translation",
      ],
    },
    {
      id: "carbon_credit",
      title: "🌱 Carbon Credit Actions",
      description: "Offset carbon emissions through verified actions",
      icon: <TreePine className="h-5 w-5" />,
      color: "from-green-600 to-emerald-600",
      category: "climate",
      basePoints: 30,
      component: <CarbonCreditActions />,
      examples: [
        "Tree planting",
        "Renewable energy",
        "Carbon sequestration",
        "Emission reduction",
      ],
    },
    {
      id: "mission_voting",
      title: "🗳️ Mission Voting",
      description: "Vote on community missions and proposals",
      icon: <Vote className="h-4 w-4" />,
      color: "from-indigo-600 to-purple-600",
      category: "governance",
      basePoints: 25,
      component: <MissionVotingActions />,
      examples: [
        "Mission approval",
        "Budget allocation",
        "Priority setting",
        "Impact assessment",
      ],
    },
    {
      id: "location_mission",
      title: "📍 Location-Based Missions",
      description: "Complete missions in specific geographic areas",
      icon: <MapPin className="h-4 w-4" />,
      color: "from-red-600 to-pink-600",
      category: "community",
      basePoints: 35,
      component: <LocationMissionActions />,
      examples: [
        "Local cleanups",
        "Area surveys",
        "Community projects",
        "Regional initiatives",
      ],
    },
    {
      id: "nft_marketplace",
      title: "🎨 NFT Marketplace",
      description: "Trade eco-themed NFTs and digital art",
      icon: <Palette className="h-4 w-4" />,
      color: "from-purple-600 to-pink-600",
      category: "digital",
      basePoints: 20,
      component: <NFTMarketplaceActions />,
      examples: [
        "Eco art creation",
        "NFT trading",
        "Digital collectibles",
        "Impact certificates",
      ],
    },
    {
      id: "emergency_response",
      title: "🚨 Emergency Response",
      description: "Help during environmental emergencies",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "from-red-600 to-orange-600",
      category: "emergency",
      basePoints: 100,
      component: <EmergencyResponseActions />,
      examples: [
        "Wildfire support",
        "Flood assistance",
        "Disaster relief",
        "Crisis coordination",
      ],
    },
    {
      id: "long_term_commitment",
      title: "⏱️ Long-Term Commitments",
      description: "Maintain consistent eco-friendly habits",
      icon: <Clock className="h-4 w-4" />,
      color: "from-green-600 to-blue-600",
      category: "lifestyle",
      basePoints: 40,
      component: <LongTermCommitmentActions />,
      examples: [
        "Daily actions",
        "Weekly challenges",
        "Monthly goals",
        "Yearly pledges",
      ],
    },
    {
      id: "innovation",
      title: "💡 Innovation Bonus",
      description: "Create new solutions for environmental challenges",
      icon: <Lightbulb className="h-4 w-4" />,
      color: "from-yellow-600 to-green-600",
      category: "innovation",
      basePoints: 75,
      component: <InnovationBonusActions />,
      examples: [
        "New solutions",
        "Improvements",
        "Research",
        "Patents",
        "Open source",
      ],
    },
    {
      id: "accessibility",
      title: "♿ Accessibility Rewards",
      description: "Make sustainability accessible to everyone",
      icon: <Accessibility className="h-4 w-4" />,
      color: "from-blue-600 to-purple-600",
      category: "inclusion",
      basePoints: 30,
      component: <AccessibilityRewardActions />,
      examples: [
        "Inclusive design",
        "Accessibility testing",
        "Barrier removal",
        "Education",
      ],
    },
  ];

  const categories = [
    {
      value: "all",
      label: "All Categories",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "environmental",
      label: "Environmental",
      icon: <TreePine className="h-4 w-4" />,
    },
    {
      value: "sustainability",
      label: "Sustainability",
      icon: <Recycle className="h-4 w-4" />,
    },
    {
      value: "biodiversity",
      label: "Biodiversity",
      icon: <Home className="h-4 w-4" />,
    },
    {
      value: "education",
      label: "Education",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      value: "community",
      label: "Community",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "professional",
      label: "Professional",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: "climate",
      label: "Climate Action",
      icon: <TreePine className="h-4 w-4" />,
    },
    {
      value: "governance",
      label: "Governance",
      icon: <Vote className="h-4 w-4" />,
    },
    {
      value: "digital",
      label: "Digital Assets",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      value: "emergency",
      label: "Emergency Response",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      value: "lifestyle",
      label: "Lifestyle",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      value: "innovation",
      label: "Innovation",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      value: "inclusion",
      label: "Inclusion",
      icon: <Accessibility className="h-4 w-4" />,
    },
  ];

  const filteredActivities = allEarningActivities.filter(
    (activity) =>
      selectedCategory === "all" || activity.category === selectedCategory,
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          🌍 Earning Activities Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Complete eco-friendly activities and earn GAiA tokens while making a
          positive impact
        </p>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold text-green-400">24,567</p>
                <p className="text-xs text-green-300">+1,234 this week</p>
              </div>
              <Star className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GAiA Tokens</p>
                <p className="text-3xl font-bold text-blue-400">4,890</p>
                <p className="text-xs text-blue-300">+245 this week</p>
              </div>
              <Coins className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-3xl font-bold text-purple-400">
                  {userLevel}
                </p>
                <p className="text-xs text-purple-300">
                  2,340 XP to next level
                </p>
              </div>
              <Trophy className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="text-3xl font-bold text-orange-400">
                  {totalActivities}
                </p>
                <p className="text-xs text-orange-300">12 this week</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-purple-400">
                Level Progress
              </h3>
              <Badge className="bg-purple-600">Level {userLevel}</Badge>
            </div>
            <Progress value={75} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>7,660 XP</span>
              <span>10,000 XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4">
        <Select
          value={selectedTimeFilter}
          onValueChange={setSelectedTimeFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  {category.icon}
                  {category.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Achievements Section */}
      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Award className="h-5 w-5" />
            🏆 Achievements Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center space-y-2">
                <div className="text-4xl">{achievement.icon}</div>
                <h4 className="font-semibold text-sm">{achievement.name}</h4>
                <Progress value={achievement.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {achievement.progress}% complete
                </p>
                <Badge
                  className={`text-xs ${
                    achievement.rarity === "legendary"
                      ? "bg-yellow-600"
                      : achievement.rarity === "epic"
                        ? "bg-purple-600"
                        : achievement.rarity === "rare"
                          ? "bg-blue-600"
                          : "bg-green-600"
                  }`}
                >
                  {achievement.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Earning Activities */}
      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activities">All Activities</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CarFreeEarnTile />
            {filteredActivities.map((activity) => (
              <Card
                key={activity.id}
                className={`bg-gradient-to-br ${activity.color}/20 border-opacity-50 hover:scale-105 transition-all duration-300`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {activity.icon}
                    {activity.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={`bg-gradient-to-r ${activity.color}`}>
                      {activity.basePoints} pts base
                    </Badge>
                    <Badge className="bg-gray-600">{activity.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Examples:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {activity.examples.map((example, index) => (
                        <li key={index}>• {example}</li>
                      ))}
                    </ul>
                  </div>

                  {activity.component && (
                    <div className="mt-4">{activity.component}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 10).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className="bg-green-600">
                        +{activity.pointsEarned} points
                      </Badge>
                      <Badge className="bg-blue-600">
                        +{activity.tokensEarned} tokens
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Placeholder components for the missing activity types
function MissionVotingActions() {
  return (
    <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
      <p className="text-sm text-indigo-300">
        Vote on community missions and earn governance tokens
      </p>
    </div>
  );
}

function LocationMissionActions() {
  return (
    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
      <p className="text-sm text-red-300">
        Complete location-based environmental missions
      </p>
    </div>
  );
}

function NFTMarketplaceActions() {
  return (
    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
      <p className="text-sm text-purple-300">
        Trade eco-themed NFTs and digital environmental certificates
      </p>
    </div>
  );
}

function EmergencyResponseActions() {
  return (
    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
      <p className="text-sm text-red-300">
        Respond to environmental emergencies and disasters
      </p>
    </div>
  );
}

function LongTermCommitmentActions() {
  return (
    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
      <p className="text-sm text-green-300">
        Maintain long-term environmental commitments
      </p>
    </div>
  );
}

function InnovationBonusActions() {
  return (
    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
      <p className="text-sm text-yellow-300">
        Create innovative solutions for environmental challenges
      </p>
    </div>
  );
}

function AccessibilityRewardActions() {
  return (
    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
      <p className="text-sm text-blue-300">
        Make sustainability accessible to everyone
      </p>
    </div>
  );
}
