import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Coins, 
  Vote, 
  Target,
  Users,
  TreePine,
  Droplets,
  Zap,
  Globe,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  PlusCircle
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  votesFor: number;
  votesAgainst: number;
  status: 'proposed' | 'funding' | 'active' | 'completed';
  timeRemaining: string;
  milestones: number;
  completedMilestones: number;
  impact: string;
  region: string;
}

interface UserStake {
  amount: number;
  projectId: number;
  votingPower: number;
}

const DecentralizedProjectFundingPools = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Ocean Plastic Cleanup Initiative",
      description: "Advanced ocean cleanup technology deployment to remove plastic waste from the Pacific Ocean",
      category: "Ocean Conservation",
      fundingGoal: 250000,
      currentFunding: 187500,
      votesFor: 1234,
      votesAgainst: 87,
      status: 'funding',
      timeRemaining: "15 days",
      milestones: 5,
      completedMilestones: 0,
      impact: "Remove 50 tons of plastic waste",
      region: "Pacific Ocean"
    },
    {
      id: 2,
      title: "Reforestation Amazon Basin",
      description: "Planting native trees and restoring biodiversity in deforested areas of the Amazon rainforest",
      category: "Reforestation",
      fundingGoal: 180000,
      currentFunding: 195000,
      votesFor: 2156,
      votesAgainst: 23,
      status: 'active',
      timeRemaining: "Funded",
      milestones: 4,
      completedMilestones: 2,
      impact: "Plant 100,000 trees",
      region: "Brazil"
    },
    {
      id: 3,
      title: "Solar Energy for Rural Communities",
      description: "Installing solar panels and energy storage systems in underserved rural communities",
      category: "Renewable Energy",
      fundingGoal: 320000,
      currentFunding: 98000,
      votesFor: 876,
      votesAgainst: 124,
      status: 'proposed',
      timeRemaining: "7 days to vote",
      milestones: 6,
      completedMilestones: 0,
      impact: "Power 500 homes with clean energy",
      region: "Southeast Asia"
    }
  ]);

  const [userStakes] = useState<UserStake[]>([
    { amount: 5000, projectId: 1, votingPower: 125 },
    { amount: 2500, projectId: 2, votingPower: 75 }
  ]);

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
    milestones: '',
    impact: '',
    region: ''
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ocean Conservation': return Droplets;
      case 'Reforestation': return TreePine;
      case 'Renewable Energy': return Zap;
      default: return Globe;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'bg-yellow-500';
      case 'funding': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateFundingPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const totalUserStaked = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalVotingPower = userStakes.reduce((sum, stake) => sum + stake.votingPower, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-green-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            🏛️ Decentralized Project Funding Pools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Community-driven funding for environmental projects using transparent smart contracts and democratic governance.
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              Your Stake: ${totalUserStaked.toLocaleString()}
            </Badge>
            <Badge className="bg-green-600 text-white px-4 py-2">
              Voting Power: {totalVotingPower}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="active-projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active-projects">Active Projects</TabsTrigger>
            <TabsTrigger value="my-investments">My Investments</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="propose">Propose Project</TabsTrigger>
          </TabsList>

          <TabsContent value="active-projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => {
                const IconComponent = getCategoryIcon(project.category);
                const fundingPercentage = calculateFundingPercentage(project.currentFunding, project.fundingGoal);
                
                return (
                  <Card key={project.id} className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getStatusColor(project.status)} text-white`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>{fundingPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={fundingPercentage} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${project.currentFunding.toLocaleString()}</span>
                          <span>${project.fundingGoal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Milestones</span>
                          <span>{project.completedMilestones}/{project.milestones}</span>
                        </div>
                        <Progress 
                          value={(project.completedMilestones / project.milestones) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span>{project.impact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <span>{project.region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span>{project.timeRemaining}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-sm">
                          <div className="text-green-600">👍 {project.votesFor}</div>
                          <div className="text-red-600">👎 {project.votesAgainst}</div>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            <Vote className="h-3 w-3 mr-1" />
                            Vote
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                            <Coins className="h-3 w-3 mr-1" />
                            Fund
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-investments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <DollarSign className="h-5 w-5" />
                    Total Staked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${totalUserStaked.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Across {userStakes.length} projects</div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Vote className="h-5 w-5" />
                    Voting Power
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalVotingPower}</div>
                  <div className="text-sm text-muted-foreground">Democratic influence</div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <TrendingUp className="h-5 w-5" />
                    Impact Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">847</div>
                  <div className="text-sm text-muted-foreground">Environmental impact</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Your Active Investments</h3>
              {userStakes.map((stake) => {
                const project = projects.find(p => p.id === stake.projectId);
                if (!project) return null;

                return (
                  <Card key={stake.projectId} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${stake.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{stake.votingPower} votes</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">DAO Governance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Participate in democratic decision-making for project funding, platform upgrades, and community initiatives.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Active Proposals</h4>
                  
                  <Card className="border">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">Increase minimum funding threshold</h5>
                        <Badge variant="outline">Open</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Proposal to increase minimum project funding from $50K to $75K to ensure better project quality.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-green-600">For: 2,456</span>
                          <span className="mx-2">|</span>
                          <span className="text-red-600">Against: 892</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Cast Vote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">Add Carbon Credit verification</h5>
                        <Badge variant="outline">Open</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Implement mandatory carbon credit verification for all environmental projects.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-green-600">For: 3,124</span>
                          <span className="mx-2">|</span>
                          <span className="text-red-600">Against: 456</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Cast Vote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Submit New Governance Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="propose" className="space-y-6">
            <Card className="border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <PlusCircle className="h-5 w-5" />
                  Propose New Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter project title"
                      value={newProposal.title}
                      onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Reforestation, Ocean Conservation"
                      value={newProposal.category}
                      onChange={(e) => setNewProposal({...newProposal, category: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of your environmental project"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="funding-goal">Funding Goal ($)</Label>
                    <Input
                      id="funding-goal"
                      type="number"
                      placeholder="e.g., 100000"
                      value={newProposal.fundingGoal}
                      onChange={(e) => setNewProposal({...newProposal, fundingGoal: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestones">Number of Milestones</Label>
                    <Input
                      id="milestones"
                      type="number"
                      placeholder="e.g., 5"
                      value={newProposal.milestones}
                      onChange={(e) => setNewProposal({...newProposal, milestones: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      placeholder="e.g., Amazon Basin"
                      value={newProposal.region}
                      onChange={(e) => setNewProposal({...newProposal, region: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact">Expected Impact</Label>
                  <Input
                    id="impact"
                    placeholder="e.g., Plant 50,000 trees, Remove 100 tons of plastic"
                    value={newProposal.impact}
                    onChange={(e) => setNewProposal({...newProposal, impact: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    Submit Project Proposal
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your proposal will be reviewed by the community before entering the voting phase.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DecentralizedProjectFundingPools;