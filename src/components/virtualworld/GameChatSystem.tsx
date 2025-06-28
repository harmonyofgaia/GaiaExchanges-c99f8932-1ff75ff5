import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GoogleAuthenticator } from '@/components/auth/GoogleAuthenticator'
import { 
  MessageCircle, 
  Send, 
  Users, 
  Shield,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  type: 'message' | 'system' | 'private'
  avatar: string
}

interface GameChatSystemProps {
  activeUsers: number
}

export function GameChatSystem({ activeUsers }: GameChatSystemProps) {
  const [chatVerified, setChatVerified] = useState(false)
  const [showGoogleAuth, setShowGoogleAuth] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'System',
      message: 'Welcome to GAIA Virtual World! 🌍 - Please verify with Google Authenticator for secure chat access',
      timestamp: new Date(),
      type: 'system',
      avatar: '🤖'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [adminMode, setAdminMode] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const onlineUsers = [
    { name: 'You', status: 'online', avatar: '🧑‍💼' },
    { name: 'Alice', status: 'online', avatar: '👩‍🎨' },
    { name: 'Bob', status: 'online', avatar: '👨‍💻' },
    { name: 'Charlie', status: 'away', avatar: '👨‍🔬' },
    { name: 'Diana', status: 'online', avatar: '👩‍💼' }
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleChatVerification = () => {
    setShowGoogleAuth(true)
    toast.info('🔐 Google Authenticator Required', {
      description: 'Secure chat access requires 2FA verification',
      duration: 4000
    })
  }

  const handleAuthSuccess = () => {
    setChatVerified(true)
    setShowGoogleAuth(false)
    
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'System',
      message: '✅ Chat access verified! Welcome to secure GAIA Virtual World chat! 🎮',
      timestamp: new Date(),
      type: 'system',
      avatar: '🔐'
    }
    
    setMessages(prev => [...prev, welcomeMessage])
    
    toast.success('🎉 Chat Access Granted!', {
      description: 'You can now chat securely in the virtual world',
      duration: 5000
    })
  }

  const sendMessage = () => {
    if (!chatVerified) {
      toast.error('🔒 Verification Required', {
        description: 'Please verify with Google Authenticator to send messages',
        duration: 4000
      })
      return
    }

    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'message',
      avatar: '🧑‍💼'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    toast.success('💬 Message sent securely!')

    setTimeout(() => {
      const responses = [
        'That\'s awesome! 😊',
        'Totally agree! 👍', 
        'Nice point! 🤔',
        'Let\'s explore together! 🎮'
      ]
      
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user: 'Alice',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'message',
        avatar: '👩‍🎨'
      }
      
      setMessages(prev => [...prev, responseMessage])
    }, 2000)
  }

  const toggleVoiceChat = () => {
    if (!chatVerified) {
      toast.error('🔒 Verification Required for Voice Chat')
      return
    }
    setVoiceEnabled(!voiceEnabled)
    toast.success(voiceEnabled ? '🔇 Voice chat disabled' : '🔊 Voice chat enabled')
  }

  const toggleMicrophone = () => {
    if (!chatVerified) {
      toast.error('🔒 Verification Required for Microphone')
      return
    }
    setMicEnabled(!micEnabled)
    toast.success(micEnabled ? '🎙️ Microphone off' : '🎙️ Microphone on')
  }

  const handleAdminAccess = () => {
    toast.info('🔐 Admin verification required - redirecting to security panel')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-600'
      case 'high': return 'text-orange-400 bg-orange-600'
      case 'medium': return 'text-yellow-400 bg-yellow-600'
      default: return 'text-blue-400 bg-blue-600'
    }
  }

  if (showGoogleAuth) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-blue-400 text-center">
              🔐 Virtual World Chat Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleAuthenticator
              onSetupComplete={() => handleAuthSuccess()}
              onVerificationSuccess={() => handleAuthSuccess()}
              userEmail="virtualworld@cultureofharmony.net"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Main Chat Area */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-blue-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Global Chat - GAIA Virtual World
                {chatVerified ? (
                  <Badge className="bg-green-600 ml-2">
                    <Shield className="h-3 w-3 mr-1" />
                    VERIFIED
                  </Badge>
                ) : (
                  <Badge className="bg-red-600 ml-2">
                    <Lock className="h-3 w-3 mr-1" />
                    LOCKED
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {!chatVerified && (
                  <Button
                    size="sm"
                    onClick={handleChatVerification}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Verify Chat
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={toggleVoiceChat}
                  variant={voiceEnabled ? "default" : "outline"}
                  disabled={!chatVerified}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={toggleMicrophone}
                  variant={micEnabled ? "destructive" : "outline"}
                  disabled={!chatVerified}
                >
                  {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAdminAccess}
                  variant="outline"
                >
                  <Shield className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="flex gap-3">
                    <div className="text-2xl">{message.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${
                          message.type === 'system' ? 'text-yellow-400' :
                          message.user === 'You' ? 'text-green-400' : 'text-blue-400'
                        }`}>
                          {message.user}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'private' && (
                          <Badge className="bg-purple-600 text-xs">Private</Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        message.type === 'system' ? 'text-yellow-200 italic' : 'text-gray-200'
                      }`}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={chatVerified ? "Type your message... (Press Enter to send)" : "🔒 Verify with Google Authenticator to chat"}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
                disabled={!chatVerified}
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim() || !chatVerified}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Voice Chat Status */}
            {voiceEnabled && chatVerified && (
              <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Volume2 className="h-4 w-4" />
                  Voice Chat Active - {micEnabled ? 'Microphone On' : 'Listening Only'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <div>
        <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Users className="h-5 w-5" />
              Online Users ({activeUsers})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-black/20">
                  <div className="text-xl">{user.avatar}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <span className="text-xs text-muted-foreground">{user.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Security Info */}
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <Shield className="h-4 w-4" />
                Security Protection Active
              </div>
              <p className="text-xs text-muted-foreground">
                All chats are encrypted and monitored by GAIA Exotic Defense System. 
                Google Authenticator verification required for chat access control.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
