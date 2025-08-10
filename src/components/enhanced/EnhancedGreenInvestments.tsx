import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Leaf,
  Droplets,
  Home,
  Users,
  Target,
  DollarSign,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import {
  ENHANCED_GAIA_PROJECTS,
  PROJECT_WALLETS,
  PROJECT_INVESTMENT_TIERS,
} from "@/constants/enhanced-gaia-projects";
import { toast } from "sonner";

export function EnhancedGreenInvestments() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "land-recovery-7phase":
        return <Leaf className="h-6 w-6" />;
      case "pvas-water-cleanup":
        return <Droplets className="h-6 w-6" />;
      case "community-relocation-eldercare":
        return <Home className="h-6 w-6" />;
      default:
        return <Target className="h-6 w-6" />;
    }
  };

  const getInvestmentTier = (amount: number) => {
    if (amount >= 50000) return "diamond";
    if (amount >= 20000) return "platinum";
    if (amount >= 5000) return "gold";
    if (amount >= 1000) return "silver";
    if (amount >= 100) return "bronze";
    return null;
  };

  const handleInvestment = (projectId: string) => {
    if (!investmentAmount || investmentAmount < 100) {
      toast.error("Minimum investment is 100 GAIA tokens");
      return;
    }

    const project = ENHANCED_GAIA_PROJECTS.find((p) => p.id === projectId);
    const wallet = PROJECT_WALLETS[projectId as keyof typeof PROJECT_WALLETS];
    const tier = getInvestmentTier(investmentAmount);

    if (project && wallet && tier) {
      toast.success(
        `🌱 Investment successful! ${investmentAmount} GAIA tokens invested in ${project.title}. 
         Tier: ${tier.toUpperCase()}. Funds sent to: ${wallet.address}`,
      );
      setInvestmentAmount(0);
      setSelectedProject(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          🌱 Enhanced Green Investment Hub
        </h2>
        <p className="text-xl text-muted-foreground">
          Revolutionary projects transforming our world through innovation and
          sustainability
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="investment">Investment Tiers</TabsTrigger>
          <TabsTrigger value="wallets">Project Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {ENHANCED_GAIA_PROJECTS.map((project) => {
              const fundingPercentage =
                (project.currentFunding / project.fundingGoal) * 100;
              const wallet =
                PROJECT_WALLETS[project.id as keyof typeof PROJECT_WALLETS];

              return (
                <Card
                  key={project.id}
                  className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getProjectIcon(project.id)}
                        <Badge className="bg-green-600">
                          {project.tags[0]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-orange-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{project.deadline}</span>
                      </div>
                    </div>
                    <CardTitle className="text-green-400 text-lg leading-tight">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-green-300/80 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Research Phases for featured projects */}
                    {project.isFeatured && project.researchPhases && (
                      <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-emerald-400 mb-2">
                          Research Phases
                        </h4>
                        <div className="space-y-1">
                          {project.researchPhases
                            .slice(0, 3)
                            .map((phase, index) => (
                              <div
                                key={index}
                                className="text-xs text-emerald-300/80 flex items-center gap-1"
                              >
                                <Zap className="h-3 w-3" />
                                {phase}
                              </div>
                            ))}
                          {project.researchPhases.length > 3 && (
                            <div className="text-xs text-emerald-300/60">
                              +{project.researchPhases.length - 3} more
                              phases...
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between text-xs text-emerald-400 mt-2 pt-2 border-t border-emerald-500/20">
                          <span>
                            Active Researchers: {project.activeResearchers}
                          </span>
                          <span>
                            Publications: {project.publicationsPlanned}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Funding Progress</span>
                        <span className="text-green-300">
                          ${project.currentFunding.toLocaleString()} / $
                          {project.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={fundingPercentage} className="h-2" />
                      <div className="text-xs text-green-300/60">
                        {fundingPercentage.toFixed(1)}% funded
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-blue-400">
                        <Users className="h-4 w-4" />
                        {project.participants} participants
                      </div>
                      <div className="flex items-center gap-1 text-purple-400">
                        <Award className="h-4 w-4" />
                        {project.reward} GAIA reward
                      </div>
                    </div>

                    <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-emerald-400 mb-1">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">Expected Impact</span>
                      </div>
                      <p className="text-sm text-emerald-300/80">
                        {project.expectedImpact}
                      </p>
                    </div>

                    {/* Wallet Information */}
                    {wallet && (
                      <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">Dedicated Wallet</span>
                        </div>
                        <p className="text-xs text-blue-300/80 font-mono break-all">
                          {wallet.address}
                        </p>
                        <p className="text-xs text-blue-300/60 mt-1">
                          Target: ${wallet.fundingTarget.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Invest Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-400 text-green-400 hover:bg-green-900/20"
                        size="sm"
                      >
                        <Leaf className="h-4 w-4 mr-1" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">
                Investment Tiers & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(PROJECT_INVESTMENT_TIERS).map(
                  ([tier, config]) => (
                    <div
                      key={tier}
                      className="bg-purple-800/20 border border-purple-400/20 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-purple-300 capitalize">
                            {tier} Tier
                          </h3>
                          <p className="text-sm text-purple-400">
                            {config.min.toLocaleString()} -{" "}
                            {config.max === Infinity
                              ? "∞"
                              : config.max.toLocaleString()}{" "}
                            GAIA
                          </p>
                        </div>
                        <Badge
                          className={`bg-${tier === "diamond" ? "yellow" : tier === "platinum" ? "gray" : tier === "gold" ? "yellow" : tier === "silver" ? "gray" : "orange"}-600`}
                        >
                          {config.reward}
                        </Badge>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-6">
          <div className="grid gap-4">
            {Object.entries(PROJECT_WALLETS).map(([projectId, wallet]) => (
              <Card
                key={projectId}
                className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getProjectIcon(projectId)}
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-300">
                        {wallet.purpose}
                      </h3>
                      <p className="text-sm text-blue-400 font-mono">
                        {wallet.address}
                      </p>
                      <p className="text-xs text-blue-300/60">
                        Target: ${wallet.fundingTarget.toLocaleString()} |
                        Currency: {wallet.currency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Investment Modal */}
      {selectedProject && (
        <Card className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 border border-green-500 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-green-400 mb-4">
              Invest in Project
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-green-300">
                  Investment Amount (GAIA)
                </label>
                <input
                  type="number"
                  min="100"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full p-2 bg-green-800/20 border border-green-500/30 rounded text-green-300"
                  placeholder="Minimum: 100 GAIA"
                />
              </div>

              {investmentAmount >= 100 && (
                <div className="bg-green-800/20 border border-green-500/20 rounded p-3">
                  <p className="text-sm text-green-400">
                    Tier:{" "}
                    <span className="font-bold">
                      {getInvestmentTier(investmentAmount)?.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-xs text-green-300/80">
                    {
                      PROJECT_INVESTMENT_TIERS[
                        getInvestmentTier(
                          investmentAmount,
                        ) as keyof typeof PROJECT_INVESTMENT_TIERS
                      ]?.reward
                    }
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleInvestment(selectedProject)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={investmentAmount < 100}
                >
                  Confirm Investment
                </Button>
                <Button
                  onClick={() => setSelectedProject(null)}
                  variant="outline"
                  className="border-green-400 text-green-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
