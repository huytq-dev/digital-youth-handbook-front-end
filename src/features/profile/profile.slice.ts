import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from './profile.type';

// Định nghĩa kiểu dữ liệu cho Profile State
interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Set profile data
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },

    // Update profile (partial update)
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear profile data
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  clearProfile,
} = profileSlice.actions;

// Selectors
export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile.profile;
export const selectProfileLoading = (state: { profile: ProfileState }) =>
  state.profile.isLoading;
export const selectProfileError = (state: { profile: ProfileState }) =>
  state.profile.error;

export default profileSlice.reducer;
