import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import * as LucideIcons from 'lucide-react'
import { Navbar } from '@/components/Navbar'

interface SandProtectStats {
  totalFunding: number
  fundingGoal: number
  tokensEarned: number
  pointsEarned: number
  cannonsDeployed: number
  firesExtinguished: number
  forestsProtected: number
  communityMembers: number
  governanceProposals: number
  activeVotes: number
}

interface GovernanceProposal {
  id: string
  title: string
  description: string
  proposer: string
  votesFor: number
  votesAgainst: number
  status: 'active' | 'passed' | 'rejected'
  endDate: string
  category: 'technical' | 'funding' | 'policy'
}

interface EcoAction {
  id: string
  type: 'deployment' | 'maintenance' | 'vote' | 'funding' | 'monitoring'
  description: string
  points: number
  tokens: number
  timestamp: string
  status: 'completed' | 'pending' | 'verified'
}

export default function SandProtect() {
  const [stats, setStats] = useState<SandProtectStats>({
    totalFunding: 847500,
    fundingGoal: 1500000,
    tokensEarned: 12847,
    pointsEarned: 45291,
    cannonsDeployed: 12,
    firesExtinguished: 38,
    forestsProtected: 847,
    communityMembers: 2341,
    governanceProposals: 23,
    activeVotes: 4
  })

  const [proposals] = useState<GovernanceProposal[]>([
    {
      id: 'SP-001',
      title: 'Increase Sand Cannon Range to 750m',
      description: 'Proposal to upgrade existing sand cannons with extended range capability for better forest coverage.',
      proposer: 'harmonyofgaia',
      votesFor: 1847,
      votesAgainst: 234,
      status: 'active',
      endDate: '2024-12-20T23:59:59Z',
      category: 'technical'
    },
    {
      id: 'SP-002',
      title: 'Emergency Funding Pool - $500K',
      description: 'Create emergency funding pool for rapid deployment of sand cannons during extreme wildfire seasons.',
      proposer: 'forestguardian',
      votesFor: 2156,
      votesAgainst: 89,
      status: 'active',
      endDate: '2024-12-18T23:59:59Z',
      category: 'funding'
    }
  ])

  const [recentActions] = useState<EcoAction[]>([
    {
      id: 'EA-001',
      type: 'deployment',
      description: 'Successfully deployed sand cannon SC-013 in Yellowstone sector',
      points: 500,
      tokens: 25,
      timestamp: '2024-12-15T14:30:00Z',
      status: 'verified'
    },
    {
      id: 'EA-002',
      type: 'vote',
      description: 'Voted on range upgrade proposal SP-001',
      points: 10,
      tokens: 2,
      timestamp: '2024-12-15T13:45:00Z',
      status: 'completed'
    },
    {
      id: 'EA-003',
      type: 'funding',
      description: 'Contributed 100 GAiA tokens to emergency fund',
      points: 200,
      tokens: 10,
      timestamp: '2024-12-15T12:20:00Z',
      status: 'verified'
    }
  ])

  const fundingPercentage = stats.fundingGoal === 0 
    ? 0 
    : (stats.totalFunding / stats.fundingGoal) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500'
      case 'passed': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'verified': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="h-4 w-4" />
      case 'funding': return <DollarSign className="h-4 w-4" />
      case 'policy': return <Shield className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'deployment': return <Target className="h-4 w-4 text-blue-500" />
      case 'maintenance': return <Settings className="h-4 w-4 text-yellow-500" />
      case 'vote': return <Vote className="h-4 w-4 text-purple-500" />
      case 'funding': return <Coins className="h-4 w-4 text-green-500" />
      case 'monitoring': return <Activity className="h-4 w-4 text-orange-500" />
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                🏜️ Sand Protect System
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Community-driven wildfire prevention through sand cannon technology
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                  <Shield className="h-3 w-3 mr-1" />
                  Forest Protection
                </Badge>
                <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                  <Users className="h-3 w-3 mr-1" />
                  Community Project
                </Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  <Award className="h-3 w-3 mr-1" />
                  Verified by harmonyofgaia
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Project Owner</div>
              <div className="text-lg font-semibold text-green-400">harmonyofgaia</div>
              <div className="text-sm text-muted-foreground mt-1">Est. 2024</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.cannonsDeployed}</div>
              <div className="text-sm text-muted-foreground">Sand Cannons</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.firesExtinguished}</div>
              <div className="text-sm text-muted-foreground">Fires Stopped</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
            <CardContent className="p-4 text-center">
              <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.forestsProtected.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Hectares Protected</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.communityMembers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="actions">Eco Actions</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Funding */}
              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Project Funding
                  </CardTitle>
                  <CardDescription>Community-funded wildfire prevention initiative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-green-400 font-bold">{fundingPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={fundingPercentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised: ${stats.totalFunding.toLocaleString()}</span>
                    <span className="text-muted-foreground">Goal: ${stats.fundingGoal.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-400">{stats.tokensEarned.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">GAiA Tokens Earned</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">{stats.pointsEarned.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Eco Points Earned</div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Support Sand Protect
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5 text-blue-400" />
                    System Status
                  </CardTitle>
                  <CardDescription>Real-time sand cannon network monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-1" />
                      <div className="text-sm font-medium">Network Online</div>
                      <div className="text-xs text-muted-foreground">99.8% Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                      <Zap className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-sm font-medium">AI Detection</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Cannons</span>
                      <span className="font-semibold text-green-400">10/12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-semibold text-blue-400">18s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-semibold text-green-400">96.7%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Full Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Alerts */}
            <Alert className="border-orange-500/50 bg-orange-900/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <div>
                    <strong>High Fire Risk Alert</strong> - Elevated temperatures and low humidity detected in sectors 7-9. 
                    Sand cannons SC-007 and SC-009 on standby.
                  </div>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                    Active
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Vote className="h-5 w-5 text-purple-400" />
                    Active Proposals
                  </CardTitle>
                  <CardDescription>Community governance for Sand Protect improvements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="p-4 border border-gray-700/20 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(proposal.category)}
                          <h4 className="font-semibold text-white">{proposal.title}</h4>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center p-2 bg-green-900/20 rounded">
                          <div className="text-lg font-bold text-green-400">{proposal.votesFor.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">For</div>
                        </div>
                        <div className="text-center p-2 bg-red-900/20 rounded">
                          <div className="text-lg font-bold text-red-400">{proposal.votesAgainst.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Against</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Proposed by: {proposal.proposer}</span>
                        <span>Ends: {new Date(proposal.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Vote className="h-3 w-3 mr-1" />
                          Vote For
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">
                          <Vote className="h-3 w-3 mr-1" />
                          Vote Against
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-blue-400" />
                    Governance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-3 bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{stats.governanceProposals}</div>
                    <div className="text-sm text-muted-foreground">Total Proposals</div>
                  </div>
                  <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{stats.activeVotes}</div>
                    <div className="text-sm text-muted-foreground">Active Votes</div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Your Voting Power:</span>
                      <span className="font-semibold text-green-400">1,247 votes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participation Rate:</span>
                      <span className="font-semibold text-blue-400">78%</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <Vote className="h-4 w-4 mr-2" />
                    Create Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Token Rewards */}
              <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Coins className="h-5 w-5 text-green-400" />
                    GAiA Token Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{stats.tokensEarned.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Deployment Rewards:</span>
                      <span className="text-green-400">+25 GAiA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Voting Rewards:</span>
                      <span className="text-green-400">+2 GAiA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance Rewards:</span>
                      <span className="text-green-400">+15 GAiA</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Wallet className="h-4 w-4 mr-2" />
                    Claim Rewards
                  </Button>
                </CardContent>
              </Card>

              {/* Eco Points */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Star className="h-5 w-5 text-purple-400" />
                    Eco Points
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{stats.pointsEarned.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Level:</span>
                      <span className="text-purple-400 font-semibold">Guardian</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Level:</span>
                      <span className="text-muted-foreground">Protector (2,709 pts)</span>
                    </div>
                  </div>
                  <Progress value={85} className="h-2" />
                  <Button variant="outline" className="w-full border-purple-500/50 text-purple-400">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Achievements
                  </Button>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    Community Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-900/20 rounded">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500">1</Badge>
                        <span className="text-sm font-medium">harmonyofgaia</span>
                      </div>
                      <span className="text-yellow-400 font-bold">89,234 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-800/20 rounded">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-400">2</Badge>
                        <span className="text-sm font-medium">forestguardian</span>
                      </div>
                      <span className="text-gray-400 font-bold">67,891 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-900/20 rounded">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-500">3</Badge>
                        <span className="text-sm font-medium">ecowarrior</span>
                      </div>
                      <span className="text-orange-400 font-bold">54,672 pts</span>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Your Rank: #47 (45,291 pts)
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Full Rankings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">98.7%</div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                  <div className="text-xs text-green-400 mt-1">↑ 0.3% this month</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">24s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  <div className="text-xs text-green-400 mt-1">↓ 3s this week</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20">
                <CardContent className="p-4 text-center">
                  <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">96.7%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-xs text-green-400 mt-1">↑ 2.1% this month</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$2.3M</div>
                  <div className="text-sm text-muted-foreground">Damage Prevented</div>
                  <div className="text-xs text-green-400 mt-1">This year</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Performance Analytics
                </CardTitle>
                <CardDescription>Detailed system performance and impact metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-white mb-1">Interactive Analytics Dashboard</p>
                    <p className="text-sm text-muted-foreground">Real-time charts and performance metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eco Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Recent Eco Actions
                </CardTitle>
                <CardDescription>Your contributions to the Sand Protect mission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-4 border border-gray-700/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getActionIcon(action.type)}
                        <div>
                          <div className="font-medium text-white">{action.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(action.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(action.status)} variant="outline">
                            {action.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-green-400">+{action.points} pts</div>
                        <div className="text-sm text-blue-400">+{action.tokens} GAiA</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Wallet className="h-5 w-5 text-green-400" />
                    GAiA Wallet Integration
                  </CardTitle>
                  <CardDescription>Connect your wallet to participate in Sand Protect</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">GAiA Token Balance</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-400">{stats.tokensEarned.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Available for staking and governance</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Coins className="h-4 w-4 mr-2" />
                      Stake Tokens
                    </Button>
                    <Button variant="outline" className="border-green-500/50 text-green-400">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Donate
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Staked Amount:</span>
                      <span className="text-blue-400 font-semibold">8,500 GAiA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staking Rewards:</span>
                      <span className="text-green-400 font-semibold">127 GAiA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Donated:</span>
                      <span className="text-purple-400 font-semibold">2,340 GAiA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Globe className="h-5 w-5 text-blue-400" />
                    Blockchain Integration
                  </CardTitle>
                  <CardDescription>Private blockchain transactions and verification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Network Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-400">Connected</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Gaia Private Blockchain v2.1</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction Count:</span>
                      <span className="font-semibold">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas Fees Saved:</span>
                      <span className="text-green-400 font-semibold">$89.45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbon Footprint:</span>
                      <span className="text-green-400 font-semibold">Near Zero</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-blue-500/50 text-blue-400">
                    <Activity className="h-4 w-4 mr-2" />
                    View Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}