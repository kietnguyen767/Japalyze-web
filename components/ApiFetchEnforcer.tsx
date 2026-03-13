'use client';

import { useEffect } from 'react';

function getSessionTokenFromCookie(): string | null {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('session_token='))
    ?.split('=')[1];

  return token ? decodeURIComponent(token) : null;
}

function isApiRequest(input: RequestInfo | URL): boolean {
  const raw = typeof input === 'string'
    ? input
    : input instanceof URL
      ? input.toString()
      : input.url;

  if (raw.startsWith('/api/')) return true;

  try {
    const url = new URL(raw, window.location.origin);
    return url.pathname.startsWith('/api/');
  } catch {
    return false;
  }
}

export default function ApiFetchEnforcer() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      if (!isApiRequest(input)) {
        return originalFetch(input, init);
      }

      const headers = new Headers(init?.headers || {});
      if (!headers.has('Authorization')) {
        const token = getSessionTokenFromCookie();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      return originalFetch(input, {
        ...(init || {}),
        headers,
      });
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
