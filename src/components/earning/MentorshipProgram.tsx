
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  MessageCircle,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

interface Mentor {
  id: string
  name: string
  expertise: string[]
  rating: number
  students: number
  tokensEarned: number
  level: string
  availability: boolean
}

interface Mentee {
  id: string
  name: string
  joinDate: Date
  progress: number
  currentGoal: string
  tokensEarned: number
}

interface LearningPath {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  reward: number
  completed: boolean
  progress: number
}

export function MentorshipProgram() {
  const [userRole, setUserRole] = useState<'mentor' | 'mentee' | 'both'>('mentee')
  const [mentorEarnings] = useState(580)
  const [studentsHelped] = useState(12)
  const [mentorRating] = useState(4.8)

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah EcoExpert',
      expertise: ['Solar Energy', 'Water Conservation', 'Organic Farming'],
      rating: 4.9,
      students: 45,
      tokensEarned: 2340,
      level: 'Master Mentor',
      availability: true
    },
    {
      id: '2',
      name: 'Mike GreenTech',
      expertise: ['Electric Vehicles', 'Smart Homes', 'Renewable Energy'],
      rating: 4.7,
      students: 32,
      tokensEarned: 1890,
      level: 'Expert Mentor',
      availability: true
    },
    {
      id: '3',
      name: 'Lisa NatureGuide',
      expertise: ['Biodiversity', 'Conservation', 'Eco-Tourism'],
      rating: 4.8,
      students: 28,
      tokensEarned: 1650,
      level: 'Expert Mentor',
      availability: false
    }
  ]

  const myMentees: Mentee[] = [
    {
      id: '1',
      name: 'Alex NewGreen',
      joinDate: new Date('2024-01-15'),
      progress: 65,
      currentGoal: 'Install solar panels',
      tokensEarned: 120
    },
    {
      id: '2',
      name: 'Emma EcoStart',
      joinDate: new Date('2024-01-20'),
      progress: 45,
      currentGoal: 'Start composting system',
      tokensEarned: 85
    },
    {
      id: '3',
      name: 'Jordan Sustainable',
      joinDate: new Date('2024-01-25'),
      progress: 30,
      currentGoal: 'Reduce water usage',
      tokensEarned: 60
    }
  ]

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: '🌱 Sustainable Living Basics',
      description: 'Learn fundamental eco-friendly practices for daily life',
      duration: '4 weeks',
      difficulty: 'Beginner',
      reward: 100,
      completed: false,
      progress: 25
    },
    {
      id: '2',
      title: '⚡ Home Energy Efficiency',
      description: 'Master energy-saving techniques and renewable solutions',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      reward: 200,
      completed: true,
      progress: 100
    },
    {
      id: '3',
      title: '🌊 Water Conservation Expert',
      description: 'Advanced water-saving systems and techniques',
      duration: '8 weeks',
      difficulty: 'Advanced',
      reward: 350,
      completed: false,
      progress: 0
    }
  ]

  const becomeMentor = () => {
    setUserRole('both')
    toast.success('🎓 Welcome to Mentorship!', {
      description: 'You are now eligible to become a mentor. Share your knowledge and earn GAiA tokens!',
      duration: 4000
    })
  }

  const requestMentorship = (mentorId: string) => {
    const mentor = mentors.find(m => m.id === mentorId)
    if (mentor) {
      toast.success('📬 Mentorship Request Sent!', {
        description: `Your request to learn from ${mentor.name} has been sent. They'll respond within 24 hours.`,
        duration: 4000
      })
    }
  }

  const startLearningPath = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId)
    if (path) {
      toast.success('📚 Learning Path Started!', {
        description: `You've started "${path.title}". Complete modules to earn ${path.reward} GAiA tokens!`,
        duration: 4000
      })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600'
      case 'Intermediate': return 'bg-yellow-600'
      case 'Advanced': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Users className="h-6 w-6" />
            🎓 Mentorship Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* User Role Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-muted/30 rounded-lg p-1">
              <Button
                variant={userRole === 'mentee' || userRole === 'both' ? 'default' : 'ghost'}
                onClick={() => setUserRole(userRole === 'mentor' ? 'both' : 'mentee')}
                size="sm"
              >
                👨‍🎓 Find Mentor
              </Button>
              <Button
                variant={userRole === 'mentor' || userRole === 'both' ? 'default' : 'ghost'}
                onClick={userRole === 'mentor' || userRole === 'both' ? undefined : becomeMentor}
                size="sm"
              >
                👨‍🏫 Become Mentor
              </Button>
            </div>
          </div>

          {/* Mentor Stats (if user is mentor) */}
          {(userRole === 'mentor' || userRole === 'both') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{studentsHelped}</div>
                <div className="text-xs text-muted-foreground">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{mentorEarnings}</div>
                <div className="text-xs text-muted-foreground">GAiA Earned</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-yellow-400">{mentorRating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Mentor Rating</div>
              </div>
            </div>
          )}

          {/* Available Mentors */}
          {(userRole === 'mentee' || userRole === 'both') && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4">🌟 Available Mentors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="border-indigo-500/20">
                    <CardContent className="pt-4">
                      <div className="text-center mb-3">
                        <Avatar className="mx-auto mb-2">
                          <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold">{mentor.name}</h4>
                        <Badge className="bg-indigo-600 text-white text-xs">
                          {mentor.level}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.students} students)</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {mentor.expertise.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{mentor.expertise.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        onClick={() => requestMentorship(mentor.id)}
                        disabled={!mentor.availability}
                        className="w-full"
                        size="sm"
                      >
                        {mentor.availability ? '📩 Request Mentorship' : '⏳ Unavailable'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* My Mentees (if user is mentor) */}
          {(userRole === 'mentor' || userRole === 'both') && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">👥 My Mentees</h3>
              <div className="space-y-3">
                {myMentees.map((mentee) => (
                  <Card key={mentee.id} className="border-green-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{mentee.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{mentee.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Current goal: {mentee.currentGoal}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={mentee.progress} className="w-20 h-2" />
                              <span className="text-xs text-muted-foreground">{mentee.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{mentee.tokensEarned}</div>
                          <div className="text-xs text-muted-foreground">Tokens Earned</div>
                          <Button size="sm" variant="outline" className="mt-2">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Learning Paths */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">📚 Learning Paths</h3>
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-blue-500/20">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{path.title}</h4>
                          <Badge className={`${getDifficultyColor(path.difficulty)} text-white text-xs`}>
                            {path.difficulty}
                          </Badge>
                          {path.completed && (
                            <Badge className="bg-green-600 text-white text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {path.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {path.reward} GAiA reward
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} />
                      
                      {!path.completed && (
                        <Button 
                          onClick={() => startLearningPath(path.id)}
                          className="w-full mt-3"
                          size="sm"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          {path.progress > 0 ? 'Continue Learning' : 'Start Learning Path'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
