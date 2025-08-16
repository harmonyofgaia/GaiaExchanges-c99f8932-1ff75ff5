import { GAiACommunityProjects } from "@/components/green-investments/GAiACommunityProjects";
import { GaiaCommunityProjects } from "@/components/GaiaCommunityProjects";
import { WildfireSandProtection } from "@/components/green-investments/WildfireSandProtection";
import { SandProtectInvestmentProject } from "@/components/green-investments/SandProtectInvestmentProject";
import { GreenInvestmentWalletManager } from "@/components/green-investments/GreenInvestmentWalletManager";
import GreenInvestmentsBackground from "@/components/backgrounds/GreenInvestmentsBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/styles/green-investments-new-background.css";
import {
  Leaf,
  Globe,
  TrendingUp,
  Shield,
  Flame,
  Heart,
  Zap,
  Snowflake,
  TreePine,
  Coffee,
  Music,
  Users,
  GamepadIcon,
  Wallet,
  Bike,
} from "lucide-react";

const GreenInvestments = () => {
  // Your original projects data
  const originalProjects = [
    {
      id: "1",
      title: "❤️ The Heart Of Gaia",
      description:
        "A spiritual and environmental awakening project connecting souls to Mother Earth through conscious living and sustainable practices.",
      category: "Spiritual Ecology",
      fundingGoal: 100000,
      currentFunding: 45000,
      backers: 234,
      icon: <Heart className="h-6 w-6" />,
      color: "from-pink-500 to-red-500",
    },
    {
      id: "2",
      title: "🌱 Seed Splitter (project demo)",
      description:
        "Revolutionary seed splitting technology for enhanced plant growth and agricultural sustainability.",
      category: "Agriculture Tech",
      fundingGoal: 75000,
      currentFunding: 32000,
      backers: 156,
      icon: <Leaf className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "3",
      title: "⚡ Railing Energy (project demo)",
      description:
        "Innovative railway energy harvesting system converting train movement into clean electricity.",
      category: "Renewable Energy",
      fundingGoal: 200000,
      currentFunding: 89000,
      backers: 312,
      icon: <Zap className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "4",
      title: "❄️ Freeze Capital",
      description:
        "Arctic preservation and climate research initiative protecting polar ecosystems and wildlife.",
      category: "Climate Research",
      fundingGoal: 150000,
      currentFunding: 67000,
      backers: 189,
      icon: <Snowflake className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "5",
      title: "🍄 Earth Aquarium of Shrooms",
      description:
        "Mycological research and mushroom cultivation for environmental restoration and food security.",
      category: "Mycology",
      fundingGoal: 85000,
      currentFunding: 42000,
      backers: 278,
      icon: <TreePine className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "6",
      title: "☕ Vintage Internet Cafe (project demo)",
      description:
        "Nostalgic internet cafe experience promoting digital wellness and community connection.",
      category: "Digital Wellness",
      fundingGoal: 50000,
      currentFunding: 28000,
      backers: 145,
      icon: <Coffee className="h-6 w-6" />,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "7",
      title: "🎵 Techno Soul Solutions (project demo)",
      description:
        "Music therapy and sound healing technologies for mental health and spiritual growth.",
      category: "Sound Healing",
      fundingGoal: 60000,
      currentFunding: 35000,
      backers: 198,
      icon: <Music className="h-6 w-6" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "8",
      title: "🌊 Natural Clean System",
      description:
        "Bio-based cleaning solutions and water purification systems for sustainable living.",
      category: "Water Tech",
      fundingGoal: 90000,
      currentFunding: 54000,
      backers: 267,
      icon: <Globe className="h-6 w-6" />,
      color: "from-teal-500 to-green-500",
    },
    {
      id: "9",
      title: "🎮 NFT GameSwap Virtual",
      description:
        "Sustainable gaming platform with eco-friendly NFTs and carbon-neutral virtual experiences.",
      category: "Green Gaming",
      fundingGoal: 120000,
      currentFunding: 78000,
      backers: 456,
      icon: <GamepadIcon className="h-6 w-6" />,
      color: "from-green-500 to-blue-500",
    },
    {
      id: "10",
      title: "🎶 Sound Riffs Re Grau dio",
      description:
        "Environmental sound art and audio landscapes for consciousness raising and nature connection.",
      category: "Sound Art",
      fundingGoal: 45000,
      currentFunding: 29000,
      backers: 167,
      icon: <Music className="h-6 w-6" />,
      color: "from-indigo-500 to-pink-500",
    },
    {
      id: "11",
      title: "🏞️ GreenLake Tribe",
      description:
        "Eco-village community project creating sustainable living spaces and regenerative ecosystems.",
      category: "Eco-Community",
      fundingGoal: 300000,
      currentFunding: 156000,
      backers: 589,
      icon: <Users className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "12",
      title: "🚴 Car-Free Rewards",
      description:
        "Verified car-free streaks with fair rewards and transparent impact. Join the sustainable mobility revolution.",
      category: "Sustainable Mobility",
      fundingGoal: 75000,
      currentFunding: 28000,
      backers: 143,
      icon: <Bike className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="green-investments relative min-h-[100svh]">
      <GreenInvestmentsBackground />
      <div className="gi-content relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Investments
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Invest in environmental projects • Support sustainable initiatives •
            Make a positive impact
          </p>
          <div className="text-sm text-green-400 mt-2">
            ✨ Powered by GAiA Token • Community Driven • Transparent Impact
          </div>
        </div>

        {/* Green Investment Overview */}
        <Card className="mb-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Globe className="h-6 w-6" />
              Green Investment Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-800/20 rounded-lg">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  Environmental
                </div>
                <div className="text-sm text-muted-foreground">
                  Impact Projects
                </div>
              </div>
              <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  Sustainable
                </div>
                <div className="text-sm text-muted-foreground">Returns</div>
              </div>
              <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">Global</div>
                <div className="text-sm text-muted-foreground">Community</div>
              </div>
              <div className="text-center p-4 bg-orange-800/20 rounded-lg">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">
                  Protection
                </div>
                <div className="text-sm text-muted-foreground">
                  & Prevention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Original Projects */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              🌟 Your Original GAiA Projects
            </h2>
            <p className="text-muted-foreground">
              The creative projects you've built with love and dedication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {originalProjects.map((project) => {
              const fundingPercentage =
                (project.currentFunding / project.fundingGoal) * 100;

              return (
                <Card
                  key={project.id}
                  className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`bg-gradient-to-r ${project.color} text-white`}
                      >
                        {project.category}
                      </Badge>
                      <div className="text-2xl">{project.icon}</div>
                    </div>
                    <CardTitle className="text-green-400 text-lg leading-tight">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-green-300/80 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Funding Progress</span>
                        <span className="text-green-300">
                          ${project.currentFunding.toLocaleString()} / $
                          {project.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={fundingPercentage} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span className="text-green-300/60">
                          {fundingPercentage.toFixed(1)}% funded
                        </span>
                        <span className="text-blue-400">
                          {project.backers} backers
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 bg-gradient-to-r ${project.color} hover:opacity-90`}
                        size="sm"
                      >
                        💚 Invest
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-400 text-green-400 hover:bg-green-900/20"
                        size="sm"
                      >
                        ✨ Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Project: SandProtect Investment Opportunity */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge className="bg-orange-600 text-white mb-2">
              <Flame className="h-4 w-4 mr-1" />
              FEATURED INVESTMENT PROJECT
            </Badge>
            <h2 className="text-3xl font-bold text-orange-400">
              SandProtect Initiative
            </h2>
            <p className="text-muted-foreground mt-2">
              Revolutionary sand barrier technology with multiple investment
              tiers and proven ROI
            </p>
          </div>
          <SandProtectInvestmentProject />
        </div>

        {/* Technical Implementation: Wildfire Sand Protection */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge className="bg-blue-600 text-white mb-2">
              <Shield className="h-4 w-4 mr-1" />
              TECHNICAL SHOWCASE
            </Badge>
            <h2 className="text-2xl font-bold text-blue-400">
              Advanced Wildfire Sand Barrier Technology
            </h2>
            <p className="text-muted-foreground mt-2">
              Deep dive into the technical implementation and real-time
              monitoring systems
            </p>
          </div>
          <WildfireSandProtection />
        </div>

        {/* Your Restored GAiA Community Projects */}
        <div className="mb-12">
          <GAiACommunityProjects />
        </div>

        {/* Additional Community Projects */}
        <div className="mb-12">
          <GaiaCommunityProjects />
        </div>

        {/* Wallet and Fee Management */}
        <div className="mb-12">
          <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Wallet className="h-6 w-6" />
                💰 Green Investment Management
              </CardTitle>
              <p className="text-blue-300">
                Configure your fees to automatically support environmental
                projects
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="wallet" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="wallet">💰 Wallet & Fees</TabsTrigger>
                  <TabsTrigger value="projects">🌱 Project Funding</TabsTrigger>
                </TabsList>

                <TabsContent value="wallet" className="space-y-6">
                  <GreenInvestmentWalletManager />
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <Card className="border-green-500/30 bg-green-900/20">
                    <CardHeader>
                      <CardTitle className="text-green-400">
                        🌱 Project Impact Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Real-time project funding and environmental impact
                        metrics coming soon!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GreenInvestments;
