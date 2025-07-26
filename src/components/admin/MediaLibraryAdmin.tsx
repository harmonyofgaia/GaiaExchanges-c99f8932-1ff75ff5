import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Image, 
  Video, 
  Music, 
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Folder,
  Cloud,
  HardDrive,
  Eye,
  Edit,
  Trash2,
  Star
} from 'lucide-react';

export function MediaLibraryAdmin() {
  const [mediaStats, setMediaStats] = useState({
    totalFiles: 247891,
    totalSize: 15.7, // TB
    videos: 45623,
    images: 189456,
    audio: 8923,
    documents: 3889,
    storageUsed: 78.3,
    bandwidth: 2.4 // GB/day
  });

  const [mediaFiles, setMediaFiles] = useState([
    { 
      id: 1, 
      name: "Ocean_Cleanup_Documentary.mp4", 
      type: "video", 
      size: 1.2, 
      sizeUnit: "GB",
      uploadDate: "2024-01-15",
      uploader: "EcoWarrior123",
      views: 15847,
      status: "published",
      category: "Environmental"
    },
    { 
      id: 2, 
      name: "Forest_Recovery_Timelapse.mp4", 
      type: "video", 
      size: 840, 
      sizeUnit: "MB",
      uploadDate: "2024-01-14",
      uploader: "TreeLover",
      views: 8923,
      status: "published",
      category: "Nature"
    },
    { 
      id: 3, 
      name: "Renewable_Energy_Infographic.png", 
      type: "image", 
      size: 15.4, 
      sizeUnit: "MB",
      uploadDate: "2024-01-13",
      uploader: "GreenTech",
      views: 3456,
      status: "published",
      category: "Education"
    },
    { 
      id: 4, 
      name: "Whale_Song_Recording.mp3", 
      type: "audio", 
      size: 67.8, 
      sizeUnit: "MB",
      uploadDate: "2024-01-12",
      uploader: "MarineLife",
      views: 1234,
      status: "published",
      category: "Wildlife"
    },
    { 
      id: 5, 
      name: "Climate_Action_Report.pdf", 
      type: "document", 
      size: 8.9, 
      sizeUnit: "MB",
      uploadDate: "2024-01-11",
      uploader: "ClimateSci",
      views: 567,
      status: "pending",
      category: "Research"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [uploadQueue, setUploadQueue] = useState([
    { id: 1, name: "Solar_Panel_Installation.mp4", progress: 78, size: "2.1 GB", eta: "5m 32s" },
    { id: 2, name: "Wildlife_Photography_Collection.zip", progress: 45, size: "1.8 GB", eta: "12m 18s" },
    { id: 3, name: "Biodiversity_Report_2024.pdf", progress: 92, size: "45 MB", eta: "30s" }
  ]);

  const filteredMedia = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesStatus = filterStatus === 'all' || file.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      video: 'bg-red-500',
      image: 'bg-blue-500',
      audio: 'bg-green-500',
      document: 'bg-purple-500'
    };
    return <Badge variant="default" className={colors[type as keyof typeof colors] || 'bg-gray-500'}>
      {getTypeIcon(type)}
      <span className="ml-1 capitalize">{type}</span>
    </Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-500">Published</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-500">Pending</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-blue-500">Processing</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMediaStats(prev => ({
        ...prev,
        totalFiles: prev.totalFiles + Math.floor(Math.random() * 5),
        bandwidth: Math.max(1, Math.min(5, prev.bandwidth + (Math.random() - 0.5) * 0.2))
      }));

      setUploadQueue(prev => prev.map(upload => ({
        ...upload,
        progress: Math.min(100, upload.progress + Math.floor(Math.random() * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-purple-400">📚 Media Library Admin</h2>
          <p className="text-muted-foreground">Manage GAiA Community Media Assets</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Cloud className="h-4 w-4 mr-2" />
            {mediaStats.totalSize.toFixed(1)} TB Used
          </Badge>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Media Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{mediaStats.totalFiles.toLocaleString()}</p>
              </div>
              <Folder className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">{mediaStats.videos.toLocaleString()}</p>
              </div>
              <Video className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="text-2xl font-bold">{mediaStats.images.toLocaleString()}</p>
              </div>
              <Image className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{mediaStats.storageUsed.toFixed(1)}%</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-500" />
            </div>
            <Progress value={mediaStats.storageUsed} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="library">Media Library</TabsTrigger>
          <TabsTrigger value="uploads">Upload Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="storage">Storage Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search media files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Videos</option>
                    <option value="image">Images</option>
                    <option value="audio">Audio</option>
                    <option value="document">Documents</option>
                  </select>
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Files Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">File</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Size</th>
                      <th className="text-left p-4">Uploader</th>
                      <th className="text-left p-4">Views</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedia.map((file) => (
                      <tr key={file.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Uploaded {file.uploadDate} • {file.category}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">{getTypeBadge(file.type)}</td>
                        <td className="p-4">
                          <span className="font-mono text-sm">
                            {file.size} {file.sizeUnit}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{file.uploader}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file.views.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(file.status)}</td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Upload Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadQueue.map((upload) => (
                  <div key={upload.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{upload.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {upload.size} • ETA: {upload.eta}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={upload.progress} className="flex-1" />
                      <span className="text-sm font-medium">{upload.progress}%</span>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                {uploadQueue.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No active uploads</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Support for videos, images, audio, and documents up to 5GB each
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
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
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Videos</span>
                      <span className="text-sm font-medium">45% of uploads</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Images</span>
                      <span className="text-sm font-medium">38% of uploads</span>
                    </div>
                    <Progress value={38} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Audio</span>
                      <span className="text-sm font-medium">12% of uploads</span>
                    </div>
                    <Progress value={12} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Documents</span>
                      <span className="text-sm font-medium">5% of uploads</span>
                    </div>
                    <Progress value={5} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Environmental</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">34.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nature</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">28.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Education</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">19.5%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wildlife</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">17.6%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bandwidth Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Today</span>
                  <span className="font-semibold">{mediaStats.bandwidth.toFixed(1)} GB</span>
                </div>
                <Progress value={(mediaStats.bandwidth / 5) * 100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Daily Limit: 5 GB</span>
                  <span>{((5 - mediaStats.bandwidth) * 100 / 5).toFixed(0)}% remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{mediaStats.totalSize.toFixed(1)} TB</div>
                    <div className="text-sm text-muted-foreground">of 20 TB used</div>
                    <Progress value={mediaStats.storageUsed} className="mt-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Videos</span>
                      <span className="text-sm font-medium">12.4 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Images</span>
                      <span className="text-sm font-medium">2.8 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Audio</span>
                      <span className="text-sm font-medium">0.4 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Documents</span>
                      <span className="text-sm font-medium">0.1 TB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Cleanup Old Files
                </Button>
                <Button className="w-full" variant="outline">
                  <Cloud className="h-4 w-4 mr-2" />
                  Archive to Cold Storage
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Storage Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Folder className="h-4 w-4 mr-2" />
                  Organize by Category
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-generate thumbnails</h3>
                    <p className="text-sm text-muted-foreground">Automatically create thumbnails for videos and images</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Content moderation</h3>
                    <p className="text-sm text-muted-foreground">AI-powered content scanning for inappropriate material</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Automatic transcoding</h3>
                    <p className="text-sm text-muted-foreground">Convert videos to optimized formats</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Max file size (GB)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="5" />
                </div>
                <div>
                  <label className="text-sm font-medium">Storage alert threshold (%)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="85" />
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}