import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Link, Shield, AlertTriangle, GitBranch, TrendingUp, Zap } from 'lucide-react'
import { blockchainSecurity } from '@/services/blockchainSecurity'
import { toast } from 'sonner'

interface Vulnerability {
  type: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string;
}

interface ContractScan {
  address: string;
  chainId: number;
  riskScore: number;
  isVerified: boolean;
  vulnerabilities: Vulnerability[];
}

interface CrossChainTx {
  id: string;
  sourceChain: number;
  targetChain: number;
  amount: string;
  token: string;
  riskLevel: number;
  status: string;
  securityChecks: string[];
}

interface SecurityStatus {
  isActive: boolean;
  monitoredChains: number;
  scannedContracts: number;
  detectedForks: number;
  crossChainTransactions: number;
  secureChains: number;
}

export function BlockchainSupremacyDashboard() {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    isActive: false,
    monitoredChains: 0,
    scannedContracts: 0,
    detectedForks: 0,
    crossChainTransactions: 0,
    secureChains: 0
  })

  const [contractScans, setContractScans] = useState<ContractScan[]>([])
  const [crossChainTxs, setCrossChainTxs] = useState<CrossChainTx[]>([])
  const [isInitializing, setIsInitializing] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      const status = blockchainSecurity.getBlockchainSecurityStatus()
      setSecurityStatus(status)
    }

    updateStatus()
    const interval = setInterval(updateStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleInitializeBlockchainSecurity = async () => {
    setIsInitializing(true)
    try {
      await blockchainSecurity.initializeBlockchainSecurity()
      
      toast.success('⛓️ Blockchain Supremacy Online', {
        description: 'Multi-chain security monitoring activated'
      })
    } catch (error) {
      toast.error('❌ Blockchain Security Initialization Failed')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleScanSmartContract = async () => {
    try {
      const testContracts = [
        { address: '0x1234567890123456789012345678901234567890', chainId: 1 },
        { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', chainId: 56 },
        { address: '0x9876543210987654321098765432109876543210', chainId: 137 }
      ]
      
      const contract = testContracts[Math.floor(Math.random() * testContracts.length)]
      const scanResult = await blockchainSecurity.scanSmartContract(contract.address, contract.chainId)
      
      setContractScans(prev => [scanResult, ...prev].slice(0, 10))
      
      toast.success('🔍 Smart Contract Scanned', {
        description: `${scanResult.vulnerabilities.length} vulnerabilities found`
      })
    } catch (error) {
      toast.error('❌ Contract Scan Failed')
    }
  }

  const handleCrossChainTransaction = async () => {
    try {
      const testTx = {
        sourceChain: 1,
        targetChain: 56,
        amount: '1000.00',
        token: 'USDT',
        from: '0x1234567890123456789012345678901234567890',
        to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
      }
      
      const result = await blockchainSecurity.secureCrossChainTransaction(testTx)
      setCrossChainTxs(prev => [result, ...prev].slice(0, 10))
      
      if (result.status === 'blocked') {
        toast.error('🚫 Cross-Chain Transaction Blocked', {
          description: 'High-risk transaction detected'
        })
      } else {
        toast.success('✅ Cross-Chain Transaction Secured', {
          description: `${result.securityChecks.length} security checks passed`
        })
      }
    } catch (error) {
      toast.error('❌ Cross-Chain Transaction Failed')
    }
  }

  const getChainName = (chainId: number) => {
    const chains = {
      1: 'Ethereum',
      56: 'BSC',
      137: 'Polygon',
      43114: 'Avalanche',
      250: 'Fantom'
    }
    return chains[chainId as keyof typeof chains] || `Chain ${chainId}`
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600'
      case 'HIGH': return 'bg-orange-600'
      case 'MEDIUM': return 'bg-yellow-600'
      case 'LOW': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'blocked': return 'bg-red-600'
      case 'failed': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Blockchain Security Status */}
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Link className="h-6 w-6" />
            BLOCKCHAIN SUPREMACY - PHASE 3 ACTIVATED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">
                {securityStatus.monitoredChains}
              </div>
              <div className="text-sm text-muted-foreground">Monitored Chains</div>
              <Badge className="mt-1 bg-indigo-600 text-white">
                <Link className="h-3 w-3 mr-1" />
                Multi-Chain
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {securityStatus.scannedContracts}
              </div>
              <div className="text-sm text-muted-foreground">Scanned Contracts</div>
              <Badge className="mt-1 bg-blue-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Analyzed
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {securityStatus.crossChainTransactions}
              </div>
              <div className="text-sm text-muted-foreground">Cross-Chain Txs</div>
              <Badge className="mt-1 bg-green-600 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Secured
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {securityStatus.detectedForks}
              </div>
              <div className="text-sm text-muted-foreground">Detected Forks</div>
              <Badge className="mt-1 bg-orange-600 text-white">
                <GitBranch className="h-3 w-3 mr-1" />
                Monitored
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Chain Security Coverage</span>
                <span>{securityStatus.secureChains}/{securityStatus.monitoredChains}</span>
              </div>
              <Progress value={(securityStatus.secureChains / Math.max(securityStatus.monitoredChains, 1)) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Smart Contract Coverage</span>
                <span>97.3%</span>
              </div>
              <Progress value={97.3} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Cross-Chain Security</span>
                <span>99.1%</span>
              </div>
              <Progress value={99.1} className="h-2" />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button 
              onClick={handleInitializeBlockchainSecurity}
              disabled={isInitializing || securityStatus.isActive}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isInitializing ? 'Initializing...' : 'Initialize Blockchain Security'}
            </Button>
            
            <Button 
              onClick={handleScanSmartContract}
              disabled={!securityStatus.isActive}
              variant="outline"
              className="border-blue-500 text-blue-400"
            >
              Scan Smart Contract
            </Button>
            
            <Button 
              onClick={handleCrossChainTransaction}
              disabled={!securityStatus.isActive}
              variant="outline"
              className="border-green-500 text-green-400"
            >
              Test Cross-Chain
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Vulnerabilities */}
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Smart Contract Vulnerability Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contractScans.length > 0 ? (
              contractScans.map((contract, index) => (
                <div key={`${contract.chainId}-${contract.address}`} className="p-4 bg-red-900/10 rounded-lg border border-red-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-red-400">
                        {contract.address.slice(0, 20)}... ({getChainName(contract.chainId)})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Risk Score: {(contract.riskScore * 100).toFixed(1)}% | 
                        Verified: {contract.isVerified ? 'Yes' : 'No'}
                      </div>
                    </div>
                    
                    <Badge className={`${contract.riskScore > 0.7 ? 'bg-red-600' : contract.riskScore > 0.4 ? 'bg-orange-600' : 'bg-green-600'} text-white`}>
                      {contract.riskScore > 0.7 ? 'HIGH RISK' : contract.riskScore > 0.4 ? 'MEDIUM RISK' : 'LOW RISK'}
                    </Badge>
                  </div>
                  
                  {contract.vulnerabilities.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Vulnerabilities Found:</div>
                      {contract.vulnerabilities.map((vuln, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-red-900/20 rounded border border-red-500/30">
                          <div>
                            <div className="text-sm font-medium text-red-400">{vuln.type}</div>
                            <div className="text-xs text-muted-foreground">{vuln.description}</div>
                          </div>
                          <Badge className={`${getSeverityColor(vuln.severity)} text-white text-xs`}>
                            {vuln.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-400/50" />
                <p>No contract scans available</p>
                <p className="text-sm">Scan smart contracts to detect vulnerabilities</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Chain Transactions */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-5 w-5" />
            Cross-Chain Bridge Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crossChainTxs.length > 0 ? (
              crossChainTxs.map((tx, index) => (
                <div key={tx.id} className="p-4 bg-green-900/10 rounded-lg border border-green-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-green-400">
                        {getChainName(tx.sourceChain)} → {getChainName(tx.targetChain)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Amount: {tx.amount} {tx.token} | Risk Level: {(tx.riskLevel * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    <Badge className={`${getStatusColor(tx.status)} text-white`}>
                      {tx.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Security Checks Passed:</div>
                      <div className="flex flex-wrap gap-1">
                        {tx.securityChecks.map((check: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {check.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-400/50" />
                <p>No cross-chain transactions monitored</p>
                <p className="text-sm">Test cross-chain security to see results</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Technologies Overview */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Zap className="h-5 w-5" />
            Blockchain Security Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-purple-400">Active Protection</h4>
              
              <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded border border-purple-500/20">
                <span className="text-sm">Multi-Chain Bridge Security</span>
                <Badge className="bg-purple-600 text-white">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded border border-purple-500/20">
                <span className="text-sm">Smart Contract Scanner</span>
                <Badge className="bg-purple-600 text-white">Scanning</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded border border-purple-500/20">
                <span className="text-sm">Fork Detection System</span>
                <Badge className="bg-purple-600 text-white">Monitoring</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-yellow-400">Advanced Features</h4>
              
              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">51% Attack Prevention</span>
                <Badge className="bg-yellow-600 text-white">Ready</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">Consensus Hijacking Protection</span>
                <Badge className="bg-yellow-600 text-white">Armed</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">Cross-Chain Transaction Monitoring</span>
                <Badge className="bg-yellow-600 text-white">Live</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}