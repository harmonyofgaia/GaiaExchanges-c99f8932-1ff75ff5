import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, CreditCard, TrendingUp, Shield, ExternalLink, Copy } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const WalletPage = () => {
  const [balance, setBalance] = React.useState(15420.69)
  const [transactionHistory, setTransactionHistory] = React.useState([
    { id: 'tx-1', type: 'deposit', amount: 5000, date: '2024-07-01' },
    { id: 'tx-2', type: 'withdrawal', amount: -2500, date: '2024-07-15' },
    { id: 'tx-3', type: 'deposit', amount: 10000, date: '2024-08-01' },
  ])

  const handleDeposit = () => {
    toast.success('Simulating Deposit', {
      description: 'GAiA deposits are quantum secured',
      duration: 3000
    })
  }

  const handleWithdrawal = () => {
    toast.error('Simulating Withdrawal', {
      description: 'GAiA withdrawals are dragon protected',
      duration: 3000
    })
  }

  const openGaiaToken = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
    toast.success('Opening Official GAiA Token Page', {
      description: 'Harmony of Gaia - Official Token',
      duration: 3000
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('Contract Address Copied!', {
      description: 'GAiA Token Contract Address',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                <Wallet className="inline-block h-10 w-10 mr-2 align-middle" />
                GAiA Wallet - Harmony of Gaia
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Manage your GAiA tokens and track your transactions
              </p>
              <div className="text-center mt-4">
                <Button onClick={openGaiaToken} className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Official GAiA Token: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}...
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-green-400 mb-4">
                  ${balance.toLocaleString()}
                </div>
                <div className="text-muted-foreground mb-4">
                  Current Balance
                </div>
                <div className="inline-flex space-x-2">
                  <Button onClick={handleDeposit} className="bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Deposit GAiA
                  </Button>
                  <Button onClick={handleWithdrawal} className="bg-red-600 hover:bg-red-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Withdraw GAiA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transactions">
                <Wallet className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-400">
                Transaction History
              </h3>
              <ul className="space-y-2">
                {transactionHistory.map((transaction) => (
                  <li key={transaction.id} className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </span>
                        <Badge className="ml-2">{transaction.date}</Badge>
                      </div>
                      <div className={transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.type === 'deposit' ? '+' : '-'}
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-400">
                Wallet Security
              </h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Your GAiA wallet is protected by quantum-level encryption and dragon-fire security protocols.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Enable Two-Factor Authentication
                </Button>
                <Button onClick={copyContractAddress} variant="secondary">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Contract Address
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
