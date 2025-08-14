import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Vote,
  Users,
  Gavel,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: "funding" | "governance" | "technical" | "community";
  status: "active" | "passed" | "rejected" | "pending";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  endTime: Date;
  proposer: string;
  requiredTokens: number;
}

export default function DAOGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userTokenBalance, setUserTokenBalance] = useState(15420);
  const [votingPower, setVotingPower] = useState(1250);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    type: "governance" as const,
    requiredTokens: 1000,
  });

  useEffect(() => {
    // Initialize with mock proposals
    const mockProposals: Proposal[] = [
      {
        id: "1",
        title: "Fund Ocean Cleanup Initiative",
        description:
          "Allocate 50,000 GAIA tokens to support ocean plastic cleanup projects in Southeast Asia",
        type: "funding",
        status: "active",
        votesFor: 12500,
        votesAgainst: 3200,
        totalVotes: 15700,
        quorum: 10000,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        proposer: "OceanGuardian.eth",
        requiredTokens: 50000,
      },
      {
        id: "2",
        title: "Update Carbon Credit Calculation Algorithm",
        description:
          "Implement a more accurate carbon credit calculation system based on latest scientific research",
        type: "technical",
        status: "active",
        votesFor: 8900,
        votesAgainst: 4100,
        totalVotes: 13000,
        quorum: 15000,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        proposer: "TechForGaia.eth",
        requiredTokens: 0,
      },
      {
        id: "3",
        title: "Partnership with Reforestation Groups",
        description:
          "Establish official partnerships with 5 major reforestation organizations worldwide",
        type: "community",
        status: "passed",
        votesFor: 18500,
        votesAgainst: 2100,
        totalVotes: 20600,
        quorum: 12000,
        endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        proposer: "ForestFriend.eth",
        requiredTokens: 25000,
      },
    ];
    setProposals(mockProposals);
  }, []);

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    const voteAmount = Math.min(votingPower, 500);

    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          return {
            ...proposal,
            votesFor: vote === "for" ? proposal.votesFor + voteAmount : proposal.votesFor,
            votesAgainst:
              vote === "against" ? proposal.votesAgainst + voteAmount : proposal.votesAgainst,
            totalVotes: proposal.totalVotes + voteAmount,
          };
        }
        return proposal;
      })
    );

    setVotingPower((prev) => prev - voteAmount);

    toast.success(`🗳️ Voted ${vote} with ${voteAmount} tokens!`, {
      description: "Your vote has been recorded on the blockchain",
      duration: 4000,
    });
  };

  const handleCreateProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      toast.error("Please fill in all proposal details");
      return;
    }

    const proposal: Proposal = {
      id: (proposals.length + 1).toString(),
      title: newProposal.title,
      description: newProposal.description,
      type: newProposal.type,
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      quorum: 10000,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      proposer: "You",
      requiredTokens: newProposal.requiredTokens,
    };

    setProposals((prev) => [proposal, ...prev]);
    setShowCreateProposal(false);
    setNewProposal({
      title: "",
      description: "",
      type: "governance",
      requiredTokens: 1000,
    });

    toast.success("🚀 Proposal created successfully!", {
      description: "Your proposal is now live for community voting",
      duration: 5000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-600";
      case "passed":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      case "pending":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "passed":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
          🏛️ DAO GOVERNANCE
        </h1>
        <p className="text-muted-foreground mt-2">
          Decentralized decision-making for Gaia's future
        </p>
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">Your Tokens</p>
                <p className="text-2xl font-bold text-purple-400">
                  {userTokenBalance.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-400">Voting Power</p>
                <p className="text-2xl font-bold text-blue-400">{votingPower.toLocaleString()}</p>
              </div>
              <Vote className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Active Proposals</p>
                <p className="text-2xl font-bold text-green-400">
                  {proposals.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Gavel className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-400">Total Proposals</p>
                <p className="text-2xl font-bold text-orange-400">{proposals.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Proposal Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Proposals</h2>
        <Button
          onClick={() => setShowCreateProposal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Gavel className="h-4 w-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      {/* Create Proposal Form */}
      {showCreateProposal && (
        <Card className="border-purple-500/50 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">📝 Create New Proposal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Proposal Title</label>
              <Input
                value={newProposal.title}
                onChange={(e) => setNewProposal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter proposal title..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={newProposal.description}
                onChange={(e) =>
                  setNewProposal((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your proposal in detail..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  className="w-full p-2 border rounded-md bg-background"
                  value={newProposal.type}
                  onChange={(e) =>
                    setNewProposal((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                >
                  <option value="governance">Governance</option>
                  <option value="funding">Funding</option>
                  <option value="technical">Technical</option>
                  <option value="community">Community</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Required Tokens</label>
                <Input
                  type="number"
                  value={newProposal.requiredTokens}
                  onChange={(e) =>
                    setNewProposal((prev) => ({
                      ...prev,
                      requiredTokens: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateProposal} className="bg-purple-600 hover:bg-purple-700">
                Submit Proposal
              </Button>
              <Button variant="outline" onClick={() => setShowCreateProposal(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => {
          const progressFor =
            (proposal.votesFor / Math.max(proposal.quorum, proposal.totalVotes)) * 100;
          const progressAgainst =
            (proposal.votesAgainst / Math.max(proposal.quorum, proposal.totalVotes)) * 100;
          const timeLeft = Math.max(0, proposal.endTime.getTime() - Date.now());
          const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

          return (
            <Card key={proposal.id} className="border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{proposal.title}</h3>
                      <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                        {getStatusIcon(proposal.status)}
                        {proposal.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {proposal.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{proposal.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>By: {proposal.proposer}</span>
                      {proposal.status === "active" && (
                        <span>
                          ⏰ {daysLeft}d {hoursLeft}h left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Voting Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-400">
                        For: {proposal.votesFor.toLocaleString()} votes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {progressFor.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progressFor} className="h-2 bg-gray-700">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${progressFor}%` }}
                      />
                    </Progress>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-red-400">
                        Against: {proposal.votesAgainst.toLocaleString()} votes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {progressAgainst.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progressAgainst} className="h-2 bg-gray-700">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${progressAgainst}%` }}
                      />
                    </Progress>

                    <div className="text-center text-sm text-muted-foreground">
                      Quorum: {proposal.quorum.toLocaleString()} | Total votes:{" "}
                      {proposal.totalVotes.toLocaleString()}
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {proposal.status === "active" && votingPower > 0 && (
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => handleVote(proposal.id, "for")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Vote For
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, "against")}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {proposal.status === "active" && votingPower === 0 && (
                    <div className="text-center text-muted-foreground">
                      You have no voting power remaining
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
