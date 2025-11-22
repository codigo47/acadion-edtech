// lib/posthogClient.ts
import posthog from "posthog-js";

let isInitialized = false;

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (isInitialized) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
    capture_pageview: false,
    person_profiles: "identified_only",
    autocapture: true,
    loaded: (ph) => {
      ph.set_person_properties({
        environment: process.env.NEXT_PUBLIC_POSTHOG_ENV,
      });
    },
  });

  isInitialized = true;
}

export { posthog };
