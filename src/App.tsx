
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import Wallet from "./pages/Wallet";
import Exchange from "./pages/Exchange";
import Markets from "./pages/Markets";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Downloads from "./pages/Downloads";
import Security from "./pages/Security";
import UltimateSecurity from "./pages/UltimateSecurity";
import MarketingHub from "./pages/MarketingHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/security" element={<Security />} />
            <Route path="/ultimate-security" element={<UltimateSecurity />} />
            <Route path="/marketing" element={<MarketingHub />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
