
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Governance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black p-6">
      <div className="container mx-auto space-y-6">
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-blue-400">
              🗳️ GAiA Governance
            </CardTitle>
            <div className="flex justify-center">
              <Badge className="bg-green-600">COMMUNITY DRIVEN</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl mb-4">🏛️</div>
            <h2 className="text-2xl font-bold text-blue-400">Community Governance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              GAiA governance is driven by community consensus and environmental impact priorities. 
              Major decisions are made transparently with full community involvement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-400 font-bold mb-2">🌱 Environmental Priorities</h3>
                <p className="text-green-300 text-sm">
                  Community votes on environmental project funding and impact initiatives
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-blue-400 font-bold mb-2">🤝 Community Consensus</h3>
                <p className="text-blue-300 text-sm">
                  Transparent decision-making process with full community participation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
