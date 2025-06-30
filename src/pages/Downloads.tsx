
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Smartphone, Monitor, Gamepad2, Shield } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                📱 GAiA Downloads
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Get GAiA on all your devices
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mobile App */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Smartphone className="h-6 w-6" />
                  Mobile App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-green-600">Available Now</Badge>
                  <p className="text-muted-foreground">
                    Full featured mobile experience with gaming, wallet, and community features.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download for iOS
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download for Android
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Desktop App */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Monitor className="h-6 w-6" />
                  Desktop App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-blue-600">Available Now</Badge>
                  <p className="text-muted-foreground">
                    Enhanced desktop experience with advanced trading and analytics features.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download for Windows
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download for macOS
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download for Linux
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gaming Client */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Gamepad2 className="h-6 w-6" />
                  Gaming Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-purple-600">Beta Available</Badge>
                  <p className="text-muted-foreground">
                    Dedicated gaming client with high-performance graphics and tournament features.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Beta
                  </Button>
                  <Button variant="outline" className="w-full border-purple-500/30 text-purple-400">
                    Join Beta Program
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Browser Extension */}
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Shield className="h-6 w-6" />
                  Browser Extension
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-orange-600">Available Now</Badge>
                  <p className="text-muted-foreground">
                    Secure wallet extension for seamless web3 integration.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Chrome Extension
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Download className="h-4 w-4 mr-2" />
                    Firefox Add-on
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Developer Tools */}
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Monitor className="h-6 w-6" />
                  Developer Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-cyan-600">Available Now</Badge>
                  <p className="text-muted-foreground">
                    SDK and tools for building on the GAiA platform.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                  <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400">
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Tools */}
            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-400">
                  <Gamepad2 className="h-6 w-6" />
                  Community Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-pink-600">Coming Soon</Badge>
                  <p className="text-muted-foreground">
                    Tools for community management and event organization.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-pink-500/30 text-pink-400">
                    Notify Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Requirements */}
          <Card className="mt-8 border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">System Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Minimum Requirements</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• OS: Windows 10 / macOS 10.15 / Ubuntu 18.04</li>
                    <li>• RAM: 4GB</li>
                    <li>• Storage: 2GB available space</li>
                    <li>• Network: Broadband Internet connection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Recommended Requirements</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• OS: Windows 11 / macOS 12+ / Ubuntu 20.04+</li>
                    <li>• RAM: 8GB+</li>
                    <li>• Storage: 10GB+ available space</li>
                    <li>• Graphics: Dedicated GPU recommended</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Downloads
