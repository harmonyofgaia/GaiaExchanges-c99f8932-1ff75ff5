
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Smartphone, Monitor, Tablet, Shield, Star, ExternalLink } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const Downloads = () => {
  const openGaiaToken = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
    toast.success('Opening Official GAiA Token Page', {
      description: 'Harmony of Gaia - Official Token',
      duration: 3000
    })
  }

  const handleDownload = (platform: string) => {
    toast.info(`${platform} Download`, {
      description: 'Redirecting to download page...',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                📱 GAiA Downloads - Harmony of Gaia
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Get GAiA on all your devices - Official Harmony of Gaia Token
              </p>
              <div className="text-center mt-4">
                <Button onClick={openGaiaToken} className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Official GAiA Token: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}...
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Smartphone className="h-6 w-6" />
                  Mobile App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Full-featured mobile experience for iOS and Android with GAiA token integration.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleDownload('iOS')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for iOS
                  </Button>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleDownload('Android')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for Android
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Monitor className="h-6 w-6" />
                  Desktop App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Enhanced desktop experience with advanced GAiA features.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDownload('Windows')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for Windows
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDownload('macOS')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for macOS
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDownload('Linux')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for Linux
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Tablet className="h-6 w-6" />
                  Tablet App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Optimized tablet experience with touch-friendly GAiA interface.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleDownload('iPad')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for iPad
                  </Button>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleDownload('Android Tablet')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for Android Tablet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* BlackBerry Support Card */}
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Smartphone className="h-6 w-6" />
                  BlackBerry
                </CardTitle>
                <Badge className="bg-orange-600 text-white">Legacy Support</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Special GAiA app version optimized for BlackBerry OS 10.3+ devices.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleDownload('BlackBerry OS 10')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for BB OS 10
                  </Button>
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleDownload('BlackBerry Classic')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    BlackBerry Classic
                  </Button>
                </div>
                <div className="mt-3 p-2 bg-orange-500/10 rounded text-xs text-orange-300">
                  <p>✨ Enhanced for BlackBerry keyboards</p>
                  <p>🔒 Military-grade security</p>
                  <p>🚀 Optimized performance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Official GAiA Token Information */}
          <Card className="mt-8 border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Official Harmony of Gaia Token Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Token Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {GAIA_TOKEN.NAME}</p>
                    <p><strong>Symbol:</strong> {GAIA_TOKEN.SYMBOL}</p>
                    <p><strong>Network:</strong> {GAIA_TOKEN.NETWORK}</p>
                    <p><strong>Contract:</strong> <code className="text-blue-400">{GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...</code></p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">App Features</h4>
                  <div className="space-y-1 text-sm">
                    <p>• Real-time GAiA token tracking</p>
                    <p>• Secure wallet integration</p>
                    <p>• Cross-platform synchronization</p>
                    <p>• Environmental impact dashboard</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">✨ Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Official GAiA token integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Cross-platform synchronization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Offline mode support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>BlackBerry keyboard optimization</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Enhanced security features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Push notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Biometric authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Regular automatic updates</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-6 w-6" />
                Security Notice - Official GAiA Token Only
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-300 mb-3">
                ⚠️ Always verify you're downloading the official Harmony of Gaia applications. 
                Our official GAiA token contract is: <code className="text-blue-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </p>
              <p className="text-red-300">
                🚫 This is NOT GAIA Everworld or any other GAIA token. We are the official 
                Harmony of Gaia community token. Never share your private keys or wallet information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Downloads
