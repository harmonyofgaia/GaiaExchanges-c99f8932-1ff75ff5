
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { FileText, Book, HelpCircle } from 'lucide-react'

export default function Documentation() {
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
      
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            📚 Documentation
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Comprehensive guides and API documentation
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <FileText className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">User Guides</div>
              <div className="text-sm text-muted-foreground">Step-by-step tutorials</div>
            </div>

            <div className="text-center p-6 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
              <Book className="h-12 w-12 mx-auto text-indigo-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-indigo-400">API Reference</div>
              <div className="text-sm text-muted-foreground">Technical documentation</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <HelpCircle className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">FAQ</div>
              <div className="text-sm text-muted-foreground">Common questions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
