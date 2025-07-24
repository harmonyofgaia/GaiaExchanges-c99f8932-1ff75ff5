import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { 
  Bell, Users, Video, Heart, Zap, Settings, 
  BellRing, BellOff, Mail, MessageSquare, Calendar,
  TreePine, Star, Award, Crown, Leaf
} from 'lucide-react'

interface Creator {
  id: string
  name: string
  avatar: string
  subscribers: number
  isVerified: boolean
  category: string
  greenImpactScore: number
  lastUpload: string
  isSubscribed: boolean
  notificationsEnabled: boolean
}

interface Notification {
  id: string
  type: 'upload' | 'live' | 'milestone' | 'project' | 'community'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  creator?: {
    name: string
    avatar: string
  }
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}

interface Subscription {
  id: string
  creatorId: string
  subscribedAt: string
  notificationSettings: {
    uploads: boolean
    liveStreams: boolean
    communityPosts: boolean
    milestones: boolean
    greenProjects: boolean
  }
}

export function VideoSubscriptionSystem() {
  const [activeTab, setActiveTab] = useState('subscriptions')
  const [notificationFilter, setNotificationFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [creators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Sarah\'s Little Heaven',
      avatar: '/api/placeholder/64/64',
      subscribers: 15420,
      isVerified: true,
      category: 'Sustainability',
      greenImpactScore: 8750,
      lastUpload: '2 days ago',
      isSubscribed: true,
      notificationsEnabled: true
    },
    {
      id: '2',
      name: 'Ocean Guardian Mike',
      avatar: '/api/placeholder/64/64',
      subscribers: 28934,
      isVerified: true,
      category: 'Marine Conservation',
      greenImpactScore: 12340,
      lastUpload: '1 day ago',
      isSubscribed: true,
      notificationsEnabled: true
    },
    {
      id: '3',
      name: 'Climate Action Network',
      avatar: '/api/placeholder/64/64',
      subscribers: 45678,
      isVerified: true,
      category: 'Climate Action',
      greenImpactScore: 19875,
      lastUpload: '3 hours ago',
      isSubscribed: true,
      notificationsEnabled: false
    }
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'upload',
      title: 'New Video Upload',
      message: 'Sarah\'s Little Heaven uploaded "10 Easy Ways to Reduce Food Waste"',
      timestamp: '2 hours ago',
      isRead: false,
      creator: {
        name: 'Sarah\'s Little Heaven',
        avatar: '/api/placeholder/32/32'
      },
      actionUrl: '/video/123',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'live',
      title: 'Going Live Soon!',
      message: 'Ocean Guardian Mike will be live in 30 minutes for "Ocean Cleanup Q&A"',
      timestamp: '30 minutes ago',
      isRead: false,
      creator: {
        name: 'Ocean Guardian Mike',
        avatar: '/api/placeholder/32/32'
      },
      actionUrl: '/live/456',
      priority: 'high'
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Green Milestone Achieved!',
      message: 'Climate Action Network reached 50,000 trees planted milestone!',
      timestamp: '1 day ago',
      isRead: true,
      creator: {
        name: 'Climate Action Network',
        avatar: '/api/placeholder/32/32'
      },
      priority: 'medium'
    },
    {
      id: '4',
      type: 'project',
      title: 'New Green Project Launched',
      message: 'Join the "Coral Reef Restoration" project - 1000 GAiA tokens pledged!',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'high'
    },
    {
      id: '5',
      type: 'community',
      title: 'Community Challenge',
      message: 'Weekly "Plastic-Free Living" challenge starts tomorrow!',
      timestamp: '3 days ago',
      isRead: true,
      priority: 'low'
    }
  ])

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      creatorId: '1',
      subscribedAt: '2023-11-15',
      notificationSettings: {
        uploads: true,
        liveStreams: true,
        communityPosts: true,
        milestones: true,
        greenProjects: true
      }
    },
    {
      id: '2',
      creatorId: '2',
      subscribedAt: '2023-10-22',
      notificationSettings: {
        uploads: true,
        liveStreams: true,
        communityPosts: false,
        milestones: true,
        greenProjects: true
      }
    },
    {
      id: '3',
      creatorId: '3',
      subscribedAt: '2023-09-10',
      notificationSettings: {
        uploads: false,
        liveStreams: false,
        communityPosts: false,
        milestones: true,
        greenProjects: true
      }
    }
  ])

  const toggleSubscription = (creatorId: string) => {
    console.log(`Toggling subscription for creator ${creatorId}`)
  }

  const toggleNotifications = (creatorId: string) => {
    console.log(`Toggling notifications for creator ${creatorId}`)
  }

  const updateNotificationSettings = (subscriptionId: string, settings: any) => {
    console.log(`Updating notification settings for subscription ${subscriptionId}`, settings)
  }

  const markAsRead = (notificationId: string) => {
    console.log(`Marking notification ${notificationId} as read`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'upload': return <Video className="h-4 w-4" />
      case 'live': return <Zap className="h-4 w-4 text-red-400" />
      case 'milestone': return <Award className="h-4 w-4 text-yellow-400" />
      case 'project': return <TreePine className="h-4 w-4 text-green-400" />
      case 'community': return <Users className="h-4 w-4 text-blue-400" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-900/10'
      case 'medium': return 'border-yellow-500/50 bg-yellow-900/10'
      case 'low': return 'border-blue-500/50 bg-blue-900/10'
      default: return 'border-muted'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (notificationFilter === 'unread' && notification.isRead) return false
    if (notificationFilter === 'high' && notification.priority !== 'high') return false
    return true
  })

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-pink-500/30 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-pink-400" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-pink-400">Subscribe & Notification System</h2>
              <p className="text-pink-300">Stay updated with creators, live events, and green milestones</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-600">
                <TreePine className="h-3 w-3 mr-1" />
                {creators.filter(c => c.isSubscribed).length} Active
              </Badge>
              <Badge variant="outline">
                <Bell className="h-3 w-3 mr-1" />
                {notifications.filter(n => !n.isRead).length} Unread
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b">
        <Button
          variant={activeTab === 'subscriptions' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('subscriptions')}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          My Subscriptions
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('notifications')}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          Notifications
          {notifications.filter(n => !n.isRead).length > 0 && (
            <Badge className="bg-red-600 text-xs">
              {notifications.filter(n => !n.isRead).length}
            </Badge>
          )}
        </Button>
        <Button
          variant={activeTab === 'discover' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('discover')}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" />
          Discover Creators
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCreators.filter(c => c.isSubscribed).map((creator) => (
              <Card key={creator.id} className="hover:border-green-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{creator.name}</h3>
                        {creator.isVerified && (
                          <Badge className="bg-blue-600 text-xs">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{creator.category}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-blue-400">
                          {creator.subscribers.toLocaleString()} subs
                        </span>
                        <span className="text-sm text-green-400">
                          <Leaf className="h-3 w-3 inline mr-1" />
                          {creator.greenImpactScore.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last upload: {creator.lastUpload}</span>
                      <Badge variant={creator.notificationsEnabled ? 'default' : 'secondary'}>
                        {creator.notificationsEnabled ? (
                          <BellRing className="h-3 w-3 mr-1" />
                        ) : (
                          <BellOff className="h-3 w-3 mr-1" />
                        )}
                        {creator.notificationsEnabled ? 'On' : 'Off'}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleNotifications(creator.id)}
                        className="flex-1"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        {creator.notificationsEnabled ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleSubscription(creator.id)}
                        className="text-red-400 hover:bg-red-600/20"
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={notificationFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setNotificationFilter('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={notificationFilter === 'unread' ? 'default' : 'outline'}
                onClick={() => setNotificationFilter('unread')}
              >
                Unread ({notifications.filter(n => !n.isRead).length})
              </Button>
              <Button
                size="sm"
                variant={notificationFilter === 'high' ? 'default' : 'outline'}
                onClick={() => setNotificationFilter('high')}
              >
                High Priority
              </Button>
            </div>
            
            <Button size="sm" variant="outline" className="ml-auto">
              <Mail className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-colors hover:border-pink-500/50 ${
                  !notification.isRead ? 'border-pink-500/30 bg-pink-900/5' : ''
                } ${getPriorityColor(notification.priority)}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-pink-400 rounded-full" />
                        )}
                        <Badge className={`text-xs ${
                          notification.priority === 'high' ? 'bg-red-600' :
                          notification.priority === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                        }`}>
                          {notification.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {notification.creator && (
                            <>
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={notification.creator.avatar} />
                                <AvatarFallback className="text-xs">
                                  {notification.creator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {notification.creator.name}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-4">
          <Input
            placeholder="Search creators by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCreators.filter(c => !c.isSubscribed).map((creator) => (
              <Card key={creator.id} className="hover:border-green-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{creator.name}</h3>
                        {creator.isVerified && (
                          <Badge className="bg-blue-600 text-xs">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{creator.category}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-blue-400">
                          {creator.subscribers.toLocaleString()} subs
                        </span>
                        <span className="text-sm text-green-400">
                          <Leaf className="h-3 w-3 inline mr-1" />
                          {creator.greenImpactScore.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => toggleSubscription(creator.id)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Green Milestones</h4>
                  <p className="text-sm text-muted-foreground">Get notified about environmental achievements</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Live Stream Alerts</h4>
                  <p className="text-sm text-muted-foreground">Instant alerts when creators go live</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptions.map((subscription) => {
                const creator = creators.find(c => c.id === subscription.creatorId)
                if (!creator) return null

                return (
                  <div key={subscription.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{creator.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Subscribed since {subscription.subscribedAt}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uploads</span>
                        <Switch 
                          checked={subscription.notificationSettings.uploads}
                          onCheckedChange={(checked) => 
                            updateNotificationSettings(subscription.id, {
                              ...subscription.notificationSettings,
                              uploads: checked
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Live</span>
                        <Switch 
                          checked={subscription.notificationSettings.liveStreams}
                          onCheckedChange={(checked) => 
                            updateNotificationSettings(subscription.id, {
                              ...subscription.notificationSettings,
                              liveStreams: checked
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Community</span>
                        <Switch 
                          checked={subscription.notificationSettings.communityPosts}
                          onCheckedChange={(checked) => 
                            updateNotificationSettings(subscription.id, {
                              ...subscription.notificationSettings,
                              communityPosts: checked
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Milestones</span>
                        <Switch 
                          checked={subscription.notificationSettings.milestones}
                          onCheckedChange={(checked) => 
                            updateNotificationSettings(subscription.id, {
                              ...subscription.notificationSettings,
                              milestones: checked
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Green Projects</span>
                        <Switch 
                          checked={subscription.notificationSettings.greenProjects}
                          onCheckedChange={(checked) => 
                            updateNotificationSettings(subscription.id, {
                              ...subscription.notificationSettings,
                              greenProjects: checked
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}