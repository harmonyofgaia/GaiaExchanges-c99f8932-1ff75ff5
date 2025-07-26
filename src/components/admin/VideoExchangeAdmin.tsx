import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Users, 
  TrendingUp, 
  Shield, 
  Settings,
  Play,
  Pause,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Upload,
  Download
} from 'lucide-react';

export function VideoExchangeAdmin() {
  const [videoStats, setVideoStats] = useState({
    totalVideos: 15847,
    activeStreams: 23,
    totalUsers: 8421,
    storageUsed: 2.7, // TB
    bandwidthUsage: 85.3 // %
  });

  const [recentUploads, setRecentUploads] = useState([
    { id: 1, title: "Ocean Cleanup Initiative", creator: "EcoWarrior123", duration: "12:45", views: 1247, status: "active" },
    { id: 2, title: "Forest Regeneration Project", creator: "TreePlanter", duration: "8:32", views: 892, status: "processing" },
    { id: 3, title: "Solar Panel Installation Guide", creator: "GreenTech", duration: "15:21", views: 2103, status: "active" },
    { id: 4, title: "Wildlife Conservation Update", creator: "NatureLover", duration: "6:18", views: 567, status: "pending" }
  ]);

  const [moderationQueue, setModerationQueue] = useState([
    { id: 1, title: "Plastic Reduction Tips", creator: "EcoActivist", type: "content review", priority: "medium" },
    { id: 2, title: "Climate Action Rally", creator: "GreenMovement", type: "copyright check", priority: "high" },
    { id: 3, title: "Sustainable Living Hacks", creator: "EcoLifestyle", type: "content review", priority: "low" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoStats(prev => ({
        ...prev,
        activeStreams: prev.activeStreams + Math.floor(Math.random() * 3) - 1,
        bandwidthUsage: Math.max(0, Math.min(100, prev.bandwidthUsage + (Math.random() - 0.5) * 5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleApproveContent = (id: number) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleRejectContent = (id: number) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-400">🎬 Video Exchange Admin</h2>
          <p className="text-muted-foreground">Manage GAiA Community Video Platform</p>
        </div>
        <Badge variant="outline" className="text-green-400 border-green-400">
          <Video className="h-4 w-4 mr-2" />
          {videoStats.activeStreams} Live Streams
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">{videoStats.totalVideos.toLocaleString()}</p>
              </div>
              <Video className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{videoStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{videoStats.storageUsed} TB</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bandwidth</p>
                <p className="text-2xl font-bold">{videoStats.bandwidthUsage.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
            <Progress value={videoStats.bandwidthUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Streams</p>
                <p className="text-2xl font-bold">{videoStats.activeStreams}</p>
              </div>
              <Play className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="moderation">Moderation Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Video className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {video.creator} • {video.duration} • {video.views} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={video.status === 'active' ? 'default' : video.status === 'processing' ? 'secondary' : 'outline'}>
                        {video.status}
                      </Badge>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Review Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moderationQueue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {item.creator} • {item.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                        {item.priority} priority
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => handleApproveContent(item.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleRejectContent(item.id)}>
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span className="font-semibold">+247 videos</span>
                  </div>
                  <Progress value={75} />
                  <div className="flex justify-between">
                    <span>Last Week</span>
                    <span className="font-semibold">+198 videos</span>
                  </div>
                  <Progress value={60} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Environmental</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <Progress value={42} />
                  <div className="flex justify-between">
                    <span>Education</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <Progress value={28} />
                  <div className="flex justify-between">
                    <span>Community</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <Progress value={18} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Upload Size Limit</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input type="number" className="flex-1 px-3 py-2 border rounded-md" defaultValue="500" />
                    <span className="text-sm text-muted-foreground">MB</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Video Quality</label>
                  <select className="w-full px-3 py-2 border rounded-md mt-1">
                    <option value="auto">Auto (recommended)</option>
                    <option value="1080p">1080p Max</option>
                    <option value="720p">720p Max</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Save Settings</Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}