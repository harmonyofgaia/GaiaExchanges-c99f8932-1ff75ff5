import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Users,
  Camera,
  Mic,
  Monitor,
  Settings,
  Music,
  Video,
  Headphones,
  Radio,
  Activity,
  Star,
  Heart,
  Eye,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface LiveShow {
  id: string;
  title: string;
  artist: string;
  status: "live" | "scheduled" | "ended";
  viewers: number;
  startTime: Date;
  category: string;
  thumbnail: string;
}

interface ArtistPlatform {
  id: string;
  name: string;
  genre: string;
  followers: number;
  totalShows: number;
  rating: number;
  isVerified: boolean;
  status: "active" | "inactive";
}

export function LiveArtistHub() {
  const [liveShows, setLiveShows] = useState<LiveShow[]>([]);
  const [artistPlatforms, setArtistPlatforms] = useState<ArtistPlatform[]>([]);
  const [streamingStats, setStreamingStats] = useState({
    activeLiveShows: 12,
    totalViewers: 2847,
    registeredArtists: 247,
    totalRevenue: 15847.32,
  });

  useEffect(() => {
    // Initialize with sample data
    const sampleShows: LiveShow[] = [
      {
        id: "1",
        title: "Harmony of Nature - Live Concert",
        artist: "EcoSounds Collective",
        status: "live",
        viewers: 847,
        startTime: new Date(),
        category: "Environmental Music",
        thumbnail: "/placeholder-stream.jpg",
      },
      {
        id: "2",
        title: "Ocean Waves Meditation",
        artist: "Aqua Harmony",
        status: "live",
        viewers: 234,
        startTime: new Date(Date.now() - 1800000),
        category: "Meditation",
        thumbnail: "/placeholder-stream.jpg",
      },
      {
        id: "3",
        title: "Forest Sounds Live Session",
        artist: "Nature's Voice",
        status: "scheduled",
        viewers: 0,
        startTime: new Date(Date.now() + 3600000),
        category: "Nature Sounds",
        thumbnail: "/placeholder-stream.jpg",
      },
    ];

    const sampleArtists: ArtistPlatform[] = [
      {
        id: "1",
        name: "EcoSounds Collective",
        genre: "Environmental",
        followers: 15847,
        totalShows: 47,
        rating: 4.8,
        isVerified: true,
        status: "active",
      },
      {
        id: "2",
        name: "Aqua Harmony",
        genre: "Meditation",
        followers: 8934,
        totalShows: 23,
        rating: 4.6,
        isVerified: true,
        status: "active",
      },
      {
        id: "3",
        name: "Nature's Voice",
        genre: "Nature Sounds",
        followers: 12456,
        totalShows: 34,
        rating: 4.9,
        isVerified: false,
        status: "active",
      },
    ];

    setLiveShows(sampleShows);
    setArtistPlatforms(sampleArtists);

    // Update streaming stats periodically
    const interval = setInterval(() => {
      setStreamingStats((prev) => ({
        ...prev,
        totalViewers: Math.floor(Math.random() * 3000 + 2000),
        totalRevenue: prev.totalRevenue + Math.random() * 10,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const createLiveShow = () => {
    toast.success("🎬 Live Show Created!", {
      description: "New live streaming session has been created",
      duration: 4000,
    });
  };

  const manageArtist = (action: string, artistId: string) => {
    toast.success(`🎭 Artist ${action}!`, {
      description: `Artist management action completed successfully`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            🎭 LIVE ARTIST HUB - STREAMING & PLATFORM CONTROL
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-purple-300">
              Live Streaming • Artist Platform Management • Content Control
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-purple-600 animate-pulse">LIVE STREAMING</Badge>
              <Badge className="bg-pink-600 animate-pulse">ARTIST PLATFORM</Badge>
              <Badge className="bg-blue-600 animate-pulse">FULL CONTROL</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 mx-auto text-red-400 mb-2" />
            <div className="text-2xl font-bold text-red-400">{streamingStats.activeLiveShows}</div>
            <div className="text-sm text-muted-foreground">Active Live Shows</div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              {streamingStats.totalViewers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Viewers</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {streamingStats.registeredArtists}
            </div>
            <div className="text-sm text-muted-foreground">Registered Artists</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-400">
              ${streamingStats.totalRevenue.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live-streaming" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live-streaming">🎬 Live Streaming</TabsTrigger>
          <TabsTrigger value="artist-platform">🎭 Artist Platform</TabsTrigger>
          <TabsTrigger value="content-control">⚙️ Content Control</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="live-streaming" className="space-y-4">
          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-400">🎬 Live Streaming Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={createLiveShow}
                className="w-full bg-red-600 hover:bg-red-700 h-16 text-lg"
              >
                <Play className="h-6 w-6 mr-2" />
                🎬 CREATE NEW LIVE SHOW
              </Button>

              <div className="space-y-4">
                <h4 className="text-red-400 font-bold">📺 Active Live Shows:</h4>
                {liveShows.map((show) => (
                  <Card key={show.id} className="border-gray-500/30 bg-gray-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white">{show.title}</h5>
                            <p className="text-sm text-muted-foreground">by {show.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={
                                  show.status === "live"
                                    ? "bg-red-600"
                                    : show.status === "scheduled"
                                      ? "bg-yellow-600"
                                      : "bg-gray-600"
                                }
                              >
                                {show.status.toUpperCase()}
                              </Badge>
                              {show.status === "live" && (
                                <span className="text-sm text-red-400 flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {show.viewers} viewers
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600">
                            <Monitor className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="bg-green-600">
                            <Settings className="h-3 w-3 mr-1" />
                            Control
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artist-platform" className="space-y-4">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🎭 Artist Platform Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                  <Users className="h-6 w-6 mr-2" />
                  👤 REGISTER NEW ARTIST
                </Button>

                <Button className="bg-pink-600 hover:bg-pink-700 h-16">
                  <Star className="h-6 w-6 mr-2" />⭐ FEATURED ARTISTS
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-purple-400 font-bold">🎨 Registered Artists:</h4>
                {artistPlatforms.map((artist) => (
                  <Card key={artist.id} className="border-gray-500/30 bg-gray-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                            <Music className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-white">{artist.name}</h5>
                              {artist.isVerified && (
                                <Badge className="bg-blue-600">✓ VERIFIED</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {artist.genre} • {artist.followers.toLocaleString()} followers
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-yellow-400 flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {artist.rating}/5.0
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {artist.totalShows} shows
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600"
                            onClick={() => manageArtist("verified", artist.id)}
                          >
                            ✓ Verify
                          </Button>
                          <Button
                            size="sm"
                            className="bg-orange-600"
                            onClick={() => manageArtist("featured", artist.id)}
                          >
                            ⭐ Feature
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600"
                            onClick={() => manageArtist("managed", artist.id)}
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content-control" className="space-y-4">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">⚙️ Content & Stream Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-red-600 hover:bg-red-700 h-16">
                  <Camera className="h-6 w-6 mr-2" />
                  📹 STREAM QUALITY
                </Button>

                <Button className="bg-blue-600 hover:bg-blue-700 h-16">
                  <Mic className="h-6 w-6 mr-2" />
                  🎤 AUDIO CONTROL
                </Button>

                <Button className="bg-green-600 hover:bg-green-700 h-16">
                  <Monitor className="h-6 w-6 mr-2" />
                  📺 MODERATION
                </Button>

                <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                  <Settings className="h-6 w-6 mr-2" />
                  ⚙️ SETTINGS
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-orange-400 font-bold">🎛️ Stream Controls:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-orange-300 mb-2 block">Stream Quality</label>
                      <select className="w-full p-2 bg-black/30 border border-orange-500/30 rounded">
                        <option>1080p HD</option>
                        <option>720p</option>
                        <option>480p</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-orange-300 mb-2 block">Audio Bitrate</label>
                      <select className="w-full p-2 bg-black/30 border border-orange-500/30 rounded">
                        <option>320 kbps</option>
                        <option>256 kbps</option>
                        <option>192 kbps</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-orange-300 mb-2 block">Max Viewers</label>
                      <Input type="number" defaultValue="5000" className="bg-black/30" />
                    </div>

                    <div>
                      <label className="text-sm text-orange-300 mb-2 block">
                        Stream Duration (hours)
                      </label>
                      <Input type="number" defaultValue="12" className="bg-black/30" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">📊 Live Artist Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-green-400 font-bold">📈 Performance Metrics:</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Viewer Engagement</span>
                        <span className="text-green-400">87.3%</span>
                      </div>
                      <Progress value={87.3} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Artist Satisfaction</span>
                        <span className="text-green-400">94.7%</span>
                      </div>
                      <Progress value={94.7} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Stream Quality</span>
                        <span className="text-green-400">98.1%</span>
                      </div>
                      <Progress value={98.1} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-blue-400 font-bold">🎯 Revenue Analytics:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-black/30 rounded">
                      <div className="text-sm text-muted-foreground">Today's Revenue</div>
                      <div className="text-2xl font-bold text-green-400">
                        ${(streamingStats.totalRevenue * 0.1).toFixed(2)}
                      </div>
                    </div>

                    <div className="p-3 bg-black/30 rounded">
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      <div className="text-2xl font-bold text-blue-400">
                        ${streamingStats.totalRevenue.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-3 bg-black/30 rounded">
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                      <div className="text-2xl font-bold text-purple-400">+23.7%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
