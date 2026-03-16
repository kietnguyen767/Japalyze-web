// lib/tokenUtils.ts
/**
 * Utility functions for handling session tokens
 * Giúp tránh duplicate code trong pages
 */

/**
 * Lấy session token từ cookie
 * @returns Token string hoặc null nếu không tìm thấy
 */
export function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;

  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('session_token='))
      ?.split('=')[1];

    if (token) {
      console.log('🔑 [getTokenFromCookie] Token found:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ [getTokenFromCookie] No token found in cookies');
    }

    return token || null;
  } catch (error) {
    console.error('❌ [getTokenFromCookie] Error:', error);
    return null;
  }
}

/**
 * Tạo Authorization header từ token
 * @param token Session token
 * @returns Headers object với Authorization header
 */
export function createAuthHeaders(token: string | null): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Kiểm tra nếu error là 401 Unauthorized
 * @param status HTTP status code
 * @returns true nếu là 401
 */
export function is401Error(status: number): boolean {
  return status === 401;
}

/**
 * Handle 401 error - show alert và redirect
 * @param router Next router
 */
export function handle401Error(router: { push: (path: string) => void }): void {
  console.error('❌ 401 Unauthorized - Token expired or invalid');
  alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
  router.push('/login');
}
