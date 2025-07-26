import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, RefreshCw, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { gaiaConsistencyScanner, ComponentIntegration, ConsistencyIssue } from '@/services/gaiaConsistencyScanner'
import { GAIA_TOKEN } from '@/constants/gaia'

const GaiaConsistencyStatus = () => {
  const [scanResult, setScanResult] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null)

  const runConsistencyScan = async () => {
    setIsScanning(true)
    try {
      const result = await gaiaConsistencyScanner.scanSystemConsistency()
      setScanResult(result)
      setLastScanTime(new Date())
    } catch (error) {
      console.error('❌ Consistency scan failed:', error)
    } finally {
      setIsScanning(false)
    }
  }

  useEffect(() => {
    runConsistencyScan()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONSISTENT': return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'NEEDS_UPDATE': return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case 'INCONSISTENT': return <XCircle className="h-6 w-6 text-red-500" />
      default: return <Activity className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONSISTENT': return 'bg-green-600'
      case 'NEEDS_UPDATE': return 'bg-yellow-600'
      case 'INCONSISTENT': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getIntegrationLevelColor = (level: string) => {
    switch (level) {
      case 'FULL': return 'bg-green-600'
      case 'PARTIAL': return 'bg-yellow-600'
      case 'NONE': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-green-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              🔍 GAiA TOKEN CONSISTENCY STATUS
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real-time system consistency monitoring • Official GAiA token integration verification
            </p>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={runConsistencyScan}
                disabled={isScanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Run Consistency Scan
                  </>
                )}
              </Button>
            </div>
            {lastScanTime && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                Last scan: {lastScanTime.toLocaleString()}
              </p>
            )}
          </CardHeader>
        </Card>

        {scanResult && (
          <>
            {/* Overall Status */}
            <Card className="mb-6 border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(scanResult.overallStatus)}
                  Overall System Status: {scanResult.overallStatus}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{scanResult.summary.totalComponents}</div>
                    <div className="text-sm text-muted-foreground">Total Components</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{scanResult.summary.fullyIntegrated}</div>
                    <div className="text-sm text-muted-foreground">Fully Integrated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{scanResult.summary.partiallyIntegrated}</div>
                    <div className="text-sm text-muted-foreground">Partially Integrated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{scanResult.summary.criticalIssues}</div>
                    <div className="text-sm text-muted-foreground">Critical Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Official GAiA Token Info */}
            <Card className="mb-6 border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🌍 Official GAiA Token Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Contract Address:</div>
                    <div className="font-mono text-xs text-green-400 break-all bg-gray-800 p-2 rounded">
                      {GAIA_TOKEN.CONTRACT_ADDRESS}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Wallet Address:</div>
                    <div className="font-mono text-xs text-green-400 break-all bg-gray-800 p-2 rounded">
                      {GAIA_TOKEN.WALLET_ADDRESS}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Network:</div>
                    <div className="text-green-400">{GAIA_TOKEN.NETWORK}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Symbol:</div>
                    <div className="text-green-400">{GAIA_TOKEN.SYMBOL}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="components" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="components">📊 Component Status</TabsTrigger>
                <TabsTrigger value="issues">⚠️ Issues & Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-4">
                <div className="grid gap-4">
                  {scanResult.componentIntegrations.map((component: ComponentIntegration, index: number) => (
                    <Card key={index} className="border-gray-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{component.name}</div>
                            <div className="text-sm text-muted-foreground">{component.path}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getIntegrationLevelColor(component.integrationLevel)}>
                              {component.integrationLevel} INTEGRATION
                            </Badge>
                            {component.hasGaiaIntegration ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                        {component.issues.length > 0 && (
                          <div className="mt-2 text-sm text-yellow-400">
                            {component.issues.length} issue(s) found
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="issues" className="space-y-4">
                {scanResult.issues.length === 0 ? (
                  <Card className="border-green-500/30 bg-green-900/20">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-4" />
                      <div className="text-xl font-bold text-green-400">✅ All Systems Consistent!</div>
                      <div className="text-muted-foreground">No GAiA token integration issues found.</div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {scanResult.issues.map((issue: ConsistencyIssue, index: number) => (
                      <Card key={index} className={`border-l-4 ${
                        issue.severity === 'high' ? 'border-l-red-500 bg-red-900/20' :
                        issue.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-900/20' :
                        'border-l-blue-500 bg-blue-900/20'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getStatusColor(issue.status)}>
                              {issue.status}
                            </Badge>
                            <Badge variant="outline" className={
                              issue.severity === 'high' ? 'text-red-400' :
                              issue.severity === 'medium' ? 'text-yellow-400' :
                              'text-blue-400'
                            }>
                              {issue.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="font-medium mb-1">{issue.issue}</div>
                          <div className="text-sm text-muted-foreground mb-2">File: {issue.file}</div>
                          <div className="text-sm text-blue-400">💡 {issue.recommendation}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

export default GaiaConsistencyStatus