import { useState, Suspense, lazy } from "react";
import { EarningCategories } from "./EarningCategories";
// Dynamic imports for all large feature components
const GaiaBikeEarning = lazy(() =>
  import("@/components/earning/GaiaBikeEarning").then((m) => ({
    default: m.GaiaBikeEarning,
  })),
);
const EnhancedBadgeSystem = lazy(() =>
  import("@/components/earning/EnhancedBadgeSystem").then((m) => ({
    default: m.EnhancedBadgeSystem,
  })),
);
const PhotoVerificationSystem = lazy(() =>
  import("@/components/earning/PhotoVerificationSystem").then((m) => ({
    default: m.PhotoVerificationSystem,
  })),
);
const LocationBasedMissions = lazy(() =>
  import("@/components/community/LocationBasedMissions").then((m) => ({
    default: m.LocationBasedMissions,
  })),
);
const CommunityProjectVoting = lazy(() =>
  import("@/components/community/CommunityProjectVoting").then((m) => ({
    default: m.CommunityProjectVoting,
  })),
);
const TeamChallenges = lazy(() =>
  import("@/components/earning/TeamChallenges").then((m) => ({
    default: m.TeamChallenges,
  })),
);
const TokenStakingSystem = lazy(() =>
  import("@/components/earning/TokenStakingSystem").then((m) => ({
    default: m.TokenStakingSystem,
  })),
);
const AdvancedTokenMechanics = lazy(() =>
  import("@/components/earning/AdvancedTokenMechanics").then((m) => ({
    default: m.AdvancedTokenMechanics,
  })),
);
const CommunityGovernance = lazy(() =>
  import("@/components/community/CommunityGovernance").then((m) => ({
    default: m.CommunityGovernance,
  })),
);
const InteractiveFoodMap = lazy(() =>
  import("@/components/community/InteractiveFoodMap").then((m) => ({
    default: m.InteractiveFoodMap,
  })),
);
const EcosystemIntegration = lazy(() =>
  import("@/components/earning/EcosystemIntegration").then((m) => ({
    default: m.EcosystemIntegration,
  })),
);
const MentorshipProgram = lazy(() =>
  import("@/components/earning/MentorshipProgram").then((m) => ({
    default: m.MentorshipProgram,
  })),
);
const BeeHotelActions = lazy(() =>
  import("@/components/earning/BeeHotelActions").then((m) => ({
    default: m.BeeHotelActions,
  })),
);
const WaterSavingActions = lazy(() =>
  import("@/components/earning/WaterSavingActions").then((m) => ({
    default: m.WaterSavingActions,
  })),
);
const CarbonCreditActions = lazy(() =>
  import("@/components/earning/CarbonCreditActions").then((m) => ({
    default: m.CarbonCreditActions,
  })),
);
const EnvironmentalEducationActions = lazy(() =>
  import("@/components/earning/EnvironmentalEducationActions").then((m) => ({
    default: m.EnvironmentalEducationActions,
  })),
);
const HomeGrownFoodActions = lazy(() =>
  import("@/components/earning/HomeGrownFoodActions").then((m) => ({
    default: m.HomeGrownFoodActions,
  })),
);
const ReferralSystem = lazy(() =>
  import("@/components/earning/ReferralSystem").then((m) => ({
    default: m.ReferralSystem,
  })),
);
const SkillBasedEarning = lazy(() =>
  import("@/components/earning/SkillBasedEarning").then((m) => ({
    default: m.SkillBasedEarning,
  })),
);
const TreePlantingActions = lazy(() =>
  import("@/components/earning/TreePlantingActions").then((m) => ({
    default: m.TreePlantingActions,
  })),
);
const SolarPanelActions = lazy(() =>
  import("@/components/earning/SolarPanelActions").then((m) => ({
    default: m.SolarPanelActions,
  })),
);
const RecyclingActions = lazy(() =>
  import("@/components/earning/RecyclingActions").then((m) => ({
    default: m.RecyclingActions,
  })),
);
const CompostingActions = lazy(() =>
  import("@/components/earning/CompostingActions").then((m) => ({
    default: m.CompostingActions,
  })),
);
const CommunityCleanupActions = lazy(() =>
  import("@/components/earning/CommunityCleanupActions").then((m) => ({
    default: m.CommunityCleanupActions,
  })),
);
const WildlifeConservationActions = lazy(() =>
  import("@/components/earning/WildlifeConservationActions").then((m) => ({
    default: m.WildlifeConservationActions,
  })),
);
const CommunityRewardsProgram = lazy(() =>
  import("@/components/earning/CommunityRewardsProgram").then((m) => ({
    default: m.CommunityRewardsProgram,
  })),
);
const AdvancedCommunityFeatures = lazy(() =>
  import("@/components/earning/AdvancedCommunityFeatures").then((m) => ({
    default: m.AdvancedCommunityFeatures,
  })),
);
const PartyEventEarning = lazy(() =>
  import("@/components/earning/PartyEventEarning").then((m) => ({
    default: m.PartyEventEarning,
  })),
);
const EcoTravelRewards = lazy(() =>
  import("@/components/earning/EcoTravelRewards").then((m) => ({
    default: m.EcoTravelRewards,
  })),
);
const InteractiveEcoBikeMap = lazy(() =>
  import("@/components/earning/InteractiveEcoBikeMap").then((m) => ({
    default: m.InteractiveEcoBikeMap,
  })),
);
const EnhancedHomeGrownFoodTracker = lazy(() =>
  import("@/components/earning/EnhancedHomeGrownFoodTracker").then((m) => ({
    default: m.EnhancedHomeGrownFoodTracker,
  })),
);
const PublicTransportRewards = lazy(() =>
  import("@/components/earning/PublicTransportRewards").then((m) => ({
    default: m.PublicTransportRewards,
  })),
);
const GreenShoppingRewards = lazy(() =>
  import("@/components/earning/GreenShoppingRewards").then((m) => ({
    default: m.GreenShoppingRewards,
  })),
);
const EnergyConsumptionTracker = lazy(() =>
  import("@/components/earning/EnergyConsumptionTracker").then((m) => ({
    default: m.EnergyConsumptionTracker,
  })),
);
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { InteractiveGlobeMenu } from "@/components/earning/InteractiveGlobeMenu";
import {
  Zap,
  Trophy,
  Camera,
  MapPin,
  Target,
  Vote,
  Users,
  Lock,
  Coins,
  Crown,
  Globe,
  GraduationCap,
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Gift,
  PartyPopper,
  Plane,
  Bike,
  Carrot,
  Bus,
  ShoppingBag,
  Home,
  TreePine,
  Sun,
  RotateCcw,
  Leaf,
  Bird,
  Award,
  Heart,
  Lightbulb,
} from "lucide-react";

