import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Vote, TreePine, Droplets, Zap, Users, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "renewable" | "conservation" | "education" | "infrastructure";
  fundingGoal: number;
  currentFunding: number;
  votes: number;
  timeRemaining: number;
  proposedBy: string;
  impact: string;
  status: "voting" | "funded" | "completed";
}

export function CommunityProjectVoting() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Solar Panel Community Grid",
      description:
        "Install solar panels on community buildings to create a local renewable energy grid",
      category: "renewable",
      fundingGoal: 50000,
      currentFunding: 12500,
      votes: 247,
      timeRemaining: 14,
      proposedBy: "EcoWarrior",
      impact: "Reduce 150 tons CO2/year",
      status: "voting",
    },
    {
      id: "2",
      title: "Urban Forest Expansion",
      description:
        "Plant 1000 native trees throughout the city to improve air quality and biodiversity",
      category: "conservation",
      fundingGoal: 25000,
      currentFunding: 18750,
      votes: 189,
      timeRemaining: 7,
      proposedBy: "TreeLover",
      impact: "Absorb 50 tons CO2/year",
      status: "voting",
    },
    {
      id: "3",
      title: "Eco Education Center",
      description:
        "Build a community center focused on environmental education and workshops",
      category: "education",
      fundingGoal: 75000,
      currentFunding: 31500,
      votes: 156,
      timeRemaining: 21,
      proposedBy: "GreenTeacher",
      impact: "Educate 5000 people/year",
      status: "voting",
    },
  ]);

  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [newProposal, setNewProposal] = useState("");

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "renewable":
        return Zap;
      case "conservation":
        return TreePine;
      case "education":
        return Users;
      case "infrastructure":
        return Droplets;
      default:
        return Vote;
    }
  };

  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "renewable":
        return "bg-yellow-600";
      case "conservation":
        return "bg-green-600";
      case "education":
        return "bg-blue-600";
      case "infrastructure":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const voteForProject = (projectId: string) => {
    if (userVotes.has(projectId)) {
      toast.error("You have already voted for this project");
      return;
    }

    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, votes: project.votes + 1 }
          : project,
      ),
    );

    setUserVotes((prev) => new Set(prev).add(projectId));
    toast.success(
      "Vote cast successfully! +10 GAiA tokens earned for community participation",
    );
  };

  const fundProject = (projectId: string, amount: number) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, currentFunding: project.currentFunding + amount }
          : project,
      ),
    );
    toast.success(
      `Funded ${amount} GAiA tokens! Thank you for supporting community projects`,
    );
  };

  const submitProposal = () => {
    if (!newProposal.trim()) return;

    toast.success(
      "Project proposal submitted! It will be reviewed by the community.",
    );
    setNewProposal("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🗳️ Community Project Voting
        </h2>
        <p className="text-muted-foreground">
          Vote on and fund community environmental projects
        </p>
      </div>

      {/* Current Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const Icon = getCategoryIcon(project.category);
          const fundingProgress =
            (project.currentFunding / project.fundingGoal) * 100;
          const hasVoted = userVotes.has(project.id);

          return (
            <Card key={project.id} className="border-2 border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-green-400" />
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{project.timeRemaining}d left</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>
                      {project.currentFunding.toLocaleString()} /{" "}
                      {project.fundingGoal.toLocaleString()} GAiA
                    </span>
                  </div>
                  <Progress value={fundingProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Votes: </span>
                    <span className="font-bold text-green-400">
                      {project.votes}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Impact: </span>
                    <span className="font-medium">{project.impact}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Proposed by: </span>
                    <span className="font-medium">{project.proposedBy}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => voteForProject(project.id)}
                    disabled={hasVoted}
                    variant={hasVoted ? "secondary" : "default"}
                    className="flex-1"
                  >
                    {hasVoted ? "✅ Voted" : "🗳️ Vote (+10 GAiA)"}
                  </Button>
                  <Button
                    onClick={() => fundProject(project.id, 100)}
                    variant="outline"
                    className="flex-1"
                  >
                    💰 Fund 100 GAiA
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Propose New Project */}
      <Card className="border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Users className="h-5 w-5" />
            Propose New Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            placeholder="Describe your environmental project idea..."
            className="min-h-[100px]"
          />
          <Button onClick={submitProposal} className="w-full">
            📝 Submit Proposal (+25 GAiA)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
