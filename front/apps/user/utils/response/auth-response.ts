import type { UserInfo } from "./user-info";

export type AuthResponse = {
  user: UserInfo | null;
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
}