
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import Index from '@/pages/Index'
import About from '@/pages/About'
import Community from '@/pages/Community'
import Exchange from '@/pages/Exchange'
import Gaming from '@/pages/Gaming'
import Contact from '@/pages/Contact'
import Auth from '@/pages/Auth'
import Profile from '@/pages/Profile'
import Transparency from '@/pages/Transparency'
import NFTMarketplace from '@/pages/NFTMarketplace'
import SmartContracts from '@/pages/SmartContracts'
import Staking from '@/pages/Staking'
import Admin from '@/pages/Admin'
import PrivateBlockchain from '@/pages/PrivateBlockchain'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
        <Navbar />
        <MasterSystemOrchestrator />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/nft-marketplace" element={<NFTMarketplace />} />
            <Route path="/smart-contracts" element={<SmartContracts />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/private-blockchain" element={<PrivateBlockchain />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
