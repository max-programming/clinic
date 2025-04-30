package dto

type RegisterUserRequest struct {
	Username string `json:"username" binding:"required,min=3,max=20"`
	Password string `json:"password" binding:"required,min=6"`
	Role     string `json:"role" binding:"required,oneof=receptionist doctor"`
} //@name RegisterUserRequest

type RegisterUserResponse struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
} //@name RegisterUserResponse

type LoginUserRequest struct {
	Username string `json:"username" binding:"required,min=3,max=20"`
	Password string `json:"password" binding:"required,min=6"`
} //@name LoginUserRequest

type LoginUserResponse struct {
	Token string `json:"token"`
} //@name LoginUserResponse

type UserResponse struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
} //@name UserResponse //@name LoginUserResponse
