import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Shield, 
  Globe, 
  Smartphone, 
  Monitor, 
  ExternalLink,
  CheckCircle,
  Star,
  Users,
  Zap,
  Github
} from 'lucide-react'
import { GaiaLogo } from '@/components/GaiaLogo'
import { Web3Integration } from '@/components/Web3Integration'
import { GitHubRepositories } from '@/components/GitHubRepositories'
import { AppStoreLinks } from '@/components/AppStoreLinks'
import { toast } from 'sonner'

const Downloads = () => {
  const [downloadStats, setDownloadStats] = useState({
    windows: 245789,
    macos: 156234,
    linux: 89567,
    android: 487932,
    ios: 234567,
    web: 156789
  })

  const handleDownload = (platform: string, architecture?: string) => {
    // Updated to use the correct Gaia repository structure
    const baseUrl = 'https://github.com/harmonyofgaia/gaia-exchanges/releases/latest/download/'
    
    const downloadLinks: { [key: string]: string } = {
      'windows-32': `${baseUrl}gaia-exchanges-windows-x86.exe`,
      'windows-64': `${baseUrl}gaia-exchanges-windows-x64.exe`,
      'macos': `${baseUrl}gaia-exchanges-macos-universal.dmg`,
      'linux-deb': `${baseUrl}gaia-exchanges-linux-amd64.deb`,
      'linux-rpm': `${baseUrl}gaia-exchanges-linux-x86_64.rpm`,
      'linux-appimage': `${baseUrl}gaia-exchanges-linux-x86_64.AppImage`,
      'android-playstore': 'https://play.google.com/store/apps/details?id=com.harmonyofgaia.exchanges',
      'android-apk': `${baseUrl}gaia-exchanges-android.apk`,
      'ios-appstore': 'https://apps.apple.com/app/gaia-exchanges/id1234567890',
      'web': 'https://gaiaexchanges.com',
      'web-dapp': 'https://dapp.gaiaexchanges.com'
    }

    const key = architecture ? `${platform}-${architecture}` : platform
    const url = downloadLinks[key]
    
    if (url) {
      // Update download count
      setDownloadStats(prev => ({
        ...prev,
        [platform]: prev[platform as keyof typeof prev] + 1
      }))
      
      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      
      // For app stores, open directly
      if (key.includes('playstore') || key.includes('appstore')) {
        link.click()
      } else {
        // For direct downloads, set download attribute
        link.download = ''
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      
      // Show success toast
      toast.success(`Opening Gaia's Exchanges`, {
        description: `🚀 ${platform.charAt(0).toUpperCase() + platform.slice(1)} ${architecture || ''} - World's most secure crypto exchange`,
        duration: 4000
      })
      
      console.log(`📥 Download/Access initiated: ${platform} ${architecture || ''}`)
    } else {
      toast.error('Download unavailable', {
        description: 'This version is currently being prepared. Try again soon.',
        duration: 3000
      })
    }
  }

  const platforms = [
    {
      name: 'Windows',
      icon: '🪟',
      versions: [
        { name: '32-bit', arch: '32', size: '52.3 MB', requirements: 'Windows 10+' },
        { name: '64-bit', arch: '64', size: '58.1 MB', requirements: 'Windows 10+ (Recommended)' }
      ],
      color: 'bg-blue-600 hover:bg-blue-700',
      downloads: downloadStats.windows
    },
    {
      name: 'macOS',
      icon: '🍎',
      versions: [
        { name: 'Universal', arch: '', size: '61.4 MB', requirements: 'macOS 11.0+' }
      ],
      color: 'bg-gray-600 hover:bg-gray-700',
      downloads: downloadStats.macos
    },
    {
      name: 'Linux',
      icon: '🐧',
      versions: [
        { name: 'DEB Package', arch: 'deb', size: '49.2 MB', requirements: 'Ubuntu 20.04+' },
        { name: 'RPM Package', arch: 'rpm', size: '50.1 MB', requirements: 'RHEL 8+/Fedora 35+' },
        { name: 'AppImage', arch: 'appimage', size: '53.8 MB', requirements: 'Universal Linux' }
      ],
      color: 'bg-orange-600 hover:bg-orange-700',
      downloads: downloadStats.linux
    },
    {
      name: 'Android',
      icon: '🤖',
      versions: [
        { name: 'Play Store', arch: 'playstore', size: '34.7 MB', requirements: 'Android 8.0+' },
        { name: 'APK Direct', arch: 'apk', size: '34.7 MB', requirements: 'Android 8.0+' }
      ],
      color: 'bg-green-600 hover:bg-green-700',
      downloads: downloadStats.android
    },
    {
      name: 'iOS',
      icon: '📱',
      versions: [
        { name: 'App Store', arch: 'appstore', size: '41.2 MB', requirements: 'iOS 14.0+' }
      ],
      color: 'bg-purple-600 hover:bg-purple-700',
      downloads: downloadStats.ios
    },
    {
      name: 'Web',
      icon: '🌐',
      versions: [
        { name: 'Web App', arch: '', size: '∞', requirements: 'Modern Browser' },
        { name: 'DApp (Web3)', arch: 'dapp', size: '∞', requirements: 'MetaMask/Web3 Wallet' }
      ],
      color: 'bg-cyan-600 hover:bg-cyan-700',
      downloads: downloadStats.web
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <GaiaLogo size="xl" variant="white-fade" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gaia's Exchanges Downloads
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              The World's Most Secure Cryptocurrency Exchange Platform
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-400">Military-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400">Global Web3 Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400">2M+ Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400">5-Star Rated</span>
          </div>
        </div>
      </div>

      {/* Download Statistics */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {platforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="text-2xl">{platform.icon}</div>
                <div className="font-semibold text-sm">{platform.name}</div>
                <div className="text-xs text-muted-foreground">
                  {platform.downloads.toLocaleString()} downloads
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.name} className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="text-3xl">{platform.icon}</div>
                <div>
                  <div className="text-lg">{platform.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {platform.downloads.toLocaleString()} downloads
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {platform.versions.map((version) => (
                <div key={version.name} className="space-y-3 p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{version.name}</div>
                      <div className="text-sm text-muted-foreground">{version.requirements}</div>
                      <div className="text-xs text-muted-foreground mt-1">Size: {version.size}</div>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Latest
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(platform.name.toLowerCase(), version.arch)}
                    className={`w-full ${platform.color} text-white`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {version.arch?.includes('store') || version.arch?.includes('dapp') ? 'Open' : 'Download'} {version.name}
                  </Button>
                </div>
              ))}
              
              <div className="pt-2 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Verified & Code-Signed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-blue-400" />
                  <span>Web3 Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span>Real-time Sync</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NEW: App Store Links */}
      <AppStoreLinks />

      {/* NEW: Web3 Integration */}
      <Web3Integration />

      {/* NEW: GitHub Repositories */}
      <GitHubRepositories />

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Monitor className="h-5 w-5" />
              System Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Minimum Requirements:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 4GB RAM (8GB recommended)</li>
                <li>• 1GB free disk space</li>
                <li>• Stable internet connection</li>
                <li>• Modern graphics drivers</li>
                <li>• Web3 wallet (for DApp features)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Recommended:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 16GB RAM for optimal performance</li>
                <li>• SSD storage for faster loading</li>
                <li>• Hardware wallet support</li>
                <li>• Multiple blockchain networks</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <ExternalLink className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://docs.gaiaexchanges.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentation & API
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://support.gaiaexchanges.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  24/7 Support Center
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://whitepaper.gaiaexchanges.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Technical Whitepaper
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://security.gaiaexchanges.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Security Audit Reports
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-red-500/20 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-red-400">🚨 Security Notice</h3>
            <p className="text-sm text-muted-foreground">
              Always download Gaia's Exchanges from official sources only. Verify signatures and checksums.
            </p>
            <p className="text-xs text-red-300">
              Never download from unofficial websites. Always verify GitHub releases and app store authenticity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Downloads
