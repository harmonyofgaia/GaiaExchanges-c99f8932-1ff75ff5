
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { PartyPopper, Users, Calendar, MapPin, Gift, Star, Heart } from 'lucide-react'

interface Event {
  id: string
  title: string
  type: string
  date: string
  location: string
  participants: number
  maxParticipants: number
  ecoRating: number
  rewardPoints: number
  status: 'upcoming' | 'active' | 'completed'
}

export function CommunityPartyEvents() {
  const [eventType, setEventType] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [expectedParticipants, setExpectedParticipants] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  // Mock upcoming events
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Green Garden Party',
      type: 'community_gathering',
      date: '2024-02-15',
      location: 'Central Park',
      participants: 23,
      maxParticipants: 50,
      ecoRating: 5,
      rewardPoints: 30,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Eco Workshop & Music',
      type: 'educational_event',
      date: '2024-02-20',
      location: 'Community Center',
      participants: 15,
      maxParticipants: 30,
      ecoRating: 4,
      rewardPoints: 40,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Sustainable Food Festival',
      type: 'food_festival',
      date: '2024-02-25',
      location: 'Farmers Market',
      participants: 67,
      maxParticipants: 100,
      ecoRating: 5,
      rewardPoints: 50,
      status: 'active'
    }
  ]

  const handleEventCreation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!eventType || !eventTitle || !eventDate || !eventLocation) {
      toast.error('Please fill in all required fields')
      return
    }

    const participantsNum = parseInt(expectedParticipants) || 10
    const points = Math.floor(participantsNum * 2 + (eventType === 'food_festival' ? 20 : eventType === 'educational_event' ? 15 : 10))
    const tokens = Math.floor(points / 5)

    const activity = {
      id: Date.now().toString(),
      type: 'community_party_event',
      title: 'Community Event Organized',
      amount: points,
      timestamp: new Date(),
      description: `${eventTitle} - ${eventType.replace('_', ' ')} for ${participantsNum} people`,
      status: 'completed' as const,
      pointsEarned: points,
      tokensEarned: tokens,
      verified: true,
      metadata: { 
        eventType, 
        eventTitle, 
        eventDate, 
        eventLocation,
        eventDescription,
        expectedParticipants: participantsNum
      }
    }

    addActivity(activity)
    toast.success(`🎉 Event created! +${points} points, +${tokens} GAiA tokens earned`, {
      description: `Your ${eventTitle} event has been registered with the community!`,
      duration: 4000
    })
    
    // Reset form
    setEventType('')
    setEventTitle('')
    setEventDate('')
    setEventLocation('')
    setEventDescription('')
    setExpectedParticipants('')
  }

  const handleJoinEvent = (eventId: string, eventTitle: string, points: number) => {
    toast.success(`🎊 Joined ${eventTitle}!`, {
      description: `You'll earn ${points} points when you participate`,
      duration: 3000
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'community_gathering': return 'bg-green-600'
      case 'educational_event': return 'bg-blue-600'
      case 'food_festival': return 'bg-orange-600'
      case 'eco_celebration': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'border-blue-500/50 bg-blue-900/20'
      case 'active': return 'border-green-500/50 bg-green-900/20'
      case 'completed': return 'border-gray-500/50 bg-gray-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Event Form */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <PartyPopper className="h-6 w-6" />
            🎉 Create Community Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEventCreation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Type</label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community_gathering">Community Gathering</SelectItem>
                    <SelectItem value="educational_event">Educational Workshop</SelectItem>
                    <SelectItem value="food_festival">Sustainable Food Festival</SelectItem>
                    <SelectItem value="eco_celebration">Eco Celebration</SelectItem>
                    <SelectItem value="cleanup_party">Cleanup Party</SelectItem>
                    <SelectItem value="garden_party">Garden Party</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Expected Participants</label>
                <Input
                  type="number"
                  value={expectedParticipants}
                  onChange={(e) => setExpectedParticipants(e.target.value)}
                  placeholder="Number of people"
                  min="5"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Event Title *</label>
              <Input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date *</label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <Input
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Event location"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Event Description</label>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Describe your eco-friendly event..."
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Creating...' : '🎊 Create Event & Earn Rewards'}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <p className="text-sm text-purple-300">
              💡 <strong>Rewards:</strong> Earn 2 points per expected participant + bonus for event type. Educational events get +15 bonus, food festivals +20!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Calendar className="h-6 w-6" />
            🎪 Upcoming Community Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className={`${getStatusColor(event.status)} transition-all duration-300 hover:scale-105`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
                      {event.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(event.ecoRating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {event.participants}/{event.maxParticipants} participants
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-green-400">
                      <Gift className="h-4 w-4" />
                      <span className="text-sm font-medium">{event.rewardPoints} points</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleJoinEvent(event.id, event.title, event.rewardPoints)}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={event.status === 'completed'}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {event.status === 'active' ? 'Join Now' : event.status === 'upcoming' ? 'Register' : 'Completed'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Benefits */}
      <Card className="border-orange-500/30 bg-orange-900/20">
        <CardHeader>
          <CardTitle className="text-orange-400">🎁 Event Benefits & Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Event Organizer Benefits:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-orange-800/20 rounded">
                  <span>Event Supplies</span>
                  <Badge className="bg-green-600">25% OFF</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-800/20 rounded">
                  <span>Catering Services</span>
                  <Badge className="bg-blue-600">20% OFF</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-800/20 rounded">
                  <span>Venue Rental</span>
                  <Badge className="bg-purple-600">30% OFF</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Participant Rewards:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-4 w-4" />
                  <span>Attendance points & tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span>Event-specific badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Community networking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Social impact recognition</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
