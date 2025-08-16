import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Waves,
  Fish,
  Anchor,
  AlertTriangle,
  Heart,
  Target,
  Zap,
  TreePine,
  Flame,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function SandProtectInvestmentProject() {
  const [projectStats, setProjectStats] = useState({
    protectedAreas: 12,
    marineLifeSaved: 847,
    volunteersActive: 156,
    fundingRaised: 28500,
    fundingGoal: 150000,
    investors: 89,
    wildfiresPrevented: 23,
    sandBarriersDeployed: 45,
  });

  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectStats((prev) => ({
        ...prev,
        protectedAreas: prev.protectedAreas + Math.floor(Math.random() * 2),
        marineLifeSaved: prev.marineLifeSaved + Math.floor(Math.random() * 10),
        volunteersActive: prev.volunteersActive + Math.floor(Math.random() * 3),
        fundingRaised: Math.min(
          prev.fundingRaised + Math.floor(Math.random() * 100)
          prev.fundingGoal
        ),
        investors: prev.investors + Math.floor(Math.random() * 2),
        wildfiresPrevented: prev.wildfiresPrevented + Math.floor(Math.random() * 1),
        sandBarriersDeployed: prev.sandBarriersDeployed + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fundingPercentage = (projectStats.fundingRaised / projectStats.fundingGoal) * 100;

  const projectPhases = [
    {
      title: "🏖️ Coastal Sand Protection",
      description:
        "Advanced sand barrier systems preventing beach erosion and protecting marine ecosystems",
      status: "Active",
      completion: 78,
      investment: 45000,
    },
    {
      title: "🔥 Wildfire Sand Defense",
      description:
        "Revolutionary sand cannon technology creating firebreaks to protect communities",
      status: "In Progress",
      completion: 45,
      investment: 62000,
    },
    {
      title: "🌊 Marine Conservation Integration",
      description:
        "Combining sand protection with marine life conservation and coral reef restoration",
      status: "Planning",
      completion: 12,
      investment: 43000,
    },
  ];

  const investmentTiers = [
    {
      amount: 100,
      title: "Sand Guardian",
      benefits: ["Project updates", "Digital impact certificate", "Community access"],
      color: "from-blue-500 to-teal-500",
    },
    {
      amount: 500,
      title: "Coastal Protector",
      benefits: [
        "All Guardian benefits",
        "Site visit opportunity",
        "Quarterly reports",
        "Named sand barrier",
      ],
      color: "from-teal-500 to-green-500",
    },
    {
      amount: 2000,
      title: "Marine Defender",
      benefits: [
        "All Protector benefits",
        "Advisory board access",
        "Custom project updates",
        "Recognition plaque",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      amount: 10000,
      title: "Ecosystem Champion",
      benefits: [
        "All Defender benefits",
        "Strategic partnership",
        "Project naming rights",
        "Annual impact summit",
      ],
      color: "from-emerald-500 to-cyan-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <CardTitle className="text-2xl text-blue-400">
                  🏖️ SandProtect Initiative - Investment Opportunity
                </CardTitle>
                <p className="text-blue-300/80 mt-1">
                  Protecting coastal ecosystems and preventing wildfires through advanced sand
                  barrier technology
                </p>
              </div>
            </div>
            <Badge className="bg-orange-600 text-white px-3 py-1">🔥 FEATURED PROJECT</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-800/20 rounded-lg">
              <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">
                <AnimatedCounter value={projectStats.protectedAreas} />
              </div>
              <div className="text-xs text-blue-300/80">Protected Areas</div>
            </div>
            <div className="text-center p-4 bg-orange-800/20 rounded-lg">
              <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-400">
                <AnimatedCounter value={projectStats.wildfiresPrevented} />
              </div>
              <div className="text-xs text-orange-300/80">Wildfires Prevented</div>
            </div>
            <div className="text-center p-4 bg-teal-800/20 rounded-lg">
              <Fish className="h-6 w-6 text-teal-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-teal-400">
                <AnimatedCounter value={projectStats.marineLifeSaved} />
              </div>
              <div className="text-xs text-teal-300/80">Marine Life Saved</div>
            </div>
            <div className="text-center p-4 bg-green-800/20 rounded-lg">
              <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">
                <AnimatedCounter value={projectStats.sandBarriersDeployed} />
              </div>
              <div className="text-xs text-green-300/80">Sand Barriers Deployed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Progress */}
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Investment Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Current Funding</span>
              <span className="text-green-300">
                ${projectStats.fundingRaised.toLocaleString()} / $
                {projectStats.fundingGoal.toLocaleString()}
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-3" />
            <div className="flex justify-between text-xs">
              <span className="text-green-300/60">{fundingPercentage.toFixed(1)}% funded</span>
              <span className="text-blue-400">{projectStats.investors} investors</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-800/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Next Milestone</h4>
              <p className="text-sm text-green-300/80">
                Deploy 10 additional sand barriers in high-risk coastal areas
              </p>
              <div className="text-lg font-bold text-green-400 mt-2">$75,000</div>
            </div>
            <div className="bg-blue-800/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Impact Potential</h4>
              <p className="text-sm text-blue-300/80">
                Protect 50+ km of coastline and prevent 100+ wildfires annually
              </p>
            </div>
            <div className="bg-orange-800/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Expected ROI</h4>
              <p className="text-sm text-orange-300/80">
                8-12% annual environmental and social returns
              </p>
              <div className="text-lg font-bold text-orange-400 mt-2">12%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Phases */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <TreePine className="h-6 w-6" />
            Project Development Phases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectPhases.map((phase, index) => (
              <div key={index} className="bg-gray-800/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-400">{phase.title}</h4>
                  <Badge variant={phase.status === "Active" ? "default" : "secondary"}>
                    {phase.status}
                  </Badge>
                </div>
                <p className="text-sm text-purple-300/80 mb-3">{phase.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-400">Progress</span>
                  <span className="text-xs text-purple-300">
                    Investment: ${phase.investment.toLocaleString()}
                  </span>
                </div>
                <Progress value={phase.completion} className="h-2" />
                <div className="text-xs text-purple-300/60 mt-1">{phase.completion}% complete</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Tiers */}
      <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            Investment Opportunities
          </CardTitle>
          <p className="text-cyan-300/80">
            Choose your impact level and join the protection mission
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentTiers.map((tier, index) => (
              <Card key={index} className={`bg-gradient-to-br ${tier.color}/20 border-cyan-500/30`}>
                <CardHeader className="pb-3">
                  <div className="text-2xl font-bold text-cyan-400">
                    ${tier.amount.toLocaleString()}
                  </div>
                  <CardTitle className="text-sm text-cyan-300">{tier.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="text-xs text-cyan-300/80 flex items-center gap-1">
                        <span className="text-green-400">✓</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white`}
                    size="sm"
                  >
                    Invest Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
          🌊 Join the SandProtect Revolution
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your investment doesn't just generate returns - it protects coastlines, prevents
          wildfires, and preserves marine ecosystems for future generations.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Waves className="h-5 w-5 mr-2" />
            Start Investing
          </Button>
          <Button variant="outline" className="border-blue-400 text-blue-400">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
