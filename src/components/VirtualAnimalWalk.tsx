import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Globe,
  Camera,
  Heart,
  Compass,
} from "lucide-react";
import { toast } from "sonner";

export function VirtualAnimalWalk() {
  const [selectedAnimal, setSelectedAnimal] = useState(
    "Thunder - The Majestic Eagle",
  );
  const [currentLocation, setCurrentLocation] = useState(
    "Rocky Mountain Sanctuary, Colorado",
  );
  const [destinationSearch, setDestinationSearch] = useState("");
  const [walkingMode, setWalkingMode] = useState(false);
  const [animalMood, setAnimalMood] = useState(85);

  const popularDestinations = [
    {
      name: "Amazon Rainforest, Brazil",
      type: "Jungle",
      difficulty: "Advanced",
    },
    {
      name: "Serengeti National Park, Tanzania",
      type: "Savanna",
      difficulty: "Intermediate",
    },
    {
      name: "Yellowstone National Park, USA",
      type: "Mountain",
      difficulty: "Beginner",
    },
    {
      name: "Great Barrier Reef, Australia",
      type: "Ocean",
      difficulty: "Expert",
    },
    {
      name: "Norwegian Fjords, Norway",
      type: "Arctic",
      difficulty: "Intermediate",
    },
    { name: "Madagascar Forests", type: "Tropical", difficulty: "Advanced" },
  ];

  const startVirtualWalk = (destination: string) => {
    setWalkingMode(true);
    setCurrentLocation(destination);
    setAnimalMood((prev) => Math.min(100, prev + 10));

    toast.success("🌍 Virtual Walk Started!", {
      description: `${selectedAnimal} is now exploring ${destination} with you!`,
      duration: 5000,
    });

    // Simulate walk experience
    setTimeout(() => {
      setWalkingMode(false);
      toast.success("🦅 Amazing Journey Completed!", {
        description: "Your animal gained new memories and experience!",
        duration: 3000,
      });
    }, 8000);
  };

  return (
    <div className="space-y-6">
      {/* Virtual Walk Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400 text-center justify-center">
            <Globe className="h-8 w-8" />
            🌍 VIRTUAL ANIMAL WALKS - GOOGLE EARTH INTEGRATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">🦅🌍</div>
            <p className="text-muted-foreground text-lg">
              Experience the world through your animal's eyes without plane
              tickets!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-600 text-white">
                Real Environments
              </Badge>
              <Badge className="bg-blue-600 text-white">Live Weather</Badge>
              <Badge className="bg-purple-600 text-white">
                Animal Perspective
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animal Selection & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Heart className="h-5 w-5" />
              Your Walking Companion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🦅</div>
              <h3 className="text-xl font-bold text-blue-400">
                {selectedAnimal}
              </h3>
              <p className="text-muted-foreground">Ready for adventure</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Mood Level:</span>
                <span className="text-green-400">{animalMood}%</span>
              </div>
              <div className="flex justify-between">
                <span>Current Location:</span>
                <span className="text-cyan-400 text-sm">{currentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span>Walking Status:</span>
                <Badge className={walkingMode ? "bg-green-600" : "bg-gray-600"}>
                  {walkingMode ? "Exploring" : "Ready"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Navigation className="h-5 w-5" />
              Destination Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                placeholder="Search any location on Earth..."
                className="bg-muted/50"
              />
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                disabled={!destinationSearch || walkingMode}
                onClick={() => startVirtualWalk(destinationSearch)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Start Virtual Walk
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Or choose from popular destinations below
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Destinations */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Compass className="h-6 w-6" />
            Popular Walking Destinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="p-4 bg-muted/30 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer"
                onClick={() =>
                  !walkingMode && startVirtualWalk(destination.name)
                }
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-green-400 text-sm">
                      {destination.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {destination.type}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Difficulty: {destination.difficulty}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={walkingMode}
                      className="text-xs"
                    >
                      <Camera className="h-3 w-3 mr-1" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Walking Experience Display */}
      {walkingMode && (
        <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 animate-pulse">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-8xl animate-bounce">🌍🦅</div>
              <h3 className="text-2xl font-bold text-yellow-400">
                Exploring {currentLocation}
              </h3>
              <p className="text-muted-foreground">
                Your animal is experiencing the sights, sounds, and
                environment...
              </p>
              <div className="flex justify-center gap-4 text-2xl">
                <span className="animate-pulse">👁️</span>
                <span className="animate-bounce">🌿</span>
                <span className="animate-pulse">🌤️</span>
                <span className="animate-bounce">🏔️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
