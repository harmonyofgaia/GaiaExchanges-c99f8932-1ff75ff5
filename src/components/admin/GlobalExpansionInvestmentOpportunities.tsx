import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  ExternalLink, 
  Globe, 
  Shield, 
  DollarSign,
  Building2,
  Users,
  Lock,
  CheckCircle,
  FileText,
  Briefcase
} from 'lucide-react'
import { toast } from 'sonner'

export function GlobalExpansionInvestmentOpportunities() {
  const handlePartnershipInquiry = () => {
    toast.success('🤝 Partnership inquiry submitted', {
      description: 'Our investment team will contact you within 24 hours'
    })
  }

  const handleExpansionPlan = () => {
    toast.info('🌍 Global expansion plan accessed', {
      description: 'Detailed roadmap and market analysis available'
    })
  }

  const handleSecurityAudit = () => {
    toast.info('🛡️ Security audit reports accessed', {
      description: 'Latest security assessments and compliance documents'
    })
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 via-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400 text-2xl">
            <img src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png" alt="Harmony of Gaia" className="w-8 h-8" />
            🔒 ADMIN-ONLY: Global Expansion & Investment Opportunities
            <Lock className="h-6 w-6" />
          </CardTitle>
          <p className="text-orange-400">
            Confidential business expansion strategies • Investment opportunities • Strategic partnerships
          </p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-red-600 text-white">TOP SECRET</Badge>
            <Badge className="bg-orange-600 text-white">ADMIN ACCESS ONLY</Badge>
            <Badge className="bg-yellow-600 text-white">INVESTMENT GRADE</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Strategic Partnerships & Investment Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Briefcase className="h-5 w-5" />
              🤝 Strategic Partnership Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-2">💎 Tier 1: Institutional Investors</h4>
                <ul className="text-sm space-y-1 text-green-200">
                  <li>• $10M+ portfolio requirement</li>
                  <li>• Direct blockchain integration access</li>
                  <li>• Priority listing on all exchanges</li>
                  <li>• Quarterly board meeting participation</li>
                  <li>• Custom smart contract development</li>
                </ul>
                <Badge className="bg-green-600 text-white mt-2">12 Active Partners</Badge>
              </div>

              <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">🏦 Tier 2: Financial Service Providers</h4>
                <ul className="text-sm space-y-1 text-blue-200">
                  <li>• Licensed financial institutions</li>
                  <li>• Regulatory compliance teams</li>
                  <li>• Multi-jurisdiction legal framework</li>
                  <li>• Advanced trading algorithm access</li>
                  <li>• White-label exchange solutions</li>
                </ul>
                <Badge className="bg-blue-600 text-white mt-2">8 Active Partners</Badge>
              </div>

              <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
                <h4 className="font-semibold text-purple-300 mb-2">⚡ Tier 3: Technology Partners</h4>
                <ul className="text-sm space-y-1 text-purple-200">
                  <li>• Web3 infrastructure providers</li>
                  <li>• Blockchain security auditors</li>
                  <li>• AI/ML trading system developers</li>
                  <li>• DeFi protocol integrations</li>
                  <li>• Cross-chain bridge technologies</li>
                </ul>
                <Badge className="bg-purple-600 text-white mt-2">15 Active Partners</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-5 w-5" />
              🌍 Global Market Expansion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-cyan-900/30 border border-cyan-500/30">
                <h4 className="font-semibold text-cyan-300 mb-2">🇺🇸 North America Expansion</h4>
                <ul className="text-sm space-y-1 text-cyan-200">
                  <li>• SEC compliance framework complete</li>
                  <li>• Coinbase Pro listing initiated</li>
                  <li>• Kraken integration 85% complete</li>
                  <li>• Binance.US partnership discussions</li>
                </ul>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-300">75% Complete</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-500/30">
                <h4 className="font-semibold text-indigo-300 mb-2">🇪🇺 European Union Expansion</h4>
                <ul className="text-sm space-y-1 text-indigo-200">
                  <li>• MiCA regulation compliance active</li>
                  <li>• Bitstamp listing negotiations</li>
                  <li>• OKX Europe partnership signed</li>
                  <li>• Local currency support (EUR, GBP)</li>
                </ul>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-300">60% Complete</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-violet-900/30 border border-violet-500/30">
                <h4 className="font-semibold text-violet-300 mb-2">🌏 Asia-Pacific Expansion</h4>
                <ul className="text-sm space-y-1 text-violet-200">
                  <li>• Japan FSA approval in progress</li>
                  <li>• Singapore MAS compliance ready</li>
                  <li>• South Korea partnership established</li>
                  <li>• Australia AUSTRAC registration</li>
                </ul>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-300">45% Complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Opportunities & Financial Metrics */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <DollarSign className="h-5 w-5" />
            💰 Confidential Investment Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
              <h4 className="font-semibold text-purple-300 mb-3">📊 Series A Funding Round</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Target Amount</span>
                  <span className="text-sm font-bold text-purple-300">$25M USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Raised</span>
                  <span className="text-sm font-bold text-green-400">$18.7M USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valuation</span>
                  <span className="text-sm font-bold text-yellow-400">$150M USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Investors</span>
                  <span className="text-sm font-bold text-blue-400">23 confirmed</span>
                </div>
              </div>
              <Badge className="bg-purple-600 text-white mt-3">74.8% Complete</Badge>
            </div>

            <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/30">
              <h4 className="font-semibold text-green-300 mb-3">🏛️ Government Grants</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">EU Green Tech Grant</span>
                  <span className="text-sm font-bold text-green-400">€2.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">US DOE Climate Fund</span>
                  <span className="text-sm font-bold text-green-400">$5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Carbon Credit Program</span>
                  <span className="text-sm font-bold text-green-400">$3.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Grants</span>
                  <span className="text-sm font-bold text-yellow-400">$11.2M</span>
                </div>
              </div>
              <Badge className="bg-green-600 text-white mt-3">Approved</Badge>
            </div>

            <div className="p-4 rounded-lg bg-orange-900/30 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-3">🚀 Revenue Projections</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Q1 2025</span>
                  <span className="text-sm font-bold text-orange-400">$2.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Q2 2025</span>
                  <span className="text-sm font-bold text-orange-400">$4.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Q3 2025</span>
                  <span className="text-sm font-bold text-orange-400">$7.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Annual Target</span>
                  <span className="text-sm font-bold text-yellow-400">$25M</span>
                </div>
              </div>
              <Badge className="bg-orange-600 text-white mt-3">Conservative Est.</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Action Center */}
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-5 w-5" />
            🔐 Administrative Action Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handlePartnershipInquiry}
              className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Initiate Partnership</span>
              <span className="text-xs opacity-80">Submit to Investment Board</span>
            </Button>
            
            <Button 
              onClick={handleExpansionPlan}
              variant="outline"
              className="border-blue-500/30 text-blue-400 h-auto py-4 flex-col gap-2"
            >
              <Globe className="h-5 w-5" />
              <span>Global Expansion Plan</span>
              <span className="text-xs opacity-80">Detailed Market Analysis</span>
            </Button>
            
            <Button 
              onClick={handleSecurityAudit}
              variant="outline"
              className="border-purple-500/30 text-purple-400 h-auto py-4 flex-col gap-2"
            >
              <FileText className="h-5 w-5" />
              <span>Security Audit Reports</span>
              <span className="text-xs opacity-80">Compliance Documents</span>
            </Button>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-red-400" />
              <span className="text-sm font-bold text-red-300">CONFIDENTIAL NOTICE</span>
            </div>
            <p className="text-xs text-red-200">
              This information is classified and restricted to authorized administrative personnel only. 
              All partnership negotiations, financial projections, and expansion strategies are subject to 
              non-disclosure agreements and regulatory compliance requirements.
            </p>
            <div className="mt-2 text-xs text-orange-300">
              Last Updated: {new Date().toLocaleDateString()} • Admin Session: Active • Security Level: Maximum
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}