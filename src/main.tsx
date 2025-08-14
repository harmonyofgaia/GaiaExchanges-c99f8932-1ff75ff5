// ...existing code...

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./index.css";
// ...existing code...
// ...existing code...
// ...existing code...

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
