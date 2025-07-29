
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthProvider'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { EnhancedBackgroundManager } from './components/backgrounds/EnhancedBackgroundManager'
import { Home } from './pages/Home'
import { Tokenomics } from './pages/Tokenomics'
import { Roadmap } from './pages/Roadmap'
import { Games } from './pages/Games'
import { Vault } from './pages/Vault'
import { Auth } from './pages/Auth'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'
import { Community } from './pages/Community'
import { News } from './pages/News'
import { Trading } from './pages/Trading'
import { Staking } from './pages/Staking'
import { Airdrop } from './pages/Airdrop'
import { Referral } from './pages/Referral'
import { Tournaments } from './pages/Tournaments'
import { Lore } from './pages/Lore'
import { Docs } from './pages/Docs'
import { Support } from './pages/Support'
import { Partnerships } from './pages/Partnerships'
import { Governance } from './pages/Governance'
import { NFTs } from './pages/NFTs'
import { Metaverse } from './pages/Metaverse'
import { AI } from './pages/AI'
import { DeFi } from './pages/DeFi'
import { Store } from './pages/Store'
import { Creator } from './pages/Creator'
import { Events } from './pages/Events'
import { Analytics } from './pages/Analytics'
import { Earning } from './pages/Earning'
import { LoyaltyProgram } from './pages/LoyaltyProgram'
import { Farming } from './pages/Farming'
import { Ecosystem } from './pages/Ecosystem'
import { Sustainability } from './pages/Sustainability'
import { Portfolio } from './pages/Portfolio'
import { Launchpad } from './pages/Launchpad'
import { Bridge } from './pages/Bridge'
import { Lending } from './pages/Lending'
import { Insurance } from './pages/Insurance'
import { Prediction } from './pages/Prediction'
import { DAO } from './pages/DAO'
import { IDE } from './pages/IDE'
import { SecureAdmin } from './pages/SecureAdmin'
import { Toaster } from 'sonner'
import { AdminRouteProtector } from './components/admin/AdminRouteProtector'
import { PersistentAdminSession } from './components/admin/PersistentAdminSession'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <EnhancedBackgroundManager 
            settings={{
              type: 'matrix',
              intensity: 'medium',
              color: '#00ff00',
              speed: 1,
              autoGenerate: true
            }}
          />
          
          <Navbar />
          <AdminRouteProtector />
          <PersistentAdminSession />
          
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tokenomics" element={<Tokenomics />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/games" element={<Games />} />
              <Route path="/vault" element={<Vault />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/community" element={<Community />} />
              <Route path="/news" element={<News />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/lore" element={<Lore />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/support" element={<Support />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/nfts" element={<NFTs />} />
              <Route path="/metaverse" element={<Metaverse />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/defi" element={<DeFi />} />
              <Route path="/store" element={<Store />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/events" element={<Events />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/earning" element={<Earning />} />
              <Route path="/loyalty-program" element={<LoyaltyProgram />} />
              <Route path="/farming" element={<Farming />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/lending" element={<Lending />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/dao" element={<DAO />} />
              <Route path="/ide" element={<IDE />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/admin" element={<SecureAdmin />} />
            </Routes>
          </main>
          
          <Footer />
          <Toaster richColors position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
