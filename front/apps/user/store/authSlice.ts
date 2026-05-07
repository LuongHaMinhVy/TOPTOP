import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse } from "@/utils/response/auth-response";

interface AuthState extends AuthResponse {
  isAuthModalOpen: boolean;
  authModalType: "login" | "signup";
}

const initialState: AuthState = {
  user: null,
  isAuthModalOpen: false,
  authModalType: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.user = null;
    },
    openAuthModal: (state, action: PayloadAction<"login" | "signup">) => {
      state.isAuthModalOpen = true;
      state.authModalType = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const { setCredentials, clearCredentials, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;