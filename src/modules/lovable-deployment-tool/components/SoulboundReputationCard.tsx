/**
 * Soulbound Reputation Card Component
 * Displays user's non-transferable reputation and achievements
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Leaf, Shield, Code } from 'lucide-react';

interface SoulboundReputationCardProps {
  className?: string;
}

export const SoulboundReputationCard: React.FC<SoulboundReputationCardProps> = ({ className }) => {
  const achievements = [
    {
      icon: <Leaf className="h-4 w-4" />,
      title: 'Eco Champion',
      rarity: 'rare',
      description: '10+ environmental deployments'
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: 'Security Guardian', 
      rarity: 'epic',
      description: 'Prevented 5 security vulnerabilities'
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Soulbound Reputation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">750</div>
            <div className="text-sm text-muted-foreground">Total Reputation</div>
          </div>

          {/* Progress to next level */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level Progress</span>
              <span>750/1000</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-semibold">23</div>
              <div className="text-xs text-muted-foreground">Deployments</div>
            </div>
            <div>
              <div className="text-lg font-semibold">15</div>
              <div className="text-xs text-muted-foreground">Leadership</div>
            </div>
            <div>
              <div className="text-lg font-semibold">42</div>
              <div className="text-xs text-muted-foreground">Eco Impact</div>
            </div>
            <div>
              <div className="text-lg font-semibold">85%</div>
              <div className="text-xs text-muted-foreground">Consistency</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <div className="font-medium text-sm">Recent Achievements</div>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                <div className="p-1 bg-background rounded">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{achievement.title}</span>
                    <Badge variant="outline" className={`text-xs ${
                      achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};