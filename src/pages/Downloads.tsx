
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Smartphone, Monitor, Shield } from 'lucide-react'

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            📥 DOWNLOADS CENTER
          </h1>
          <p className="text-muted-foreground">
            Download GAIA apps and tools - All dragon-protected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Smartphone className="h-5 w-5" />
                Mobile Apps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download for iOS
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download for Android
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Monitor className="h-5 w-5" />
                Desktop Apps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gray-600 hover:bg-gray-700">
                <Download className="h-4 w-4 mr-2" />
                Download for Windows
              </Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Download for macOS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Downloads
