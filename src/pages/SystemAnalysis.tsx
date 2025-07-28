
import { DeepAnalysisReport } from '@/components/system/DeepAnalysisReport'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Shield, Search } from 'lucide-react'

export default function SystemAnalysis() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Github className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Repository Deep Analysis
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Comprehensive GitHub repository analysis with admin design protection
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge className="bg-purple-600">harmonyofgaia/GaiaExchanges-c99f8932</Badge>
          <Badge className="bg-green-600">
            <Shield className="h-3 w-3 mr-1" />
            Admin Login Protected
          </Badge>
          <Badge className="bg-blue-600">
            <Search className="h-3 w-3 mr-1" />
            Full Analysis
          </Badge>
        </div>
      </div>

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-green-400">
            🔒 Admin Login Design Protection Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Your current admin login design and functionality will remain unchanged.
            </p>
            <p className="text-xs text-green-400">
              All admin authentication, login interface, and auth layout modifications have been excluded from analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      <DeepAnalysisReport />
    </div>
  )
}
