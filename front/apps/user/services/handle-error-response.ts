import { AxiosError } from "axios";
import type { ApiResponse } from "@/utils/interfaces";

/**
 * Re-throws the error with a cleaner message extracted from the backend ApiResponse body.
 * 401 / 403 redirects are handled centrally by the axios interceptor in utils/axios-instance.ts
 * so we do NOT duplicate that logic here.
 */
export const handleErrorResponse = (error: AxiosError): never => {
  const data = error.response?.data as ApiResponse | undefined;
  const message =
    data?.message ||
    data?.errors?.[0]?.message ||
    error.message ||
    "An unexpected error occurred";

  throw new Error(message);
};