
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Flame, Shield, AlertTriangle, Lock } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

export function TokenBurnController() {
  const { user } = useAuth()
  const [burnAmount, setBurnAmount] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [burnHistory] = useState([
    { amount: 500000, date: '2024-07-15', reason: 'Ocean Cleanup Initiative', txHash: '0x1234...5678' },
    { amount: 250000, date: '2024-07-10', reason: 'Deflationary Mechanism', txHash: '0xabcd...efgh' },
    { amount: 1000000, date: '2024-07-05', reason: 'Community Vote Burn', txHash: '0x9876...5432' }
  ])

  // Check if user is admin (this should be replaced with proper role checking)
  const isAdmin = true // This should check user roles from database

  const handleBurnRequest = () => {
    if (!isAdmin) {
      toast.error('🚫 Access Denied - Admin Only Feature')
      return
    }

    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      toast.error('Please enter a valid burn amount')
      return
    }

    setIsConfirming(true)
    toast.warning('⚠️ Token Burn Initiated - Confirmation Required')
  }

  const executeBurn = () => {
    if (confirmationCode !== 'BURN-GAiA-FOREVER') {
      toast.error('Invalid confirmation code')
      return
    }

    // Simulate burn transaction
    toast.success(`🔥 Successfully burned ${burnAmount} GAiA tokens!`, {
      description: 'Tokens have been permanently removed from circulation'
    })
    
    setBurnAmount('')
    setConfirmationCode('')
    setIsConfirming(false)
  }

  if (!isAdmin) {
    return (
      <Card className="border-red-500/30 bg-red-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Lock className="h-16 w-16 text-red-400 mx-auto" />
            <h3 className="text-2xl font-bold text-red-400">🚫 ADMIN ACCESS REQUIRED</h3>
            <p className="text-red-300">
              Token burning is restricted to administrators only for security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Flame className="h-6 w-6" />
            🔥 ADMIN TOKEN BURN CONTROLLER
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">ADMIN ONLY</Badge>
            <Badge className="bg-orange-600 text-white">PERMANENT ACTION</Badge>
            <Badge className="bg-yellow-600 text-white">IRREVERSIBLE</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-red-500/30 bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-300">
              <strong>WARNING:</strong> Token burning is permanent and irreversible. 
              Only burn tokens for legitimate deflationary purposes or community initiatives.
            </AlertDescription>
          </Alert>

          {!isConfirming ? (
            <div className="space-y-4">
              <div>
                <label className="text-red-300 text-sm font-medium mb-2 block">
                  Burn Amount (GAiA Tokens)
                </label>
                <Input
                  type="number"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  placeholder="Enter amount to burn..."
                  className="bg-black/40 border-red-500/30 text-white"
                />
              </div>

              <Button
                onClick={handleBurnRequest}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                disabled={!burnAmount}
              >
                <Flame className="h-4 w-4 mr-2" />
                🔥 INITIATE TOKEN BURN
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert className="border-yellow-500/30 bg-yellow-900/20">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-yellow-300">
                  <strong>CONFIRMATION REQUIRED:</strong> You are about to permanently burn {burnAmount} GAiA tokens.
                  Type "BURN-GAiA-FOREVER" to confirm this irreversible action.
                </AlertDescription>
              </Alert>

              <div>
                <label className="text-yellow-300 text-sm font-medium mb-2 block">
                  Confirmation Code
                </label>
                <Input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Type: BURN-GAiA-FOREVER"
                  className="bg-black/40 border-yellow-500/30 text-white font-mono"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={executeBurn}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={confirmationCode !== 'BURN-GAiA-FOREVER'}
                >
                  <Flame className="h-4 w-4 mr-2" />
                  EXECUTE BURN
                </Button>
                <Button
                  onClick={() => setIsConfirming(false)}
                  variant="outline"
                  className="border-gray-500/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Burn History */}
      <Card className="border-orange-500/30 bg-orange-900/20">
        <CardHeader>
          <CardTitle className="text-orange-400">🔥 Recent Burn History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {burnHistory.map((burn, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/40 rounded border border-orange-500/20">
                <div>
                  <div className="font-bold text-orange-400">
                    {burn.amount.toLocaleString()} GAiA
                  </div>
                  <div className="text-sm text-orange-300">{burn.reason}</div>
                  <div className="text-xs text-gray-400">{burn.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">TX Hash</div>
                  <div className="text-xs font-mono text-blue-300">{burn.txHash}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
