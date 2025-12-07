import { authStorage } from "@/features/auth/auth.storage";
import { ROLES } from "@/config/system-roles";

/**
 * Get user role from token or stored user
 * Priority: Stored User > Decoded Token
 */
export const getUserRole = (): string | null => {
  // 1. Try to get from stored user first (faster, more reliable)
  const user = authStorage.getUser();
  if (user?.roleName) {
    return user.roleName;
  }

  // 2. Fallback: Decode token to get role
  const token = authStorage.getAccessToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);

    // Try multiple common role claim formats
    return (
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      decoded.role ||
      decoded.roles ||
      decoded.roleName ||
      null
    );
  } catch {
    return null;
  }
};

/**
 * Check if user has specific role
 */
export const hasRole = (role: string): boolean => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Check if user is admin
 */
export const isAdmin = (): boolean => {
  return hasRole(ROLES.ADMIN);
};

/**
 * Check if user is regular user
 */
export const isUser = (): boolean => {
  return hasRole(ROLES.USER);
};
