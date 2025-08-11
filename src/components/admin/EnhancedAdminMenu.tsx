
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Settings, 
  Users, 
  BarChart3, 
  Zap, 
  Globe,
  Lock,
  Database,
  Activity,
  AlertTriangle
} from 'lucide-react'

export function EnhancedAdminMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <Badge className="bg-green-600">ACTIVE</Badge>
          </div>
          <h3 className="font-bold text-blue-400 mb-2">Security Center</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Advanced threat monitoring & protection
          </p>
          <Link to="/security">
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              Access Security
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Lock className="h-8 w-8 text-purple-400" />
            <Badge className="bg-red-600">QUANTUM</Badge>
          </div>
          <h3 className="font-bold text-purple-400 mb-2">Quantum Security</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Next-gen quantum protection systems
          </p>
          <Link to="/quantum-security">
            <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
              Quantum Access
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Users className="h-8 w-8 text-green-400" />
            <Badge className="bg-blue-600">125K+</Badge>
          </div>
          <h3 className="font-bold text-green-400 mb-2">User Management</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Global user control & analytics
          </p>
          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
            Manage Users
          </Button>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="h-8 w-8 text-orange-400" />
            <Badge className="bg-green-600">LIVE</Badge>
          </div>
          <h3 className="font-bold text-orange-400 mb-2">Analytics Hub</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Real-time platform analytics
          </p>
          <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
            View Analytics
          </Button>
        </CardContent>
      </Card>

      <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Database className="h-8 w-8 text-cyan-400" />
            <Badge className="bg-purple-600">ADMIN</Badge>
          </div>
          <h3 className="font-bold text-cyan-400 mb-2">Database Control</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Direct database management
          </p>
          <Button size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700">
            Database Access
          </Button>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Settings className="h-8 w-8 text-yellow-400" />
            <Badge className="bg-blue-600">CONFIG</Badge>
          </div>
          <h3 className="font-bold text-yellow-400 mb-2">System Settings</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Platform configuration & tweaks
          </p>
          <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
            System Config
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-gradient-to-br from-red-900/20 to-pink-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <Badge className="bg-red-600 animate-pulse">ALERT</Badge>
          </div>
          <h3 className="font-bold text-red-400 mb-2">Emergency Controls</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Emergency shutdown & recovery
          </p>
          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
            Emergency Panel
          </Button>
        </CardContent>
      </Card>

      <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Activity className="h-8 w-8 text-indigo-400" />
            <Badge className="bg-green-600">99.9%</Badge>
          </div>
          <h3 className="font-bold text-indigo-400 mb-2">System Health</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Real-time system monitoring
          </p>
          <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Health Monitor
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
