
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Index from './pages/Index'
import About from './pages/About'
import Contact from './pages/Contact'
import SecureAdmin from './pages/SecureAdmin'
import AdminLogin from './legacy-pages/AdminLogin'
import Community from './pages/Community'
import Analytics from './pages/Analytics'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
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
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Routes - Redirect to SecureAdmin */}
            <Route path="/admin" element={<Navigate to="/secure-admin" replace />} />
            <Route path="/admin/*" element={<Navigate to="/secure-admin" replace />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Secure Admin Route */}
            <Route path="/secure-admin" element={<SecureAdmin />} />
            
            {/* Catch all other routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
