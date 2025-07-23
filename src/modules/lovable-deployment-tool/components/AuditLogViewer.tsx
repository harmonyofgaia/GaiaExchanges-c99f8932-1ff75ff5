/**
 * Audit Log Viewer Component
 * Comprehensive logging and tracking interface
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, User, Activity } from 'lucide-react';

interface AuditLogViewerProps {
  className?: string;
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ className }) => {
  const mockLogs = [
    {
      id: '1',
      timestamp: new Date(),
      action: 'Deployment Created',
      user: 'user_123',
      details: 'Version v2.1.3 with 5 additive changes'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 60000),
      action: 'Community Vote',
      user: 'user_456',
      details: 'Approved deployment with 2.1x voting power'
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Audit Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <Activity className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{log.action}</span>
                  <Badge variant="outline" className="text-xs">
                    {log.timestamp.toLocaleTimeString()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {log.details}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {log.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};