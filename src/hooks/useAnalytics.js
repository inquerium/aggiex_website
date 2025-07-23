import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback(async (type, page, details = {}) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, page, details }),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  return { trackEvent };
} 