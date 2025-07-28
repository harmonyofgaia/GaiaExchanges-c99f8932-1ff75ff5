
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import EarningActivitiesDashboard from "./pages/EarningActivitiesDashboard";
import EarningSystemsOverview from "./pages/EarningSystemsOverview";
import GreenInvestments from "./pages/GreenInvestments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
            <Route path="/earning-systems" element={<EarningSystemsOverview />} />
            <Route path="/green-investments" element={<GreenInvestments />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
