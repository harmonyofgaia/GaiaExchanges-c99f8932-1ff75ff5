import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Upload, Heart, MessageCircle, Share, Bell, Trophy } from "lucide-react";
import { toast } from "sonner";

export default function VideoExchange() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subscribers, setSubscribers] = useState(1247);

  const channels = [
    {
      name: "Nature Harmony",
      owner: "EcoGardener",
      subscribers: "12.3K",
      videos: 47,
      category: "Environmental",
    },
    {
      name: "Green Tech Hub",
      owner: "TechSage",
      subscribers: "8.9K",
      videos: 23,
      category: "Technology",
    },
    {
      name: "Wildlife Stories",
      owner: "WildExplorer",
      subscribers: "15.6K",
      videos: 89,
      category: "Wildlife",
    },
  ];

  const videos = [
    {
      title: "Building a Sustainable Garden",
      channel: "Nature Harmony",
      views: "45K",
      likes: "2.1K",
      duration: "12:34",
    },
    {
      title: "Solar Panel Installation Guide",
      channel: "Green Tech Hub",
      views: "23K",
      likes: "987",
      duration: "18:45",
    },
    {
      title: "Rare Birds Documentary",
      channel: "Wildlife Stories",
      views: "78K",
      likes: "4.5K",
      duration: "45:12",
    },
  ];

  const uploadVideo = () => {
    toast.success("🎥 Video upload started!", {
      description: "Your video is being processed and will be available soon",
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
          📹 GAiA COMMUNITY VIDEO EXCHANGE
        </h1>
        <p className="text-muted-foreground mt-2">
          Outstanding video experience with personal channels
        </p>
      </div>

      {/* Channel Stats */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Trophy className="h-6 w-6" />
            Your Little Heaven Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {subscribers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">23</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">456K</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">12.5K</div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid gap-4">
            {videos.map((video, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="w-40 h-24 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-lg flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs">
                        {video.duration}
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="font-bold text-lg">{video.title}</div>
                      <div className="text-sm text-muted-foreground">{video.channel}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{video.views} views</span>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {video.likes}
                        </div>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4">
            {channels.map((channel, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="font-bold text-white">{channel.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-bold">{channel.name}</div>
                        <div className="text-sm text-muted-foreground">by {channel.owner}</div>
                        <div className="text-xs text-muted-foreground">
                          {channel.subscribers} subscribers • {channel.videos} videos
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{channel.category}</Badge>
                      <Button size="sm">
                        <Bell className="h-4 w-4 mr-1" />
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card className="border-2 border-green-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Upload className="h-6 w-6" />
                Upload to Your Little Heaven
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-green-400 mb-4" />
                <div className="text-lg font-bold text-green-400 mb-2">Drop your video here</div>
                <div className="text-muted-foreground mb-4">Supports MP4, AVI, MOV up to 2GB</div>
                <Button className="bg-green-600 hover:bg-green-700">Choose File</Button>
              </div>

              <div className="space-y-2">
                <Input placeholder="Video title" />
                <Input placeholder="Video description" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Tags (comma separated)" />
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Select category</option>
                    <option>Environmental</option>
                    <option>Technology</option>
                    <option>Wildlife</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={uploadVideo}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                🚀 Upload Video
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-blue-400">📊 Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Watch Time</span>
                    <span className="font-bold">1,247 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average View Duration</span>
                    <span className="font-bold">8:42</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement Rate</span>
                    <span className="font-bold text-green-400">12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-purple-400">🎯 Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Top Age Group</span>
                    <span className="font-bold">25-34</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Country</span>
                    <span className="font-bold">Netherlands</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Hours</span>
                    <span className="font-bold">20:00-22:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card className="border-2 border-orange-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                🌟 Community Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                  <Heart className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                  <div className="font-bold">Gifting System</div>
                  <div className="text-sm text-muted-foreground">Send tokens as gifts</div>
                </div>

                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                  <div className="font-bold">Challenges</div>
                  <div className="text-sm text-muted-foreground">Weekly video challenges</div>
                </div>

                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Badge className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <div className="font-bold">Badges</div>
                  <div className="text-sm text-muted-foreground">Earn achievement badges</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
