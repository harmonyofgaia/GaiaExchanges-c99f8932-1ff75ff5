/**
 * Community Voting Component
 * Democratic approval process for deployments
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Users, 
  Clock, 
  Trophy,
  MessageSquare,
  Shield,
  Star
} from 'lucide-react';
import type { CommunityVote, SoulboundReputation } from '../interfaces';

interface CommunityVotingProps {
  deploymentId: string;
  className?: string;
}

export const CommunityVoting: React.FC<CommunityVotingProps> = ({ 
  deploymentId, 
  className 
}) => {
  const [votes, setVotes] = useState<CommunityVote[]>([]);
  const [userVote, setUserVote] = useState<'approve' | 'reject' | 'abstain' | null>(null);
  const [voteReason, setVoteReason] = useState('');
  const [reputation, setReputation] = useState<SoulboundReputation | null>(null);
  const [votingEndsAt, setVotingEndsAt] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVotingData();
  }, [deploymentId]);

  const loadVotingData = async () => {
    try {
      // Load existing votes and user reputation
      // In real implementation, would call actual services
      const mockVotes: CommunityVote[] = [
        {
          id: 'vote_001',
          deploymentId,
          voter: 'user_123',
          vote: 'approve',
          timestamp: new Date(),
          reason: 'Excellent environmental impact improvements',
          expertise: ['frontend', 'environmental-tech'],
          votingPower: 1.5,
          soulboundReputation: 750
        },
        {
          id: 'vote_002',
          deploymentId,
          voter: 'user_456',
          vote: 'approve',
          timestamp: new Date(),
          reason: 'Well-tested additive changes',
          expertise: ['backend', 'security'],
          votingPower: 2.1,
          soulboundReputation: 920
        }
      ];

      const mockReputation: SoulboundReputation = {
        userId: 'current_user',
        totalScore: 650,
        deploymentContributions: 15,
        communityLeadership: 8,
        innovationBonus: 5,
        environmentalImpact: 23,
        consistencyScore: 78,
        achievements: [
          {
            id: 'eco_champion',
            title: 'Eco Champion',
            description: 'Contributed to 10+ environmental deployments',
            category: 'environmental',
            rarity: 'rare',
            unlockedAt: new Date(),
            value: 50
          }
        ],
        lastUpdated: new Date()
      };

      setVotes(mockVotes);
      setReputation(mockReputation);
    } catch (error) {
      console.error('Failed to load voting data:', error);
    }
  };

  const submitVote = async (vote: 'approve' | 'reject' | 'abstain') => {
    if (!reputation) return;

    setLoading(true);
    try {
      // Submit vote via service
      // In real implementation, would call CommunityApprovalService
      const newVote: CommunityVote = {
        id: `vote_${Date.now()}`,
        deploymentId,
        voter: reputation.userId,
        vote,
        timestamp: new Date(),
        reason: voteReason,
        expertise: ['frontend', 'environmental-tech'], // Would come from user profile
        votingPower: calculateVotingPower(reputation),
        soulboundReputation: reputation.totalScore
      };

      setVotes(prev => [...prev, newVote]);
      setUserVote(vote);
      setVoteReason('');
    } catch (error) {
      console.error('Failed to submit vote:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateVotingPower = (rep: SoulboundReputation): number => {
    const basepower = 1;
    const reputationMultiplier = Math.min(Math.max(rep.totalScore / 1000, 0.5), 3);
    const expertiseBonus = 0.2; // Would calculate based on actual expertise
    const consistencyBonus = (rep.consistencyScore / 100) * 0.5;
    
    return basepower * reputationMultiplier + expertiseBonus + consistencyBonus;
  };

  const getVotingStats = () => {
    const totalVotingPower = votes.reduce((sum, vote) => sum + vote.votingPower, 0);
    const approveWeight = votes
      .filter(v => v.vote === 'approve')
      .reduce((sum, vote) => sum + vote.votingPower, 0);
    const rejectWeight = votes
      .filter(v => v.vote === 'reject')
      .reduce((sum, vote) => sum + vote.votingPower, 0);

    const approvalPercentage = totalVotingPower > 0 ? (approveWeight / totalVotingPower) * 100 : 0;
    const quorumNeeded = 51; // 51% participation needed
    const currentParticipation = 45; // Would calculate from actual community size

    return {
      totalVotes: votes.length,
      approvalPercentage,
      quorumMet: currentParticipation >= quorumNeeded,
      participationRate: currentParticipation,
      timeRemaining: Math.max(0, votingEndsAt.getTime() - Date.now())
    };
  };

  const stats = getVotingStats();
  const timeRemainingHours = Math.floor(stats.timeRemaining / (1000 * 60 * 60));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Voting Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Voting
          </CardTitle>
          <CardDescription>
            Democratic approval process for deployment {deploymentId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.approvalPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">
                {stats.totalVotes}
              </div>
              <div className="text-sm text-muted-foreground">Total Votes</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {timeRemainingHours}h
              </div>
              <div className="text-sm text-muted-foreground">Time Remaining</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Approval Progress</span>
              <span>{stats.approvalPercentage.toFixed(1)}% (Need 50%+)</span>
            </div>
            <Progress value={stats.approvalPercentage} className="h-3" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quorum Progress</span>
              <span>{stats.participationRate}% (Need 51%+)</span>
            </div>
            <Progress 
              value={stats.participationRate} 
              className="h-3"
              style={{
                background: stats.quorumMet ? 'bg-green-200' : 'bg-gray-200'
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* User Voting Interface */}
      {!userVote && reputation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cast Your Vote
            </CardTitle>
            <CardDescription>
              Your voting power: {calculateVotingPower(reputation).toFixed(2)}x
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4" />
              Reputation: {reputation.totalScore} points
              <Star className="h-4 w-4 ml-2" />
              {reputation.achievements.length} achievements
            </div>

            <Textarea
              placeholder="Reason for your vote (optional)"
              value={voteReason}
              onChange={(e) => setVoteReason(e.target.value)}
              className="min-h-[100px]"
            />

            <div className="flex gap-3">
              <Button
                onClick={() => submitVote('approve')}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Approve
              </Button>
              
              <Button
                onClick={() => submitVote('reject')}
                disabled={loading}
                variant="destructive"
                className="flex-1"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Reject
              </Button>
              
              <Button
                onClick={() => submitVote('abstain')}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                Abstain
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Vote Confirmation */}
      {userVote && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-green-600">
                Vote Submitted Successfully!
              </div>
              <div className="text-sm text-muted-foreground">
                You voted to {userVote} this deployment
              </div>
              {voteReason && (
                <div className="text-sm text-muted-foreground italic">
                  "{voteReason}"
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Votes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Votes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {votes.slice(-5).map((vote) => (
              <div
                key={vote.id}
                className="flex items-start justify-between p-3 border rounded-lg"
              >
                <div className="flex items-start gap-3">
                  {vote.vote === 'approve' ? (
                    <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                  ) : vote.vote === 'reject' ? (
                    <ThumbsDown className="h-4 w-4 text-red-500 mt-1" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-500 mt-1" />
                  )}
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Anonymous Voter</span>
                      <Badge variant="secondary" className="text-xs">
                        {vote.votingPower.toFixed(1)}x power
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {vote.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {vote.expertise.length > 0 && (
                      <div className="flex gap-1">
                        {vote.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {vote.reason && (
                      <p className="text-sm text-muted-foreground">
                        "{vote.reason}"
                      </p>
                    )}
                  </div>
                </div>
                
                <Badge
                  className={
                    vote.vote === 'approve'
                      ? 'bg-green-100 text-green-800'
                      : vote.vote === 'reject'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {vote.vote}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};