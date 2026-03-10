'use client';

import { useEffect, useRef } from 'react';
import { useTrackPortfolioVisit } from '../../../../lib/hooks/use-portfolio';

export default function PortfolioVisitTracker({
  username,
}: {
  username: string;
}) {
  const trackVisit = useTrackPortfolioVisit();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Try to get country from timezone as a simple heuristic
    let country: string | undefined;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        const parts = tz.split('/');
        country = parts[0];
      }
    } catch {
      // ignore
    }

    trackVisit.mutate({ username, country });
  }, [username]);

  return null;
}
