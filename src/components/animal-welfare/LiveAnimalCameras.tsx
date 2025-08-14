import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Heart,
  MapPin,
  Users,
  Clock,
  Wifi,
  WifiOff,
} from "lucide-react";
import { toast } from "sonner";

interface LiveCamera {
  id: string;
  name: string;
  location: string;
  country: string;
  species: string[];
  viewers: number;
  isLive: boolean;
  quality: "HD" | "4K" | "8K";
  description: string;
  sanctuary: string;
  lastActivity: string;
  donationGoal: number;
  donationRaised: number;
}

export function LiveAnimalCameras() {
  const [cameras, setCameras] = useState<LiveCamera[]>([
    {
      id: "1",
      name: "African Elephant Watering Hole",
      location: "Amboseli National Park",
      country: "Kenya",
      species: ["Elephants", "Zebras", "Giraffes"],
      viewers: 2847,
      isLive: true,
      quality: "4K",
      description: "Watch elephants gather at the watering hole in real-time",
      sanctuary: "Kenya Wildlife Service",
      lastActivity: "2 minutes ago",
      donationGoal: 5000,
      donationRaised: 3240,
    },
    {
      id: "2",
      name: "Giant Panda Sanctuary",
      location: "Chengdu Research Base",
      country: "China",
      species: ["Giant Pandas", "Red Pandas"],
      viewers: 5621,
      isLive: true,
      quality: "HD",
      description: "Live feed from the world's largest panda sanctuary",
      sanctuary: "Chengdu Panda Base",
      lastActivity: "Live now",
      donationGoal: 8000,
      donationRaised: 6890,
    },
    {
      id: "3",
      name: "Arctic Wolf Pack",
      location: "Yellowstone National Park",
      country: "USA",
      species: ["Gray Wolves", "Elk", "Bison"],
      viewers: 1923,
      isLive: true,
      quality: "HD",
      description: "Monitor the Yellowstone wolf pack behavior",
      sanctuary: "Yellowstone Wolf Project",
      lastActivity: "5 minutes ago",
      donationGoal: 3500,
      donationRaised: 1820,
    },
    {
      id: "4",
      name: "Great White Shark Cage",
      location: "Guadalupe Island",
      country: "Mexico",
      species: ["Great White Sharks", "Sea Lions"],
      viewers: 3456,
      isLive: true,
      quality: "4K",
      description: "Underwater live stream of great white sharks",
      sanctuary: "Marine Conservation Mexico",
      lastActivity: "1 minute ago",
      donationGoal: 12000,
      donationRaised: 4560,
    },
    {
      id: "5",
      name: "Orangutan Rehabilitation Center",
      location: "Borneo",
      country: "Indonesia",
      species: ["Orangutans", "Proboscis Monkeys"],
      viewers: 2156,
      isLive: false,
      quality: "HD",
      description: "Rehabilitation center for rescued orangutans",
      sanctuary: "Borneo Orangutan Survival",
      lastActivity: "1 hour ago",
      donationGoal: 6000,
      donationRaised: 2340,
    },
    {
      id: "6",
      name: "Sea Turtle Nesting Beach",
      location: "Costa Rica",
      country: "Costa Rica",
      species: ["Leatherback Turtles", "Green Turtles"],
      viewers: 1678,
      isLive: true,
      quality: "HD",
      description: "Night vision camera at turtle nesting beach",
      sanctuary: "Sea Turtle Conservancy",
      lastActivity: "Live now",
      donationGoal: 4500,
      donationRaised: 3890,
    },
  ]);

  const [playingCameras, setPlayingCameras] = useState<Set<string>>(new Set());
  const [mutedCameras, setMutedCameras] = useState<Set<string>>(new Set());

  const togglePlay = (cameraId: string) => {
    setPlayingCameras((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cameraId)) {
        newSet.delete(cameraId);
        toast.info("📹 Camera paused");
      } else {
        newSet.add(cameraId);
        toast.success("📹 Camera playing");
      }
      return newSet;
    });
  };

  const toggleMute = (cameraId: string) => {
    setMutedCameras((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cameraId)) {
        newSet.delete(cameraId);
        toast.info("🔊 Audio unmuted");
      } else {
        newSet.add(cameraId);
        toast.info("🔇 Audio muted");
      }
      return newSet;
    });
  };

  const donateToCamera = (cameraId: string, amount: number) => {
    setCameras((prev) =>
      prev.map((cam) =>
        cam.id === cameraId
          ? { ...cam, donationRaised: cam.donationRaised + amount }
          : cam,
      ),
    );
    toast.success("💝 Donation sent!", {
      description: `${amount} GAiA donated to support live camera feed`,
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📹 LIVE ANIMAL CAMERAS WORLDWIDE
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Real-time feeds from animal sanctuaries and wildlife reserves
            globally
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-green-600">
              <Wifi className="h-4 w-4 mr-1" />
              {cameras.filter((c) => c.isLive).length} Live Feeds
            </Badge>
            <Badge className="bg-blue-600">
              <Users className="h-4 w-4 mr-1" />
              {cameras
                .reduce((sum, c) => sum + c.viewers, 0)
                .toLocaleString()}{" "}
              Viewers
            </Badge>
            <Badge className="bg-purple-600">
              <Camera className="h-4 w-4 mr-1" />
              156 Total Cameras
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Camera Feeds */}
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">🔴 Live Now</TabsTrigger>
          <TabsTrigger value="wildlife">🦁 Wildlife</TabsTrigger>
          <TabsTrigger value="marine">🌊 Marine</TabsTrigger>
          <TabsTrigger value="rescue">🏥 Rescue Centers</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras
              .filter((cam) => cam.isLive)
              .map((camera) => (
                <Card
                  key={camera.id}
                  className="border-green-500/30 bg-gray-900/50"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                          <Camera className="h-5 w-5" />
                          {camera.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {camera.location}, {camera.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-red-600 animate-pulse">
                          🔴 LIVE
                        </Badge>
                        <p className="text-sm text-green-400 mt-1 flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {camera.viewers.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Simulated Video Player */}
                    <div className="relative bg-black aspect-video rounded-lg mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50 flex items-center justify-center">
                        {playingCameras.has(camera.id) ? (
                          <div className="text-center">
                            <div className="animate-pulse text-green-400 text-2xl mb-2">
                              📹
                            </div>
                            <p className="text-green-400">Live Feed Playing</p>
                            <p className="text-xs text-muted-foreground">
                              {camera.quality} Quality
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Play className="h-16 w-16 text-white/50 mb-2" />
                            <p className="text-white/70">
                              Click to start live feed
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePlay(camera.id)}
                            className="text-white hover:bg-white/20"
                          >
                            {playingCameras.has(camera.id) ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleMute(camera.id)}
                            className="text-white hover:bg-white/20"
                          >
                            {mutedCameras.has(camera.id) ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600">
                            {camera.quality}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                          >
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm">{camera.description}</p>

                      <div className="flex justify-between text-sm">
                        <span>Species: {camera.species.join(", ")}</span>
                        <span className="text-green-400">
                          {camera.lastActivity}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Camera Support Fund</span>
                          <span>
                            {(
                              (camera.donationRaised / camera.donationGoal) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(camera.donationRaised / camera.donationGoal) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{camera.donationRaised} GAiA raised</span>
                          <span>{camera.donationGoal} GAiA goal</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => donateToCamera(camera.id, 25)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          💚 25 GAiA
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => donateToCamera(camera.id, 100)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          📹 100 GAiA
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => donateToCamera(camera.id, 250)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          ⭐ 250 GAiA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="wildlife" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras
              .filter((cam) =>
                cam.species.some((s) =>
                  ["Elephants", "Giant Pandas", "Gray Wolves"].includes(s),
                ),
              )
              .map((camera) => (
                <Card
                  key={camera.id}
                  className="border-orange-500/30 bg-orange-900/20"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-orange-400 flex items-center gap-2">
                          <Camera className="h-5 w-5" />
                          {camera.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {camera.location}, {camera.country}
                        </p>
                      </div>
                      <div className="text-right">
                        {camera.isLive ? (
                          <Badge className="bg-green-600">🔴 LIVE</Badge>
                        ) : (
                          <Badge className="bg-gray-600">⏸️ OFFLINE</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{camera.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Species: {camera.species.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Managed by: {camera.sanctuary}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="marine" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras
              .filter((cam) =>
                cam.species.some((s) =>
                  [
                    "Great White Sharks",
                    "Leatherback Turtles",
                    "Green Turtles",
                  ].includes(s),
                ),
              )
              .map((camera) => (
                <Card
                  key={camera.id}
                  className="border-blue-500/30 bg-blue-900/20"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-blue-400 flex items-center gap-2">
                          <Camera className="h-5 w-5" />
                          {camera.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {camera.location}, {camera.country}
                        </p>
                      </div>
                      <div className="text-right">
                        {camera.isLive ? (
                          <Badge className="bg-green-600">🔴 LIVE</Badge>
                        ) : (
                          <Badge className="bg-gray-600">⏸️ OFFLINE</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{camera.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Species: {camera.species.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Managed by: {camera.sanctuary}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rescue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras
              .filter(
                (cam) =>
                  cam.name.includes("Rehabilitation") ||
                  cam.name.includes("Sanctuary"),
              )
              .map((camera) => (
                <Card
                  key={camera.id}
                  className="border-purple-500/30 bg-purple-900/20"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-purple-400 flex items-center gap-2">
                          <Heart className="h-5 w-5" />
                          {camera.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {camera.location}, {camera.country}
                        </p>
                      </div>
                      <div className="text-right">
                        {camera.isLive ? (
                          <Badge className="bg-green-600">🔴 LIVE</Badge>
                        ) : (
                          <Badge className="bg-gray-600">⏸️ OFFLINE</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{camera.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Species: {camera.species.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Managed by: {camera.sanctuary}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
