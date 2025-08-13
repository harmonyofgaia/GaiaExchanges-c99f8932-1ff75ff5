import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  Plane,
  MapPin,
  Camera,
  Leaf,
  Train,
  Car,
  TreePine,
  Mountain,
  Waves,
  Compass,
} from "lucide-react";

export function EcoTravelRewards() {
  const [travelType, setTravelType] = useState("");
  const [destination, setDestination] = useState("");
  const [transportation, setTransportation] = useState("");
  const [duration, setDuration] = useState("");
  const [carbonOffset, setCarbonOffset] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const [recentTrips] = useState([
    {
      id: "1",
      destination: "Costa Rica Rainforest",
      type: "eco_lodge",
      duration: 7,
      transportation: "train_bus",
      impact: "Reforestation project support",
      earnings: 850,
      photos: 23,
    },
    {
      id: "2",
      destination: "Local State Park",
      type: "camping",
      duration: 3,
      transportation: "bicycle",
      impact: "Wildlife conservation",
      earnings: 320,
      photos: 15,
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!travelType || !destination || !transportation || !duration) {
      toast.error("Please fill in all fields");
      return;
    }

    const transportMultipliers: { [key: string]: number } = {
      bicycle: 3.0,
      walking: 2.5,
      train_bus: 2.0,
      electric_vehicle: 1.8,
      hybrid_vehicle: 1.5,
      public_transport: 2.2,
      carpool: 1.7,
      conventional_car: 1.0,
      airplane_offset: 1.3,
    };

    const travelMultipliers: { [key: string]: number } = {
      eco_lodge: 200,
      camping: 150,
      volunteer_tourism: 300,
      conservation_trip: 400,
      local_tourism: 100,
      sustainable_resort: 180,
      agritourism: 220,
      educational_tour: 250,
    };

    const basePoints = travelMultipliers[travelType] || 100;
    const transportBonus =
      (transportMultipliers[transportation] || 1) * basePoints;
    const durationBonus = parseFloat(duration) * 20;
    const offsetBonus = carbonOffset ? parseFloat(carbonOffset) * 10 : 0;

    const totalPoints = Math.floor(
      transportBonus + durationBonus + offsetBonus,
    );
    const tokens = Math.floor(totalPoints * 0.25);

    const activity = {
      id: Date.now().toString(),
      type: "eco_travel",
      title: "Sustainable Travel Experience",
      amount: totalPoints,
      timestamp: new Date(),
      description: `${travelType.replace("_", " ")} to ${destination} via ${transportation.replace("_", " ")}`,
      status: "completed" as const,
      pointsEarned: totalPoints,
      tokensEarned: tokens,
      verified: true,
      metadata: {
        travelType,
        destination,
        transportation,
        duration: parseFloat(duration),
        carbonOffset: carbonOffset ? parseFloat(carbonOffset) : 0,
      },
    };

    addActivity(activity);
    toast.success(
      `✈️ Eco travel recorded! +${totalPoints} points earned for sustainable exploration!`,
    );
    setTravelType("");
    setDestination("");
    setTransportation("");
    setDuration("");
    setCarbonOffset("");
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case "train_bus":
        return <Train className="h-4 w-4" />;
      case "bicycle":
        return <Compass className="h-4 w-4" />;
      case "electric_vehicle":
        return <Car className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-teal-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Plane className="h-6 w-6" />
          ✈️ Eco-Travel & Sustainable Tourism Rewards
          <Badge className="bg-cyan-600">Explore Responsibly</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Travel Impact Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400">
            🌍 Your Travel Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
              <div className="text-2xl font-bold text-cyan-400">
                {recentTrips.length}
              </div>
              <div className="text-sm text-muted-foreground">Eco Trips</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {recentTrips.reduce((sum, trip) => sum + trip.duration, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Days Traveled</div>
            </div>
            <div className="text-center p-4 bg-teal-900/30 rounded-lg border border-teal-500/20">
              <div className="text-2xl font-bold text-teal-400">
                {recentTrips.reduce((sum, trip) => sum + trip.earnings, 0)}
              </div>
              <div className="text-sm text-muted-foreground">GAiA Earned</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {recentTrips.reduce((sum, trip) => sum + trip.photos, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Impact Photos</div>
            </div>
          </div>
        </div>

        {/* Recent Eco Trips */}
        <div className="space-y-3">
          <h4 className="font-semibold text-cyan-400 flex items-center gap-2">
            <Mountain className="h-4 w-4" />
            Recent Sustainable Adventures
          </h4>
          {recentTrips.map((trip) => (
            <div
              key={trip.id}
              className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <TreePine className="h-6 w-6 text-cyan-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-cyan-300">
                      {trip.destination}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {trip.impact}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        {getTransportIcon(trip.transportation)}
                        {trip.transportation.replace("_", " ")}
                      </span>
                      <span>{trip.duration} days</span>
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {trip.photos} photos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">
                    +{trip.earnings} GAiA
                  </div>
                  <Badge className="bg-green-600">
                    {trip.type.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                85% carbon neutral journey
              </div>
            </div>
          ))}
        </div>

        {/* Plan New Eco Trip */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/20"
        >
          <h4 className="font-semibold text-cyan-400 flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Record Sustainable Travel Experience
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Travel Type
              </label>
              <Select value={travelType} onValueChange={setTravelType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select travel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eco_lodge">
                    🏡 Eco Lodge Stay (200 pts)
                  </SelectItem>
                  <SelectItem value="camping">
                    ⛺ Nature Camping (150 pts)
                  </SelectItem>
                  <SelectItem value="volunteer_tourism">
                    🤝 Volunteer Tourism (300 pts)
                  </SelectItem>
                  <SelectItem value="conservation_trip">
                    🦋 Conservation Trip (400 pts)
                  </SelectItem>
                  <SelectItem value="local_tourism">
                    🏘️ Local Tourism (100 pts)
                  </SelectItem>
                  <SelectItem value="sustainable_resort">
                    🌿 Sustainable Resort (180 pts)
                  </SelectItem>
                  <SelectItem value="agritourism">
                    🚜 Agritourism (220 pts)
                  </SelectItem>
                  <SelectItem value="educational_tour">
                    📚 Educational Tour (250 pts)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Destination
              </label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where did you travel?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Transportation Method
              </label>
              <Select value={transportation} onValueChange={setTransportation}>
                <SelectTrigger>
                  <SelectValue placeholder="How did you get there?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bicycle">
                    🚲 Bicycle (3x multiplier)
                  </SelectItem>
                  <SelectItem value="walking">
                    🚶 Walking (2.5x multiplier)
                  </SelectItem>
                  <SelectItem value="train_bus">
                    🚂 Train/Bus (2x multiplier)
                  </SelectItem>
                  <SelectItem value="electric_vehicle">
                    ⚡ Electric Vehicle (1.8x multiplier)
                  </SelectItem>
                  <SelectItem value="public_transport">
                    🚌 Public Transport (2.2x multiplier)
                  </SelectItem>
                  <SelectItem value="carpool">
                    👥 Carpool (1.7x multiplier)
                  </SelectItem>
                  <SelectItem value="hybrid_vehicle">
                    🔋 Hybrid Vehicle (1.5x multiplier)
                  </SelectItem>
                  <SelectItem value="airplane_offset">
                    ✈️ Flight + Carbon Offset (1.3x multiplier)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (days)
              </label>
              <Input
                type="number"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Trip duration"
                min="0.5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Carbon Offset (kg CO2) - Optional
              </label>
              <Input
                type="number"
                step="0.1"
                value={carbonOffset}
                onChange={(e) => setCarbonOffset(e.target.value)}
                placeholder="Additional carbon offset purchased"
                min="0"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {loading
              ? "Recording Travel..."
              : "✈️ Record Eco Travel Experience"}
          </Button>
        </form>

        <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <p className="text-sm text-cyan-300">
            💡 <strong>Travel Smart:</strong> Sustainable travel earns massive
            rewards! Choose eco-friendly transportation and accommodations to
            maximize your GAiA earnings while protecting the planet!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
