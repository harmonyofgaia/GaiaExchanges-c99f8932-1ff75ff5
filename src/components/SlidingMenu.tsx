import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from './ModeToggle'
import { useTheme } from 'next-themes'
import { Link } from 'react-router-dom'

const SlidingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menuItems = [
    { 
      name: 'Admin Dashboard', 
      path: '/admin', 
      icon: '⚙️',
      description: 'Full System Control Panel'
    },
    { 
      name: 'Exchange', 
      path: '/exchange', 
      icon: '💱',
      description: 'Trade GAiA and Support Initiatives'
    },
    { 
      name: 'Investment Portal', 
      path: '/investment-portal', 
      icon: '🏦',
      description: 'Long-Term Investment Strategies'
    },
    { 
      name: 'Tracking System', 
      path: '/tracking', 
      icon: '🛰️',
      description: 'Global Real-Time Tracking'
    },
    { 
      name: 'AI Game', 
      path: '/ai-game', 
      icon: '🎮',
      description: 'Play the AI Game'
    },
    { 
      name: 'AI Assistant', 
      path: '/ai-assistant', 
      icon: '🤖',
      description: 'Your Personal AI Assistant'
    },
    { 
      name: 'AI Transparency', 
      path: '/ai-transparency', 
      icon: '👁️',
      description: 'AI Transparency Center'
    },
    { 
      name: 'Landscape Builder', 
      path: '/landscape-builder', 
      icon: '🌄',
      description: 'Advanced AI Landscape & Video Creator'
    },
    { 
      name: 'Legal Compliance', 
      path: '/legal', 
      icon: '🏛️',
      description: 'Legal Documentation for Exchange Listings'
    },
    { 
      name: 'Roadmap', 
      path: '/roadmap', 
      icon: '🗺️',
      description: 'Project Roadmap'
    },
    { 
      name: 'Whitepaper', 
      path: '/whitepaper', 
      icon: '📄',
      description: 'Project Whitepaper'
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      icon: '✉️',
      description: 'Contact Us'
    },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="lg:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="p-0 pt-6 border-r"
      >
        <SheetHeader className="pl-6 pb-4">
          <SheetTitle className="text-lg">
            {theme === "dark" ? "🌑" : "🔆"} Menu
          </SheetTitle>
          <SheetDescription>
            Navigate the Harmony of Gaia
          </SheetDescription>
        </SheetHeader>
        <div className="py-2">
          {menuItems.map((item) => (
            <Link 
              to={item.path} 
              key={item.name}
              className="flex items-center gap-3 py-2 px-6 hover:bg-secondary rounded-sm"
              onClick={closeMenu}
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 w-full border-t">
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </span>
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SlidingMenu
