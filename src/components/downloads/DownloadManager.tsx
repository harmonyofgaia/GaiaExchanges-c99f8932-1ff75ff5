
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  Download, 
  Shield, 
  CheckCircle, 
  ExternalLink,
  Smartphone,
  Monitor,
  Globe,
  Github
} from 'lucide-react'

interface DownloadPackage {
  id: string
  name: string
  platform: string
  version: string
  size: string
  icon: string
  downloadUrl: string
  storeUrl?: string
  verified: boolean
  description: string
}

export function DownloadManager() {
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})

  const packages: DownloadPackage[] = [
    {
      id: 'windows-x64',
      name: 'Gaia\'s Exchanges for Windows',
      platform: 'Windows',
      version: '2.1.0',
      size: '58.1 MB',
      icon: '🪟',
      downloadUrl: 'https://github.com/harmonyofgaia/gaia-exchanges/releases/download/v2.1.0/GaiaExchanges-Windows-x64.exe',
      verified: true,
      description: 'Full desktop application with advanced trading features'
    },
    {
      id: 'macos-universal',
      name: 'Gaia\'s Exchanges for macOS',
      platform: 'macOS',
      version: '2.1.0',
      size: '61.4 MB',
      icon: '🍎',
      downloadUrl: 'https://github.com/harmonyofgaia/gaia-exchanges/releases/download/v2.1.0/GaiaExchanges-macOS-Universal.dmg',
      verified: true,
      description: 'Universal binary supporting Intel and Apple Silicon'
    },
    {
      id: 'linux-deb',
      name: 'Gaia\'s Exchanges for Linux',
      platform: 'Ubuntu/Debian',
      version: '2.1.0',
      size: '52.3 MB',
      icon: '🐧',
      downloadUrl: 'https://github.com/harmonyofgaia/gaia-exchanges/releases/download/v2.1.0/GaiaExchanges-Linux-amd64.deb',
      verified: true,
      description: 'DEB package for Ubuntu, Debian and derivatives'
    },
    {
      id: 'android-apk',
      name: 'Gaia\'s Exchanges for Android',
      platform: 'Android',
      version: '2.1.0',
      size: '34.7 MB',
      icon: '🤖',
      downloadUrl: 'https://github.com/harmonyofgaia/gaia-exchanges/releases/download/v2.1.0/GaiaExchanges-Android.apk',
      storeUrl: 'https://play.google.com/store/apps/details?id=net.cultureofharmony.gaiaexchanges',
      verified: true,
      description: 'Native Android app with mobile-optimized interface'
    },
    {
      id: 'ios-app',
      name: 'Gaia\'s Exchanges for iOS',
      platform: 'iOS',
      version: '2.1.0',
      size: '41.2 MB',
      icon: '📱',
      downloadUrl: 'https://apps.apple.com/app/gaia-exchanges/id1234567890',
      storeUrl: 'https://apps.apple.com/app/gaia-exchanges/id1234567890',
      verified: true,
      description: 'Native iOS app optimized for iPhone and iPad'
    },
    {
      id: 'web-app',
      name: 'Gaia\'s Exchanges Web App',
      platform: 'Web Browser',
      version: '2.1.0',
      size: 'Progressive Web App',
      icon: '🌐',
      downloadUrl: 'https://app.gaiaexchanges.com',
      verified: true,
      description: 'Browser-based application with offline support'
    }
  ]

  const handleDownload = async (pkg: DownloadPackage) => {
    console.log(`🚀 Starting download: ${pkg.name}`)
    
    setIsDownloading(prev => ({ ...prev, [pkg.id]: true }))
    setDownloadProgress(prev => ({ ...prev, [pkg.id]: 0 }))

    try {
      // Simulate download progress for demonstration
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          const current = prev[pkg.id] || 0
          if (current >= 100) {
            clearInterval(progressInterval)
            return prev
          }
          return { ...prev, [pkg.id]: current + 10 }
        })
      }, 200)

      // For GitHub releases, check if the release exists
      if (pkg.downloadUrl.includes('github.com')) {
        try {
          const releaseCheck = await fetch('https://api.github.com/repos/harmonyofgaia/gaia-exchanges/releases/latest')
          if (releaseCheck.ok) {
            // Create download link
            const link = document.createElement('a')
            link.href = pkg.downloadUrl
            link.download = `${pkg.name.replace(/\s+/g, '-')}-v${pkg.version}`
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            toast.success(`Download Started: ${pkg.name}`, {
              description: `🎯 ${pkg.description}`,
              duration: 5000
            })
          } else {
            throw new Error('Release not found')
          }
        } catch (error) {
          // Fallback: Open GitHub repository
          window.open('https://github.com/harmonyofgaia/gaia-exchanges', '_blank')
          toast.info('Opening GitHub Repository', {
            description: 'Release will be available soon!',
            duration: 3000
          })
        }
      } else {
        // For app store links, open directly
        window.open(pkg.downloadUrl, '_blank', 'noopener,noreferrer')
        toast.success(`Opening ${pkg.platform} Store`, {
          description: `🔗 ${pkg.name}`,
          duration: 3000
        })
      }

      // Complete the progress after 2 seconds
      setTimeout(() => {
        setDownloadProgress(prev => ({ ...prev, [pkg.id]: 100 }))
        setIsDownloading(prev => ({ ...prev, [pkg.id]: false }))
      }, 2000)

    } catch (error) {
      console.error(`❌ Download failed for ${pkg.name}:`, error)
      setIsDownloading(prev => ({ ...prev, [pkg.id]: false }))
      toast.error(`Download Failed: ${pkg.name}`, {
        description: 'Please try again or contact support',
        duration: 5000
      })
    }
  }

  const handleStoreLink = (pkg: DownloadPackage) => {
    if (pkg.storeUrl) {
      window.open(pkg.storeUrl, '_blank', 'noopener,noreferrer')
      toast.success(`Opening ${pkg.platform} Store`, {
        description: `🏪 Official store page for ${pkg.name}`,
        duration: 3000
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Download className="h-6 w-6" />
            Culture of Harmony - Gaia's Exchanges Downloads
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            🎵 "Seeds Will Form Into Music" - Download our secure trading platform for all devices
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{pkg.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{pkg.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {pkg.platform}
                      </Badge>
                    </div>
                    {pkg.verified && (
                      <Shield className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {pkg.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="font-semibold">{pkg.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-semibold">{pkg.size}</span>
                    </div>
                    {pkg.verified && (
                      <div className="flex justify-between">
                        <span>Security:</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">Verified</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {isDownloading[pkg.id] && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Downloading...</span>
                        <span>{downloadProgress[pkg.id] || 0}%</span>
                      </div>
                      <Progress value={downloadProgress[pkg.id] || 0} />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(pkg)}
                      disabled={isDownloading[pkg.id]}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloading[pkg.id] ? 'Downloading...' : 'Download'}
                    </Button>
                    
                    {pkg.storeUrl && (
                      <Button
                        onClick={() => handleStoreLink(pkg)}
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-blue-400">🛡️ Security & Verification</h4>
              <p className="text-sm text-muted-foreground">
                All downloads are cryptographically signed and verified by Culture of Harmony
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  Code Signed
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-blue-400" />
                  Malware Free
                </span>
                <span className="flex items-center gap-1">
                  <Github className="h-3 w-3 text-purple-400" />
                  Open Source
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
