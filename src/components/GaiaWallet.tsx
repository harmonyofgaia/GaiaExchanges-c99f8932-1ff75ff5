
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  Send, 
  ArrowDownLeft, 
  TrendingUp, 
  Shield,
  Crown,
  Eye,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useUserRole } from '@/hooks/useUserRole'
import { useWallets } from '@/hooks/useWallets'
import { useTransactions } from '@/hooks/useTransactions'
import { TransactionTracker } from '@/components/TransactionTracker'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { AdminSecurityShield } from '@/components/security/AdminSecurityShield'
import { FileDocumentProtection } from '@/components/security/FileDocumentProtection'

export function GaiaWallet() {
  const { user } = useAuth()
  const { roles, isAdmin } = useUserRole()
  const { wallets, loading: walletsLoading } = useWallets()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      setSelectedWallet(wallets[0].id)
    }
  }, [wallets])

  const handleWalletChange = (walletId: string) => {
    setSelectedWallet(walletId)
  }

  if (walletsLoading || transactionsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Admin Security Components */}
      {isAdmin() && (
        <div className="space-y-4">
          <AdminSecurityShield />
          <FileDocumentProtection />
        </div>
      )}

      {/* Admin Status Header */}
      {isAdmin() && (
        <Card className="bg-gradient-to-r from-red-900/20 to-purple-900/20 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Crown className="h-5 w-5" />
              Admin Wallet - Maximum Security Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">100%</div>
                <p className="text-sm text-muted-foreground">Security Level</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <p className="text-sm text-muted-foreground">Admin Rights</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">Protected</div>
                <p className="text-sm text-muted-foreground">All Files & IP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Wallet className="h-5 w-5" />
            GAiA Token Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Your Wallets</h3>
              <div className="space-y-2">
                {wallets?.map((wallet) => (
                  <Button
                    key={wallet.id}
                    variant={selectedWallet === wallet.id ? 'default' : 'outline'}
                    onClick={() => handleWalletChange(wallet.id)}
                    className="w-full justify-between"
                  >
                    {wallet.currency}
                    <Badge variant="secondary">{wallet.balance} {wallet.currency}</Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Portfolio Overview
                <Button size="icon" variant="ghost" className="float-right">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </h3>
              <PortfolioOverview />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="send">Send GAiA</TabsTrigger>
          <TabsTrigger value="track">Track GAiA</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownLeft className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2 border-b border-border"
                >
                  <div>
                    <div className="font-semibold">{transaction.transaction_type}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="font-semibold">{transaction.amount} {transaction.currency}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send GAiA Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Feature coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="track">
          <TransactionTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
