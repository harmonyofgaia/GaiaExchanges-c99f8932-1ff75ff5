
import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Upload, Play, Heart, Eye, Coins } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

export default function VideoUpload() {
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch approved videos for the video player
  const { data: videos, refetch: refetchVideos } = useQuery({
    queryKey: ['approved-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    }
  })

  // Fetch user's own submissions
  const { data: myVideos, refetch: refetchMyVideos } = useQuery({
    queryKey: ['my-videos', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('video_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!user
  })

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (500MB limit)
      if (file.size > 524288000) {
        toast.error('File size must be under 500MB')
        return
      }
      
      // Check file type
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid video file (MP4, AVI, MOV, WMV, FLV, WEBM, MKV)')
        return
      }
      
      setSelectedVideo(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedVideo || !title.trim() || !user) {
      toast.error('Please select a video and enter a title')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Create unique filename
      const fileExt = selectedVideo.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-videos')
        .upload(fileName, selectedVideo, {
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100)
          }
        })

      if (uploadError) throw uploadError

      // Create video duration estimation (you could use a video element to get actual duration)
      const estimatedDuration = Math.floor(selectedVideo.size / 100000) // Rough estimation

      // Insert video submission record
      const { error: dbError } = await supabase
        .from('video_submissions')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          filename: fileName,
          original_name: selectedVideo.name,
          file_size: selectedVideo.size,
          duration_seconds: estimatedDuration,
          storage_path: uploadData.path,
          mime_type: selectedVideo.type,
          status: 'pending'
        })

      if (dbError) throw dbError

      toast.success('🎬 Video uploaded successfully! Pending admin approval for GAIA token rewards.')
      
      // Reset form
      setTitle('')
      setDescription('')
      setSelectedVideo(null)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      // Refresh data
      refetchMyVideos()

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const getVideoUrl = (video: any) => {
    return supabase.storage.from('user-videos').getPublicUrl(video.storage_path).data.publicUrl
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to upload videos and earn GAIA tokens.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
          🎬 Video Upload & Earn GAIA Tokens
        </h1>
        <p className="text-xl text-muted-foreground">
          Upload your videos, get approved by admins, and earn real GAIA tokens!
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Upload className="h-6 w-6" />
            Upload Your Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your video title..."
              className="bg-black/40 border-green-500/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your video..."
              className="bg-black/40 border-green-500/30"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Select Video File *</Label>
            <Input
              ref={fileInputRef}
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="bg-black/40 border-green-500/30"
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: MP4, AVI, MOV, WMV, FLV, WEBM, MKV (Max 500MB)
            </p>
          </div>

          {selectedVideo && (
            <div className="p-4 bg-green-900/30 rounded-lg">
              <p className="text-green-400">Selected: {selectedVideo.name}</p>
              <p className="text-sm text-muted-foreground">
                Size: {(selectedVideo.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!selectedVideo || !title.trim() || uploading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {uploading ? 'Uploading...' : 'Upload Video & Earn GAIA Tokens'}
          </Button>

          <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
            <p className="text-yellow-400 font-medium">💰 Token Rewards</p>
            <p className="text-sm text-muted-foreground">
              Base: 50 GAIA tokens + Duration bonus when approved by admin
            </p>
          </div>
        </CardContent>
      </Card>

      {/* My Videos Section */}
      {myVideos && myVideos.length > 0 && (
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">My Video Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {myVideos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={
                        video.status === 'approved' ? 'default' : 
                        video.status === 'rejected' ? 'destructive' : 
                        'secondary'
                      }>
                        {video.status}
                      </Badge>
                      {video.tokens_earned > 0 && (
                        <Badge className="bg-yellow-600">
                          {video.tokens_earned} GAIA
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {video.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Player Section */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Play className="h-6 w-6" />
            Community Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="space-y-3">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      src={getVideoUrl(video)}
                      poster={video.thumbnail_url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {video.likes}
                        </span>
                      </div>
                      <Badge className="bg-green-600">
                        <Coins className="h-3 w-3 mr-1" />
                        {video.tokens_earned} GAIA
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No approved videos yet. Be the first to upload!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
