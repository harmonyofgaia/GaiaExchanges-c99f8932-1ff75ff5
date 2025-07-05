
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { QuantumTraceEraser } from '@/components/security/QuantumTraceEraser'
import { Invisible4StepVerification } from '@/components/security/Invisible4StepVerification'
import HomePage from '@/pages/HomePage'
import Admin from '@/pages/Admin'
import MatrixAdmin from '@/pages/MatrixAdmin'
import Security from '@/pages/Security'
import Exchange from '@/pages/Exchange'
import Staking from '@/pages/Staking'
import Governance from '@/pages/Governance'
import Contact from '@/pages/Contact'
import AboutUs from '@/pages/AboutUs'
import Ecosystem from '@/pages/Ecosystem'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import TransparentWallet from '@/pages/TransparentWallet'
import VaultSystem from '@/pages/VaultSystem'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
          <QuantumTraceEraser />
          <Invisible4StepVerification />
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/matrix-admin" element={<MatrixAdmin />} />
            <Route path="/security" element={<Security />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/landscape-builder" element={<LandscapeBuilder />} />
            <Route path="/transparent-wallet" element={<TransparentWallet />} />
            <Route path="/vault-system" element={<VaultSystem />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
