import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Menu, User, Settings, Shield, HelpCircle } from 'lucide-react'

export function TinyHamburgerMenu() {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Quick navigation menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="center" 
          side="top"
          className="bg-background/95 border-primary/30 backdrop-blur-sm w-48"
        >
          <div className="text-xs font-semibold text-primary px-2 py-1 border-b border-primary/20">
            Quick Access
          </div>
          <DropdownMenuItem asChild>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-primary/10"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/settings"
              className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-primary/10"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/secure-admin"
              className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-primary/10"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/docs"
              className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-primary/10"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}