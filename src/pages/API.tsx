
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Code, Database, Zap } from 'lucide-react'

export default function API() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-slate-500/30 bg-gradient-to-r from-slate-900/20 to-gray-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-gray-400">
            🔧 API Access
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Developer tools and API documentation
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-900/30 rounded-lg border border-slate-500/30">
              <Code className="h-12 w-12 mx-auto text-slate-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-slate-400">REST API</div>
              <div className="text-sm text-muted-foreground">Full access endpoints</div>
            </div>

            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-gray-500/30">
              <Database className="h-12 w-12 mx-auto text-gray-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-gray-400">GraphQL</div>
              <div className="text-sm text-muted-foreground">Flexible queries</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Zap className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Webhooks</div>
              <div className="text-sm text-muted-foreground">Real-time events</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
