
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Exchange from "./pages/Exchange"
import TransparentWallet from "./pages/TransparentWallet"
import FeeVault from "./pages/FeeVault"
import LovableDeploymentTool from "./pages/LovableDeploymentTool"
import Security from "./pages/Security"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/wallet" element={<TransparentWallet />} />
            <Route path="/transparent-wallet" element={<TransparentWallet />} />
            <Route path="/fee-vault" element={<FeeVault />} />
            <Route path="/deployment" element={<LovableDeploymentTool />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
