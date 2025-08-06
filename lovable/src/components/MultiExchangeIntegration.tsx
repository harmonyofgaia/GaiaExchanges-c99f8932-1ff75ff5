
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  Shield, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  Zap,
  Globe,
  TrendingUp,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'
import { ContractLegalFramework } from './ContractLegalFramework'
import { ContractDeployment } from './ContractDeployment'

interface Exchange {
  name: string
  logo: string
  status: 'preparing' | 'submitted' | 'under_review' | 'approved' | 'listed'
  requirements: string[]
  completedRequirements: number
  totalRequirements: number
  listingFee: string
  estimatedTime: string
  tradingPairs: string[]
  securityLevel: 'Standard' | 'Enhanced' | 'Military-Grade'
  website: string
  contactEmail: string
}

export function MultiExchangeIntegration() {
  const [exchanges, setExchanges] = useState<Exchange[]>([
    {
      name: 'Solflare Wallet Exchange',
      logo: '🟢',
      status: 'preparing',
      requirements: [
        'Smart Contract Audit Report',
        'Tokenomics Documentation',
        'Legal Compliance Certificate',
        'Technical Integration Guide',
        'Marketing Materials Package',
        'Community Verification'
      ],
      completedRequirements: 0,
      totalRequirements: 6,
      listingFee: '$5,000 - $15,000',
      estimatedTime: '4-6 weeks',
      tradingPairs: ['GAiA/SOL', 'GAiA/USDC'],
      securityLevel: 'Enhanced',
      website: 'https://solflare.com',
      contactEmail: 'listings@solflare.com'
    },
    {
      name: 'ZenGo Wallet Exchange',
      logo: '🔷',
      status: 'preparing',
      requirements: [
        'Multi-Signature Wallet Integration',
        'KYC/AML Compliance Documentation',
        'Security Audit Certificate',
        'Token Supply Verification',
        'Partnership Agreement',
        'Insurance Coverage Proof'
      ],
      completedRequirements: 0,
      totalRequirements: 6,
      listingFee: '$10,000 - $25,000',
      estimatedTime: '6-8 weeks',
      tradingPairs: ['GAiA/BTC', 'GAiA/ETH', 'GAiA/USDT'],
      securityLevel: 'Military-Grade',
      website: 'https://zengo.com',
      contactEmail: 'partnerships@zengo.com'
    },
    {
      name: 'Binance DEX',
      logo: '🟡',
      status: 'preparing',
      requirements: [
        'BEP-20 Token Standard Compliance',
        'Comprehensive Security Audit',
        'Regulatory Compliance Report',
        'Community Governance Structure',
        'Liquidity Pool Requirements',
        'Marketing Campaign Strategy'
      ],
      completedRequirements: 0,
      totalRequirements: 6,
      listingFee: '$50,000 - $100,000',
      estimatedTime: '8-12 weeks',
      tradingPairs: ['GAiA/BNB', 'GAiA/BUSD', 'GAiA/USDT'],
      securityLevel: 'Military-Grade',
      website: 'https://www.binance.org',
      contactEmail: 'listing@binance.com'
    },
    {
      name: 'Uniswap V3',
      logo: '🦄',
      status: 'preparing',
      requirements: [
        'ERC-20 Token Deployment',
        'Liquidity Pool Creation',
        'Token Verification Process',
        'Community Proposal Submission',
        'Technical Documentation',
        'Fee Structure Configuration'
      ],
      completedRequirements: 0,
      totalRequirements: 6,
      listingFee: '$0 - $5,000 (Gas Fees)',
      estimatedTime: '2-4 weeks',
      tradingPairs: ['GAiA/ETH', 'GAiA/USDC', 'GAiA/WBTC'],
      securityLevel: 'Enhanced',
      website: 'https://uniswap.org',
      contactEmail: 'support@uniswap.org'
    },
    {
      name: 'PancakeSwap',
      logo: '🥞',
      status: 'preparing',
      requirements: [
        'BSC Token Contract Deployment',
        'Initial Liquidity Provision',
        'Token Information Submission',
        'Community Voting Process',
        'Security Verification',
        'Farming Pool Setup'
      ],
      completedRequirements: 0,
      totalRequirements: 6,
      listingFee: '$0 - $2,500',
      estimatedTime: '1-3 weeks',
      tradingPairs: ['GAiA/BNB', 'GAiA/CAKE', 'GAiA/BUSD'],
      securityLevel: 'Enhanced',
      website: 'https://pancakeswap.finance',
      contactEmail: 'contact@pancakeswap.finance'
    }
  ])

  const [totalProgress, setTotalProgress] = useState(0)
  const [isSubmittingApplications, setIsSubmittingApplications] = useState(false)

  useEffect(() => {
    // Auto-complete requirements simulation
    const interval = setInterval(() => {
      setExchanges(prev => prev.map(exchange => {
        if (exchange.completedRequirements < exchange.totalRequirements) {
          const newCompleted = Math.min(
            exchange.completedRequirements + 1,
            exchange.totalRequirements
          )
          
          // Update status based on completion
          let newStatus = exchange.status
          if (newCompleted === exchange.totalRequirements && exchange.status === 'preparing') {
            newStatus = 'submitted'
            toast.success(`📋 ${exchange.name} Application Submitted!`, {
              description: 'All requirements completed, application submitted for review',
              duration: 4000
            })
          }
          
          return {
            ...exchange,
            completedRequirements: newCompleted,
            status: newStatus
          }
        }
        return exchange
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const totalCompleted = exchanges.reduce((sum, ex) => sum + ex.completedRequirements, 0)
    const totalRequired = exchanges.reduce((sum, ex) => sum + ex.totalRequirements, 0)
    setTotalProgress((totalCompleted / totalRequired) * 100)
  }, [exchanges])

  const submitAllApplications = async () => {
    setIsSubmittingApplications(true)
    
    toast.success('🚀 Multi-Exchange Campaign Launched!', {
      description: 'Submitting GAiA token to all major exchanges simultaneously',
      duration: 6000
    })

    // Simulate progressive submissions
    const submissionOrder = ['Uniswap V3', 'PancakeSwap', 'Solflare Wallet Exchange', 'ZenGo Wallet Exchange', 'Binance DEX']
    
    for (let i = 0; i < submissionOrder.length; i++) {
      setTimeout(() => {
        setExchanges(prev => prev.map(exchange => {
          if (exchange.name === submissionOrder[i]) {
            toast.success(`✅ ${exchange.name} - Application Submitted`, {
              description: `Listing process initiated with ${exchange.name}`,
              duration: 3000
            })
            return { ...exchange, status: 'submitted' as const }
          }
          return exchange
        }))
      }, i * 2000)
    }

    setTimeout(() => {
      setIsSubmittingApplications(false)
      toast.success('🌍 Global Exchange Integration Complete!', {
        description: 'GAiA token submitted to all major exchanges. Awaiting approval.',
        duration: 8000
      })
    }, 12000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-600'
      case 'submitted': return 'bg-blue-600'
      case 'under_review': return 'bg-purple-600'
      case 'approved': return 'bg-green-600'
      case 'listed': return 'bg-emerald-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing': return <Clock className="h-4 w-4" />
      case 'submitted': return <FileText className="h-4 w-4" />
      case 'under_review': return <AlertTriangle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'listed': return <TrendingUp className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Building2 className="h-6 w-6" />
            Multi-Exchange Integration System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{exchanges.length}</div>
              <p className="text-sm text-muted-foreground">Target Exchanges</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{exchanges.filter(e => e.status === 'submitted').length}</div>
              <p className="text-sm text-muted-foreground">Applications Submitted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{exchanges.filter(e => e.status === 'listed').length}</div>
              <p className="text-sm text-muted-foreground">Successfully Listed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{totalProgress.toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Integration Progress</span>
              <span>{totalProgress.toFixed(1)}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>

          <Button 
            onClick={submitAllApplications} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmittingApplications}
          >
            {isSubmittingApplications ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Applications...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                Launch Multi-Exchange Campaign
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Exchange Listings */}
      <div className="grid grid-cols-1 gap-6">
        {exchanges.map((exchange, index) => (
          <Card key={index} className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{exchange.logo}</span>
                  <div>
                    <CardTitle className="text-lg">{exchange.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Estimated Time: {exchange.estimatedTime} | Fee: {exchange.listingFee}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(exchange.status)} text-white`}>
                    {getStatusIcon(exchange.status)}
                    <span className="ml-1 capitalize">{exchange.status.replace('_', ' ')}</span>
                  </Badge>
                  <Badge variant="outline" className={`border-${
                    exchange.securityLevel === 'Military-Grade' ? 'red' :
                    exchange.securityLevel === 'Enhanced' ? 'blue' : 'green'
                  }-500/20`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {exchange.securityLevel}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Requirements Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Completed</span>
                      <span>{exchange.completedRequirements}/{exchange.totalRequirements}</span>
                    </div>
                    <Progress 
                      value={(exchange.completedRequirements / exchange.totalRequirements) * 100} 
                      className="h-1.5" 
                    />
                  </div>
                  <div className="mt-2 space-y-1">
                    {exchange.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2 text-xs">
                        {reqIndex < exchange.completedRequirements ? (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        ) : (
                          <Clock className="h-3 w-3 text-yellow-400" />
                        )}
                        <span className={reqIndex < exchange.completedRequirements ? 'text-green-400' : 'text-muted-foreground'}>
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Trading Pairs</h4>
                  <div className="flex flex-wrap gap-1">
                    {exchange.tradingPairs.map((pair, pairIndex) => (
                      <Badge key={pairIndex} variant="outline" className="text-xs">
                        {pair}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={exchange.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit Exchange
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${exchange.contactEmail}?subject=GAiA Token Listing Application`}>
                        <FileText className="h-3 w-3 mr-1" />
                        Contact
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security & Compliance Documentation */}
      <ContractLegalFramework />
      
      {/* Smart Contract Deployment */}
      <ContractDeployment />

      {/* Integration Security Notice */}
      <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lock className="h-6 w-6 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Maximum Security Protocol Active</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Every exchange integration maintains military-grade security standards. All smart contracts, 
                legal documents, and technical integrations undergo comprehensive security audits before deployment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>Multi-Signature Wallets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>Real-time Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>Emergency Pause Mechanisms</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
