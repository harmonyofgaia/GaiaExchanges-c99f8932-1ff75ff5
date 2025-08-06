
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto bg-gradient-to-br from-red-900/20 to-black/50 border-red-500/20">
        <CardContent className="p-8 text-center">
          <div className="text-8xl mb-6">🌍</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for seems to have wandered off into the digital wilderness.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            
            <Button 
              onClick={() => window.history.back()} 
              variant="outline" 
              className="w-full border-gray-500/30 text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🌟 Lost? The GAIA community is here to help guide you home.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
