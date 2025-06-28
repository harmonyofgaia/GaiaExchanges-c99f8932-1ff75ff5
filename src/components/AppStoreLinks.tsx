
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Smartphone, 
  ExternalLink, 
  Star, 
  Download, 
  Users,
  Shield,
  Globe,
  Github
} from 'lucide-react'

export function AppStoreLinks() {
  const githubOrg = 'harmonyofgaia'
  const repoName = 'gaia-exchanges'
  const baseGithubUrl = `https://github.com/${githubOrg}/${repoName}`
  
  const appStores = [
    {
      name: 'Google Play Store',
      platform: 'Android',
      icon: '🤖',
      url: `${baseGithubUrl}/releases/latest/download/gaia-exchanges-android.apk`,
      fallbackUrl: 'https://play.google.com/store/search?q=gaia+exchanges&c=apps',
      rating: 4.8,
      downloads: '500K+',
      size: '34.7 MB',
      version: '2.1.0',
      color: 'bg-green-600 hover:bg-green-700',
      isDirectDownload: true
    },
    {
      name: 'Apple App Store',
      platform: 'iOS',
      icon: '🍎',
      url: 'https://apps.apple.com/search?term=gaia+exchanges',
      rating: 4.9,
      downloads: '250K+',
      size: '41.2 MB',
      version: '2.1.0',
      color: 'bg-gray-600 hover:bg-gray-700',
      isDirectDownload: false
    },
    {
      name: 'Windows Store',
      platform: 'Windows',
      icon: '🪟',
      url: `${baseGithubUrl}/releases/latest/download/gaia-exchanges-windows-x64.exe`,
      fallbackUrl: 'https://www.microsoft.com/store/search?q=gaia+exchanges',
      rating: 4.7,
      downloads: '100K+',
      size: '58.1 MB',
      version: '2.1.0',
      color: 'bg-blue-600 hover:bg-blue-700',
      isDirectDownload: true
    },
    {
      name: 'Mac App Store',
      platform: 'macOS',
      icon: '💻',
      url: `${baseGithubUrl}/releases/latest/download/gaia-exchanges-macos-universal.dmg`,
      fallbackUrl: 'https://apps.apple.com/search?term=gaia+exchanges',
      rating: 4.8,
      downloads: '75K+',
      size: '61.4 MB',
      version: '2.1.0',
      color: 'bg-gray-600 hover:bg-gray-700',
      isDirectDownload: true
    },
    {
      name: 'Linux (DEB)',
      platform: 'Ubuntu/Debian',
      icon: '🐧',
      url: `${baseGithubUrl}/releases/latest/download/gaia-exchanges-linux-amd64.deb`,
      fallbackUrl: `${baseGithubUrl}/releases/latest`,
      rating: 4.6,
      downloads: '25K+',
      size: '52.3 MB',
      version: '2.1.0',
      color: 'bg-orange-600 hover:bg-orange-700',
      isDirectDownload: true
    },
    {
      name: 'Web3 DApp',
      platform: 'Browser',
      icon: '🌐',
      url: 'https://app.gaiaexchanges.com',
      fallbackUrl: `${baseGithubUrl}`,
      rating: 4.7,
      downloads: '1M+ visits',
      size: 'Progressive Web App',
      version: '2.1.0',
      color: 'bg-purple-600 hover:bg-purple-700',
      isDirectDownload: false
    }
  ]

  const handleAppStoreClick = async (store: typeof appStores[0]) => {
    console.log(`🎯 Attempting to download/open: ${store.name} - ${store.platform}`)
    
    try {
      // For direct downloads, try primary URL first
      if (store.isDirectDownload) {
        // Check if GitHub release exists
        const response = await fetch(`https://api.github.com/repos/${githubOrg}/${repoName}/releases/latest`)
        
        if (response.ok) {
          const release = await response.json()
          console.log(`✅ Found GitHub release: ${release.tag_name}`)
          
          // Open the download URL
          window.open(store.url, '_blank', 'noopener,noreferrer')
          
          toast.success(`Downloading ${store.name}`, {
            description: `🚀 ${store.platform} version of Gaia's Exchanges`,
            duration: 5000
          })
        } else {
          // Fallback to alternative URL
          console.log(`⚠️ GitHub release not found, using fallback`)
          window.open(store.fallbackUrl || store.url, '_blank', 'noopener,noreferrer')
          
          toast.info(`Opening ${store.name}`, {
            description: `📱 Redirecting to ${store.platform} store`,
            duration: 3000
          })
        }
      } else {
        // For store links, open directly
        window.open(store.url, '_blank', 'noopener,noreferrer')
        
        toast.success(`Opening ${store.name}`, {
          description: `🔗 Redirecting to official ${store.platform} store`,
          duration: 3000
        })
      }
    } catch (error) {
      console.error(`❌ Error opening ${store.name}:`, error)
      
      // Try fallback URL
      if (store.fallbackUrl) {
        window.open(store.fallbackUrl, '_blank', 'noopener,noreferrer')
        toast.info(`Using alternative link`, {
          description: `Opening ${store.platform} store search`,
          duration: 3000
        })
      } else {
        toast.error(`Could not open ${store.name}`, {
          description: 'Please try again or visit our website',
          duration: 5000
        })
      }
    }
  }

  const openGitHubRepo = () => {
    window.open(baseGithubUrl, '_blank', 'noopener,noreferrer')
    toast.success('Opening GitHub Repository', {
      description: '🔗 Culture of Harmony - GAiA Project',
      duration: 3000
    })
  }

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Smartphone className="h-5 w-5" />
          Gaia's Exchanges - Multi-Platform Downloads
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Download from GitHub releases or official app stores worldwide
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GitHub Repository Link */}
        <div className="p-4 border border-green-500/20 rounded-lg bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-400">Culture of Harmony - GAiA Project</h3>
              <p className="text-sm text-muted-foreground">Official GitHub Repository</p>
            </div>
            <Button onClick={openGitHubRepo} className="bg-green-600 hover:bg-green-700">
              <Github className="h-4 w-4 mr-2" />
              View Source
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appStores.map((store) => (
            <div key={store.name} className="p-4 border border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{store.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {store.platform}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="font-semibold">{store.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Downloads:</span>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3 text-green-400" />
                      <span className="font-semibold">{store.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-semibold">{store.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-semibold">{store.version}</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleAppStoreClick(store)}
                  className={`w-full ${store.color} text-white`}
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {store.isDirectDownload ? 'Download Now' : 'Open Store'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/20">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-cyan-400">🌍 Culture of Harmony - Global Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>190+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Military-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>Growing Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.8★ Average</span>
              </div>
            </div>
            
            <div className="pt-3 text-xs text-muted-foreground">
              <p>✅ Open Source on GitHub | 🔒 End-to-end encryption | 🌍 24/7 global support</p>
              <p className="mt-1 text-green-400">🎯 "Seeds Will Form Into Music" - Culture of Harmony</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
