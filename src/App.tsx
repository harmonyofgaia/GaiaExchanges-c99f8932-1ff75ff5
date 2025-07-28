
import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const DecentralizedProjectFundingPools = lazy(() => import("./pages/DecentralizedProjectFundingPools"));
const GreenInvestments = lazy(() => import("./pages/GreenInvestments"));
const SandProtect = lazy(() => import("./pages/SandProtect"));
const AdminPanel = lazy(() => import("./pages/Admin"));
const ForestShieldMasterPlan = lazy(() => import("./pages/ForestShieldMasterPlan"));

// Phase 1 pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const GreenImpactDashboard = lazy(() => import("./pages/GreenImpactDashboard"));
const GaiaConsistencyStatus = lazy(() => import("./pages/GaiaConsistencyStatus"));
const Security = lazy(() => import("./pages/Security"));

// Phase 2 pages
const ProjectFunding = lazy(() => import("./pages/ProjectFunding"));
const WildfireDefenseDashboard = lazy(() => import("./pages/WildfireDefenseDashboard"));
const ForestTokenSystem = lazy(() => import("./pages/ForestTokenSystem"));
const ImpactMeasurementSystem = lazy(() => import("./pages/ImpactMeasurementSystem"));
const SeaGreenPsychohistoricalProject = lazy(() => import("./pages/SeaGreenPsychohistoricalProject"));

// Phase 3 pages
const CommunityEngagementHub = lazy(() => import("./pages/CommunityEngagementHub"));
const PartnershipManagement = lazy(() => import("./pages/PartnershipManagement"));
const DeploymentCenter = lazy(() => import("./pages/DeploymentCenter"));

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
            
            {/* Phase 1 Routes */}
            <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
            <Route path="/green-impact-dashboard" element={<Suspense fallback={<div>Loading...</div>}><GreenImpactDashboard /></Suspense>} />
            <Route path="/gaia-consistency-status" element={<Suspense fallback={<div>Loading...</div>}><GaiaConsistencyStatus /></Suspense>} />
            <Route path="/security" element={<Suspense fallback={<div>Loading...</div>}><Security /></Suspense>} />

            {/* Phase 2 Routes */}
            <Route path="/project-funding" element={<Suspense fallback={<div>Loading...</div>}><ProjectFunding /></Suspense>} />
            <Route path="/wildfire-defense-dashboard" element={<Suspense fallback={<div>Loading...</div>}><WildfireDefenseDashboard /></Suspense>} />
            <Route path="/forest-token-system" element={<Suspense fallback={<div>Loading...</div>}><ForestTokenSystem /></Suspense>} />
            <Route path="/impact-measurement-system" element={<Suspense fallback={<div>Loading...</div>}><ImpactMeasurementSystem /></Suspense>} />
            <Route path="/sea-green-psychohistorical" element={<Suspense fallback={<div>Loading...</div>}><SeaGreenPsychohistoricalProject /></Suspense>} />

            {/* Phase 3 Routes */}
            <Route path="/community-engagement-hub" element={<Suspense fallback={<div>Loading...</div>}><CommunityEngagementHub /></Suspense>} />
            <Route path="/partnership-management" element={<Suspense fallback={<div>Loading...</div>}><PartnershipManagement /></Suspense>} />
            <Route path="/deployment-center" element={<Suspense fallback={<div>Loading...</div>}><DeploymentCenter /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
