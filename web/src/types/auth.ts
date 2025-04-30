export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface RegisterUserRequest {
  username: string;
  password: string;
  role: "receptionist" | "doctor";
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

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
