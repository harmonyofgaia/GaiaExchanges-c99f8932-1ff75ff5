
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Globe, Shield, Coins, ExternalLink, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAIA_TOKEN } from '@/constants/gaia'
import { Navbar } from '@/components/Navbar'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Badge className="bg-green-600 text-white mb-4 px-6 py-2 text-lg">
              <Shield className="h-4 w-4 mr-2" />
              Official GAIA Token Platform
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            GAIA Token
          </h1>
          
          <h2 className="text-3xl font-semibold text-white mb-4">
            Harmony of Culture
          </h2>
          
          <p className="text-xl text-green-300 mb-8 max-w-3xl mx-auto">
            {GAIA_TOKEN.BRAND_STATEMENT}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/exchange">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                <Coins className="h-5 w-5 mr-2" />
                Start Trading
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <a
              href={GAIA_TOKEN.PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg">
                <ExternalLink className="h-5 w-5 mr-2" />
                Trade on Pump.fun
              </Button>
            </a>
          </div>
        </div>

        {/* Official Token Information */}
        <Card className="mb-12 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 text-2xl flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Official GAIA Token Information
            </CardTitle>
            <CardDescription className="text-green-300">
              Verified addresses for the official GAIA Token by Harmony of Culture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Official Wallet Address</h4>
                <p className="text-green-300 text-sm font-mono break-all">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">Contract Address</h4>
                <p className="text-blue-300 text-sm font-mono break-all">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-semibold">Network</h4>
                <p className="text-white text-lg">{GAIA_TOKEN.NETWORK}</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-blue-400 font-semibold">Symbol</h4>
                <p className="text-white text-lg">{GAIA_TOKEN.SYMBOL}</p>
              </div>
              <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="text-purple-400 font-semibold">Total Supply</h4>
                <p className="text-white text-lg">1T Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Transparent Exchange
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-300 mb-4">
                Trade GAIA tokens with complete transparency and zero hidden fees.
              </p>
              <Link to="/exchange">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access Exchange
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Transparent Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-300 mb-4">
                View all wallet activities and transactions in real-time with full transparency.
              </p>
              <Link to="/wallet">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Wallet
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300 mb-4">
                Bank-level security with quantum protection for all transactions and data.
              </p>
              <Link to="/security">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Security Info
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Warning Section */}
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-yellow-400 font-bold text-lg mb-2">
                ⚠️ Official Token Verification
              </h3>
              <p className="text-yellow-300 mb-4">
                {GAIA_TOKEN.OFFICIAL_DISCLAIMER}
              </p>
              <p className="text-sm text-yellow-200">
                Always verify the wallet address: <span className="font-mono">{GAIA_TOKEN.WALLET_ADDRESS}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
