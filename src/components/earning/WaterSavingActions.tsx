import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { 
  Droplets, 
  Save, 
  Camera, 
  MapPin, 
  Trophy, 
  Coins,
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'

interface WaterSavingActionFormData {
  type: 'rain_collection' | 'greywater_reuse' | 'low_flow_fixtures' | 'leak_repair' | 'drought_resistant_plants'
  waterSavedLiters: number
  duration: number
  verified: boolean
  evidence: string[]
  location: string
}

export function WaterSavingActions() {
  const { recordWaterSaving, activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<WaterSavingActionFormData>({
    type: 'rain_collection',
    waterSavedLiters: 0,
    duration: 1,
    verified: false,
    evidence: [],
    location: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const waterSavingTypes = [
    {
      value: 'rain_collection',
      label: 'Rainwater Collection',
      description: 'Collecting and storing rainwater for later use',
      icon: '🌧️',
      multiplier: 1.5
    },
    {
      value: 'greywater_reuse',
      label: 'Greywater Reuse',
      description: 'Reusing water from sinks, showers, and laundry',
      icon: '♻️',
      multiplier: 1.8
    },
    {
      value: 'low_flow_fixtures',
      label: 'Low-Flow Fixtures',
      description: 'Installing water-efficient fixtures and appliances',
      icon: '🚿',
      multiplier: 1.2
    },
    {
      value: 'leak_repair',
      label: 'Leak Repair',
      description: 'Finding and fixing water leaks',
      icon: '🔧',
      multiplier: 2.0
    },
    {
      value: 'drought_resistant_plants',
      label: 'Drought-Resistant Plants',
      description: 'Planting water-efficient vegetation',
      icon: '🌵',
      multiplier: 1.3
    }
  ]

  const calculateEstimatedReward = () => {
    const selectedType = waterSavingTypes.find(t => t.value === formData.type)
    const basePoints = Math.floor(formData.waterSavedLiters * 0.1)
    const durationBonus = Math.floor(formData.duration * 2)
    const verificationBonus = formData.verified ? Math.floor(basePoints * 0.5) : 0
    const typeMultiplier = selectedType?.multiplier || 1
    const total = Math.floor((basePoints + durationBonus + verificationBonus) * typeMultiplier * 1.2)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.location || formData.waterSavedLiters <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      await recordWaterSaving(formData)
      toast.success('Water saving action recorded successfully! 💧', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        type: 'rain_collection',
        waterSavedLiters: 0,
        duration: 1,
        verified: false,
        evidence: [],
        location: ''
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record water saving action')
    } finally {
      setSubmitting(false)
    }
  }

  const userWaterActions = activities.filter(a => a.type === 'water_saving')
  const totalWaterSaved = userWaterActions.reduce((sum, action) => 
    sum + (action.metadata?.waterSavingAction?.waterSavedLiters || 0), 0
  )
  const totalPointsEarned = userWaterActions.reduce((sum, action) => sum + action.pointsEarned, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Water Saved</p>
                <p className="text-2xl font-bold text-blue-400">{totalWaterSaved.toLocaleString()}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
                <p className="text-2xl font-bold text-green-400">{totalPointsEarned.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">GAIA Tokens</p>
                <p className="text-2xl font-bold text-purple-400">
                  {(totalPointsEarned * 0.001).toFixed(3)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {waterSavingTypes.map((type) => (
          <Card key={type.value} className="hover:border-blue-400/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{type.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {type.multiplier}x multiplier
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Record New Action Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          size="lg"
        >
          <Droplets className="mr-2 h-5 w-5" />
          Record Water Saving Action
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Save className="h-5 w-5" />
              <span>Record Water Saving Action</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Action Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterSavingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <span>{type.icon}</span>
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterSaved">Water Saved (Liters)</Label>
                  <Input
                    id="waterSaved"
                    type="number"
                    min="1"
                    value={formData.waterSavedLiters}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      waterSavedLiters: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Enter liters saved"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration: parseInt(e.target.value) || 1 
                    }))}
                    placeholder="Number of days"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: checked }))}
                />
                <Label htmlFor="verified">I have evidence to verify this action</Label>
              </div>

              {/* Estimated Reward Display */}
              <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estimated Reward
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="text-lg font-bold text-green-400">
                        {calculateEstimatedReward().points}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GAIA Tokens</p>
                      <p className="text-lg font-bold text-purple-400">
                        {calculateEstimatedReward().tokens}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  {submitting ? 'Recording...' : 'Record Action'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Actions */}
      {userWaterActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Water Saving Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userWaterActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💧</div>
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">+{action.pointsEarned} pts</p>
                    <p className="text-sm text-purple-400">+{action.tokensEarned} GAIA</p>
                    {action.verified && (
                      <CheckCircle className="h-4 w-4 text-green-400 ml-auto mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}