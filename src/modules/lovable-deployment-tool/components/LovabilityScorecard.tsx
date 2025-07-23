/**
 * Lovability Scorecard Component
 * Displays comprehensive lovability metrics for deployments
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Zap, Leaf, Star, TrendingUp } from 'lucide-react';

interface LovabilityScoreCardProps {
  className?: string;
}

export const LovabilityScorecard: React.FC<LovabilityScoreCardProps> = ({ className }) => {
  const scores = {
    overall: 88,
    communitySatisfaction: 90,
    performanceImpact: 85,
    environmentalBenefit: 92,
    innovationRecognition: 80,
    longTermValue: 87
  };

  const scoreItems = [
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Community Satisfaction',
      score: scores.communitySatisfaction,
      color: 'bg-blue-500'
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: 'Performance Impact',
      score: scores.performanceImpact,
      color: 'bg-yellow-500'
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      label: 'Environmental Benefit',
      score: scores.environmentalBenefit,
      color: 'bg-green-500'
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: 'Innovation Recognition',
      score: scores.innovationRecognition,
      color: 'bg-purple-500'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: 'Long-term Value',
      score: scores.longTermValue,
      color: 'bg-orange-500'
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Lovability Scorecard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{scores.overall}%</div>
            <div className="text-sm text-muted-foreground">Overall Lovability</div>
            <div className="mt-2">
              <Progress value={scores.overall} className="h-3" />
            </div>
          </div>

          {/* Individual Scores */}
          <div className="space-y-4">
            {scoreItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {item.icon}
                    {item.label}
                  </div>
                  <span className="text-sm font-semibold">{item.score}%</span>
                </div>
                <Progress 
                  value={item.score} 
                  className="h-2"
                  style={{ backgroundColor: '#f1f5f9' }}
                />
              </div>
            ))}
          </div>

          {/* Insights */}
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-800">
              <strong>Excellent Score!</strong> This deployment shows high community satisfaction
              and strong environmental benefits. The innovation recognition suggests creative
              problem-solving that will have lasting positive impact.
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <div className="font-medium">Weighted Factors:</div>
              <div>• User feedback: 25%</div>
              <div>• Performance metrics: 20%</div>
              <div>• Environmental impact: 25%</div>
            </div>
            <div>
              <div className="font-medium">Bonus Factors:</div>
              <div>• Innovation: 15%</div>
              <div>• Long-term value: 15%</div>
              <div>• Community engagement</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};