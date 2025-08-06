import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { Users } from 'lucide-react'

export function CommunityCleanupActions() {
  const [locationArea, setLocationArea] = useState('')
  const [participantCount, setParticipantCount] = useState('')
  const [wasteCollected, setWasteCollected] = useState('')
  const [duration, setDuration] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!locationArea || !participantCount || !wasteCollected || !duration) {
      toast.error('Please fill in all fields')
      return
    }

    const points = (parseFloat(wasteCollected) * 10) + (parseInt(participantCount) * 5) + (parseFloat(duration) * 2)
    const tokens = Math.floor(points * 0.2)

    const activity = {
      id: Date.now().toString(),
      type: 'community_cleanup',
      title: 'Community Cleanup Event',
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `Led cleanup at ${locationArea} with ${participantCount} participants, collected ${wasteCollected}kg waste`,
      status: 'completed' as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: { 
        locationArea, 
        participantCount: parseInt(participantCount), 
        wasteCollected: parseFloat(wasteCollected),
        duration: parseFloat(duration)
      }
    }

    addActivity(activity)
    toast.success(`Community cleanup recorded! +${Math.floor(points)} points earned for leadership`)
    setLocationArea('')
    setParticipantCount('')
    setWasteCollected('')
    setDuration('')
  }

  return (
    <Card className="border-purple-500/30 bg-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Users className="h-5 w-5" />
          🧹 Community Cleanup Leadership
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cleanup Location</label>
            <Select value={locationArea} onValueChange={setLocationArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select cleanup area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beach">Beach/Waterfront</SelectItem>
                <SelectItem value="park">Park/Recreation Area</SelectItem>
                <SelectItem value="neighborhood">Neighborhood Streets</SelectItem>
                <SelectItem value="forest">Forest/Trail</SelectItem>
                <SelectItem value="river">River/Stream</SelectItem>
                <SelectItem value="urban">Urban Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Participants</label>
            <Input
              type="number"
              value={participantCount}
              onChange={(e) => setParticipantCount(e.target.value)}
              placeholder="How many people joined?"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Waste Collected (kg)</label>
            <Input
              type="number"
              step="0.1"
              value={wasteCollected}
              onChange={(e) => setWasteCollected(e.target.value)}
              placeholder="Total waste collected"
              min="0.1"
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
              min="0.5"
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
            {loading ? 'Recording...' : '🧹 Record Community Cleanup Leadership'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
          <p className="text-sm text-purple-300">
            💡 <strong>Leadership Bonus:</strong> Community events earn extra points for organizing and inspiring others!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}