
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Newspaper, Rss, Bell } from 'lucide-react'

export default function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            📰 News & Updates
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Stay updated with the latest GAiA developments
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-red-900/30 rounded-lg border border-red-500/30">
              <Newspaper className="h-12 w-12 mx-auto text-red-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-red-400">Latest News</div>
              <div className="text-sm text-muted-foreground">Recent announcements</div>
            </div>

            <div className="text-center p-6 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <Rss className="h-12 w-12 mx-auto text-orange-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-orange-400">RSS Feed</div>
              <div className="text-sm text-muted-foreground">Subscribe to updates</div>
            </div>

            <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <Bell className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Notifications</div>
              <div className="text-sm text-muted-foreground">Push notifications</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
