import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MessageCircle,
  Calendar,
  Star,
  ThumbsUp,
  Share2,
  Plus,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  verified: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  organizer: string;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  });
  const [filter, setFilter] = useState("all");

  const posts: CommunityPost[] = [
    {
      id: "1",
      author: "EcoWarrior2024",
      avatar: "🌱",
      title: "Amazing results from my home solar installation!",
      content:
        "Just wanted to share my 6-month solar journey. Generated 2,400 kWh and earned 240 GAiA tokens through verified green energy production!",
      category: "Energy",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 127,
      comments: 23,
      shares: 15,
      tags: ["solar", "renewable", "success"],
      verified: true,
    },
    {
      id: "2",
      author: "GreenThumb_Alice",
      avatar: "🌿",
      title: "Community Garden Project - Join Us!",
      content:
        "Starting a new community garden in downtown area. Looking for volunteers and contributors. Together we can create a green oasis!",
      category: "Gardening",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 89,
      comments: 34,
      shares: 28,
      tags: ["community", "gardening", "volunteer"],
      verified: false,
    },
    {
      id: "3",
      author: "TechForNature",
      avatar: "💻",
      title: "New AI tool for carbon footprint tracking",
      content:
        "Developed an open-source app that uses AI to track and reduce your carbon footprint. Check it out and let me know your thoughts!",
      category: "Technology",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 156,
      comments: 42,
      shares: 67,
      tags: ["AI", "carbon", "tech", "opensource"],
      verified: true,
    },
  ];

  const events: CommunityEvent[] = [
    {
      id: "1",
      title: "Global Climate Action Day",
      description:
        "Join thousands of eco-warriors worldwide for coordinated climate action activities",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Worldwide (Virtual & Local)",
      attendees: 12847,
      maxAttendees: 50000,
      category: "Global Event",
      organizer: "GAiA Community",
    },
    {
      id: "2",
      title: "Urban Beekeeping Workshop",
      description:
        "Learn how to start and maintain bee colonies in urban environments",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: "Green Community Center, Portland",
      attendees: 23,
      maxAttendees: 30,
      category: "Workshop",
      organizer: "BeekeepingPro",
    },
    {
      id: "3",
      title: "Ocean Cleanup Mission",
      description: "Beach cleanup and ocean plastic removal expedition",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: "Pacific Coast Beach, CA",
      attendees: 156,
      maxAttendees: 200,
      category: "Action",
      organizer: "OceanGuardians",
    },
  ];

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Please fill in title and content");
      return;
    }

    toast.success("Post created successfully! +10 community points earned");
    setNewPost({ title: "", content: "", category: "general" });
  };

  const handleJoinEvent = (eventId: string) => {
    toast.success("Successfully joined event! Calendar reminder added");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Energy: "bg-yellow-600",
      Gardening: "bg-green-600",
      Technology: "bg-blue-600",
      Conservation: "bg-cyan-600",
      Education: "bg-purple-600",
    };
    return colors[category as keyof typeof colors] || "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Community Hub
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Connect, Share, and Grow Together in Environmental Action
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          {[
            { id: "discussions", label: "💬 Discussions", icon: MessageCircle },
            { id: "events", label: "📅 Events", icon: Calendar },
            { id: "projects", label: "🚀 Projects", icon: Star },
            { id: "create", label: "➕ Create Post", icon: Plus },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "discussions" && (
              <div className="space-y-6">
                {/* Filter Bar */}
                <div className="flex gap-4 items-center">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <div className="flex gap-2">
                    {[
                      "all",
                      "Energy",
                      "Gardening",
                      "Technology",
                      "Conservation",
                    ].map((category) => (
                      <Button
                        key={category}
                        onClick={() => setFilter(category)}
                        variant={filter === category ? "default" : "outline"}
                        size="sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-gray-900/50 border-gray-700/30"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{post.avatar}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white">
                                {post.author}
                              </h3>
                              {post.verified && (
                                <Badge className="bg-blue-600 text-xs">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {post.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-green-400">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{post.content}</p>

                      <div className="flex gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-400"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-green-400"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="space-y-6">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-blue-900/20 border-blue-500/30"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-blue-400">
                            {event.title}
                          </CardTitle>
                          <p className="text-muted-foreground mt-1">
                            by {event.organizer}
                          </p>
                        </div>
                        <Badge className="bg-purple-600">
                          {event.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{event.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="text-white">
                            {event.date.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Location
                          </p>
                          <p className="text-white">{event.location}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-green-400">
                            {event.attendees}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            / {event.maxAttendees} attendees
                          </span>
                        </div>
                        <Button
                          onClick={() => handleJoinEvent(event.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Join Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "create" && (
              <Card className="bg-gray-900/50 border-gray-700/30">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    ✍️ Create New Post
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Post Title
                    </label>
                    <Input
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                      placeholder="Share your eco-achievement or idea..."
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={newPost.category}
                      onChange={(e) =>
                        setNewPost({ ...newPost, category: e.target.value })
                      }
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                    >
                      <option value="general">General Discussion</option>
                      <option value="Energy">Renewable Energy</option>
                      <option value="Gardening">Gardening & Agriculture</option>
                      <option value="Technology">Green Technology</option>
                      <option value="Conservation">Conservation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      placeholder="Tell your story, share tips, ask questions..."
                      className="bg-gray-800 border-gray-600 min-h-32"
                    />
                  </div>

                  <Button
                    onClick={handleCreatePost}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post (+10 Community Points)
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  📊 Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="text-white font-bold">47,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts Today</span>
                  <span className="text-white font-bold">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Events This Week
                  </span>
                  <span className="text-white font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects Active</span>
                  <span className="text-white font-bold">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">
                  🌟 Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "EcoMaster_Pro", points: 8547, avatar: "🌟" },
                  { name: "GreenInnovator", points: 7234, avatar: "💚" },
                  { name: "NatureGuardian", points: 6891, avatar: "🛡️" },
                  { name: "SolarPioneer", points: 6234, avatar: "☀️" },
                ].map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="flex items-center gap-3"
                  >
                    <div className="text-2xl">{contributor.avatar}</div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {contributor.name}
                      </div>
                      <div className="text-sm text-green-400">
                        {contributor.points.toLocaleString()} points
                      </div>
                    </div>
                    <Badge className="bg-yellow-600">#{index + 1}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400">
                  ⚡ Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                  🎯 Start New Project
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  📅 Create Event
                </Button>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                  🏆 Join Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
