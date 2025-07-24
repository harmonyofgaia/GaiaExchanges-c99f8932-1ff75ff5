import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Crown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Shield className="h-12 w-12 text-green-400" />
              <Crown className="h-12 w-12 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-400">
              🌍 GAIA Exchanges
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Next.js 14 + React 18 Powered Platform
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/secure-admin">
            <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3">
              <Shield className="h-5 w-5 mr-2" />
              Access Secure Admin Portal
            </Button>
          </Link>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center mb-2">
              🛡️ Enhanced Security • Next.js 14 • 4-Step Defense System
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Advanced authentication with anti-hijack protection</div>
              <div>• Granular role-based access control</div>
              <div>• Multi-factor authentication & temporal security</div>
              <div>• Intrusion detection & adaptive countermeasures</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}