import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Eye, Flag, Settings, BarChart3 } from "lucide-react";

export function VideoAdminControl() {
  const [moderationQueue, setModerationQueue] = useState(23);
  const [flaggedContent, setFlaggedContent] = useState(8);

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Admin Control Center
            <Badge variant="destructive">Admin Only</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm text-muted-foreground">Videos Under Review</div>
                  <div className="text-lg font-bold text-blue-400">{moderationQueue}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <Flag className="h-6 w-6 mx-auto mb-2 text-red-400" />
                  <div className="text-sm text-muted-foreground">Flagged Content</div>
                  <div className="text-lg font-bold text-red-400">{flaggedContent}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-400" />
                  <div className="text-sm text-muted-foreground">Active Moderators</div>
                  <div className="text-lg font-bold text-green-400">12</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <BarChart3 className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-sm text-muted-foreground">Daily Reports</div>
                  <div className="text-lg font-bold text-purple-400">47</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-4">
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Review Queue
                </Button>
                <Button size="sm" variant="outline">
                  Flagged Videos
                </Button>
                <Button size="sm" variant="outline">
                  User Reports
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Moderation tools and queue management interface would be implemented here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Analytics dashboard with platform metrics and insights would be implemented here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Platform Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
