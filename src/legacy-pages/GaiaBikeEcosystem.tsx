import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bike,
  MapPin,
  Leaf,
  Coins,
  TreePine,
  Apple,
  Navigation,
  Target,
  Users,
  Sparkles,
  Shield,
  Zap,
  Activity,
  Globe,
  Award,
  TrendingUp,
  Battery,
  Route,
  Timer,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Navbar } from "@/components/Navbar";

interface BikeSession {
  id: string;
  distance: number;
  tokens_earned: number;
  bike_type: "gaia_bike" | "regular_bike";
  start_time: string;
  end_time: string;
  route_data: any;
  eco_impact: {
    carbon_saved: number;
    air_quality_points: number;
    health_benefits: number;
  };
}

interface FoodPlace {
  id: string;
  name: string;
  location_data: any;
  food_types: string[];
  owner_id: string;
  verified: boolean;
  forest_layer: number;
}

interface EcoMetrics {
  total_distance: number;
  carbon_offset: number;
  calories_burned: number;
  air_quality_improvement: number;
  trees_equivalent: number;
  eco_score: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  type: "distance" | "time" | "frequency" | "eco_impact";
  deadline: Date;
  completed: boolean;
}

const GaiaBikeEcosystem = () => {
  const { user } = useAuth();
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [totalTokens, setTotalTokens] = useState(0);
  const [bikeType, setBikeType] = useState<"gaia_bike" | "regular_bike">("regular_bike");
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [ecoMetrics, setEcoMetrics] = useState<EcoMetrics>({
    total_distance: 0,
    carbon_offset: 0,
    calories_burned: 0,
    air_quality_improvement: 0,
    trees_equivalent: 0,
    eco_score: 0,
  });
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    speed: 0,
    elevation: 0,
    heartRate: 0,
    powerOutput: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUserStats();
      fetchNearbyFoodPlaces();
      initializeChallenges();
      getCurrentLocation();
    }
  }, [user]);

  // Real-time session tracking
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setSessionTimer((prev) => prev + 1);
        // Simulate real-time data updates
        setRealTimeData({
          speed: Math.random() * 30 + 10, // 10-40 km/h
          elevation: Math.random() * 100 + 50, // 50-150m
          heartRate: Math.random() * 40 + 120, // 120-160 bpm
          powerOutput: Math.random() * 200 + 100, // 100-300 watts
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  const initializeChallenges = () => {
    const challenges: Challenge[] = [
      {
        id: "weekly-distance",
        title: "Weekly Distance Champion",
        description: "Ride 50km this week",
        target: 50,
        current: 23.5,
        reward: 150,
        type: "distance",
        deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        id: "eco-warrior",
        title: "Eco Warrior",
        description: "Save 10kg of CO2 this month",
        target: 10,
        current: 6.2,
        reward: 300,
        type: "eco_impact",
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        id: "daily-rider",
        title: "Daily Rider",
        description: "Ride for 7 consecutive days",
        target: 7,
        current: 4,
        reward: 200,
        type: "frequency",
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        completed: false,
      },
    ];
    setActiveChallenges(challenges);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied:", error);
          // Use default location
          setUserLocation({ lat: 40.7128, lng: -74.006 });
        }
      );
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data, error } = await supabase
        .from("bike_sessions")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.error("Error fetching stats:", error);
        // Use mock data for demo
        setTotalTokens(1250);
        setEcoMetrics({
          total_distance: 127.5,
          carbon_offset: 8.2,
          calories_burned: 4850,
          air_quality_improvement: 95,
          trees_equivalent: 0.3,
          eco_score: 850,
        });
        return;
      }

      if (data) {
        const total = data.reduce((sum, session) => sum + Number(session.tokens_earned), 0);
        const totalDistance = data.reduce((sum, session) => sum + Number(session.distance), 0);

        setTotalTokens(total);
        setEcoMetrics({
          total_distance: totalDistance,
          carbon_offset: totalDistance * 0.12, // 120g CO2 per km saved
          calories_burned: totalDistance * 38, // approx 38 calories per km
          air_quality_improvement: Math.floor(totalDistance * 0.75),
          trees_equivalent: totalDistance * 0.002, // 1 tree per 500km
          eco_score: Math.floor(total * 0.68),
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const startBikeSession = async () => {
    if (!user) {
      toast.error("Please login to start tracking");
      return;
    }

    setIsTracking(true);
    setSessionTimer(0);

    const sessionData = {
      user_id: user.id,
      bike_type: bikeType,
      start_time: new Date().toISOString(),
      start_location: userLocation,
      status: "active",
    };

    try {
      const { data, error } = await supabase
        .from("bike_sessions")
        .insert([sessionData])
        .select()
        .single();

      if (error) {
        console.error("Error starting session:", error);
        // Continue with local session
        setCurrentSession({ id: "local-session", ...sessionData });
      } else {
        setCurrentSession(data);
      }

      toast.success(`🚴‍♂️ Bike session started!`, {
        description: `Using ${bikeType === "gaia_bike" ? "GAIA Bike" : "Regular Bike"} - Tracking eco impact`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error starting session:", error);
      toast.error("Failed to start session");
      setIsTracking(false);
    }
  };

  const stopBikeSession = async () => {
    if (!currentSession) return;

    setIsTracking(false);

    // Calculate session metrics
    const sessionDistance = Math.random() * 15 + 5; // 5-20km for demo
    const baseTokens = Math.floor(sessionDistance * 10); // 10 tokens per km
    const bikeMultiplier = bikeType === "gaia_bike" ? 1.5 : 1.0;
    const tokensEarned = Math.floor(baseTokens * bikeMultiplier);

    const ecoImpact = {
      carbon_saved: sessionDistance * 0.12, // 120g CO2 per km
      air_quality_points: Math.floor(sessionDistance * 0.75),
      health_benefits: Math.floor(sessionDistance * 38), // calories burned
    };

    const sessionUpdate = {
      end_time: new Date().toISOString(),
      distance: sessionDistance,
      tokens_earned: tokensEarned,
      duration_minutes: Math.floor(sessionTimer / 60),
      eco_impact: ecoImpact,
      status: "completed",
    };

    try {
      if (currentSession.id !== "local-session") {
        const { error } = await supabase
          .from("bike_sessions")
          .update(sessionUpdate)
          .eq("id", currentSession.id);

        if (error) {
          console.error("Error updating session:", error);
        }
      }

      // Update local state
      setTotalTokens((prev) => prev + tokensEarned);
      setEcoMetrics((prev) => ({
        ...prev,
        total_distance: prev.total_distance + sessionDistance,
        carbon_offset: prev.carbon_offset + ecoImpact.carbon_saved,
        calories_burned: prev.calories_burned + ecoImpact.health_benefits,
        air_quality_improvement: prev.air_quality_improvement + ecoImpact.air_quality_points,
        trees_equivalent: prev.trees_equivalent + sessionDistance * 0.002,
        eco_score: prev.eco_score + Math.floor(tokensEarned * 0.68),
      }));

      // Update challenges
      setActiveChallenges((prev) =>
        prev.map((challenge) => {
          if (challenge.type === "distance") {
            return {
              ...challenge,
              current: challenge.current + sessionDistance,
            };
          }
          if (challenge.type === "eco_impact") {
            return {
              ...challenge,
              current: challenge.current + ecoImpact.carbon_saved,
            };
          }
          return challenge;
        })
      );

      toast.success(`🎉 Session completed!`, {
        description: `Earned ${tokensEarned} GAIA tokens • Saved ${ecoImpact.carbon_saved.toFixed(2)}kg CO2`,
        duration: 5000,
      });

      setCurrentSession(null);
      setSessionTimer(0);
    } catch (error) {
      console.error("Error ending session:", error);
      toast.error("Failed to save session data");
    }
  };

  const fetchNearbyFoodPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from("food_places")
        .select("*")
        .eq("is_active", true)
        .limit(10);

      if (error) {
        console.error("Error fetching food places:", error);
        // Use mock data as fallback
        setFoodPlaces([
          {
            id: "1",
            name: "Green Valley Farm Stand",
            location_data: { distance: "2.3 km from you" },
            food_types: ["Organic Vegetables", "Fresh Fruits"],
            owner_id: "owner1",
            verified: true,
            forest_layer: 3,
          },
          {
            id: "2",
            name: "Mountain Peak Organic Foods",
            location_data: { distance: "4.1 km from you" },
            food_types: ["Organic Grains", "Natural Honey"],
            owner_id: "owner2",
            verified: true,
            forest_layer: 5,
          },
        ]);
        return;
      }

      if (data) {
        setFoodPlaces(data);
      }
    } catch (error) {
      console.error("Error fetching food places:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🚴‍♂️ GAIA Bike Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground">
            Sustainable Transportation • Eco Tracking • Token Rewards
          </p>
        </div>

        {/* Real-time Session Tracking */}
        {isTracking && (
          <Card className="border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Activity className="h-5 w-5 animate-pulse" />
                Live Session - {bikeType === "gaia_bike" ? "GAIA Bike" : "Regular Bike"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {formatTime(sessionTimer)}
                  </div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {realTimeData.speed.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">km/h</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {realTimeData.elevation.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Elevation (m)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {realTimeData.heartRate.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Heart Rate</div>
                </div>
              </div>
              <Button onClick={stopBikeSession} className="w-full bg-red-600 hover:bg-red-700">
                <Target className="h-4 w-4 mr-2" />
                End Session & Claim Rewards
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Eco Metrics Dashboard */}
        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-5 w-5" />
              Your Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {ecoMetrics.total_distance.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">km Traveled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {ecoMetrics.carbon_offset.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {ecoMetrics.calories_burned.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Calories Burned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {ecoMetrics.air_quality_improvement}
                </div>
                <div className="text-sm text-muted-foreground">Air Quality Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {ecoMetrics.trees_equivalent.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Trees Equivalent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{ecoMetrics.eco_score}</div>
                <div className="text-sm text-muted-foreground">Eco Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tracking">🚴‍♂️ Bike Tracking</TabsTrigger>
            <TabsTrigger value="challenges">🎯 Challenges</TabsTrigger>
            <TabsTrigger value="rewards">🪙 Rewards</TabsTrigger>
            <TabsTrigger value="community">🌍 Community</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Bike Selection & Start Tracking */}
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Bike className="h-5 w-5" />
                    Start Your Eco Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Bike Type:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={bikeType === "regular_bike" ? "default" : "outline"}
                        onClick={() => setBikeType("regular_bike")}
                        className="flex flex-col p-4 h-auto"
                      >
                        <Bike className="h-6 w-6 mb-2" />
                        Regular Bike
                        <span className="text-xs">1x tokens</span>
                      </Button>
                      <Button
                        variant={bikeType === "gaia_bike" ? "default" : "outline"}
                        onClick={() => setBikeType("gaia_bike")}
                        className="flex flex-col p-4 h-auto border-green-500/50"
                      >
                        <Sparkles className="h-6 w-6 mb-2" />
                        GAIA Bike
                        <span className="text-xs">1.5x tokens</span>
                      </Button>
                    </div>
                  </div>

                  {!isTracking ? (
                    <Button
                      onClick={startBikeSession}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!user}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Start Tracking Session
                    </Button>
                  ) : (
                    <div className="text-center p-4 border border-green-500/50 rounded-lg">
                      <Activity className="h-8 w-8 text-green-400 mx-auto animate-pulse mb-2" />
                      <p className="text-green-400 font-semibold">Session Active</p>
                      <p className="text-sm text-muted-foreground">Tracking your eco impact</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Token Balance & Stats */}
              <Card className="border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Coins className="h-5 w-5" />
                    Your GAIA Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {totalTokens.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total GAIA Tokens Earned</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-bold text-green-400">+247 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-bold text-blue-400">+1,050 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bike Multiplier:</span>
                      <span className="font-bold text-purple-400">
                        {bikeType === "gaia_bike" ? "1.5x" : "1.0x"}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Token History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{challenge.title}</CardTitle>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        {challenge.reward} tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{challenge.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.current.toFixed(1)} / {challenge.target}
                        </span>
                      </div>
                      <Progress
                        value={(challenge.current / challenge.target) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-3 w-3" />
                      <span>Ends: {challenge.deadline.toLocaleDateString()}</span>
                    </div>

                    {challenge.current >= challenge.target ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Award className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Continue Challenge
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Award className="h-5 w-5" />
                  Eco Achievement Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Available Rewards</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TreePine className="h-5 w-5 text-green-400" />
                          <div>
                            <div className="font-medium text-white">Plant a Tree</div>
                            <div className="text-sm text-muted-foreground">500 tokens</div>
                          </div>
                        </div>
                        <Button size="sm">Redeem</Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-blue-400" />
                          <div>
                            <div className="font-medium text-white">Carbon Offset Certificate</div>
                            <div className="text-sm text-muted-foreground">1,000 tokens</div>
                          </div>
                        </div>
                        <Button size="sm">Redeem</Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-purple-400" />
                          <div>
                            <div className="font-medium text-white">Health Benefits Package</div>
                            <div className="text-sm text-muted-foreground">750 tokens</div>
                          </div>
                        </div>
                        <Button size="sm">Redeem</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Recent Achievements</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="h-4 w-4 text-green-400" />
                          <span className="font-medium text-green-400">Eco Warrior</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Completed 10 bike sessions this month
                        </p>
                      </div>

                      <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-blue-400">Distance Champion</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Traveled 100km this month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Users className="h-5 w-5" />
                    Community Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((position) => (
                      <div
                        key={position}
                        className="flex items-center justify-between p-3 border border-gray-500/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-black font-bold">
                            {position}
                          </div>
                          <div>
                            <div className="font-medium text-white">EcoRider{position}</div>
                            <div className="text-sm text-muted-foreground">
                              {150 - position * 15}km this month
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-500/50 text-green-400">
                          {2500 - position * 200} tokens
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Globe className="h-5 w-5" />
                    Global Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">2,847</div>
                      <div className="text-sm text-muted-foreground">
                        Active GAIA cyclists today
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-blue-400">15,234</div>
                        <div className="text-xs text-muted-foreground">km traveled today</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-400">1,830</div>
                        <div className="text-xs text-muted-foreground">kg CO₂ saved today</div>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      View Global Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GaiaBikeEcosystem;
