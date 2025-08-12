
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, Video, Play, Eye, Clock, Coins } from 'lucide-react'
import { useState } from 'react'

export default function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const recentVideos = [
    { id: 1, title: "Ocean Cleanup Initiative", views: 1247, duration: "5:32", tokens: 125, status: "approved" },
    { id: 2, title: "Forest Conservation Tips", views: 856, duration: "3:45", tokens: 89, status: "pending" },
    { id: 3, title: "Renewable Energy Tutorial", views: 2103, duration: "8:21", tokens: 210, status: "approved" }
  ]

  const handleUpload = () => {
    setIsUploading(true)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-green-900/10 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4">
            🎬 Video Upload & Earn
          </h1>
          <p className="text-xl text-muted-foreground">
            Share your eco-friendly content and earn GAIA tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Upload className="h-6 w-6" />
                Upload New Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-file">Video File</Label>
                <Input id="video-file" type="file" accept="video/*" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input id="title" placeholder="Enter video title..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your eco-friendly content..." rows={4} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="eco, environment, green, sustainable..." />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </Button>

              <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">Earning Potential</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Base reward: 50 GAIA tokens</div>
                  <div>• Duration bonus: +1 token per 10 seconds</div>
                  <div>• Quality bonus: up to +25 tokens</div>
                  <div>• Views bonus: +1 token per 100 views</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Videos */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Video className="h-6 w-6" />
                Your Recent Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <Card key={video.id} className="border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{video.title}</h4>
                        <Badge variant={video.status === 'approved' ? 'default' : 'secondary'}>
                          {video.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {video.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          {video.tokens} GAIA
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="border-green-500/30 bg-green-900/10">
            <CardContent className="p-4 text-center">
              <Video className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">247</div>
              <div className="text-sm text-muted-foreground">Videos Uploaded</div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/30 bg-blue-900/10">
            <CardContent className="p-4 text-center">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">15.4K</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-900/10">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">2,847</div>
              <div className="text-sm text-muted-foreground">Tokens Earned</div>
            </CardContent>
          </Card>
          <Card className="border-purple-500/30 bg-purple-900/10">
            <CardContent className="p-4 text-center">
              <Upload className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">98%</div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
