
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Heart, 
  Star, 
  Target,
  Trophy,
  Globe,
  Leaf
} from 'lucide-react'

export default function CommunityEngagementHub() {
  const communityStats = [
    { label: 'Active Members', value: '125,847', icon: Users, color: 'text-blue-400' },
    { label: 'Projects Funded', value: '1,247', icon: Target, color: 'text-green-400' },
    { label: 'Environmental Impact', value: '89,234 kg CO₂', icon: Leaf, color: 'text-emerald-400' },
    { label: 'Community Score', value: '9.8/10', icon: Star, color: 'text-yellow-400' }
  ]

  const activeDiscussions = [
    { title: 'Ocean Cleanup Initiative Progress', replies: 234, category: 'Environment', priority: 'High' },
    { title: 'New Reforestation Project Proposal', replies: 156, category: 'Forest', priority: 'Medium' },
    { title: 'Community Token Distribution', replies: 89, category: 'Governance', priority: 'High' },
    { title: 'Wildlife Protection Campaign', replies: 67, category: 'Animals', priority: 'Low' }
  ]

  const upcomingEvents = [
    { title: 'Global Clean-up Day', date: '2024-02-15', participants: 2340 },
    { title: 'Virtual Forest Walk', date: '2024-02-18', participants: 890 },
    { title: 'Community Governance Vote', date: '2024-02-22', participants: 5670 },
    { title: 'Eco-Innovation Workshop', date: '2024-02-25', participants: 1200 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🌍 Community Engagement Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect, collaborate, and create positive environmental impact together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-green-500/20 bg-black/20">
                <CardContent className="p-6 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Discussions */}
          <Card className="border-blue-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <MessageCircle className="h-5 w-5" />
                Active Discussions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeDiscussions.map((discussion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{discussion.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {discussion.replies} replies
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={discussion.priority === 'High' ? 'destructive' : 
                            discussion.priority === 'Medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {discussion.priority}
                  </Badge>
                </div>
              ))}
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Join Discussion
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-purple-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                      <span className="text-xs text-green-400">
                        {event.participants} participants
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-purple-500/50">
                    Join
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Heart className="h-5 w-5" />
                Start Initiative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Launch your own environmental project and rally the community
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Create Initiative
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Trophy className="h-5 w-5" />
                Leaderboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                See top contributors and track your community impact ranking
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                View Rankings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Globe className="h-5 w-5" />
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track real-time environmental impact across all community projects
              </p>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                View Impact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
