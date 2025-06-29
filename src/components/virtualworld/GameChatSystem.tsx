
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, Users, Globe, Heart, Flame, Crown, Star, Shield, Zap } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface GameChatSystemProps {
  activeUsers: number
}

interface ChatMessage {
  id: number
  user: string
  message: string
  timestamp: Date
  type: 'message' | 'action' | 'system' | 'emote' | 'trade'
  tokensBurned?: number
  userLevel?: number
  userBadge?: string
  avatar?: string
}

interface OnlineUser {
  name: string
  level: number
  badge: string
  room: string
  status: 'online' | 'away' | 'busy'
  avatar: string
}

export function GameChatSystem({ activeUsers }: GameChatSystemProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: 'EcoWarrior123',
      message: 'Just burned 50 tokens to plant virtual trees! 🌱 Anyone want to join my environmental quest?',
      timestamp: new Date(Date.now() - 300000),
      type: 'action',
      tokensBurned: 50,
      userLevel: 47,
      userBadge: 'Dragon Master',
      avatar: '🌱'
    },
    {
      id: 2,
      user: 'OceanGuardian',
      message: 'Amazing virtual coral reef restoration happening in the Ocean Paradise! Come check it out!',
      timestamp: new Date(Date.now() - 240000),
      type: 'message',
      userLevel: 32,
      userBadge: 'Ocean Protector',
      avatar: '🌊'
    },
    {
      id: 3,
      user: 'System',
      message: 'Global Token Burning Event completed! 2,500 GAIA tokens burned for environmental projects. Next event in 2 hours!',
      timestamp: new Date(Date.now() - 180000),
      type: 'system'
    },
    {
      id: 4,
      user: 'DragonMaster99',
      message: '*waves* Hey everyone! My dragon just evolved to Ancient level! 🐉',
      timestamp: new Date(Date.now() - 120000),
      type: 'emote',
      userLevel: 85,
      userBadge: 'Ancient Dragon',
      avatar: '🐉'
    },
    {
      id: 5,
      user: 'GreenThumb',
      message: 'WTS: Legendary Volcanic Landscape NFT - 500 GAIA tokens OBO 🔥',
      timestamp: new Date(Date.now() - 60000),
      type: 'trade',
      userLevel: 28,
      userBadge: 'Landscape Artist',
      avatar: '🎨'
    }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('Main Lobby')
  const [onlineUsers] = useState<OnlineUser[]>([
    { name: 'EcoWarrior123', level: 47, badge: 'Dragon Master', room: 'Ocean Paradise', status: 'online', avatar: '🌱' },
    { name: 'OceanGuardian', level: 32, badge: 'Ocean Protector', room: 'Main Lobby', status: 'online', avatar: '🌊' },
    { name: 'ForestProtector', level: 28, badge: 'Tree Planter', room: 'Enchanted Forest', status: 'away', avatar: '🌲' },
    { name: 'ClimateHero', level: 55, badge: 'Climate Warrior', room: 'Main Lobby', status: 'online', avatar: '🌍' },
    { name: 'GreenDragon', level: 72, badge: 'Ancient Dragon', room: 'Volcanic Realm', status: 'busy', avatar: '🐉' },
    { name: 'NatureLover88', level: 19, badge: 'Nature Friend', room: 'Sunrise Valley', status: 'online', avatar: '🦋' },
    { name: 'EarthDefender', level: 61, badge: 'Earth Guardian', room: 'Thunder Plains', status: 'online', avatar: '⚡' },
    { name: 'WildlifeSaver', level: 34, badge: 'Animal Protector', room: 'Arctic Crystal', status: 'away', avatar: '🐻' }
  ])

  const rooms = [
    'Main Lobby', 'Ocean Paradise', 'Enchanted Forest', 'Volcanic Realm', 
    'Thunder Plains', 'Arctic Crystal', 'Sunrise Valley', 'Moonlit Gardens'
  ]

  const quickEmotes = ['👋', '😊', '🌱', '🌊', '🔥', '⚡', '🐉', '❤️', '✨', '🎉']

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]
      const messageTypes = ['action', 'message', 'emote', 'trade']
      const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)]
      
      let randomMessage = ''
      switch (randomType) {
        case 'action':
          const actions = [
            'burned tokens to save ocean animals',
            'planted virtual forest for real environmental impact',
            'completed environmental quest with dragon power',
            'helped restore coral reef through gaming actions',
            'unlocked new landscape with token burning',
            'evolved dragon to next level!'
          ]
          randomMessage = `Just ${actions[Math.floor(Math.random() * actions.length)]} 🌍`
          break
        case 'message':
          const messages = [
            'Anyone want to team up for the next tournament?',
            'Check out my new landscape design!',
            'The weather effects in Thunder Plains are amazing!',
            'Looking for trading partners for rare NFTs',
            'My environmental score just hit 95%!',
            'Dragon evolution is so cool in this game!'
          ]
          randomMessage = messages[Math.floor(Math.random() * messages.length)]
          break
        case 'emote':
          const emotes = [
            '*dances with joy*',
            '*waves to everyone*',
            '*shows off shiny dragon*',
            '*plants a magical tree*',
            '*casts environmental spell*',
            '*celebrates with fireworks*'
          ]
          randomMessage = emotes[Math.floor(Math.random() * emotes.length)]
          break
        case 'trade':
          const trades = [
            'WTS: Epic Mountain Landscape - 200 GAIA',
            'WTB: Dragon Evolution Crystals - paying well!',
            'WTT: Rare Ocean NFT for Forest NFT',
            'Selling: Premium Environmental Tools',
            'LF: Tournament team members!'
          ]
          randomMessage = trades[Math.floor(Math.random() * trades.length)]
          break
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: randomUser.name,
        message: randomMessage,
        timestamp: new Date(),
        type: randomType as any,
        tokensBurned: randomType === 'action' ? Math.floor(Math.random() * 100) + 10 : undefined,
        userLevel: randomUser.level,
        userBadge: randomUser.badge,
        avatar: randomUser.avatar
      }])
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const isEmote = newMessage.startsWith('*') && newMessage.endsWith('*')
      const isTrade = newMessage.toLowerCase().includes('wts') || newMessage.toLowerCase().includes('wtb') || newMessage.toLowerCase().includes('wtt')
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: 'You',
        message: newMessage,
        timestamp: new Date(),
        type: isEmote ? 'emote' : isTrade ? 'trade' : 'message',
        userLevel: 47,
        userBadge: 'Harmony Warrior',
        avatar: '🌟'
      }])
      setNewMessage('')
      
      // Simulate response
      setTimeout(() => {
        if (isEmote) {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            user: 'EcoWarrior123',
            message: '*waves back* Hey there! 👋',
            timestamp: new Date(),
            type: 'emote',
            userLevel: 47,
            userBadge: 'Dragon Master',
            avatar: '🌱'
          }])
        }
      }, 2000)
    }
  }

  const addEmote = (emote: string) => {
    setNewMessage(prev => prev + emote)
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-green-900/30 border-green-500/20'
      case 'system':
        return 'bg-blue-900/30 border-blue-500/20'
      case 'emote':
        return 'bg-purple-900/30 border-purple-500/20'
      case 'trade':
        return 'bg-yellow-900/30 border-yellow-500/20'
      default:
        return 'bg-muted/30 border-muted/20'
    }
  }

  const getUserBadgeIcon = (badge: string) => {
    if (badge.includes('Dragon')) return <Crown className="h-3 w-3 text-purple-400" />
    if (badge.includes('Ocean')) return <Waves className="h-3 w-3 text-blue-400" />
    if (badge.includes('Guardian')) return <Shield className="h-3 w-3 text-green-400" />
    if (badge.includes('Master')) return <Star className="h-3 w-3 text-yellow-400" />
    return <Heart className="h-3 w-3 text-pink-400" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MessageCircle className="h-6 w-6" />
            💬 GAIA Social Hub - Harmony Hotel Style Chat
            <Badge className="bg-green-600 text-white ml-auto">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-sm text-green-400">
              <strong>Powered by GAIA:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Online Users & Rooms */}
        <div className="lg:col-span-1 space-y-4">
          {/* Room Selection */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Virtual Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {rooms.map((room) => (
                <Button
                  key={room}
                  variant={selectedRoom === room ? "default" : "outline"}
                  className={`w-full text-xs justify-start ${selectedRoom === room ? 'bg-purple-600' : ''}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  {room}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Online Users */}
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Online Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {onlineUsers.slice(0, 8).map((user, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="relative">
                          <span className="text-lg">{user.avatar}</span>
                          <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium truncate">{user.name}</span>
                            {getUserBadgeIcon(user.badge)}
                          </div>
                          <div className="text-xs text-muted-foreground">Lv.{user.level}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Chat Messages */}
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-sm">
                Chat Room: {selectedRoom}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 w-full">
                <div className="space-y-3">
                  {messages.slice(-15).map((msg) => (
                    <div key={msg.id} className={`p-3 rounded-lg border ${getMessageStyle(msg.type)}`}>
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0">
                          {msg.avatar && <span className="text-lg">{msg.avatar}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{msg.user}</span>
                            {msg.userLevel && (
                              <Badge className="bg-gray-600 text-white text-xs">
                                Lv.{msg.userLevel}
                              </Badge>
                            )}
                            {msg.userBadge && (
                              <Badge className="bg-purple-600 text-white text-xs flex items-center gap-1">
                                {getUserBadgeIcon(msg.userBadge)}
                                {msg.userBadge}
                              </Badge>
                            )}
                            {msg.type === 'action' && (
                              <Badge className="bg-orange-600 text-white text-xs">
                                <Flame className="h-2 w-2 mr-1" />
                                ACTION
                              </Badge>
                            )}
                            {msg.type === 'trade' && (
                              <Badge className="bg-yellow-600 text-white text-xs">
                                💰 TRADE
                              </Badge>
                            )}
                            {msg.tokensBurned && (
                              <Badge className="bg-green-600 text-white text-xs">
                                {msg.tokensBurned} burned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm break-words">{msg.message}</p>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Emotes */}
          <Card className="border-yellow-500/30">
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm text-muted-foreground">Quick Emotes:</span>
                {quickEmotes.map((emote, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-lg p-1 h-8 w-8"
                    onClick={() => addEmote(emote)}
                  >
                    {emote}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Input */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message... (Use *text* for emotes, WTS/WTB for trades)"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                💡 Tips: Use *action* for emotes • WTS = Want to Sell • WTB = Want to Buy • WTT = Want to Trade
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
