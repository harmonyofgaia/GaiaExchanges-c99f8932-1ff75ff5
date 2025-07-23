/**
 * Deployment Wizard Component
 * Step-by-step deployment creation interface
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, AlertCircle } from 'lucide-react';

interface DeploymentWizardProps {
  className?: string;
}

export const DeploymentWizard: React.FC<DeploymentWizardProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Deployment Wizard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <span className="text-blue-800">
            Step-by-step deployment creation interface coming soon
          </span>
        </div>
        <Button className="mt-4" disabled>
          Start New Deployment
        </Button>
      </CardContent>
    </Card>
  );
};