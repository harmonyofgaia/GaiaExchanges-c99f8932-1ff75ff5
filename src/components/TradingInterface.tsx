
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react'

export function TradingInterface() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>GAiA Token Information</span>
          <Badge variant="outline" className="border-green-500/20 text-green-400">
            Non-Tradeable
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Trading Disabled Notice */}
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-400">
              <strong>Trading Disabled:</strong> GAiA tokens are designed for environmental impact, not speculation. 
              Buy and sell orders are not available to maintain ecosystem stability and focus on sustainability goals.
            </AlertDescription>
          </Alert>

          {/* Token Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Token Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Name:</span>
                  <span className="font-medium">Harmony of Gaia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol:</span>
                  <span className="font-medium">GAiA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Value:</span>
                  <span className="font-medium mono-numbers">$3.00 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-medium">Multi-chain</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Ecosystem Features</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staking:</span>
                  <span className="text-red-400">Not Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trading:</span>
                  <span className="text-red-400">Disabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Burning:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Environmental Impact:</span>
                  <span className="text-green-400">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* How to Get GAiA */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-3">How to Acquire GAiA Tokens</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                <div>
                  <p className="font-medium">Environmental Contributions</p>
                  <p className="text-sm text-muted-foreground">Participate in verified environmental projects</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                <div>
                  <p className="font-medium">Community Rewards</p>
                  <p className="text-sm text-muted-foreground">Earn tokens through community engagement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</div>
                <div>
                  <p className="font-medium">Direct Allocation</p>
                  <p className="text-sm text-muted-foreground">Receive tokens through official distribution events</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disabled Trading Interface */}
          <div className="grid grid-cols-2 gap-4 opacity-50">
            <div className="space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/10">
              <div className="flex items-center gap-2 text-green-400">
                <ArrowUpRight className="h-4 w-4" />
                <span className="font-medium">Buy GAiA (Disabled)</span>
              </div>
              <Button disabled className="w-full" variant="outline">
                Trading Not Available
              </Button>
            </div>
            
            <div className="space-y-4 p-4 rounded-lg bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-2 text-red-400">
                <ArrowDownRight className="h-4 w-4" />
                <span className="font-medium">Sell GAiA (Disabled)</span>
              </div>
              <Button disabled className="w-full" variant="outline">
                Trading Not Available
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
