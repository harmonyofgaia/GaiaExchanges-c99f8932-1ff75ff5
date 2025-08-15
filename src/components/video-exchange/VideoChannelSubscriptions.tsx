import React, { useState , useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bell, BellOff, Music, Video, Users, Search, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface ChannelSubscription {
  id: string;
  channelName: string;
  avatar: string;
  subscribers: number;
  contentType: "music" | "video" | "mixed";
  isSubscribed: boolean;
  isLive: boolean;
  lastUpload: string;
  verified: boolean;
  description: string;
  speciality: string;
}

export function VideoChannelSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<ChannelSubscription[]>([
    {
      id: "1",
      channelName: "Harmony of Gaia",
      avatar:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop&crop=face",
      subscribers: 45600,
      contentType: "music",
      isSubscribed: true,
      isLive: true,
      lastUpload: "2 hours ago",
      verified: true,
      description: "Electronic eco music that connects souls with nature",
      speciality: "Live Electronic Performances",
    },
    {
      id: "2",
      channelName: "EcoSounds Collective",
      avatar:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop&crop=face",
      subscribers: 23400,
      contentType: "music",
      isSubscribed: true,
      isLive: false,
      lastUpload: "1 day ago",
      verified: true,
      description: "Ambient nature sounds and field recordings",
      speciality: "Nature Sound Design",
    },
    {
      id: "3",
      channelName: "Green Tech Reviews",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      subscribers: 18700,
      contentType: "video",
      isSubscribed: false,
      isLive: false,
      lastUpload: "3 days ago",
      verified: false,
      description: "Sustainable technology reviews and tutorials",
      speciality: "Eco Technology",
    },
    {
      id: "4",
      channelName: "Culture of Harmony",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      subscribers: 67800,
      contentType: "mixed",
      isSubscribed: true,
      isLive: true,
      lastUpload: "30 minutes ago",
      verified: true,
      description: "Music, documentaries, and cultural content for a better world",
      speciality: "Cultural Movement",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubscribe = (channelId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === channelId
          ? {
              ...sub,
              isSubscribed: !sub.isSubscribed,
              subscribers: sub.isSubscribed ? sub.subscribers - 1 : sub.subscribers + 1,
            }
          : sub
      )
    );

    const channel = subscriptions.find((sub) => sub.id === channelId);
    if (channel) {
      toast.success(
        channel.isSubscribed
          ? `Unsubscribed from ${channel.channelName}`
          : `Subscribed to ${channel.channelName}! 🔔`,
        {
          description: channel.isSubscribed ? "" : "You'll be notified of new uploads",
        }
      );
    }
  };

  const filteredChannels = subscriptions.filter(
    (channel) =>
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getContentIcon = (type: string) => {
    switch (type) {
      case "music":
        return <Music className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Bell className="h-5 w-5" />
            Channel Subscriptions & Discovery
          </CardTitle>
          <p className="text-muted-foreground">
            Follow your favorite creators and discover new talent
          </p>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search channels, artists, or content type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Discover</Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">
                {subscriptions.filter((s) => s.isSubscribed).length}
              </div>
              <div className="text-sm text-muted-foreground">Subscribed Channels</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {subscriptions.filter((s) => s.isLive && s.isSubscribed).length}
              </div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">
                {subscriptions.filter((s) => s.contentType === "music").length}
              </div>
              <div className="text-sm text-muted-foreground">Music Channels</div>
            </div>
          </div>

          {/* Channel List */}
          <div className="space-y-4">
            {filteredChannels.map((channel) => (
              <Card
                key={channel.id}
                className="border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={channel.avatar} />
                        <AvatarFallback>{channel.channelName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {channel.isLive && (
                        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          LIVE
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{channel.channelName}</h3>
                        {channel.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {getContentIcon(channel.contentType)}
                          <span className="ml-1 capitalize">{channel.contentType}</span>
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {channel.subscribers.toLocaleString()} subscribers
                        </div>
                        <div>Speciality: {channel.speciality}</div>
                        <div>Last upload: {channel.lastUpload}</div>
                      </div>

                      {channel.isLive && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-red-400 font-medium">
                            Currently streaming live
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleSubscribe(channel.id)}
                        variant={channel.isSubscribed ? "secondary" : "default"}
                        className={
                          channel.isSubscribed ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {channel.isSubscribed ? (
                          <>
                            <BellOff className="h-4 w-4 mr-2" />
                            Subscribed
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Subscribe
                          </>
                        )}
                      </Button>

                      {channel.isLive && (
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                          Watch Live
                        </Button>
                      )}

                      <Button size="sm" variant="outline">
                        View Channel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Discovery Section */}
          <Card className="mt-6 border-green-500/30 bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Trending Creators This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="h-4 w-4 text-purple-400" />
                    <span className="font-medium">New Music Talent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Discover emerging artists creating eco-conscious music
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-4 w-4 text-blue-400" />
                    <span className="font-medium">Educational Content</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn from sustainability experts and activists
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <span className="font-medium">Community Channels</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect with local environmental communities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
