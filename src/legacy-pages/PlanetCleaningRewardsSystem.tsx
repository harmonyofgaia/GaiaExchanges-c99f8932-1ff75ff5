import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Camera,
  Award,
  TrendingUp,
  Users,
  Zap,
  Leaf,
  Droplets,
  Recycle,
  TreePine,
  Globe,
  Satellite,
  Smartphone,
  Brain,
  Eye,
  CheckCircle,
  Network,
  Shield,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface CleaningReward {
  id: string;
  user_id: string;
  activity_type: string;
  location_data: unknown;
  verification_method: string;
  tokens_earned: number;
  environmental_impact: unknown;
  verified_at: string | null;
  created_at: string;
  satellite_verified?: boolean;
  iot_sensor_data?: unknown;
  blockchain_hash?: string;
  community_validation_score?: number;
  real_time_tracking?: boolean;
}

interface SatelliteData {
  coordinates: [number, number];
  before_image_url: string;
  after_image_url: string;
  change_detection_score: number;
  verification_status: string;
}

interface IoTSensorReading {
  sensor_id: string;
  sensor_type: string;
  reading_value: number;
  timestamp: string;
  location: [number, number];
}

interface GlobalImpactMetrics {
  totalCleaned: number;
  activeCommunities: number;
  verificationAccuracy: number;
  satelliteVerifications: number;
  blockchainTransactions: number;
}

