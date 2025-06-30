
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const location = useLocation()

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAiA
            </div>
            <Badge className="bg-green-600 text-white animate-pulse">ECO</Badge>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={isActivePath('/') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-purple-700/50'}
            >
              <Link to="/">🏠 Home</Link>
            </Button>

            <Button
              variant={isActivePath('/gaias-projects') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/gaias-projects') ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white hover:bg-green-700/50'}
            >
              <Link to="/gaias-projects">🌍 GAiA's Projects</Link>
            </Button>

            <Button
              variant={isActivePath('/transparent-wallet') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/transparent-wallet') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white hover:bg-cyan-700/50'}
            >
              <Link to="/transparent-wallet">👁️ Transparent Wallet</Link>
            </Button>

            <Button
              variant={isActivePath('/swap') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/swap') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-700/50'}
            >
              <Link to="/swap">💱 Swap</Link>
            </Button>

            <Button
              variant={isActivePath('/wallet') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/wallet') ? 'bg-orange-600 text-white' : 'text-gray-300 hover:text-white hover:bg-orange-700/50'}
            >
              <Link to="/wallet">💰 Wallet</Link>
            </Button>

            <Button
              variant={isActivePath('/coin-crafter') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/coin-crafter') ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:text-white hover:bg-yellow-700/50'}
            >
              <Link to="/coin-crafter">⚡ Coin Crafter</Link>
            </Button>

            <Button
              variant={isActivePath('/nft-green-animal-platform') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/nft-green-animal-platform') ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white hover:bg-green-700/50'}
            >
              <Link to="/nft-green-animal-platform">🐾 Green NFTs</Link>
            </Button>

            <Button
              variant={isActivePath('/aura-land-scrapyard') ? 'default' : 'ghost'}
              asChild
              className={isActivePath('/aura-land-scrapyard') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-purple-700/50'}
            >
              <Link to="/aura-land-scrapyard">🎮 Gaming</Link>
            </Button>
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-gray-300">
              ☰
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20 pt-4">
          <div className="flex flex-col space-y-2">
            <Button
              variant={isActivePath('/') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/') ? 'bg-purple-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-purple-700/50 justify-start'}
            >
              <Link to="/">🏠 Home</Link>
            </Button>

            <Button
              variant={isActivePath('/gaias-projects') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/gaias-projects') ? 'bg-green-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-green-700/50 justify-start'}
            >
              <Link to="/gaias-projects">🌍 GAiA's Projects</Link>
            </Button>

            <Button
              variant={isActivePath('/transparent-wallet') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/transparent-wallet') ? 'bg-cyan-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-cyan-700/50 justify-start'}
            >
              <Link to="/transparent-wallet">👁️ Transparent Wallet</Link>
            </Button>

            <Button
              variant={isActivePath('/swap') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/swap') ? 'bg-blue-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-blue-700/50 justify-start'}
            >
              <Link to="/swap">💱 Swap</Link>
            </Button>

            <Button
              variant={isActivePath('/wallet') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/wallet') ? 'bg-orange-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-orange-700/50 justify-start'}
            >
              <Link to="/wallet">💰 Wallet</Link>
            </Button>

            <Button
              variant={isActivePath('/coin-crafter') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/coin-crafter') ? 'bg-yellow-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-yellow-700/50 justify-start'}
            >
              <Link to="/coin-crafter">⚡ Coin Crafter</Link>
            </Button>

            <Button
              variant={isActivePath('/nft-green-animal-platform') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/nft-green-animal-platform') ? 'bg-green-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-green-700/50 justify-start'}
            >
              <Link to="/nft-green-animal-platform">🐾 Green NFTs</Link>
            </Button>

            <Button
              variant={isActivePath('/aura-land-scrapyard') ? 'default' : 'ghost'}
              asChild
              size="sm"
              className={isActivePath('/aura-land-scrapyard') ? 'bg-purple-600 text-white justify-start' : 'text-gray-300 hover:text-white hover:bg-purple-700/50 justify-start'}
            >
              <Link to="/aura-land-scrapyard">🎮 Gaming</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
