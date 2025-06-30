
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import AuraLandScrapyard from './pages/AuraLandScrapyard'
import CoinCrafter from './pages/CoinCrafter'
import NFTGreenAnimalPlatform from './pages/NFTGreenAnimalPlatform'
import Swap from './pages/Swap'
import Wallet from './pages/Wallet'
import SecureAdmin from './pages/SecureAdmin'
import SecureVault from './pages/SecureVault'
import { UserOnlyProtectedRoute } from './components/auth/UserOnlyProtectedRoute'
import { GlobalSEOOptimizer } from './components/seo/GlobalSEOOptimizer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={
            <UserOnlyProtectedRoute>
              <Home />
            </UserOnlyProtectedRoute>
          } />
          
          <Route path="/aura-land-scrapyard" element={
            <UserOnlyProtectedRoute>
              <AuraLandScrapyard />
            </UserOnlyProtectedRoute>
          } />
          
          <Route path="/coin-crafter" element={
            <UserOnlyProtectedRoute>
              <CoinCrafter />
            </UserOnlyProtectedRoute>
          } />
          
          <Route path="/nft-green-animal-platform" element={
            <UserOnlyProtectedRoute>
              <NFTGreenAnimalPlatform />
            </UserOnlyProtectedRoute>
          } />
          
          <Route path="/swap" element={
            <UserOnlyProtectedRoute>
              <Swap />
            </UserOnlyProtectedRoute>
          } />

          <Route path="/wallet" element={
            <UserOnlyProtectedRoute>
              <Wallet />
            </UserOnlyProtectedRoute>
          } />
          
          {/* Both admin routes point to the same secure vault system */}
          <Route path="/admin" element={<SecureVault />} />
          <Route path="/secure-admin" element={<SecureAdmin />} />
          <Route path="/secure-vault" element={<SecureVault />} />
        </Routes>
        <Toaster />
        <GlobalSEOOptimizer />
      </div>
    </Router>
  )
}

export default App
