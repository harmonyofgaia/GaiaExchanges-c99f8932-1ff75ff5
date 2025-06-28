
import { createRoot } from 'react-dom/client'
import { AppWithErrorBoundary } from './components/AppWithErrorBoundary.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<AppWithErrorBoundary />);
