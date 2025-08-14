import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coins,
  Users,
  Vote,
  Trophy,
  TrendingUp,
  Target,
  Award,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  BarChart3,
  Zap,
  Globe,
  Shield,
  Heart,
  Sparkles,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface TokenReward {
  id: string;
  type:
    | "prediction_accuracy"
    | "community_validation"
    | "implementation_success"
    | "early_adoption";
  amount: number;
  recipient: string;
  reason: string;
  timestamp: Date;
  status: "pending" | "distributed" | "staked";
}

interface CommunityProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  category:
    | "solution_approval"
    | "resource_allocation"
    | "system_improvement"
    | "governance_change";
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  deadline: Date;
  status: "active" | "passed" | "rejected" | "implemented";
  requiredApproval: number;
  stakingRequirement: number;
  userVote?: "for" | "against";
}

interface StakingPool {
  id: string;
  name: string;
  description: string;
  totalStaked: number;
  participants: number;
  apy: number;
  lockPeriod: number;
  environmentalImpact: string;
  userStaked: number;
  rewards: number;
}

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  totalTokens: number;
  predictionAccuracy: number;
  validationsCompleted: number;
  implementationsSupported: number;
  governanceParticipation: number;
  rank: number;
  badges: string[];
}

export function PsychohistoricalIntegration() {
  const [tokenRewards, setTokenRewards] = useState<TokenReward[]>([]);
  const [communityProposals, setCommunityProposals] = useState<CommunityProposal[]>([]);
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState({
    totalTokens: 0,
    stakedTokens: 0,
    votingPower: 0,
    predictionAccuracy: 0,
    rank: 0,
  });

  useEffect(() => {
    initializeTokenData();
    initializeCommunityProposals();
    initializeStakingPools();
    initializeLeaderboard();
    initializeUserStats();
    startRealTimeUpdates();
  }, []);

  const initializeTokenData = () => {
    const rewards: TokenReward[] = [
      {
        id: "reward-1",
        type: "prediction_accuracy",
        amount: 150,
        recipient: "You",
        reason: "Accurate climate prediction for coastal flooding events",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "distributed",
      },
      {
        id: "reward-2",
        type: "community_validation",
        amount: 75,
        recipient: "You",
        reason: "Peer validation of 3 environmental solutions",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "distributed",
      },
      {
        id: "reward-3",
        type: "implementation_success",
        amount: 300,
        recipient: "You",
        reason: "Solar panel initiative reached 95% efficiency target",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: "pending",
      },
    ];
    setTokenRewards(rewards);
  };

  const initializeCommunityProposals = () => {
    const proposals: CommunityProposal[] = [
      {
        id: "proposal-1",
        title: "Implement AI-Driven Ocean Cleanup Strategy",
        description:
          "Deploy autonomous cleanup drones for plastic waste removal in Pacific Ocean dead zones",
        proposer: "OceanGuardian2024",
        category: "solution_approval",
        votesFor: 2847,
        votesAgainst: 423,
        totalVoters: 3270,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "active",
        requiredApproval: 75,
        stakingRequirement: 1000,
        userVote: undefined,
      },
      {
        id: "proposal-2",
        title: "Allocate 500K GAIA for Renewable Energy Research",
        description: "Fund breakthrough research into quantum-enhanced solar panel technology",
        proposer: "EnergyInnovator",
        category: "resource_allocation",
        votesFor: 1892,
        votesAgainst: 647,
        totalVoters: 2539,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "active",
        requiredApproval: 70,
        stakingRequirement: 2000,
        userVote: "for",
      },
      {
        id: "proposal-3",
        title: "Upgrade Psychohistorical Engine AI Models",
        description: "Implement next-generation prediction algorithms for improved accuracy",
        proposer: "AIOptimizer",
        category: "system_improvement",
        votesFor: 3456,
        votesAgainst: 234,
        totalVoters: 3690,
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "passed",
        requiredApproval: 80,
        stakingRequirement: 1500,
        userVote: "for",
      },
    ];
    setCommunityProposals(proposals);
  };

  const initializeStakingPools = () => {
    const pools: StakingPool[] = [
      {
        id: "pool-1",
        name: "Climate Prediction Rewards",
        description: "Stake tokens to earn rewards from accurate climate forecasting",
        totalStaked: 2450000,
        participants: 1847,
        apy: 12.5,
        lockPeriod: 90,
        environmentalImpact: "2.3M tons CO₂ prevented",
        userStaked: 5000,
        rewards: 625,
      },
      {
        id: "pool-2",
        name: "Ocean Conservation Fund",
        description: "Support marine ecosystem protection and restoration projects",
        totalStaked: 1890000,
        participants: 1432,
        apy: 15.2,
        lockPeriod: 180,
        environmentalImpact: "45,000 marine animals protected",
        userStaked: 2500,
        rewards: 380,
      },
      {
        id: "pool-3",
        name: "Renewable Energy Innovation",
        description: "Fund breakthrough research in sustainable energy technologies",
        totalStaked: 3120000,
        participants: 2156,
        apy: 18.7,
        lockPeriod: 365,
        environmentalImpact: "150MW clean energy generated",
        userStaked: 0,
        rewards: 0,
      },
    ];
    setStakingPools(pools);
  };

  const initializeLeaderboard = () => {
    const leaders: LeaderboardEntry[] = [
      {
        id: "leader-1",
        username: "ClimateOracle",
        avatar: "🌍",
        totalTokens: 47500,
        predictionAccuracy: 94.2,
        validationsCompleted: 247,
        implementationsSupported: 23,
        governanceParticipation: 89,
        rank: 1,
        badges: ["Prediction Master", "Community Leader", "Innovation Pioneer"],
      },
      {
        id: "leader-2",
        username: "EcoInnovator",
        avatar: "🌱",
        totalTokens: 42300,
        predictionAccuracy: 91.7,
        validationsCompleted: 189,
        implementationsSupported: 31,
        governanceParticipation: 92,
        rank: 2,
        badges: ["Solution Architect", "Governance Expert"],
      },
      {
        id: "leader-3",
        username: "OceanProtector",
        avatar: "🌊",
        totalTokens: 38900,
        predictionAccuracy: 88.4,
        validationsCompleted: 156,
        implementationsSupported: 19,
        governanceParticipation: 87,
        rank: 3,
        badges: ["Marine Guardian", "Active Validator"],
      },
    ];
    setLeaderboard(leaders);
  };

  const initializeUserStats = () => {
    setUserStats({
      totalTokens: 8750,
      stakedTokens: 7500,
      votingPower: 15.2,
      predictionAccuracy: 86.7,
      rank: 247,
    });
  };

  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      // Simulate real-time token earnings
      if (Math.random() > 0.8) {
        setUserStats((prev) => ({
          ...prev,
          totalTokens: prev.totalTokens + Math.floor(Math.random() * 50),
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  };

  const voteOnProposal = (proposalId: string, vote: "for" | "against") => {
    setCommunityProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedProposal = { ...proposal };

          // Remove previous vote if exists
          if (proposal.userVote === "for") {
            updatedProposal.votesFor -= 1;
          } else if (proposal.userVote === "against") {
            updatedProposal.votesAgainst -= 1;
          } else {
            updatedProposal.totalVoters += 1;
          }

          // Add new vote
          if (vote === "for") {
            updatedProposal.votesFor += 1;
          } else {
            updatedProposal.votesAgainst += 1;
          }

          updatedProposal.userVote = vote;
          return updatedProposal;
        }
        return proposal;
      })
    );

    const proposal = communityProposals.find((p) => p.id === proposalId);
    toast.success(`Vote recorded!`, {
      description: `You voted ${vote} on "${proposal?.title}"`,
    });
  };

  const stakeTokens = (poolId: string, amount: number) => {
    setStakingPools((prev) =>
      prev.map((pool) => {
        if (pool.id === poolId) {
          return {
            ...pool,
            userStaked: pool.userStaked + amount,
            totalStaked: pool.totalStaked + amount,
            participants: pool.userStaked === 0 ? pool.participants + 1 : pool.participants,
          };
        }
        return pool;
      })
    );

    setUserStats((prev) => ({
      ...prev,
      totalTokens: prev.totalTokens - amount,
      stakedTokens: prev.stakedTokens + amount,
    }));

    const pool = stakingPools.find((p) => p.id === poolId);
    toast.success("Tokens staked successfully!", {
      description: `Staked ${amount} GAIA in ${pool?.name}`,
    });
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-blue-500/50 text-blue-400";
      case "passed":
        return "border-green-500/50 text-green-400";
      case "rejected":
        return "border-red-500/50 text-red-400";
      case "implemented":
        return "border-purple-500/50 text-purple-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "solution_approval":
        return "border-green-500/50 text-green-400";
      case "resource_allocation":
        return "border-blue-500/50 text-blue-400";
      case "system_improvement":
        return "border-purple-500/50 text-purple-400";
      case "governance_change":
        return "border-yellow-500/50 text-yellow-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* User Token Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {userStats.totalTokens.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total GAIA Tokens</div>
              </div>
              <Coins className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {userStats.stakedTokens.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Tokens Staked</div>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{userStats.votingPower}%</div>
                <div className="text-xs text-muted-foreground">Voting Power</div>
              </div>
              <Vote className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">#{userStats.rank}</div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="governance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="governance">Community Governance</TabsTrigger>
          <TabsTrigger value="staking">Token Staking</TabsTrigger>
          <TabsTrigger value="rewards">Reward Distribution</TabsTrigger>
          <TabsTrigger value="leaderboard">Community Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="governance" className="space-y-4">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Vote className="h-5 w-5" />
                Active Community Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{proposal.title}</h4>
                          <Badge variant="outline" className={getCategoryColor(proposal.category)}>
                            {proposal.category.replace("_", " ")}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getProposalStatusColor(proposal.status)}
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          Proposed by: {proposal.proposer} • Staking requirement:{" "}
                          {proposal.stakingRequirement} GAIA • Approval needed:{" "}
                          {proposal.requiredApproval}%
                        </div>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-400" />
                            <span className="text-sm">Support ({proposal.votesFor})</span>
                          </div>
                          <span className="text-green-400 font-bold">
                            {Math.round((proposal.votesFor / proposal.totalVoters) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(proposal.votesFor / proposal.totalVoters) * 100}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <ThumbsDown className="h-4 w-4 text-red-400" />
                            <span className="text-sm">Against ({proposal.votesAgainst})</span>
                          </div>
                          <span className="text-red-400 font-bold">
                            {Math.round((proposal.votesAgainst / proposal.totalVoters) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(proposal.votesAgainst / proposal.totalVoters) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{proposal.totalVoters} total votes</span>
                        <span>
                          {proposal.status === "active"
                            ? `${Math.ceil((proposal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining`
                            : "Voting closed"}
                        </span>
                      </div>
                    </div>

                    {proposal.status === "active" && (
                      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-500/20">
                        <Button
                          size="sm"
                          onClick={() => voteOnProposal(proposal.id, "for")}
                          className={`${proposal.userVote === "for" ? "bg-green-600" : "bg-green-600/70"} hover:bg-green-700`}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {proposal.userVote === "for" ? "Voted Support" : "Vote Support"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => voteOnProposal(proposal.id, "against")}
                          className={`${proposal.userVote === "against" ? "border-red-500 text-red-400" : "border-gray-500"}`}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          {proposal.userVote === "against" ? "Voted Against" : "Vote Against"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-4">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                Environmental Impact Staking Pools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {stakingPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{pool.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{pool.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <div className="text-sm text-muted-foreground">APY</div>
                            <div className="font-bold text-green-400">{pool.apy}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Lock Period</div>
                            <div className="font-bold text-blue-400">{pool.lockPeriod} days</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Total Staked</div>
                            <div className="font-bold text-purple-400">
                              {(pool.totalStaked / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Participants</div>
                            <div className="font-bold text-yellow-400">
                              {pool.participants.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3 rounded-lg mb-3">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Environmental Impact: </span>
                            <span className="font-bold text-green-400">
                              {pool.environmentalImpact}
                            </span>
                          </div>
                        </div>

                        {pool.userStaked > 0 && (
                          <div className="bg-black/30 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-muted-foreground">Your Stake</div>
                                <div className="font-bold text-blue-400">
                                  {pool.userStaked.toLocaleString()} GAIA
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Pending Rewards</div>
                                <div className="font-bold text-green-400">
                                  {pool.rewards.toLocaleString()} GAIA
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => stakeTokens(pool.id, 1000)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Stake 1,000 GAIA
                      </Button>
                      {pool.userStaked > 0 ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-400"
                        >
                          <Award className="h-4 w-4 mr-1" />
                          Claim Rewards
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => stakeTokens(pool.id, 2500)}
                          variant="outline"
                          className="border-purple-500/50 text-purple-400"
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Stake 2,500 GAIA
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Award className="h-5 w-5" />
                Recent Token Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tokenRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            +{reward.amount} GAIA
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                            {reward.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-white mb-1">{reward.reason}</p>
                        <div className="text-xs text-muted-foreground">
                          {Math.floor((Date.now() - reward.timestamp.getTime()) / 1000 / 60)}{" "}
                          minutes ago
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            reward.status === "distributed"
                              ? "border-green-500/50 text-green-400"
                              : reward.status === "staked"
                                ? "border-blue-500/50 text-blue-400"
                                : "border-yellow-500/50 text-yellow-400"
                          }
                        >
                          {reward.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Trophy className="h-5 w-5" />
                Community Leadership Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((leader) => (
                  <div
                    key={leader.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                              leader.rank === 1
                                ? "bg-yellow-500"
                                : leader.rank === 2
                                  ? "bg-gray-400"
                                  : leader.rank === 3
                                    ? "bg-orange-600"
                                    : "bg-gray-600"
                            }`}
                          >
                            {leader.rank <= 3 ? "👑" : leader.avatar}
                          </div>
                          <div className="text-lg font-bold mt-1">#{leader.rank}</div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-2">{leader.username}</h3>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                            <div>
                              <div className="text-xs text-muted-foreground">Total Tokens</div>
                              <div className="font-bold text-green-400">
                                {leader.totalTokens.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Accuracy</div>
                              <div className="font-bold text-blue-400">
                                {leader.predictionAccuracy}%
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Validations</div>
                              <div className="font-bold text-purple-400">
                                {leader.validationsCompleted}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Governance</div>
                              <div className="font-bold text-yellow-400">
                                {leader.governanceParticipation}%
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {leader.badges.map((badge, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-cyan-500/50 text-cyan-400"
                              >
                                <Star className="h-3 w-3 mr-1" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
