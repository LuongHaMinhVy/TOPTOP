import { AxiosError } from "axios";
import api from "@/utils/axios-instance";
import { handleErrorResponse } from "./handle-error-response";
import type { ApiResponse } from "@/utils/common/index";
import type { UserInfo } from "@/utils/response/user-info";

export const getCurrentUser = async (): Promise<ApiResponse<UserInfo>> => {
  try {
    const response = await api.get<ApiResponse<UserInfo>>("/users/me");
    return response.data;
  } catch (error) {
    handleErrorResponse(error as AxiosError);
    throw error;
  }
};
