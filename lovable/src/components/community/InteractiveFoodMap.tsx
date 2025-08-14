import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Leaf, Users, Plus, Camera } from "lucide-react";
import { toast } from "sonner";

interface FoodGrower {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  crops: string[];
  isVerified: boolean;
  shareSeeds: boolean;
  acceptsVisitors: boolean;
  joinedDate: Date;
  harvestSeason: string;
}

export function InteractiveFoodMap() {
  const [foodGrowers, setFoodGrowers] = useState<FoodGrower[]>([
    {
      id: "1",
      name: "Green Harmony Farm",
      location: { lat: 40.7128, lng: -74.006, address: "New York, NY" },
      crops: ["Tomatoes", "Lettuce", "Herbs"],
      isVerified: true,
      shareSeeds: true,
      acceptsVisitors: true,
      joinedDate: new Date("2024-01-15"),
      harvestSeason: "Summer",
    },
    {
      id: "2",
      name: "EcoWarrior Garden",
      location: { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
      crops: ["Carrots", "Spinach", "Peppers"],
      isVerified: true,
      shareSeeds: false,
      acceptsVisitors: true,
      joinedDate: new Date("2024-02-20"),
      harvestSeason: "Year-round",
    },
    {
      id: "3",
      name: "Urban Paradise",
      location: { lat: 41.8781, lng: -87.6298, address: "Chicago, IL" },
      crops: ["Kale", "Radishes", "Beans"],
      isVerified: false,
      shareSeeds: true,
      acceptsVisitors: false,
      joinedDate: new Date("2024-03-10"),
      harvestSeason: "Spring/Fall",
    },
  ]);
  const [selectedGrower, setSelectedGrower] = useState<FoodGrower | null>(null);

  const registerFoodGrower = () => {
    toast.success("Food Grower Registration", {
      description: "Your registration has been submitted for verification!",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <MapPin className="h-6 w-6" />
            🌱 Community Food Growers Map
            <Badge className="bg-green-600">Phase 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Placeholder */}
            <div className="bg-green-900/30 rounded-lg border border-green-500/20 p-6 min-h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-green-400 mx-auto" />
                <h3 className="text-xl font-bold text-green-400">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map integration coming soon - will show real-time locations of food growers
                </p>
                <Button onClick={registerFoodGrower} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Register as Food Grower (+50 Points)
                </Button>
              </div>
            </div>

            {/* Grower List */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-400">Active Food Growers</h3>
              {foodGrowers.map((grower) => (
                <div
                  key={grower.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedGrower?.id === grower.id
                      ? "border-green-500 bg-green-900/30"
                      : "border-green-500/20 bg-green-900/10 hover:bg-green-900/20"
                  }`}
                  onClick={() => setSelectedGrower(grower)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-green-400">{grower.name}</h4>
                    <div className="flex gap-1">
                      {grower.isVerified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      {grower.shareSeeds && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          Seeds
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{grower.location.address}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {grower.crops.map((crop) => (
                      <Badge key={crop} variant="outline" className="text-xs border-green-500/30">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-green-300">
                    Harvest Season: {grower.harvestSeason} • Joined:{" "}
                    {grower.joinedDate.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
