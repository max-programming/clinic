package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/dto"
	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/service"
)

type AuthHandler struct {
	service service.UserService
}

func NewAuthHandler(service service.UserService) *AuthHandler {
	return &AuthHandler{service}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Username: req.Username,
		Password: req.Password,
		Role:     req.Role,
	}

	if err := h.service.RegisterUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := h.service.LoginUser(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
