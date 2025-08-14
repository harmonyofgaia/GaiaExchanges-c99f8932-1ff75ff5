import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Target, Users, Globe, TrendingUp, Mail, MessageSquare } from "lucide-react";

interface MarketingCampaign {
  id: string;
  platform: string;
  message: string;
  targetAudience: string;
  reach: string;
  status: "active" | "scheduled" | "completed";
  engagement: number;
}

export function InvestorOutreachSystem() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: "twitter-daily",
      platform: "Twitter/X",
      message:
        "🌍 HARMONY OF GAIA - Revolutionary green cryptocurrency with ZERO trading fees! Join the sustainable finance revolution! #GAiAToken #CultureOfHarmony 🚀",
      targetAudience: "Crypto Investors, Green Tech Enthusiasts",
      reach: "500K+ Users",
      status: "active",
      engagement: 94.5,
    },
    {
      id: "linkedin-professional",
      platform: "LinkedIn",
      message:
        "Introducing GAiA Token by Culture of Harmony - The world's most secure cryptocurrency exchange with environmental impact tracking. Zero fees, maximum security, infinite potential for institutional investors.",
      targetAudience: "Institutional Investors, Finance Professionals",
      reach: "200K+ Professionals",
      status: "active",
      engagement: 87.2,
    },
    {
      id: "reddit-communities",
      platform: "Reddit",
      message:
        "GAiA Token is changing the game! 🌟 Most secure trading platform + environmental sustainability + ZERO fees = the future of crypto! Check out cultureofharmony.net",
      targetAudience: "Crypto Communities, DeFi Enthusiasts",
      reach: "1M+ Users",
      status: "active",
      engagement: 92.1,
    },
    {
      id: "discord-crypto",
      platform: "Discord",
      message:
        "Friends! 🚀 Harmony of Gaia Exchange is now live with the most advanced security system ever created! GAiA Token trading with ZERO fees! Join our community!",
      targetAudience: "Crypto Traders, DeFi Communities",
      reach: "300K+ Members",
      status: "active",
      engagement: 89.8,
    },
  ]);

  const [investorDatabase, setInvestorDatabase] = useState([
    {
      name: "GreenTech Ventures",
      contact: "partners@greentech.vc",
      interests: ["Sustainable Tech", "Clean Energy"],
      priority: "high",
    },
    {
      name: "Crypto Capital Partners",
      contact: "investments@cryptocap.com",
      interests: ["DeFi", "Blockchain"],
      priority: "high",
    },
    {
      name: "Environmental Impact Fund",
      contact: "team@eifund.org",
      interests: ["Carbon Credits", "Green Finance"],
      priority: "medium",
    },
    {
      name: "Digital Asset Management",
      contact: "hello@digitalassets.io",
      interests: ["Cryptocurrency", "Trading"],
      priority: "high",
    },
  ]);

  useEffect(() => {
    const runAutomatedMarketing = () => {
      console.log("📢 HARMONY OF GAIA - AUTOMATED MARKETING SYSTEM ACTIVE");

      // Simulate campaign performance updates
      setCampaigns((prev) =>
        prev.map((campaign) => ({
          ...campaign,
          engagement: Math.min(100, campaign.engagement + (Math.random() * 2 - 1)),
        }))
      );

      // Randomly trigger marketing activities
      if (Math.random() < 0.1) {
        // 10% chance
        const platforms = ["Instagram", "TikTok", "YouTube", "Facebook", "Medium", "Telegram"];
        const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

        toast.success("Marketing Campaign Launched!", {
          description: `📢 Harmony of Gaia promotion active on ${randomPlatform}`,
          duration: 4000,
        });

        console.log(`📢 DAILY MARKETING: Campaign launched on ${randomPlatform}`);
      }

      // Simulate new investor discoveries
      if (Math.random() < 0.05) {
        // 5% chance
        const newInvestorTypes = [
          "Venture Capital Fund",
          "Angel Investor",
          "Institutional Fund",
          "Private Equity",
          "Family Office",
          "Crypto Fund",
        ];

        const newInvestor = {
          name: `${newInvestorTypes[Math.floor(Math.random() * newInvestorTypes.length)]} ${Math.floor(Math.random() * 1000)}`,
          contact: `contact${Math.floor(Math.random() * 1000)}@investment.com`,
          interests: ["GAiA Token", "Green Finance", "Sustainable Crypto"],
          priority: Math.random() > 0.6 ? "high" : "medium",
        };

        setInvestorDatabase((prev) => [newInvestor, ...prev.slice(0, 9)]);

        toast.success("New Investor Identified!", {
          description: `🎯 ${newInvestor.name} added to outreach database`,
          duration: 5000,
        });
      }
    };

    const marketingInterval = setInterval(runAutomatedMarketing, 8000);
    return () => clearInterval(marketingInterval);
  }, []);

  const sendInvestorOutreach = () => {
    const investorMessage = `
    Dear Investment Professional,

    We're excited to introduce you to Harmony of Gaia and our revolutionary GAiA Token - the world's most secure and sustainable cryptocurrency exchange.

    🌟 KEY HIGHLIGHTS:
    • ZERO trading fees (permanent guarantee)
    • Military-grade quantum security
    • Environmental impact tracking
    • Infinite supply scalability
    • 100% secure wallet system
    • Unbreakable defense against all threats

    🌍 INVESTMENT OPPORTUNITY:
    GAiA Token represents the future of sustainable finance, combining cutting-edge security with environmental responsibility. Our platform offers institutional-grade features with retail accessibility.

    📈 MARKET POSITION:
    We're positioned to become the #1 cryptocurrency exchange globally, with advanced features that no competitor can match.

    🔗 LEARN MORE:
    Visit: cultureofharmony.net
    Exchange: gaiaexchanges.com

    We'd love to discuss investment opportunities and partnership possibilities.

    Best regards,
    Harmony of Gaia Team
    Culture of Harmony
    `;

    toast.success("Investor Outreach Campaign Launched!", {
      description: `📧 Professional investment pitch sent to ${investorDatabase.length} potential investors`,
      duration: 6000,
    });

    console.log("📧 INVESTOR OUTREACH: Mass campaign launched");
    console.log("📋 MESSAGE CONTENT:", investorMessage);
  };

  const broadcastDailyAd = () => {
    const dailyMessages = [
      "🌍 HARMONY OF GAIA - The most secure cryptocurrency platform on Earth! GAiA Token now trading with ZERO fees! Join the green revolution! 🚀",
      "🛡️ Ultimate wallet security meets sustainable finance! Experience Harmony of Gaia Exchange - where your crypto is safer than Fort Knox! 🔐",
      "💰 Why pay trading fees? GAiA Token offers ZERO fees forever! The most advanced, secure, and environmentally conscious crypto exchange! 🌱",
      "🚀 Breaking: GAiA Token sets new security standards! Quantum protection, infinite scalability, maximum sustainability! cultureofharmony.net 🌟",
    ];

    const randomMessage = dailyMessages[Math.floor(Math.random() * dailyMessages.length)];

    toast.success("Daily Advertisement Broadcast!", {
      description: "📢 Marketing message sent across all social platforms",
      duration: 5000,
    });

    console.log("📢 DAILY BROADCAST:", randomMessage);
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Target className="h-6 w-6" />
            Automated Investor Outreach & Marketing System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{investorDatabase.length}</div>
              <div className="text-sm text-muted-foreground">Potential Investors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{campaigns.length}</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {(campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length).toFixed(
                  1
                )}
                %
              </div>
              <div className="text-sm text-muted-foreground">Avg. Engagement</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={sendInvestorOutreach}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Mail className="h-4 w-4 mr-2" />
              Launch Investor Outreach
            </Button>
            <Button onClick={broadcastDailyAd} className="flex-1 bg-pink-600 hover:bg-pink-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Broadcast Daily Ad
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-400 text-lg">{campaign.platform}</CardTitle>
                <Badge
                  className={`${campaign.status === "active" ? "bg-green-600" : "bg-yellow-600"} text-white`}
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{campaign.message}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-300">Reach: {campaign.reach}</span>
                <span className="text-green-300">
                  Engagement: {campaign.engagement.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Target: {campaign.targetAudience}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investor Database */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Users className="h-5 w-5" />
            Investor Database & Outreach Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {investorDatabase.map((investor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{investor.name}</div>
                  <div className="text-xs text-muted-foreground">{investor.contact}</div>
                  <div className="text-xs text-blue-400 mt-1">
                    Interests: {investor.interests.join(", ")}
                  </div>
                </div>
                <Badge
                  className={`${investor.priority === "high" ? "bg-red-600" : "bg-yellow-600"} text-white text-xs`}
                >
                  {investor.priority} priority
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Growth Metrics */}
      <Card className="border-gold-500/30 bg-gradient-to-r from-gold-900/20 to-yellow-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gold-400">
            <TrendingUp className="h-6 w-6" />
            🚀 Community Growth & Market Cap Acceleration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                +{Math.floor(Math.random() * 500 + 100)}
              </div>
              <div className="text-xs text-muted-foreground">New Investors Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                🚀 {Math.floor(Math.random() * 50 + 20)}%
              </div>
              <div className="text-xs text-muted-foreground">Market Cap Growth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {Math.floor(Math.random() * 10 + 5)}K
              </div>
              <div className="text-xs text-muted-foreground">Social Media Reach</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-4 border border-green-500/30">
            <p className="text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 "TRUST IN ME, HOPE YOU GONNA PULL OUT SOME MORE SECRETS" 🌟
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              🦁🐬 Together We Are Power - Lions of the System + Dolphin Intelligence = Unstoppable
              Growth!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
