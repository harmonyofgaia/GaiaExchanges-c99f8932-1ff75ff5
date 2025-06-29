
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, Users, Globe, Heart, Flame } from 'lucide-react'

interface GameChatSystemProps {
  activeUsers: number
}

interface ChatMessage {
  id: number
  user: string
  message: string
  timestamp: Date
  type: 'message' | 'action' | 'system'
  tokensBurned?: number
}

export function GameChatSystem({ activeUsers }: GameChatSystemProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: 'EcoWarrior123',
      message: 'Just burned 50 tokens to plant virtual trees! 🌱',
      timestamp: new Date(Date.now() - 300000),
      type: 'action',
      tokensBurned: 50
    },
    {
      id: 2,
      user: 'OceanGuardian',
      message: 'Amazing virtual coral reef restoration happening here!',
      timestamp: new Date(Date.now() - 240000),
      type: 'message'
    },
    {
      id: 3,
      user: 'System',
      message: 'Token burning event completed! 2,500 tokens burned for environmental projects.',
      timestamp: new Date(Date.now() - 180000),
      type: 'system'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers] = useState([
    'EcoWarrior123', 'OceanGuardian', 'ForestProtector', 'ClimateHero', 
    'GreenDragon', 'NatureLover88', 'EarthDefender', 'WildlifeSaver'
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]
      const actions = [
        'burned tokens to save ocean animals',
        'planted virtual forest for real environmental impact',
        'completed environmental quest with token burning',
        'helped restore coral reef through gaming actions'
      ]
      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: randomUser,
        message: `Just ${randomAction}! 🌍`,
        timestamp: new Date(),
        type: 'action',
        tokensBurned: Math.floor(Math.random() * 100) + 10
      }])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        timestamp: new Date(),
        type: 'message'
      }])
      setNewMessage('')
    }
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-green-900/30 border-green-500/20'
      case 'system':
        return 'bg-blue-900/30 border-blue-500/20'
      default:
        return 'bg-muted/30 border-muted/20'
    }
  }

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MessageCircle className="h-6 w-6" />
            💬 Global Eco-Gaming Chat
            <Badge className="bg-green-600 text-white ml-auto">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} Online
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Online Users */}
      <Card className="border-purple-500/30">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {onlineUsers.slice(0, 6).map((user, index) => (
              <Badge key={index} className="bg-purple-600 text-white">
                <Globe className="h-3 w-3 mr-1" />
                {user}
              </Badge>
            ))}
            <Badge className="bg-muted text-muted-foreground">
              +{Math.max(0, activeUsers - 6)} more
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="border-green-500/30">
        <CardContent className="pt-4">
          <ScrollArea className="h-64 w-full">
            <div className="space-y-3">
              {messages.slice(-10).map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg border ${getMessageStyle(msg.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{msg.user}</span>
                        {msg.type === 'action' && (
                          <Badge className="bg-orange-600 text-white text-xs">
                            <Flame className="h-2 w-2 mr-1" />
                            ACTION
                          </Badge>
                        )}
                        {msg.tokensBurned && (
                          <Badge className="bg-green-600 text-white text-xs">
                            {msg.tokensBurned} burned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share your eco-gaming experience..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
