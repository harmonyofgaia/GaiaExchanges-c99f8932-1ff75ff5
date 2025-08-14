import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  Bike,
  MapPin,
  Navigation,
  Route,
  Zap,
  TreePine,
  Camera,
  Award,
  Target,
  Clock,
} from "lucide-react";

export function InteractiveEcoBikeMap() {
  const [isRiding, setIsRiding] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const { addActivity, loading } = useEarningActivities("user-123");

  const [bikeStats] = useState({
    totalDistance: 347.8,
    totalRides: 89,
    totalTokens: 695.6,
    weeklyDistance: 23.4,
    co2Saved: 78.3,
    caloriesBurned: 12450,
  });

  const [ecoRoutes] = useState([
    {
      id: "1",
      name: "Riverside Green Path",
      distance: 8.5,
      difficulty: "easy",
      ecoFeatures: ["River cleanup stations", "Bird watching points", "Native plant gardens"],
      multiplier: 2.2,
      estimated_time: 25,
    },
    {
      id: "2",
      name: "Urban Forest Loop",
      distance: 12.3,
      difficulty: "medium",
      ecoFeatures: ["Tree planting zones", "Solar charging stations", "Compost points"],
      multiplier: 2.8,
      estimated_time: 40,
    },
    {
      id: "3",
      name: "Carbon Neutral Challenge",
      distance: 18.7,
      difficulty: "hard",
      ecoFeatures: ["Wind turbines", "Bee hotels", "Recycling centers", "Community gardens"],
      multiplier: 3.5,
      estimated_time: 65,
    },
  ]);

  const [activeRide, setActiveRide] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRiding && activeRide) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
        setDistance((prev) => {
          const newDistance = prev + (Math.random() * 0.1 + 0.1);
          return newDistance;
        });
        setSpeed(15 + Math.random() * 10);
        setTokensEarned((prev) => prev + 0.02);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRiding, activeRide]);

  const startRide = (route: any) => {
    setActiveRide(route);
    setIsRiding(true);
    setDistance(0);
    setDuration(0);
    setTokensEarned(0);
    toast.success(`🚴 Started riding on ${route.name}!`, {
      description: `Earning ${route.multiplier}x GAiA tokens on this eco-route`,
      duration: 4000,
    });
  };

  const endRide = async () => {
    if (!activeRide) return;

    setIsRiding(false);

    const finalTokens = Math.floor(distance * activeRide.multiplier * 2);
    const points = Math.floor(finalTokens * 0.8);

    const activity = {
      id: Date.now().toString(),
      type: "eco_bike_ride",
      title: "Eco Bike Route Completed",
      amount: points,
      timestamp: new Date(),
      description: `Completed ${activeRide.name}: ${distance.toFixed(1)}km in ${Math.floor(duration / 60)}min`,
      status: "completed" as const,
      pointsEarned: points,
      tokensEarned: finalTokens,
      verified: true,
      metadata: {
        routeName: activeRide.name,
        distance: distance,
        duration: duration,
        averageSpeed: speed,
        multiplier: activeRide.multiplier,
      },
    };

    addActivity(activity);
    toast.success(`🎉 Ride completed! +${finalTokens} GAiA tokens earned!`, {
      description: `${distance.toFixed(1)}km • ${Math.floor(duration / 60)} minutes • ${activeRide.multiplier}x eco-multiplier`,
      duration: 6000,
    });

    setActiveRide(null);
    setDistance(0);
    setDuration(0);
    setTokensEarned(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Bike className="h-6 w-6" />
          🚴 Interactive Eco Bike Map & Routes
          <Badge className="bg-green-600">Live Tracking</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Ride Status */}
        {isRiding && activeRide && (
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30 animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-green-400">
                🚴 Currently Riding: {activeRide.name}
              </h3>
              <Button onClick={endRide} className="bg-red-600 hover:bg-red-700">
                End Ride
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-900/30 rounded-lg">
                <div className="text-xl font-bold text-green-400">{distance.toFixed(1)}km</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </div>
              <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                <div className="text-xl font-bold text-blue-400">{formatTime(duration)}</div>
                <div className="text-xs text-muted-foreground">Time</div>
              </div>
              <div className="text-center p-3 bg-yellow-900/30 rounded-lg">
                <div className="text-xl font-bold text-yellow-400">{speed.toFixed(1)} km/h</div>
                <div className="text-xs text-muted-foreground">Speed</div>
              </div>
              <div className="text-center p-3 bg-purple-900/30 rounded-lg">
                <div className="text-xl font-bold text-purple-400">{tokensEarned.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">GAiA Earned</div>
              </div>
            </div>

            <Progress value={(distance / activeRide.distance) * 100} className="mt-4 h-3" />
            <div className="text-center text-sm text-muted-foreground mt-2">
              {distance.toFixed(1)} / {activeRide.distance}km • {activeRide.multiplier}x
              eco-multiplier active
            </div>
          </div>
        )}

        {/* Bike Stats Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-400">📊 Your Eco Bike Impact</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{bikeStats.totalDistance}</div>
              <div className="text-xs text-muted-foreground">Total KM</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{bikeStats.totalRides}</div>
              <div className="text-xs text-muted-foreground">Total Rides</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">{bikeStats.totalTokens}</div>
              <div className="text-xs text-muted-foreground">GAiA Earned</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{bikeStats.weeklyDistance}</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/20">
              <div className="text-xl font-bold text-red-400">{bikeStats.co2Saved}</div>
              <div className="text-xs text-muted-foreground">CO2 Saved (kg)</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">
                {bikeStats.caloriesBurned.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
          </div>
        </div>

        {/* Eco Routes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            <Route className="h-5 w-5" />
            🗺️ Available Eco Routes
          </h3>

          <div className="space-y-3">
            {ecoRoutes.map((route) => (
              <div
                key={route.id}
                className="p-4 bg-green-900/20 rounded-lg border border-green-500/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-300 flex items-center gap-2">
                        {route.name}
                        <Badge className={getDifficultyColor(route.difficulty)}>
                          {route.difficulty}
                        </Badge>
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{route.distance}km</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />~{route.estimated_time}
                          min
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {route.multiplier}x multiplier
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-400">
                      ~{Math.floor(route.distance * route.multiplier * 2)} GAiA
                    </div>
                    <Button
                      size="sm"
                      onClick={() => startRide(route)}
                      disabled={isRiding}
                      className="mt-2 bg-green-600 hover:bg-green-700"
                    >
                      {isRiding ? "Riding..." : "Start Route"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-green-400">
                    🌱 Eco Features Along Route:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {route.ecoFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-500/30">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <h4 className="font-semibold text-green-400 mb-2">Interactive Eco Route Map</h4>
            <p className="text-sm text-muted-foreground">
              Real-time GPS tracking with eco-points and environmental impact markers
            </p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-300">
            💡 <strong>Eco Route Bonus:</strong> Special routes with environmental features earn
            multiplied rewards! Visit eco-points for extra tokens and help maintain local
            environmental projects!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
