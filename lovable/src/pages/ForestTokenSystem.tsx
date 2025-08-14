import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Coins,
  TrendingUp,
  Users,
  Vote,
  Shield,
  Leaf,
  Target,
  Award,
  Wallet,
  ArrowUpDown,
  Plus,
  Minus,
  BarChart3,
  Settings,
  Lock,
  Zap,
  Gift,
  Crown,
  Star,
  TreePine,
} from "lucide-react";

interface TokenBalance {
  type: "impact" | "governance" | "investor" | "community" | "development";
  symbol: string;
  balance: number;
  value: number;
  change24h: number;
  staked: number;
  rewards: number;
}

interface StakingPool {
  id: string;
  name: string;
  tokenType: string;
  apy: number;
  totalStaked: number;
  userStaked: number;
  lockPeriod: number;
  rewards: number;
  description: string;
}

interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  type: "deployment" | "funding" | "technical" | "partnership";
  status: "active" | "passed" | "rejected" | "executed";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  requiredTokens: number;
}

const ForestTokenSystem = () => {
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>(null);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [stakingAmount, setStakingAmount] = useState("");
  const [votingPower, setVotingPower] = useState(0);

  const tokenBalances: TokenBalance[] = useMemo(
    () => [
      {
        type: "impact",
        symbol: "IMPACT",
        balance: 2450,
        value: 12250,
        change24h: 5.2,
        staked: 1200,
        rewards: 45.6,
      },
      {
        type: "governance",
        symbol: "GOVERN",
        balance: 850,
        value: 17000,
        change24h: -2.1,
        staked: 500,
        rewards: 23.4,
      },
      {
        type: "investor",
        symbol: "INVEST",
        balance: 125,
        value: 25000,
        change24h: 8.7,
        staked: 75,
        rewards: 18.2,
      },
      {
        type: "community",
        symbol: "COMM",
        balance: 3200,
        value: 6400,
        change24h: 3.4,
        staked: 1800,
        rewards: 67.5,
      },
      {
        type: "development",
        symbol: "DEV",
        balance: 180,
        value: 3600,
        change24h: 1.2,
        staked: 0,
        rewards: 0,
      },
    ],
    []
  );

  const stakingPools: StakingPool[] = [
    {
      id: "impact-30",
      name: "Impact Validator Pool",
      tokenType: "IMPACT",
      apy: 12.5,
      totalStaked: 2500000,
      userStaked: 1200,
      lockPeriod: 30,
      rewards: 45.6,
      description: "Validate environmental impact measurements and earn rewards",
    },
    {
      id: "governance-90",
      name: "Governance Authority Pool",
      tokenType: "GOVERN",
      apy: 18.3,
      totalStaked: 850000,
      userStaked: 500,
      lockPeriod: 90,
      rewards: 23.4,
      description: "Participate in critical system governance decisions",
    },
    {
      id: "investor-365",
      name: "Long-term Investor Pool",
      tokenType: "INVEST",
      apy: 25.0,
      totalStaked: 125000,
      userStaked: 75,
      lockPeriod: 365,
      rewards: 18.2,
      description: "Long-term commitment with highest rewards",
    },
    {
      id: "community-14",
      name: "Community Responder Pool",
      tokenType: "COMM",
      apy: 8.7,
      totalStaked: 5000000,
      userStaked: 1800,
      lockPeriod: 14,
      rewards: 67.5,
      description: "Support local wildfire response training and coordination",
    },
  ];

  const governanceProposals: GovernanceProposal[] = [
    {
      id: "FSP-001",
      title: "Deploy Sand Cannons to Australian Outback",
      description:
        "Proposal to deploy 500 sand cannon units across high-risk areas in the Australian Outback, focusing on protecting critical koala habitats and eucalyptus forests.",
      type: "deployment",
      status: "active",
      votesFor: 234500,
      votesAgainst: 45600,
      totalVotes: 280100,
      endDate: "2024-12-25T23:59:59Z",
      requiredTokens: 100,
    },
    {
      id: "FSP-002",
      title: "Partnership with California Fire Department",
      description:
        "Establish formal partnership agreement with California Fire Department for integrated emergency response protocols and data sharing.",
      type: "partnership",
      status: "active",
      votesFor: 156700,
      votesAgainst: 23400,
      totalVotes: 180100,
      endDate: "2024-12-22T23:59:59Z",
      requiredTokens: 50,
    },
    {
      id: "FSP-003",
      title: "AI Model Upgrade to v4.0",
      description:
        "Upgrade the wildfire detection AI to version 4.0 with improved accuracy and reduced false positives.",
      type: "technical",
      status: "passed",
      votesFor: 445600,
      votesAgainst: 67800,
      totalVotes: 513400,
      endDate: "2024-12-15T23:59:59Z",
      requiredTokens: 200,
    },
  ];

  const getTokenIcon = (type: string) => {
    switch (type) {
      case "impact":
        return Leaf;
      case "governance":
        return Vote;
      case "investor":
        return TrendingUp;
      case "community":
        return Users;
      case "development":
        return Settings;
      default:
        return Coins;
    }
  };

  const getTokenColor = (type: string) => {
    switch (type) {
      case "impact":
        return "text-green-600";
      case "governance":
        return "text-blue-600";
      case "investor":
        return "text-yellow-600";
      case "community":
        return "text-purple-600";
      case "development":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProposalIcon = (type: string) => {
    switch (type) {
      case "deployment":
        return Target;
      case "funding":
        return Coins;
      case "technical":
        return Settings;
      case "partnership":
        return Users;
      default:
        return Vote;
    }
  };

  const totalPortfolioValue = useMemo(() => {
    return tokenBalances.reduce((sum, token) => sum + token.value, 0);
  }, [tokenBalances]);

  const totalStaked = useMemo(() => {
    return tokenBalances.reduce(
      (sum, token) => sum + token.staked * (token.value / token.balance),
      0
    );
  }, [tokenBalances]);

  const totalRewards = useMemo(() => {
    return tokenBalances.reduce((sum, token) => sum + token.rewards, 0);
  }, [tokenBalances]);
  useEffect(() => {
    const governanceTokens = tokenBalances.find((t) => t.type === "governance");
    if (governanceTokens) {
      setVotingPower(governanceTokens.balance + governanceTokens.staked);
    }
  }, [tokenBalances]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="h-10 w-10 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Forest Shield Token System</h1>
                <p className="text-lg text-gray-600">
                  Multi-tier blockchain rewards for wildfire defense
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Portfolio Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ${totalPortfolioValue.toLocaleString()}
                </div>
              </div>
              <Button>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Wallet className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">Portfolio</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${totalPortfolioValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Lock className="h-8 w-8 text-purple-600" />
                <Badge variant="outline">Staked</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${totalStaked.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Locked Value</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Gift className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Rewards</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalRewards.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Pending Rewards</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Vote className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">Voting</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{votingPower.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Voting Power</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Holdings</CardTitle>
                    <CardDescription>Your multi-tier Forest Shield token balances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tokenBalances.map((token) => {
                        const IconComponent = getTokenIcon(token.type);
                        return (
                          <div
                            key={token.symbol}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedToken?.symbol === token.symbol
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedToken(token)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <IconComponent className={`h-8 w-8 ${getTokenColor(token.type)}`} />
                                <div>
                                  <div className="font-semibold">{token.symbol}</div>
                                  <div className="text-sm text-gray-600 capitalize">
                                    {token.type} Token
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  {token.balance.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600">
                                  ${token.value.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">24h Change</div>
                                <div
                                  className={`font-semibold ${token.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {token.change24h >= 0 ? "+" : ""}
                                  {token.change24h}%
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600">Staked</div>
                                <div className="font-semibold">{token.staked.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Rewards</div>
                                <div className="font-semibold text-green-600">{token.rewards}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedToken && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {(() => {
                          const IconComponent = getTokenIcon(selectedToken.type);
                          return (
                            <IconComponent
                              className={`h-5 w-5 mr-2 ${getTokenColor(selectedToken.type)}`}
                            />
                          );
                        })()}
                        {selectedToken.symbol} Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Swap Tokens
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Lock className="h-4 w-4 mr-2" />
                          Stake Tokens
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Zap className="h-4 w-4 mr-2" />
                          Claim Rewards
                        </Button>

                        <div className="pt-4 border-t space-y-3">
                          <h4 className="font-semibold">Token Utility</h4>
                          {selectedToken.type === "impact" && (
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Reward environmental impact verification</li>
                              <li>• Access premium impact tracking tools</li>
                              <li>• Participate in conservation projects</li>
                            </ul>
                          )}
                          {selectedToken.type === "governance" && (
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Vote on system deployments</li>
                              <li>• Propose new initiatives</li>
                              <li>• Control treasury allocations</li>
                            </ul>
                          )}
                          {selectedToken.type === "investor" && (
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Share in system revenue</li>
                              <li>• Priority access to new features</li>
                              <li>• Higher staking rewards</li>
                            </ul>
                          )}
                          {selectedToken.type === "community" && (
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Local responder coordination</li>
                              <li>• Community training access</li>
                              <li>• Emergency response rewards</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Staking Tab */}
          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stakingPools.map((pool) => (
                <Card key={pool.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pool.name}</CardTitle>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {pool.apy}% APY
                      </Badge>
                    </div>
                    <CardDescription>{pool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Your Staked</div>
                          <div className="font-semibold">
                            {pool.userStaked.toLocaleString()} {pool.tokenType}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Lock Period</div>
                          <div className="font-semibold">{pool.lockPeriod} days</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Staked</div>
                          <div className="font-semibold">
                            {(pool.totalStaked / 1000000).toFixed(1)}M {pool.tokenType}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Your Rewards</div>
                          <div className="font-semibold text-green-600">{pool.rewards}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Stake Amount</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="0.00"
                            value={stakingAmount}
                            onChange={(e) => setStakingAmount(e.target.value)}
                          />
                          <Button variant="outline" size="sm">
                            Max
                          </Button>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Plus className="h-4 w-4 mr-2" />
                          Stake
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Minus className="h-4 w-4 mr-2" />
                          Unstake
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Rewards ({pool.rewards})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Proposals</CardTitle>
                    <CardDescription>
                      Vote on Forest Shield system governance decisions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {governanceProposals.map((proposal) => {
                        const IconComponent = getProposalIcon(proposal.type);
                        const votePercentage =
                          proposal.totalVotes > 0
                            ? (proposal.votesFor / proposal.totalVotes) * 100
                            : 0;
                        const isActive = proposal.status === "active";

                        return (
                          <div
                            key={proposal.id}
                            className="border-2 border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <IconComponent className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                  <h3 className="font-semibold">{proposal.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {proposal.description}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={isActive ? "default" : "secondary"}>
                                {proposal.status.toUpperCase()}
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium">
                                    Votes: {votePercentage.toFixed(1)}% For
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {proposal.totalVotes.toLocaleString()} total votes
                                  </span>
                                </div>
                                <Progress value={votePercentage} className="h-2" />
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Votes For</div>
                                  <div className="font-semibold text-green-600">
                                    {proposal.votesFor.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Votes Against</div>
                                  <div className="font-semibold text-red-600">
                                    {proposal.votesAgainst.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              {isActive && (
                                <div className="flex space-x-2 pt-2">
                                  <Button size="sm" className="flex-1">
                                    <Vote className="h-4 w-4 mr-2" />
                                    Vote For
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <Vote className="h-4 w-4 mr-2" />
                                    Vote Against
                                  </Button>
                                </div>
                              )}

                              <div className="text-xs text-gray-500 pt-2">
                                {isActive
                                  ? `Voting ends: ${new Date(proposal.endDate).toLocaleDateString()}`
                                  : `Proposal ${proposal.status}`}
                                • Required tokens: {proposal.requiredTokens} GOVERN
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Voting Power</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {votingPower.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">GOVERN Tokens</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Held Tokens:</span>
                          <span>
                            {tokenBalances
                              .find((t) => t.type === "governance")
                              ?.balance.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Staked Tokens:</span>
                          <span>
                            {tokenBalances
                              .find((t) => t.type === "governance")
                              ?.staked.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Voting Power:</span>
                            <span>{votingPower.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Increase Voting Power
                      </Button>

                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Governance History</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Proposals Voted: 12</div>
                          <div>Success Rate: 83%</div>
                          <div>Reputation Score: 94/100</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Impact Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">45.6</div>
                  <div className="text-sm text-gray-600">IMPACT Earned</div>
                  <Button size="sm" className="w-full mt-3">
                    Claim
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-purple-600" />
                    Governance Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">23.4</div>
                  <div className="text-sm text-gray-600">GOVERN Earned</div>
                  <Button size="sm" className="w-full mt-3">
                    Claim
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-600" />
                    Investor Returns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">18.2</div>
                  <div className="text-sm text-gray-600">INVEST Earned</div>
                  <Button size="sm" className="w-full mt-3">
                    Claim
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Community Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">67.5</div>
                  <div className="text-sm text-gray-600">COMM Earned</div>
                  <Button size="sm" className="w-full mt-3">
                    Claim
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Reward Activities</CardTitle>
                <CardDescription>
                  Track your contributions and earned rewards across all token types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TreePine className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-semibold">Forest Impact Verification</div>
                        <div className="text-sm text-gray-600">Verified 12 hectares protected</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+15.2 IMPACT</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Vote className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Governance Participation</div>
                        <div className="text-sm text-gray-600">Voted on deployment proposal</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">+5.8 GOVERN</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-semibold">Emergency Response</div>
                        <div className="text-sm text-gray-600">Participated in wildfire alert</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-purple-600">+25.0 COMM</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Exchange</CardTitle>
                  <CardDescription>
                    Swap between different Forest Shield token types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>From</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input placeholder="0.00" className="flex-1" />
                        <Button variant="outline">IMPACT</Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div>
                      <Label>To</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input placeholder="0.00" className="flex-1" />
                        <Button variant="outline">GOVERN</Button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Exchange Rate: 1 IMPACT = 0.45 GOVERN
                    </div>

                    <Button className="w-full">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Swap Tokens
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gaia Product Rewards</CardTitle>
                  <CardDescription>
                    Future Gaia products available for token holders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">Gaia Forest Guardian NFT</div>
                      <div className="text-sm text-gray-600 mb-3">
                        Exclusive NFT collection for token holders with verified environmental
                        impact
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">500 IMPACT Required</Badge>
                        <Button size="sm" disabled>
                          Coming Soon
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">Gaia Smart Garden Kit</div>
                      <div className="text-sm text-gray-600 mb-3">
                        IoT-enabled garden monitoring system for personal sustainability
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">1000 COMM Required</Badge>
                        <Button size="sm" disabled>
                          Q2 2025
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">Gaia Carbon Credit Package</div>
                      <div className="text-sm text-gray-600 mb-3">
                        Verified carbon credits from Forest Shield protected areas
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">100 INVEST Required</Badge>
                        <Button size="sm">Available</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ForestTokenSystem;
