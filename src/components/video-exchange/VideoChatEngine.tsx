import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { 
  MessageCircle, Users, Settings, Shield, Ban, Flag, 
  Pin, Reply, Trash2, Heart, ThumbsUp, Star, Leaf,
  Send, Smile, AlertTriangle, CheckCircle, Volume2, VolumeX
} from 'lucide-react'

interface ChatRoom {
  id: string
  name: string
  description: string
  participants: number
  isLive: boolean
  moderators: string[]
  rules: string[]
}

interface ChatMessage {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    role: 'viewer' | 'moderator' | 'creator' | 'admin'
    badges: string[]
  }
  content: string
  timestamp: string
  type: 'message' | 'system' | 'reaction' | 'support'
  replies?: ChatMessage[]
  isPinned?: boolean
  reactions: {
    likes: number
    hearts: number
    greenHearts: number
    hasLiked: boolean
    hasHearted: boolean
    hasGreenHearted: boolean
  }
}

interface ModerationAction {
  id: string
  type: 'mute' | 'ban' | 'warning' | 'delete'
  userId: string
  reason: string
  duration?: string
  moderator: string
  timestamp: string
}

export function VideoChatEngine() {
  const [selectedRoom, setSelectedRoom] = useState<string>('main')
  const [newMessage, setNewMessage] = useState('')
  const [showModerationTools, setShowModerationTools] = useState(false)
  const [muteSound, setMuteSound] = useState(false)
  const [enableAIModeration, setEnableAIModeration] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: 'main',
      name: 'Main Chat',
      description: 'General discussion about the video',
      participants: 247,
      isLive: true,
      moderators: ['mod1', 'mod2'],
      rules: ['Be respectful', 'No spam', 'Stay on topic', 'Support green initiatives']
    },
    {
      id: 'questions',
      name: 'Q&A',
      description: 'Ask questions to the creator',
      participants: 89,
      isLive: true,
      moderators: ['mod1'],
      rules: ['Questions only', 'One question at a time']
    },
    {
      id: 'eco-tips',
      name: 'Eco Tips',
      description: 'Share environmental tips and advice',
      participants: 156,
      isLive: true,
      moderators: ['mod2'],
      rules: ['Share verified tips only', 'No misinformation']
    }
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'EcoWarrior_Sarah',
        avatar: '/api/placeholder/32/32',
        role: 'creator',
        badges: ['🌱 Creator', '✓ Verified']
      },
      content: 'Welcome everyone! Excited to share these sustainability tips with you all! 🌍',
      timestamp: '5 minutes ago',
      type: 'message',
      isPinned: true,
      reactions: { likes: 45, hearts: 23, greenHearts: 67, hasLiked: false, hasHearted: false, hasGreenHearted: true }
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'GreenThumb_Mike',
        avatar: '/api/placeholder/32/32',
        role: 'moderator',
        badges: ['🛡️ Mod', '💚 Green Champion']
      },
      content: 'Remember to keep the chat respectful and on-topic. Let\'s learn together! 🌿',
      timestamp: '4 minutes ago',
      type: 'message',
      reactions: { likes: 12, hearts: 8, greenHearts: 15, hasLiked: true, hasHearted: false, hasGreenHearted: false }
    },
    {
      id: '3',
      user: {
        id: 'user3',
        name: 'ClimateActivist_Lisa',
        avatar: '/api/placeholder/32/32',
        role: 'viewer',
        badges: ['🌍 Earth Defender']
      },
      content: 'Just switched to solar panels last month! The impact on my carbon footprint has been amazing.',
      timestamp: '3 minutes ago',
      type: 'message',
      reactions: { likes: 28, hearts: 15, greenHearts: 42, hasLiked: false, hasHearted: false, hasGreenHearted: false },
      replies: [
        {
          id: '3-1',
          user: {
            id: 'user4',
            name: 'SolarExpert_Tom',
            avatar: '/api/placeholder/32/32',
            role: 'viewer',
            badges: ['⚡ Energy Expert']
          },
          content: 'That\'s fantastic! What was your setup cost if you don\'t mind me asking?',
          timestamp: '2 minutes ago',
          type: 'message',
          reactions: { likes: 5, hearts: 2, greenHearts: 8, hasLiked: false, hasHearted: false, hasGreenHearted: false }
        }
      ]
    },
    {
      id: '4',
      user: {
        id: 'system',
        name: 'GAiA System',
        avatar: '/api/placeholder/32/32',
        role: 'admin',
        badges: ['🤖 AI Moderator']
      },
      content: 'AI Moderation: Detected and removed spam message. Community standards maintained.',
      timestamp: '2 minutes ago',
      type: 'system',
      reactions: { likes: 8, hearts: 3, greenHearts: 12, hasLiked: false, hasHearted: false, hasGreenHearted: false }
    },
    {
      id: '5',
      user: {
        id: 'user5',
        name: 'ZeroWaste_Jenny',
        avatar: '/api/placeholder/32/32',
        role: 'viewer',
        badges: ['♻️ Zero Waste Hero']
      },
      content: 'Amazing video! Just donated 100 GAiA tokens to the reforestation project 🌳',
      timestamp: '1 minute ago',
      type: 'support',
      reactions: { likes: 34, hearts: 28, greenHearts: 89, hasLiked: false, hasHearted: true, hasGreenHearted: false }
    }
  ])

  const [moderationActions] = useState<ModerationAction[]>([
    {
      id: '1',
      type: 'delete',
      userId: 'spam_user',
      reason: 'Spam content detected by AI',
      moderator: 'AI System',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      type: 'warning',
      userId: 'rude_user',
      reason: 'Inappropriate language',
      moderator: 'GreenThumb_Mike',
      timestamp: '5 minutes ago'
    }
  ])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage = {
        id: Date.now().toString(), // Generate a unique ID
        content: newMessage,
        sender: 'current_user', // Replace with actual sender info
        timestamp: new Date().toISOString(),
        replyingTo: replyingTo ? replyingTo.id : null,
      }
      setChatMessages((prevMessages) => [...prevMessages, newChatMessage])
      console.log('Sending message:', newMessage)
      if (replyingTo) {
        console.log('Replying to:', replyingTo)
        setReplyingTo(null)
      }
      setNewMessage('')
    }
  }

  const handleReaction = (messageId: string, type: 'like' | 'heart' | 'greenHeart') => {
    console.log(`Reacting to ${messageId} with ${type}`)
  }

  const handleModeration = (action: string, messageId: string, userId: string) => {
    console.log(`Moderation action: ${action} on message ${messageId} by user ${userId}`)
  }

  const togglePin = (messageId: string) => {
    console.log(`Toggling pin for message ${messageId}`)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'creator': return 'text-yellow-400'
      case 'moderator': return 'text-blue-400'
      case 'admin': return 'text-red-400'
      default: return 'text-foreground'
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'creator': return 'bg-yellow-600'
      case 'moderator': return 'bg-blue-600'
      case 'admin': return 'bg-red-600'
      default: return 'bg-secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-teal-500/30 bg-gradient-to-r from-teal-900/20 to-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-teal-400" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-teal-400">Chat Engine & Social Features</h2>
              <p className="text-teal-300">Threaded comments, live chat, AI moderation, and community interaction</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-semibold">
                  {chatRooms.find(r => r.id === selectedRoom)?.participants || 0} online
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Rooms List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chat Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chatRooms.map((room) => (
                <Card 
                  key={room.id}
                  className={`cursor-pointer transition-all hover:border-teal-500/50 ${
                    selectedRoom === room.id ? 'border-teal-500/70 bg-teal-900/10' : ''
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{room.name}</h4>
                      {room.isLive && (
                        <Badge className="bg-red-600 text-xs">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {room.participants} participants
                      </span>
                      <div className="flex gap-1">
                        {room.moderators.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Moderated
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Chat Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sound notifications</span>
                    <Switch 
                      checked={!muteSound} 
                      onCheckedChange={(checked) => setMuteSound(!checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Moderation</span>
                    <Switch 
                      checked={enableAIModeration} 
                      onCheckedChange={setEnableAIModeration}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Moderation Tools</span>
                    <Switch 
                      checked={showModerationTools} 
                      onCheckedChange={setShowModerationTools}
                    />
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {chatRooms.find(r => r.id === selectedRoom)?.name || 'Chat'}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {chatRooms.find(r => r.id === selectedRoom)?.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {enableAIModeration && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      AI Protected
                    </Badge>
                  )}
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {/* Main Message */}
                    <div className={`flex gap-3 ${message.isPinned ? 'bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3' : ''}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {message.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        {/* User Info */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold text-sm ${getRoleColor(message.user.role)}`}>
                            {message.user.name}
                          </span>
                          
                          {message.user.badges.map((badge, index) => (
                            <Badge 
                              key={index} 
                              className={`text-xs ${getRoleBadgeColor(message.user.role)}`}
                            >
                              {badge}
                            </Badge>
                          ))}
                          
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          
                          {message.isPinned && (
                            <Pin className="h-3 w-3 text-yellow-400" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className={`text-sm mb-2 ${
                          message.type === 'system' ? 'text-blue-400 italic' :
                          message.type === 'support' ? 'text-green-400 font-medium' : ''
                        }`}>
                          {replyingTo === message.id && (
                            <div className="bg-muted/50 p-2 rounded mb-2 text-xs">
                              Replying to {message.user.name}...
                            </div>
                          )}
                          {message.content}
                        </div>

                        {/* Reactions */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 px-2 ${message.reactions.hasLiked ? 'text-blue-400' : ''}`}
                              onClick={() => handleReaction(message.id, 'like')}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {message.reactions.likes}
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 px-2 ${message.reactions.hasHearted ? 'text-red-400' : ''}`}
                              onClick={() => handleReaction(message.id, 'heart')}
                            >
                              <Heart className="h-3 w-3 mr-1" />
                              {message.reactions.hearts}
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 px-2 ${message.reactions.hasGreenHearted ? 'text-green-400' : ''}`}
                              onClick={() => handleReaction(message.id, 'greenHeart')}
                            >
                              <Leaf className="h-3 w-3 mr-1" />
                              {message.reactions.greenHearts}
                            </Button>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2"
                              onClick={() => setReplyingTo(message.id)}
                            >
                              <Reply className="h-3 w-3 mr-1" />
                              Reply
                            </Button>

                            {showModerationTools && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-yellow-400"
                                  onClick={() => togglePin(message.id)}
                                >
                                  <Pin className="h-3 w-3" />
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-red-400"
                                  onClick={() => handleModeration('delete', message.id, message.user.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-orange-400"
                                  onClick={() => handleModeration('flag', message.id, message.user.id)}
                                >
                                  <Flag className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Replies */}
                        {message.replies && message.replies.length > 0 && (
                          <div className="mt-3 ml-4 border-l border-muted pl-4 space-y-2">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-2">
                                <Avatar className="h-6 w-6 flex-shrink-0">
                                  <AvatarImage src={reply.user.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {reply.user.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-semibold text-xs ${getRoleColor(reply.user.role)}`}>
                                      {reply.user.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                  </div>
                                  <div className="text-sm">{reply.content}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              {replyingTo && (
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded mb-2">
                  <span className="text-sm">
                    Replying to {chatMessages.find(m => m.id === replyingTo)?.user.name}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                    ×
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setNewMessage(newMessage + '👍')}>
                  👍
                </Button>
                <Button size="sm" variant="outline" onClick={() => setNewMessage(newMessage + '💚')}>
                  💚
                </Button>
                <Button size="sm" variant="outline" onClick={() => setNewMessage(newMessage + '🌱')}>
                  🌱
                </Button>
                <Button size="sm" variant="outline" onClick={() => setNewMessage(newMessage + '🌍')}>
                  🌍
                </Button>
                <Button size="sm" variant="outline" onClick={() => setNewMessage(newMessage + '✨')}>
                  ✨
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Moderation Panel */}
      {showModerationTools && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Moderation Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {moderationActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div className="flex items-center gap-3">
                    <Badge className={
                      action.type === 'ban' ? 'bg-red-600' :
                      action.type === 'mute' ? 'bg-orange-600' :
                      action.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                    }>
                      {action.type.toUpperCase()}
                    </Badge>
                    <span className="text-sm">
                      <strong>{action.userId}</strong> - {action.reason}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    by {action.moderator} • {action.timestamp}
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