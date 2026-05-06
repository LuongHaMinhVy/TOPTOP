  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  import type { AuthResponse } from "@/utils/response/auth-response";
  import type { UserInfo } from "@/utils/response/user-info";

  const isClient = typeof window !== "undefined";

  const initialState: AuthResponse = {
    user: isClient ? JSON.parse(localStorage.getItem("user") || "null") : null,
    accessToken: isClient ? localStorage.getItem("accessToken") : null,
    tokenType: isClient ? localStorage.getItem("tokenType") : null,
    expiresIn: isClient ? Number(localStorage.getItem("expiresIn")) : null, 
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setCredentials: (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.tokenType = action.payload.tokenType;
        state.expiresIn = action.payload.expiresIn;
        
        if (isClient) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          if (action.payload.accessToken) localStorage.setItem("accessToken", action.payload.accessToken);
          if (action.payload.tokenType) localStorage.setItem("tokenType", action.payload.tokenType);
          if (action.payload.expiresIn) localStorage.setItem("expiresIn", String(action.payload.expiresIn));
        }
      },
      clearCredentials: (state) => {
        state.user = null;
        state.accessToken = null;
        state.tokenType = null;
        state.expiresIn = null;
        
        if (isClient) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenType");
          localStorage.removeItem("expiresIn");
        }
      },
    },
  });

  export const { setCredentials, clearCredentials } = authSlice.actions;
  export default authSlice.reducer;