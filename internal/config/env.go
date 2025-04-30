package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL         string
	JWTSecret           string
	LocalAllowedOrigin  string
	RemoteAllowedOrigin string
}

var Envs = initConfig()

func initConfig() Config {
	godotenv.Load()

	return Config{
		DatabaseURL:         os.Getenv("DATABASE_URL"),
		JWTSecret:           os.Getenv("JWT_SECRET"),
		LocalAllowedOrigin:  os.Getenv("LOCAL_ALLOWED_ORIGIN"),
		RemoteAllowedOrigin: os.Getenv("REMOTE_ALLOWED_ORIGIN"),
	}
}
