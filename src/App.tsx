import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { useGlobalBackgroundServices } from '@/hooks/useGlobalBackgroundServices'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const LiveTracking = lazy(() => import('./pages/LiveTracking'))
const Gaming = lazy(() => import('./pages/Gaming'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Markets = lazy(() => import('./pages/Markets'))
const VideoExchange = lazy(() => import('./pages/VideoExchange'))
const GaiaBikeEcosystem = lazy(() => import('./pages/GaiaBikeEcosystem'))
const TokenMining = lazy(() => import('./pages/TokenMining'))
const GreenInvestments = lazy(() => import('./pages/GreenInvestments'))
const CoinCrafter = lazy(() => import('./pages/CoinCrafter'))
const PrivateBlockchain = lazy(() => import('./pages/PrivateBlockchain'))
const Admin = lazy(() => import('./pages/Admin'))
const SecureAdmin = lazy(() => import('./pages/SecureAdmin'))

function App() {
  useGlobalBackgroundServices()

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <GaiaLogo size="xl" variant="matrix" />
                <div className="mt-4 text-primary animate-pulse">Loading Gaia Exchanges...</div>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/video-exchange" element={<VideoExchange />} />
              <Route path="/gaia-bike-ecosystem" element={<GaiaBikeEcosystem />} />
              <Route path="/token-mining" element={<TokenMining />} />
              <Route path="/green-investments" element={<GreenInvestments />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/private-blockchain" element={<PrivateBlockchain />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
            </Routes>
          </Suspense>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
