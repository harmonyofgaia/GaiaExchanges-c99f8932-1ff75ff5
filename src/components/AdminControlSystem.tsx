
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Shield, DollarSign, Eye } from 'lucide-react'
import { TokenManagement } from './admin/TokenManagement'
import { DailyAdvertising } from './admin/DailyAdvertising'

export function AdminControlSystem() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Settings className="h-5 w-5" />
            Admin Control System - Welcome Synatic
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-green-600">Secure Session Active</Badge>
            <Badge className="bg-blue-600">Device Verified</Badge>
            <Badge className="bg-purple-600">Ultra-Secure Mode</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <p className="text-sm text-muted-foreground">System Monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <p className="text-sm text-muted-foreground">GAiA Supply</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">0.00%</div>
              <p className="text-sm text-muted-foreground">Trading Fees</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <p className="text-sm text-muted-foreground">Security Level</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="advertising">Daily Advertising</TabsTrigger>
          <TabsTrigger value="fees">Fee Optimization</TabsTrigger>
          <TabsTrigger value="transparency">Transparency</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <TokenManagement />
        </TabsContent>

        <TabsContent value="advertising">
          <DailyAdvertising />
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Advanced Fee Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Zero-Cost Trading Vision</h4>
                <p className="text-sm text-green-300">
                  GAiA token trading operates with zero fees, setting the industry standard for cost-effective cryptocurrency exchange.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transparency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Full Transparency Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">Public Access</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Wallet Visibility:</span>
                      <Badge className="bg-green-600">100% Open</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction History:</span>
                      <Badge className="bg-green-600">Real-time</Badge>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2">Community Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Open Source:</span>
                      <Badge className="bg-blue-600">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>24/7 Support:</span>
                      <Badge className="bg-blue-600">Available</Badge>
                    </div>
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
