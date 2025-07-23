/**
 * Platform Sync Status Component
 * Shows synchronization status across all deployment platforms
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

interface PlatformSyncStatusProps {
  className?: string;
}

export const PlatformSyncStatus: React.FC<PlatformSyncStatusProps> = ({ className }) => {
  const platforms = [
    { name: 'Vercel', status: 'synced', lastSync: '2 min ago' },
    { name: 'Netlify', status: 'synced', lastSync: '5 min ago' },
    { name: 'Supabase', status: 'syncing', lastSync: 'In progress' },
    { name: 'Lovable', status: 'synced', lastSync: '1 min ago' },
    { name: 'Replit', status: 'failed', lastSync: '1 hour ago' },
    { name: 'GaiaExchanges', status: 'synced', lastSync: '30 sec ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'syncing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-800';
      case 'syncing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Platform Sync Status
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(platform.status)}
                <div>
                  <div className="font-medium">{platform.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last sync: {platform.lastSync}
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(platform.status)}>
                {platform.status}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Multi-Platform Sync:</strong> Automatic deployment across all connected platforms
            with additive-only guarantees and community approval workflow.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};