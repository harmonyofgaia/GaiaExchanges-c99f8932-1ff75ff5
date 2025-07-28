
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Users,
  FileText,
  Globe,
  Smartphone
} from 'lucide-react'

export default function Security() {
  const [securityLevel, setSecurityLevel] = useState('High')
  
  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "End-to-End Encryption",
      description: "All communications encrypted with AES-256",
      status: "Active",
      level: "Critical"
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: "Multi-Factor Authentication",
      description: "Two-factor authentication with biometric support",
      status: "Enabled",
      level: "High"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Immutability",
      description: "Transaction records secured on distributed ledger",
      status: "Active",
      level: "Critical"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Privacy Controls",
      description: "Granular privacy settings for personal data",
      status: "Configured",
      level: "Medium"
    }
  ]

  const securityMetrics = [
    { label: "Security Incidents", value: "0", period: "Last 30 days", status: "good" },
    { label: "Failed Login Attempts", value: "3", period: "Last 24 hours", status: "normal" },
    { label: "Active Sessions", value: "1", period: "Current", status: "good" },
    { label: "Data Breaches", value: "0", period: "All time", status: "good" }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'enabled':
      case 'good':
        return 'bg-green-600'
      case 'configured':
      case 'normal':
        return 'bg-yellow-600'
      default:
        return 'bg-red-600'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'text-red-400 bg-red-900/30 border-red-500/30'
      case 'high':
        return 'text-orange-400 bg-orange-900/30 border-orange-500/30'
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30'
      default:
        return 'text-green-400 bg-green-900/30 border-green-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🛡️ Security Center
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Comprehensive security monitoring and protection for your GAiA account
          </p>
        </div>

        {/* Security Overview */}
        <Card className="mb-8 bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              Security Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">{securityLevel}</div>
                <div className="text-sm text-muted-foreground">Security Level</div>
              </div>
              
              <div className="text-center">
                <Badge className="bg-green-600 text-white mb-2">Protected</Badge>
                <div className="text-sm text-muted-foreground">Account Status</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">256-bit</div>
                <div className="text-sm text-muted-foreground">Encryption</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className={`${getLevelColor(feature.level)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(feature.status)} text-white`}>
                    {feature.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`border-current`}>
                    {feature.level} Priority
                  </Badge>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Metrics */}
        <Card className="border-purple-500/30 bg-purple-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Globe className="h-5 w-5" />
              Security Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    metric.status === 'good' ? 'text-green-400' : 
                    metric.status === 'normal' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-white">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.period}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Smartphone className="h-4 w-4 mr-2" />
                Setup 2FA
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Eye className="h-4 w-4 mr-2" />
                Review Privacy Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <FileText className="h-5 w-5" />
                Security Alerts & Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-800/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Successful login from trusted device</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-800/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Security scan completed</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Password policy updated</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Full Security Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
