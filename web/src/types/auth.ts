// Base API response types that match the Go backend
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Request types
export interface RegisterUserRequest {
  username: string;
  password: string;
  role: "receptionist" | "doctor";
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

// Response data types
export interface RegisterUserResponseData {
  id: string;
  username: string;
  role: string;
}

export interface LoginUserResponseData {
  token: string;
}

export interface UserResponseData {
  id: string;
  username: string;
  role: string;
}
