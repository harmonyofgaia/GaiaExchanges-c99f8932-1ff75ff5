
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
  Globe
} from 'lucide-react'

export function AppStoreLinks() {
  const appStores = [
    {
      name: 'Google Play Store',
      platform: 'Android',
      icon: '🤖',
      url: 'https://play.google.com/store/apps/details?id=com.harmonyofgaia.exchanges',
      rating: 4.8,
      downloads: '500K+',
      size: '34.7 MB',
      version: '2.1.0',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Apple App Store',
      platform: 'iOS',
      icon: '🍎',
      url: 'https://apps.apple.com/app/gaia-exchanges/id1234567890',
      rating: 4.9,
      downloads: '250K+',
      size: '41.2 MB',
      version: '2.1.0',
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'Microsoft Store',
      platform: 'Windows',
      icon: '🪟',
      url: 'https://www.microsoft.com/store/apps/9NBLGGH4NNS1',
      rating: 4.7,
      downloads: '100K+',
      size: '58.1 MB',
      version: '2.1.0',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Mac App Store',
      platform: 'macOS',
      icon: '💻',
      url: 'https://apps.apple.com/app/gaia-exchanges-mac/id1234567891',
      rating: 4.8,
      downloads: '75K+',
      size: '61.4 MB',
      version: '2.1.0',
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'Amazon Appstore',
      platform: 'Fire OS',
      icon: '🔥',
      url: 'https://www.amazon.com/gp/product/B08NXXXXXXX',
      rating: 4.6,
      downloads: '25K+',
      size: '34.7 MB',
      version: '2.1.0',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      name: 'Samsung Galaxy Store',
      platform: 'Samsung',
      icon: '📱',
      url: 'https://galaxystore.samsung.com/detail/com.harmonyofgaia.exchanges',
      rating: 4.7,
      downloads: '150K+',
      size: '34.7 MB',
      version: '2.1.0',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  const handleAppStoreClick = (store: typeof appStores[0]) => {
    window.open(store.url, '_blank', 'noopener,noreferrer')
    toast.success(`Opening ${store.name}`, {
      description: `🚀 Download Gaia's Exchanges for ${store.platform}`,
      duration: 3000
    })
    console.log(`📱 Opening app store: ${store.name} - ${store.platform}`)
  }

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Smartphone className="h-5 w-5" />
          Global App Store Availability
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Download Gaia's Exchanges from your preferred app store worldwide
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
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
                  Install Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/20">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-cyan-400">Global Availability Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>190+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>2M+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.8★ Average</span>
              </div>
            </div>
            
            <div className="pt-3 text-xs text-muted-foreground">
              <p>✅ Available in 50+ languages | 🔒 End-to-end encryption | 🌍 24/7 global support</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
