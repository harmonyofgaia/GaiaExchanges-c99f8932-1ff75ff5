import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryProvider } from './hooks/useQuery'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { Wallet } from './pages/Wallet'
import { Gaming } from './pages/Gaming'
import { Markets } from './pages/Markets'
import { Security } from './pages/Security'
import { LiveTracking } from './pages/LiveTracking'
import { AdminPanel } from './components/admin/AdminPanel'
import { VisualControlButton } from './components/visual/VisualControlButton'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'

function App() {
  return (
    <Router>
      <QueryProvider>
        <ThemeProvider>
          {/* Stable Matrix Background */}
          <EnhancedBackgroundManager 
            settings={{
              type: 'matrix',
              intensity: 'medium',
              color: '#00ff00',
              speed: 1,
              autoGenerate: false
            }}
          />
          
          <div className="relative z-10">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/security" element={<Security />} />
                <Route path="/live-tracking" element={<LiveTracking />} />
              </Routes>
            </main>
            <AdminPanel />
            <VisualControlButton />
          </div>
        </ThemeProvider>
      </QueryProvider>
    </Router>
  )
}

export default App
