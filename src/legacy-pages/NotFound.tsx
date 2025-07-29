
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import HoverSidebar from '@/components/HoverSidebar'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-purple-900/20 to-blue-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-8">
          <Card className="max-w-2xl mx-auto border-red-500/30 bg-gradient-to-r from-red-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 mb-4">
                404
              </CardTitle>
              <p className="text-center text-2xl text-muted-foreground">
                Page Not Found
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-8xl mb-6">🌍</div>
              <p className="text-lg text-muted-foreground">
                Oops! The page you're looking for doesn't exist in the GAiA universe.
              </p>
              <p className="text-muted-foreground">
                Don't worry, even in our vast digital ecosystem, sometimes paths get lost. 
                Let's get you back to familiar territory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="border-purple-500/30 text-purple-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NotFound
