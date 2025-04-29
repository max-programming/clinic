package utils

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/max-programming/clinic/internal/config"
)

func CreateJWT(userID string, username, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":   userID,
		"username": username,
		"role":     role,
	})
	tokenString, err := token.SignedString([]byte(config.Envs.JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWT(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(config.Envs.JWTSecret), nil
	})

	return token, err
}
