
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Settings,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

export function WalletEngineAdmin() {
  const [totalBalance, setTotalBalance] = useState(2847392.85)
  const [activeWallets, setActiveWallets] = useState(1247)
  const [dailyTransactions, setDailyTransactions] = useState(8432)

  const handleEmergencyLock = () => {
    toast.error('🔒 Emergency wallet lock activated!')
  }

  const handleBulkOperation = () => {
    toast.success('💰 Bulk wallet operation initiated')
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center text-3xl">
            💰 WALLET ENGINE ADMIN CONTROL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400">${totalBalance.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Balance</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{activeWallets.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Wallets</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">{dailyTransactions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Daily Transactions</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-orange-400">99.97%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400">Wallet Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleBulkOperation}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Bulk Wallet Management
            </Button>
            
            <Button
              onClick={handleEmergencyLock}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Lock className="h-4 w-4 mr-2" />
              Emergency Lock All
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'deposit', amount: 1250.00, user: 'User_1247', time: '2 min ago' },
                { type: 'withdrawal', amount: 890.50, user: 'User_8934', time: '5 min ago' },
                { type: 'transfer', amount: 2100.00, user: 'User_5632', time: '8 min ago' }
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                  <div className="flex items-center gap-2">
                    {tx.type === 'deposit' ? 
                      <ArrowDownRight className="h-4 w-4 text-green-400" /> :
                      tx.type === 'withdrawal' ?
                      <ArrowUpRight className="h-4 w-4 text-red-400" /> :
                      <Activity className="h-4 w-4 text-blue-400" />
                    }
                    <span className="font-medium">${tx.amount}</span>
                    <span className="text-sm text-muted-foreground">{tx.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
