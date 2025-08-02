
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  Smartphone, 
  MapPin, 
  Users, 
  Eye,
  Calculator,
  Monitor,
  Wifi,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface UserAnalytics {
  userId: string
  username: string
  email: string
  ipAddresses: string[]
  locations: string[]
  devices: string[]
  socialConnections: string[]
  phoneNumber?: string
  lastActivity: string
  securityRisk: 'low' | 'medium' | 'high'
  totalSessions: number
  dataUsage: string
}

export function EnhancedUserAnalytics() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserAnalytics | null>(null)
  const [calculationResults, setCalculationResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const mockUsers: UserAnalytics[] = [
    {
      userId: '1',
      username: 'user_example',
      email: 'user@example.com',
      ipAddresses: ['192.168.1.100', '10.0.0.5'],
      locations: ['Amsterdam, Netherlands', 'Rotterdam, Netherlands'],
      devices: ['iPhone 14 Pro', 'MacBook Pro M2', 'Windows Desktop'],
      socialConnections: ['Twitter: @user_example', 'LinkedIn: /in/user-example'],
      phoneNumber: '+31612345678',
      lastActivity: '2 minutes ago',
      securityRisk: 'low',
      totalSessions: 147,
      dataUsage: '2.3 GB'
    }
  ]

  const performGlobalCalculation = async (user: UserAnalytics) => {
    setIsCalculating(true)
    
    // Simulate comprehensive analysis
    toast.info('🔍 Performing Global Analysis...', {
      description: 'Scanning all available data sources...',
      duration: 3000
    })

    setTimeout(() => {
      const results = {
        totalDataPoints: Math.floor(Math.random() * 1000) + 500,
        securityScore: Math.floor(Math.random() * 40) + 60,
        networkConnections: Math.floor(Math.random() * 20) + 5,
        geolocationAccuracy: '99.7%',
        deviceFingerprints: user.devices.length,
        socialMediaReach: Math.floor(Math.random() * 5000) + 1000,
        riskFactors: [
          'Multiple IP addresses detected',
          'Cross-platform usage normal',
          'Location pattern consistent'
        ],
        recommendations: [
          'Monitor for unusual login patterns',
          'Enable additional 2FA verification',
          'Regular security audits recommended'
        ]
      }
      
      setCalculationResults(results)
      setIsCalculating(false)
      
      toast.success('✅ Global Analysis Complete!', {
        description: 'Comprehensive user profile generated',
        duration: 4000
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Calculator className="h-6 w-6" />
            🧮 ENHANCED USER ANALYTICS & GLOBAL CALCULATION SYSTEM
            <Badge className="bg-purple-600 text-white">ADMIN ONLY</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search Interface */}
            <div className="flex gap-4">
              <Input
                placeholder="Search by username, email, IP, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => setSelectedUser(mockUsers[0])}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Analyze User
              </Button>
            </div>

            {/* User Profile Display */}
            {selectedUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-900/30 border border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Profile: {selectedUser.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-mono">{selectedUser.email}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <div className="font-mono">{selectedUser.phoneNumber || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sessions:</span>
                        <div className="font-bold text-green-400">{selectedUser.totalSessions}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data Usage:</span>
                        <div className="font-bold text-blue-400">{selectedUser.dataUsage}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <Badge className={`${
                        selectedUser.securityRisk === 'low' ? 'bg-green-600' :
                        selectedUser.securityRisk === 'medium' ? 'bg-yellow-600' :
                        'bg-red-600'
                      } text-white`}>
                        {selectedUser.securityRisk.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-900/30 border border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Global Data Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Locations:
                      </span>
                      {selectedUser.locations.map((location, i) => (
                        <div key={i} className="text-sm bg-black/30 p-2 rounded">
                          {location}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Devices:
                      </span>
                      {selectedUser.devices.map((device, i) => (
                        <div key={i} className="text-sm bg-black/30 p-2 rounded">
                          {device}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        IP Addresses:
                      </span>
                      {selectedUser.ipAddresses.map((ip, i) => (
                        <div key={i} className="text-sm bg-black/30 p-2 rounded font-mono">
                          {ip}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Global Calculation Button */}
            {selectedUser && (
              <div className="text-center">
                <Button
                  onClick={() => performGlobalCalculation(selectedUser)}
                  disabled={isCalculating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  {isCalculating ? 'Calculating Global Data...' : 'Perform Global Calculation'}
                </Button>
              </div>
            )}

            {/* Calculation Results */}
            {calculationResults && (
              <Card className="border-2 border-gold-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    🔍 GLOBAL CALCULATION RESULTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        {calculationResults.totalDataPoints}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {calculationResults.securityScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Security Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {calculationResults.networkConnections}
                      </div>
                      <div className="text-sm text-muted-foreground">Network Connections</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-red-400 mb-2">Risk Factors:</h4>
                      <ul className="space-y-1 text-sm">
                        {calculationResults.riskFactors.map((factor: string, i: number) => (
                          <li key={i} className="text-red-300">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 mb-2">Recommendations:</h4>
                      <ul className="space-y-1 text-sm">
                        {calculationResults.recommendations.map((rec: string, i: number) => (
                          <li key={i} className="text-green-300">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