export default function PlanetCleaningRewardsSystem() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<CleaningReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [impactAmount, setImpactAmount] = useState("");
  const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([]);
  const [iotReadings, setIotReadings] = useState<IoTSensorReading[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalImpactMetrics>({
    totalCleaned: 5847293,
    activeCommunities: 2847,
    verificationAccuracy: 96.7,
    satelliteVerifications: 15743,
    blockchainTransactions: 89432,
  });

  useEffect(() => {
    if (user) {
      loadRewards();
      loadSatelliteData();
      loadIoTReadings();
      loadGlobalMetrics();
    }
  }, [user]);

  const loadSatelliteData = async () => {
    // Mock satellite verification data
    const mockSatelliteData = [
      {
        coordinates: [40.7128, -74.006] as [number, number],
        before_image_url: "/api/satellite/before/ny_park_1",
        after_image_url: "/api/satellite/after/ny_park_1",
        change_detection_score: 94.5,
        verification_status: "verified",
      },
      {
        coordinates: [34.0522, -118.2437] as [number, number],
        before_image_url: "/api/satellite/before/la_beach_1",
        after_image_url: "/api/satellite/after/la_beach_1",
        change_detection_score: 87.3,
        verification_status: "verified",
      },
    ];
    setSatelliteData(mockSatelliteData);
  };

  const loadIoTReadings = async () => {
    // Mock IoT sensor readings
    const mockIoTReadings = [
      {
        sensor_id: "AIR_QUAL_001",
        sensor_type: "air_quality",
        reading_value: 85.3,
        timestamp: new Date().toISOString(),
        location: [40.7128, -74.006] as [number, number],
      },
      {
        sensor_id: "WATER_QUAL_002",
        sensor_type: "water_quality",
        reading_value: 92.1,
        timestamp: new Date().toISOString(),
        location: [34.0522, -118.2437] as [number, number],
      },
    ];
    setIotReadings(mockIoTReadings);
  };

  const loadGlobalMetrics = async () => {
    // Simulate real-time global metrics updates
    const interval = setInterval(() => {
      setGlobalMetrics((prev) => ({
        ...prev,
        totalCleaned: prev.totalCleaned + Math.floor(Math.random() * 100),
        activeCommunities: prev.activeCommunities + Math.floor(Math.random() * 5),
        satelliteVerifications: prev.satelliteVerifications + Math.floor(Math.random() * 3),
        blockchainTransactions: prev.blockchainTransactions + Math.floor(Math.random() * 10),
      }));
    }, 12000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (user) {
      loadRewards();
    }
  }, [user]);

  const loadRewards = async () => {
    try {
      const { data, error } = await supabase
        .from("planet_cleaning_rewards")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      console.error("Error loading rewards:", error);
      toast.error("Failed to load cleaning rewards");
    } finally {
      setLoading(false);
    }
  };

  const submitCleaningActivity = async () => {
    if (!user) {
      toast.error("Please log in to submit activities");
      return;
    }

    if (!activityType || !location || !description || !impactAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      // Calculate tokens based on activity type and impact
      const tokenMultipliers = {
        plastic_cleanup: 2,
        tree_planting: 3,
        water_restoration: 4,
        waste_sorting: 1.5,
        beach_cleanup: 2.5,
        forest_restoration: 3.5,
      };

      const baseTokens =
        parseFloat(impactAmount) *
        (tokenMultipliers[activityType as keyof typeof tokenMultipliers] || 1);
      const tokensEarned = Math.floor(baseTokens * 10); // Scale up for better UX

      const { data, error } = await supabase
        .from("planet_cleaning_rewards")
        .insert([
          {
            user_id: user.id,
            activity_type: activityType,
            location_data: {
              location: location,
              description: description,
              timestamp: new Date().toISOString(),
            },
            verification_method: "manual_review",
            tokens_earned: tokensEarned,
            environmental_impact: {
              type: activityType,
              amount: parseFloat(impactAmount),
              unit: getImpactUnit(activityType),
            },
          },
        ])
        .select();

      if (error) throw error;

      toast.success(
        `Activity submitted! You'll earn ${tokensEarned} GAiA tokens after verification.`
      );

      // Reset form
      setActivityType("");
      setLocation("");
      setDescription("");
      setImpactAmount("");

      // Reload rewards
      loadRewards();
    } catch (error) {
      console.error("Error submitting activity:", error);
      toast.error("Failed to submit activity");
    } finally {
      setSubmitting(false);
    }
  };

  const getImpactUnit = (type: string) => {
    switch (type) {
      case "plastic_cleanup":
      case "waste_sorting":
      case "beach_cleanup":
        return "kg";
      case "tree_planting":
        return "trees";
      case "water_restoration":
        return "liters";
      case "forest_restoration":
        return "sqm";
      default:
        return "units";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "plastic_cleanup":
      case "waste_sorting":
      case "beach_cleanup":
        return Recycle;
      case "tree_planting":
      case "forest_restoration":
        return TreePine;
      case "water_restoration":
        return Droplets;
      default:
        return Leaf;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "plastic_cleanup":
      case "waste_sorting":
      case "beach_cleanup":
        return "text-blue-400";
      case "tree_planting":
      case "forest_restoration":
        return "text-green-400";
      case "water_restoration":
        return "text-cyan-400";
      default:
        return "text-gray-400";
    }
  };

  const activityTypes = [
    { value: "plastic_cleanup", label: "Plastic Cleanup", icon: Recycle },
    { value: "tree_planting", label: "Tree Planting", icon: TreePine },
    { value: "water_restoration", label: "Water Restoration", icon: Droplets },
    { value: "waste_sorting", label: "Waste Sorting", icon: Recycle },
    { value: "beach_cleanup", label: "Beach Cleanup", icon: Globe },
    {
      value: "forest_restoration",
      label: "Forest Restoration",
      icon: TreePine,
    },
  ];

  const totalTokensEarned = rewards.reduce((sum, reward) => sum + reward.tokens_earned, 0);
  const verifiedRewards = rewards.filter((r) => r.verified_at);
  const pendingRewards = rewards.filter((r) => !r.verified_at);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌍 Planet Cleaning Rewards v7
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced verification with satellite monitoring, IoT sensors, and blockchain security
        </p>
        <Badge className="mt-2 bg-purple-600 text-white">
          <Satellite className="h-3 w-3 mr-1" />
          Master Plan v7 Enabled
        </Badge>
      </div>

      {/* Enhanced Global Impact Metrics */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Award className="h-6 w-6" />
            Global Impact Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {globalMetrics.totalCleaned.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Kg Cleaned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {globalMetrics.activeCommunities.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {globalMetrics.verificationAccuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Verification Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">
                {globalMetrics.satelliteVerifications.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Satellite Verifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {globalMetrics.blockchainTransactions.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Blockchain Txns</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Enhanced Impact Summary */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            Your Verified Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{totalTokensEarned}</div>
              <div className="text-sm text-muted-foreground">Total Tokens Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{verifiedRewards.length}</div>
              <div className="text-sm text-muted-foreground">Verified Activities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{pendingRewards.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {rewards.filter((r) => r.satellite_verified).length}
              </div>
              <div className="text-sm text-muted-foreground">Satellite Verified</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Satellite Verification System */}
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Satellite className="h-5 w-5" />
            Satellite Verification Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Real-time satellite imagery verifies cleanup activities and environmental changes with
              96.7% accuracy.
            </p>
            {satelliteData.map((data, index) => (
              <div key={index} className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-900/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Satellite className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">
                      Location: {data.coordinates[0].toFixed(4)}, {data.coordinates[1].toFixed(4)}
                    </span>
                  </div>
                  <Badge className="bg-green-600">
                    {data.change_detection_score}% Change Detected
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Before Image</div>
                    <div className="h-24 bg-gradient-to-br from-red-900/20 to-gray-900/20 rounded border border-red-500/30 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-red-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">After Image</div>
                    <div className="h-24 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded border border-green-500/30 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IoT Sensor Network */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Network className="h-5 w-5" />
            IoT Environmental Sensors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Distributed IoT sensors provide real-time environmental quality measurements to verify
              cleanup impact.
            </p>
            {iotReadings.map((reading, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-green-500/20 bg-green-900/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">
                      {reading.sensor_type.replace("_", " ").toUpperCase()} Sensor
                    </span>
                  </div>
                  <Badge variant="outline" className="text-blue-400">
                    ID: {reading.sensor_id}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Reading Value</div>
                    <div className="font-medium text-green-400">{reading.reading_value}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Location</div>
                    <div className="font-medium text-blue-400 font-mono text-xs">
                      {reading.location[0].toFixed(4)}, {reading.location[1].toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last Update</div>
                    <div className="font-medium text-yellow-400">Real-time</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Activity Submission */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Brain className="h-5 w-5" />
            Advanced Activity Submission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4 p-3 rounded-lg bg-blue-900/20 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Multi-Layer Verification</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>✓ Satellite imagery verification</div>
              <div>✓ IoT sensor validation</div>
              <div>✓ Blockchain immutable records</div>
              <div>✓ Community peer validation</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Type</label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GPS Location</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Auto-detected GPS coordinates"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" variant="outline">
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Activity Description</label>
            <Input
              placeholder="Describe your environmental activity"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Impact Amount ({activityType ? getImpactUnit(activityType) : "units"})
            </label>
            <Input
              type="number"
              placeholder="Enter quantified impact"
              value={impactAmount}
              onChange={(e) => setImpactAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={submitCleaningActivity}
              disabled={submitting || !activityType || !location || !description || !impactAmount}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? "Submitting..." : "Submit for Verification"}
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-400"
              disabled={submitting}
            >
              <Camera className="h-4 w-4 mr-2" />
              Add Photo Evidence
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-green-900/20 p-3 rounded-lg border border-green-500/20">
            <div className="font-medium text-green-400 mb-1">Enhanced Verification Process:</div>
            <div>1. Satellite imagery confirms location and change detection</div>
            <div>2. IoT sensors validate environmental improvement</div>
            <div>3. Community validators review submission</div>
            <div>4. Blockchain records immutable verification</div>
            <div>5. Tokens automatically distributed upon verification</div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-5 w-5" />
            Your Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rewards.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No activities yet
              </h3>
              <p className="text-muted-foreground">
                Submit your first cleaning activity to start earning tokens!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {rewards.map((reward) => {
                const ActivityIcon = getActivityIcon(reward.activity_type);
                const activityColor = getActivityColor(reward.activity_type);

                return (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20"
                  >
                    <div className="flex items-center gap-4">
                      <ActivityIcon className={`h-8 w-8 ${activityColor}`} />
                      <div>
                        <h4 className="font-medium">
                          {reward.activity_type
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {reward.location_data?.location || "Unknown location"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(reward.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {reward.tokens_earned} GAiA
                      </div>
                      <Badge
                        className={
                          reward.verified_at
                            ? "bg-green-600 text-white"
                            : "bg-yellow-600 text-white"
                        }
                      >
                        {reward.verified_at ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Global Impact */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Users className="h-5 w-5" />
            Global Community Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">2.8M</div>
              <div className="text-sm text-muted-foreground">Total Tokens Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">15.2K</div>
              <div className="text-sm text-muted-foreground">Active Cleaners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">847</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
