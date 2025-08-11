import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Users,
  MessageCircle,
  Heart,
  Share,
  Radio,
  Mic,
  Camera,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

export function LiveArtistShow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [viewerCount, setViewerCount] = useState(1247);
  const [chatMessages, setChatMessages] = useState([
    { user: "GaiaFan1", message: "Amazing performance! 🎵", time: "10:23" },
    {
      user: "EcoWarrior",
      message: "Love the environmental message",
      time: "10:24",
    },
    { user: "MusicLover", message: "This is incredible! 🔥", time: "10:25" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        user: "Admin",
        message: newMessage,
        time: new Date().toLocaleTimeString().slice(0, 5),
      };
      setChatMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      toast.success("Message sent to live chat!");
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Player */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-purple-400">
              <div className="flex items-center gap-2">
                <Radio className="h-6 w-6" />
                🎭 LIVE ARTIST SHOW - GAiA Sessions
              </div>
              <Badge className="bg-red-600 text-white animate-pulse">
                🔴 LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                poster="/placeholder-video-poster.jpg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/sample-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handlePlayPause}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={toggleMute}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) =>
                          handleVolumeChange(Number(e.target.value))
                        }
                        className="w-20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={toggleFullscreen}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-red-900/20 rounded border border-red-500/20">
                <Users className="h-5 w-5 text-red-400 mx-auto mb-1" />
                <div className="font-bold text-red-400">
                  {viewerCount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Live Viewers
                </div>
              </div>
              <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                <Heart className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <div className="font-bold text-green-400">2.4K</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                <Share className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                <div className="font-bold text-blue-400">847</div>
                <div className="text-xs text-muted-foreground">Shares</div>
              </div>
              <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
                <MessageCircle className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                <div className="font-bold text-purple-400">1.2K</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Controls */}
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="text-orange-400">
              🎛️ Admin Stream Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Camera className="h-4 w-4 mr-2" />
                Start Stream
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Monitor className="h-4 w-4 mr-2" />
                End Stream
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Mic className="h-4 w-4 mr-2" />
                Audio Settings
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Settings className="h-4 w-4 mr-2" />
                Stream Config
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Chat */}
      <div className="space-y-4">
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              💬 Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-2 mb-4 bg-black/20 rounded p-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <span className="text-cyan-400 font-bold">{msg.user}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {msg.time}
                  </span>
                  <div className="text-white ml-2">{msg.message}</div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message to viewers..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stream Analytics */}
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">📊 Live Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Stream Duration:</span>
              <span className="font-bold text-yellow-400">1:23:45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Peak Viewers:</span>
              <span className="font-bold text-yellow-400">1,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Engagement Rate:</span>
              <span className="font-bold text-yellow-400">92.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Stream Quality:</span>
              <span className="font-bold text-green-400">1080p60</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
