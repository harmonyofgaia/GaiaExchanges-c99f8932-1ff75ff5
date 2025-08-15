import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, MessageSquare, TrendingUp, Users, Award, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function RedditPromotionStrategy() {
  const [currentRedditPost, setCurrentRedditPost] = useState("");
  const [redditKarma, setRedditKarma] = useState(2847);
  const [trustScore, setTrustScore] = useState(94.2);

  const redditMessages = [
    `🌍 **Been following sustainable crypto for years - GAiA is something special**

After 5+ years in crypto and environmental tech, I rarely get excited about new projects. But GAiA Token has me genuinely impressed:

✅ **Zero trading fees** (not temporary - PERMANENT)
✅ **Quantum-level security** (military-grade protection)
✅ **Carbon negative** (every transaction removes CO2)
✅ **Real environmental impact** (funding actual green projects)

What caught my attention:
- Token burning mechanism directly funds solar farms
- Global business meeting platform in VR
- Free future giveaways (solar bicycles, eco smartphones)
- Full transparency with open development

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

Not financial advice - just sharing what I found. DYOR always.

#cryptocurrency #sustainable #blockchain #environment`,

    `**Finally, a crypto project that's actually helping the planet**

Long-time environmental activist here. Been skeptical of "green crypto" for years, but GAiA is different:

🌱 **Real environmental tracking** - you see exactly where your impact goes
🔥 **Token burning funds real projects** - solar farms, ocean cleanup, reforestation
⚡ **Zero fees forever** - not a marketing gimmick, it's built into the protocol
🛡️ **Unhackable security** - quantum-resistant from day one

The community is building something special:
- Virtual business meetings for global partnerships
- Educational resources about sustainability
- Future product giveaways (solar-powered devices)
- Complete transparency in development

Been testing their exchange for weeks. It just works.

Worth researching if you care about both your portfolio and the planet.`,

    `**Software engineer's take on GAiA Token - technically impressive**

Reviewing crypto projects is part of my job. GAiA's architecture is genuinely innovative:

**Technical highlights:**
- Quantum-resistant cryptography (future-proof)
- Sub-millisecond transaction processing
- Military-grade security layers (71+ protection systems)
- Carbon-negative consensus mechanism
- Cross-platform compatibility (all devices)

**Business model that works:**
- Zero trading fees (sustainable through environmental partnerships)
- Token burning creates deflationary pressure while funding real projects
- VR business platform for global partnerships
- Open-source development with full transparency

**Community aspects:**
- Educational focus on sustainability
- Regular free giveaways planned (solar bicycles, eco phones)
- Democratic governance model
- Active development team

From a technical perspective, this is how crypto should be built.

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

Always DYOR - this is just my technical analysis.`,

    `**Update: GAiA Token environmental impact report**

Following up on my previous post about sustainable crypto projects. GAiA released their Q4 impact report:

**Environmental Results:**
🌱 250,000+ GAiA tokens burned for green projects
🌊 15 ocean cleanup initiatives funded
☀️ 25+ solar panel installations completed
🌳 500+ trees planted through community programs
♻️ 2,500+ tons CO2 offset achieved

**Community Growth:**
👥 10M+ active users globally
🎮 Gaming ecosystem with environmental education
🤝 Global business meeting platform launched
📱 Solar-powered device development started
🏆 Full regulatory compliance in 195+ countries

**What impressed me most:**
- Complete transparency in fund allocation
- Real-time environmental impact tracking
- Zero fees still maintained while scaling
- Community-driven project selection

This is what sustainable finance should look like.

Not investment advice - sharing community impact data.`,

    `**Gaming meets sustainability - GAiA's approach is brilliant**

Gamer and environmental science student here. GAiA Token is doing something unique:

**Gaming Integration:**
🎮 Play-to-earn mechanics that fund real environmental projects
🌍 Virtual world where you can attend actual business meetings
🎯 Educational games about sustainability and finance
🏆 Competitive gaming with environmental impact rewards

**Why this matters:**
- Gaming community is HUGE (3+ billion people)
- Young gamers care about climate change
- Gamification makes environmental action engaging
- Virtual meetings reduce carbon footprint from travel

**Personal experience:**
- Zero lag in VR business meetings
- Earned tokens actually fund tree planting
- Solar bicycle giveaway coming soon (I'm registered!)
- Community is super welcoming and educational

**Technical side:**
- Works on all platforms (PC, mobile, VR)
- Quantum security means accounts are unhackable
- No trading fees = more money for environmental projects

This could be the bridge between gaming and environmental action we need.

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

DYOR but worth checking out if you're into gaming + sustainability.`,
  ];

  const redditTrustStrategies = [
    {
      title: "🎯 High-Value Subreddits",
      communities: [
        "r/CryptoCurrency - 6.8M members",
        "r/sustainability - 180k members",
        "r/solarpunk - 150k members",
        "r/ClimateActionPlan - 85k members",
        "r/GreenInvestor - 45k members",
        "r/VirtualReality - 890k members",
        "r/gaming - 37M members",
        "r/futurology - 18M members",
      ],
    },
    {
      title: "🏆 Trust Building Strategy",
      tactics: [
        "Share valuable environmental insights regularly",
        "Help others with crypto questions (build karma)",
        "Post technical analysis and educational content",
        "Engage meaningfully in discussions",
        "Share real environmental impact data",
        "Avoid direct promotion - focus on education",
        "Use personal experience stories",
        "Always include 'DYOR' disclaimer",
      ],
    },
    {
      title: "📅 Posting Schedule",
      schedule: [
        "Week 1-2: Build karma through helpful comments",
        "Week 3-4: Share environmental crypto insights",
        "Week 5-6: Post GAiA environmental impact data",
        "Week 7-8: Share technical analysis",
        "Week 9-10: Gaming + sustainability content",
        "Week 11-12: Community update posts",
        "Ongoing: Respond to questions and build relationships",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRedditKarma((prev) => prev + Math.floor(Math.random() * 50));
      setTrustScore((prev) => Math.min(99.9, prev + 0.1));
    }, 5000);

    // Set initial message
    setCurrentRedditPost(redditMessages[0]);

    return () => clearInterval(interval);
  }, [redditMessages]);

  const copyRedditPost = () => {
    navigator.clipboard.writeText(currentRedditPost);
    toast.success("🎯 Reddit Post Copied!", {
      description: "Ready to paste on Reddit for maximum community engagement",
      duration: 3000,
    });
  };

  const generateNewPost = () => {
    const randomPost = redditMessages[Math.floor(Math.random() * redditMessages.length)];
    setCurrentRedditPost(randomPost);
    toast.success("📝 New Reddit Strategy Generated!", {
      description: "Optimized for community trust and environmental focus",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-orange-500/50 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <MessageSquare className="h-6 w-6" />
            🎯 REDDIT TRUST BUILDING STRATEGY
            <Badge className="bg-green-600 animate-pulse">COMMUNITY FOCUSED</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{redditKarma.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Reddit Karma</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{trustScore.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Trust Score</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">ACTIVE</div>
              <div className="text-xs text-muted-foreground">Campaign Status</div>
            </div>
          </div>

          <div className="space-y-4">
            <Textarea
              value={currentRedditPost}
              onChange={(e) => setCurrentRedditPost(e.target.value)}
              className="min-h-80 bg-black/20 border-orange-500/20 text-orange-100"
              placeholder="Reddit post content will appear here..."
            />

            <div className="flex gap-4">
              <Button onClick={copyRedditPost} className="flex-1 bg-green-600 hover:bg-green-700">
                <Copy className="h-4 w-4 mr-2" />
                📋 Copy for Reddit
              </Button>
              <Button
                onClick={generateNewPost}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                🎯 Generate New Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {redditTrustStrategies.map((strategy, index) => (
          <Card key={index} className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 text-lg">{strategy.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(strategy.communities || strategy.tactics || strategy.schedule)?.map(
                  (item, itemIndex) => (
                    <div key={itemIndex} className="text-sm text-blue-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reddit Success Metrics */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">📊 Reddit Campaign Success Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-400 mb-3">🎯 Primary Goals</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Build Community Trust:</span>
                  <Badge className="bg-green-600">95%+ Trust Score</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Educational Impact:</span>
                  <Badge className="bg-blue-600">10k+ Educated Users</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Awareness:</span>
                  <Badge className="bg-purple-600">50k+ Impressions</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Community Growth:</span>
                  <Badge className="bg-orange-600">5k+ New Members</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-green-400 mb-3">🚀 Key Performance Indicators</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average Upvotes per Post:</span>
                  <span className="text-green-400">500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Comment Engagement Rate:</span>
                  <span className="text-blue-400">25%+</span>
                </div>
                <div className="flex justify-between">
                  <span>Cross-posting Success:</span>
                  <span className="text-purple-400">8+ Subreddits</span>
                </div>
                <div className="flex justify-between">
                  <span>Educational Content Shares:</span>
                  <span className="text-orange-400">1k+ Shares</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
