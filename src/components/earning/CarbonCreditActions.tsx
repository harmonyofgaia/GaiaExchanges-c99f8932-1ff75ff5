import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Leaf, 
  TreePine,
  Zap,
  Factory,
  Trophy, 
  Coins,
  CheckCircle,
  TrendingUp,
  Shield,
  Globe,
  Lightbulb,
  Award
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'

interface CarbonCreditFormData {
  actionType: 'tree_planting' | 'renewable_energy' | 'carbon_sequestration' | 'emissions_reduction'
  carbonOffset: number
  verified: boolean
  certificationBody: string
  tradeable: boolean
  price: number
  description: string
  location: string
  duration: number
}

export function CarbonCreditActions() {
  const { activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<CarbonCreditFormData>({
    actionType: 'tree_planting',
    carbonOffset: 0,
    verified: false,
    certificationBody: '',
    tradeable: false,
    price: 0,
    description: '',
    location: '',
    duration: 12
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const actionTypes = [
    {
      value: 'tree_planting',
      label: 'Tree Planting',
      description: 'Plant trees for carbon sequestration',
      icon: '🌳',
      multiplier: 1.8,
      avgOffset: 25, // kg CO2 per tree per year
      color: 'text-green-400'
    },
    {
      value: 'renewable_energy',
      label: 'Renewable Energy',
      description: 'Install or use renewable energy systems',
      icon: '⚡',
      multiplier: 1.6,
      avgOffset: 100, // kg CO2 per MWh
      color: 'text-yellow-400'
    },
    {
      value: 'carbon_sequestration',
      label: 'Carbon Sequestration',
      description: 'Projects that capture and store CO2',
      icon: '🌿',
      multiplier: 2.2,
      avgOffset: 500, // kg CO2 per project
      color: 'text-blue-400'
    },
    {
      value: 'emissions_reduction',
      label: 'Emissions Reduction',
      description: 'Reduce carbon emissions through efficiency',
      icon: '🏭',
      multiplier: 1.4,
      avgOffset: 200, // kg CO2 reduced
      color: 'text-purple-400'
    }
  ]

  const certificationBodies = [
    'Verified Carbon Standard (VCS)',
    'Gold Standard',
    'Climate Action Reserve (CAR)',
    'American Carbon Registry (ACR)',
    'Plan Vivo',
    'Community-verified',
    'Self-reported'
  ]

  const calculateEstimatedReward = () => {
    const selectedAction = actionTypes.find(a => a.value === formData.actionType)
    const basePoints = Math.floor(formData.carbonOffset * 5) // 5 points per kg CO2
    const verificationBonus = formData.verified ? Math.floor(basePoints * 0.5) : 0
    const tradeableBonus = formData.tradeable ? Math.floor(basePoints * 0.3) : 0
    const durationBonus = Math.floor(formData.duration * 10)
    const multiplier = selectedAction?.multiplier || 1.0
    
    const total = Math.floor((basePoints + verificationBonus + tradeableBonus + durationBonus) * multiplier * 2.0)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.description || formData.carbonOffset <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      // TODO: Record carbon credit action
      toast.success('Carbon credit action recorded successfully! 🌿', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        actionType: 'tree_planting',
        carbonOffset: 0,
        verified: false,
        certificationBody: '',
        tradeable: false,
        price: 0,
        description: '',
        location: '',
        duration: 12
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record carbon credit action')
    } finally {
      setSubmitting(false)
    }
  }

  const userCarbonActions = activities.filter(a => a.type === 'carbon_credit')
  const totalCarbonOffset = userCarbonActions.reduce((sum, action) => 
    sum + (action.metadata?.carbonCreditAction?.carbonOffset || 0), 0
  )
  const totalPointsEarned = userCarbonActions.reduce((sum, action) => sum + action.pointsEarned, 0)
  const verifiedCredits = userCarbonActions.filter(action => 
    action.metadata?.carbonCreditAction?.verified
  ).length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">CO2 Offset</p>
                <p className="text-2xl font-bold text-green-400">{totalCarbonOffset.toLocaleString()} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Verified Credits</p>
                <p className="text-2xl font-bold text-blue-400">{verifiedCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
                <p className="text-2xl font-bold text-yellow-400">{totalPointsEarned.toLocaleString()}</p>
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

      {/* Carbon Credit Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Carbon Credit Action Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actionTypes.map((type) => (
              <div 
                key={type.value}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:border-green-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, actionType: type.value as any }))}
              >
                <div className="text-2xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${type.color}`}>{type.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {type.multiplier}x multiplier
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ~{type.avgOffset} kg CO2
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card className="border-green-500/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-400" />
                <span>Carbon Credits Impact</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Trees equivalent:</span>
                  <span className="font-medium">{Math.floor(totalCarbonOffset / 25)} trees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Car miles offset:</span>
                  <span className="font-medium">{Math.floor(totalCarbonOffset * 2.3)} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Energy equivalent:</span>
                  <span className="font-medium">{Math.floor(totalCarbonOffset * 1.2)} kWh</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>Your Climate Impact</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Contributing to global climate goals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Supporting verified environmental projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Building sustainable future</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record New Action Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          size="lg"
        >
          <Leaf className="mr-2 h-5 w-5" />
          Record Carbon Credit Action
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Record Carbon Credit Action</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actionType">Action Type</Label>
                  <Select 
                    value={formData.actionType} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, actionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map((type) => (
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
                  <Label htmlFor="carbonOffset">Carbon Offset (kg CO2)</Label>
                  <Input
                    id="carbonOffset"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.carbonOffset}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      carbonOffset: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="CO2 offset amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration (months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration: parseInt(e.target.value) || 12 
                    }))}
                    placeholder="Duration in months"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Project location"
                  />
                </div>

                {formData.verified && (
                  <div className="space-y-2">
                    <Label htmlFor="certificationBody">Certification Body</Label>
                    <Select 
                      value={formData.certificationBody} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, certificationBody: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select certification body" />
                      </SelectTrigger>
                      <SelectContent>
                        {certificationBodies.map((body) => (
                          <SelectItem key={body} value={body}>
                            {body}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.tradeable && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Credit ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        price: parseFloat(e.target.value) || 0 
                      }))}
                      placeholder="Price per ton CO2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your carbon credit action in detail..."
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: checked }))}
                  />
                  <Label htmlFor="verified" className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Third-party verified</span>
                    <Badge variant="secondary" className="text-xs">+50% bonus</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="tradeable"
                    checked={formData.tradeable}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, tradeable: checked }))}
                  />
                  <Label htmlFor="tradeable" className="flex items-center space-x-2">
                    <Coins className="h-4 w-4" />
                    <span>Available for trading</span>
                    <Badge variant="secondary" className="text-xs">+30% bonus</Badge>
                  </Label>
                </div>
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
                  <div className="mt-2 text-xs text-muted-foreground">
                    Base: {Math.floor(formData.carbonOffset * 5)} pts
                    {formData.verified && ' + Verified: 50% bonus'}
                    {formData.tradeable && ' + Tradeable: 30% bonus'}
                    + Duration: {Math.floor(formData.duration * 10)} pts
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
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {submitting ? 'Recording...' : 'Record Action'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Actions */}
      {userCarbonActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Carbon Credit Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCarbonActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌿</div>
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
                    <div className="flex items-center mt-1 space-x-1">
                      {action.metadata?.carbonCreditAction?.verified && (
                        <Shield className="h-3 w-3 text-blue-400" />
                      )}
                      {action.metadata?.carbonCreditAction?.tradeable && (
                        <Coins className="h-3 w-3 text-yellow-400" />
                      )}
                    </div>
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