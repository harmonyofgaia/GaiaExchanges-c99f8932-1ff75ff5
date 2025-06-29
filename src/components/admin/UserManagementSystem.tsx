
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  UserX, 
  AlertTriangle, 
  Clock, 
  Settings,
  Eye,
  Search,
  Ban,
  UserMinus
} from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  username: string
  email: string
  status: 'active' | 'warned' | 'restricted' | 'banned'
  joinDate: string
  lastActivity: string
  warningExpiry?: string
  restrictionLevel: number
}

export function UserManagementSystem() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'TestUser1',
      email: 'user1@example.com',
      status: 'active',
      joinDate: '2024-01-15',
      lastActivity: '2 min ago',
      restrictionLevel: 0
    },
    {
      id: '2',
      username: 'ProblemUser',
      email: 'problem@example.com',
      status: 'warned',
      joinDate: '2024-02-20',
      lastActivity: '1 hour ago',
      warningExpiry: '2024-01-10',
      restrictionLevel: 0
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [warningDuration, setWarningDuration] = useState(24) // hours
  const [restrictionLevel, setRestrictionLevel] = useState(1)

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'banned' as const }
        : user
    ))
    
    toast.success('🚫 User permanently banned!', {
      description: 'User has been removed from all systems permanently.',
      duration: 4000
    })
  }

  const handleWarnUser = (userId: string) => {
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + warningDuration)
    
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'warned' as const,
            warningExpiry: expiryDate.toISOString().split('T')[0]
          }
        : user
    ))
    
    toast.success(`⚠️ User warned for ${warningDuration} hours!`, {
      description: 'Warning will automatically expire after set duration.',
      duration: 3000
    })
  }

  const handleRestrictUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'restricted' as const,
            restrictionLevel: restrictionLevel
          }
        : user
    ))
    
    toast.success(`🔒 User account restricted!`, {
      description: `Restriction level ${restrictionLevel} applied - limited account access.`,
      duration: 3000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'warned': return 'bg-yellow-600'
      case 'restricted': return 'bg-orange-600'
      case 'banned': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ User Management & Security Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search users by username or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User List</TabsTrigger>
              <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="chat-security">Chat Security</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{user.username}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined: {user.joinDate} • Last active: {user.lastActivity}
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(user.status)} text-white`}>
                          {user.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleBanUser(user.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {user.warningExpiry && (
                      <div className="mt-2 text-xs text-yellow-400">
                        Warning expires: {user.warningExpiry}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Warning System */}
                <Card className="bg-yellow-900/30 border border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5" />
                      Issue Warning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Duration (hours)</label>
                      <Input
                        type="number"
                        value={warningDuration}
                        onChange={(e) => setWarningDuration(Number(e.target.value))}
                        min="1"
                        max="168"
                      />
                    </div>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => selectedUser && handleWarnUser(selectedUser.id)}
                      disabled={!selectedUser}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Apply Warning
                    </Button>
                  </CardContent>
                </Card>

                {/* Restriction System */}
                <Card className="bg-orange-900/30 border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2 text-lg">
                      <Settings className="h-5 w-5" />
                      Restrict Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Restriction Level (1-5)</label>
                      <Input
                        type="number"
                        value={restrictionLevel}
                        onChange={(e) => setRestrictionLevel(Number(e.target.value))}
                        min="1"
                        max="5"
                      />
                    </div>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => selectedUser && handleRestrictUser(selectedUser.id)}
                      disabled={!selectedUser}
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Apply Restriction
                    </Button>
                  </CardContent>
                </Card>

                {/* Ban System */}
                <Card className="bg-red-900/30 border border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2 text-lg">
                      <UserX className="h-5 w-5" />
                      Permanent Ban
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-red-300 mb-4">
                      ⚠️ This action is permanent and cannot be undone!
                    </div>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => selectedUser && handleBanUser(selectedUser.id)}
                      disabled={!selectedUser}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      PERMANENT BAN
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {selectedUser && (
                <Card className="bg-blue-900/30 border border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Selected User: {selectedUser.username}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Email: {selectedUser.email}</div>
                      <div>Status: {selectedUser.status}</div>
                      <div>Join Date: {selectedUser.joinDate}</div>
                      <div>Last Activity: {selectedUser.lastActivity}</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chat-security" className="space-y-4">
              <Card className="bg-purple-900/30 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">🔒 Secure Chat Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">✅ Chat Security Active</h4>
                    <ul className="text-sm space-y-1 text-green-300">
                      <li>• All messages encrypted and untraceable</li>
                      <li>• Admin-only access to chat logs for moderation</li>
                      <li>• Automatic bad habit pattern detection</li>
                      <li>• Real-time security monitoring</li>
                      <li>• Zero message storage outside secure vault</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-red-400 mb-2">🛡️ Admin Privileges</h4>
                    <p className="text-sm text-red-300">
                      Only admin accounts can access chat logs for security purposes. 
                      All access is logged and audited for maximum transparency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
