import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Settings, Shield, Plus, Trash2, Eye, DollarSign, Users, Activity } from 'lucide-react'
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
  { name: 'Cardano', symbol: 'ADA', address: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a', verified: true, fee: 0.17 },
  { name: 'Polkadot', symbol: 'DOT', address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg', verified: true, fee: 0.01 },
  { name: 'Chainlink', symbol: 'LINK', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', verified: true, fee: 0.1 },
  { name: 'Binance Coin', symbol: 'BNB', address: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23', verified: true, fee: 0.0005 },
  { name: 'Harmony of Gaia', symbol: 'GAiA', address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh', verified: true, fee: 0 }
]

export function AdminControlSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tokens, setTokens] = useState(trustedTokens)
  const [newTokenName, setNewTokenName] = useState('')
  const [newTokenSymbol, setNewTokenSymbol] = useState('')
  const [newTokenAddress, setNewTokenAddress] = useState('')
  const [selectedFeeOptimization, setSelectedFeeOptimization] = useState('auto')
  const { toast } = useToast()

  const handleLogin = () => {
    if (username === 'Synatic' && password === 'Synatic!oul1992') {
      setIsAuthenticated(true)
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Control System",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      })
    }
  }

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
        title: "Token Added",
        description: `${newToken.name} (${newToken.symbol}) has been added to the exchange`,
      })
    }
  }

  const removeToken = (index: number) => {
    const removedToken = tokens[index]
    setTokens(tokens.filter((_, i) => i !== index))
    toast({
      title: "Token Removed",
      description: `${removedToken.name} has been removed from the exchange`,
    })
  }

  const optimizeFees = () => {
    toast({
      title: "Fee Optimization Active",
      description: "System is now actively searching for the lowest fees across all networks",
    })
  }

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center">
            <Shield className="h-5 w-5" />
            Admin Control System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login to Admin Panel
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Settings className="h-5 w-5" />
            Admin Control System - Welcome Synatic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <p className="text-sm text-muted-foreground">System Monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{tokens.length}</div>
              <p className="text-sm text-muted-foreground">Active Tokens</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">0.00%</div>
              <p className="text-sm text-muted-foreground">Average Fees</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <p className="text-sm text-muted-foreground">Transparency</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="fees">Fee Optimization</TabsTrigger>
          <TabsTrigger value="transparency">Transparency Control</TabsTrigger>
          <TabsTrigger value="legal">Legal Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <div className="space-y-6">
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
                <CardTitle>Trusted Digital Currencies</CardTitle>
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
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Fee Optimization System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Zero-Cost Vision</h4>
                <p className="text-sm text-green-300">
                  Our mission is to provide zero or near-zero cost swapping for all digital currencies. 
                  We continuously monitor network conditions and find the most cost-effective routes.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fee Optimization Strategy</label>
                  <select 
                    value={selectedFeeOptimization}
                    onChange={(e) => setSelectedFeeOptimization(e.target.value)}
                    className="w-full p-2 rounded-lg bg-muted border border-border"
                  >
                    <option value="auto">Automatic - Always Find Cheapest</option>
                    <option value="fastest">Fastest Route</option>
                    <option value="balanced">Balanced Speed & Cost</option>
                    <option value="zero-cost">Zero Cost Only</option>
                  </select>
                </div>

                <Button onClick={optimizeFees} className="w-full bg-green-600 hover:bg-green-700">
                  Activate 24/7 Fee Optimization
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Average Fee:</span>
                      <span className="text-green-400">$0.001</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zero-Cost Swaps Today:</span>
                      <span className="text-green-400">847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Savings:</span>
                      <span className="text-green-400">$12,450</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Network Monitoring:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Route Optimization:</span>
                      <span className="text-green-400">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee Prediction:</span>
                      <span className="text-green-400">AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transparency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Transparency Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Public Wallet Access</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span>Main Wallet Visibility:</span>
                    <Badge className="bg-green-600">100% Open</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Burning Wallet Access:</span>
                    <Badge className="bg-green-600">100% Open</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Transaction History:</span>
                    <Badge className="bg-green-600">Real-time</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Community Features</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span>DEXScreener Listing:</span>
                    <Badge className="bg-blue-600">Free & Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Website Integration:</span>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Email Support:</span>
                    <Badge className="bg-green-600">24/7</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card>
            <CardHeader>
              <CardTitle>Legal Information & Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2">Company Information</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Company Name:</strong> Harmony of Gaia (GAiA)</p>
                  <p><strong>Type:</strong> Transparent Environmental Exchange</p>
                  <p><strong>Official Website:</strong> <a href="https://sites.google.com/view/culture-of-harmony/harmony-of-gaia" className="text-blue-400 underline">Culture of Harmony</a></p>
                  <p><strong>Contact Email:</strong> Info@cultureofharmony.com</p>
                  <p><strong>Primary Token:</strong> GAiA (5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Required Documents</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Terms of Service</li>
                    <li>• Privacy Policy</li>
                    <li>• Anti-Money Laundering (AML) Policy</li>
                    <li>• Know Your Customer (KYC) Procedures</li>
                    <li>• Risk Disclosure Statement</li>
                    <li>• Environmental Impact Report</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Compliance Status</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Transparency Compliance:</span>
                      <Badge className="bg-green-600">100%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Environmental Standards:</span>
                      <Badge className="bg-green-600">Certified</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Open Source Commitment:</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Driven:</span>
                      <Badge className="bg-green-600">100%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="font-medium text-yellow-400 mb-2">Disclaimer</h4>
                <p className="text-sm text-yellow-300">
                  This exchange operates under a transparent, community-driven model with no hidden fees or costs. 
                  All transactions are recorded on-chain and visible to the public. Environmental impact is our 
                  primary mission, with all burning proceeds reinvested in verified environmental projects.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
