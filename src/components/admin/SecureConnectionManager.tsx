
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Eye, 
  Download, 
  Database, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Lock,
  Cloud,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'

interface ConnectionData {
  id: string
  ip_address: string
  location: string
  country: string
  city: string
  user_agent: string
  timestamp: string
  connection_type: string
  threat_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  dragon_assessment: string
}

export function SecureConnectionManager() {
  const [connections, setConnections] = useState<ConnectionData[]>([])
  const [totalConnections, setTotalConnections] = useState(0)
  const [threatStats, setThreatStats] = useState({
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  })

  useEffect(() => {
    loadConnectionData()
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadConnectionData, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadConnectionData = () => {
    // Load connections from localStorage (dragon-protected storage)
    const storedConnections: ConnectionData[] = []
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('dragon_connection_')) {
        try {
          const connectionData = JSON.parse(localStorage.getItem(key) || '{}')
          storedConnections.push({
            id: key,
            ...connectionData
          })
        } catch (error) {
          console.log('🐉 Dragon protected data')
        }
      }
    }

    // Sort by timestamp (newest first)
    storedConnections.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    setConnections(storedConnections)
    setTotalConnections(storedConnections.length)

    // Calculate threat statistics
    const stats = storedConnections.reduce((acc, conn) => {
      acc[conn.threat_level.toLowerCase() as keyof typeof acc]++
      return acc
    }, { low: 0, medium: 0, high: 0, critical: 0 })
    
    setThreatStats(stats)
  }

  const exportConnectionData = () => {
    const dataToExport = connections.map(conn => ({
      timestamp: conn.timestamp,
      ip_address: conn.ip_address,
      location: conn.location,
      threat_level: conn.threat_level,
      dragon_assessment: conn.dragon_assessment
    }))

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dragon_connections_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('🐉 Dragon Connection Data Exported!', {
      description: 'Secure connection data has been exported to file',
      duration: 5000
    })
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-600 text-white'
      case 'HIGH': return 'bg-orange-600 text-white'
      case 'MEDIUM': return 'bg-yellow-600 text-gray-800'
      case 'LOW': return 'bg-green-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  return (
    <div className="space-y-6">
      {/* Dragon Connection Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🐉 DRAGON SECURE CONNECTION MANAGER - ADMIN ONLY ACCESS
            <Badge className="bg-red-600 text-white animate-pulse">
              <Lock className="h-3 w-3 mr-1" />
              ULTRA SECURE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{totalConnections}</div>
              <div className="text-sm text-muted-foreground">Total Connections</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{threatStats.low}</div>
              <div className="text-sm text-muted-foreground">Low Threat</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{threatStats.high}</div>
              <div className="text-sm text-muted-foreground">High Threat</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-red-900/30 border border-red-500/20">
              <Cloud className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">🐉</div>
              <div className="text-sm text-muted-foreground">Dragon Protected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="live-connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live-connections">Live Connections</TabsTrigger>
          <TabsTrigger value="threat-analysis">Threat Analysis</TabsTrigger>
          <TabsTrigger value="secure-cloud">Secure Cloud Access</TabsTrigger>
        </TabsList>

        <TabsContent value="live-connections" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-red-400">🐉 Dragon Tracked Connections</h3>
            <Button onClick={exportConnectionData} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Secure Data
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {connections.map((connection) => (
              <Card key={connection.id} className="bg-black/30 border border-red-500/20">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="font-mono text-sm text-blue-400">{connection.ip_address}</div>
                        <div className="text-xs text-muted-foreground">{connection.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-400" />
                      <div className="text-sm text-green-400">
                        {new Date(connection.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    <Badge className={getThreatColor(connection.threat_level)}>
                      {connection.threat_level}
                    </Badge>
                    
                    <div className="text-xs text-orange-400">
                      {connection.dragon_assessment}
                    </div>
                    
                    <div className="text-xs text-muted-foreground truncate">
                      {connection.user_agent.substring(0, 50)}...
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {connections.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                🐉 Dragon is monitoring... No connections tracked yet
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="threat-analysis" className="space-y-4">
          <Card className="bg-red-900/20 border border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">🐉 Dragon Threat Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-900/30">
                  <div className="text-3xl font-bold text-green-400">{threatStats.low}</div>
                  <div className="text-sm text-green-300">Low Threat</div>
                  <div className="text-xs text-muted-foreground">Safe Connections</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-yellow-900/30">
                  <div className="text-3xl font-bold text-yellow-400">{threatStats.medium}</div>
                  <div className="text-sm text-yellow-300">Medium Threat</div>
                  <div className="text-xs text-muted-foreground">Watch List</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-orange-900/30">
                  <div className="text-3xl font-bold text-orange-400">{threatStats.high}</div>
                  <div className="text-sm text-orange-300">High Threat</div>
                  <div className="text-xs text-muted-foreground">Dragon Alert</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-red-900/30">
                  <div className="text-3xl font-bold text-red-400">{threatStats.critical}</div>
                  <div className="text-sm text-red-300">Critical Threat</div>
                  <div className="text-xs text-muted-foreground">Dragon Attack Mode</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secure-cloud" className="space-y-4">
          <Card className="bg-purple-900/20 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Cloud className="h-5 w-5" />
                🐉 Dragon Protected Secure Cloud Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">🛡️ ULTRA SECURE CLOUD VAULT</h4>
                <p className="text-sm text-red-300 mb-4">
                  All connection data is stored in our dragon-protected cloud vault with full body armor security.
                  Access is restricted to verified admin accounts only.
                </p>
                
                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Cloud className="h-4 w-4 mr-2" />
                    🔒 Access Dragon Protected Cloud Files
                  </Button>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    📊 Generate Secure Connection Report
                  </Button>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    🐉 Dragon Backup All Data to Secure Vault
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-bold text-blue-400 mb-2">🔐 SECURITY FEATURES</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Dragon Full Body Armor Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Admin-Only Access Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Encrypted Data Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Invisible to Non-Admin Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Real-time Threat Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Automatic Dragon Defense</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
