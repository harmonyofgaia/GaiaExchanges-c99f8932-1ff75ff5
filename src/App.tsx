
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import GreenInvestments from '@/pages/GreenInvestments';
import EarningActivitiesDashboard from '@/pages/EarningActivitiesDashboard';
import EarningSystemsOverview from '@/pages/EarningSystemsOverview';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/green-investments" element={<GreenInvestments />} />
            <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
            <Route path="/earning-systems" element={<EarningSystemsOverview />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
