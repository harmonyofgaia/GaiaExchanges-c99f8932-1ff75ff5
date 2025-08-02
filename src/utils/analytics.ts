// Example: Google Analytics (gtag.js) integration
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  }
}

// Example usage: trackEvent('login', { method: 'Google' });
