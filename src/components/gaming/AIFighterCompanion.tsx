
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { 
  Brain, 
  Zap, 
  Heart, 
  Star, 
  Target,
  MessageCircle,
  TrendingUp,
  Shield,
  Sword,
  Eye,
  Lightbulb,
  Bot
} from 'lucide-react'
import { toast } from 'sonner'

interface AICompanion {
  name: string
  level: number
  experience: number
  personality: string
  specialization: string
  learningProgress: number
  mood: 'happy' | 'focused' | 'excited' | 'analytical'
}

export function AIFighterCompanion() {
  const [companion, setCompanion] = useState<AICompanion>({
    name: 'ARIA',
    level: 12,
    experience: 2847,
    personality: 'Strategic Mentor',
    specialization: 'Combat Analysis',
    learningProgress: 78,
    mood: 'focused'
  })

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ARIA', message: 'Hello Fighter! I\'ve analyzed your last 50 battles. Your combo timing has improved 23%!', time: '2m ago' },
    { id: 2, sender: 'You', message: 'What should I focus on next?', time: '1m ago' },
    { id: 3, sender: 'ARIA', message: 'Your defense patterns are predictable. Try mixing high and low blocks more randomly. I\'ll help you practice!', time: '30s ago' }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isTraining, setIsTraining] = useState(false)
  const [aiInsights, setAiInsights] = useState([
    { type: 'strength', insight: 'Excellent combo execution in close combat', confidence: 94 },
    { type: 'weakness', insight: 'Vulnerable to aerial attacks from top-left', confidence: 87 },
    { type: 'opportunity', insight: 'Counter-attack timing can be improved by 0.3s', confidence: 92 },
    { type: 'prediction', insight: 'Next opponent likely uses defensive strategy', confidence: 89 }
  ])

  useEffect(() => {
    // Simulate AI learning and adaptation
    const learningInterval = setInterval(() => {
      setCompanion(prev => ({
        ...prev,
        experience: prev.experience + Math.floor(Math.random() * 10) + 5,
        learningProgress: Math.min(100, prev.learningProgress + Math.random() * 2)
      }))

      // AI sends helpful messages occasionally
      if (Math.random() < 0.1) {
        const aiMessages = [
          'I noticed a pattern in enemy movements - want me to show you?',
          'Your reaction time improved by 15ms in the last fight!',
          'I found a weakness in the current meta - shall we exploit it?',
          'Your fighting style is evolving beautifully! Keep it up!',
          'I predict your next opponent will use fire attacks - prepare ice defense!'
        ]
        
        const newMsg = {
          id: Date.now(),
          sender: 'ARIA',
          message: aiMessages[Math.floor(Math.random() * aiMessages.length)],
          time: 'now'
        }
        setChatMessages(prev => [newMsg, ...prev.slice(0, 9)])
      }
    }, 10000)

    return () => clearInterval(learningInterval)
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMsg = {
        id: Date.now(),
        sender: 'You',
        message: newMessage,
        time: 'now'
      }
      setChatMessages(prev => [userMsg, ...prev.slice(0, 9)])
      setNewMessage('')

      // AI responds
      setTimeout(() => {
        const responses = [
          'Great question! Let me analyze that for you...',
          'Based on your fighting pattern, I recommend...',
          'I\'ve been learning your style - here\'s what I found...',
          'That\'s exactly what I was thinking! Let\'s try this approach...',
          'Interesting strategy! I can optimize that for you.'
        ]
        
        const aiResponse = {
          id: Date.now() + 1,
          sender: 'ARIA',
          message: responses[Math.floor(Math.random() * responses.length)],
          time: 'now'
        }
        setChatMessages(prev => [aiResponse, ...prev.slice(0, 9)])
      }, 2000)
    }
  }

  const startAITraining = () => {
    setIsTraining(true)
    toast.success('🤖 AI Training Started!', {
      description: 'ARIA is analyzing your fighting patterns for personalized training!',
      duration: 5000
    })

    setTimeout(() => {
      setIsTraining(false)
      setCompanion(prev => ({
        ...prev,
        level: prev.level + 1,
        learningProgress: Math.min(100, prev.learningProgress + 15)
      }))
      toast.success('🎯 Training Complete!', {
        description: 'ARIA learned new strategies and leveled up!',
        duration: 3000
      })
    }, 8000)
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'focused': return '🤔'
      case 'excited': return '🤩'
      case 'analytical': return '🧠'
      default: return '🤖'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Shield className="h-4 w-4 text-green-400" />
      case 'weakness': return <Target className="h-4 w-4 text-red-400" />
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-blue-400" />
      case 'prediction': return <Eye className="h-4 w-4 text-purple-400" />
      default: return <Lightbulb className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <div className="space-y-6">
      
      {/* AI Companion Header */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-purple-400">
            <Brain className="h-6 w-6" />
            🤖 AI FIGHTER COMPANION - {companion.name}
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-pulse">
              LEARNING
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Companion Avatar & Stats */}
            <div className="text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto border-4 border-purple-500/50">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl font-bold">
                    {companion.name}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white text-xs">
                    Level {companion.level}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{getMoodEmoji(companion.mood)}</span>
                  <span className="text-sm text-muted-foreground capitalize">{companion.mood}</span>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-purple-400">{companion.personality}</div>
                  <div className="text-xs text-muted-foreground">{companion.specialization}</div>
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>AI Learning Progress</span>
                  <span className="text-purple-400">{companion.learningProgress}%</span>
                </div>
                <Progress value={companion.learningProgress} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Experience Points</span>
                  <span className="text-blue-400">{companion.experience.toLocaleString()}</span>
                </div>
                <Progress value={(companion.experience % 1000) / 10} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-green-900/30 rounded text-center">
                  <Zap className="h-4 w-4 text-green-400 mx-auto mb-1" />
                  <div className="text-green-400 font-bold">2,847</div>
                  <div className="text-muted-foreground">Battles Analyzed</div>
                </div>
                <div className="p-2 bg-blue-900/30 rounded text-center">
                  <Star className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                  <div className="text-blue-400 font-bold">94%</div>
                  <div className="text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button 
                onClick={startAITraining}
                disabled={isTraining}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isTraining ? 'Training...' : 'Start AI Training'}
              </Button>
              
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Analyze Last Fight
              </Button>
              
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Get Strategy Tips
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Chat Interface */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              💬 Chat with {companion.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Chat Messages */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg ${
                  msg.sender === 'ARIA' 
                    ? 'bg-purple-900/30 border-l-4 border-purple-500' 
                    : 'bg-blue-900/30 border-l-4 border-blue-500 ml-8'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm flex items-center gap-1">
                      {msg.sender === 'ARIA' && <Bot className="h-3 w-3" />}
                      {msg.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className="text-sm">{msg.message}</div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask ARIA about strategy, tips, or anything..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Dashboard */}
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              🧠 AI Combat Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-black/30 rounded-lg border border-border/30">
                <div className="flex items-start gap-2">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-semibold capitalize">{insight.type}</span>
                      <Badge className="bg-gray-600 text-white text-xs">
                        {insight.confidence}% confident
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{insight.insight}</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
              <div className="text-center">
                <Brain className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-bold text-green-400 mb-1">AI Recommendation</div>
                <div className="text-xs text-muted-foreground">
                  Focus on defensive timing drills for 10 minutes to improve your counter-attack success rate by 18%!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
