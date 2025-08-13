import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
} from "lucide-react";

export function InteractiveVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(600); // 10 minutes in seconds
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [comments] = useState([
    {
      id: 1,
      user: "EcoWarrior Sarah",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616c96f40b3?w=40&h=40&fit=crop&crop=face",
      content:
        "Great tips! I've been implementing these changes in my daily routine.",
      timestamp: "2 hours ago",
      likes: 15,
    },
    {
      id: 2,
      user: "Green Tech Mike",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content:
        "The solar panel installation guide was extremely helpful. Thank you!",
      timestamp: "4 hours ago",
      likes: 23,
    },
    {
      id: 3,
      user: "Nature Lover Emma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content:
        "We need more content like this to raise awareness about climate change.",
      timestamp: "1 day ago",
      likes: 31,
    },
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardContent className="p-0">
          {/* Video Display Area */}
          <div className="relative bg-black rounded-t-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-20 w-20 mx-auto mb-4 opacity-60" />
                <p className="text-lg font-medium">
                  Solar Energy Solutions for Your Home
                </p>
                <p className="text-sm opacity-75">
                  Environmental Education • 10:00
                </p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 h-1 rounded-full mb-3 cursor-pointer">
                <div
                  className="bg-green-400 h-full rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-white" />
                    <div className="w-20 h-1 bg-white/20 rounded-full">
                      <div
                        className="bg-white h-full rounded-full"
                        style={{ width: `${volume}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
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
          </div>

          {/* Video Info */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">
              Solar Energy Solutions for Your Home
            </h2>
            <p className="text-muted-foreground mb-4">
              Learn how to transition to renewable energy with practical solar
              panel installation tips and cost-effective solutions for
              sustainable living.
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" />
                  <AvatarFallback>GT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Green Tech Mike</p>
                  <p className="text-sm text-muted-foreground">
                    8.9K subscribers
                  </p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted rounded-full">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLike}
                    className={`rounded-l-full ${isLiked ? "text-green-400" : ""}`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    1.2K
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDislike}
                    className={`rounded-r-full ${isDisliked ? "text-red-400" : ""}`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>

                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">#SolarEnergy</Badge>
              <Badge variant="secondary">#RenewableEnergy</Badge>
              <Badge variant="secondary">#GreenTech</Badge>
              <Badge variant="secondary">#Sustainability</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Add a thoughtful comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {comment.user}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
