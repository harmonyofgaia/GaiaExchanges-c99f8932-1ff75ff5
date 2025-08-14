import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Award,
  Zap,
  Heart,
  Share2,
  Target,
  Lightbulb,
  Handshake,
  Globe,
} from "lucide-react";

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
  rewardPoints: number;
  category: "cleanup" | "education" | "planting" | "conservation";
  difficulty: "easy" | "medium" | "hard";
}

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  level: number;
  weeklyChallenge: string;
  impact: {
    treesPlanted: number;
    co2Reduced: number;
    wasteCollected: number;
  };
}

interface IdeaExchange {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  category: "innovation" | "community" | "technology" | "education";
  implementation: "planning" | "active" | "completed";
  potentialImpact: number;
}

export function AdvancedCommunityFeatures() {
  const [selectedTab, setSelectedTab] = useState("events");
  const [userPoints, setUserPoints] = useState(1250);

  const communityEvents: CommunityEvent[] = [
    {
      id: "1",
      title: "Urban Forest Restoration Weekend",
      description:
        "Join us for a weekend of tree planting and habitat restoration in the city center",
      date: "2024-02-15",
      location: "Central Park, Zone A",
      organizer: "EcoWarrior Sarah",
      participants: 23,
      maxParticipants: 50,
      rewardPoints: 200,
      category: "planting",
      difficulty: "medium",
    },
    {
      id: "2",
      title: "Zero Waste Lifestyle Workshop",
      description: "Learn practical techniques for reducing waste and living sustainably",
      date: "2024-02-12",
      location: "Community Center",
      organizer: "Green Guru Mike",
      participants: 15,
      maxParticipants: 25,
      rewardPoints: 150,
      category: "education",
      difficulty: "easy",
    },
    {
      id: "3",
      title: "Ocean Cleanup Expedition",
      description: "Help remove plastic waste from our local beaches and waterways",
      date: "2024-02-20",
      location: "Sunset Beach",
      organizer: "Ocean Defender Lisa",
      participants: 8,
      maxParticipants: 30,
      rewardPoints: 300,
      category: "cleanup",
      difficulty: "hard",
    },
  ];

  const communities: Community[] = [
    {
      id: "1",
      name: "Urban Gardeners Network",
      description: "Growing food and community in the city",
      members: 1247,
      category: "Agriculture",
      level: 8,
      weeklyChallenge: "Plant 100 vegetables this week",
      impact: {
        treesPlanted: 0,
        co2Reduced: 2300,
        wasteCollected: 450,
      },
    },
    {
      id: "2",
      name: "Renewable Energy Pioneers",
      description: "Advancing solar, wind, and sustainable energy solutions",
      members: 892,
      category: "Energy",
      level: 6,
      weeklyChallenge: "Install 50kW of solar capacity",
      impact: {
        treesPlanted: 0,
        co2Reduced: 12500,
        wasteCollected: 0,
      },
    },
    {
      id: "3",
      name: "Wildlife Protection League",
      description: "Protecting and restoring natural habitats",
      members: 2103,
      category: "Conservation",
      level: 9,
      weeklyChallenge: "Create 5 new wildlife corridors",
      impact: {
        treesPlanted: 3400,
        co2Reduced: 8900,
        wasteCollected: 1200,
      },
    },
  ];

  const ideaExchange: IdeaExchange[] = [
    {
      id: "1",
      title: "AI-Powered Composting Network",
      description:
        "Smart composting bins that optimize decomposition and track community waste reduction",
      author: "TechEco Anna",
      votes: 127,
      category: "technology",
      implementation: "planning",
      potentialImpact: 95,
    },
    {
      id: "2",
      title: "Community Seed Bank Initiative",
      description: "Local seed sharing network to preserve biodiversity and support food security",
      author: "Seed Keeper John",
      votes: 89,
      category: "community",
      implementation: "active",
      potentialImpact: 78,
    },
    {
      id: "3",
      title: "Green Roof Education Program",
      description:
        "Teaching schools how to create living roofs that reduce energy costs and improve air quality",
      author: "Roof Garden Maya",
      votes: 156,
      category: "education",
      implementation: "completed",
      potentialImpact: 88,
    },
  ];

  const joinEvent = (eventId: string) => {
    const event = communityEvents.find((e) => e.id === eventId);
    if (event) {
      toast.success(`🎉 Joined ${event.title}!`, {
        description: `You'll earn ${event.rewardPoints} points upon completion.`,
        duration: 4000,
      });
    }
  };

  const joinCommunity = (communityId: string) => {
    const community = communities.find((c) => c.id === communityId);
    if (community) {
      toast.success(`🌟 Joined ${community.name}!`, {
        description: "You can now participate in community challenges and earn bonus rewards.",
        duration: 4000,
      });
    }
  };

  const voteForIdea = (ideaId: string) => {
    toast.success("🗳️ Vote cast!", {
      description: "Your vote helps prioritize community projects.",
      duration: 3000,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "hard":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cleanup":
        return "🧹";
      case "education":
        return "📚";
      case "planting":
        return "🌱";
      case "conservation":
        return "🦋";
      default:
        return "🌍";
    }
  };

  return (
    <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Users className="h-6 w-6" />
          🌍 Advanced Community Features Hub
          <Badge className="bg-blue-600">Community Power</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="events" className="text-sm">
              📅 Events
            </TabsTrigger>
            <TabsTrigger value="communities" className="text-sm">
              👥 Communities
            </TabsTrigger>
            <TabsTrigger value="ideas" className="text-sm">
              💡 Ideas
            </TabsTrigger>
            <TabsTrigger value="impact" className="text-sm">
              🌟 Impact
            </TabsTrigger>
          </TabsList>

          {/* Community Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-400">🎯 Upcoming Community Events</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="space-y-4">
              {communityEvents.map((event) => (
                <Card key={event.id} className="border-blue-500/30 bg-blue-900/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{getCategoryIcon(event.category)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-blue-300">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.participants}/{event.maxParticipants}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getDifficultyColor(event.difficulty)}>
                          {event.difficulty.toUpperCase()}
                        </Badge>
                        <div className="text-lg font-bold text-yellow-400 mt-1">
                          +{event.rewardPoints} pts
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Organized by <span className="text-blue-400">{event.organizer}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => joinEvent(event.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Join Event
                        </Button>
                      </div>
                    </div>

                    <Progress
                      value={(event.participants / event.maxParticipants) * 100}
                      className="mt-3 h-2"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Communities */}
          <TabsContent value="communities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-purple-400">🏘️ Active Communities</h3>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Users className="h-4 w-4 mr-2" />
                Create Community
              </Button>
            </div>

            <div className="space-y-4">
              {communities.map((community) => (
                <Card key={community.id} className="border-purple-500/30 bg-purple-900/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-purple-300">
                            {community.name}
                          </h4>
                          <Badge className="bg-purple-600">Level {community.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {community.members.toLocaleString()} members
                          </span>
                          <Badge variant="outline">{community.category}</Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => joinCommunity(community.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Join Community
                      </Button>
                    </div>

                    <div className="bg-purple-900/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-400" />
                        <span className="font-medium text-purple-400">Weekly Challenge</span>
                      </div>
                      <p className="text-sm">{community.weeklyChallenge}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-green-900/20 rounded-lg">
                        <div className="text-lg font-bold text-green-400">
                          {community.impact.treesPlanted}
                        </div>
                        <div className="text-xs text-muted-foreground">Trees Planted</div>
                      </div>
                      <div className="text-center p-2 bg-blue-900/20 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">
                          {community.impact.co2Reduced}
                        </div>
                        <div className="text-xs text-muted-foreground">CO2 Reduced (kg)</div>
                      </div>
                      <div className="text-center p-2 bg-orange-900/20 rounded-lg">
                        <div className="text-lg font-bold text-orange-400">
                          {community.impact.wasteCollected}
                        </div>
                        <div className="text-xs text-muted-foreground">Waste Collected (kg)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Idea Exchange */}
          <TabsContent value="ideas" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-cyan-400">💡 Community Idea Exchange</h3>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Lightbulb className="h-4 w-4 mr-2" />
                Submit Idea
              </Button>
            </div>

            <div className="space-y-4">
              {ideaExchange.map((idea) => (
                <Card key={idea.id} className="border-cyan-500/30 bg-cyan-900/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-cyan-300">{idea.title}</h4>
                          <Badge
                            className={`${
                              idea.implementation === "completed"
                                ? "bg-green-600"
                                : idea.implementation === "active"
                                  ? "bg-yellow-600"
                                  : "bg-blue-600"
                            }`}
                          >
                            {idea.implementation.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-cyan-400">By {idea.author}</span>
                          <Badge variant="outline">{idea.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {idea.potentialImpact}% impact potential
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => voteForIdea(idea.id)}
                          className="border-cyan-500 text-cyan-400"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          {idea.votes}
                        </Button>
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <Progress value={idea.potentialImpact} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Dashboard */}
          <TabsContent value="impact" className="space-y-6">
            <h3 className="text-xl font-bold text-green-400">🌟 Community Impact Dashboard</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">45,892</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">127</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">892</div>
                <div className="text-sm text-muted-foreground">Ideas Implemented</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                <Heart className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">2.4M</div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
              </div>
            </div>

            <Card className="border-green-500/30 bg-green-900/10">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4">
                  🎉 Recent Community Achievements
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">New</Badge>
                    <span>Urban Gardeners Network reached 1,000 members!</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-600">Milestone</Badge>
                    <span>50,000 kg of CO2 offset achieved this month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-600">Launch</Badge>
                    <span>AI-Powered Composting Network project launched</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-yellow-600">Award</Badge>
                    <span>Wildlife Protection League won Environmental Excellence Award</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
