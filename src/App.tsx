
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import VaultSystem from './pages/VaultSystem'
import PrivateBlockchain from './pages/PrivateBlockchain'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vault" element={<VaultSystem />} />
            <Route path="/blockchain" element={<PrivateBlockchain />} />
          </Routes>
          <Toaster 
            position="top-right" 
            expand={true}
            richColors
            closeButton
          />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
