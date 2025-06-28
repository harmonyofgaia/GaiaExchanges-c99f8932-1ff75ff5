
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Trading from "./pages/Trading";
import Portfolio from "./pages/Portfolio";
import Staking from "./pages/Staking";
import Reinvestments from "./pages/Reinvestments";
import Downloads from "./pages/Downloads";
import PlatformCompatibility from "./pages/PlatformCompatibility";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/reinvestments" element={<Reinvestments />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/platform-compatibility" element={<PlatformCompatibility />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