// Import all earning components
// import { GaiaBikeEarning } from "@/components/earning/GaiaBikeEarning";
// import { EnhancedBadgeSystem } from "@/components/earning/EnhancedBadgeSystem";
// import { PhotoVerificationSystem } from "@/components/earning/PhotoVerificationSystem";
// import { LocationBasedMissions } from "@/components/community/LocationBasedMissions";
// import { CommunityProjectVoting } from "@/components/community/CommunityProjectVoting";
// import { TeamChallenges } from "@/components/earning/TeamChallenges";
// import { TokenStakingSystem } from "@/components/earning/TokenStakingSystem";
// import { AdvancedTokenMechanics } from "@/components/earning/AdvancedTokenMechanics";
// import { CommunityGovernance } from "@/components/community/CommunityGovernance";
// import { InteractiveFoodMap } from "@/components/community/InteractiveFoodMap";
// import { EcosystemIntegration } from "@/components/earning/EcosystemIntegration";
// import { MentorshipProgram } from "@/components/earning/MentorshipProgram";

export default function EarningActivities() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");
  // User stats
  const [userStats] = useState({
    totalTokens: 4890,
    weeklyEarnings: 347,
    completedActivities: 156,
    currentLevel: 8,
    badgesEarned: 23,
    co2Offset: 245.7,
    communityRank: 47,
    streakDays: 23,
  });

  // If a category is selected, show the category view
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
        <div className="container mx-auto">
          <EarningCategories
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        </div>
      </div>
    );
  }

  const earningCategories = [
    {
      id: "foundation",
      title: "🔰 Essential Eco Actions",
      description: "Core environmental activities for all levels",
      color: "from-green-900/30 to-emerald-900/30",
      borderColor: "border-green-500/30",
      completedCount: 12,
      totalCount: 15,
      components: [
        {
          component: BeeHotelActions,
          icon: Home,
          title: "Bee Hotel Maintenance",
          points: "25 pts",
          difficulty: "Easy",
        },
        {
          component: WaterSavingActions,
          icon: Zap,
          title: "Water Conservation",
          points: "0.1 pts/L",
          difficulty: "Easy",
        },
        {
          component: CarbonCreditActions,
          icon: TreePine,
          title: "Carbon Credits",
          points: "10 pts/kg",
          difficulty: "Easy",
        },
        {
          component: EnvironmentalEducationActions,
          icon: GraduationCap,
          title: "Environmental Education",
          points: "15 pts",
          difficulty: "Easy",
        },
        {
          component: TreePlantingActions,
          icon: TreePine,
          title: "Tree Planting",
          points: "50 pts/tree",
          difficulty: "Medium",
        },
      ],
    },
    {
      id: "lifestyle",
      title: "🏡 Sustainable Lifestyle",
      description: "Daily living and consumption choices",
      color: "from-blue-900/30 to-cyan-900/30",
      borderColor: "border-blue-500/30",
      completedCount: 18,
      totalCount: 20,
      components: [
        {
          component: EnhancedHomeGrownFoodTracker,
          icon: Carrot,
          title: "Home Food Growing",
          points: "Variable",
          difficulty: "Medium",
        },
        {
          component: EnergyConsumptionTracker,
          icon: Zap,
          title: "Energy Efficiency",
          points: "10 pts/kWh",
          difficulty: "Medium",
        },
        {
          component: GreenShoppingRewards,
          icon: ShoppingBag,
          title: "Sustainable Shopping",
          points: "2 pts/$",
          difficulty: "Easy",
        },
        {
          component: PublicTransportRewards,
          icon: Bus,
          title: "Public Transport",
          points: "2 pts/km",
          difficulty: "Easy",
        },
        {
          component: InteractiveEcoBikeMap,
          icon: Bike,
          title: "Eco Bike Routes",
          points: "Live tracking",
          difficulty: "Medium",
        },
      ],
    },
    {
      id: "environmental",
      title: "🌍 Environmental Action",
      description: "Direct environmental impact activities",
      color: "from-emerald-900/30 to-teal-900/30",
      borderColor: "border-emerald-500/30",
      completedCount: 14,
      totalCount: 17,
      components: [
        {
          component: SolarPanelActions,
          icon: Sun,
          title: "Solar Installations",
          points: "Variable",
          difficulty: "Hard",
        },
        {
          component: RecyclingActions,
          icon: RotateCcw,
          title: "Recycling Programs",
          points: "Material bonus",
          difficulty: "Easy",
        },
        {
          component: CompostingActions,
          icon: Leaf,
          title: "Composting",
          points: "5 pts/kg",
          difficulty: "Easy",
        },
        {
          component: WildlifeConservationActions,
          icon: Bird,
          title: "Wildlife Conservation",
          points: "100+ pts",
          difficulty: "Hard",
        },
        {
          component: CommunityCleanupActions,
          icon: Users,
          title: "Community Cleanups",
          points: "Leadership bonus",
          difficulty: "Medium",
        },
      ],
    },
    {
      id: "community",
      title: "🎉 Community & Events",
      description: "Social engagement and community building",
      color: "from-purple-900/30 to-pink-900/30",
      borderColor: "border-purple-500/30",
      completedCount: 8,
      totalCount: 12,
      components: [
        {
          component: PartyEventEarning,
          icon: PartyPopper,
          title: "Environmental Events",
          points: "200+ pts",
          difficulty: "Medium",
        },
        {
          component: AdvancedCommunityFeatures,
          icon: Users,
          title: "Community Hub",
          points: "Variable",
          difficulty: "Medium",
        },
        {
          component: LocationBasedMissions,
          icon: MapPin,
          title: "Local Missions",
          points: "Location bonus",
          difficulty: "Medium",
        },
        {
          component: CommunityProjectVoting,
          icon: Vote,
          title: "Project Voting",
          points: "10 pts/vote",
          difficulty: "Easy",
        },
        {
          component: TeamChallenges,
          icon: Trophy,
          title: "Team Challenges",
          points: "Team bonus",
          difficulty: "Medium",
        },
      ],
    },
    {
      id: "travel",
      title: "✈️ Eco Travel & Exploration",
      description: "Sustainable tourism and mobility",
      color: "from-cyan-900/30 to-blue-900/30",
      borderColor: "border-cyan-500/30",
      completedCount: 5,
      totalCount: 8,
      components: [
        {
          component: EcoTravelRewards,
          icon: Plane,
          title: "Sustainable Travel",
          points: "Transport bonus",
          difficulty: "Medium",
        },
        // GAiA Bike System moved to Live Activities tab
        // Food Map moved to Live Activities tab
      ],
    },
    {
      id: "advanced",
      title: "🚀 Advanced & Professional",
      description: "Expert-level activities and earning systems",
      color: "from-yellow-900/30 to-orange-900/30",
      borderColor: "border-yellow-500/30",
      completedCount: 11,
      totalCount: 15,
      components: [
        // Community Rewards Program moved to Achievements tab
        {
          component: AdvancedTokenMechanics,
          icon: Coins,
          title: "Token Mechanics",
          points: "Staking rewards",
          difficulty: "Advanced",
        },
        {
          component: TokenStakingSystem,
          icon: Lock,
          title: "Token Staking",
          points: "APY rewards",
          difficulty: "Advanced",
        },
        {
          component: SkillBasedEarning,
          icon: Star,
          title: "Skill-Based Work",
          points: "10 pts/hour",
          difficulty: "Medium",
        },
        {
          component: ReferralSystem,
          icon: Users,
          title: "Referral Program",
          points: "50 pts",
          difficulty: "Easy",
        },
      ],
    },
    {
      id: "systems",
      title: "🏛️ Governance & Systems",
      description: "Platform governance and ecosystem features",
      color: "from-gray-900/30 to-slate-900/30",
      borderColor: "border-gray-500/30",
      completedCount: 6,
      totalCount: 10,
      components: [
        // Modules moved to main achievements tab
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600";
      case "Medium":
        return "bg-yellow-600";
      case "Hard":
        return "bg-orange-600";
      case "Advanced":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const filteredCategories = earningCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.components.some((comp) =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleActivitySelect = (category: string, activityId: string) => {
    setSelectedCategory(earningCategories.find(cat => cat.id === category) || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Hero Header with Globe Integration */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative text-center space-y-6">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                GAiA Earning Universe
              </h1>
              <Globe className="h-12 w-12 text-blue-400 animate-spin" />
            </div>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              The world's most comprehensive environmental action and reward
              ecosystem. Earn GAiA tokens while making a real impact on our
              planet! 🌍
            </p>

            {/* Quick Access to Categories */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={() => (window.location.href = "/categories")}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Explore Categories & Globe
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">
                  {userStats.totalTokens.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total GAiA</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">
                  {userStats.weeklyEarnings}
                </div>
                <div className="text-xs text-muted-foreground">
                  Weekly Earnings
                </div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">
                  {userStats.completedActivities}
                </div>
                <div className="text-xs text-muted-foreground">
                  Activities Done
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">
                  Level {userStats.currentLevel}
                </div>
                <div className="text-xs text-muted-foreground">
                  Current Level
                </div>
              </div>
              <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-400">
                  {userStats.badgesEarned}
                </div>
                <div className="text-xs text-muted-foreground">
                  Badges Earned
                </div>
              </div>
              <div className="text-center p-4 bg-teal-900/30 rounded-lg border border-teal-500/20">
                <div className="text-2xl font-bold text-teal-400">
                  {userStats.co2Offset}kg
                </div>
                <div className="text-xs text-muted-foreground">CO2 Offset</div>
              </div>
              <div className="text-center p-4 bg-pink-900/30 rounded-lg border border-pink-500/20">
                <div className="text-2xl font-bold text-pink-400">
                  #{userStats.communityRank}
                </div>
                <div className="text-xs text-muted-foreground">
                  Community Rank
                </div>
              </div>
              <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/20">
                <div className="text-2xl font-bold text-red-400">
                  {userStats.streakDays}
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Navigation */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search earning activities, categories, or features..."
                className="text-lg h-12 bg-black/20 border-green-500/30"
              />
            </div>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 h-12">
              <Lightbulb className="h-5 w-5 mr-2" />
              Suggest New Activity
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8 h-16 bg-black/20">
            <TabsTrigger value="globe" className="text-base font-medium h-12">
              🌍 Globe Menu
            </TabsTrigger>
            <TabsTrigger
              value="overview"
              className="text-base font-medium h-12"
            >
              🌟 Overview
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="text-base font-medium h-12"
            >
              📂 Categories
            </TabsTrigger>
            <TabsTrigger value="live" className="text-base font-medium h-12">
              🔴 Live Activities
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="text-base font-medium h-12"
            >
              🏆 Achievements
            </TabsTrigger>
          </TabsList>

          {/* Globe Tab */}
          <TabsContent value="globe" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-3">
                🌍 Interactive Activity Globe
              </h2>
              <p className="text-lg text-muted-foreground">
                Navigate through activities using our 3D matrix-style globe
                interface
              </p>
            </div>

            <InteractiveGlobeMenu
              onActivitySelect={handleActivitySelect}
              categories={earningCategories}
            />

            {/* Selected Category Display */}
            {selectedCategory && (
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Selected Category: {selectedCategory.title}
                  </h3>
                  <p className="text-muted-foreground">
                    Click on another globe point to switch categories
                  </p>
                </div>
                <div className="bg-black/20 rounded-2xl p-6 border border-cyan-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.components.slice(0, 4).map((comp: any, index: number) => (
                      <Card key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-green-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <comp.icon className="h-6 w-6 text-green-400" />
                            <h4 className="font-bold text-green-400">{comp.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Reward: {comp.points}</p>
                          <Badge variant="outline" className="text-xs">
                            {comp.difficulty}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                 <Card
                  key={category.id}
                  className={`border-2 ${category.borderColor} bg-gradient-to-br ${category.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">
                        {category.title}
                      </h3>
                      <Badge className="bg-primary/20 text-primary">
                        {category.completedCount}/{category.totalCount}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress
                      value={
                        (category.completedCount / category.totalCount) * 100
                      }
                      className="h-3"
                    />

                    <div className="space-y-2">
                      {category.components.slice(0, 3).map((comp, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm bg-black/20 rounded-lg p-2"
                        >
                          <div className="flex items-center gap-2">
                            <comp.icon className="h-4 w-4 text-primary" />
                            <span className="truncate">{comp.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getDifficultyColor(comp.difficulty)}
                            >
                              {comp.difficulty}
                            </Badge>
                            <span className="text-xs text-yellow-400">
                              {comp.points}
                            </span>
                          </div>
                        </div>
                      ))}
                      {category.components.length > 3 && (
                        <div className="text-center text-sm text-muted-foreground">
                          +{category.components.length - 3} more activities...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab - Full Activities */}
          <TabsContent value="categories" className="space-y-12">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                      {category.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {category.completedCount}/{category.totalCount}
                    </div>
                    <Progress
                      value={
                        (category.completedCount / category.totalCount) * 100
                      }
                      className="w-32 h-3"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {category.components.map((comp, index) => (
                    <comp.component key={index} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Live Activities Tab */}
          <TabsContent value="live" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-3">
                🔴 Live Environmental Activities
              </h2>
              <p className="text-lg text-muted-foreground">
                Real-time earning opportunities and active community events
              </p>
            </div>

            <div className="space-y-8">
              <InteractiveEcoBikeMap />
              <GaiaBikeEarning />
              <InteractiveFoodMap />
              <EnergyConsumptionTracker />
              <AdvancedCommunityFeatures />
              <PartyEventEarning />
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-3">
                🏆 Achievements & Rewards
              </h2>
              <p className="text-lg text-muted-foreground">
                Your progress, badges, and reward systems
              </p>
            </div>

            <div className="space-y-8">
              <EnhancedBadgeSystem />
              <PhotoVerificationSystem />
              <MentorshipProgram />
              <EcosystemIntegration />
              <CommunityGovernance />
              <CommunityRewardsProgram />
              <AdvancedTokenMechanics />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="border-2 border-rainbow bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 p-8">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌟 Ready to Change the World?
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join millions of eco-warriors earning GAiA tokens while protecting
              our planet. Every action counts, every token matters, every person
              makes a difference! 🌍
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Your First Activity
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-900/20 px-8"
              >
                <Trophy className="h-5 w-5 mr-2" />
                View Global Impact
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
