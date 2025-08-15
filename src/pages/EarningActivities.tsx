import { useState } from "react";
import { EarningCategories } from "./EarningCategories";
import { CategoryGrid } from "@/components/earning/CategoryGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { earningCategories } from "@/data/earningCategories";
import {
  Trophy,
  Star,
  TrendingUp,
  Zap,
  Users,
  Target,
  Award,
  Sparkles,
  Globe,
  Heart,
  Lightbulb,
} from "lucide-react";

export default function EarningActivities() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  // State for active tab
  const [activeTab, setActiveTab] = useState("categories");

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

  // Calculate total stats from all categories
  const totalActivities = earningCategories.reduce((sum, cat) => sum + cat.components.length, 0);
  const totalCompleted = earningCategories.reduce((sum, cat) => sum + cat.completedCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Hero Header */}
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

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 h-16 bg-black/20">
            <TabsTrigger
              value="categories"
              className="text-base font-medium h-12"
            >
              🌟 Category Menu
            </TabsTrigger>
            <TabsTrigger value="overview" className="text-base font-medium h-12">
              📊 Overview
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-base font-medium h-12">
              📈 Statistics
            </TabsTrigger>
          </TabsList>

          {/* Categories Tab - New Rotating Menu Design */}
          <TabsContent value="categories" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3">
                🎯 Activity Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your path to environmental impact and GAiA rewards
              </p>
            </div>

            <CategoryGrid
              categories={earningCategories}
              onCategorySelect={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {earningCategories.map((category) => (
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
                            <Badge variant="outline">
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

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Target className="h-5 w-5" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {Math.round((totalCompleted / totalActivities) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overall Completion
                    </div>
                  </div>
                  <Progress
                    value={(totalCompleted / totalActivities) * 100}
                    className="h-3"
                  />
                  <div className="text-center text-sm text-muted-foreground">
                    {totalCompleted} of {totalActivities} activities completed
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <TrendingUp className="h-5 w-5" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {userStats.weeklyEarnings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      GAiA Earned This Week
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-blue-400">{userStats.streakDays}</div>
                      <div className="text-muted-foreground">Day Streak</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-400">#{userStats.communityRank}</div>
                      <div className="text-muted-foreground">Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {userStats.badgesEarned}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Badges Earned
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-purple-400">Level {userStats.currentLevel}</div>
                      <div className="text-muted-foreground">Current</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-400">{userStats.co2Offset}kg</div>
                      <div className="text-muted-foreground">CO2 Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="border-2 border-primary/50 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 p-8">
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
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white">
                <Heart className="h-5 w-5" />
                Start Your First Activity
              </button>
              <button className="border border-green-500/30 text-green-400 hover:bg-green-900/20 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5" />
                View Global Impact
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}