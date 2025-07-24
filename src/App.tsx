
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminSessionManager } from "@/components/admin/AdminSessionManager"
import Index from "./pages/Index"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Exchange from "./pages/Exchange"
import TransparentWallet from "./pages/TransparentWallet"
import FeeVault from "./pages/FeeVault"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AdminSessionManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/secure-admin" element={<Admin />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/wallet" element={<TransparentWallet />} />
            <Route path="/transparent-wallet" element={<TransparentWallet />} />
            <Route path="/fee-vault" element={<FeeVault />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
