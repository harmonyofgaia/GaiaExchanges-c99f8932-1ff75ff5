
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reinvestments from "./pages/Reinvestments";
import Downloads from "./pages/Downloads";
import PlatformCompatibility from "./pages/PlatformCompatibility";
import Gaming from "./pages/Gaming";
import Webshop from "./pages/Webshop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reinvestments" element={<Reinvestments />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/platform-compatibility" element={<PlatformCompatibility />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/webshop" element={<Webshop />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
