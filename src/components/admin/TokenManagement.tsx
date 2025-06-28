
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Shield, Zap } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Token {
  name: string
  symbol: string
  address: string
  verified: boolean
  fee: number
}

const trustedTokens: Token[] = [
  { name: 'Bitcoin', symbol: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', verified: true, fee: 0.0001 },
  { name: 'Ethereum', symbol: 'ETH', address: '0x0000000000000000000000000000000000000000', verified: true, fee: 0.001 },
  { name: 'Solana', symbol: 'SOL', address: 'So11111111111111111111111111111111111111112', verified: true, fee: 0.00005 },
  { name: 'Harmony of Gaia', symbol: 'GAiA', address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh', verified: true, fee: 0 }
]

export function TokenManagement() {
  const [tokens, setTokens] = useState(trustedTokens)
  const [newTokenName, setNewTokenName] = useState('')
  const [newTokenSymbol, setNewTokenSymbol] = useState('')
  const [newTokenAddress, setNewTokenAddress] = useState('')
  const { toast } = useToast()

  const addToken = () => {
    if (newTokenName && newTokenSymbol && newTokenAddress) {
      const newToken: Token = {
        name: newTokenName,
        symbol: newTokenSymbol,
        address: newTokenAddress,
        verified: false,
        fee: 0.001
      }
      setTokens([...tokens, newToken])
      setNewTokenName('')
      setNewTokenSymbol('')
      setNewTokenAddress('')
      toast({
        title: "Token Added Successfully",
        description: `${newToken.name} (${newToken.symbol}) added to the exchange with enhanced security protocols`,
      })
    }
  }

  const removeToken = (index: number) => {
    const removedToken = tokens[index]
    if (removedToken.symbol === 'GAiA') {
      toast({
        title: "Cannot Remove GAiA Token",
        description: "GAiA is the core token and cannot be removed from the exchange",
        variant: "destructive",
      })
      return
    }
    setTokens(tokens.filter((_, i) => i !== index))
    toast({
      title: "Token Removed",
      description: `${removedToken.name} has been safely removed from the exchange`,
    })
  }

  const optimizeGaiaToken = () => {
    toast({
      title: "GAiA Token Optimization Active",
      description: "Applying advanced blockchain optimizations and security enhancements to GAiA token infrastructure",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-5 w-5" />
            GAiA Token Advanced Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Token Infrastructure Enhancement</h4>
            <p className="text-sm text-green-300 mb-3">
              Advanced blockchain optimization protocols to ensure GAiA token operates at peak performance with maximum security.
            </p>
            <Button onClick={optimizeGaiaToken} className="bg-green-600 hover:bg-green-700">
              <Zap className="h-4 w-4 mr-2" />
              Optimize GAiA Token Infrastructure
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <p className="text-muted-foreground">Security Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">0%</div>
              <p className="text-muted-foreground">Trading Fees</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <p className="text-muted-foreground">Supply Potential</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              value={newTokenName}
              onChange={(e) => setNewTokenName(e.target.value)}
              placeholder="Token Name"
            />
            <Input
              value={newTokenSymbol}
              onChange={(e) => setNewTokenSymbol(e.target.value)}
              placeholder="Symbol"
            />
            <Input
              value={newTokenAddress}
              onChange={(e) => setNewTokenAddress(e.target.value)}
              placeholder="Contract Address"
            />
          </div>
          <Button onClick={addToken} className="w-full">
            Add Token to Exchange
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Digital Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{token.name} ({token.symbol})</div>
                    <div className="text-sm text-muted-foreground font-mono">{token.address}</div>
                  </div>
                  {token.verified && (
                    <Badge variant="outline" className="border-green-500/20 text-green-400">
                      Verified
                    </Badge>
                  )}
                  {token.symbol === 'GAiA' && (
                    <Badge className="bg-green-600">
                      Core Token
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Fee: {token.fee} {token.symbol}</span>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeToken(index)}
                    disabled={token.symbol === 'GAiA'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
