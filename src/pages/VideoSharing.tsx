
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Play, 
  Pause, 
  Video, 
  Coins, 
  Eye, 
  Heart,
  Share2,
  Download,
  Star
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

interface VideoData {
  id: string
  title: string
  description: string
  filename: string
  uploader: string
  upload_date: string
  views: number
  likes: number
  gaia_earned: number
  file_size: number
  duration?: number
  thumbnail_url?: string
  video_url: string
  category: string
}

const VideoSharing = () => {
  const { user } = useAuth()
  const [videos, setVideos] = useState<VideoData[]>([])
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'general'
  })
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  const categories = ['general', 'music', 'art', 'education', 'entertainment', 'technology', 'nature']

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      // Simulate video data since we're building the storage system
      const mockVideos: VideoData[] = [
        {
          id: '1',
          title: 'Harmony of Gaia - Introduction',
          description: 'Welcome to the Harmony of Gaia platform',
          filename: 'gaia_intro.mp4',
          uploader: 'Admin',
          upload_date: new Date().toISOString(),
          views: 1250,
          likes: 89,
          gaia_earned: 45.5,
          file_size: 25600000,
          duration: 180,
          video_url: '/placeholder-video.mp4',
          category: 'education'
        },
        {
          id: '2',
          title: 'Creating Digital Art with GAiA',
          description: 'Learn how to create stunning digital artwork',
          filename: 'digital_art_tutorial.mp4',
          uploader: 'ArtistUser',
          upload_date: new Date(Date.now() - 86400000).toISOString(),
          views: 890,
          likes: 67,
          gaia_earned: 32.1,
          file_size: 45200000,
          duration: 420,
          video_url: '/placeholder-video.mp4',
          category: 'art'
        }
      ]
      setVideos(mockVideos)
    } catch (error) {
      console.error('Error loading videos:', error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file)
        toast.success(`Video selected: ${file.name}`)
      } else {
        toast.error('Please select a valid video file')
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast.error('Please select a file and ensure you are logged in')
      return
    }

    if (!uploadData.title.trim()) {
      toast.error('Please enter a video title')
      return
    }

    setUploading(true)
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newVideo: VideoData = {
        id: Date.now().toString(),
        title: uploadData.title,
        description: uploadData.description,
        filename: selectedFile.name,
        uploader: user.email || 'User',
        upload_date: new Date().toISOString(),
        views: 0,
        likes: 0,
        gaia_earned: 0,
        file_size: selectedFile.size,
        video_url: URL.createObjectURL(selectedFile),
        category: uploadData.category
      }

      setVideos(prev => [newVideo, ...prev])
      setUploadData({ title: '', description: '', category: 'general' })
      setSelectedFile(null)
      
      toast.success('🎬 Video uploaded successfully! You will earn GAiA tokens based on views.')
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoPlay = (videoId: string) => {
    setCurrentVideo(videoId)
    setPlaying(true)
    
    // Simulate view increment and GAiA earning
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            views: video.views + 1,
            gaia_earned: video.gaia_earned + 0.1 
          }
        : video
    ))
    
    toast.success('🪙 +0.1 GAiA earned for watching!')
  }

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            likes: video.likes + 1,
            gaia_earned: video.gaia_earned + 0.5 
          }
        : video
    ))
    toast.success('❤️ Liked! +0.5 GAiA earned!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          🎬 GAiA VIDEO SHARING PLATFORM
        </h1>
        <p className="text-center text-muted-foreground text-lg">
          Upload, Share, and Earn GAiA tokens with your videos
        </p>
      </div>

      {/* Upload Section */}
      {user && (
        <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Upload className="h-6 w-6" />
              Upload Your Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Video Title *</label>
                <Input
                  value={uploadData.title}
                  onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter video title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={uploadData.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your video..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 bg-background border border-input rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {uploading ? (
                <>Uploading... 📤</>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video & Start Earning GAiA
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="relative aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-t-lg flex items-center justify-center">
              <Video className="h-16 w-16 text-purple-400" />
              <Button
                onClick={() => handleVideoPlay(video.id)}
                className="absolute inset-0 bg-black/50 hover:bg-black/30 rounded-t-lg"
                variant="ghost"
              >
                <Play className="h-12 w-12 text-white" />
              </Button>
              
              {video.duration && (
                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </Badge>
              )}
            </div>
            
            <CardContent className="pt-4">
              <h3 className="font-bold text-lg text-purple-400 mb-2 truncate">{video.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{video.likes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Coins className="h-4 w-4" />
                  <span>{video.gaia_earned.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleVideoPlay(video.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch
                </Button>
                <Button 
                  onClick={() => handleLike(video.id)}
                  size="sm" 
                  variant="outline"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>By {video.uploader}</span>
                <Badge variant="outline">{video.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {videos.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Videos</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {videos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
        
        <Card className="border-pink-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-pink-400">
              {videos.reduce((sum, video) => sum + video.likes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {videos.reduce((sum, video) => sum + video.gaia_earned, 0).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">GAiA Earned</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VideoSharing
