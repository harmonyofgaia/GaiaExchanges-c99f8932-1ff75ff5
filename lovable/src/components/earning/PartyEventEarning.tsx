import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { 
  PartyPopper, 
  Calendar, 
  Users, 
  MapPin, 
  Music, 
  Utensils,
  Gift,
  Star,
  Camera,
  Share2
} from 'lucide-react'

export function PartyEventEarning() {
  const [eventType, setEventType] = useState('')
  const [attendees, setAttendees] = useState('')
  const [duration, setDuration] = useState('')
  const [theme, setTheme] = useState('')
  const [location, setLocation] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  const [activeEvents] = useState([
    {
      id: '1',
      name: 'Eco Dance Party',
      date: '2024-02-15',
      attendees: 45,
      theme: 'Zero Waste',
      earnings: 450,
      status: 'active'
    },
    {
      id: '2',
      name: 'Green Garden Gathering',
      date: '2024-02-10',
      attendees: 28,
      theme: 'Plant Exchange',
      earnings: 280,
      status: 'completed'
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!eventType || !attendees || !duration || !theme || !location) {
      toast.error('Please fill in all fields')
      return
    }

    const basePoints = {
      eco_party: 200,
      garden_party: 150,
      workshop_event: 300,
      cleanup_party: 250,
      awareness_event: 180,
      fundraiser: 350
    }

    const points = (basePoints[eventType as keyof typeof basePoints] || 150) + (parseInt(attendees) * 5)
    const tokens = Math.floor(points * 0.3)

    const activity = {
      id: Date.now().toString(),
      type: 'party_event',
      title: 'Environmental Party/Event Hosting',
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `Hosted ${eventType.replace('_', ' ')} for ${attendees} people with ${theme} theme`,
      status: 'completed' as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: { 
        eventType, 
        attendees: parseInt(attendees), 
        duration: parseFloat(duration),
        theme,
        location
      }
    }

    addActivity(activity)
    toast.success(`🎉 Party event recorded! +${Math.floor(points)} points earned for bringing community together!`)
    setEventType('')
    setAttendees('')
    setDuration('')
    setTheme('')
    setLocation('')
  }

  return (
    <Card className="border-pink-500/30 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-400">
          <PartyPopper className="h-6 w-6" />
          🎉 Environmental Party & Event Hosting
          <Badge className="bg-pink-600">Community Builder</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Events Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-pink-400">🎊 Your Events Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-pink-900/30 rounded-lg border border-pink-500/20">
              <div className="text-2xl font-bold text-pink-400">{activeEvents.length}</div>
              <div className="text-sm text-muted-foreground">Events Hosted</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {activeEvents.reduce((sum, event) => sum + event.attendees, 0)}
              </div>
              <div className="text-sm text-muted-foreground">People Inspired</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {activeEvents.reduce((sum, event) => sum + event.earnings, 0)}
              </div>
              <div className="text-sm text-muted-foreground">GAiA Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="space-y-3">
          <h4 className="font-semibold text-pink-400">📅 Recent Events</h4>
          {activeEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-pink-900/20 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-3">
                <Music className="h-5 w-5 text-pink-400" />
                <div>
                  <div className="font-medium text-pink-300">{event.name}</div>
                  <div className="text-sm text-muted-foreground">{event.theme} • {event.attendees} attendees</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-400">+{event.earnings} GAiA</div>
                <Badge className={event.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}>
                  {event.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Event */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg border border-pink-500/20">
          <h4 className="font-semibold text-pink-400 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Host New Environmental Event
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Type</label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eco_party">🎉 Eco Dance Party (200 pts)</SelectItem>
                  <SelectItem value="garden_party">🌱 Garden Party (150 pts)</SelectItem>
                  <SelectItem value="workshop_event">📚 Environmental Workshop (300 pts)</SelectItem>
                  <SelectItem value="cleanup_party">🧹 Cleanup Party (250 pts)</SelectItem>
                  <SelectItem value="awareness_event">📢 Awareness Event (180 pts)</SelectItem>
                  <SelectItem value="fundraiser">💰 Environmental Fundraiser (350 pts)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Expected Attendees</label>
              <Input
                type="number"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                placeholder="Number of people"
                min="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration (hours)</label>
              <Input
                type="number"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Event duration"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Environmental Theme</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zero_waste">🗑️ Zero Waste</SelectItem>
                  <SelectItem value="renewable_energy">⚡ Renewable Energy</SelectItem>
                  <SelectItem value="plant_based">🌱 Plant-Based Living</SelectItem>
                  <SelectItem value="ocean_conservation">🌊 Ocean Conservation</SelectItem>
                  <SelectItem value="climate_action">🌍 Climate Action</SelectItem>
                  <SelectItem value="biodiversity">🦋 Biodiversity Protection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Venue, park, community center..."
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-pink-600 hover:bg-pink-700">
            {loading ? 'Creating Event...' : '🎉 Host Environmental Event (+5 pts per attendee)'}
          </Button>
        </form>
        
        <div className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
          <p className="text-sm text-pink-300">
            💡 <strong>Party Power:</strong> Environmental parties and events are the most fun way to spread awareness while earning massive GAiA rewards! The more people you inspire, the bigger your impact and earnings!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}