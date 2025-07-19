
import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AdminReverseButton } from '@/components/admin/AdminReverseButton'
import { 
  Upload, 
  Video, 
  Play, 
  Pause, 
  Eye, 
  Heart, 
  Share, 
  DollarSign,
  Users,
  Award,
  Coins
} from 'lucide-react'
import { toast } from 'sonner'

interface VideoFile {
  id: string
  title: string
  description: string
  filename: string
  uploadedBy: string
  uploadDate: Date
  views: number
  likes: number
  earnings: number
  duration: string
  thumbnail: string
  category: string
}

export default function VideoUpload() {
  const [videos, setVideos] = useState<VideoFile[]>([
    {
      id: '1',
      title: '🌍 Harmony of Gaia - Environmental Music Journey',
      description: 'A beautiful journey through nature sounds and environmental harmony',
      filename: 'gaia-harmony.mp4',
      uploadedBy: 'EcoMusicProducer',
      uploadDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      views: 1247,
      likes: 89,
      earnings: 23.45,
      duration: '3:42',
      thumbnail: '/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png',
      category: 'Environmental'
    },
    {
      id: '2',
      title: '🎵 GAIA Token Ecosystem Explained',
      description: 'Understanding how our environmental token system works',
      filename: 'gaia-explained.mp4',
      uploadedBy: 'CryptoEcoTeacher',
      uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      views: 2156,
      likes: 143,
      earnings: 45.67,
      duration: '8:15',
      thumbnail: '/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png',
      category: 'Education'
    }
  ])

  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'General'
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          
          // Add new video to list
          const newVideoFile: VideoFile = {
            id: Date.now().toString(),
            title: newVideo.title || file.name,
            description: newVideo.description || 'Uploaded video',
            filename: file.name,
            uploadedBy: 'You',
            uploadDate: new Date(),
            views: 0,
            likes: 0,
            earnings: 0,
            duration: '0:00',
            thumbnail: '/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png',
            category: newVideo.category
          }
          
          setVideos(prev => [newVideoFile, ...prev])
          setNewVideo({ title: '', description: '', category: 'General' })
          
          toast.success('🎉 Video uploaded successfully!', {
            description: 'Your video is now live and earning GAIA tokens'
          })
          
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)
  }

  const playVideo = (video: VideoFile) => {
    setSelectedVideo(video)
    // Increment view count
    setVideos(prev => prev.map(v => 
      v.id === video.id ? { ...v, views: v.views + 1 } : v
    ))
  }

  const likeVideo = (videoId: string) => {
    setVideos(prev => prev.map(v => 
      v.id === videoId ? { ...v, likes: v.likes + 1 } : v
    ))
    toast.success('❤️ Liked! +0.1 GAIA earned')
  }

  const totalStats = {
    totalViews: videos.reduce((sum, v) => sum + v.views, 0),
    totalLikes: videos.reduce((sum, v) => sum + v.likes, 0),
    totalEarnings: videos.reduce((sum, v) => sum + v.earnings, 0)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <AdminReverseButton />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          🎬 GAIA VIDEO PLATFORM
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Upload, Share & Earn GAIA Tokens with Your Videos
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-2 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-400">{videos.length}</p>
                <p className="text-xs text-muted-foreground">Total Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-blue-400">{totalStats.totalViews}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-900/20 to-red-900/20 border-pink-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-pink-400" />
              <div>
                <p className="text-2xl font-bold text-pink-400">{totalStats.totalLikes}</p>
                <p className="text-xs text-muted-foreground">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Coins className="h-4 w-4 mr-2 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{totalStats.totalEarnings.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">GAIA Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="mb-8 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            📤 Upload Your Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-orange-400">Video Title</label>
              <Input 
                placeholder="Enter video title..." 
                value={newVideo.title}
                onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                className="bg-black/20" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-orange-400">Category</label>
              <select 
                value={newVideo.category}
                onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 bg-black/20 border border-border rounded-md text-white"
              >
                <option value="General">General</option>
                <option value="Environmental">Environmental</option>
                <option value="Education">Education</option>
                <option value="Music">Music</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-orange-400">Description</label>
            <Textarea 
              placeholder="Describe your video..." 
              value={newVideo.description}
              onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
              className="bg-black/20" 
              rows={3}
            />
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Video className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Choose Video File'}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Video Player */}
      {selectedVideo && (
        <Card className="mb-8 bg-gradient-to-br from-gray-900/40 to-black/40 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-white">{selectedVideo.title}</CardTitle>
            <p className="text-muted-foreground">{selectedVideo.description}</p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Video Player</p>
                <p className="text-sm text-gray-500">Playing: {selectedVideo.filename}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => likeVideo(selectedVideo.id)}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {selectedVideo.likes}
                </Button>
                <span className="text-sm text-gray-400">
                  <Eye className="h-4 w-4 inline mr-1" />
                  {selectedVideo.views} views
                </span>
                <Badge className="bg-green-600 text-white">
                  +{selectedVideo.earnings} GAIA
                </Badge>
              </div>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 border-gray-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-t-lg relative overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={() => playVideo(video)}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/60 text-white">
                {video.duration}
              </Badge>
            </div>
            
            <CardContent className="pt-4">
              <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                {video.title}
              </h4>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{video.uploadedBy}</span>
                <Badge variant="outline" className="text-xs">
                  {video.category}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span>
                    <Eye className="h-3 w-3 inline mr-1" />
                    {video.views}
                  </span>
                  <span>
                    <Heart className="h-3 w-3 inline mr-1" />
                    {video.likes}
                  </span>
                </div>
                <span className="text-green-400 font-semibold">
                  {video.earnings} GAIA
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
