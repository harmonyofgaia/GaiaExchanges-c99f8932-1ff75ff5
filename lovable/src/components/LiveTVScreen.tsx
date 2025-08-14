import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Play,
  Users,
  DollarSign,
  Flame,
  Heart,
  Star,
  Eye,
  Tv,
  Calendar,
  Clock,
  Coins,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface LiveShow {
  id: string;
  title: string;
  artist: string;
  description: string;
  startTime: string;
  duration: string;
  ticketPrice: number;
  viewers: number;
  isLive: boolean;
  category: string;
  thumbnailUrl: string;
  streamUrl: string;
  tokensCollected: number;
  ecologyContribution: number;
}

export function LiveTVScreen() {
  const [currentShow, setCurrentShow] = useState<LiveShow | null>(null);
  const [upcomingShows, setUpcomingShows] = useState<LiveShow[]>([
    {
      id: "1",
      title: "Harmony of Gaia - Environmental Art Live",
      artist: "EcoCanvas Collective",
      description:
        "Live painting session creating environmental awareness art while burning GAiA tokens for coral reef restoration",
      startTime: "2024-01-15 19:00",
      duration: "2 hours",
      ticketPrice: 50,
      viewers: 1247,
      isLive: true,
      category: "Environmental Art",
      thumbnailUrl: "/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png",
      streamUrl: "",
      tokensCollected: 3420,
      ecologyContribution: 684,
    },
    {
      id: "2",
      title: "Digital Landscapes - VR Creation Show",
      artist: "VirtualWorld Studios",
      description:
        "Building stunning virtual landscapes in real-time using our 3D tools, with token burns funding reforestation",
      startTime: "2024-01-15 21:00",
      duration: "90 minutes",
      ticketPrice: 75,
      viewers: 892,
      isLive: false,
      category: "Digital Art",
      thumbnailUrl: "/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png",
      streamUrl: "",
      tokensCollected: 2156,
      ecologyContribution: 431,
    },
    {
      id: "3",
      title: "Sound Riffs for Ocean Recovery",
      artist: "Acoustic Harmony",
      description:
        "Musical performance with underwater coral restoration footage, tokens burned for marine protection",
      startTime: "2024-01-16 18:30",
      duration: "3 hours",
      ticketPrice: 100,
      viewers: 2341,
      isLive: false,
      category: "Music & Environment",
      thumbnailUrl: "/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png",
      streamUrl: "",
      tokensCollected: 5890,
      ecologyContribution: 1178,
    },
  ]);

  const [paymentAmount, setPaymentAmount] = useState<number>(50);
  const [totalTokensBurned, setTotalTokensBurned] = useState<number>(12450);
  const [totalEcologyFunding, setTotalEcologyFunding] = useState<number>(2490);

  useEffect(() => {
    // Set the first live show as current
    const liveShow = upcomingShows.find((show) => show.isLive);
    if (liveShow) {
      setCurrentShow(liveShow);
    }

    // Simulate live updates
    const interval = setInterval(() => {
      setUpcomingShows((prev) =>
        prev.map((show) => ({
          ...show,
          viewers: show.isLive ? show.viewers + Math.floor(Math.random() * 20) - 10 : show.viewers,
          tokensCollected: show.tokensCollected + Math.floor(Math.random() * 50),
          ecologyContribution: Math.floor(show.tokensCollected * 0.2),
        }))
      );

      setTotalTokensBurned((prev) => prev + Math.floor(Math.random() * 10));
      setTotalEcologyFunding((prev) => prev + Math.floor(Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePayForShow = (show: LiveShow) => {
    const burnAmount = Math.floor(paymentAmount * 0.2); // 20% of payment gets burned
    const ecologyAmount = Math.floor(paymentAmount * 0.3); // 30% goes to ecology

    toast.success(`🎫 Show Access Granted!`, {
      description: `Paid ${paymentAmount} GAiA | ${burnAmount} burned for environment | ${ecologyAmount} to ecology projects`,
      duration: 5000,
    });

    setCurrentShow(show);

    // Update show statistics
    setUpcomingShows((prev) =>
      prev.map((s) =>
        s.id === show.id
          ? {
              ...s,
              tokensCollected: s.tokensCollected + paymentAmount,
              ecologyContribution: s.ecologyContribution + ecologyAmount,
              viewers: s.viewers + 1,
            }
          : s
      )
    );

    setTotalTokensBurned((prev) => prev + burnAmount);
    setTotalEcologyFunding((prev) => prev + ecologyAmount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Environmental Art":
        return "bg-green-600";
      case "Digital Art":
        return "bg-purple-600";
      case "Music & Environment":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* GAiA Live TV Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Tv className="h-6 w-6" />
            📺 GAiA LIVE TV - Environmental Shows & Token Burning
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-xl font-bold text-orange-400">
                {totalTokensBurned.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Tokens Burned</div>
            </div>
            <div className="text-center p-3 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-xl font-bold text-green-400">
                {totalEcologyFunding.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Ecology Funding</div>
            </div>
            <div className="text-center p-3 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-xl font-bold text-blue-400">
                {upcomingShows.filter((s) => s.isLive).length}
              </div>
              <div className="text-xs text-muted-foreground">Live Shows</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <div className="text-xl font-bold text-purple-400">
                {upcomingShows.reduce((sum, show) => sum + show.viewers, 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Viewers</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main TV Screen */}
      {currentShow && (
        <Card className="border-2 border-purple-500/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Video Player Area */}
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                {currentShow.thumbnailUrl ? (
                  <img
                    src={currentShow.thumbnailUrl}
                    alt={currentShow.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Tv className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Live TV Stream</p>
                    </div>
                  </div>
                )}

                {/* Live Indicator */}
                {currentShow.isLive && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      🔴 LIVE
                    </div>
                  </div>
                )}

                {/* Viewer Count */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded-full">
                    <Eye className="h-4 w-4" />
                    {currentShow.viewers.toLocaleString()} viewers
                  </div>
                </div>

                {/* Token Burn Progress */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-white text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-400" />
                        Tokens Burned: {currentShow.ecologyContribution}
                      </span>
                      <span className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-green-400" />
                        Collected: {currentShow.tokensCollected}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (currentShow.tokensCollected / 10000) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Information */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentShow.title}</h3>
                    <p className="text-lg text-purple-400">{currentShow.artist}</p>
                  </div>
                  <Badge className={`${getCategoryColor(currentShow.category)} text-white`}>
                    {currentShow.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground">{currentShow.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-400" />
                    {currentShow.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-400" />
                    {currentShow.startTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-yellow-400" />
                    {currentShow.ticketPrice} GAiA
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Section */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">
            💰 Pay for Show Access - Support Environment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Amount (GAiA)</label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min={1}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Token Distribution</label>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Artist (50%):</span>
                  <span className="text-green-400">{Math.floor(paymentAmount * 0.5)} GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span>Ecology Projects (30%):</span>
                  <span className="text-blue-400">{Math.floor(paymentAmount * 0.3)} GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span>Burned for Impact (20%):</span>
                  <span className="text-orange-400">{Math.floor(paymentAmount * 0.2)} GAiA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              GAiA Contract:{" "}
              <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Shows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            🎭 All Connected Artists & Upcoming Shows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingShows.map((show) => (
              <div
                key={show.id}
                className="bg-muted/30 border border-border/50 rounded-lg p-4 space-y-3"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden">
                  {show.thumbnailUrl ? (
                    <img
                      src={show.thumbnailUrl}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Star className="h-12 w-12 text-purple-400" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-white">{show.title}</h4>
                  <p className="text-sm text-purple-400">{show.artist}</p>
                  <p className="text-xs text-muted-foreground mt-1">{show.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <Badge className={`${getCategoryColor(show.category)} text-white`}>
                    {show.category}
                  </Badge>
                  {show.isLive && <Badge className="bg-red-600 text-white">🔴 LIVE</Badge>}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {show.viewers}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {show.ticketPrice} GAiA
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-400" />
                    {show.ecologyContribution}
                  </span>
                </div>

                <Button
                  onClick={() => handlePayForShow(show)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch & Support
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
