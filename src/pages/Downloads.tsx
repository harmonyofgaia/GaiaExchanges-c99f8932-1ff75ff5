import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Windows, Apple, Android, Linux, Smartphone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const Downloads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Downloads</h1>
          <p className="text-muted-foreground">Download Gaia's Exchanges for all platforms</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Windows Download */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Windows className="h-5 w-5" />
              Windows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">💻</div>
              <div className="space-y-1">
                <div className="font-semibold">Windows x32/x64</div>
                <div className="text-sm text-muted-foreground">
                  Compatible with Windows 7 and later
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-blue-400">2.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>128 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-blue-500/20 text-blue-400">Stable</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download for Windows
            </Button>
            
            <div className="text-xs text-center text-blue-400">
              Optimized for performance and security
            </div>
          </CardContent>
        </Card>

        {/* macOS Download */}
        <Card className="border-gray-500/20 bg-gradient-to-br from-gray-900/20 to-gray-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              <Apple className="h-5 w-5" />
              macOS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">🍎</div>
              <div className="space-y-1">
                <div className="font-semibold">macOS 10.15+</div>
                <div className="text-sm text-muted-foreground">
                  Optimized for macOS Big Sur and later
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-gray-400">2.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>135 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-gray-500/20 text-gray-400">Stable</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-gray-600 hover:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Download for macOS
            </Button>
            
            <div className="text-xs text-center text-gray-400">
              Native app for best performance
            </div>
          </CardContent>
        </Card>

        {/* Android Download */}
        <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Android className="h-5 w-5" />
              Android
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">🤖</div>
              <div className="space-y-1">
                <div className="font-semibold">Android 6.0+</div>
                <div className="text-sm text-muted-foreground">
                  Available on Google Play Store
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-green-400">2.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>45 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-green-500/20 text-green-400">Stable</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Download for Android
            </Button>
            
            <div className="text-xs text-center text-green-400">
              Get it on Google Play
            </div>
          </CardContent>
        </Card>

        {/* Linux Download */}
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-orange-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Linux className="h-5 w-5" />
              Linux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">🐧</div>
              <div className="space-y-1">
                <div className="font-semibold">Ubuntu, Fedora, Debian</div>
                <div className="text-sm text-muted-foreground">
                  Available in .deb and .rpm formats
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-orange-400">2.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>110 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-orange-500/20 text-orange-400">Stable</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Download className="h-4 w-4 mr-2" />
              Download for Linux
            </Button>
            
            <div className="text-xs text-center text-orange-400">
              Open source and community supported
            </div>
          </CardContent>
        </Card>
        
        {/* BlackBerry Legacy Support */}
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-purple-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Smartphone className="h-5 w-5" />
              BlackBerry Legacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">📱</div>
              <div className="space-y-1">
                <div className="font-semibold">BlackBerry OS 7.0+</div>
                <div className="text-sm text-muted-foreground">
                  Compatible with legacy BlackBerry devices
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-purple-400">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>2.1 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-purple-500/20 text-purple-400">Legacy Support</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Download for BlackBerry
            </Button>
            
            <div className="text-xs text-center text-purple-400">
              No trader left behind - Supporting all platforms since 2007
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Downloads
