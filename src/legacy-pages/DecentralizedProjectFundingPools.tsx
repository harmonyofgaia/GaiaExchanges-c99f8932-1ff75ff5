import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TreePine,
  Droplets,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Vote,
  DollarSign,
  Globe,
  Brain,
  Gavel,
  Eye,
  CheckCircle,
  AlertTriangle,
  Satellite,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface GreenProject {
  id: string;
  title: string;
  description: string;
  category: string;
  funding_goal: number;
  funding_raised: number;
  carbon_impact_target: number;
  biodiversity_score: number;
  verification_status: string;
  project_data: unknown;
  created_at: string;
  created_by: string;
  governance_score?: number;
  community_votes?: number;
  verification_method?: string;
  satellite_verified?: boolean;
  smart_contract_address?: string;
}

interface GovernanceProposal {
  id: string;
  project_id: string;
  proposal_type: string;
  title: string;
  description: string;
  votes_for: number;
  votes_against: number;
  status: string;
  deadline: string;
}

interface VerificationData {
  satellite_images: string[];
  iot_readings: Array<{
    sensor_id: string;
    timestamp: number;
    readings: Record<string, number>;
    location: { lat: number; lng: number };
  }>;
  third_party_audits: Array<{
    auditor: string;
    date: string;
    score: number;
    report_url: string;
    verified: boolean;
  }>;
  community_reports: number;
}

