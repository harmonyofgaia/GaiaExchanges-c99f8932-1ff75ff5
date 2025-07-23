
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navigationItems } from "./nav-items";
import Index from "./pages/Index";
import { DatabaseErrorFixer } from '@/components/security/DatabaseErrorFixer';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DatabaseErrorFixer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {navigationItems.map((item) => (
            <Route 
              key={item.to} 
              path={item.to} 
              element={
                <div>
                  {React.createElement(
                    React.lazy(() => 
                      import(`./pages${item.to === '/' ? '/Index' : item.to.split('/').map(segment => 
                        segment.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join('')
                      ).join('/')}`).catch(() => 
                        import('./pages/Index')
                      )
                    )
                  )}
                </div>
              } 
            />
          ))}
          {/* Additional routes from PRs */}
          <Route path="/enhanced-downloads" element={<EnhancedDownloads />} />
          <Route path="/secure-vault" element={<SecureVault />} />
          <Route path="/secure-admin" element={<SecureAdmin />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gaming" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
