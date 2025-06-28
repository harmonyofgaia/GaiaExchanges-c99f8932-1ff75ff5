import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { SystemMonitor } from '@/components/SystemMonitor'
import { AuthPage } from './components/auth/AuthPage'
import { GaiaWallet } from './components/GaiaWallet'
import { SecurityCenter } from './components/SecurityCenter'
import { AutoIssueResolver } from './components/AutoIssueResolver'
import Admin from './pages/Admin'
import UltimateSecurity from './pages/UltimateSecurity'
import SecureAdmin from '@/pages/SecureAdmin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <SystemMonitor />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/wallet" element={<GaiaWallet />} />
          <Route path="/security" element={<SecurityCenter notifications={[]} />} />
          <Route path="/auto-fix" element={<AutoIssueResolver />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ultimate-security" element={<UltimateSecurity />} />
          <Route path="/secure-admin" element={<SecureAdmin />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
