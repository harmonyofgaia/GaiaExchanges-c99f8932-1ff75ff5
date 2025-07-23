/**
 * Preview Environment Manager Component
 * Manages safe testing environments for deployment changes
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, ExternalLink, Play } from 'lucide-react';

interface PreviewEnvironmentManagerProps {
  className?: string;
}

export const PreviewEnvironmentManager: React.FC<PreviewEnvironmentManagerProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Preview Environments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Preview-v2.1.3</div>
              <div className="text-sm text-muted-foreground">
                Expires in 18 hours
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Ready</Badge>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
          
          <Button className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Create New Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};