import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Monitor, Apple, Smartphone, Terminal, Star, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const Downloads = () => {
  const handleDownload = (platform: string, url: string) => {
    console.log(`🔗 Initiating download for ${platform}`)
    
    try {
      // Firefox-compatible download approach
      if (navigator.userAgent.includes('Firefox')) {
        // Use window.open for Firefox compatibility
        const newWindow = window.open(url, '_blank')
        if (newWindow) {
          newWindow.focus()
        } else {
          // Fallback if popup blocked
          window.location.href = url
        }
      } else {
        // Standard approach for other browsers
        const link = document.createElement('a')
        link.href = url
        link.download = `gaias-exchange-${platform.toLowerCase()}.${platform === 'Android' ? 'apk' : platform === 'macOS' ? 'dmg' : platform === 'Linux' ? 'deb' : platform === 'BlackBerry' ? 'cod' : 'exe'}`
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      
      toast.success(`Download started for ${platform}`, {
        description: `Gaia's Exchange ${platform} version is downloading...`
      })
      
      console.log(`✅ Download initiated successfully for ${platform}`)
    } catch (error) {
      console.error(`❌ Download failed for ${platform}:`, error)
      toast.error(`Download failed for ${platform}`, {
        description: 'Please try again or contact support.'
      })
    }
  }

  const handleViewOnGitHub = () => {
    const githubUrl = 'https://github.com/harmonyofgaia/releases'
    window.open(githubUrl, '_blank', 'noopener,noreferrer')
  }

  // Updated download links with proper GitHub releases
  const downloadLinks = {
    windows: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-windows.exe',
    macos: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-macos.dmg',
    android: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-android.apk',
    linux: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-linux.deb',
    blackberry: 'https://github.com/harmonyofgaia/gaia-exchange/releases/download/v1.0.0/gaias-exchange-blackberry.cod'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Downloads</h1>
          <p className="text-muted-foreground">Download Gaia's Exchange for all platforms</p>
        </div>
        <Button 
          onClick={handleViewOnGitHub}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View on GitHub
        </Button>
      </div>

      {/* App Link Banner */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold text-green-400">🌍 Access Gaia's Exchange Web App</div>
            <p className="text-muted-foreground">
              Use our web application directly in your browser - no download required!
            </p>
            <Button 
              onClick={() => {
                const appUrl = window.location.origin
                navigator.clipboard.writeText(appUrl)
                toast.success('App link copied to clipboard!', {
                  description: `${appUrl}`
                })
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Copy App Link
            </Button>
            <div className="text-sm text-green-400 font-mono">
              {window.location.origin}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Gaia's Exchange App */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Star className="h-6 w-6" />
            Gaia's Exchange - Official App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-5xl">🌍</div>
            <div className="space-y-1">
              <div className="font-bold text-lg">Harmony of Gaia Exchange</div>
              <div className="text-sm text-muted-foreground">
                The official trading platform for our community
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button 
              onClick={() => handleDownload('Windows', downloadLinks.windows)}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Monitor className="h-4 w-4 mr-1" />
              Windows
            </Button>
            <Button 
              onClick={() => handleDownload('macOS', downloadLinks.macos)}
              className="bg-gray-600 hover:bg-gray-700"
              size="sm"
            >
              <Apple className="h-4 w-4 mr-1" />
              macOS
            </Button>
            <Button 
              onClick={() => handleDownload('Android', downloadLinks.android)}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Smartphone className="h-4 w-4 mr-1" />
              Android
            </Button>
            <Button 
              onClick={() => handleDownload('Linux', downloadLinks.linux)}
              className="bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              <Terminal className="h-4 w-4 mr-1" />
              Linux
            </Button>
          </div>
          
          <div className="text-center text-yellow-400 text-sm font-medium">
            ⭐ Our flagship application - Available for all major platforms
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Windows Download */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Monitor className="h-5 w-5" />
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
            
            <Button 
              onClick={() => handleDownload('Windows', downloadLinks.windows)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
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
            
            <Button 
              onClick={() => handleDownload('macOS', downloadLinks.macos)}
              className="w-full bg-gray-600 hover:bg-gray-700"
            >
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
              <Smartphone className="h-5 w-5" />
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
            
            <Button 
              onClick={() => handleDownload('Android', downloadLinks.android)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
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
              <Terminal className="h-5 w-5" />
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
            
            <Button 
              onClick={() => handleDownload('Linux', downloadLinks.linux)}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
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
            
            <Button 
              onClick={() => handleDownload('BlackBerry', downloadLinks.blackberry)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download for BlackBerry
            </Button>
            
            <div className="text-xs text-center text-purple-400">
              No trader left behind - Supporting all platforms since 2007
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Instructions */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-green-900/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">📋 Installation Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-400 mb-2">🪟 Windows</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Run the .exe file as administrator</li>
                <li>• Follow the installation wizard</li>
                <li>• Allow firewall permissions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">🍎 macOS</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Open the .dmg file</li>
                <li>• Drag to Applications folder</li>
                <li>• Right-click and select "Open"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">🤖 Android</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Enable "Unknown sources" in settings</li>
                <li>• Install the .apk file</li>
                <li>• Grant necessary permissions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">🐧 Linux</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• For .deb: sudo dpkg -i filename.deb</li>
                <li>• For .rpm: sudo rpm -i filename.rpm</li>
                <li>• Run from applications menu</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Firefox Compatibility Notice */}
      <Card className="border-orange-500/20 bg-gradient-to-r from-orange-900/10 to-red-900/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3 text-orange-400">🦊 Firefox Users</h3>
          <p className="text-sm text-muted-foreground mb-2">
            If downloads don't start automatically in Firefox, please:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Allow pop-ups for this site in Firefox settings</li>
            <li>• Try right-clicking the download button and selecting "Save Link As"</li>
            <li>• Visit our GitHub releases page directly using the button above</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default Downloads
