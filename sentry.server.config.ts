// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://eec86023393ff8e4fadab78406407fd6@o4508984490131461.ingest.us.sentry.io/4508984550752256",

  tracesSampleRate: 1,

  debug: false,
});
