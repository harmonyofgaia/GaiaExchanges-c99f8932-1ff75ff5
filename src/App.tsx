
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import Index from '@/pages/Index'
import TokenDashboard from '@/pages/TokenDashboard'
import GreenInvestments from '@/pages/GreenInvestments'
import EarningActivitiesDashboard from '@/pages/EarningActivitiesDashboard'
import EarningSystemsOverview from '@/pages/EarningSystemsOverview'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/token-dashboard" element={<TokenDashboard />} />
          <Route path="/green-investments" element={<GreenInvestments />} />
          <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
          <Route path="/earning-systems" element={<EarningSystemsOverview />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
