// lib/apiClient.ts
// Centralized helper to call the backend API via a configurable base URL.
// FRONTEND-ONLY: This file should not import any server-only libraries.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function normalizeBaseUrl(base: string): string {
  if (!base) return '';
  return base.replace(/\/+$/, '');
}

function normalizePath(path: string): string {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function getApiUrl(path: string): string {
  // If the caller already passes a full URL, return as-is
  if (/^https?:\/\//i.test(path)) return path;

  const base = normalizeBaseUrl(API_BASE_URL);
  const normalizedPath = normalizePath(path);

  // If no base URL configured, fall back to relative path (works in dev)
  if (!base) return normalizedPath;

  return `${base}${normalizedPath}`;
}

export async function apiFetch(inputPath: string, init?: RequestInit): Promise<Response> {
  const isAbsoluteInput = /^https?:\/\//i.test(inputPath);
  const browserRelativeUrl = normalizePath(inputPath);
  const url = typeof window !== 'undefined' && !isAbsoluteInput
    ? browserRelativeUrl
    : getApiUrl(inputPath);

  // Automatically attach Authorization: Bearer <session_token> from frontend cookies
  // for browser requests, unless caller already set an Authorization header.
  let finalInit: RequestInit = { ...(init || {}) };

  if (typeof window !== 'undefined') {
    const headers = new Headers(finalInit.headers || {});

    const hasAuth = headers.has('Authorization');

    if (!hasAuth) {
      const cookieToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('session_token='))
        ?.split('=')[1];

      if (cookieToken) {
        headers.set('Authorization', `Bearer ${decodeURIComponent(cookieToken)}`);
      }
    }

    finalInit.headers = headers;
  }

  return fetch(url, finalInit);
}

export { API_BASE_URL };
