package middleware

import (
	"net/http"
	"strings"

	"slices"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/max-programming/clinic/internal/utils"
)

type AuthUser struct {
	ID       string
	Username string
	Role     string
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Authorization header is required"))
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid authorization format"))
			return
		}

		tokenString := parts[1]

		token, err := utils.VerifyJWT(tokenString)
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid or expired token"))
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid token claims"))
			return
		}

		userID, ok := claims["userID"].(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid user ID in token"))
			return
		}

		username, ok := claims["username"].(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid username in token"))
			return
		}

		role, ok := claims["role"].(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorAPIResponse("Invalid role in token"))
			return
		}

		authUser := &AuthUser{
			ID:       userID,
			Username: username,
			Role:     role,
		}
		c.Set("user", authUser)

		c.Next()
	}
}

func GetAuthUser(c *gin.Context) *AuthUser {
	user, exists := c.Get("user")
	if !exists {
		panic("no user found in context - middleware not applied properly")
	}

	authUser, ok := user.(*AuthUser)
	if !ok {
		panic("invalid user type in context - middleware not applied properly")
	}

	return authUser
}

func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authUser := GetAuthUser(c)

		allowed := slices.Contains(roles, authUser.Role)

		if !allowed {
			c.AbortWithStatusJSON(http.StatusForbidden, utils.NewErrorAPIResponse("Forbidden: insufficient permissions"))
			return
		}

		c.Next()
	}
}

func RequireReceptionist() gin.HandlerFunc {
	return RequireRole("receptionist")
}

func RequireDoctor() gin.HandlerFunc {
	return RequireRole("doctor")
}
