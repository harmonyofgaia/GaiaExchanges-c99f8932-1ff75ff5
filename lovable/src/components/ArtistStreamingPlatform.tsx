import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Users,
  Heart,
  Gift,
  Mic,
  Camera,
  DollarSign,
  Star,
  Flame,
  Music,
  Radio,
  Eye,
  MessageCircle,
  Crown,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { gaiaTokenService } from "@/services/gaiaTokenService";

interface LiveStream {
  id: string;
  artist: string;
  title: string;
  category: string;
  viewers: number;
  duration: string;
  isLive: boolean;
  thumbnailUrl: string;
  earnings: number;
  likes: number;
  comments: number;
  tokensEarned: number;
  tokensBurned: number;
}

interface StreamingStats {
  totalViewers: number;
  totalEarnings: number;
  totalTokensBurned: number;
  activeStreams: number;
}

export function ArtistStreamingPlatform() {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([
    {
      id: "1",
      artist: "Digital Harmony Collective",
      title: "Live Digital Art Creation - Environmental Themes",
      category: "Digital Art",
      viewers: 1247,
      duration: "2:34:15",
      isLive: true,
      thumbnailUrl: "",
      earnings: 847.5,
      likes: 2456,
      comments: 584,
      tokensEarned: 1200,
      tokensBurned: 240,
    },
    {
      id: "2",
      artist: "EcoMuse Studios",
      title: "Sustainable Art Workshop - Token Burning for Trees",
      category: "Workshop",
      viewers: 892,
      duration: "1:45:30",
      isLive: true,
      thumbnailUrl: "",
      earnings: 643.25,
      likes: 1847,
      comments: 342,
      tokensEarned: 900,
      tokensBurned: 180,
    },
    {
      id: "3",
      artist: "Quantum Canvas",
      title: "NFT Creation Live - Burning Tokens for Impact",
      category: "NFT Art",
      viewers: 2156,
      duration: "3:12:45",
      isLive: true,
      thumbnailUrl: "",
      earnings: 1247.8,
      likes: 3654,
      comments: 847,
      tokensEarned: 1800,
      tokensBurned: 360,
    },
    {
      id: "4",
      artist: "Nature's Voice",
      title: "Music for the Planet - Live Environmental Concert",
      category: "Music",
      viewers: 3456,
      duration: "2:56:20",
      isLive: true,
      thumbnailUrl: "",
      earnings: 2156.4,
      likes: 5247,
      comments: 1245,
      tokensEarned: 3000,
      tokensBurned: 600,
    },
  ]);

  const [streamingStats, setStreamingStats] = useState<StreamingStats>({
    totalViewers: 0,
    totalEarnings: 0,
    totalTokensBurned: 0,
    activeStreams: 0,
  });

  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(10);

  useEffect(() => {
    // Update streaming stats
    const stats = liveStreams.reduce(
      (acc, stream) => ({
        totalViewers: acc.totalViewers + stream.viewers,
        totalEarnings: acc.totalEarnings + stream.earnings,
        totalTokensBurned: acc.totalTokensBurned + stream.tokensBurned,
        activeStreams: acc.activeStreams + (stream.isLive ? 1 : 0),
      }),
      {
        totalViewers: 0,
        totalEarnings: 0,
        totalTokensBurned: 0,
        activeStreams: 0,
      },
    );

    setStreamingStats(stats);

    // Simulate live updates
    const interval = setInterval(() => {
      setLiveStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          viewers: Math.max(
            50,
            stream.viewers + Math.floor((Math.random() - 0.5) * 100),
          ),
          likes: stream.likes + Math.floor(Math.random() * 10),
          comments: stream.comments + Math.floor(Math.random() * 5),
          earnings: stream.earnings + Math.random() * 5,
          tokensEarned: stream.tokensEarned + Math.floor(Math.random() * 10),
          tokensBurned: stream.tokensBurned + Math.floor(Math.random() * 2),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  }, []);

  // Effect to update streaming stats whenever liveStreams changes
  useEffect(() => {
    const stats = liveStreams.reduce(
      (acc, stream) => ({
        totalViewers: acc.totalViewers + stream.viewers,
        totalEarnings: acc.totalEarnings + stream.earnings,
        totalTokensBurned: acc.totalTokensBurned + stream.tokensBurned,
        activeStreams: acc.activeStreams + (stream.isLive ? 1 : 0),
      }),
      {
        totalViewers: 0,
        totalEarnings: 0,
        totalTokensBurned: 0,
        activeStreams: 0,
      },
    );

    setStreamingStats(stats);
  }, [liveStreams]);
  const handleTipArtist = async (stream: LiveStream) => {
    try {
      // Burn tokens as part of the tipping process
      const burnAmount = Math.floor(tipAmount * 0.1); // 10% of tip gets burned
      const burnSuccess = await gaiaTokenService.burnTokens(
        burnAmount,
        `Tip for ${stream.artist}`,
      );

      if (burnSuccess) {
        toast.success(`💝 Tipped ${stream.artist}!`, {
          description: `${tipAmount} GAiA sent to artist | ${burnAmount} GAiA burned for environmental impact`,
          duration: 4000,
        });

        // Update stream earnings
        setLiveStreams((prev) =>
          prev.map((s) =>
            s.id === stream.id
              ? {
                  ...s,
                  earnings: s.earnings + tipAmount,
                  tokensBurned: s.tokensBurned + burnAmount,
                }
              : s,
          ),
        );
      }
    } catch (error) {
      toast.error("Tip failed - please try again");
    }
  };

  const handleWatchStream = (stream: LiveStream) => {
    setSelectedStream(stream.id);
    toast.success(`📺 Now watching: ${stream.title}`, {
      description: `Join ${stream.viewers} other viewers supporting ${stream.artist}`,
      duration: 3000,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Digital Art":
        return "bg-purple-600";
      case "Workshop":
        return "bg-green-600";
      case "NFT Art":
        return "bg-blue-600";
      case "Music":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Digital Art":
        return <Camera className="h-4 w-4" />;
      case "Workshop":
        return <Star className="h-4 w-4" />;
      case "NFT Art":
        return <Crown className="h-4 w-4" />;
      case "Music":
        return <Music className="h-4 w-4" />;
      default:
        return <Radio className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Radio className="h-6 w-6" />
            🎭 GAiA Artist Streaming Platform - Live Shows & Token Burning
          </CardTitle>
          <p className="text-muted-foreground">
            Support artists with GAiA tokens while contributing to environmental
            impact through token burning
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {streamingStats.totalViewers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Live Viewers</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {streamingStats.activeStreams}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Streams
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 border border-yellow-500/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {streamingStats.totalEarnings.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                GAiA Earned by Artists
              </div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">
                {streamingStats.totalTokensBurned}
              </div>
              <div className="text-sm text-muted-foreground">Tokens Burned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {liveStreams.map((stream) => (
          <Card
            key={stream.id}
            className={`border-2 hover:scale-105 transition-all duration-300 ${
              selectedStream === stream.id
                ? "border-purple-500 ring-4 ring-purple-500/20"
                : "border-border/50"
            }`}
          >
            <CardContent className="p-4 space-y-4">
              {/* Stream Thumbnail/Preview */}
              <div className="relative h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden flex items-center justify-center">
                {stream.thumbnailUrl ? (
                  <img
                    src={stream.thumbnailUrl}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-purple-400 mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">
                      Live Stream Preview
                    </div>
                  </div>
                )}

                {/* Live Badge */}
                {stream.isLive && (
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <Badge
                    className={`${getCategoryColor(stream.category)} text-white`}
                  >
                    {getCategoryIcon(stream.category)}
                    <span className="ml-1">{stream.category}</span>
                  </Badge>
                </div>

                {/* Viewer Count */}
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    <Eye className="h-3 w-3" />
                    {stream.viewers.toLocaleString()}
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
                    {stream.duration}
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div>
                <h3 className="font-bold text-lg text-white mb-1">
                  {stream.title}
                </h3>
                <p className="text-purple-400 font-medium">{stream.artist}</p>
              </div>

              {/* Stream Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-pink-400">
                    {stream.likes.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Heart className="h-3 w-3" />
                    Likes
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400">
                    {stream.comments}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Comments
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">
                    {stream.tokensEarned}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    GAiA Earned
                  </div>
                </div>
              </div>

              {/* Token Burning Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-400" />
                    Tokens Burned for Impact:
                  </span>
                  <span className="text-orange-400 font-bold">
                    {stream.tokensBurned}
                  </span>
                </div>
                <Progress
                  value={(stream.tokensBurned / stream.tokensEarned) * 100}
                  className="h-2"
                />
              </div>

              {/* Tipping Section */}
              <div className="space-y-3 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    value={tipAmount}
                    onChange={(e) =>
                      setTipAmount(parseInt(e.target.value) || 10)
                    }
                    className="flex-1"
                    placeholder="Tip amount"
                  />
                  <span className="text-sm text-muted-foreground">GAiA</span>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  10% of tips are burned for environmental impact
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleWatchStream(stream)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Live
                </Button>
                <Button
                  onClick={() => handleTipArtist(stream)}
                  variant="outline"
                  className="flex-1"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Tip Artist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* GAiA Integration Footer */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            🚀 Powered by GAiA Token - Supporting Artists & Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-sm text-green-400">
              <strong>Contract:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div className="text-sm text-blue-400">
              <strong>Wallet:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Every tip and interaction burns GAiA tokens for real environmental
              impact while supporting amazing artists. Join the creative
              community that makes a difference!
            </p>
            <div className="flex justify-center gap-4 text-xs mt-3">
              <Badge className="bg-purple-600 text-white">
                <Radio className="h-3 w-3 mr-1" />
                Live Streaming
              </Badge>
              <Badge className="bg-green-600 text-white">
                <DollarSign className="h-3 w-3 mr-1" />
                Artist Earnings
              </Badge>
              <Badge className="bg-orange-600 text-white">
                <Flame className="h-3 w-3 mr-1" />
                Token Burning
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Real Impact
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
