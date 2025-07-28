
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Smartphone, Download, CheckCircle, Upload, Star, Globe } from 'lucide-react'

export default function AppStoreSubmission() {
  const submissionSteps = [
    { step: "App Development", status: "completed", progress: 100 },
    { step: "Testing & QA", status: "completed", progress: 100 },
    { step: "App Store Guidelines", status: "completed", progress: 100 },
    { step: "Metadata Preparation", status: "in-progress", progress: 75 },
    { step: "Store Submission", status: "pending", progress: 0 },
    { step: "Review Process", status: "pending", progress: 0 },
    { step: "Publication", status: "pending", progress: 0 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-8 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              📱 GAiA App Store Submission Center
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Track our mobile app submission progress across all platforms
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-blue-600">iOS Ready</Badge>
              <Badge className="bg-green-600">Android Ready</Badge>
              <Badge className="bg-purple-600">Web App Live</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Smartphone className="h-6 w-6" />
                iOS App Store
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🍎</div>
                <Badge className="bg-blue-600 mb-2">Preparing for Submission</Badge>
                <Progress value={75} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">75% Complete</p>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Prepare iOS Submission
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Smartphone className="h-6 w-6" />
                Google Play Store
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <Badge className="bg-green-600 mb-2">Preparing for Submission</Badge>
                <Progress value={75} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">75% Complete</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Prepare Android Submission
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-500/30 bg-purple-900/20 mb-8">
          <CardHeader>
            <CardTitle className="text-purple-400">📋 Submission Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissionSteps.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    {item.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : item.status === "in-progress" ? (
                      <div className="h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-500 rounded-full" />
                    )}
                    <span className="font-medium">{item.step}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.progress} className="w-24 h-2" />
                    <span className="text-sm text-muted-foreground w-12">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-yellow-500/30 bg-yellow-900/10">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">4.9★</div>
              <div className="text-sm text-muted-foreground">Expected Rating</div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/10">
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">50K+</div>
              <div className="text-sm text-muted-foreground">Expected Downloads</div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-indigo-900/10">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-indigo-400">Global</div>
              <div className="text-sm text-muted-foreground">Worldwide Release</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
