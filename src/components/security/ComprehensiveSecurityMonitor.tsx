
import { EnhancedSecurityEngine } from './EnhancedSecurityEngine'
import { PhoneSecuritySystem } from './PhoneSecuritySystem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Activity, Lock, Zap } from 'lucide-react'

export function ComprehensiveSecurityMonitor() {
  const { metrics, threats, isActive } = EnhancedSecurityEngine()

  return (
    <div className="space-y-6">
      {/* Real-time Security Dashboard */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6" />
            Real-time Security Monitoring (Every Second)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Advanced AI-powered security scanning with smart notifications
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{metrics.overallScore.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
              <Progress value={metrics.overallScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{metrics.activeThreats}</div>
              <div className="text-sm text-muted-foreground">Active Threats</div>
              <Badge className={`mt-2 ${metrics.activeThreats === 0 ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                <Activity className="h-3 w-3 mr-1" />
                {metrics.activeThreats === 0 ? 'Secure' : 'Monitoring'}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{metrics.resolvedThreats}</div>
              <div className="text-sm text-muted-foreground">Threats Resolved</div>
              <Badge className="mt-2 bg-purple-600 text-white">
                <Lock className="h-3 w-3 mr-1" />
                Auto-Fixed
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{metrics.uptime}%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
              <Badge className="mt-2 bg-green-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 mb-2">Latest Security Events</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {threats.length === 0 ? (
                <p className="text-sm text-muted-foreground">✅ No security threats detected</p>
              ) : (
                threats.map((threat, index) => (
                  <div key={index} className="text-xs flex items-center justify-between p-2 rounded bg-muted/20">
                    <span>{threat.message}</span>
                    <Badge className={`text-xs ${threat.resolved ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                      {threat.resolved ? 'Resolved' : 'Monitoring'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone Security System */}
      <PhoneSecuritySystem />

      {/* Culture of Harmony Protection Info */}
      <Card className="border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-cyan-400">🛡️ Culture of Harmony - Ultimate Protection</h4>
            <p className="text-sm text-muted-foreground">
              Protecting +31687758236 and info@cultureofharmony.net with military-grade security
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <span className="text-green-400">🔒 AI Threat Detection</span>
              <span className="text-blue-400">📱 Phone Protection</span>
              <span className="text-purple-400">✉️ Email Security</span>
              <span className="text-yellow-400">🌐 Network Defense</span>
            </div>
            <p className="text-xs text-green-400 mt-2">
              🎵 "Seeds Will Form Into Music" - Securing every connection 🎵
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
