
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MessageCircle, Calendar, MapPin, Star, Heart, Zap, Globe } from 'lucide-react'

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const communityStats = {
    totalMembers: 45267,
    activeToday: 3421,
    projectsActive: 156,
    eventsThisWeek: 23
  }

  const featuredProjects = [
    {
      id: 'ocean-cleanup',
      name: 'Ocean Cleanup Initiative',
      description: 'Join our global effort to clean the oceans',
      members: 2341,
      progress: 67,
      category: 'Ocean Conservation',
      image: '/placeholder-ocean.jpg'
    },
    {
      id: 'urban-gardens',
      name: 'Urban Gardens Network',
      description: 'Creating green spaces in urban areas',
      members: 1876,
      progress: 45,
      category: 'Urban Ecology',
      image: '/placeholder-garden.jpg'
    },
    {
      id: 'renewable-energy',
      name: 'Community Solar Project',
      description: 'Building renewable energy infrastructure',
      members: 3214,
      progress: 78,
      category: 'Renewable Energy',
      image: '/placeholder-solar.jpg'
    }
  ]

  const upcomingEvents = [
    {
      id: 'beach-cleanup',
      title: 'Beach Cleanup Day',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Santa Monica Beach',
      participants: 234,
      category: 'Cleanup'
    },
    {
      id: 'tree-planting',
      title: 'Community Tree Planting',
      date: '2024-02-18',
      time: '10:00 AM',
      location: 'Central Park',
      participants: 156,
      category: 'Conservation'
    },
    {
      id: 'workshop',
      title: 'Sustainable Living Workshop',
      date: '2024-02-22',
      time: '02:00 PM',
      location: 'Community Center',
      participants: 89,
      category: 'Education'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Community Header */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 Community Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect, collaborate, and create positive environmental impact together
            </p>
            
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{communityStats.activeToday.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{communityStats.projectsActive}</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{communityStats.eventsThisWeek}</div>
                <div className="text-sm text-muted-foreground">Events This Week</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Community Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Featured Projects */}
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Star className="h-5 w-5" />
                Featured Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="bg-green-900/10 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-600 text-white">{project.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {project.members}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-green-400">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Join Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-blue-900/10 rounded-lg border border-blue-500/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-blue-400">{event.title}</h3>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants} participants
                        </div>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Join Event
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Community Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Community projects will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Community events will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Community discussions will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Community members will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
