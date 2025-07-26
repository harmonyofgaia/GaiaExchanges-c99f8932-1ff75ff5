import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Bug, 
  Home, 
  Trophy, 
  Coins,
  Calendar as CalendarIcon,
  CheckCircle,
  TrendingUp,
  BookOpen,
  MapPin,
  Wrench
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface BeeHotelFormData {
  hotelType: 'bamboo' | 'wood_block' | 'clay' | 'mixed_materials'
  size: 'small' | 'medium' | 'large'
  location: string
  installDate: Date
  occupancyRate: number
  maintenanceDone: boolean
  educationalContent: boolean
}

export function BeeHotelActions() {
  const { recordBeeHotel, activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<BeeHotelFormData>({
    hotelType: 'bamboo',
    size: 'small',
    location: '',
    installDate: new Date(),
    occupancyRate: 0,
    maintenanceDone: false,
    educationalContent: false
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const hotelTypes = [
    {
      value: 'bamboo',
      label: 'Bamboo Tubes',
      description: 'Natural bamboo tubes for solitary bees',
      icon: '🎋',
      difficulty: 'Easy',
      multiplier: 1.0
    },
    {
      value: 'wood_block',
      label: 'Drilled Wood Block',
      description: 'Hardwood block with drilled holes',
      icon: '🪵',
      difficulty: 'Medium',
      multiplier: 1.2
    },
    {
      value: 'clay',
      label: 'Clay Tubes',
      description: 'Fired clay tubes for specialized bees',
      icon: '🏺',
      difficulty: 'Hard',
      multiplier: 1.4
    },
    {
      value: 'mixed_materials',
      label: 'Mixed Materials',
      description: 'Combination of different nesting materials',
      icon: '🏗️',
      difficulty: 'Expert',
      multiplier: 1.6
    }
  ]

  const sizeOptions = [
    { value: 'small', label: 'Small (< 50 holes)', multiplier: 1.0, basePoints: 200 },
    { value: 'medium', label: 'Medium (50-150 holes)', multiplier: 1.5, basePoints: 300 },
    { value: 'large', label: 'Large (150+ holes)', multiplier: 2.0, basePoints: 500 }
  ]

  const calculateEstimatedReward = () => {
    const selectedType = hotelTypes.find(t => t.value === formData.hotelType)
    const selectedSize = sizeOptions.find(s => s.value === formData.size)
    
    const basePoints = selectedSize?.basePoints || 200
    const occupancyBonus = Math.floor(formData.occupancyRate * 2)
    const maintenanceBonus = formData.maintenanceDone ? 100 : 0
    const educationBonus = formData.educationalContent ? 150 : 0
    const typeMultiplier = selectedType?.multiplier || 1.0
    const sizeMultiplier = selectedSize?.multiplier || 1.0
    
    const total = Math.floor((basePoints + occupancyBonus + maintenanceBonus + educationBonus) * typeMultiplier * sizeMultiplier * 1.5)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.location) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      await recordBeeHotel(formData)
      toast.success('Bee hotel recorded successfully! 🐝', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        hotelType: 'bamboo',
        size: 'small',
        location: '',
        installDate: new Date(),
        occupancyRate: 0,
        maintenanceDone: false,
        educationalContent: false
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record bee hotel')
    } finally {
      setSubmitting(false)
    }
  }

  const userBeeActions = activities.filter(a => a.type === 'bee_hotel')
  const totalBeeHotels = userBeeActions.length
  const totalPointsEarned = userBeeActions.reduce((sum, action) => sum + action.pointsEarned, 0)
  const averageOccupancy = userBeeActions.reduce((sum, action) => 
    sum + (action.metadata?.beeHotelAction?.occupancyRate || 0), 0
  ) / (userBeeActions.length || 1)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bug className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Bee Hotels</p>
                <p className="text-2xl font-bold text-yellow-400">{totalBeeHotels}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Occupancy</p>
                <p className="text-2xl font-bold text-orange-400">{Math.round(averageOccupancy)}%</p>
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

      {/* Bee Hotel Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Bee Hotel Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelTypes.map((type) => (
              <div 
                key={type.value}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:border-yellow-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, hotelType: type.value as any }))}
              >
                <div className="text-2xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{type.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {type.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {type.multiplier}x multiplier
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card className="border-blue-500/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Bug className="h-5 w-5 text-yellow-400" />
                <span>Why Bee Hotels Matter</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Support native solitary bee populations</li>
                <li>• Increase pollination for plants and crops</li>
                <li>• Help maintain biodiversity in urban areas</li>
                <li>• Provide nesting sites for beneficial insects</li>
                <li>• Easy to maintain and cost-effective</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                <span>Installation Tips</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Face southeast for morning sun</li>
                <li>• Mount 3-6 feet off the ground</li>
                <li>• Protect from rain and strong winds</li>
                <li>• Place near flowering plants</li>
                <li>• Clean out tubes annually</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record New Bee Hotel Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          size="lg"
        >
          <Bug className="mr-2 h-5 w-5" />
          Record Bee Hotel
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Record Bee Hotel Creation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelType">Hotel Type</Label>
                  <Select 
                    value={formData.hotelType} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, hotelType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hotel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotelTypes.map((type) => (
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
                  <Label htmlFor="size">Hotel Size</Label>
                  <Select 
                    value={formData.size} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Backyard garden, School courtyard"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Installation Date</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.installDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.installDate}
                        onSelect={(date) => {
                          if (date) {
                            setFormData(prev => ({ ...prev, installDate: date }))
                            setCalendarOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupancyRate">Current Occupancy Rate (%)</Label>
                  <Input
                    id="occupancyRate"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.occupancyRate}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      occupancyRate: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="0-100"
                  />
                  <Progress value={formData.occupancyRate} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenanceDone"
                    checked={formData.maintenanceDone}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, maintenanceDone: checked }))}
                  />
                  <Label htmlFor="maintenanceDone" className="flex items-center space-x-2">
                    <Wrench className="h-4 w-4" />
                    <span>Regular maintenance performed</span>
                    <Badge variant="secondary" className="text-xs">+100 pts</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="educationalContent"
                    checked={formData.educationalContent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, educationalContent: checked }))}
                  />
                  <Label htmlFor="educationalContent" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Created educational content about bee hotels</span>
                    <Badge variant="secondary" className="text-xs">+150 pts</Badge>
                  </Label>
                </div>
              </div>

              {/* Estimated Reward Display */}
              <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estimated Reward
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="text-lg font-bold text-yellow-400">
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
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  {submitting ? 'Recording...' : 'Record Bee Hotel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Bee Hotels */}
      {userBeeActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Bee Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userBeeActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🐝</div>
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
                      {action.metadata?.beeHotelAction?.maintenanceDone && (
                        <Wrench className="h-3 w-3 text-blue-400" />
                      )}
                      {action.metadata?.beeHotelAction?.educationalContent && (
                        <BookOpen className="h-3 w-3 text-green-400" />
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