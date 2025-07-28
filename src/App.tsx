import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Enhanced2FAAuthProvider } from '@/components/auth/Enhanced2FAAuthProvider'
import { HoneypotRedirect } from '@/components/security/HoneypotRedirect'
import { InvisibleAdminProtection } from '@/components/security/InvisibleAdminProtection'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { Invisible4StepVerification } from '@/components/security/Invisible4StepVerification'
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor'
import { UnifiedServiceOrchestrator } from '@/components/UnifiedServiceOrchestrator'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import { DatabaseErrorFixer } from '@/components/security/DatabaseErrorFixer'
import { SystemMonitor } from '@/components/SystemMonitor'
import { HomePage } from '@/pages/HomePage'
import { WalletPage } from '@/pages/WalletPage'
import { MarketsPage } from '@/pages/MarketsPage'
import { ExchangePage } from '@/pages/ExchangePage'
import { AdminLoginPage } from '@/pages/AdminLoginPage'
import { SecureAdminDashboard } from '@/pages/SecureAdminDashboard'
import { TransparentWalletPage } from '@/pages/TransparentWalletPage'
import { VaultSystemPage } from '@/pages/VaultSystemPage'
import { TokenMiningPage } from '@/pages/TokenMiningPage'
import { CoinCrafterPage } from '@/pages/CoinCrafterPage'
import { FeeVaultPage } from '@/pages/FeeVaultPage'
import { MusicPlatformPage } from '@/pages/MusicPlatformPage'
import { AnimatedCoinCrafting } from '@/components/AnimatedCoinCrafting'
import { LiveTVScreen } from '@/components/LiveTVScreen'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { OptimizedDatabaseCleanup } from '@/components/database/OptimizedDatabaseCleanup'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Systems - Optimized */}
        <MasterSystemOrchestrator />
        <DatabaseErrorFixer />
        <OptimizedDatabaseCleanup />
        <SystemMonitor />
        <SystemHealthMonitor />
        <UnifiedServiceOrchestrator />
        
        {/* Security Systems */}
        <HoneypotRedirect />
        <InvisibleAdminProtection />
        <InvisibleSecurityCore />
        <Invisible4StepVerification />

        {/* Backgrounds */}
        <EnhancedBackgroundManager settings={{
          type: 'matrix',
          intensity: 'medium',
          color: '#00ff00',
          speed: 1.5,
          autoGenerate: true
        }} />

        {/* Auth Providers */}
        <Enhanced2FAAuthProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/exchange" element={<ExchangePage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />

              {/* Secure Admin Routes */}
              <Route path="/secure-admin" element={<SecureAdminDashboard />} />
              <Route path="/secure-vault" element={<VaultSystemPage />} />
              <Route path="/transparent-wallet" element={<TransparentWalletPage />} />

              {/* Gaming & Entertainment */}
              <Route path="/token-mining" element={<TokenMiningPage />} />
              <Route path="/coin-crafter" element={<CoinCrafterPage />} />
              <Route path="/fee-vault" element={<FeeVaultPage />} />
              <Route path="/music-platform" element={<MusicPlatformPage />} />

              {/* Components */}
              <Route path="/animated-coin-crafting" element={<AnimatedCoinCrafting />} />
              <Route path="/live-tv-screen" element={<LiveTVScreen />} />
            </Routes>
          </AuthProvider>
        </Enhanced2FAAuthProvider>
      </div>
    </Router>
  )
}

export default App
