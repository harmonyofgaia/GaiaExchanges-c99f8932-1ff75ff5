import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Shield, 
  Ban,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Settings,
  Activity,
  Globe,
  Crown
} from 'lucide-react';

export function UserManagementAdmin() {
  const [userStats, setUserStats] = useState({
    totalUsers: 24789,
    activeUsers: 18542,
    newToday: 247,
    bannedUsers: 89,
    premiumUsers: 3421
  });

  const [users, setUsers] = useState([
    { 
      id: 1, 
      username: "EcoWarrior123", 
      email: "eco@example.com", 
      status: "active", 
      role: "user", 
      joinDate: "2024-01-15",
      lastActive: "2 minutes ago",
      reputation: 952
    },
    { 
      id: 2, 
      username: "GreenTechPro", 
      email: "greentech@example.com", 
      status: "premium", 
      role: "creator", 
      joinDate: "2024-02-03",
      lastActive: "1 hour ago",
      reputation: 1847
    },
    { 
      id: 3, 
      username: "NatureLover", 
      email: "nature@example.com", 
      status: "active", 
      role: "moderator", 
      joinDate: "2023-11-22",
      lastActive: "5 minutes ago",
      reputation: 2103
    },
    { 
      id: 4, 
      username: "ClimateActivist", 
      email: "climate@example.com", 
      status: "suspended", 
      role: "user", 
      joinDate: "2024-03-10",
      lastActive: "2 days ago",
      reputation: 345
    },
    { 
      id: 5, 
      username: "SolarEngineer", 
      email: "solar@example.com", 
      status: "active", 
      role: "admin", 
      joinDate: "2023-08-15",
      lastActive: "Just now",
      reputation: 3247
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (userId: number, action: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active' };
          case 'suspend':
            return { ...user, status: 'suspended' };
          case 'ban':
            return { ...user, status: 'banned' };
          case 'makePremium':
            return { ...user, status: 'premium' };
          case 'promoteAdmin':
            return { ...user, role: 'admin' };
          case 'promoteModerator':
            return { ...user, role: 'moderator' };
          case 'demoteUser':
            return { ...user, role: 'user' };
          default:
            return user;
        }
      }
      return user;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'premium':
        return <Badge variant="default" className="bg-purple-500"><Crown className="h-3 w-3 mr-1" />Premium</Badge>;
      case 'suspended':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Suspended</Badge>;
      case 'banned':
        return <Badge variant="destructive"><Ban className="h-3 w-3 mr-1" />Banned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default" className="bg-red-500"><Shield className="h-3 w-3 mr-1" />Admin</Badge>;
      case 'moderator':
        return <Badge variant="default" className="bg-blue-500"><Shield className="h-3 w-3 mr-1" />Moderator</Badge>;
      case 'creator':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Creator</Badge>;
      case 'user':
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        newToday: prev.newToday + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-400">👥 User Management</h2>
          <p className="text-muted-foreground">Manage GAiA Community Members</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Today</p>
                <p className="text-2xl font-bold">{userStats.newToday}</p>
              </div>
              <UserPlus className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Premium Users</p>
                <p className="text-2xl font-bold">{userStats.premiumUsers.toLocaleString()}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Banned Users</p>
                <p className="text-2xl font-bold">{userStats.bannedUsers}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Directory</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="premium">Premium</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                  </select>
                  <select 
                    value={filterRole} 
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Reputation</th>
                      <th className="text-left p-4">Last Active</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Joined {user.joinDate}</p>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(user.status)}</td>
                        <td className="p-4">{getRoleBadge(user.role)}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <Globe className="h-4 w-4 text-green-500" />
                            <span className="font-semibold">{user.reputation}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{user.lastActive}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            {user.status === 'suspended' && (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'activate')}>
                                Activate
                              </Button>
                            )}
                            {user.status === 'active' && (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'suspend')}>
                                Suspend
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Admin Permissions</h3>
                    <ul className="text-sm space-y-1">
                      <li>✓ Full system access</li>
                      <li>✓ User management</li>
                      <li>✓ Content moderation</li>
                      <li>✓ Financial controls</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Moderator Permissions</h3>
                    <ul className="text-sm space-y-1">
                      <li>✓ Content moderation</li>
                      <li>✓ User warnings</li>
                      <li>✓ Community management</li>
                      <li>✗ Financial controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">+2,847 users</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-semibold">+2,103 users</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Rate</span>
                    <span className="font-semibold text-green-600">+35.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Daily Active</span>
                    <span className="font-semibold">74.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly Active</span>
                    <span className="font-semibold">89.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Active</span>
                    <span className="font-semibold">95.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-ban suspicious accounts</h3>
                    <p className="text-sm text-muted-foreground">Automatically ban accounts showing suspicious activity</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email verification required</h3>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-factor authentication</h3>
                    <p className="text-sm text-muted-foreground">Enable 2FA for admin accounts</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}