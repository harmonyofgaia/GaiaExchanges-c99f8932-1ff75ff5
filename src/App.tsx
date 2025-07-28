
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { PageSpecificBackground } from '@/components/ui/page-specific-background'
import { OptimizedMouseAttraction } from '@/components/ui/optimized-mouse-attraction'

// Pages
import Index from '@/pages/Index'
import Home from '@/pages/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background relative">
          <PageSpecificBackground />
          <OptimizedMouseAttraction />
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
