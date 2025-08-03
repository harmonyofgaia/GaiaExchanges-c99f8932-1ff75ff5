import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";
import { Replay } from "@sentry/replay";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const ENV = import.meta.env.MODE || 'development';

if (SENTRY_DSN && ENV !== 'development') {
    Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
            new BrowserTracing(),
            new Replay(),
        ],
        tracesSampleRate: ENV === 'production' ? 1.0 : 0.1,
        replaysSessionSampleRate: ENV === 'production' ? 0.1 : 0,
        replaysOnErrorSampleRate: 1.0,
        environment: ENV,
        // Optionally add release for better tracking
        // release: import.meta.env.VITE_APP_VERSION,
    });
}