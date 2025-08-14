import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Vote, Users, Gavel, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: "feature" | "tokenomics" | "governance" | "partnership";
  status: "voting" | "passed" | "rejected" | "implemented";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  timeRemaining: number;
  proposedBy: string;
  requiredTokens: number;
}

export function CommunityGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "1",
      title: "Increase Bike Earning Rate",
      description:
        "Proposal to increase GAiA earning rate from 2 to 3 tokens per km for bike activities",
      type: "tokenomics",
      status: "voting",
      votesFor: 1247,
      votesAgainst: 423,
      totalVotes: 1670,
      quorum: 2000,
      timeRemaining: 5,
      proposedBy: "EcoWarrior",
      requiredTokens: 1000,
    },
    {
      id: "2",
      title: "Partner with Solar Companies",
      description: "Establish partnerships with solar panel companies for token discounts",
      type: "partnership",
      status: "passed",
      votesFor: 2156,
      votesAgainst: 234,
      totalVotes: 2390,
      quorum: 2000,
      timeRemaining: 0,
      proposedBy: "SolarAdvocate",
      requiredTokens: 1000,
    },
  ]);

  const [userVotingPower] = useState(1250);
  const [newProposal, setNewProposal] = useState("");
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  const voteOnProposal = (proposalId: string, support: boolean) => {
    if (userVotes.has(proposalId)) {
      toast.error("You have already voted on this proposal");
      return;
    }

    setProposals(
      proposals.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votesFor: support ? proposal.votesFor + userVotingPower : proposal.votesFor,
              votesAgainst: !support
                ? proposal.votesAgainst + userVotingPower
                : proposal.votesAgainst,
              totalVotes: proposal.totalVotes + userVotingPower,
            }
          : proposal
      )
    );

    setUserVotes((prev) => new Set(prev).add(proposalId));
    toast.success(`Vote cast successfully! Your ${userVotingPower} voting power has been applied.`);
  };

  const submitProposal = () => {
    if (!newProposal.trim()) return;

    toast.success("Governance proposal submitted!", {
      description: "Your proposal will be reviewed and put to community vote.",
      duration: 4000,
    });
    setNewProposal("");
  };

  const getTypeColor = (type: Proposal["type"]) => {
    switch (type) {
      case "feature":
        return "bg-blue-600";
      case "tokenomics":
        return "bg-green-600";
      case "governance":
        return "bg-purple-600";
      case "partnership":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: Proposal["status"]) => {
    switch (status) {
      case "voting":
        return <Vote className="h-4 w-4 text-blue-400" />;
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "rejected":
        return <CheckCircle className="h-4 w-4 text-red-400" />;
      case "implemented":
        return <Gavel className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-gold-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Crown className="h-6 w-6" />
            🏛️ Community Governance
            <Badge className="bg-yellow-600">Phase 3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Voting Power */}
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-yellow-400">Your Voting Power</h3>
                  <p className="text-sm text-muted-foreground">Based on your GAiA token holdings</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">{userVotingPower}</div>
                  <div className="text-sm text-muted-foreground">Votes</div>
                </div>
              </div>
            </div>

            {/* Active Proposals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400">Community Proposals</h3>

              {proposals.map((proposal) => {
                const hasVoted = userVotes.has(proposal.id);
                const supportPercentage =
                  proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;
                const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100;

                return (
                  <Card key={proposal.id} className="border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(proposal.status)}
                            <h4 className="text-xl font-bold">{proposal.title}</h4>
                            <Badge className={getTypeColor(proposal.type)}>
                              {proposal.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{proposal.description}</p>
                          <div className="text-sm text-muted-foreground">
                            Proposed by: {proposal.proposedBy} • Required: {proposal.requiredTokens}{" "}
                            GAiA to propose
                          </div>
                        </div>

                        {proposal.timeRemaining > 0 && (
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-orange-400">
                              <Clock className="h-4 w-4" />
                              {proposal.timeRemaining}d left
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Support</span>
                            <span>
                              {proposal.votesFor} for • {proposal.votesAgainst} against
                            </span>
                          </div>
                          <Progress value={supportPercentage} className="h-3" />
                          <div className="text-center text-sm text-muted-foreground">
                            {supportPercentage.toFixed(1)}% support
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Quorum Progress</span>
                            <span>
                              {proposal.totalVotes} / {proposal.quorum} votes
                            </span>
                          </div>
                          <Progress value={quorumPercentage} className="h-2" />
                        </div>

                        {proposal.status === "voting" && !hasVoted && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => voteOnProposal(proposal.id, true)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              ✅ Vote For
                            </Button>
                            <Button
                              onClick={() => voteOnProposal(proposal.id, false)}
                              variant="outline"
                              className="flex-1"
                            >
                              ❌ Vote Against
                            </Button>
                          </div>
                        )}

                        {hasVoted && (
                          <div className="text-center p-2 bg-blue-900/20 rounded border border-blue-500/20">
                            <span className="text-blue-400">
                              ✅ You have voted on this proposal
                            </span>
                          </div>
                        )}

                        {proposal.status === "passed" && (
                          <div className="text-center p-2 bg-green-900/20 rounded border border-green-500/20">
                            <span className="text-green-400">
                              🎉 Proposal Passed - Implementation Pending
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Submit New Proposal */}
            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="h-5 w-5" />
                  Submit New Proposal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={newProposal}
                  onChange={(e) => setNewProposal(e.target.value)}
                  placeholder="Describe your proposal for the GAiA community..."
                  className="min-h-[100px]"
                />
                <div className="text-sm text-muted-foreground">
                  Requires 1,000 GAiA tokens to submit a proposal
                </div>
                <Button
                  onClick={submitProposal}
                  className="w-full"
                  disabled={userVotingPower < 1000}
                >
                  📝 Submit Proposal (-1000 GAiA)
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
