
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Smartphone, Monitor, Tablet } from 'lucide-react'

const Downloads = () => {
  const downloadLinks = [
    {
      platform: 'Android',
      icon: Smartphone,
      description: 'Download for Android devices',
      version: 'v1.0.0',
      size: '25 MB',
      color: 'green'
    },
    {
      platform: 'iOS',
      icon: Smartphone,
      description: 'Download for iPhone/iPad',
      version: 'v1.0.0',
      size: '30 MB',
      color: 'blue'
    },
    {
      platform: 'Desktop',
      icon: Monitor,
      description: 'Download for Windows/Mac/Linux',
      version: 'v1.0.0',
      size: '45 MB',
      color: 'purple'
    },
    {
      platform: 'Web App',
      icon: Tablet,
      description: 'Use directly in browser',
      version: 'Latest',
      size: 'No Download',
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
            📱 Download Harmony of Gaia
          </h1>
          <p className="text-xl text-muted-foreground">
            Access your digital ecosystem on any device
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloadLinks.map((item) => {
            const IconComponent = item.icon
            return (
              <Card key={item.platform} className={`border-${item.color}-500/30 bg-gradient-to-br from-${item.color}-900/30 to-${item.color}-900/20`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${item.color}-600/20 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 text-${item.color}-400`} />
                    </div>
                    <div>
                      <CardTitle className={`text-${item.color}-400`}>{item.platform}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.version}</Badge>
                      <Badge variant="outline">{item.size}</Badge>
                    </div>
                  </div>
                  <Button className={`w-full bg-gradient-to-r from-${item.color}-600 to-${item.color}-700 hover:from-${item.color}-700 hover:to-${item.color}-800`}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                🚀 Coming Soon to App Stores
              </h2>
              <p className="text-muted-foreground mb-6">
                Official releases for Google Play Store and Apple App Store are in development.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-600 text-white">Google Play - Coming Soon</Badge>
                <Badge className="bg-blue-600 text-white">App Store - Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Downloads
