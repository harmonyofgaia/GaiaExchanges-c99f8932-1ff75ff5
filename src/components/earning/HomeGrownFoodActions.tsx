import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Carrot, 
  Leaf, 
  Sprout, 
  Trophy, 
  Coins,
  Calendar as CalendarIcon,
  CheckCircle,
  TrendingUp,
  Share2,
  BookOpen
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface HomeGrownFoodFormData {
  cropType: string
  quantity: number
  growthDuration: number
  organicCertified: boolean
  harvestDate: Date
  seedsShared: number
  knowledgeShared: boolean
}

export function HomeGrownFoodActions() {
  const { recordHomeGrownFood, activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<HomeGrownFoodFormData>({
    cropType: '',
    quantity: 0,
    growthDuration: 30,
    organicCertified: false,
    harvestDate: new Date(),
    seedsShared: 0,
    knowledgeShared: false
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const popularCrops = [
    { name: 'Tomatoes', icon: '🍅', basePoints: 15, difficulty: 'Medium' },
    { name: 'Lettuce', icon: '🥬', basePoints: 8, difficulty: 'Easy' },
    { name: 'Carrots', icon: '🥕', basePoints: 12, difficulty: 'Easy' },
    { name: 'Bell Peppers', icon: '🫑', basePoints: 18, difficulty: 'Medium' },
    { name: 'Herbs', icon: '🌿', basePoints: 10, difficulty: 'Easy' },
    { name: 'Potatoes', icon: '🥔', basePoints: 20, difficulty: 'Hard' },
    { name: 'Strawberries', icon: '🍓', basePoints: 25, difficulty: 'Hard' },
    { name: 'Spinach', icon: '🥬', basePoints: 10, difficulty: 'Easy' },
    { name: 'Zucchini', icon: '🥒', basePoints: 16, difficulty: 'Medium' },
    { name: 'Beans', icon: '🫘', basePoints: 14, difficulty: 'Medium' }
  ]

  const calculateEstimatedReward = () => {
    const basePoints = formData.quantity * 10
    const durationBonus = Math.floor(formData.growthDuration * 0.5)
    const organicBonus = formData.organicCertified ? Math.floor(basePoints * 0.3) : 0
    const sharingBonus = (formData.seedsShared * 5) + (formData.knowledgeShared ? 50 : 0)
    const total = Math.floor((basePoints + durationBonus + organicBonus + sharingBonus) * 1.1)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.cropType || formData.quantity <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      await recordHomeGrownFood(formData)
      toast.success('Home grown food recorded successfully! 🌱', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        cropType: '',
        quantity: 0,
        growthDuration: 30,
        organicCertified: false,
        harvestDate: new Date(),
        seedsShared: 0,
        knowledgeShared: false
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record home grown food')
    } finally {
      setSubmitting(false)
    }
  }

  const userFoodActions = activities.filter(a => a.type === 'home_grown_food')
  const totalCropsGrown = userFoodActions.reduce((sum, action) => 
    sum + (action.metadata?.homeGrownFoodAction?.quantity || 0), 0
  )
  const totalPointsEarned = userFoodActions.reduce((sum, action) => sum + action.pointsEarned, 0)
  const uniqueCropTypes = new Set(userFoodActions.map(action => 
    action.metadata?.homeGrownFoodAction?.cropType
  )).size

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Carrot className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Crops Grown</p>
                <p className="text-2xl font-bold text-green-400">{totalCropsGrown}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Crop Varieties</p>
                <p className="text-2xl font-bold text-blue-400">{uniqueCropTypes}</p>
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

      {/* Popular Crops Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5" />
            <span>Popular Crops to Grow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {popularCrops.map((crop) => (
              <div 
                key={crop.name}
                className="flex flex-col items-center p-3 border rounded-lg hover:border-green-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, cropType: crop.name }))}
              >
                <div className="text-2xl mb-2">{crop.icon}</div>
                <p className="font-medium text-sm text-center">{crop.name}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {crop.basePoints} pts
                </Badge>
                <Badge variant="outline" className="mt-1 text-xs">
                  {crop.difficulty}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Record New Harvest Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
          size="lg"
        >
          <Carrot className="mr-2 h-5 w-5" />
          Record Harvest
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-5 w-5" />
              <span>Record Home Grown Food</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Input
                    id="cropType"
                    value={formData.cropType}
                    onChange={(e) => setFormData(prev => ({ ...prev, cropType: e.target.value }))}
                    placeholder="e.g., Tomatoes, Lettuce, Carrots"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Harvested</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      quantity: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Number of items/plants"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="growthDuration">Growth Duration (Days)</Label>
                  <Input
                    id="growthDuration"
                    type="number"
                    min="1"
                    value={formData.growthDuration}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      growthDuration: parseInt(e.target.value) || 30 
                    }))}
                    placeholder="Days from seed to harvest"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Harvest Date</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.harvestDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.harvestDate}
                        onSelect={(date) => {
                          if (date) {
                            setFormData(prev => ({ ...prev, harvestDate: date }))
                            setCalendarOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seedsShared">Seeds Shared</Label>
                  <Input
                    id="seedsShared"
                    type="number"
                    min="0"
                    value={formData.seedsShared}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      seedsShared: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Number of seeds shared with others"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="organicCertified"
                    checked={formData.organicCertified}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, organicCertified: checked }))}
                  />
                  <Label htmlFor="organicCertified" className="flex items-center space-x-2">
                    <span>Grown organically (no pesticides/chemicals)</span>
                    <Badge variant="secondary" className="text-xs">+30% bonus</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="knowledgeShared"
                    checked={formData.knowledgeShared}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, knowledgeShared: checked }))}
                  />
                  <Label htmlFor="knowledgeShared" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Shared growing knowledge with community</span>
                    <Badge variant="secondary" className="text-xs">+50 pts</Badge>
                  </Label>
                </div>
              </div>

              {/* Estimated Reward Display */}
              <Card className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 border-green-500/30">
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
                    Base: {formData.quantity * 10} pts + Duration: {Math.floor(formData.growthDuration * 0.5)} pts
                    {formData.organicCertified && ' + Organic: 30% bonus'}
                    {formData.seedsShared > 0 && ` + Seeds shared: ${formData.seedsShared * 5} pts`}
                    {formData.knowledgeShared && ' + Knowledge shared: 50 pts'}
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
                  className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
                >
                  {submitting ? 'Recording...' : 'Record Harvest'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Harvests */}
      {userFoodActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Harvests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userFoodActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌱</div>
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
                      {action.metadata?.homeGrownFoodAction?.organicCertified && (
                        <Badge variant="secondary" className="text-xs">Organic</Badge>
                      )}
                      {action.metadata?.homeGrownFoodAction?.knowledgeShared && (
                        <Share2 className="h-3 w-3 text-blue-400" />
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