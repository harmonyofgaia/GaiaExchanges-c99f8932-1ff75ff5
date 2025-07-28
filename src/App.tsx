
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import SecureAdmin from "./pages/SecureAdmin";
import EarningActivitiesDashboard from "./pages/EarningActivitiesDashboard";
import { StorageProvider } from "./contexts/StorageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StorageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </StorageProvider>
  </QueryClientProvider>
);

export default App;
