
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download,
  Monitor,
  Smartphone,
  Apple,
  MessageSquare
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Downloads = () => {
  const { toast } = useToast()

  const handleDownloadNotification = (platform: string) => {
    toast({
      title: `${platform} Download`,
      description: "Download will be available once the app is published to official stores. Currently in development phase.",
    })
  }

  const downloadOptions = [
    {
      platform: 'Windows x64',
      icon: Monitor,
      description: 'For 64-bit Windows systems',
      status: 'Coming Soon',
      color: 'blue'
    },
    {
      platform: 'Windows x32',
      icon: Monitor,
      description: 'For 32-bit Windows systems',
      status: 'Coming Soon',
      color: 'blue'
    },
    {
      platform: 'Android',
      icon: Smartphone,
      description: 'Available on Google Play Store',
      status: 'Development',
      color: 'green'
    },
    {
      platform: 'iOS/Apple',
      icon: Apple,
      description: 'Available on App Store',
      status: 'Development',
      color: 'gray'
    },
    {
      platform: 'Linux',
      icon: Monitor,
      description: 'For Linux distributions',
      status: 'Planned',
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Download Gaia's Exchanges</h1>
          <p className="text-muted-foreground">Get the world's most secure crypto exchange on all your devices</p>
        </div>
        <img 
          src="/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png" 
          alt="Gaia of Harmony Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Main Logo Display */}
      <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png" 
              alt="Gaia of Harmony Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <CardTitle className="text-2xl text-green-400">Gaia of Harmony</CardTitle>
          <p className="text-muted-foreground">The most secure and environmentally conscious crypto exchange</p>
        </CardHeader>
      </Card>

      {/* Download Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {downloadOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <option.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{option.platform}</CardTitle>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-${option.color}-400 border-${option.color}-400`}
                >
                  {option.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleDownloadNotification(option.platform)}
                disabled={option.status === 'Coming Soon' || option.status === 'Planned'}
              >
                <Download className="h-4 w-4 mr-2" />
                Download for {option.platform}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Development Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Development Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-medium text-yellow-400 mb-2">Current Phase: Web Platform Active</h4>
            <p className="text-sm text-yellow-300 mb-3">
              Gaia's Exchanges is currently live as a web platform. Native apps for desktop and mobile are in active development.
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✓ Web platform fully operational</li>
              <li>🔄 Windows desktop app in development</li>
              <li>🔄 Android app in development</li>
              <li>🔄 iOS app in development</li>
              <li>📅 Linux support planned</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Web Access Available Now</h4>
            <p className="text-sm text-green-300">
              Access the full Gaia's Exchanges platform directly through your web browser with all features available.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Downloads
