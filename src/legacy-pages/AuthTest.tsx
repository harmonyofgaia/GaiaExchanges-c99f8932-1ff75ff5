
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthTest as AuthTestComponent } from '@/components/auth/AuthTest'
import { Shield } from 'lucide-react'

const AuthTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400 text-center">
              <Shield className="h-6 w-6" />
              🐉 DRAGON AUTHENTICATION TEST 🐉
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AuthTestComponent />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthTest
