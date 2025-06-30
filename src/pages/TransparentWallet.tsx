
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Shield, BarChart3, CheckCircle } from 'lucide-react'

const TransparentWallet = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          👁️ Transparent Wallet System
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Full transparency • Real-time tracking • Community oversight
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Eye className="h-6 w-6" />
              Public Wallet View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Official GAiA Wallet</div>
                <code className="text-cyan-300 font-mono text-xs break-all">
                  5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh
                </code>
              </div>
              <div className="text-2xl font-bold text-cyan-400">100% Transparent</div>
              <Badge className="bg-cyan-600">Always Visible</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <BarChart3 className="h-6 w-6" />
              Real-time Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-400">247,891 GAiA</div>
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Community Fund:</span>
                  <span className="text-green-400">85,432 GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span>Development:</span>
                  <span className="text-blue-400">72,156 GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental:</span>
                  <span className="text-purple-400">90,303 GAiA</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield className="h-6 w-6" />
              Security Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Multi-signature Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Community Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">Real-time Monitoring</span>
              </div>
              <Badge className="bg-purple-600">Maximum Security</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <BarChart3 className="h-6 w-6" />
              Impact Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-lg font-bold text-yellow-400">Environmental Impact</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Trees Funded:</span>
                  <span className="text-green-400">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Ocean Cleanup:</span>
                  <span className="text-blue-400">1,653 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Wildlife Protected:</span>
                  <span className="text-purple-400">934</span>
                </div>
              </div>
              <Badge className="bg-yellow-600">Live Updates</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TransparentWallet
