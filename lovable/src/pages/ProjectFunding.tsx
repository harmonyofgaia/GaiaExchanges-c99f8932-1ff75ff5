import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  TreePine,
  Droplets,
  Users,
  Target,
  Calendar,
  DollarSign,
  Vote,
  Shield,
  Zap,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
  image: string;
  verified: boolean;
  impactScore: number;
}

const ProjectFunding = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fundingAmount, setFundingAmount] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
  });

  const projects: Project[] = [
    {
      id: "1",
      title: "Amazon Reforestation Initiative",
      description:
        "Plant 50,000 native trees in deforested areas of the Amazon rainforest to restore biodiversity and combat climate change.",
      category: "Reforestation",
      goalAmount: 100000,
      currentAmount: 75400,
      backers: 342,
      daysLeft: 15,
      image: "🌳",
      verified: true,
      impactScore: 95,
    },
    {
      id: "2",
      title: "Ocean Plastic Cleanup Network",
      description:
        "Deploy innovative floating cleanup systems to remove plastic waste from ocean gyres and protect marine life.",
      category: "Ocean Cleanup",
      goalAmount: 250000,
      currentAmount: 180300,
      backers: 567,
      daysLeft: 23,
      image: "🌊",
      verified: true,
      impactScore: 92,
    },
    {
      id: "3",
      title: "Solar Power for Rural Communities",
      description:
        "Install solar panel systems in remote villages to provide clean, renewable energy access to underserved populations.",
      category: "Renewable Energy",
      goalAmount: 150000,
      currentAmount: 89600,
      backers: 278,
      daysLeft: 31,
      image: "☀️",
      verified: true,
      impactScore: 88,
    },
    {
      id: "4",
      title: "Bee Sanctuary Expansion",
      description:
        "Create protected habitats for endangered bee species and establish educational programs about pollinator conservation.",
      category: "Wildlife Conservation",
      goalAmount: 75000,
      currentAmount: 42100,
      backers: 189,
      daysLeft: 19,
      image: "🐝",
      verified: true,
      impactScore: 85,
    },
  ];

  const handleFund = (projectId: string) => {
    if (!fundingAmount || parseFloat(fundingAmount) <= 0) {
      toast.error("Please enter a valid funding amount");
      return;
    }

    toast.success(`Successfully funded project with ${fundingAmount} GAiA tokens!`);
    setFundingAmount("");
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProject.title || !newProject.description || !newProject.goalAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Project proposal submitted for community review!");
    setNewProject({ title: "", description: "", category: "", goalAmount: "" });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <Card className="mb-8 border-2 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌍 DECENTRALIZED PROJECT FUNDING
            </CardTitle>
            <p className="text-center text-xl text-green-300">
              Fund environmental projects • Earn governance tokens • Create positive impact
            </p>
          </CardHeader>
        </Card>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
            <CardContent className="p-6 text-center">
              <TreePine className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-3xl font-bold text-green-400">47</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-blue-400">2.8M</div>
              <div className="text-sm text-muted-foreground">GAiA Tokens Raised</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-3xl font-bold text-purple-400">12.4K</div>
              <div className="text-sm text-muted-foreground">Total Backers</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-3xl font-bold text-yellow-400">89%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-400">Project Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "Reforestation",
                "Ocean Cleanup",
                "Renewable Energy",
                "Wildlife Conservation",
              ].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All Projects" : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {projects.map((project) => {
                const progress = (project.currentAmount / project.goalAmount) * 100;

                return (
                  <Card key={project.id} className="border-green-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-6xl">{project.image}</div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-green-400">{project.title}</h3>
                            {project.verified && (
                              <Badge className="bg-blue-600 text-white">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge className="bg-purple-600 text-white">
                              Impact: {project.impactScore}%
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-4">{project.description}</p>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>
                                Progress: {project.currentAmount.toLocaleString()} /{" "}
                                {project.goalAmount.toLocaleString()} GAiA
                              </span>
                              <span>{Math.round(progress)}% funded</span>
                            </div>

                            <Progress value={progress} className="h-3" />

                            <div className="flex justify-between items-center">
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {project.backers} backers
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {project.daysLeft} days left
                                </span>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Vote className="h-4 w-4 mr-1" />
                                  Vote
                                </Button>
                                <Button
                                  onClick={() => handleFund(project.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                  size="sm"
                                >
                                  Fund Project
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Fund */}
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">Quick Fund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount in GAiA tokens"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Fund
                </Button>
              </CardContent>
            </Card>

            {/* Create Project */}
            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">Propose New Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <Input
                    placeholder="Project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Project description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                  <Input
                    type="number"
                    placeholder="Goal amount (GAiA tokens)"
                    value={newProject.goalAmount}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        goalAmount: e.target.value,
                      })
                    }
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Submit Proposal
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* My Contributions */}
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">My Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Projects Funded:</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Contributed:</span>
                    <span className="font-bold">15,340 GAiA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Governance Power:</span>
                    <span className="font-bold">247 votes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impact Score:</span>
                    <span className="font-bold text-green-400">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFunding;
