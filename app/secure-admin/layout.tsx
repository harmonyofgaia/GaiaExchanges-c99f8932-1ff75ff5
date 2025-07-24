'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

// Create a mock AuthProvider for the secure admin section
const SecureAdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock auth context for admin components compatibility
  const mockAuthContext = {
    user: { id: 'admin', username: 'Synatic' },
    session: { id: 'admin-session', user: { id: 'admin' } },
    loading: false,
    isAuthenticated: true,
    signOut: () => {},
    signIn: () => {}
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

const queryClient = new QueryClient()

export default function SecureAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SecureAdminAuthProvider>
          <Toaster />
          <Sonner />
          {children}
        </SecureAdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}