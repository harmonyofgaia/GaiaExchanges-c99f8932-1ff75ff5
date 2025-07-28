import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const DecentralizedProjectFundingPools = lazy(() => import("./pages/DecentralizedProjectFundingPools"));
const GreenInvestments = lazy(() => import("./pages/GreenInvestments"));
const SandProtect = lazy(() => import("./pages/SandProtect"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const ForestShieldMasterPlan = lazy(() => import("./pages/ForestShieldMasterPlan"));

// Phase 1 new pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const GreenImpactDashboard = lazy(() => import("./pages/GreenImpactDashboard"));
const GAiAConsistencyStatus = lazy(() => import("./pages/GAiAConsistencyStatus"));
const Security = lazy(() => import("./pages/Security"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
            <Route path="/decentralized-project-funding-pools" element={<Suspense fallback={<div>Loading...</div>}><DecentralizedProjectFundingPools /></Suspense>} />
            <Route path="/green-investments" element={<Suspense fallback={<div>Loading...</div>}><GreenInvestments /></Suspense>} />
            <Route path="/sand-protect" element={<Suspense fallback={<div>Loading...</div>}><SandProtect /></Suspense>} />
            <Route path="/admin-panel" element={<Suspense fallback={<div>Loading...</div>}><AdminPanel /></Suspense>} />
            <Route path="/forest-shield-master-plan" element={<Suspense fallback={<div>Loading...</div>}><ForestShieldMasterPlan /></Suspense>} />
            
            {/* Phase 1 New Routes */}
            <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
            <Route path="/green-impact-dashboard" element={<Suspense fallback={<div>Loading...</div>}><GreenImpactDashboard /></Suspense>} />
            <Route path="/gaia-consistency-status" element={<Suspense fallback={<div>Loading...</div>}><GAiAConsistencyStatus /></Suspense>} />
            <Route path="/security" element={<Suspense fallback={<div>Loading...</div>}><Security /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
