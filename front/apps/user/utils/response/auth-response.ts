import type { UserInfo } from "./user-info";

export interface AuthResponse {
  user?:        UserInfo;
  accessToken:  string;
  tokenType?:   string;
  expiresIn?:   number;
}

export type { ApiResponse } from "../common/index";
