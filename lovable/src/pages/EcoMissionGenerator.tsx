import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Brain, Zap, Globe, Users, Award, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EcoMission, AIInsight, parseJsonField } from "@/types/ui-types";
import { supabase } from "@/integrations/supabase/client";

export default function EcoMissionGenerator() {
  const [missions, setMissions] = useState<EcoMission[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Define functions before using them
  const loadMissions = async () => {
    try {
      const { data, error } = await supabase
        .from("eco_missions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error loading missions:", error);
        return;
      }

      const typedMissions: EcoMission[] =
        data?.map((mission) => ({
          id: mission.id,
          title: mission.title,
          description: mission.description,
          mission_type: mission.mission_type,
          difficulty_level: mission.difficulty_level,
          tokens_reward: mission.tokens_reward,
          carbon_impact: mission.carbon_impact,
          status: mission.status,
          user_id: mission.user_id,
          created_at: mission.created_at,
          completed_at: mission.completed_at,
          completion_data: parseJsonField(mission.completion_data, {
            evidence_photos: [],
            location_verified: false,
            impact_measured: 0,
            peer_verified: false,
            notes: "",
          })
        })) || [];

      setMissions(typedMissions);
    } catch (error) {
      console.error("Error in loadMissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIInsights = async () => {
    // Mock AI insights generation
    const insights: AIInsight[] = [
      {
        type: "carbon_reduction",
        message: "Tree planting missions show 23% higher completion rates in urban areas",
        confidence: 87,
        actionable: true,
        action: "Focus on urban tree planting initiatives",
      },
      {
        type: "community_engagement",
        message: "Group missions generate 3x more community participation",
        confidence: 92,
        actionable: true,
        action: "Create more collaborative eco-missions",
      },
      {
        type: "seasonal_optimization",
        message: "Beach cleanup missions peak during summer months",
        confidence: 78,
        actionable: true,
        action: "Schedule more coastal missions in summer",
      },
    ];

    setAiInsights(insights);
  };

  useEffect(() => {
    loadMissions();
    generateAIInsights();
  }, [loadMissions]);

  const mockMissions: EcoMission[] = [
    {
      id: "tree-planting-1",
      title: "Urban Forest Expansion",
      description: "Plant native trees in designated urban areas to improve air quality",
      mission_type: "tree_planting",
      difficulty_level: 3,
      tokens_reward: 150,
      carbon_impact: 25.5,
      status: "active",
      user_id: "user-1",
      created_at: new Date().toISOString(),
      completed_at: null,
      completion_data: {
        evidence_photos: [],
        location_verified: false,
        impact_measured: 0,
        peer_verified: false,
        notes: "",
      },
    },
    {
      id: "ocean-cleanup-1",
      title: "Coastal Debris Removal",
      description: "Remove plastic waste and debris from beach and coastal areas",
      mission_type: "ocean_cleanup",
      difficulty_level: 2,
      tokens_reward: 100,
      carbon_impact: 15.0,
      status: "available",
      user_id: "user-1",
      created_at: new Date().toISOString(),
      completed_at: null,
      completion_data: {
        evidence_photos: [],
        location_verified: false,
        impact_measured: 0,
        peer_verified: false,
        notes: "",
      },
    },
  ];

  const displayMissions = missions.length > 0 ? missions : mockMissions;

  const generateNewMission = async () => {
    setGenerating(true);

    // Simulate AI mission generation
    setTimeout(() => {
      const newMission: EcoMission = {
        id: `ai-generated-${Date.now()}`,
        title: "AI-Generated Carbon Offset Mission",
        description:
          "Advanced AI has identified optimal locations for carbon sequestration activities",
        mission_type: "ai_generated",
        difficulty_level: Math.floor(Math.random() * 5) + 1,
        tokens_reward: Math.floor(Math.random() * 200) + 50,
        carbon_impact: Math.random() * 50 + 10,
        status: "available",
        user_id: "ai-system",
        created_at: new Date().toISOString(),
        completed_at: null,
        completion_data: {
          evidence_photos: [],
          location_verified: false,
          impact_measured: 0,
          peer_verified: false,
          notes: "AI-generated mission based on environmental data analysis",
        },
      };

      setMissions((prev) => [newMission, ...prev]);
      setGenerating(false);
    }, 2000);
  };

  const getMissionIcon = (type: string) => {
    switch (type) {
      case "tree_planting":
        return "🌳";
      case "ocean_cleanup":
        return "🌊";
      case "recycling":
        return "♻️";
      case "energy_conservation":
        return "⚡";
      case "ai_generated":
        return "🤖";
      default:
        return "🎯";
    }
  };

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return "bg-green-600";
    if (level <= 3) return "bg-yellow-600";
    return "bg-red-600";
  };

  const getDifficultyText = (level: number) => {
    if (level <= 2) return "Easy";
    if (level <= 3) return "Medium";
    return "Hard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl text-green-400">Loading AI mission generator...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤖 AI Eco Mission Generator
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Advanced AI generates personalized environmental missions based on your location and
            impact potential
          </p>
        </div>

        {/* AI Insights Panel */}
        <Card className="mb-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Brain className="h-6 w-6" />
              AI Environmental Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20"
                >
                  <div className="text-sm font-medium text-blue-400 mb-2">{insight.type}</div>
                  <div className="text-xs text-muted-foreground mb-2">{insight.message}</div>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-blue-600 text-xs">{insight.confidence}% confidence</Badge>
                    {insight.actionable && insight.action && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Generation */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={generateNewMission}
            disabled={generating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
          >
            {generating ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Generating AI Mission...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate New AI Mission
              </>
            )}
          </Button>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMissions.map((mission) => (
            <Card
              key={mission.id}
              className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="text-2xl">{getMissionIcon(mission.mission_type)}</span>
                  {mission.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(mission.difficulty_level)}>
                    {getDifficultyText(mission.difficulty_level)}
                  </Badge>
                  <Badge className="bg-green-600">{mission.tokens_reward} GAiA</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbon Impact</span>
                    <span className="text-green-400 font-bold">
                      {mission.carbon_impact.toFixed(1)} kg CO₂
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={mission.status === "active" ? "bg-green-600" : "bg-gray-600"}>
                      {mission.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= mission.difficulty_level ? "text-yellow-400" : "text-gray-600"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  {mission.status === "available" ? "Start Mission" : "View Progress"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
