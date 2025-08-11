import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  Video,
  Upload,
  Users,
  Heart,
  Share,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface VideoStream {
  id: string;
  title: string;
  description: string;
  streamUrl: string;
  thumbnailUrl: string;
  streamer: string;
  viewers: number;
  likes: number;
  category: string;
  isLive: boolean;
  duration: string;
  uploadDate: Date;
}

interface StreamingStats {
  totalViews: number;
  totalStreamers: number;
  liveStreams: number;
  gaiaRewards: number;
}

export function VideoStreamingPlatform() {
  const [streams, setStreams] = useState<VideoStream[]>([
    {
      id: "1",
      title: "🌍 Gaia Token Environmental Impact LIVE",
      description:
        "Live discussion about how Harmony of Gaia is changing the world",
      streamUrl: "",
      thumbnailUrl: "/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png",
      streamer: "EcoMaster",
      viewers: 1247,
      likes: 892,
      category: "Environmental",
      isLive: true,
      duration: "2:34:12",
      uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "🎮 Gaia Fighter Game Championship",
      description: "Epic battles for environmental justice and GAiA rewards",
      streamUrl: "",
      thumbnailUrl: "/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png",
      streamer: "GaiaWarrior",
      viewers: 856,
      likes: 634,
      category: "Gaming",
      isLive: true,
      duration: "1:45:30",
      uploadDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "🏗️ Building Paradise in Landscape Builder",
      description: "Creating amazing virtual worlds with Gaia tools",
      streamUrl: "",
      thumbnailUrl: "/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png",
      streamer: "WorldBuilder",
      viewers: 432,
      likes: 287,
      category: "Creative",
      isLive: false,
      duration: "45:22",
      uploadDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ]);

  const [stats, setStats] = useState<StreamingStats>({
    totalViews: 2535,
    totalStreamers: 47,
    liveStreams: 2,
    gaiaRewards: 1250,
  });

  const [selectedStream, setSelectedStream] = useState<VideoStream | null>(
    null,
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [newStreamTitle, setNewStreamTitle] = useState("");
  const [newStreamDescription, setNewStreamDescription] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate live streaming updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          viewers: stream.isLive
            ? stream.viewers + Math.floor(Math.random() * 10) - 5
            : stream.viewers,
          likes: stream.likes + Math.floor(Math.random() * 3),
        })),
      );

      setStats((prev) => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 5),
        gaiaRewards: prev.gaiaRewards + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startStream = () => {
    if (!newStreamTitle.trim()) {
      toast.error("Please enter a stream title");
      return;
    }

    const newStream: VideoStream = {
      id: Date.now().toString(),
      title: newStreamTitle,
      description: newStreamDescription,
      streamUrl: "",
      thumbnailUrl: "/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png",
      streamer: "You",
      viewers: 1,
      likes: 0,
      category: "Live",
      isLive: true,
      duration: "00:00:00",
      uploadDate: new Date(),
    };

    setStreams((prev) => [newStream, ...prev]);
    setIsStreaming(true);
    setNewStreamTitle("");
    setNewStreamDescription("");

    toast.success("🎥 Stream Started!", {
      description: "You are now live! Earn GAiA tokens from viewers",
      duration: 5000,
    });
  };

  const stopStream = () => {
    setIsStreaming(false);
    toast.info("Stream ended", { duration: 2000 });
  };

  const watchStream = (stream: VideoStream) => {
    setSelectedStream(stream);
    toast.success(`Now watching: ${stream.title}`, {
      description: `Join ${stream.viewers} other viewers`,
      duration: 3000,
    });
  };

  const likeStream = (streamId: string) => {
    setStreams((prev) =>
      prev.map((stream) =>
        stream.id === streamId
          ? { ...stream, likes: stream.likes + 1 }
          : stream,
      ),
    );
    toast.success("❤️ Liked!", { duration: 1000 });
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Video className="h-6 w-6" />
          📺 GAIA STREAMING PLATFORM - Environmental & Gaming Content
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-purple-600 text-white">
            Live: {stats.liveStreams}
          </Badge>
          <Badge className="bg-pink-600 text-white">
            Streamers: {stats.totalStreamers}
          </Badge>
          <Badge className="bg-orange-600 text-white">
            Views: {stats.totalViews}
          </Badge>
          <Badge className="bg-green-600 text-white">
            GAiA Rewards: {stats.gaiaRewards}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* GAiA Token Integration */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">
              🌍 Harmony of Gaia Integration
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Token Contract:</div>
                <code className="font-mono text-xs text-green-400">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
              <div>
                <div className="text-muted-foreground">Streaming Rewards:</div>
                <div className="text-lg font-bold text-green-400">
                  Earn GAiA tokens!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Creation */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-lg font-bold text-blue-400 mb-4">
            🎥 Start Your Stream
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Stream title..."
              value={newStreamTitle}
              onChange={(e) => setNewStreamTitle(e.target.value)}
              className="bg-black/20"
            />
            <Textarea
              placeholder="Stream description..."
              value={newStreamDescription}
              onChange={(e) => setNewStreamDescription(e.target.value)}
              className="bg-black/20"
              rows={2}
            />
            <div className="flex gap-2">
              {!isStreaming ? (
                <Button
                  onClick={startStream}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Go Live
                </Button>
              ) : (
                <Button onClick={stopStream} variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  End Stream
                </Button>
              )}
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        {selectedStream && (
          <div className="bg-black/40 border border-gray-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-2">
              {selectedStream.title}
            </h3>
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Video Player</p>
                <p className="text-sm text-gray-500">
                  {selectedStream.isLive ? "🔴 LIVE" : "▶️ Recorded"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  <Users className="h-4 w-4 inline mr-1" />
                  {selectedStream.viewers} viewers
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => likeStream(selectedStream.id)}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {selectedStream.likes}
                </Button>
              </div>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        )}

        {/* Stream Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-purple-400">
            🌟 Featured Streams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map((stream) => (
              <div
                key={stream.id}
                className="bg-black/20 border border-gray-500/30 rounded-lg p-3 hover:bg-black/30 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg mb-3 flex items-center justify-center relative">
                  <img
                    src={stream.thumbnailUrl}
                    alt={stream.title}
                    className="w-full h-full object-cover rounded-lg opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={() => watchStream(stream)}
                      size="sm"
                      className="bg-white-20"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  {stream.isLive && (
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                      🔴 LIVE
                    </Badge>
                  )}
                </div>

                <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                  {stream.title}
                </h4>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {stream.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{stream.streamer}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      <Eye className="h-3 w-3 inline mr-1" />
                      {stream.viewers}
                    </span>
                    <span>
                      <Heart className="h-3 w-3 inline mr-1" />
                      {stream.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-purple-400 mb-2">
              📊 Platform Statistics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {stats.totalViews}
                </div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">
                  {stats.totalStreamers}
                </div>
                <div className="text-xs text-muted-foreground">Streamers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {stats.liveStreams}
                </div>
                <div className="text-xs text-muted-foreground">Live Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.gaiaRewards}
                </div>
                <div className="text-xs text-muted-foreground">
                  GAiA Rewards
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
