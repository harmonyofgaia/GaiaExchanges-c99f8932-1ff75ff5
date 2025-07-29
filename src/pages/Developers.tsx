
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Code2, Terminal, Blocks } from 'lucide-react'

export default function Developers() {
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
      
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-green-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
            👨‍💻 Developer Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Tools and resources for developers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
              <Code2 className="h-12 w-12 mx-auto text-emerald-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-emerald-400">SDK & Libraries</div>
              <div className="text-sm text-muted-foreground">Development tools</div>
            </div>

            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <Terminal className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">CLI Tools</div>
              <div className="text-sm text-muted-foreground">Command line interface</div>
            </div>

            <div className="text-center p-6 bg-teal-900/30 rounded-lg border border-teal-500/30">
              <Blocks className="h-12 w-12 mx-auto text-teal-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-teal-400">Smart Contracts</div>
              <div className="text-sm text-muted-foreground">Blockchain integration</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
