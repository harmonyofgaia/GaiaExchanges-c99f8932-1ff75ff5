import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Plus, Settings, Eye, Heart, MessageCircle } from "lucide-react";

export function VideoPersonalChannels() {
  const [channels] = useState([
    {
      id: 1,
      name: "EcoWarrior Sarah",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616c96f40b3?w=64&h=64&fit=crop&crop=face",
      subscribers: 15420,
      videos: 89,
      category: "Climate Action",
      verified: true,
      description: "Sharing sustainable living tips and climate action strategies",
    },
    {
      id: 2,
      name: "Green Tech Mike",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      subscribers: 8932,
      videos: 67,
      category: "Technology",
      verified: false,
      description: "Exploring renewable energy and green technology solutions",
    },
    {
      id: 3,
      name: "Nature Lover Emma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      subscribers: 12156,
      videos: 134,
      category: "Conservation",
      verified: true,
      description: "Wildlife conservation and biodiversity protection content",
    },
  ]);

  const [userVideos] = useState([
    {
      id: 1,
      title: "10 Ways to Reduce Your Carbon Footprint",
      thumbnail:
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop",
      views: 2543,
      likes: 189,
      comments: 34,
      duration: "8:45",
      uploadDate: "2 days ago",
    },
    {
      id: 2,
      title: "Solar Panel Installation Guide",
      thumbnail:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=300&h=200&fit=crop",
      views: 1876,
      likes: 145,
      comments: 28,
      duration: "12:30",
      uploadDate: "5 days ago",
    },
    {
      id: 3,
      title: "Composting for Beginners",
      thumbnail:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      views: 3421,
      likes: 267,
      comments: 52,
      duration: "6:15",
      uploadDate: "1 week ago",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Channel Creation */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Plus className="h-5 w-5" />
            Create Your Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" />
              <AvatarFallback>YC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Your Eco Channel</h3>
              <p className="text-sm text-muted-foreground">
                Share your environmental journey with the community
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Settings className="h-4 w-4 mr-2" />
              Customize Channel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Channels */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400">Featured Eco Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <div key={channel.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={channel.avatar} />
                    <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{channel.name}</h3>
                      {channel.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{channel.category}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground">
                      {channel.subscribers.toLocaleString()} subscribers
                    </span>
                    <span className="text-muted-foreground">{channel.videos} videos</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Subscribe
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Videos */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">Your Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>

                <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{video.uploadDate}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {video.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {video.comments}
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
