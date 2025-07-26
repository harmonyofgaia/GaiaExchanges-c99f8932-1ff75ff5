/**
 * Tiny Hamburger Menu for Homepage Navigation
 * Positioned above the main button at the bottom of the page
 */

import React, { useState } from 'react'
import { Menu, X, Home, User, Settings, Shield, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export function TinyHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/dashboard' },
    { icon: Settings, label: 'Settings', path: '/admin' },
    { icon: Shield, label: 'Security', path: '/secure-admin' },
    { icon: HelpCircle, label: 'Help', path: '/about' }
  ]

  const handleMenuClick = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className="w-8 h-8 p-0 bg-green-900/20 border-green-500/30 hover:bg-green-500/20 text-green-400"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Menu Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Card */}
          <Card className="absolute bottom-full right-0 mb-2 w-40 z-50 border-green-500/30 bg-gradient-to-br from-green-900/90 to-black/90 backdrop-blur-sm">
            <CardContent className="p-2">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-green-300 hover:text-green-100 hover:bg-green-500/20 text-xs"
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <Icon className="h-3 w-3 mr-2" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}