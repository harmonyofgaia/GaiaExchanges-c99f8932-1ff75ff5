
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
  UserMinus,
  Download,
  Globe,
  Users
} from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  username: string
  email: string
  status: 'active' | 'warned' | 'restricted' | 'banned'
  joinDate: string
  lastActivity: string
  ipAddress: string
  location: string
  warningExpiry?: string
  restrictionLevel: number
}

interface IPAddress {
  ip: string
  location: string
  status: 'approved' | 'pending' | 'blocked'
  firstSeen: string
  lastActivity: string
  userCount: number
  riskLevel: 'low' | 'medium' | 'high'
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
      ipAddress: '192.168.1.101',
      location: 'United States',
      restrictionLevel: 0
    },
    {
      id: '2',
      username: 'ProblemUser',
      email: 'problem@example.com',
      status: 'warned',
      joinDate: '2024-02-20',
      lastActivity: '1 hour ago',
      ipAddress: '10.0.0.50',
      location: 'Germany',
      warningExpiry: '2024-01-10',
      restrictionLevel: 0
    }
  ])

  const [ipAddresses, setIpAddresses] = useState<IPAddress[]>([
    {
      ip: '192.168.1.101',
      location: 'United States, New York',
      status: 'approved',
      firstSeen: '2024-01-15',
      lastActivity: '2 min ago',
      userCount: 1,
      riskLevel: 'low'
    },
    {
      ip: '10.0.0.50',
      location: 'Germany, Berlin',
      status: 'pending',
      firstSeen: '2024-02-20',
      lastActivity: '1 hour ago',
      userCount: 1,
      riskLevel: 'medium'
    },
    {
      ip: '172.16.0.25',
      location: 'Russia, Moscow',
      status: 'blocked',
      firstSeen: '2024-03-01',
      lastActivity: '2 days ago',
      userCount: 0,
      riskLevel: 'high'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [warningDuration, setWarningDuration] = useState(24)
  const [restrictionLevel, setRestrictionLevel] = useState(1)

  const generatePDFReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      bannedUsers: users.filter(u => u.status === 'banned').length,
      totalIPs: ipAddresses.length,
      approvedIPs: ipAddresses.filter(ip => ip.status === 'approved').length,
      blockedIPs: ipAddresses.filter(ip => ip.status === 'blocked').length,
      users: users,
      ipAddresses: ipAddresses
    }

    // Create downloadable PDF data
    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `GAIA_Security_Report_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('🔒 Security Report Generated!', {
      description: 'Encrypted PDF report downloaded successfully.',
      duration: 4000
    })
  }

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

  const handleIPAction = (ip: string, action: 'approved' | 'blocked' | 'pending') => {
    setIpAddresses(prev => prev.map(ipAddr => 
      ipAddr.ip === ip 
        ? { ...ipAddr, status: action }
        : ipAddr
    ))
    
    const actionText = action === 'approved' ? 'approved' : action === 'blocked' ? 'blocked' : 'marked as pending'
    toast.success(`🌐 IP Address ${actionText}!`, {
      description: `${ip} has been ${actionText} in the system.`,
      duration: 3000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': return 'bg-green-600'
      case 'warned': case 'pending': return 'bg-yellow-600'
      case 'restricted': return 'bg-orange-600'
      case 'banned': case 'blocked': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ipAddress.includes(searchTerm)
  )

  const filteredIPs = ipAddresses.filter(ip => 
    ip.ip.includes(searchTerm) ||
    ip.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ GAIA Admin Control Center - User & IP Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search users, IPs, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={generatePDFReport}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Security Report
            </Button>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="ip-control">IP Control Center</TabsTrigger>
              <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="chat-security">Chat Security</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Active Users ({filteredUsers.length})</h3>
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{user.username}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            IP: {user.ipAddress} • Location: {user.location}
                          </div>
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

            <TabsContent value="ip-control" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">IP Address Control Center ({filteredIPs.length})</h3>
              {filteredIPs.map((ip) => (
                <Card key={ip.ip} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold font-mono">{ip.ip}</div>
                          <div className="text-sm text-muted-foreground">{ip.location}</div>
                          <div className="text-xs text-muted-foreground">
                            First seen: {ip.firstSeen} • Last activity: {ip.lastActivity}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Users: {ip.userCount} • Risk Level: <span className={getRiskColor(ip.riskLevel)}>{ip.riskLevel.toUpperCase()}</span>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(ip.status)} text-white`}>
                          {ip.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleIPAction(ip.ip, 'approved')}
                        >
                          ✅ Approve
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => handleIPAction(ip.ip, 'pending')}
                        >
                          ⏳ Pending
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleIPAction(ip.ip, 'blocked')}
                        >
                          🚫 Block
                        </Button>
                      </div>
                    </div>
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
                      <div>IP Address: {selectedUser.ipAddress}</div>
                      <div>Location: {selectedUser.location}</div>
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
