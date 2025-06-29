
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ConnectionTracker } from '@/components/security/ConnectionTracker'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin'
import SecureAdmin from '@/pages/SecureAdmin'
import GaiaFighterGame from '@/pages/GaiaFighterGame'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Toaster />
        <ConnectionTracker />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/secure-admin" element={<SecureAdmin />} />
            <Route path="/game" element={<GaiaFighterGame />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
