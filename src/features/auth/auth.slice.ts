import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authStorage } from './auth.storage';
import type { UserDomainModel } from '@/features/common/common.type';
import type { SignInResponseDataModel } from './auth.type';

// Định nghĩa kiểu dữ liệu cho State
interface AuthState {
  user: UserDomainModel | null;
  token: string | null;
  isAuthenticated: boolean;
}

// 1. KHỞI TẠO STATE TỪ STORAGE (Hydration)
// Bước này giúp Redux "nhớ" được trạng thái đăng nhập sau khi F5
const initialState: AuthState = {
  token: authStorage.getAccessToken(),
  user: authStorage.getUser(),
  isAuthenticated: authStorage.isAuthenticated(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action 1: Dùng khi Login thành công
    // Nhận SignInResponseDataModel (đã extract từ ApiResponse)
    setCredentials: (state, action: PayloadAction<{ data: SignInResponseDataModel; user?: UserDomainModel }>) => {
      const { data, user } = action.payload;

      if (!data?.accessToken) return;

      // A. Cập nhật vào Redux (RAM - Update UI ngay lập tức)
      state.token = data.accessToken;
      state.user = user || null; // User có thể được fetch sau
      state.isAuthenticated = true;

      // B. Lưu xuống Storage (Ổ cứng - Để dành cho lần F5 sau)
      authStorage.saveAuthData(data, user);
    },

    // Action 2: Set user sau khi fetch từ API /auth/me
    setUser: (state, action: PayloadAction<UserDomainModel>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Đồng bộ xuống Storage
      authStorage.setUser(action.payload);
    },

    // Action 3: Dùng khi Logout (chủ động hoặc hết hạn token)
    logout: (state) => {
      // A. Xóa Redux
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // B. Xóa Storage
      authStorage.clearAuthData();
    },

    // Action 4: Cập nhật thông tin User (Ví dụ: Đổi tên, đổi avatar mà không cần login lại)
    updateUserProfile: (state, action: PayloadAction<Partial<UserDomainModel>>) => {
      if (state.user) {
        // A. Merge thông tin mới vào Redux
        state.user = { ...state.user, ...action.payload };

        // B. Đồng bộ lại User mới xuống Storage
        authStorage.setUser(state.user);
      }
    },
  },
});

export const { setCredentials, setUser, logout, updateUserProfile } = authSlice.actions;

// Selectors (Giúp lấy dữ liệu nhanh ở component)
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;

