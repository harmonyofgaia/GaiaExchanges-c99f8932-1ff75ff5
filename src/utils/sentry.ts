import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";
import { Replay } from "@sentry/replay";

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
        new BrowserTracing(),
        new Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});
