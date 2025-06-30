
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, FileText, Crown } from 'lucide-react'

export function LegalProtectionSystem() {
  return (
    <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Shield className="h-6 w-6" />
          ⚖️ LEGAL PROTECTION SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-6xl">⚖️</div>
          <h3 className="text-2xl font-bold text-green-400">COMPLETE LEGAL PROTECTION</h3>
          <p className="text-green-300">
            All intellectual property and technology protected by international law.
            Comprehensive legal framework ensures our dominance is legally secured.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-900/30 rounded-lg">
              <div className="text-xl font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground">Legal Coverage</div>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg">
              <div className="text-xl font-bold text-blue-400">PROTECTED</div>
              <div className="text-xs text-muted-foreground">IP Rights</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded-lg">
              <div className="text-xl font-bold text-purple-400">SECURE</div>
              <div className="text-xs text-muted-foreground">Legal Framework</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
