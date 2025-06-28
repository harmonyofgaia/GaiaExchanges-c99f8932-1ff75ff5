
import { GaiaLogo } from '@/components/GaiaLogo'
import { AppStoreLinks } from '@/components/AppStoreLinks'
import { GitHubRepositories } from '@/components/GitHubRepositories'
import { GitHubIntegration } from '@/components/GitHubIntegration'
import { Web3Integration } from '@/components/Web3Integration'
import { SmartContractInterface } from '@/components/SmartContractInterface'
import { AdvancedWalletSecurity } from '@/components/AdvancedWalletSecurity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Shield, Globe, Code, Lock, Github, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <GaiaLogo size="xl" variant="full-color" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Culture of Harmony
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                GAiA's Exchanges
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                World's Most Secure Multi-Platform Crypto Exchange & Wallet
              </p>
              <p className="text-lg text-green-400 mt-2">
                🎵 "Seeds Will Form Into Music" - Bringing Smiles to Every Soul 🎵
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white text-sm px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Military-Grade Security
              </Badge>
              <Badge className="bg-blue-600 text-white text-sm px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Global Multi-Platform
              </Badge>
              <Badge className="bg-purple-600 text-white text-sm px-4 py-2">
                <Code className="h-4 w-4 mr-2" />
                Open Source on GitHub
              </Badge>
              <Badge className="bg-orange-600 text-white text-sm px-4 py-2">
                <Lock className="h-4 w-4 mr-2" />
                Web3 Native
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* GitHub Integration Status */}
        <GitHubIntegration />

        {/* App Store Downloads */}
        <AppStoreLinks />

        {/* GitHub Repositories */}
        <GitHubRepositories />

        {/* Advanced Wallet Security */}
        <AdvancedWalletSecurity />

        {/* Smart Contract Interface */}
        <SmartContractInterface />

        {/* Web3 Integration */}
        <Web3Integration />

        {/* Smart Contracts Navigation */}
        <Card className="border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Code className="h-5 w-5" />
              Smart Contract Development Suite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Access our comprehensive smart contract development tools, legal frameworks, and deployment systems
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <a href="/smart-contracts">
                  <Code className="h-4 w-4 mr-2" />
                  Access Smart Contract Suite
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Culture of Harmony Information */}
        <Card className="border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Star className="h-5 w-5" />
              Culture of Harmony - Complete Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-green-400">Ultimate Security</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced threat detection, quantum-resistant encryption, and real-time monitoring
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-blue-400">Global Harmony</h3>
                <p className="text-sm text-muted-foreground">
                  Works seamlessly across all platforms, devices, and blockchain networks worldwide
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-purple-400">Open Source</h3>
                <p className="text-sm text-muted-foreground">
                  Completely transparent, auditable code with community-driven development
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20">
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-green-400">🌍 Culture of Harmony - Building Global Unity</h4>
                <p className="text-sm text-muted-foreground">
                  "We Create a New Cult till the End Of the World" - Building sustainable, transparent, and secure financial ecosystem
                </p>
                <p className="text-sm text-green-400 mt-2">
                  🎵 "Seeds Will form in to Music" - True Souls, True Life, True Smiles 🎵
                </p>
                <div className="flex items-center justify-center gap-4 pt-2 text-xs flex-wrap">
                  <span className="text-green-400">✅ 100% Transparent Operations</span>
                  <span className="text-blue-400">🔒 Zero Compromise Security</span>
                  <span className="text-purple-400">🌱 Eco-Friendly Technology</span>
                  <span className="text-orange-400">🤝 "Doesn't matter if Your Black Or White"</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Downloads
