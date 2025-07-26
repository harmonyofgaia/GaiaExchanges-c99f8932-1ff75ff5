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
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Coins,
  CheckCircle,
  TrendingUp,
  Video,
  FileText,
  Award,
  Clock,
  Target
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'

interface EnvironmentalEducationFormData {
  type: 'course_completion' | 'teaching' | 'content_creation' | 'workshop_attendance' | 'research'
  topic: string
  duration: number
  participants: number
  certificateEarned: boolean
  contentShared: boolean
  impactReported: boolean
}

export function EnvironmentalEducationActions() {
  const { recordEnvironmentalEducation, activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<EnvironmentalEducationFormData>({
    type: 'course_completion',
    topic: '',
    duration: 1,
    participants: 1,
    certificateEarned: false,
    contentShared: false,
    impactReported: false
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const educationTypes = [
    {
      value: 'course_completion',
      label: 'Course Completion',
      description: 'Completed an environmental course or certification',
      icon: '🎓',
      baseMultiplier: 1.2,
      focus: 'Learning'
    },
    {
      value: 'teaching',
      label: 'Teaching',
      description: 'Taught others about environmental topics',
      icon: '👨‍🏫',
      baseMultiplier: 1.8,
      focus: 'Teaching'
    },
    {
      value: 'content_creation',
      label: 'Content Creation',
      description: 'Created educational content (articles, videos, etc.)',
      icon: '📝',
      baseMultiplier: 1.5,
      focus: 'Creating'
    },
    {
      value: 'workshop_attendance',
      label: 'Workshop Attendance',
      description: 'Attended environmental workshops or seminars',
      icon: '🏛️',
      baseMultiplier: 1.0,
      focus: 'Attending'
    },
    {
      value: 'research',
      label: 'Research',
      description: 'Conducted environmental research or studies',
      icon: '🔬',
      baseMultiplier: 2.0,
      focus: 'Research'
    }
  ]

  const popularTopics = [
    { name: 'Climate Change', icon: '🌡️', complexity: 'High' },
    { name: 'Renewable Energy', icon: '☀️', complexity: 'Medium' },
    { name: 'Waste Management', icon: '♻️', complexity: 'Medium' },
    { name: 'Biodiversity', icon: '🦋', complexity: 'High' },
    { name: 'Sustainable Agriculture', icon: '🌾', complexity: 'Medium' },
    { name: 'Water Conservation', icon: '💧', complexity: 'Low' },
    { name: 'Carbon Footprint', icon: '👣', complexity: 'Medium' },
    { name: 'Ecosystem Restoration', icon: '🌲', complexity: 'High' },
    { name: 'Green Technology', icon: '🔋', complexity: 'High' },
    { name: 'Environmental Policy', icon: '📋', complexity: 'High' }
  ]

  const calculateEstimatedReward = () => {
    const selectedType = educationTypes.find(t => t.value === formData.type)
    const basePoints = formData.duration * 10
    const participantBonus = formData.participants * 5
    const certificateBonus = formData.certificateEarned ? 200 : 0
    const sharingBonus = formData.contentShared ? 100 : 0
    const impactBonus = formData.impactReported ? 150 : 0
    const typeMultiplier = selectedType?.baseMultiplier || 1.0
    
    const total = Math.floor((basePoints + participantBonus + certificateBonus + sharingBonus + impactBonus) * typeMultiplier * 1.3)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic || formData.duration <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      await recordEnvironmentalEducation(formData)
      toast.success('Environmental education activity recorded successfully! 🎓', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        type: 'course_completion',
        topic: '',
        duration: 1,
        participants: 1,
        certificateEarned: false,
        contentShared: false,
        impactReported: false
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record environmental education activity')
    } finally {
      setSubmitting(false)
    }
  }

  const userEducationActions = activities.filter(a => a.type === 'environmental_education')
  const totalHours = userEducationActions.reduce((sum, action) => 
    sum + (action.metadata?.environmentalEducationAction?.duration || 0), 0
  )
  const totalParticipants = userEducationActions.reduce((sum, action) => 
    sum + (action.metadata?.environmentalEducationAction?.participants || 0), 0
  )
  const totalPointsEarned = userEducationActions.reduce((sum, action) => sum + action.pointsEarned, 0)
  const certificatesEarned = userEducationActions.filter(action => 
    action.metadata?.environmentalEducationAction?.certificateEarned
  ).length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold text-blue-400">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">People Educated</p>
                <p className="text-2xl font-bold text-green-400">{totalParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold text-yellow-400">{certificatesEarned}</p>
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

      {/* Education Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education Activity Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {educationTypes.map((type) => (
              <div 
                key={type.value}
                className="flex flex-col p-4 border rounded-lg hover:border-blue-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">{type.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{type.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {type.focus}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <Badge variant="outline" className="text-xs self-start">
                  {type.baseMultiplier}x multiplier
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Popular Environmental Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {popularTopics.map((topic) => (
              <div 
                key={topic.name}
                className="flex flex-col items-center p-3 border rounded-lg hover:border-blue-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, topic: topic.name }))}
              >
                <div className="text-2xl mb-2">{topic.icon}</div>
                <p className="font-medium text-sm text-center">{topic.name}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {topic.complexity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Record New Activity Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          size="lg"
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          Record Education Activity
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Record Environmental Education Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Activity Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationTypes.map((type) => (
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
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g., Climate Change, Renewable Energy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration: parseFloat(e.target.value) || 1 
                    }))}
                    placeholder="Hours spent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants">Participants</Label>
                  <Input
                    id="participants"
                    type="number"
                    min="1"
                    value={formData.participants}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      participants: parseInt(e.target.value) || 1 
                    }))}
                    placeholder="Number of people involved/taught"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="certificateEarned"
                    checked={formData.certificateEarned}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, certificateEarned: checked }))}
                  />
                  <Label htmlFor="certificateEarned" className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Earned a certificate or credential</span>
                    <Badge variant="secondary" className="text-xs">+200 pts</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="contentShared"
                    checked={formData.contentShared}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, contentShared: checked }))}
                  />
                  <Label htmlFor="contentShared" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Shared content or knowledge with others</span>
                    <Badge variant="secondary" className="text-xs">+100 pts</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="impactReported"
                    checked={formData.impactReported}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, impactReported: checked }))}
                  />
                  <Label htmlFor="impactReported" className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Reported measurable environmental impact</span>
                    <Badge variant="secondary" className="text-xs">+150 pts</Badge>
                  </Label>
                </div>
              </div>

              {/* Estimated Reward Display */}
              <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estimated Reward
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="text-lg font-bold text-blue-400">
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
                    Base: {formData.duration * 10} pts + Participants: {formData.participants * 5} pts
                    {formData.certificateEarned && ' + Certificate: 200 pts'}
                    {formData.contentShared && ' + Sharing: 100 pts'}
                    {formData.impactReported && ' + Impact: 150 pts'}
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
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {submitting ? 'Recording...' : 'Record Activity'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Activities */}
      {userEducationActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Education Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userEducationActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎓</div>
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
                      {action.metadata?.environmentalEducationAction?.certificateEarned && (
                        <Award className="h-3 w-3 text-yellow-400" />
                      )}
                      {action.metadata?.environmentalEducationAction?.contentShared && (
                        <FileText className="h-3 w-3 text-blue-400" />
                      )}
                      {action.metadata?.environmentalEducationAction?.impactReported && (
                        <Target className="h-3 w-3 text-green-400" />
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