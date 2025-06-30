
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, Zap, CheckCircle } from 'lucide-react'

const Security = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          🛡️ GAiA Security Center
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Multi-layer protection • Real-time monitoring • Community security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-6 w-6" />
              Defense Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">DDoS Protection Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Firewall Systems Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Intrusion Detection Active</span>
              </div>
              <Badge className="bg-red-600">Maximum Protection</Badge>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Shield className="h-4 w-4 mr-2" />
                Security Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Lock className="h-6 w-6" />
              Encryption & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">AES-256 Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Zero-Knowledge Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">End-to-End Encryption</span>
              </div>
              <Badge className="bg-blue-600">Privacy First</Badge>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Lock className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Eye className="h-6 w-6" />
              Monitoring Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Continuous Monitoring</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Real-time Threat Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Automated Response Systems</span>
              </div>
              <Badge className="bg-purple-600">Always Watching</Badge>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Eye className="h-4 w-4 mr-2" />
                View Monitoring
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Zap className="h-6 w-6" />
              Rapid Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-orange-400">&lt; 1ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Instant Threat Mitigation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Auto-Recovery Systems</span>
              </div>
              <Badge className="bg-orange-600">Lightning Fast</Badge>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Zap className="h-4 w-4 mr-2" />
                Emergency Protocols
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Security
