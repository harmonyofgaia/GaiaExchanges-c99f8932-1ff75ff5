import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Play,
  Heart,
  Clock,
  Star,
  Search,
  Radio,
  Film,
  TreePine,
  Atom,
  Calendar,
  Users,
  TrendingUp,
  Camera,
  Smile,
} from "lucide-react";
import { toast } from "sonner";
import AutoDiscoveryService from "@/components/streaming/AutoDiscoveryService";

interface Show {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: string;
  year: string;
  rating: number;
  views: number;
  isLive?: boolean;
  uploadDate: string;
}

export default function StreamingShows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Shows", icon: Film, color: "bg-purple-600" },
    {
      id: "retro-70s-80s",
      name: "70s & 80s Life",
      icon: Calendar,
      color: "bg-orange-600",
    },
    {
      id: "nature-wildlife",
      name: "Nature & Wildlife",
      icon: TreePine,
      color: "bg-green-600",
    },
    {
      id: "mad-science",
      name: "Mad Science",
      icon: Atom,
      color: "bg-blue-600",
    },
    { id: "live-shows", name: "Live Shows", icon: Radio, color: "bg-red-600" },
    { id: "happiness", name: "Feel Good", icon: Smile, color: "bg-yellow-600" },
    {
      id: "hidden-secrets",
      name: "Hidden Secrets",
      icon: Camera,
      color: "bg-indigo-600",
    },
  ];

  useEffect(() => {
    // Simulate loading and fetching shows
    const loadShows = async () => {
      setIsLoading(true);

      // Mock data with your requested categories
      const mockShows: Show[] = [
        {
          id: "1",
          title: "Life in the Golden 70s: When Happiness Was Simple",
          category: "retro-70s-80s",
          description:
            "Explore the authentic happiness and simplicity of 1970s life - better cars, genuine communities, and real human connections.",
          thumbnail: "🌅",
          duration: "48:32",
          year: "1975",
          rating: 4.9,
          views: 15420,
          uploadDate: "2024-01-15",
        },
        {
          id: "2",
          title: "The 80s Revolution: Cars, Culture & Community",
          category: "retro-70s-80s",
          description:
            "Discover why the 1980s represented peak human culture - from innovative automobiles to tight-knit neighborhoods.",
          thumbnail: "🚗",
          duration: "52:18",
          year: "1983",
          rating: 4.8,
          views: 12890,
          uploadDate: "2024-01-12",
        },
        {
          id: "3",
          title: "Secret Lives of Forest Elephants",
          category: "nature-wildlife",
          description:
            "Never-before-seen footage of forest elephants and their mysterious behaviors in remote African jungles.",
          thumbnail: "🐘",
          duration: "41:25",
          year: "2024",
          rating: 4.7,
          views: 8760,
          uploadDate: "2024-01-10",
        },
        {
          id: "4",
          title: "Quantum Mysteries: The Mad Science of Reality",
          category: "mad-science",
          description:
            "Mind-bending experiments that challenge everything we thought we knew about physics and reality.",
          thumbnail: "⚛️",
          duration: "55:43",
          year: "2024",
          rating: 4.6,
          views: 9340,
          uploadDate: "2024-01-08",
        },
        {
          id: "5",
          title: "LIVE: Ocean Depths Explorer",
          category: "live-shows",
          description:
            "Live underwater exploration of never-seen ocean creatures and mysterious depths.",
          thumbnail: "🌊",
          duration: "LIVE",
          year: "2024",
          rating: 4.9,
          views: 2847,
          isLive: true,
          uploadDate: "2024-01-20",
        },
        {
          id: "6",
          title: "The Science of Genuine Happiness",
          category: "happiness",
          description:
            "Discover the forgotten secrets of true happiness from simpler times and how to apply them today.",
          thumbnail: "😊",
          duration: "44:12",
          year: "2023",
          rating: 4.8,
          views: 11230,
          uploadDate: "2024-01-05",
        },
        {
          id: "7",
          title: "Hidden Civilizations: What They Never Told Us",
          category: "hidden-secrets",
          description:
            "Uncover archaeological discoveries that challenge official history and reveal hidden truths.",
          thumbnail: "🏛️",
          duration: "58:27",
          year: "2024",
          rating: 4.5,
          views: 7650,
          uploadDate: "2024-01-03",
        },
      ];

      setShows(mockShows);
      setIsLoading(false);
    };

    loadShows();
  }, []);

  const filteredShows = shows.filter((show) => {
    const matchesCategory =
      selectedCategory === "all" || show.category === selectedCategory;
    const matchesSearch =
      show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlay = (show: Show) => {
    toast.success(`▶️ Now playing: ${show.title}`);
  };

  const handleLike = (showId: string) => {
    toast.success("💚 Added to your favorites!");
  };

  const ShowCard = ({ show }: { show: Show }) => (
    <Card className="bg-card/50 border-green-500/20 hover:bg-card/70 transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="text-6xl">{show.thumbnail}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-white text-lg">{show.title}</h3>
              {show.isLive && (
                <Badge className="bg-red-600 animate-pulse text-white">
                  🔴 LIVE
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {show.description}
            </p>

            <div className="flex items-center gap-4 mb-3">
              <Badge variant="outline" className="text-xs">
                {show.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {show.duration}
              </span>
              <span className="text-xs text-muted-foreground">{show.year}</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs">{show.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                {show.views.toLocaleString()} views
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleLike(show.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handlePlay(show)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-1" />
                  {show.isLive ? "Join Live" : "Watch"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <AutoDiscoveryService />
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🎬 GAiA Streaming Shows Platform
              </CardTitle>
              <div className="text-center space-y-2">
                <p className="text-xl text-muted-foreground">
                  Discover Life's True Beauty - From Golden 70s/80s to Hidden
                  Wonders
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge className="bg-orange-600">📅 Retro Life</Badge>
                  <Badge className="bg-green-600">🌿 Nature</Badge>
                  <Badge className="bg-blue-600">🔬 Mad Science</Badge>
                  <Badge className="bg-red-600">🔴 Live Shows</Badge>
                  <Badge className="bg-yellow-600">😊 Feel Good</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Auto-Discovery Status */}
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">
                    Daily Web Scanning Active
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last scan: 2 hours ago • 847 sources monitored • 3 new docs
                  found
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <Card className="bg-card/50 border-gray-500/20">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documentaries, shows, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={`${selectedCategory === category.id ? category.color : ""} transition-all`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Shows Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading amazing content...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                {selectedCategory === "all"
                  ? "🌟 All Shows"
                  : categories.find((c) => c.id === selectedCategory)?.name}
                ({filteredShows.length} available)
              </h2>
              <div className="space-y-4">
                {filteredShows.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-orange-900/30 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">127</div>
                <div className="text-xs text-muted-foreground">
                  70s/80s Documentaries
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-900/30 border-green-500/30">
              <CardContent className="p-4 text-center">
                <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">89</div>
                <div className="text-xs text-muted-foreground">
                  Nature & Wildlife
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Atom className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">45</div>
                <div className="text-xs text-muted-foreground">Mad Science</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-500/30">
              <CardContent className="p-4 text-center">
                <Radio className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400">12</div>
                <div className="text-xs text-muted-foreground">Live Shows</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
