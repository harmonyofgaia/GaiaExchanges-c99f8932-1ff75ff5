
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Video, Upload, Coins, Star } from 'lucide-react'
import { toast } from 'sonner'

export default function VideoUpload() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast.error('Please select a file and enter a title')
      return
    }

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      toast.success('Video uploaded successfully! You earned 50 GAiA tokens!')
      setTitle('')
      setDescription('')
      setFile(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
            🎬 Video Upload & Earn
          </h1>
          <p className="text-xl text-muted-foreground">
            Share your creativity • Earn GAiA tokens • Build your audience
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Upload className="h-6 w-6" />
                Upload Your Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-purple-300">Video Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your video title..."
                  className="bg-black/40 border-purple-500/30"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-purple-300">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your video..."
                  className="bg-black/40 border-purple-500/30"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="video" className="text-purple-300">Video File</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-black/40 border-purple-500/30"
                />
              </div>
              
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isUploading ? 'Uploading...' : 'Upload Video & Earn Tokens'}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Coins className="h-5 w-5" />
                  Token Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">50+ GAiA</div>
                <p className="text-sm text-muted-foreground">Per approved video</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Video className="h-5 w-5" />
                  Quality Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">+25%</div>
                <p className="text-sm text-muted-foreground">For HD content</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Star className="h-5 w-5" />
                  Popular Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">+50%</div>
                <p className="text-sm text-muted-foreground">For viral content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
