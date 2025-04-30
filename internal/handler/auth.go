package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/dto"
	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/service"
	"github.com/max-programming/clinic/internal/utils"
)

type AuthHandler struct {
	service service.UserService
}

func NewAuthHandler(service service.UserService) *AuthHandler {
	return &AuthHandler{service}
}

// @Summary Register a new user
// @Description Register a new user with username, password, and role
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.RegisterUserRequest true "Register User Request"
// @Success 201 {object} utils.SuccessAPIResponse[dto.RegisterUserResponse]
// @Failure 400 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	user := models.User{
		Username: req.Username,
		Password: req.Password,
		Role:     req.Role,
	}

	if err := h.service.RegisterUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusCreated, utils.NewSuccessAPIResponse(dto.RegisterUserResponse{
		ID:       user.ID,
		Username: user.Username,
		Role:     user.Role,
	}))
}

// @Summary Login a user
// @Description Login a user with username and password
// @Tags auth
// @Accept json
// @Produce json
// @Param request body dto.LoginUserRequest true "Login User Request"
// @Success 200 {object} utils.SuccessAPIResponse[dto.LoginUserResponse]
// @Failure 400 {object} utils.ErrorAPIResponse
// @Failure 401 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	token, err := h.service.LoginUser(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.LoginUserResponse{Token: token}))
}

// @Summary Get current user
// @Description Get information about the currently authenticated user
// @Tags auth
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} utils.SuccessAPIResponse[dto.UserResponse]
// @Failure 401 {object} utils.ErrorAPIResponse
// @Failure 404 {object} utils.ErrorAPIResponse
// @Router /me [get]
func (h *AuthHandler) GetCurrentUser(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Unauthorized"))
		return
	}

	username, exists := c.Get("username")
	if !exists {
		c.JSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Unauthorized"))
		return
	}

	role, exists := c.Get("role")
	if !exists {
		c.JSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Unauthorized"))
		return
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.UserResponse{
		ID:       userID.(string),
		Username: username.(string),
		Role:     role.(string),
	}))
}
