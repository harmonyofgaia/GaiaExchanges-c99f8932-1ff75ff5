
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
  TrendingUp 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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
  const connectedWalletAddress = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh"

  useEffect(() => {
    if (isConnected && account) {
      toast({
        title: 'GAiA Wallet Connected!',
        description: `Connected to Harmony of Gaia: ${connectedWalletAddress}`,
        className: 'bg-green-500 text-white'
      })
    }
  }, [isConnected, account, toast])

  const handleBurn = () => {
    setIsBurning(true)
    setTimeout(() => {
      setIsBurning(false)
      toast({
        title: 'GAiA Token Burn Initiated!',
        description: 'Burning 95% for Environmental Projects + 5% for Coral Reef Restoration',
        className: 'bg-orange-500 text-white'
      })
    }, 2000)
  }

  const handleReinvest = () => {
    setIsReinvesting(true)
    setTimeout(() => {
      setIsReinvesting(false)
      toast({
        title: 'GAiA Token Reinvestment Initiated!',
        description: 'Reinvesting in Environmental Projects and Community Growth',
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
            GAiA Web3 Wallet Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected ? (
            <>
              <div className="text-white">
                Connected GAiA Wallet: <span className="font-bold font-mono text-green-400">{connectedWalletAddress}</span>
              </div>
              <div className="text-white">
                GAiA Balance: <span className="font-bold">${balance.toFixed(2)}</span>
              </div>
              <Button variant="destructive" onClick={disconnectWallet}>
                <Zap className="w-4 h-4 mr-2" />
                Disconnect GAiA Wallet
              </Button>
            </>
          ) : (
            <Button onClick={connectWallet} className="bg-green-600 hover:bg-green-700">
              <Wallet className="w-4 h-4 mr-2" />
              Connect GAiA Wallet
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            GAiA Tokenomics & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-white">
            GAiA Burn Rate: <span className="font-bold">{burnRate}%</span>
            <Progress value={burnRate} className="w-1/2 h-2" />
          </div>
          <div className="flex items-center justify-between text-white">
            GAiA Reinvest Rate: <span className="font-bold">{reinvestRate}%</span>
            <Progress value={reinvestRate} className="w-1/2 h-2" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Security Level:</span>
            <Badge className={getSecurityColor()}>
              {securityLevel.toUpperCase()}
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
            GAiA Gaming & NFT Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-white">
            GAiA Gaming Power: <span className="font-bold">{gamingPower}</span>
          </div>
          <div className="text-white">
            GAiA Landscape NFTs: <span className="font-bold">{landscapeNFTs}</span>
          </div>
          <div className="text-white">
            GAiA Weapon NFTs: <span className="font-bold">{weaponNFTs}</span>
          </div>
          <div className="text-white">
            GAiA Armor NFTs: <span className="font-bold">{armorNFTs}</span>
          </div>
          <div className="text-white">
            GAiA Unknown Secrets: <span className="font-bold">{unknownSecrets}</span>
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
