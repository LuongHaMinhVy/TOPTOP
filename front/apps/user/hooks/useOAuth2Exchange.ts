import { useQuery } from "@tanstack/react-query";
import type { AuthResponse } from "@/utils/response/auth-response";

export const useOAuth2Exchange = (state: string | null) => {
  return useQuery<AuthResponse>({
    queryKey: ["oauth2-exchange", state],
    queryFn: async () => {
      if (!state) throw new Error("Missing state");
      const res = await fetch(`/api/auth/oauth2/exchange?state=${state}`);
      if (!res.ok) throw new Error("Exchange failed");
      return res.json();
    },
    enabled: !!state,
    retry: false,
  });
};