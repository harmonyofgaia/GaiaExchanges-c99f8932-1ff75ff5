
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './components/auth/AuthProvider'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Tokenomics from './pages/Tokenomics'
import Roadmap from './pages/Roadmap'
import Games from './pages/Games'
import EarningActivities from './pages/EarningActivities'
import VideoExchange from './pages/VideoExchange'
import Community from './pages/Community'
import Transparency from './pages/Transparency'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import SecureAdmin from './pages/SecureAdmin'
import { AdminRouteProtector } from './components/admin/AdminRouteProtector'
import { PersistentAdminSession } from './components/admin/PersistentAdminSession'
import { EnhancedBackgroundManager } from './components/backgrounds/EnhancedBackgroundManager'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
            {/* Global Background Manager */}
            <EnhancedBackgroundManager 
              settings={{
                type: 'particles',
                intensity: 'medium',
                color: '#00ff00',
                speed: 1.0,
                autoGenerate: true
              }}
            />
            
            {/* Admin Route Protector */}
            <AdminRouteProtector />
            
            {/* Persistent Admin Session Manager */}
            <PersistentAdminSession />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tokenomics" element={<Tokenomics />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/games" element={<Games />} />
                <Route path="/earning-activities" element={<EarningActivities />} />
                <Route path="/video-exchange" element={<VideoExchange />} />
                <Route path="/community" element={<Community />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/secure-admin" element={<SecureAdmin />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
