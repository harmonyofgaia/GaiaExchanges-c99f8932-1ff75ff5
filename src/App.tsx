
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Index from './pages/Index'
import About from './pages/About'
import Contact from './pages/Contact'
import Tokenomics from './pages/Tokenomics'
import Roadmap from './pages/Roadmap'
import Games from './pages/Games'
import SecureAdmin from './pages/SecureAdmin'
import AdminLogin from './legacy-pages/AdminLogin'
import Vault from './pages/Vault'
import Earning from './pages/Earning'
import Community from './pages/Community'
import Staking from './pages/Staking'
import Governance from './pages/Governance'
import Analytics from './pages/Analytics'
import Rewards from './pages/Rewards'
import NFT from './pages/NFT'
import DeFi from './pages/DeFi'
import Trading from './pages/Trading'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Documentation from './pages/Documentation'
import Support from './pages/Support'
import News from './pages/News'
import Events from './pages/Events'
import Leaderboard from './pages/Leaderboard'
import Achievements from './pages/Achievements'
import Referrals from './pages/Referrals'
import Notifications from './pages/Notifications'
import Security from './pages/Security'
import API from './pages/API'
import Developers from './pages/Developers'
import Partnerships from './pages/Partnerships'
import Legal from './pages/Legal'
import { Navigate } from 'react-router-dom'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/games" element={<Games />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/earning" element={<Earning />} />
            <Route path="/community" element={<Community />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/defi" element={<DeFi />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/security" element={<Security />} />
            <Route path="/api" element={<API />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/legal" element={<Legal />} />
            
            {/* Admin Routes - Redirect to SecureAdmin */}
            <Route path="/admin" element={<Navigate to="/secure-admin" replace />} />
            <Route path="/admin/*" element={<Navigate to="/secure-admin" replace />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Secure Admin Route */}
            <Route path="/secure-admin" element={<SecureAdmin />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
