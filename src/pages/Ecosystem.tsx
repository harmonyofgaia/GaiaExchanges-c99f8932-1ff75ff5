
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-6">
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-green-400">
              🌍 GAiA ECOSYSTEM
            </CardTitle>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600">ENVIRONMENTAL</Badge>
              <Badge className="bg-blue-600">SUSTAINABLE</Badge>
              <Badge className="bg-purple-600">COMMUNITY</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-green-400 font-bold text-xl mb-2">Environmental Impact</h3>
                <p className="text-green-300 text-sm">
                  Every transaction contributes to reforestation, ocean cleanup, and carbon offset programs
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-blue-400 font-bold text-xl mb-2">Transparent Economy</h3>
                <p className="text-blue-300 text-sm">
                  100% transparent wallet system with real-time tracking of all transactions and fees
                </p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-purple-400 font-bold text-xl mb-2">Community First</h3>
                <p className="text-purple-300 text-sm">
                  Built for long-term believers, not day traders. Community strength over speculation
                </p>
              </div>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-cyan-400 font-bold text-2xl mb-4 text-center">🔗 Ecosystem Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">💱</div>
                  <p className="text-cyan-300 text-sm">GAiA Exchange</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌄</div>
                  <p className="text-cyan-300 text-sm">Landscape Builder</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="text-cyan-300 text-sm">Security System</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👁️</div>
                  <p className="text-cyan-300 text-sm">Transparency Center</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
