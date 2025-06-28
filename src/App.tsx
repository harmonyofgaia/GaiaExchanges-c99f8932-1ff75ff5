
import { AppWithErrorBoundary } from "@/components/AppWithErrorBoundary"

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppWithErrorBoundary>
          <SystemMonitor />
          <div className="min-h-screen bg-black text-white">
            <AppSidebar />
            <main className="transition-all duration-300 ease-in-out ml-0 lg:ml-64">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/wallet" element={<GaiaWallet />} />
                <Route path="/trading" element={<TradingInterface />} />
                <Route path="/portfolio" element={<PortfolioOverview />} />
                <Route path="/security" element={<UltimateSecurity />} />
                <Route path="/status" element={<ComprehensiveStatus />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/github" element={<GitHubRepositories />} />
                <Route path="/admin" element={<AdminLogin />} />
              </Routes>
            </main>
          </div>
        </AppWithErrorBoundary>
        <Toaster />
      </QueryClientProvider>
    </Router>
  )
}

export default App
