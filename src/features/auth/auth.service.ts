import type { SignInResponseDataModel } from "./auth.type";
import type { UserDomainModel } from "@/features/common/common.type";

// Storage keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";
const TOKEN_EXPIRY_KEY = "token_expiry";

/**
 * Auth Service - Helper functions for authentication operations
 */
export const authService = {
  /**
   * Save access token to localStorage
   */
  setAccessToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  /**
   * Get access token from localStorage
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Save refresh token to localStorage
   */
  setRefreshToken: (token: string | null): void => {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Save user information to localStorage
   */
  setUser: (user: UserDomainModel): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Get user information from localStorage
   */
  getUser: (): UserDomainModel | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as UserDomainModel;
    } catch {
      return null;
    }
  },

  /**
   * Save token expiry time
   */
  setTokenExpiry: (expiresIn: number): void => {
    const expiryTime = Date.now() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (): boolean => {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;
    return Date.now() >= parseInt(expiryTime, 10);
  },

  /**
   * Save authentication data (token, refresh token, user, expiry)
   */
  saveAuthData: (data: SignInResponseDataModel, user?: UserDomainModel): void => {
    if (data.accessToken) {
      authService.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      authService.setRefreshToken(data.refreshToken);
    }
    if (data.expiresIn) {
      authService.setTokenExpiry(data.expiresIn);
    }
    if (user) {
      authService.setUser(user);
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuthData: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = authService.getAccessToken();
    if (!token) return false;
    return !authService.isTokenExpired();
  },

  /**
   * Get authorization header value
   */
  getAuthHeader: (): string | null => {
    const token = authService.getAccessToken();
    return token ? `Bearer ${token}` : null;
  },
};

