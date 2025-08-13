import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  TrendingUp,
  Globe,
  TreePine,
  Home,
  Zap,
  Users,
  Award,
  PartyPopper,
  Plane,
  Bike,
  Carrot,
  Bus,
  ShoppingBag,
  Sun,
  RotateCcw,
  Leaf,
  Bird,
  Camera,
  MapPin,
  Vote,
  Trophy,
  Lock,
  Coins,
  Crown,
  GraduationCap,
  Gift,
  Sparkles,
  Heart,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// Import InteractiveGlobeMenu component
import { InteractiveGlobeMenu } from "@/components/earning/InteractiveGlobeMenu";

interface ActivityComponent {
  id: string;
  title: string;
  description: string;
  icon: any;
  points: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  category: string;
  subcategory?: string;
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  estimatedTime: string;
  carbonImpact: string;
  requiredLevel: number;
}

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("trending");

  // Comprehensive activity database
  const allActivities: ActivityComponent[] = [
    // Foundation Activities
    {
      id: "bee-hotel",
      title: "Bee Hotel Maintenance",
      description: "Build and maintain bee hotels to support local pollinator populations",
      icon: Home,
      points: "25 pts",
      difficulty: "Easy",
      category: "foundation",
      subcategory: "wildlife",
      featured: true,
      estimatedTime: "30 mins",
      carbonImpact: "Low",
      requiredLevel: 1,
    },
    {
      id: "water-saving",
      title: "Water Conservation",
      description: "Track and reduce water consumption with smart monitoring",
      icon: Zap,
      points: "0.1 pts/L",
      difficulty: "Easy",
      category: "foundation",
      subcategory: "resources",
      trending: true,
      estimatedTime: "Ongoing",
      carbonImpact: "Medium",
      requiredLevel: 1,
    },
    {
      id: "carbon-credits",
      title: "Carbon Credits",
      description: "Purchase and manage carbon offset credits for environmental impact",
      icon: TreePine,
      points: "10 pts/kg",
      difficulty: "Easy",
      category: "foundation",
      subcategory: "climate",
      estimatedTime: "15 mins",
      carbonImpact: "High",
      requiredLevel: 2,
    },
    {
      id: "environmental-education",
      title: "Environmental Education",
      description: "Learn about sustainability through interactive courses and quizzes",
      icon: GraduationCap,
      points: "15 pts",
      difficulty: "Easy",
      category: "foundation",
      subcategory: "education",
      new: true,
      estimatedTime: "45 mins",
      carbonImpact: "Indirect",
      requiredLevel: 1,
    },
    {
      id: "tree-planting",
      title: "Tree Planting",
      description: "Participate in local tree planting initiatives and track growth",
      icon: TreePine,
      points: "50 pts/tree",
      difficulty: "Medium",
      category: "foundation",
      subcategory: "reforestation",
      featured: true,
      estimatedTime: "2 hours",
      carbonImpact: "Very High",
      requiredLevel: 3,
    },

    // Lifestyle Activities
    {
      id: "home-food-growing",
      title: "Home Food Growing",
      description: "Track your home garden and food production with detailed analytics",
      icon: Carrot,
      points: "Variable",
      difficulty: "Medium",
      category: "lifestyle",
      subcategory: "food",
      trending: true,
      estimatedTime: "Daily care",
      carbonImpact: "Medium",
      requiredLevel: 2,
    },
    {
      id: "energy-efficiency",
      title: "Energy Efficiency",
      description: "Monitor and optimize your home energy consumption",
      icon: Zap,
      points: "10 pts/kWh",
      difficulty: "Medium",
      category: "lifestyle",
      subcategory: "energy",
      estimatedTime: "Monitoring",
      carbonImpact: "High",
      requiredLevel: 4,
    },
    {
      id: "sustainable-shopping",
      title: "Sustainable Shopping",
      description: "Choose eco-friendly products and track sustainable purchases",
      icon: ShoppingBag,
      points: "2 pts/$",
      difficulty: "Easy",
      category: "lifestyle",
      subcategory: "consumption",
      estimatedTime: "Per purchase",
      carbonImpact: "Medium",
      requiredLevel: 1,
    },
    {
      id: "public-transport",
      title: "Public Transport",
      description: "Use public transportation and track environmental savings",
      icon: Bus,
      points: "2 pts/km",
      difficulty: "Easy",
      category: "lifestyle",
      subcategory: "transport",
      estimatedTime: "Per trip",
      carbonImpact: "High",
      requiredLevel: 1,
    },
    {
      id: "eco-bike-routes",
      title: "Eco Bike Routes",
      description: "Discover and use bike-friendly routes with real-time tracking",
      icon: Bike,
      points: "Live tracking",
      difficulty: "Medium",
      category: "lifestyle",
      subcategory: "transport",
      featured: true,
      estimatedTime: "Per ride",
      carbonImpact: "High",
      requiredLevel: 2,
    },

    // Environmental Action
    {
      id: "solar-installations",
      title: "Solar Installations",
      description: "Install and manage solar panels for renewable energy",
      icon: Sun,
      points: "Variable",
      difficulty: "Hard",
      category: "environmental",
      subcategory: "renewable",
      featured: true,
      estimatedTime: "Project-based",
      carbonImpact: "Very High",
      requiredLevel: 8,
    },
    {
      id: "recycling-programs",
      title: "Recycling Programs",
      description: "Participate in advanced recycling and upcycling initiatives",
      icon: RotateCcw,
      points: "Material bonus",
      difficulty: "Easy",
      category: "environmental",
      subcategory: "waste",
      estimatedTime: "Ongoing",
      carbonImpact: "Medium",
      requiredLevel: 1,
    },
    {
      id: "composting",
      title: "Composting",
      description: "Create and maintain compost systems for organic waste",
      icon: Leaf,
      points: "5 pts/kg",
      difficulty: "Easy",
      category: "environmental",
      subcategory: "waste",
      trending: true,
      estimatedTime: "Weekly",
      carbonImpact: "Medium",
      requiredLevel: 2,
    },
    {
      id: "wildlife-conservation",
      title: "Wildlife Conservation",
      description: "Support local wildlife through conservation activities",
      icon: Bird,
      points: "100+ pts",
      difficulty: "Hard",
      category: "environmental",
      subcategory: "conservation",
      featured: true,
      estimatedTime: "Variable",
      carbonImpact: "Indirect",
      requiredLevel: 6,
    },
    {
      id: "community-cleanups",
      title: "Community Cleanups",
      description: "Organize and participate in local environmental cleanup events",
      icon: Users,
      points: "Leadership bonus",
      difficulty: "Medium",
      category: "environmental",
      subcategory: "community",
      estimatedTime: "Event-based",
      carbonImpact: "Medium",
      requiredLevel: 4,
    },

    // Community & Events
    {
      id: "environmental-events",
      title: "Environmental Events",
      description: "Host and attend eco-friendly parties and gatherings",
      icon: PartyPopper,
      points: "200+ pts",
      difficulty: "Medium",
      category: "community",
      subcategory: "events",
      new: true,
      estimatedTime: "Event planning",
      carbonImpact: "Variable",
      requiredLevel: 5,
    },
    {
      id: "community-hub",
      title: "Community Hub",
      description: "Engage with the community through forums and collaboration",
      icon: Users,
      points: "Variable",
      difficulty: "Medium",
      category: "community",
      subcategory: "social",
      trending: true,
      estimatedTime: "Ongoing",
      carbonImpact: "Indirect",
      requiredLevel: 3,
    },
    {
      id: "local-missions",
      title: "Local Missions",
      description: "Complete location-based environmental challenges",
      icon: MapPin,
      points: "Location bonus",
      difficulty: "Medium",
      category: "community",
      subcategory: "challenges",
      estimatedTime: "Variable",
      carbonImpact: "Variable",
      requiredLevel: 4,
    },
    {
      id: "project-voting",
      title: "Project Voting",
      description: "Vote on community environmental projects and initiatives",
      icon: Vote,
      points: "10 pts/vote",
      difficulty: "Easy",
      category: "community",
      subcategory: "governance",
      estimatedTime: "5 mins",
      carbonImpact: "Indirect",
      requiredLevel: 2,
    },
    {
      id: "team-challenges",
      title: "Team Challenges",
      description: "Collaborate in teams for large-scale environmental projects",
      icon: Trophy,
      points: "Team bonus",
      difficulty: "Medium",
      category: "community",
      subcategory: "collaboration",
      featured: true,
      estimatedTime: "Challenge duration",
      carbonImpact: "High",
      requiredLevel: 5,
    },

    // Travel & Exploration
    {
      id: "sustainable-travel",
      title: "Sustainable Travel",
      description: "Plan and execute eco-friendly travel experiences",
      icon: Plane,
      points: "Transport bonus",
      difficulty: "Medium",
      category: "travel",
      subcategory: "tourism",
      estimatedTime: "Trip planning",
      carbonImpact: "Variable",
      requiredLevel: 6,
    },
    {
      id: "gaia-bike-system",
      title: "GAiA Bike System",
      description: "Use the integrated bike sharing and tracking system",
      icon: Bike,
      points: "2 pts/km",
      difficulty: "Easy",
      category: "travel",
      subcategory: "local",
      trending: true,
      estimatedTime: "Per ride",
      carbonImpact: "High",
      requiredLevel: 1,
    },
    {
      id: "local-food-map",
      title: "Local Food Map",
      description: "Discover local sustainable food sources and farmers",
      icon: MapPin,
      points: "Discovery bonus",
      difficulty: "Easy",
      category: "travel",
      subcategory: "food",
      estimatedTime: "Exploration",
      carbonImpact: "Medium",
      requiredLevel: 2,
    },

    // Advanced & Professional
    {
      id: "rewards-program",
      title: "Rewards Program",
      description: "Advanced tier-based reward system with exclusive benefits",
      icon: Gift,
      points: "Tier-based",
      difficulty: "Advanced",
      category: "advanced",
      subcategory: "rewards",
      featured: true,
      estimatedTime: "Ongoing",
      carbonImpact: "Indirect",
      requiredLevel: 10,
    },
    {
      id: "token-mechanics",
      title: "Token Mechanics",
      description: "Advanced GAiA token staking and yield farming",
      icon: Coins,
      points: "Staking rewards",
      difficulty: "Advanced",
      category: "advanced",
      subcategory: "finance",
      estimatedTime: "Strategy-based",
      carbonImpact: "Indirect",
      requiredLevel: 12,
    },
    {
      id: "token-staking",
      title: "Token Staking",
      description: "Stake GAiA tokens for long-term environmental funding",
      icon: Lock,
      points: "APY rewards",
      difficulty: "Advanced",
      category: "advanced",
      subcategory: "finance",
      trending: true,
      estimatedTime: "Long-term",
      carbonImpact: "Indirect",
      requiredLevel: 8,
    },
    {
      id: "skill-based-work",
      title: "Skill-Based Work",
      description: "Complete professional environmental consulting work",
      icon: Star,
      points: "10 pts/hour",
      difficulty: "Medium",
      category: "advanced",
      subcategory: "professional",
      estimatedTime: "Project-based",
      carbonImpact: "High",
      requiredLevel: 7,
    },
    {
      id: "referral-program",
      title: "Referral Program",
      description: "Invite friends and family to join the GAiA ecosystem",
      icon: Users,
      points: "50 pts",
      difficulty: "Easy",
      category: "advanced",
      subcategory: "growth",
      estimatedTime: "One-time",
      carbonImpact: "Indirect",
      requiredLevel: 3,
    },

    // Governance & Systems
    {
      id: "community-governance",
      title: "Community Governance",
      description: "Participate in platform governance and decision making",
      icon: Crown,
      points: "Voting power",
      difficulty: "Advanced",
      category: "systems",
      subcategory: "governance",
      featured: true,
      estimatedTime: "Ongoing",
      carbonImpact: "Indirect",
      requiredLevel: 15,
    },
    {
      id: "ecosystem-integration",
      title: "Ecosystem Integration",
      description: "Connect with external environmental platforms and services",
      icon: Globe,
      points: "Cross-platform",
      difficulty: "Advanced",
      category: "systems",
      subcategory: "integration",
      estimatedTime: "Setup",
      carbonImpact: "Indirect",
      requiredLevel: 10,
    },
    {
      id: "mentorship-program",
      title: "Mentorship Program",
      description: "Teach or learn from environmental experts in the community",
      icon: GraduationCap,
      points: "Knowledge sharing",
      difficulty: "Medium",
      category: "systems",
      subcategory: "education",
      estimatedTime: "Ongoing",
      carbonImpact: "Indirect",
      requiredLevel: 8,
    },
    {
      id: "badge-system",
      title: "Badge System",
      description: "Earn and display achievement badges for completed activities",
      icon: Award,
      points: "Achievement unlocks",
      difficulty: "Easy",
      category: "systems",
      subcategory: "gamification",
      estimatedTime: "Ongoing",
      carbonImpact: "Indirect",
      requiredLevel: 1,
    },
    {
      id: "photo-verification",
      title: "Photo Verification",
      description: "Verify environmental activities with photo proof",
      icon: Camera,
      points: "Verification bonus",
      difficulty: "Easy",
      category: "systems",
      subcategory: "verification",
      estimatedTime: "Per activity",
      carbonImpact: "Indirect",
      requiredLevel: 2,
    },
  ];

  const categories = [
    { id: "all", name: "All Activities", icon: Grid3X3, color: "text-white" },
    { id: "foundation", name: "Essential Eco Actions", icon: TreePine, color: "text-green-400" },
    { id: "lifestyle", name: "Sustainable Lifestyle", icon: Home, color: "text-blue-400" },
    { id: "environmental", name: "Environmental Action", icon: Leaf, color: "text-emerald-400" },
    { id: "community", name: "Community & Events", icon: Users, color: "text-purple-400" },
    { id: "travel", name: "Eco Travel", icon: Plane, color: "text-cyan-400" },
    { id: "advanced", name: "Advanced & Professional", icon: Star, color: "text-yellow-400" },
    { id: "systems", name: "Governance & Systems", icon: Crown, color: "text-orange-400" },
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "Easy", name: "Easy" },
    { id: "Medium", name: "Medium" },
    { id: "Hard", name: "Hard" },
    { id: "Advanced", name: "Advanced" },
  ];

  const sortOptions = [
    { id: "trending", name: "Trending" },
    { id: "featured", name: "Featured" },
    { id: "new", name: "New" },
    { id: "points", name: "Points" },
    { id: "difficulty", name: "Difficulty" },
    { id: "alphabetical", name: "A-Z" },
  ];

  // Filter and sort activities
  const filteredActivities = allActivities
    .filter(activity => {
      const matchesSearch = searchQuery === "" || 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || activity.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "new":
          return (b.new ? 1 : 0) - (a.new ? 1 : 0);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "difficulty":
          const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3, "Advanced": 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-600";
      case "Medium": return "bg-yellow-600";
      case "Hard": return "bg-orange-600";
      case "Advanced": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High": return "text-green-400";
      case "High": return "text-emerald-400";
      case "Medium": return "text-yellow-400";
      case "Low": return "text-orange-400";
      case "Indirect": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        
        {/* Header with Interactive Globe */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Sparkles className="h-10 w-10 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                Activity Categories & Globe Explorer
              </h1>
              <Globe className="h-10 w-10 text-blue-400 animate-spin" />
            </div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-center mb-8">
              Explore our comprehensive environmental activities through categories or discover them on our interactive global map! 🌍
            </p>
            
            {/* Interactive Globe Menu */}
            <div className="bg-black/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-center mb-4 text-blue-400">🌍 Interactive Global Activity Map</h3>
              <InteractiveGlobeMenu 
                onActivitySelect={(category, activityId) => {
                  // Handle activity selection from globe
                  window.location.href = `/earning-activities?activity=${category}-${activityId}`;
                }}
                categories={[]} // Using empty array for Categories page - activities are shown in grid below
              />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/20 rounded-xl p-6 border border-gray-500/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-black/20 border border-gray-600 rounded-lg"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-black/20 border border-gray-600 rounded-lg"
            >
              {difficulties.map(diff => (
                <option key={diff.id} value={diff.id}>{diff.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-black/20 border border-gray-600 rounded-lg"
            >
              {sortOptions.map(sort => (
                <option key={sort.id} value={sort.id}>Sort by {sort.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {filteredActivities.length} activities found
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.slice(1).map(category => {
            const categoryActivities = allActivities.filter(a => a.category === category.id);
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id} 
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category.id 
                    ? 'ring-2 ring-blue-500 bg-blue-900/30' 
                    : 'bg-black/20'
                } border border-gray-500/30`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <IconComponent className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {categoryActivities.length} activities
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Activities Display */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
        }`}>
          {filteredActivities.map(activity => {
            const IconComponent = activity.icon;
            
            if (viewMode === "list") {
              return (
                <Card key={activity.id} className="bg-black/20 border border-gray-500/30 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{activity.title}</h3>
                          <p className="text-muted-foreground text-sm">{activity.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-green-400">{activity.points}</div>
                          <div className="text-xs text-muted-foreground">{activity.estimatedTime}</div>
                        </div>
                        <Badge className={getDifficultyColor(activity.difficulty)}>
                          {activity.difficulty}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            
            return (
              <Card key={activity.id} className="bg-black/20 border border-gray-500/30 hover:border-blue-500/50 transition-all hover:scale-105 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {activity.featured && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                      {activity.trending && <TrendingUp className="h-4 w-4 text-green-400" />}
                      {activity.new && <Sparkles className="h-4 w-4 text-blue-400" />}
                    </div>
                  </div>
                  <CardTitle className="text-base">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Reward</span>
                      <span className="font-semibold text-green-400">{activity.points}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Time</span>
                      <span className="text-xs">{activity.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Impact</span>
                      <span className={`text-xs ${getImpactColor(activity.carbonImpact)}`}>
                        {activity.carbonImpact}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Level</span>
                      <span className="text-xs">Level {activity.requiredLevel}+</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Badge className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-green-900/30 border-green-500/30 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">{allActivities.length}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/30 border-blue-500/30 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-400">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/30 border-purple-500/30 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-400">
                {allActivities.filter(a => a.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-900/30 border-yellow-500/30 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {allActivities.filter(a => a.new).length}
              </div>
              <div className="text-sm text-muted-foreground">New Activities</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}