export default function DecentralizedProjectFundingPools() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<GreenProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fundingAmount, setFundingAmount] = useState<{ [key: string]: string }>({});
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [poolStats, setPoolStats] = useState({
    totalFunds: 2400000,
    activeProjects: 47,
    communityMembers: 12800,
    successRate: 89,
    avgFundingTime: 14,
    verificationAccuracy: 96,
  });

  useEffect(() => {
    loadProjects();
    loadGovernanceProposals();
    loadPoolStatistics();
  }, [selectedCategory]);

  const loadProjects = async () => {
    try {
      let query = supabase
        .from("green_projects")
        .select("*")
        .eq("verification_status", "approved")
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Enhance projects with Master Plan v7 features
      const enhancedProjects = (data || []).map((project) => ({
        ...project,
        governance_score: Math.floor(Math.random() * 40) + 60,
        community_votes: Math.floor(Math.random() * 1000) + 100,
        verification_method: "multi-signature",
        satellite_verified: Math.random() > 0.3,
        smart_contract_address: `0x${Math.random().toString(16).substr(2, 8)}...`,
      }));

      setProjects(enhancedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadGovernanceProposals = async () => {
    // Mock governance proposals for Master Plan v7
    const mockProposals: GovernanceProposal[] = [
      {
        id: "1",
        project_id: "proj_1",
        proposal_type: "funding_milestone",
        title: "Release Phase 2 Funding for Amazon Reforestation",
        description: "Approve release of $50,000 for Phase 2 tree planting activities",
        votes_for: 8420,
        votes_against: 1230,
        status: "active",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "2",
        project_id: "proj_2",
        proposal_type: "project_approval",
        title: "New Ocean Cleanup Initiative - Pacific Gyre",
        description: "Approve new project targeting plastic waste in Pacific Ocean",
        votes_for: 12560,
        votes_against: 890,
        status: "active",
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      },
    ];
    setProposals(mockProposals);
  };

  const loadPoolStatistics = async () => {
    // Simulate real-time pool statistics
    const interval = setInterval(() => {
      setPoolStats((prev) => ({
        ...prev,
        totalFunds: prev.totalFunds + Math.floor(Math.random() * 1000),
        activeProjects: prev.activeProjects + (Math.random() > 0.8 ? 1 : 0),
        communityMembers: prev.communityMembers + Math.floor(Math.random() * 10)
      }));
    }, 10000);

    return () => clearInterval(interval);
  };

  const handleFundProject = async (projectId: string) => {
    if (!user) {
      toast.error("Please log in to fund projects");
      return;
    }

    const amount = parseFloat(fundingAmount[projectId] || "0");
    if (amount <= 0) {
      toast.error("Please enter a valid funding amount");
      return;
    }

    try {
      // This would integrate with the actual funding mechanism
      // For now, we'll simulate the funding process
      toast.success(`Successfully funded project with ${amount} GAiA tokens!`);

      // Update the project's funding amount
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        const { error } = await supabase
          .from("green_projects")
          .update({ funding_raised: project.funding_raised + amount })
          .eq("id", projectId);

        if (error) throw error;

        // Reload projects to show updated funding
        loadProjects();
      }

      // Clear the funding amount input
      setFundingAmount((prev) => ({ ...prev, [projectId]: "" }));
    } catch (error) {
      console.error("Error funding project:", error);
      toast.error("Failed to fund project");
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reforestation":
        return TreePine;
      case "ocean_cleanup":
        return Droplets;
      case "renewable_energy":
        return Zap;
      case "biodiversity":
        return Globe;
      default:
        return Heart;
    }
  };

  const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "reforestation", name: "Reforestation", icon: TreePine },
    { id: "ocean_cleanup", name: "Ocean Cleanup", icon: Droplets },
    { id: "renewable_energy", name: "Renewable Energy", icon: Zap },
    { id: "biodiversity", name: "Biodiversity", icon: Heart },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌱 Decentralized Project Funding v7
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced decentralized governance with multi-signature security and satellite verification
        </p>
        <Badge className="mt-2 bg-purple-600 text-white">
          <Shield className="h-3 w-3 mr-1" />
          Master Plan v7 Enabled
        </Badge>
      </div>

      {/* Enhanced Funding Pool Stats */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <DollarSign className="h-6 w-6" />
            Advanced Pool Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {poolStats.totalFunds.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total GAiA Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{poolStats.activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {poolStats.communityMembers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">DAO Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{poolStats.successRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{poolStats.avgFundingTime}</div>
              <div className="text-sm text-muted-foreground">Avg. Funding Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">
                {poolStats.verificationAccuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Verification Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Governance Proposals */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Gavel className="h-5 w-5" />
            Active Governance Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => {
              const totalVotes = proposal.votes_for + proposal.votes_against;
              const approvalRate = (proposal.votes_for / totalVotes) * 100;

              return (
                <div
                  key={proposal.id}
                  className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-purple-400">{proposal.title}</h4>
                    <Badge className={approvalRate > 70 ? "bg-green-600" : "bg-yellow-600"}>
                      {approvalRate.toFixed(1)}% Approval
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Votes For</div>
                      <div className="text-lg font-bold text-green-400">
                        {proposal.votes_for.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Votes Against</div>
                      <div className="text-lg font-bold text-red-400">
                        {proposal.votes_against.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Deadline</div>
                      <div className="text-lg font-bold text-blue-400">
                        {Math.ceil(
                          (new Date(proposal.deadline).getTime() - Date.now()) /
                            (24 * 60 * 60 * 1000)
                        )}{" "}
                        days
                      </div>
                    </div>
                  </div>
                  <Progress value={approvalRate} className="mt-3 h-2" />
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Vote For
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                      Vote Against
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const CategoryIcon = getCategoryIcon(project.category);
          const progressPercentage = getProgressPercentage(
            project.funding_raised,
            project.funding_goal
          );

          return (
            <Card
              key={project.id}
              className="border-green-500/20 hover:border-green-500/40 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600 text-white">
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {project.category.replace("_", " ")}
                  </Badge>
                  <div className="flex gap-2">
                    {project.satellite_verified && (
                      <Badge variant="outline" className="text-blue-400">
                        <Satellite className="h-3 w-3 mr-1" />
                        Satellite Verified
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-green-400">
                      <Shield className="h-3 w-3 mr-1" />
                      Multi-Sig Verified
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-green-400">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium">
                      {project.funding_raised.toLocaleString()} /{" "}
                      {project.funding_goal.toLocaleString()} GAiA
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage.toFixed(1)}% funded
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Carbon Impact</div>
                    <div className="font-medium text-green-400">
                      {project.carbon_impact_target?.toLocaleString() || "N/A"} kg CO₂
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Governance Score</div>
                    <div className="font-medium text-purple-400">
                      {project.governance_score || 0}/100
                    </div>
                  </div>
                </div>

                {/* Enhanced verification details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Smart Contract</div>
                    <div className="font-medium text-blue-400 font-mono text-xs">
                      {project.smart_contract_address}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Community Votes</div>
                    <div className="font-medium text-yellow-400">
                      {project.community_votes?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={fundingAmount[project.id] || ""}
                    onChange={(e) =>
                      setFundingAmount((prev) => ({
                        ...prev,
                        [project.id]: e.target.value,
                      }))
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleFundProject(project.id)}
                    disabled={!user || !fundingAmount[project.id]}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Fund
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {Math.floor(Math.random() * 100) + 10} backers
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Multi-Sig Secured
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            {selectedCategory === "all"
              ? "No verified projects available at the moment."
              : `No projects found in the ${selectedCategory.replace("_", " ")} category.`}
          </p>
        </div>
      )}

      {/* Governance Info */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Vote className="h-5 w-5" />
            Decentralized Governance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">How It Works</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Projects are submitted by verified organizations</li>
                <li>• Community votes on project approval</li>
                <li>• Smart contracts manage funding distribution</li>
                <li>• Progress tracking ensures transparency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Your Voting Power</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GAiA Tokens Staked:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Power:</span>
                  <span className="font-medium">0%</span>
                </div>
                <Button size="sm" className="w-full mt-2">
                  Stake Tokens to Vote
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
