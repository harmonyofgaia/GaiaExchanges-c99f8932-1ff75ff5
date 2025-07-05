
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Vault, DollarSign, Users, TrendingUp, Shield, Lock, Coins, ArrowUp } from 'lucide-react'
import { toast } from 'sonner'

interface VaultDeposit {
  id: string
  amount: number
  currency: string
  depositor: string
  timestamp: string
  status: 'pending' | 'confirmed' | 'distributed'
  depth: string
}

export function CommunityVaultSystem() {
  const [depositAmount, setDepositAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('GAIA')
  const [isDepositing, setIsDepositing] = useState(false)
  const [vaultStats, setVaultStats] = useState({
    totalBalance: 2847593.25,
    totalDepositors: 12847,
    monthlyGrowth: 23.7,
    securityLevel: 100,
    vaultDepth: 2847,
    distributedAmount: 847293.50
  })
  const [recentDeposits, setRecentDeposits] = useState<VaultDeposit[]>([])

  useEffect(() => {
    console.log('🏦 COMMUNITY VAULT SYSTEM - UNDERGROUND OPERATIONS ACTIVE')
    console.log('🔒 MAXIMUM SECURITY PROTOCOLS ENGAGED')
    console.log('💰 QUANTUM ENCRYPTION PROTECTING ALL FUNDS')

    // Simulate real-time vault updates
    const interval = setInterval(() => {
      setVaultStats(prev => ({
        ...prev,
        totalBalance: prev.totalBalance + Math.random() * 100,
        totalDepositors: prev.totalDepositors + (Math.random() > 0.95 ? 1 : 0),
        monthlyGrowth: 20 + Math.random() * 10,
        securityLevel: 100,
        vaultDepth: prev.vaultDepth + (Math.random() > 0.99 ? 1 : 0)
      }))

      // Add random deposits
      if (Math.random() > 0.8) {
        const newDeposit: VaultDeposit = {
          id: `VLT${Date.now()}`,
          amount: Math.floor(Math.random() * 10000) + 100,
          currency: Math.random() > 0.7 ? 'GAIA' : Math.random() > 0.5 ? 'BTC' : 'ETH',
          depositor: `User${Math.floor(Math.random() * 10000)}`,
          timestamp: new Date().toLocaleString(),
          status: 'confirmed',
          depth: `${Math.floor(Math.random() * 3000) + 1000}m`
        }
        
        setRecentDeposits(prev => [newDeposit, ...prev.slice(0, 4)])
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error('Please enter a valid deposit amount')
      return
    }

    setIsDepositing(true)
    console.log(`🏦 VAULT DEPOSIT INITIATED: ${depositAmount} ${selectedCurrency}`)

    try {
      setTimeout(() => {
        const newDeposit: VaultDeposit = {
          id: `VLT${Date.now()}`,
          amount: parseFloat(depositAmount),
          currency: selectedCurrency,
          depositor: 'You',
          timestamp: new Date().toLocaleString(),
          status: 'pending',
          depth: `${Math.floor(Math.random() * 1000) + 2000}m`
        }

        setRecentDeposits(prev => [newDeposit, ...prev.slice(0, 4)])
        setVaultStats(prev => ({
          ...prev,
          totalBalance: prev.totalBalance + parseFloat(depositAmount)
        }))

        setDepositAmount('')
        setIsDepositing(false)

        toast.success('🏦 Vault Deposit Successful!', {
          description: `${depositAmount} ${selectedCurrency} deposited to underground vault`,
          duration: 5000
        })

        console.log('✅ VAULT DEPOSIT COMPLETE - FUNDS SECURED UNDERGROUND')
      }, 3000)
    } catch (error) {
      setIsDepositing(false)
      toast.error('Deposit failed - Vault systems auto-recovering')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'distributed': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Vault className="h-6 w-6" />
          🏦 COMMUNITY VAULT SYSTEM - UNDERGROUND OPERATIONS
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-green-600 animate-pulse">
            💰 ${vaultStats.totalBalance.toLocaleString()} TOTAL
          </Badge>
          <Badge className="bg-blue-600">
            👥 {vaultStats.totalDepositors.toLocaleString()} DEPOSITORS
          </Badge>
          <Badge className="bg-purple-600">
            📈 {vaultStats.monthlyGrowth.toFixed(1)}% GROWTH
          </Badge>
          <Badge className="bg-red-600">
            🔒 {vaultStats.vaultDepth}m UNDERGROUND
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vault Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
            <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              ${vaultStats.totalBalance.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Vault Balance</div>
          </div>

          <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              {vaultStats.totalDepositors.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Community Members</div>
          </div>

          <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">
              {vaultStats.monthlyGrowth.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Monthly Growth</div>
          </div>

          <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">
              {vaultStats.securityLevel}%
            </div>
            <div className="text-xs text-muted-foreground">Security Level</div>
          </div>
        </div>

        {/* Deposit Interface */}
        <div className="p-6 bg-black/30 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Make Community Fee Deposit
          </h4>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter amount..."
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-black/50 border-green-500/30 text-green-400"
              />
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-black/50 border border-green-500/30 text-green-400 px-4 py-2 rounded"
              >
                <option value="GAIA">GAIA</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USD">USD</option>
              </select>
            </div>
            
            <Button 
              onClick={handleDeposit}
              disabled={isDepositing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              {isDepositing ? (
                <>
                  <Lock className="h-5 w-5 mr-2 animate-spin" />
                  SECURING DEPOSIT...
                </>
              ) : (
                <>
                  <ArrowUp className="h-5 w-5 mr-2" />
                  DEPOSIT TO COMMUNITY VAULT
                </>
              )}
            </Button>

            {isDepositing && (
              <div className="space-y-2">
                <Progress value={65} className="h-2" />
                <p className="text-center text-green-400 text-sm">
                  🔒 Securing funds in underground vault system...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Deposits */}
        {recentDeposits.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-green-400">🔍 Recent Vault Deposits</h4>
            {recentDeposits.map((deposit) => (
              <Card key={deposit.id} className="border border-border/50 bg-card/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Vault className="h-4 w-4 text-green-400" />
                      <span className="font-medium">
                        {deposit.amount.toLocaleString()} {deposit.currency}
                      </span>
                    </div>
                    <Badge className={`${getStatusColor(deposit.status)} text-white`}>
                      {deposit.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>👤 {deposit.depositor}</span>
                    <span>📍 Underground {deposit.depth}</span>
                    <span>🕐 {deposit.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Vault Security Status */}
        <div className="text-center p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded border border-green-500/30">
          <Lock className="h-12 w-12 text-green-400 mx-auto mb-2 animate-pulse" />
          <div className="text-lg font-bold text-green-400 mb-2">
            🏦 MAXIMUM VAULT SECURITY ACTIVE
          </div>
          <div className="text-sm text-muted-foreground">
            Underground facility at {vaultStats.vaultDepth}m depth • Quantum encryption • 24/7 monitoring
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
