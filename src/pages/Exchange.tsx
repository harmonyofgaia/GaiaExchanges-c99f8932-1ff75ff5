
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, ArrowUpDown, DollarSign, BarChart3, Activity, PieChart, LineChart } from 'lucide-react'
import { Link } from 'react-router-dom'
import HoverSidebar from '@/components/HoverSidebar'
import { ExchangeAnalytics } from '@/components/exchange/ExchangeAnalytics'

const Exchange = () => {
  const [selectedTab, setSelectedTab] = useState('trading')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                💱 GAiA Exchange Hub
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Professional trading platform • Enhanced security • Real-time analytics
              </p>
            </CardHeader>
          </Card>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trading">💰 Trading</TabsTrigger>
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="advanced">⚡ Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="trading" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-green-500/30 bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <TrendingUp className="h-6 w-6" />
                      Pure Investment Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Long-term investment focus with stability over speculation.
                    </p>
                    <Link to="/swap">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Access Investment Portal
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <ArrowUpDown className="h-6 w-6" />
                      Advanced Swap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Professional trading tools with advanced swap features.
                    </p>
                    <Link to="/swap">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Launch Swap Interface
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/30 bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <BarChart3 className="h-6 w-6" />
                      Live Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Real-time market data and advanced analytics tools.
                    </p>
                    <Button 
                      onClick={() => setSelectedTab('analytics')}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8 border-emerald-500/30 bg-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-emerald-400">📊 Market Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-900/20 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-400">$0.000125</div>
                      <div className="text-sm text-muted-foreground">GAiA Price</div>
                      <Badge className="mt-2 bg-green-600">+5.67%</Badge>
                    </div>
                    <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-400">$1.2M</div>
                      <div className="text-sm text-muted-foreground">24h Volume</div>
                      <Badge className="mt-2 bg-blue-600">Active</Badge>
                    </div>
                    <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-400">1B</div>
                      <div className="text-sm text-muted-foreground">Total Supply</div>
                      <Badge className="mt-2 bg-purple-600">Fixed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <ExchangeAnalytics />
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-orange-500/30 bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-orange-400">🔥 Advanced Trading Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Limit Orders</span>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stop Loss</span>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Take Profit</span>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Advanced Charting</span>
                        <Badge className="bg-blue-600">Pro</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-500/30 bg-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">⚡ Quantum Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Multi-Sig Protection</span>
                        <Badge className="bg-green-600">✓</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quantum Encryption</span>
                        <Badge className="bg-green-600">✓</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Real-time Monitoring</span>
                        <Badge className="bg-green-600">✓</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fraud Detection</span>
                        <Badge className="bg-blue-600">AI</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🛡️ Exchange Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-bold text-blue-400">🔒 Advanced Protection</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multi-signature wallet security</li>
                  <li>• Real-time fraud detection</li>
                  <li>• Cold storage for assets</li>
                  <li>• Insurance coverage</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-purple-400">⚡ Trading Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Instant settlement</li>
                  <li>• Low transaction fees</li>
                  <li>• Advanced order types</li>
                  <li>• Portfolio tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange
