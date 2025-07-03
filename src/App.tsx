
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from '@/pages/HomePage'
import Admin from '@/pages/Admin'
import Exchange from '@/pages/Exchange'
import Staking from '@/pages/Staking'
import Governance from '@/pages/Governance'
import Contact from '@/pages/Contact'
import AboutUs from '@/pages/AboutUs'
import Ecosystem from '@/pages/Ecosystem'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import TransparentWallet from '@/pages/TransparentWallet'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/landscape-builder" element={<LandscapeBuilder />} />
          <Route path="/transparent-wallet" element={<TransparentWallet />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
