// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://eec86023393ff8e4fadab78406407fd6@o4508984490131461.ingest.us.sentry.io/4508984550752256",

  tracesSampleRate: 1,

  debug: false,
});
