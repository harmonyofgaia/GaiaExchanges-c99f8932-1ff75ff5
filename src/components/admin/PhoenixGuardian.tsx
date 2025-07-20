
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Flame, Eye, Zap, AlertTriangle } from 'lucide-react'

export function PhoenixGuardian() {
  return (
    <div className="space-y-6">
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Flame className="h-6 w-6" />
            🦅 Phoenix Guardian Defense System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🦅</div>
            <h2 className="text-2xl font-bold text-orange-400 mb-2">
              Phoenix Guardian Active
            </h2>
            <p className="text-orange-300">
              Resurrection protocol enabled • System immortality guaranteed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="h-5 w-5" />
                  Immortal Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">100%</div>
                  <p className="text-sm text-red-300">System Recovery Rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Flame className="h-5 w-5" />
                  Phoenix Fire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">∞</div>
                  <p className="text-sm text-orange-300">Regeneration Cycles</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Eye className="h-5 w-5" />
                  Guardian Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <p className="text-sm text-yellow-300">Threat Monitoring</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-300">Guardian Capabilities</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg">
                <Zap className="h-5 w-5 text-orange-400" />
                <div>
                  <div className="font-medium text-orange-300">Auto-Resurrection</div>
                  <div className="text-xs text-orange-400">Instant system recovery</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div>
                  <div className="font-medium text-red-300">Threat Elimination</div>
                  <div className="text-xs text-red-400">Phoenix fire burns threats</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="font-medium text-yellow-300">Immortal Shields</div>
                  <div className="text-xs text-yellow-400">Unbreakable protection</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg">
                <Flame className="h-5 w-5 text-orange-400" />
                <div>
                  <div className="font-medium text-orange-300">Phoenix Rebirth</div>
                  <div className="text-xs text-orange-400">Stronger after each revival</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Flame className="h-4 w-4 mr-2" />
              Activate Phoenix Fire
            </Button>
            <Button variant="outline" className="border-orange-500/50 text-orange-400">
              Guardian Status Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
