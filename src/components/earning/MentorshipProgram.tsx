
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  GraduationCap, 
  Users, 
  Star, 
  BookOpen,
  Award,
  MessageCircle,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'

interface Mentor {
  id: string
  name: string
  expertise: string[]
  rating: number
  studentsHelped: number
  tokensEarned: number
  avatar: string
  status: 'available' | 'busy' | 'offline'
}

interface Student {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  progress: number
  sessionsCompleted: number
  avatar: string
}

interface MentorshipSession {
  id: string
  mentorId: string
  studentId: string
  topic: string
  date: Date
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  tokensEarned: number
}

export function MentorshipProgram() {
  const [userRole, setUserRole] = useState<'mentor' | 'student' | 'both'>('student')
  
  const [mentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'EcoExpert Sarah',
      expertise: ['Solar Energy', 'Sustainable Living', 'Carbon Footprint'],
      rating: 4.9,
      studentsHelped: 47,
      tokensEarned: 2340,
      avatar: '👩‍🔬',
      status: 'available'
    },
    {
      id: '2',
      name: 'GreenGuru Mike',
      expertise: ['Permaculture', 'Waste Reduction', 'Eco Business'],
      rating: 4.8,
      studentsHelped: 32,
      tokensEarned: 1890,
      avatar: '👨‍🌾',
      status: 'busy'
    },
    {
      id: '3',
      name: 'ClimateCoach Anna',
      expertise: ['Climate Science', 'Policy', 'Community Action'],
      rating: 5.0,
      studentsHelped: 28,
      tokensEarned: 1650,
      avatar: '👩‍🎓',
      status: 'available'
    }
  ])

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'EcoNewbie Tom',
      level: 'beginner',
      interests: ['Solar Power', 'Recycling'],
      progress: 25,
      sessionsCompleted: 3,
      avatar: '👨‍💼'
    },
    {
      id: '2',
      name: 'GreenLearner Lisa',
      level: 'intermediate',
      interests: ['Sustainable Food', 'Water Conservation'],
      progress: 60,
      sessionsCompleted: 8,
      avatar: '👩‍💻'
    }
  ])

  const [sessions] = useState<MentorshipSession[]>([
    {
      id: '1',
      mentorId: '1',
      studentId: '1',
      topic: 'Introduction to Solar Energy',
      date: new Date('2024-01-28T14:00:00'),
      duration: 60,
      status: 'scheduled',
      tokensEarned: 50
    },
    {
      id: '2',
      mentorId: '3',
      studentId: '2',
      topic: 'Climate Action Planning',
      date: new Date('2024-01-25T10:00:00'),
      duration: 45,
      status: 'completed',
      tokensEarned: 45
    }
  ])

  const becomeMentor = () => {
    setUserRole('mentor')
    toast.success('🎓 Mentor Application Submitted!', {
      description: 'Your application will be reviewed. Start earning by helping others!',
      duration: 4000
    })
  }

  const bookSession = (mentorId: string) => {
    toast.success('📅 Session Booked!', {
      description: 'Your mentorship session has been scheduled. Check your calendar!',
      duration: 4000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-600'
      case 'busy': return 'bg-yellow-600'
      case 'offline': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-600'
      case 'intermediate': return 'bg-blue-600'
      case 'advanced': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <GraduationCap className="h-6 w-6" />
            🎓 Mentorship Program
            <Badge className="bg-indigo-600">Phase 3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Role Selection */}
          <div className="flex gap-2 mb-6">
            <Button 
              variant={userRole === 'student' ? 'default' : 'outline'}
              onClick={() => setUserRole('student')}
            >
              📚 I want to learn
            </Button>
            <Button 
              variant={userRole === 'mentor' ? 'default' : 'outline'}
              onClick={() => setUserRole('mentor')}
            >
              👨‍🏫 I want to teach
            </Button>
            <Button 
              variant={userRole === 'both' ? 'default' : 'outline'}
              onClick={() => setUserRole('both')}
            >
              🔄 Both
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Mentors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Available Mentors
              </h3>
              
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="border-indigo-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-2xl">{mentor.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{mentor.name}</h4>
                            <Badge className={getStatusColor(mentor.status)}>
                              {mentor.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{mentor.rating}</span>
                            <span className="text-muted-foreground">
                              • {mentor.studentsHelped} students helped
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-muted-foreground mb-1">Expertise:</div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-400 font-medium">
                        +{mentor.tokensEarned} GAiA earned
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => bookSession(mentor.id)}
                        disabled={mentor.status !== 'available'}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Learning Progress / Mentoring Stats */}
            <div className="space-y-4">
              {userRole === 'student' || userRole === 'both' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Your Learning Journey
                  </h3>
                  
                  <Card className="border-green-500/20">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Overall Progress</span>
                          <span className="text-green-400">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Sessions Completed</div>
                            <div className="font-bold text-blue-400">11</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Hours Learned</div>
                            <div className="font-bold text-purple-400">18.5</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null}

              {userRole === 'mentor' || userRole === 'both' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-indigo-400">
                      👨‍🏫 Mentoring Dashboard
                    </h3>
                    {userRole === 'student' && (
                      <Button onClick={becomeMentor} size="sm" className="bg-purple-600">
                        <Award className="h-4 w-4 mr-1" />
                        Become Mentor
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-xl font-bold text-blue-400">8</div>
                      <div className="text-xs text-muted-foreground">Students Mentored</div>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20 text-center">
                      <div className="text-xl font-bold text-green-400">340</div>
                      <div className="text-xs text-muted-foreground">GAiA Earned</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-indigo-400">Recent Students</h4>
                    {students.slice(0, 2).map((student) => (
                      <div key={student.id} className="p-2 bg-muted/20 rounded border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{student.avatar}</span>
                            <span className="text-sm font-medium">{student.name}</span>
                            <Badge className={getLevelColor(student.level)} size="sm">
                              {student.level}
                            </Badge>
                          </div>
                          <span className="text-xs text-green-400">{student.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="mt-6">
            <h4 className="font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Sessions
            </h4>
            <div className="space-y-2">
              {sessions.filter(s => s.status === 'scheduled').map((session) => {
                const mentor = mentors.find(m => m.id === session.mentorId)
                return (
                  <div key={session.id} className="p-3 bg-indigo-900/20 rounded-lg border border-indigo-500/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{session.topic}</div>
                        <div className="text-sm text-muted-foreground">
                          with {mentor?.name} • {session.date.toLocaleDateString()} at {session.date.toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-400">+{session.tokensEarned} GAiA</div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
