import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, Calendar, Trophy, Globe, Heart, Zap, Target } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CommunityFeed } from '@/components/community/CommunityFeed'
import { CommunityEvents } from '@/components/community/CommunityEvents'
import { CommunityStats } from '@/components/community/CommunityStats'
import Navbar from '@/components/Navbar'

export default function CommunityHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤝 GAiA Community Hub
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Connect, collaborate, and contribute to a greener future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12,456</div>
              <div className="text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">4,892</div>
              <div className="text-muted-foreground">Forum Posts</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">87</div>
              <div className="text-muted-foreground">Upcoming Events</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">34</div>
              <div className="text-muted-foreground">Completed Missions</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">
              <Users className="h-4 w-4 mr-2" />
              Community Feed
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Globe className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="missions">
              <Target className="h-4 w-4 mr-2" />
              Missions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="mt-4">
            <CommunityFeed />
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <CommunityEvents />
          </TabsContent>
          <TabsContent value="stats" className="mt-4">
            <CommunityStats />
          </TabsContent>
          <TabsContent value="missions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Eco Missions</CardTitle>
                <CardContent>
                  <p className="text-muted-foreground">
                    Explore and participate in community-driven eco missions.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
