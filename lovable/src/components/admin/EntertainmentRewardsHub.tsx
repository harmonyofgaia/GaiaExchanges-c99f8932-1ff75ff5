import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Music,
  Gift,
  Coins,
  Trophy,
  Tv,
  Star,
  Play,
  Pause,
  Volume2,
  Bike,
  Car,
  Smartphone,
  Vault,
} from "lucide-react";
import { toast } from "sonner";

interface ArtistShow {
  id: string;
  artist: string;
  title: string;
  duration: string;
  price: number;
  currency: string;
  viewers: number;
  status: "live" | "scheduled" | "finished";
  genre: string;
  thumbnail: string;
}

interface Reward {
  id: string;
  name: string;
  type: "physical" | "digital" | "experience";
  value: number;
  currency: string;
  stock: number;
  claimed: number;
  category: string;
  emoji: string;
}

interface CommunityVault {
  totalBalance: number;
  currency: string;
  weeklyGiveaway: number;
  nextDrawDate: Date;
  participantsCount: number;
}

export function EntertainmentRewardsHub() {
  const [artistShows] = useState<ArtistShow[]>([
    {
      id: "1",
      artist: "GAIA Sound Collective",
      title: "Quantum Harmony Live",
      duration: "2h 15m",
      price: 50,
      currency: "GAIA",
      viewers: 1247,
      status: "live",
      genre: "Electronic Fusion",
      thumbnail: "🎵",
    },
    {
      id: "2",
      artist: "Nature's Voice Orchestra",
      title: "Earth Healing Concert",
      duration: "1h 45m",
      price: 35,
      currency: "GAIA",
      viewers: 892,
      status: "scheduled",
      genre: "Ambient Nature",
      thumbnail: "🌿",
    },
    {
      id: "3",
      artist: "Digital Dreams Band",
      title: "Metaverse Festival",
      duration: "3h 30m",
      price: 75,
      currency: "GAIA",
      viewers: 2156,
      status: "live",
      genre: "Virtual Reality",
      thumbnail: "🎮",
    },
    {
      id: "4",
      artist: "Cosmic Frequencies",
      title: "Interstellar Journey",
      duration: "2h 0m",
      price: 60,
      currency: "GAIA",
      viewers: 543,
      status: "finished",
      genre: "Space Music",
      thumbnail: "🚀",
    },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: "1",
      name: "GAIA Electric Bike",
      type: "physical",
      value: 2500,
      currency: "GAIA",
      stock: 50,
      claimed: 12,
      category: "transport",
      emoji: "🚲",
    },
    {
      id: "2",
      name: "Vintage Car Collection",
      type: "physical",
      value: 50000,
      currency: "GAIA",
      stock: 5,
      claimed: 1,
      category: "luxury",
      emoji: "🏎️",
    },
    {
      id: "3",
      name: "BlackBerry Classic Phone",
      type: "physical",
      value: 500,
      currency: "GAIA",
      stock: 100,
      claimed: 34,
      category: "tech",
      emoji: "📱",
    },
    {
      id: "4",
      name: "Amazon Gift Card",
      type: "digital",
      value: 100,
      currency: "GAIA",
      stock: 500,
      claimed: 156,
      category: "gift",
      emoji: "🎁",
    },
    {
      id: "5",
      name: "Netflix Premium Year",
      type: "digital",
      value: 200,
      currency: "GAIA",
      stock: 200,
      claimed: 67,
      category: "entertainment",
      emoji: "📺",
    },
    {
      id: "6",
      name: "GAIA VIP Experience",
      type: "experience",
      value: 1000,
      currency: "GAIA",
      stock: 25,
      claimed: 8,
      category: "exclusive",
      emoji: "⭐",
    },
  ]);

  const [communityVault, setCommunityVault] = useState<CommunityVault>({
    totalBalance: 2400000,
    currency: "GAIA",
    weeklyGiveaway: 50000,
    nextDrawDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    participantsCount: 15683,
  });

  const [currentShow, setCurrentShow] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(0);

  useEffect(() => {
    const updateStats = () => {
      // Simulate live show progress
      if (currentShow) {
        setShowProgress((prev) => (prev >= 100 ? 0 : prev + Math.random() * 2));
      }

      // Simulate vault growth
      setCommunityVault((prev) => ({
        ...prev,
        totalBalance: prev.totalBalance + Math.floor(Math.random() * 1000),
        participantsCount: prev.participantsCount + Math.floor(Math.random() * 10)
      }));

      console.log("🎬 ENTERTAINMENT & REWARDS HUB - MAXIMUM ENGAGEMENT ACTIVE");
      console.log(`🎵 ${artistShows.filter((s) => s.status === "live").length} Live Shows Running`);
      console.log(`🎁 ${rewards.reduce((sum, r) => sum + r.stock, 0)} Rewards Available`);
      console.log(`💰 Vault Balance: ${communityVault.totalBalance.toLocaleString()} GAIA`);
      console.log("🏆 Community Engagement: 100% - Everyone Happy!");
    };

    const interval = setInterval(updateStats, 3000);
    updateStats();

    return () => clearInterval(interval);
  }, [currentShow, communityVault.totalBalance, artistShows, rewards]);

  const watchShow = (showId: string) => {
    const show = artistShows.find((s) => s.id === showId);
    if (!show) return;

    setCurrentShow(showId);
    setShowProgress(0);

    toast.success(`🎵 NOW WATCHING: ${show.title}`, {
      description: `By ${show.artist} - Paid ${show.price} ${show.currency} tokens`,
      duration: 6000,
    });
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward || reward.stock <= reward.claimed) return;

    toast.success(`🎁 REWARD CLAIMED: ${reward.name}!`, {
      description: `Congratulations! You've claimed a ${reward.name} worth ${reward.value} ${reward.currency}`,
      duration: 8000,
    });
  };

  const getShowStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-600 animate-pulse";
      case "scheduled":
        return "bg-blue-600";
      case "finished":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transport":
        return <Bike className="h-4 w-4" />;
      case "luxury":
        return <Car className="h-4 w-4" />;
      case "tech":
        return <Smartphone className="h-4 w-4" />;
      case "gift":
        return <Gift className="h-4 w-4" />;
      case "entertainment":
        return <Tv className="h-4 w-4" />;
      case "exclusive":
        return <Star className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hub Overview */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Music className="h-6 w-6" />
            🎬 ENTERTAINMENT & REWARDS GALAXY HUB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <Play className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {artistShows.filter((s) => s.status === "live").length}
              </div>
              <div className="text-sm text-muted-foreground">Live Shows</div>
            </div>

            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {rewards.reduce((sum, r) => sum + r.stock, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Rewards Available</div>
            </div>

            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Vault className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {communityVault.totalBalance.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Vault Balance</div>
            </div>

            <div className="text-center p-4 bg-orange-900/30 rounded-lg">
              <Star className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {communityVault.participantsCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="shows" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shows">Artist Shows</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="vault">Community Vault</TabsTrigger>
        </TabsList>

        <TabsContent value="shows" className="space-y-4">
          {/* Current Show Player */}
          {currentShow && (
            <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Volume2 className="h-6 w-6" />
                  🎵 NOW PLAYING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-red-400">
                        {artistShows.find((s) => s.id === currentShow)?.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {artistShows.find((s) => s.id === currentShow)?.artist}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={showProgress} className="h-2" />
                  <div className="text-sm text-muted-foreground text-center">
                    {Math.round(showProgress)}% complete
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistShows.map((show) => (
              <Card key={show.id} className="border-pink-500/30 bg-pink-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-pink-400">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{show.thumbnail}</span>
                      <div>
                        <div className="text-sm">{show.title}</div>
                        <div className="text-xs text-muted-foreground">{show.artist}</div>
                      </div>
                    </div>
                    <Badge className={`${getShowStatusColor(show.status)} text-white`}>
                      {show.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Duration: {show.duration}</div>
                    <div>Genre: {show.genre}</div>
                    <div>
                      Price: {show.price} {show.currency}
                    </div>
                    <div>Viewers: {show.viewers}</div>
                  </div>

                  <Button
                    onClick={() => watchShow(show.id)}
                    disabled={show.status === "finished"}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {show.status === "live"
                      ? "WATCH LIVE"
                      : show.status === "scheduled"
                        ? "SET REMINDER"
                        : "FINISHED"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="border-yellow-500/30 bg-yellow-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-yellow-400">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{reward.emoji}</span>
                      <div>
                        <div className="text-sm">{reward.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {reward.type}
                        </div>
                      </div>
                    </div>
                    {getCategoryIcon(reward.category)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="text-green-400 font-bold">
                        {reward.value} {reward.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="text-blue-400">{reward.stock - reward.claimed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Claimed:</span>
                      <span className="text-orange-400">{reward.claimed}</span>
                    </div>
                  </div>

                  <Progress value={(reward.claimed / reward.stock) * 100} className="h-2" />

                  <Button
                    onClick={() => claimReward(reward.id)}
                    disabled={reward.stock <= reward.claimed}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    {reward.stock <= reward.claimed ? "OUT OF STOCK" : "CLAIM REWARD"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vault" className="space-y-4">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Vault className="h-6 w-6" />
                💰 COMMUNITY VAULT - GIVEAWAY CENTRAL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/30 rounded-lg">
                  <Coins className="h-8 w-8 mx-auto text-green-400 mb-2" />
                  <div className="text-2xl font-bold text-green-400">
                    {communityVault.totalBalance.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Balance</div>
                </div>

                <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-blue-400">
                    {communityVault.weeklyGiveaway.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Weekly Giveaway</div>
                </div>

                <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                  <Star className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-purple-400">
                    {communityVault.participantsCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Next Draw</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {communityVault.nextDrawDate.toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Prize Pool: {communityVault.weeklyGiveaway.toLocaleString()} GAIA
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">
                <Gift className="h-5 w-5 mr-2" />
                💰 ENTER WEEKLY GIVEAWAY - FREE ENTRY
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
