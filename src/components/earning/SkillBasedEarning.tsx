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
  Briefcase, 
  Code, 
  Palette, 
  FileText, 
  MessageSquare,
  GraduationCap,
  Languages,
  Search,
  Trophy, 
  Coins,
  CheckCircle,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Target
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'

interface SkillBasedEarningFormData {
  skillType: 'programming' | 'design' | 'writing' | 'consulting' | 'teaching' | 'translation' | 'research'
  projectTitle: string
  hoursWorked: number
  difficultyLevel: 1 | 2 | 3 | 4 | 5
  qualityRating: number
  clientSatisfaction: number
  ecoImpact: boolean
  projectDescription: string
  skillsUsed: string[]
  deliverables: string[]
}

export function SkillBasedEarning() {
  const { recordSkillBasedWork, activities, loading } = useEarningActivities()
  const [formData, setFormData] = useState<SkillBasedEarningFormData>({
    skillType: 'programming',
    projectTitle: '',
    hoursWorked: 0,
    difficultyLevel: 1,
    qualityRating: 5,
    clientSatisfaction: 5,
    ecoImpact: false,
    projectDescription: '',
    skillsUsed: [],
    deliverables: []
  })
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const skillTypes = [
    {
      value: 'programming',
      label: 'Programming & Development',
      description: 'Software development, web development, mobile apps',
      icon: <Code className="h-5 w-5" />,
      baseRate: 35, // points per hour
      color: 'text-blue-400',
      skills: ['React', 'Node.js', 'Python', 'TypeScript', 'Solidity', 'Mobile Development']
    },
    {
      value: 'design',
      label: 'Design & Creative',
      description: 'UI/UX design, graphic design, branding',
      icon: <Palette className="h-5 w-5" />,
      baseRate: 30,
      color: 'text-purple-400',
      skills: ['UI/UX Design', 'Graphic Design', 'Branding', 'Illustration', 'Video Editing', '3D Modeling']
    },
    {
      value: 'writing',
      label: 'Writing & Content',
      description: 'Technical writing, copywriting, content creation',
      icon: <FileText className="h-5 w-5" />,
      baseRate: 25,
      color: 'text-green-400',
      skills: ['Technical Writing', 'Copywriting', 'Blog Writing', 'Documentation', 'SEO Writing', 'Social Media']
    },
    {
      value: 'consulting',
      label: 'Consulting & Strategy',
      description: 'Business consulting, strategy planning, analysis',
      icon: <MessageSquare className="h-5 w-5" />,
      baseRate: 40,
      color: 'text-orange-400',
      skills: ['Business Strategy', 'Market Analysis', 'Project Management', 'Process Optimization', 'Sustainability Consulting']
    },
    {
      value: 'teaching',
      label: 'Teaching & Training',
      description: 'Online courses, workshops, mentoring',
      icon: <GraduationCap className="h-5 w-5" />,
      baseRate: 28,
      color: 'text-yellow-400',
      skills: ['Course Creation', 'Workshop Facilitation', 'Mentoring', 'Training Materials', 'Educational Technology']
    },
    {
      value: 'translation',
      label: 'Translation & Localization',
      description: 'Language translation, localization services',
      icon: <Languages className="h-5 w-5" />,
      baseRate: 22,
      color: 'text-pink-400',
      skills: ['Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese', 'Italian', 'Dutch']
    },
    {
      value: 'research',
      label: 'Research & Analysis',
      description: 'Market research, data analysis, scientific research',
      icon: <Search className="h-5 w-5" />,
      baseRate: 32,
      color: 'text-cyan-400',
      skills: ['Data Analysis', 'Market Research', 'Scientific Research', 'Statistical Analysis', 'Report Writing']
    }
  ]

  const difficultyLevels = [
    { level: 1, label: 'Basic', description: 'Simple tasks, minimal complexity', multiplier: 1.0 },
    { level: 2, label: 'Intermediate', description: 'Moderate complexity, some challenges', multiplier: 1.3 },
    { level: 3, label: 'Advanced', description: 'Complex requirements, technical challenges', multiplier: 1.6 },
    { level: 4, label: 'Expert', description: 'Highly complex, innovative solutions required', multiplier: 2.0 },
    { level: 5, label: 'Master', description: 'Cutting-edge, industry-leading work', multiplier: 2.5 }
  ]

  const calculateEstimatedReward = () => {
    const selectedSkill = skillTypes.find(s => s.value === formData.skillType)
    const selectedDifficulty = difficultyLevels.find(d => d.level === formData.difficultyLevel)
    
    const basePoints = formData.hoursWorked * (selectedSkill?.baseRate || 25)
    const difficultyBonus = Math.floor(basePoints * ((selectedDifficulty?.multiplier || 1) - 1))
    const qualityBonus = Math.floor(formData.qualityRating * 20)
    const satisfactionBonus = Math.floor(formData.clientSatisfaction * 30)
    const ecoBonus = formData.ecoImpact ? Math.floor(basePoints * 0.5) : 0
    
    const total = Math.floor((basePoints + difficultyBonus + qualityBonus + satisfactionBonus + ecoBonus) * 1.0)
    
    return {
      points: total,
      tokens: Math.floor(total * 0.001 * 1000) / 1000
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.projectTitle || formData.hoursWorked <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      await recordSkillBasedWork(formData)
      toast.success('Skill-based work recorded successfully! 💼', {
        description: `You earned ${calculateEstimatedReward().points} points and ${calculateEstimatedReward().tokens} GAIA tokens`
      })
      setFormData({
        skillType: 'programming',
        projectTitle: '',
        hoursWorked: 0,
        difficultyLevel: 1,
        qualityRating: 5,
        clientSatisfaction: 5,
        ecoImpact: false,
        projectDescription: '',
        skillsUsed: [],
        deliverables: []
      })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to record skill-based work')
    } finally {
      setSubmitting(false)
    }
  }

  const userSkillActions = activities.filter(a => a.type === 'skill_based')
  const totalHours = userSkillActions.reduce((sum, action) => 
    sum + (action.metadata?.skillBasedEarning?.hoursWorked || 0), 0
  )
  const totalProjects = userSkillActions.length
  const totalPointsEarned = userSkillActions.reduce((sum, action) => sum + action.pointsEarned, 0)
  const avgRating = userSkillActions.reduce((sum, action) => 
    sum + (action.metadata?.skillBasedEarning?.qualityRating || 0), 0
  ) / (userSkillActions.length || 1)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Hours Worked</p>
                <p className="text-2xl font-bold text-blue-400">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold text-green-400">{totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-400">{avgRating.toFixed(1)}/10</p>
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

      {/* Skill Types Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Skill Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillTypes.map((skill) => (
              <div 
                key={skill.value}
                className="flex flex-col p-4 border rounded-lg hover:border-blue-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, skillType: skill.value as any }))}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={skill.color}>{skill.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{skill.label}</h3>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {skill.baseRate} pts/hour
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                <div className="flex flex-wrap gap-1">
                  {skill.skills.slice(0, 3).map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                  {skill.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{skill.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Difficulty Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {difficultyLevels.map((level) => (
              <div 
                key={level.level}
                className="text-center p-3 border rounded-lg hover:border-purple-400/50 transition-colors cursor-pointer"
                onClick={() => setFormData(prev => ({ ...prev, difficultyLevel: level.level as any }))}
              >
                <div className="text-lg font-bold mb-1">{level.level}</div>
                <p className="font-medium text-sm">{level.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {level.multiplier}x
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Record New Work Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          size="lg"
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Record Skill-Based Work
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Record Skill-Based Work</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skillType">Skill Type</Label>
                  <Select 
                    value={formData.skillType} 
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, skillType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill type" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillTypes.map((skill) => (
                        <SelectItem key={skill.value} value={skill.value}>
                          <div className="flex items-center space-x-2">
                            {skill.icon}
                            <span>{skill.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle">Project Title</Label>
                  <Input
                    id="projectTitle"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                    placeholder="e.g., E-commerce Website Development"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoursWorked">Hours Worked</Label>
                  <Input
                    id="hoursWorked"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={formData.hoursWorked}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      hoursWorked: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="Total hours worked"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                  <Select 
                    value={formData.difficultyLevel.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, difficultyLevel: parseInt(value) as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.level} value={level.level.toString()}>
                          {level.level} - {level.label} ({level.multiplier}x)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualityRating">Quality Rating (1-10)</Label>
                  <Input
                    id="qualityRating"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.qualityRating}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      qualityRating: parseInt(e.target.value) || 5 
                    }))}
                    placeholder="Self-assessed quality"
                  />
                  <Progress value={formData.qualityRating * 10} className="h-2" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientSatisfaction">Client Satisfaction (1-10)</Label>
                  <Input
                    id="clientSatisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.clientSatisfaction}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      clientSatisfaction: parseInt(e.target.value) || 5 
                    }))}
                    placeholder="Client feedback score"
                  />
                  <Progress value={formData.clientSatisfaction * 10} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe the project, your role, and achievements..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ecoImpact"
                  checked={formData.ecoImpact}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ecoImpact: checked }))}
                />
                <Label htmlFor="ecoImpact" className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Project has environmental/sustainability impact</span>
                  <Badge variant="secondary" className="text-xs">+50% bonus</Badge>
                </Label>
              </div>

              {/* Estimated Reward Display */}
              <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estimated Reward
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="text-lg font-bold text-purple-400">
                        {calculateEstimatedReward().points}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GAIA Tokens</p>
                      <p className="text-lg font-bold text-green-400">
                        {calculateEstimatedReward().tokens}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Base: {formData.hoursWorked * (skillTypes.find(s => s.value === formData.skillType)?.baseRate || 25)} pts
                    + Difficulty: {difficultyLevels.find(d => d.level === formData.difficultyLevel)?.multiplier || 1}x
                    + Quality: {formData.qualityRating * 20} pts
                    + Satisfaction: {formData.clientSatisfaction * 30} pts
                    {formData.ecoImpact && ' + Eco Impact: 50% bonus'}
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
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {submitting ? 'Recording...' : 'Record Work'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Work */}
      {userSkillActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Skill-Based Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userSkillActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💼</div>
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
                      {action.metadata?.skillBasedEarning?.ecoImpact && (
                        <Target className="h-3 w-3 text-green-400" />
                      )}
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs">{action.metadata?.skillBasedEarning?.qualityRating}/10</span>
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