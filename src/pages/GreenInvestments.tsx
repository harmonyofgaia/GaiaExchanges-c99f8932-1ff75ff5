import { GAiACommunityProjects } from "@/components/green-investments/GAiACommunityProjects";
import { GaiaCommunityProjects } from "@/components/GaiaCommunityProjects";
import { WildfireSandProtection } from "@/components/green-investments/WildfireSandProtection";
import { SandProtectInvestmentProject } from "@/components/green-investments/SandProtectInvestmentProject";
import { GreenInvestmentWalletManager } from "@/components/green-investments/GreenInvestmentWalletManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <div className="container mx-auto px-4 py-8">
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

        {/* Enhanced GAIA Projects Including PFAS and 7-Phase Land Recovery */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              🚀 Enhanced GAIA Research Projects
            </h2>
            <p className="text-muted-foreground">
              Revolutionary environmental research initiatives with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 7-Phase Land Recovery Project */}
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-green-600 text-white">Land Restoration</Badge>
                  <TreePine className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-green-400 text-xl">
                  🌾 7-Phase Land Recovery & Sustainable Farming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-green-300/80 text-sm leading-relaxed">
                  Revolutionary 7-phase land restoration combining regenerative agriculture with advanced soil recovery techniques. 
                  Transforming degraded land into productive, sustainable farming ecosystems.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Funding Progress</span>
                    <span className="text-green-300">$125,000 / $500,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="text-xs text-green-300/60">25% funded • 89 participants</div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-green-400 font-medium text-sm">7 Recovery Phases:</h4>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className="text-green-300/70">• Soil Analysis & Contamination Assessment</div>
                    <div className="text-green-300/70">• Mycorrhizal Network Restoration</div>
                    <div className="text-green-300/70">• Carbon Sequestration Implementation</div>
                    <div className="text-green-300/70">• Biodiversity Corridor Creation</div>
                    <div className="text-green-300/70">• Sustainable Water Management</div>
                    <div className="text-green-300/70">• Community Training & Integration</div>
                    <div className="text-green-300/70">• Long-term Monitoring & Optimization</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" size="sm">
                    💚 Support Research
                  </Button>
                  <Button variant="outline" className="border-green-400 text-green-400" size="sm">
                    📊 View Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PFAS Water Cleanup Project */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-600 text-white">Water Purification</Badge>
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-blue-400 text-xl">
                  💧 PFAS Chemical Water Remediation Research
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-300/80 text-sm leading-relaxed">
                  Advanced research project to eliminate PFAS (Poly- and perfluoroalkyl substances) contamination from water systems 
                  using bio-engineered filtration and molecular breakdown technologies.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-400">Funding Progress</span>
                    <span className="text-blue-300">$87,500 / $350,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="text-xs text-blue-300/60">25% funded • 156 participants</div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-blue-400 font-medium text-sm">Research Focus Areas:</h4>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className="text-blue-300/70">• PFAS Contamination Mapping & Analysis</div>
                    <div className="text-blue-300/70">• Bio-engineered Filtration Systems</div>
                    <div className="text-blue-300/70">• Molecular Breakdown Technologies</div>
                    <div className="text-blue-300/70">• Advanced Membrane Development</div>
                    <div className="text-blue-300/70">• Community Water Testing Programs</div>
                    <div className="text-blue-300/70">• Global Implementation Strategy</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                    💙 Fund Research
                  </Button>
                  <Button variant="outline" className="border-blue-400 text-blue-400" size="sm">
                    🔬 Research Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Restored GAiA Community Projects */}
        <div className="mb-12">
          <GAiACommunityProjects />
        </div>

        {/* Additional Community Projects */}
        <div className="mb-12">
          <GaiaCommunityProjects />
        </div>

        {/* Green Impact Integration */}
        <div className="mb-12">
          <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <TreePine className="h-6 w-6" />
                🌱 Green Impact & Environmental Progress
              </CardTitle>
              <p className="text-emerald-300">
                Track your environmental impact across all GAiA projects and investments
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-400">Carbon Offset</CardTitle>
                    <TreePine className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">12.4K tons</div>
                    <p className="text-xs text-muted-foreground">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-400">Water Saved</CardTitle>
                    <Globe className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">2.1M L</div>
                    <p className="text-xs text-muted-foreground">
                      +22% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-yellow-400">Clean Energy</CardTitle>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">847 MWh</div>
                    <p className="text-xs text-muted-foreground">
                      +18% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-400">Biodiversity Score</CardTitle>
                    <Globe className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">8.7/10</div>
                    <p className="text-xs text-muted-foreground">
                      +0.3 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-green-400">Global Impact Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Reforestation Goal</span>
                          <span className="text-green-400">73%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Ocean Cleanup</span>
                          <span className="text-blue-400">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Renewable Energy</span>
                          <span className="text-yellow-400">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-blue-400">AI Environmental Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                        <div className="text-sm font-medium text-green-400 mb-1">Forest Recovery</div>
                        <div className="text-xs text-muted-foreground">Predicted 25% improvement in next 6 months</div>
                      </div>
                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                        <div className="text-sm font-medium text-blue-400 mb-1">Water Quality</div>
                        <div className="text-xs text-muted-foreground">Marine ecosystems showing 15% recovery</div>
                      </div>
                      <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                        <div className="text-sm font-medium text-purple-400 mb-1">Biodiversity Index</div>
                        <div className="text-xs text-muted-foreground">Species diversity up 8% in protected areas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GreenInvestments;
