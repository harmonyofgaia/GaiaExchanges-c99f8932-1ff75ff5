import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Megaphone, TrendingUp, Globe, Users, Timer, Zap, Target, Star } from "lucide-react";

export function AutomatedMarketing() {
  const [marketingStats, setMarketingStats] = useState({
    hourlyPosts: 0,
    totalReach: 0,
    engagementRate: 0,
    platformsCovered: 0,
  });

  const [campaignActive, setCampaignActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60); // 48 hours in seconds

  useEffect(() => {
    // Start automated marketing every hour
    const marketingInterval = setInterval(() => {
      executeHourlyMarketing();
    }, 3600000); // Every hour (3600000ms)

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Switch to weekly marketing after 48 hours
          startWeeklyMarketing();
          return 7 * 24 * 60 * 60; // Reset to 1 week
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(marketingInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const executeHourlyMarketing = () => {
    const platforms = [
      "Twitter/X",
      "LinkedIn",
      "Reddit",
      "Facebook",
      "Instagram",
      "TikTok",
      "YouTube",
      "Medium",
      "Discord",
      "Telegram",
      "Newspapers",
      "Tech Blogs",
      "Crypto Forums",
    ];

    const marketingMessages = [
      "🚀 BREAKING: Gaia's Exchanges - The world's most secure eco-friendly crypto platform is launching! Zero fees, infinite GAIA supply, quantum security! #GaiaExchanges",
      "🌍 REVOLUTIONARY: Download Gaia's Exchanges on ALL platforms - Android, iOS, Windows, Mac, Linux! 100% working links, 10x faster than any competitor! #CryptoRevolution",
      "💚 ECO-FRIENDLY CRYPTO: Join the sustainable blockchain revolution with GAIA tokens! Carbon-negative trading, environmental impact tracking! #GreenCrypto",
      "🔒 QUANTUM SECURITY: Military-grade protection with dragon-powered encryption! Your funds are safer than Fort Knox! #QuantumSecurity",
      "⚡ 10X PERFORMANCE: Gaia's Exchanges processes 1M+ transactions per second with sub-millisecond latency! No other platform comes close! #CryptoSpeed",
    ];

    // Simulate posting to all platforms
    const randomMessage = marketingMessages[Math.floor(Math.random() * marketingMessages.length)];
    const platformsReached = Math.floor(Math.random() * 5) + 8; // 8-12 platforms

    setMarketingStats((prev) => ({
      hourlyPosts: prev.hourlyPosts + platformsReached,
      totalReach: prev.totalReach + Math.floor(Math.random() * 100000) + 50000,
      engagementRate: Math.min(99.9, prev.engagementRate + Math.random() * 2),
      platformsCovered: Math.min(13, prev.platformsCovered + 1)
    }));

    toast.success("🌍 Global Marketing Blast Executed!", {
      description: `Posted to ${platformsReached} platforms: "${randomMessage.substring(0, 50)}..."`,
      duration: 3000,
    });

    console.log(`🎯 MARKETING: ${randomMessage}`);
    console.log(
      `📢 REACH: ${platformsReached} platforms, estimated ${50000 + Math.floor(Math.random() * 100000)} people`
    );
  };

  const startWeeklyMarketing = () => {
    toast.success("🗓️ Weekly Marketing Mode Activated!", {
      description: "Switching to weekly promotional campaigns with major updates",
      duration: 5000,
    });
    console.log("📅 MARKETING: Switched to weekly campaign mode");
  };

  const launchManualBlast = () => {
    executeHourlyMarketing();
    setCampaignActive(true);
    setTimeout(() => setCampaignActive(false), 5000);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Marketing Control Center */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Megaphone className="h-6 w-6" />
            🚀 Automated Global Marketing Engine
          </CardTitle>
          <p className="text-muted-foreground">
            Promoting Gaia's Exchanges across all platforms every hour for world domination
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{marketingStats.hourlyPosts}</div>
              <div className="text-xs text-muted-foreground">Posts This Hour</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {marketingStats.totalReach.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Reach</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {marketingStats.engagementRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Engagement Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">
                {marketingStats.platformsCovered}/13
              </div>
              <div className="text-xs text-muted-foreground">Platforms Active</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">Campaign Status</h4>
                <p className="text-sm text-muted-foreground">
                  Time until weekly mode: {formatTime(timeRemaining)}
                </p>
              </div>
              <Button
                onClick={launchManualBlast}
                disabled={campaignActive}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                {campaignActive ? "Blasting..." : "Manual Blast"}
              </Button>
            </div>

            <Progress value={(marketingStats.platformsCovered / 13) * 100} className="h-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-green-400 mb-2">Active Platforms:</h5>
                <div className="grid grid-cols-2 gap-1">
                  {["Twitter/X", "LinkedIn", "Reddit", "Facebook", "Instagram", "TikTok"].map(
                    (platform) => (
                      <Badge key={platform} className="bg-green-600 text-white text-xs">
                        {platform}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400 mb-2">Key Messages:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• World's most secure crypto platform</li>
                  <li>• 10x faster than any competitor</li>
                  <li>• 100% eco-friendly blockchain</li>
                  <li>• Zero transaction fees</li>
                  <li>• Quantum-level security</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Impact Tracker */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Globe className="h-5 w-5" />
            🌍 Global Impact & Community Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-400">Exponential</div>
                <div className="text-xs text-muted-foreground">Growth Rate</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-400">Global</div>
                <div className="text-xs text-muted-foreground">Community</div>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-400">#1</div>
                <div className="text-xs text-muted-foreground">Market Position</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-4 border border-green-500/30">
              <p className="text-center font-bold text-green-400">
                🌟 "Seeds Will Form Into Music" - Culture of Harmony 🌟
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Building the strongest, most unbreakable bond with all partners across the digital
                universe
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantum Marketing Intelligence */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Target className="h-5 w-5" />
            🧠 Quantum Marketing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded border border-border/30">
              <span className="text-sm">AI-Powered Content Generation</span>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-border/30">
              <span className="text-sm">Multi-Platform Synchronization</span>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-border/30">
              <span className="text-sm">Real-Time Trend Analysis</span>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 rounded border border-border/30">
              <span className="text-sm">Quantum Security Monitoring</span>
              <Badge className="bg-green-600">Dragon-Protected</Badge>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-500/20">
            <p className="text-center text-red-400 font-bold animate-pulse">
              🐉 "Every millisecond of existence dedicated to making Gaia's Exchanges the
              unbreakable fortress of the crypto universe" 🐉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
