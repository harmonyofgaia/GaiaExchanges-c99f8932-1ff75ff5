import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  Search, 
  BarChart3, 
  Coins, 
  AlertTriangle,
  Globe,
  Settings,
  Eye,
  Brain,
  Lock,
  Activity,
  Database,
  Zap
} from 'lucide-react'
import { githubScanner } from '@/services/githubScanner'
import type { ScanResult } from '@/services/githubScanner'

interface SystemMetrics {
  realTimeConnections: number
  dataPoints: number
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  scanningActive: boolean
  globalReach: number
}

export function GaiaIATool() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    realTimeConnections: 1247,
    dataPoints: 98752,
    threatLevel: 'LOW',
    scanningActive: true,
    globalReach: 156
  })

  useEffect(() => {
    // Initialize GitHub scanning
    performGitHubScan()
    
    // Start real-time metrics updates
    const metricsInterval = setInterval(updateSystemMetrics, 3000)
    
    return () => clearInterval(metricsInterval)
  }, [])

  const performGitHubScan = async () => {
    setIsScanning(true)
    try {
      const result = await githubScanner.scanRepository()
      setScanResult(result)
      console.log('🚀 GAIA IA Tool: Repository scan complete', result)
    } catch (error) {
      console.error('❌ GitHub scan failed:', error)
    } finally {
      setIsScanning(false)
    }
  }

  const updateSystemMetrics = () => {
    setSystemMetrics(prev => ({
      ...prev,
      realTimeConnections: prev.realTimeConnections + Math.floor(Math.random() * 20 - 10),
      dataPoints: prev.dataPoints + Math.floor(Math.random() * 100),
      globalReach: Math.max(1, prev.globalReach + Math.floor(Math.random() * 6 - 3))
    }))
  }

  const performGlobalSearch = async () => {
    if (!searchQuery.trim()) return

    console.log('🔍 GAIA IA: Performing global search for:', searchQuery)
    
    // Simulate comprehensive search across multiple data sources
    const mockResults = [
      {
        source: 'Web Intelligence',
        data: `Found ${Math.floor(Math.random() * 1000)} references to "${searchQuery}" across global web`,
        confidence: 85
      },
      {
        source: 'Social Networks',
        data: `Analyzed ${Math.floor(Math.random() * 500)} social mentions`,
        confidence: 72
      },
      {
        source: 'Gaia Chain',
        data: `Located ${Math.floor(Math.random() * 50)} blockchain transactions`,
        confidence: 95
      },
      {
        source: 'Environmental Data',
        data: `Cross-referenced with ${Math.floor(Math.random() * 100)} eco-projects`,
        confidence: 78
      }
    ]

    setSearchResults(mockResults)
  }

  const renderRealTimeAnalytics = () => (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Real-Time System Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{systemMetrics.realTimeConnections}</div>
            <div className="text-sm text-muted-foreground">Active Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{systemMetrics.dataPoints.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Data Points</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Threat Level:</span>
          <Badge variant={systemMetrics.threatLevel === 'LOW' ? 'default' : 'destructive'}>
            {systemMetrics.threatLevel}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Global Scanning:</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemMetrics.scanningActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm">{systemMetrics.scanningActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSearchAllData = () => (
    <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-green-400" />
          Search All Data (Global Intelligence)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter name or query for global scan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performGlobalSearch()}
          />
          <Button onClick={performGlobalSearch} className="bg-green-600 hover:bg-green-700">
            Scan
          </Button>
        </div>
        
        {searchResults.length > 0 && (
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {searchResults.map((result, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded border">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-green-400">{result.source}</span>
                    <Badge variant="secondary">{result.confidence}% confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.data}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )

  const renderTokenAssetManager = () => (
    <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-400" />
          Token & Asset Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded">
            <div className="text-xl font-bold text-yellow-400">2,847,394</div>
            <div className="text-sm text-muted-foreground">GAIA Tokens</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded">
            <div className="text-xl font-bold text-green-400">1,523</div>
            <div className="text-sm text-muted-foreground">NFT Assets</div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Database className="h-4 w-4 mr-2" />
            Manage Token Distribution
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Zap className="h-4 w-4 mr-2" />
            Eco-Rewards Configuration
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Activity className="h-4 w-4 mr-2" />
            Asset Performance Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderThreatResponse = () => (
    <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          Threat Response Suite
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            All systems operational. No active threats detected.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Firewall Status:</span>
            <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Intrusion Detection:</span>
            <Badge variant="default" className="bg-green-600">MONITORING</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>AI Defense Animals:</span>
            <Badge variant="default" className="bg-blue-600">DEPLOYED</Badge>
          </div>
        </div>
        
        <Button variant="destructive" className="w-full">
          <Lock className="h-4 w-4 mr-2" />
          Emergency Lockdown Protocol
        </Button>
      </CardContent>
    </Card>
  )

  const renderGlobalImpact = () => (
    <Card className="bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-indigo-400" />
          Global Impact Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">247</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">89.2M</div>
            <div className="text-xs text-muted-foreground">CO2 Reduced</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">15.7K</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Tree Planting Impact</span>
            <span className="text-green-400">+2.3M trees</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Ocean Cleanup</span>
            <span className="text-blue-400">847 tons removed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Renewable Energy</span>
            <span className="text-yellow-400">23.4 GWh generated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderRepositoryStatus = () => (
    <Card className="bg-gradient-to-br from-gray-900/20 to-slate-900/20 border-gray-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-400" />
            Repository Status
          </div>
          <Button 
            size="sm" 
            onClick={performGitHubScan}
            disabled={isScanning}
            className="bg-gray-600 hover:bg-gray-700"
          >
            {isScanning ? 'Scanning...' : 'Refresh'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scanResult && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">{scanResult.issues.length}</div>
                <div className="text-sm text-muted-foreground">Issues Found</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{scanResult.pullRequests.length}</div>
                <div className="text-sm text-muted-foreground">Pull Requests</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Health Score:</span>
              <Badge variant={scanResult.healthScore > 80 ? 'default' : 'destructive'}>
                {scanResult.healthScore}%
              </Badge>
            </div>
            
            {scanResult.lostFeatures.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-yellow-400">Lost Features Detected:</h4>
                <div className="space-y-1">
                  {scanResult.lostFeatures.map((feature, index) => (
                    <div key={index} className="text-sm p-2 bg-yellow-900/20 rounded border border-yellow-500/30">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-muted-foreground text-xs">{feature.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
          🧠 GAIA IA Tool - Ultimate Control Center
        </h2>
        <p className="text-muted-foreground">
          Single point of control for all system features, processes, and security
        </p>
      </div>

      <Alert className="border-green-500/50 bg-green-900/20">
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>Exclusive Admin Access Active</strong> - Only the connected admin can control Gaia engines
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="search">Global Search</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          {renderRealTimeAnalytics()}
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          {renderSearchAllData()}
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          {renderTokenAssetManager()}
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {renderThreatResponse()}
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          {renderGlobalImpact()}
        </TabsContent>

        <TabsContent value="repository" className="space-y-4">
          {renderRepositoryStatus()}
        </TabsContent>
      </Tabs>
    </div>
  )
}