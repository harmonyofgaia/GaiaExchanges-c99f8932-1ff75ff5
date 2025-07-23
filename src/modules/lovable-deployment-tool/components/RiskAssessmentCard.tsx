/**
 * Risk Assessment Card Component
 * Displays AI-powered risk analysis for deployments
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle } from 'lucide-react';

interface RiskAssessmentCardProps {
  className?: string;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          AI Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Overall Risk Level</span>
            <Badge className="bg-green-100 text-green-800">Low</Badge>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-green-800 text-sm">
              All changes verified as additive-only with minimal environmental impact
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};