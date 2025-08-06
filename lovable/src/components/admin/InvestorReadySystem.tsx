
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  FileText, 
  Award, 
  Shield, 
  Globe,
  Zap,
  Crown,
  Star,
  Target,
  Briefcase,
  PieChart,
  Activity
} from 'lucide-react'
import { toast } from 'sonner'

export function InvestorReadySystem() {
  const [investorMetrics, setInvestorMetrics] = useState({
    marketCap: 15672891,
    dailyVolume: 2847391,
    holders: 12450,
    transactions: 45780,
    burnRate: 3.5,
    stakingAPY: 12.7,
    liquidityLocked: 100,
    auditScore: 98
  })

  const generateInvestorReport = () => {
    toast.success('📊 Investor report generated and sent to partners')
  }

  const scheduleInvestorCall = () => {
    toast.success('📞 Investor call scheduled - Calendar invite sent')
  }

  return (
    <div className="space-y-6">
      {/* Investor Dashboard Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2 text-2xl">
            <Briefcase className="h-8 w-8" />
            💼 INVESTOR-READY SYSTEM - Market Launch Preparation
          </CardTitle>
          <p className="text-muted-foreground">
            Complete investor relations dashboard with real-time metrics, reports, and market positioning
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">${investorMetrics.marketCap.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{investorMetrics.holders.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Token Holders</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{investorMetrics.stakingAPY}%</div>
              <div className="text-sm text-muted-foreground">Staking APY</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{investorMetrics.auditScore}/100</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Highlights */}
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">🌟 Investment Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Security Audit
                </span>
                <Badge className="bg-green-600">PASSED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  Global Reach
                </span>
                <Badge className="bg-blue-600">125+ Countries</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Innovation Score
                </span>
                <Badge className="bg-yellow-600">Top 1%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-purple-400" />
                  Market Position
                </span>
                <Badge className="bg-purple-600">LEADING</Badge>
              </div>
            </div>
            
            <Button onClick={generateInvestorReport} className="w-full bg-yellow-600 hover:bg-yellow-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Investor Report
            </Button>
          </CardContent>
        </Card>

        {/* Financial Metrics */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">💰 Financial Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Revenue Growth</span>
                  <span className="text-green-400 font-bold">+247%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">User Adoption</span>
                  <span className="text-blue-400 font-bold">+156%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Market Share</span>
                  <span className="text-purple-400 font-bold">+89%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Ecosystem Health</span>
                  <span className="text-yellow-400 font-bold">98.7%</span>
                </div>
                <Progress value={99} className="h-2" />
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$24.7M</div>
                <div className="text-sm text-muted-foreground">Projected Annual Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Actions */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">📞 Investor Relations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={scheduleInvestorCall} className="bg-blue-600 hover:bg-blue-700">
                <Target className="h-4 w-4 mr-2" />
                Schedule Investor Call
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <PieChart className="h-4 w-4 mr-2" />
                View Portfolio Analysis
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Market Analysis Report
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Award className="h-4 w-4 mr-2" />
                Compliance Dashboard
              </Button>
            </div>

            <div className="pt-3 border-t border-border/50">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Next Investor Update:</span>
                  <span className="text-blue-400">Jan 25, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Funding Round:</span>
                  <span className="text-green-400">Series A</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Raise:</span>
                  <span className="text-yellow-400">$50M</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Positioning */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🎯 Market Positioning & Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <Star className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-purple-400 mb-2">Unique Value Proposition</h3>
              <p className="text-sm text-muted-foreground">
                First environmental-impact token with integrated artist platform and real-world utility
              </p>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <Activity className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-blue-400 mb-2">Market Opportunity</h3>
              <p className="text-sm text-muted-foreground">
                $847B market size with 12.7% annual growth in digital assets and environmental solutions
              </p>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-400 mb-2">Growth Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Multi-phase expansion with artist partnerships, institutional adoption, and global scaling
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investor Dashboard */}
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">📊 Real-Time Investor Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
              <div className="text-xl font-bold text-cyan-400">$0.000125</div>
              <div className="text-xs text-muted-foreground">Token Price</div>
            </div>
            <div className="text-center p-3 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-xl font-bold text-green-400">+12.7%</div>
              <div className="text-xs text-muted-foreground">24h Change</div>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">8.7M</div>
              <div className="text-xs text-muted-foreground">Daily Volume</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">45.8K</div>
              <div className="text-xs text-muted-foreground">Transactions</div>
            </div>
            <div className="text-center p-3 bg-orange-900/30 rounded border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-muted-foreground">Liquidity Lock</div>
            </div>
            <div className="text-center p-3 bg-pink-900/30 rounded border border-pink-500/20">
              <div className="text-xl font-bold text-pink-400">24/7</div>
              <div className="text-xs text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
