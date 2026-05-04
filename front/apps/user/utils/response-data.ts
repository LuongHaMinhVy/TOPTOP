export interface ApiResponse<T> {
  message: string;
  data: T;
  meta?: Meta;
  errors?: ErrorResponse[];
  status: number;
  timestamp: string;
}

export interface ErrorResponse {
  field?: string;
  message: string;
}

export interface Meta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}