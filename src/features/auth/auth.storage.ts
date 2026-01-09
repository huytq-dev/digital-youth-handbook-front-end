import type { SignInResponseDataModel, GetCurrentUserResponseDataModel } from "./auth.type";
import type { UserDomainModel } from "@/features/common/common.type";

// Constants Keys
const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "user";
const TOKEN_EXPIRY_KEY = "token_expiry";
// Note: RefreshToken được lưu trong HttpOnly Cookie bởi Backend, Frontend không cần lưu

/**
 * Mapping function: Convert backend response (GetCurrentUserResponseDataModel) 
 * to UserDomainModel, handling field name mismatches (pictureUrl -> picture)
 */
export const mapBackendUserToUserDomainModel = (backendUser: GetCurrentUserResponseDataModel): UserDomainModel => {
  const mappedUser: UserDomainModel = {
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    username: backendUser.username,
    // Backend returns 'pictureUrl', but UserDomainModel expects 'picture'
    picture: (backendUser as any).pictureUrl || backendUser.picture || null,
    isVerified: backendUser.isVerified,
    roleName: backendUser.roleName,
    gender: backendUser.gender,
    dob: backendUser.dob,
    address: backendUser.address,
    // Thêm schoolName và className từ backend response
    schoolName: backendUser.schoolName || null,
    className: backendUser.className || null,
  };
  return mappedUser;
};

/**
 * Auth Storage
 * Nhiệm vụ: Chỉ tương tác trực tiếp với localStorage (Két sắt)
 * Không chứa logic nghiệp vụ phức tạp.
 */
export const authStorage = {
  // --- Token Operations ---
  setAccessToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  // --- User Operations ---
  setUser: (user: UserDomainModel): void => {
    import.meta.env.DEV && console.log('💾 [AUTH STORAGE] Saving user to localStorage:', { id: user.id, name: user.name, username: user.username, email: user.email });
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): UserDomainModel | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr) as UserDomainModel;
      import.meta.env.DEV && console.log('📖 [AUTH STORAGE] Loading user from localStorage:', { id: user.id, name: user.name, username: user.username, email: user.email });
      return user;
    } catch {
      return null;
    }
  },

  // --- Expiry Operations ---
  setTokenExpiry: (expiresIn: number): void => {
    // expiresIn thường là giây, nhân 1000 ra milliseconds
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  },

  isTokenExpired: (): boolean => {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true; // Không có hạn -> coi như hết hạn cho an toàn
    return Date.now() >= parseInt(expiryTime, 10);
  },

  // --- Composite Operations (Dùng khi Login thành công) ---
  saveAuthData: (data: SignInResponseDataModel, user?: UserDomainModel): void => {
    if (data.accessToken) {
      authStorage.setAccessToken(data.accessToken);
    }
    // RefreshToken nằm trong HttpOnly Cookie do Backend set, Frontend không cần lưu
    if (data.expiresIn) {
      authStorage.setTokenExpiry(data.expiresIn);
    }
    if (user) {
      authStorage.setUser(user);
    } else if (data.user) {
      // If user not provided but available in data, map it from backend response
      const mappedUser = mapBackendUserToUserDomainModel(data.user);
      authStorage.setUser(mappedUser);
    }
  },

  // --- Clear Operations (Dùng khi Logout) ---
  clearAuthData: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    // RefreshToken cookie sẽ được Backend xóa khi gọi logout API
  },

  // --- Check Status ---
  isAuthenticated: (): boolean => {
    const token = authStorage.getAccessToken();
    if (!token) return false;
    return !authStorage.isTokenExpired();
  },
};

// Export alias để tương thích code cũ (nếu cần)
export const authService = authStorage;
