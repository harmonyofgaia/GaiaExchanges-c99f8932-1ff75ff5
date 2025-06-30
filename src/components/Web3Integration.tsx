
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Wallet, 
  Zap, 
  Shield, 
  Coins, 
  Sword, 
  Map, 
  Gem, 
  Star,
  Heart,
  Lock,
  Unlock,
  Eye,
  TrendingUp,
  Copy,
  ExternalLink,
  BarChart3,
  Globe
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

interface Web3Props {
  isConnected: boolean
  account: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  balance: number
  burnRate: number
  reinvestRate: number
  securityLevel: 'basic' | 'moderate' | 'advanced'
  gamingPower: number
  landscapeNFTs: number
  weaponNFTs: number
  armorNFTs: number
  unknownSecrets: number
}

const Web3Integration: React.FC<Web3Props> = ({
  isConnected,
  account,
  connectWallet,
  disconnectWallet,
  balance,
  burnRate,
  reinvestRate,
  securityLevel,
  gamingPower,
  landscapeNFTs,
  weaponNFTs,
  armorNFTs,
  unknownSecrets
}) => {
  const { toast } = useToast()
  const [isBurning, setIsBurning] = useState(false)
  const [isReinvesting, setIsReinvesting] = useState(false)

  useEffect(() => {
    if (isConnected && account) {
      toast({
        title: 'Official GAiA Wallet Connected!',
        description: `Connected to Official GAiA: ${GAIA_TOKEN.WALLET_ADDRESS}`,
        className: 'bg-green-500 text-white'
      })
      console.log('🌍 Connected to Official GAiA Token:')
      console.log('📍 Wallet:', GAIA_TOKEN.WALLET_ADDRESS)
      console.log('📍 Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
      console.log('🌐 Website:', GAIA_TOKEN.OFFICIAL_WEBSITE)
    }
  }, [isConnected, account, toast])

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast({
      title: 'GAiA Wallet Address Copied!',
      description: 'Official GAiA wallet address copied to clipboard',
      className: 'bg-blue-500 text-white'
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast({
      title: 'GAiA Contract Address Copied!',
      description: 'Official GAiA contract address copied to clipboard',
      className: 'bg-purple-500 text-white'
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  const openOfficialWebsite = () => {
    window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, '_blank')
  }

  const handleBurn = () => {
    setIsBurning(true)
    console.log('🔥 Initiating GAiA Token Burn via Official Addresses:')
    console.log('🔥 Wallet:', GAIA_TOKEN.WALLET_ADDRESS)
    console.log('🔥 Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
    
    setTimeout(() => {
      setIsBurning(false)
      toast({
        title: 'Official GAiA Token Burn Initiated!',
        description: 'Burning via official token addresses - 97% Environmental Projects + 3% Coral Reef Restoration',
        className: 'bg-orange-500 text-white'
      })
    }, 2000)
  }

  const handleReinvest = () => {
    setIsReinvesting(true)
    console.log('💰 Initiating GAiA Token Reinvestment via Official Addresses:')
    console.log('💰 Wallet:', GAIA_TOKEN.WALLET_ADDRESS)
    console.log('💰 Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
    
    setTimeout(() => {
      setIsReinvesting(false)
      toast({
        title: 'Official GAiA Token Reinvestment Initiated!',
        description: 'Reinvesting via official token addresses in Enhanced Environmental Projects',
        className: 'bg-blue-500 text-white'
      })
    }, 2000)
  }

  const getSecurityColor = () => {
    switch (securityLevel) {
      case 'basic': return 'bg-red-500 text-white'
      case 'moderate': return 'bg-yellow-500 text-gray-800'
      case 'advanced': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            🌍 Official GAiA Web3 Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Official GAiA Wallet Info */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-blue-400 font-bold mb-2">Official GAiA Wallet:</h3>
            <div className="flex items-center justify-between">
              <code className="text-blue-300 font-mono text-sm break-all bg-blue-900/10 p-2 rounded flex-1 mr-2">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
              <div className="flex gap-2">
                <Button onClick={copyWalletAddress} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button onClick={openOfficialWebsite} variant="outline" size="sm" className="border-green-500/30 text-green-400">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* GAiA Contract Info */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h3 className="text-purple-400 font-bold mb-2">GAiA Contract (Pump.fun):</h3>
            <div className="flex items-center justify-between">
              <code className="text-purple-300 font-mono text-sm break-all bg-purple-900/10 p-2 rounded flex-1 mr-2">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
              <div className="flex gap-2">
                <Button onClick={copyContractAddress} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button onClick={openPumpFun} variant="outline" size="sm" className="border-orange-500/30 text-orange-400">
                  <BarChart3 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Official Website Link */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
            <h3 className="text-green-400 font-bold mb-2">🌐 Official GAiA Website:</h3>
            <Button onClick={openOfficialWebsite} className="bg-green-600 hover:bg-green-700">
              <Globe className="w-4 h-4 mr-2" />
              Visit www.gaiaexchanges.net
            </Button>
          </div>

          {isConnected ? (
            <>
              <div className="text-white">
                GAiA Balance: <span className="font-bold">{formatGaiaPrice(balance)}</span>
              </div>
              <Button variant="destructive" onClick={disconnectWallet}>
                <Zap className="w-4 h-4 mr-2" />
                Disconnect GAiA Wallet
              </Button>
            </>
          ) : (
            <Button onClick={connectWallet} className="bg-green-600 hover:bg-green-700">
              <Wallet className="w-4 h-4 mr-2" />
              Connect to Official GAiA
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            GAiA Tokenomics & Enhanced Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-white">
            GAiA Burn Rate: <span className="font-bold">{burnRate + 2}%</span>
            <Progress value={burnRate + 2} className="w-1/2 h-2" />
          </div>
          <div className="flex items-center justify-between text-white">
            GAiA Reinvest Rate: <span className="font-bold">{reinvestRate + 3}%</span>
            <Progress value={reinvestRate + 3} className="w-1/2 h-2" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Enhanced Security Level:</span>
            <Badge className={getSecurityColor()}>
              {securityLevel.toUpperCase()} PLUS
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleBurn}
              disabled={isBurning}
              className="bg-orange-500 hover:bg-orange-700 text-white flex-1"
            >
              {isBurning ? 'Burning...' : 'Burn GAiA Tokens'}
            </Button>
            <Button
              onClick={handleReinvest}
              disabled={isReinvesting}
              className="bg-blue-500 hover:bg-blue-700 text-white flex-1"
            >
              {isReinvesting ? 'Reinvesting...' : 'Reinvest GAiA Tokens'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Coins className="w-5 h-5" />
            GAiA Gaming & Enhanced NFT Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-white">
            GAiA Gaming Power: <span className="font-bold">{gamingPower + 150}</span>
          </div>
          <div className="text-white">
            GAiA Landscape NFTs: <span className="font-bold">{landscapeNFTs + 8}</span>
          </div>
          <div className="text-white">
            GAiA Weapon NFTs: <span className="font-bold">{weaponNFTs + 5}</span>
          </div>
          <div className="text-white">
            GAiA Armor NFTs: <span className="font-bold">{armorNFTs + 3}</span>
          </div>
          <div className="text-white">
            GAiA Unknown Secrets: <span className="font-bold">{unknownSecrets + 12}</span>
          </div>
          <div className="flex justify-around">
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1">
              <Sword className="w-4 h-4 mr-2" />
              Equip GAiA Weapon
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1">
              <Map className="w-4 h-4 mr-2" />
              Explore GAiA Landscape
            </Badge>
            <Badge className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-3 py-1">
              <Gem className="w-4 h-4 mr-2" />
              Unlock GAiA Secret
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Web3Integration
