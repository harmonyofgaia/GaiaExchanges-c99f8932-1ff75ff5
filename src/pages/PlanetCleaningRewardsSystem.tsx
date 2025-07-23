
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, 
  Camera, 
  Award, 
  TrendingUp, 
  Users, 
  Zap,
  Leaf,
  Droplets,
  Recycle,
  TreePine,
  Globe
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

interface CleaningReward {
  id: string
  user_id: string
  activity_type: string
  location_data: any
  verification_method: string
  tokens_earned: number
  environmental_impact: any
  verified_at: string | null
  created_at: string
}

export default function PlanetCleaningRewardsSystem() {
  const { user } = useAuth()
  const [rewards, setRewards] = useState<CleaningReward[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [activityType, setActivityType] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [impactAmount, setImpactAmount] = useState('')

  useEffect(() => {
    if (user) {
      loadRewards()
    }
  }, [user])

  const loadRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('planet_cleaning_rewards')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRewards(data || [])
    } catch (error) {
      console.error('Error loading rewards:', error)
      toast.error('Failed to load cleaning rewards')
    } finally {
      setLoading(false)
    }
  }

  const submitCleaningActivity = async () => {
    if (!user) {
      toast.error('Please log in to submit activities')
      return
    }

    if (!activityType || !location || !description || !impactAmount) {
      toast.error('Please fill in all fields')
      return
    }

    setSubmitting(true)
    try {
      // Calculate tokens based on activity type and impact
      const tokenMultipliers = {
        'plastic_cleanup': 2,
        'tree_planting': 3,
        'water_restoration': 4,
        'waste_sorting': 1.5,
        'beach_cleanup': 2.5,
        'forest_restoration': 3.5
      }

      const baseTokens = parseFloat(impactAmount) * (tokenMultipliers[activityType as keyof typeof tokenMultipliers] || 1)
      const tokensEarned = Math.floor(baseTokens * 10) // Scale up for better UX

      const { data, error } = await supabase
        .from('planet_cleaning_rewards')
        .insert([
          {
            user_id: user.id,
            activity_type: activityType,
            location_data: { 
              location: location,
              description: description,
              timestamp: new Date().toISOString()
            },
            verification_method: 'manual_review',
            tokens_earned: tokensEarned,
            environmental_impact: {
              type: activityType,
              amount: parseFloat(impactAmount),
              unit: getImpactUnit(activityType)
            }
          }
        ])
        .select()

      if (error) throw error
      
      toast.success(`Activity submitted! You'll earn ${tokensEarned} GAiA tokens after verification.`)
      
      // Reset form
      setActivityType('')
      setLocation('')
      setDescription('')
      setImpactAmount('')
      
      // Reload rewards
      loadRewards()
    } catch (error) {
      console.error('Error submitting activity:', error)
      toast.error('Failed to submit activity')
    } finally {
      setSubmitting(false)
    }
  }

  const getImpactUnit = (type: string) => {
    switch (type) {
      case 'plastic_cleanup':
      case 'waste_sorting':
      case 'beach_cleanup':
        return 'kg'
      case 'tree_planting':
        return 'trees'
      case 'water_restoration':
        return 'liters'
      case 'forest_restoration':
        return 'sqm'
      default:
        return 'units'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'plastic_cleanup':
      case 'waste_sorting':
      case 'beach_cleanup':
        return Recycle
      case 'tree_planting':
      case 'forest_restoration':
        return TreePine
      case 'water_restoration':
        return Droplets
      default:
        return Leaf
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'plastic_cleanup':
      case 'waste_sorting':
      case 'beach_cleanup':
        return 'text-blue-400'
      case 'tree_planting':
      case 'forest_restoration':
        return 'text-green-400'
      case 'water_restoration':
        return 'text-cyan-400'
      default:
        return 'text-gray-400'
    }
  }

  const activityTypes = [
    { value: 'plastic_cleanup', label: 'Plastic Cleanup', icon: Recycle },
    { value: 'tree_planting', label: 'Tree Planting', icon: TreePine },
    { value: 'water_restoration', label: 'Water Restoration', icon: Droplets },
    { value: 'waste_sorting', label: 'Waste Sorting', icon: Recycle },
    { value: 'beach_cleanup', label: 'Beach Cleanup', icon: Globe },
    { value: 'forest_restoration', label: 'Forest Restoration', icon: TreePine }
  ]

  const totalTokensEarned = rewards.reduce((sum, reward) => sum + reward.tokens_earned, 0)
  const verifiedRewards = rewards.filter(r => r.verified_at)
  const pendingRewards = rewards.filter(r => !r.verified_at)

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌍 Planet Cleaning Rewards
        </h1>
        <p className="text-xl text-muted-foreground">
          Earn tokens for verified environmental cleanup activities
        </p>
      </div>

      {/* Stats Overview */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Award className="h-6 w-6" />
            Your Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{totalTokensEarned}</div>
              <div className="text-sm text-muted-foreground">Total Tokens Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{verifiedRewards.length}</div>
              <div className="text-sm text-muted-foreground">Verified Activities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{pendingRewards.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{rewards.length}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit New Activity */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Camera className="h-5 w-5" />
            Submit Cleaning Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Type</label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                placeholder="Enter location (city, coordinates, etc.)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Describe your cleaning activity"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Impact Amount ({activityType ? getImpactUnit(activityType) : 'units'})
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={impactAmount}
              onChange={(e) => setImpactAmount(e.target.value)}
            />
          </div>

          <Button
            onClick={submitCleaningActivity}
            disabled={submitting || !activityType || !location || !description || !impactAmount}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? 'Submitting...' : 'Submit Activity'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-5 w-5" />
            Your Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rewards.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No activities yet
              </h3>
              <p className="text-muted-foreground">
                Submit your first cleaning activity to start earning tokens!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {rewards.map((reward) => {
                const ActivityIcon = getActivityIcon(reward.activity_type)
                const activityColor = getActivityColor(reward.activity_type)
                
                return (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20"
                  >
                    <div className="flex items-center gap-4">
                      <ActivityIcon className={`h-8 w-8 ${activityColor}`} />
                      <div>
                        <h4 className="font-medium">
                          {reward.activity_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {reward.location_data?.location || 'Unknown location'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(reward.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {reward.tokens_earned} GAiA
                      </div>
                      <Badge
                        className={
                          reward.verified_at 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }
                      >
                        {reward.verified_at ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Global Impact */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Users className="h-5 w-5" />
            Global Community Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">2.8M</div>
              <div className="text-sm text-muted-foreground">Total Tokens Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">15.2K</div>
              <div className="text-sm text-muted-foreground">Active Cleaners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">847</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
