
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import Home from '@/pages/Home'
import { Tokenomics } from '@/pages/Tokenomics'
import { Roadmap } from '@/pages/Roadmap'
import { Games } from '@/pages/Games'
import { EarningActivities } from '@/pages/EarningActivities'
import { VideoExchange } from '@/pages/VideoExchange'
import SecureAdmin from '@/pages/SecureAdmin'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <EnhancedBackgroundManager 
            settings={{
              type: 'matrix',
              intensity: 'medium',
              color: '#00ff00',
              speed: 1,
              autoGenerate: true
            }}
          />
          
          <div className="relative z-10">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tokenomics" element={<Tokenomics />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/games" element={<Games />} />
              <Route path="/earning-activities" element={<EarningActivities />} />
              <Route path="/video-exchange" element={<VideoExchange />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
            </Routes>
            
            <Footer />
          </div>
        </div>
        
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
