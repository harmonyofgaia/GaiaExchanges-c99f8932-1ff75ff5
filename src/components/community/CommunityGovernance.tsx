
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Vote, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Clock,
  Lightbulb,
  MessageCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface Proposal {
  id: string
  title: string
  description: string
  proposer: string
  category: 'funding' | 'feature' | 'governance' | 'environmental'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  status: 'active' | 'passed' | 'rejected' | 'implemented'
  endDate: Date
  requiredQuorum: number
  votingPower: number
}

interface GovernanceStats {
  totalProposals: number
  activeVoters: number
  communityTreasury: number
  votingPower: number
}

export function CommunityGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: '🌊 Fund Ocean Cleanup Initiative',
      description: 'Allocate 50,000 GAiA tokens to support advanced ocean plastic removal technology in the Pacific.',
      proposer: 'OceanProtector2024',
      category: 'environmental',
      votesFor: 1250,
      votesAgainst: 320,
      totalVotes: 1570,
      status: 'active',
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      requiredQuorum: 2000,
      votingPower: 1245
    },
    {
      id: '2',
      title: '🚴 GAiA Bike Reward Increase',
      description: 'Increase GAiA bike earning rate from 2 to 3 tokens per kilometer to incentivize more eco-friendly transportation.',
      proposer: 'CycleEco',
      category: 'feature',
      votesFor: 890,
      votesAgainst: 445,
      totalVotes: 1335,
      status: 'active',
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      requiredQuorum: 1500,
      votingPower: 1245
    },
    {
      id: '3',
      title: '🏛️ Implement Quadratic Voting',
      description: 'Switch to quadratic voting system to give more voice to smaller token holders and prevent whale manipulation.',
      proposer: 'DemocracyAdvocate',
      category: 'governance',
      votesFor: 2150,
      votesAgainst: 890,
      totalVotes: 3040,
      status: 'passed',
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      requiredQuorum: 2500,
      votingPower: 1245
    }
  ])

  const [stats] = useState<GovernanceStats>({
    totalProposals: 127,
    activeVoters: 3240,
    communityTreasury: 125000,
    votingPower: 1245
  })

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'feature' as const
  })

  const [showNewProposal, setShowNewProposal] = useState(false)

  const handleVote = (proposalId: string, voteType: 'for' | 'against') => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId && proposal.status === 'active') {
        const newProposal = { ...proposal }
        if (voteType === 'for') {
          newProposal.votesFor += stats.votingPower
        } else {
          newProposal.votesAgainst += stats.votingPower
        }
        newProposal.totalVotes += stats.votingPower
        return newProposal
      }
      return proposal
    }))

    toast.success('🗳️ Vote Recorded!', {
      description: `Your vote ${voteType === 'for' ? 'in favor' : 'against'} has been recorded with ${stats.votingPower} voting power.`,
      duration: 4000
    })
  }

  const submitProposal = () => {
    if (!newProposal.title || !newProposal.description) return

    const proposal: Proposal = {
      id: Date.now().toString(),
      title: newProposal.title,
      description: newProposal.description,
      proposer: 'YourUsername',
      category: newProposal.category,
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      status: 'active',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      requiredQuorum: 1000,
      votingPower: 0
    }

    setProposals(prev => [proposal, ...prev])
    setNewProposal({ title: '', description: '', category: 'feature' })
    setShowNewProposal(false)

    toast.success('🎉 Proposal Submitted!', {
      description: 'Your proposal is now live and ready for community voting!',
      duration: 4000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600'
      case 'passed': return 'bg-green-600'
      case 'rejected': return 'bg-red-600'
      case 'implemented': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'funding': return 'bg-yellow-600'
      case 'feature': return 'bg-blue-600'
      case 'governance': return 'bg-purple-600'
      case 'environmental': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Vote className="h-6 w-6" />
            🏛️ Community Governance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Governance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalProposals}</div>
              <div className="text-xs text-muted-foreground">Total Proposals</div>
            </div>
            <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/20 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.activeVoters.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active Voters</div>
            </div>
            <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.communityTreasury.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Treasury (GAiA)</div>
            </div>
            <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.votingPower}</div>
              <div className="text-xs text-muted-foreground">Your Voting Power</div>
            </div>
          </div>

          {/* New Proposal Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Active Proposals</h3>
            <Button 
              onClick={() => setShowNewProposal(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>

          {/* New Proposal Form */}
          {showNewProposal && (
            <Card className="mb-6 border-purple-500/30">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Proposal Title</Label>
                    <Input
                      id="title"
                      value={newProposal.title}
                      onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                      placeholder="Enter a clear, descriptive title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProposal.description}
                      onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                      placeholder="Explain your proposal in detail..."
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNewProposal(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={submitProposal}>
                      Submit Proposal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposals List */}
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="border-gray-500/20">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{proposal.title}</h4>
                        <Badge className={`${getCategoryColor(proposal.category)} text-white text-xs`}>
                          {proposal.category.toUpperCase()}
                        </Badge>
                        <Badge className={`${getStatusColor(proposal.status)} text-white text-xs`}>
                          {proposal.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                      <div className="text-xs text-muted-foreground">
                        By {proposal.proposer} • Ends {proposal.endDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>For: {proposal.votesFor.toLocaleString()}</span>
                      <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <Progress value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Total Votes: {proposal.totalVotes.toLocaleString()}</span>
                      <span>Quorum: {proposal.requiredQuorum.toLocaleString()}</span>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={() => handleVote(proposal.id, 'for')}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Vote For
                        </Button>
                        <Button 
                          onClick={() => handleVote(proposal.id, 'against')}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Vote Against
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
