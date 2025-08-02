

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './index.css';

// Integrations
import '@/utils/sentry';
import { trackEvent } from '@/utils/analytics';
import { subscribeToChannel } from '@/utils/realtime';
import { getProvider } from '@/utils/blockchain';
import { registerPush } from '@/utils/pushNotifications';
import { generateText } from '@/utils/ai';
import { uploadToIPFS } from '@/utils/ipfs';
import { registerMobilePush } from '@/utils/mobile';
import { changeLanguage } from '@/utils/localization';

// Example: Initialize global integrations
if (typeof window !== 'undefined') {
  // Sentry is auto-initialized
  // Analytics example
  trackEvent('app_start');
  // Supabase realtime example
  subscribeToChannel('global', (payload) => {
    // handle realtime updates
    console.log('Realtime update:', payload);
  });
  // Blockchain provider example
  getProvider();
  // Register push notifications (web)
  // registerPush().catch(() => {});
  // Register mobile push (Capacitor)
  // registerMobilePush();
  // Change language example
  // changeLanguage('en');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
