
import type { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.8dfae018363f47708e5c27c14bec8426',
  appName: 'Gaia\'s Exchanges',
  webDir: 'dist',
  server: {
    url: 'https://8dfae018-363f-4770-8e5c-27c14bec8426.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
