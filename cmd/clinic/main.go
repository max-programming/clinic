package main

import (
	"log"

	_ "github.com/max-programming/clinic/docs"
	"github.com/max-programming/clinic/internal/bootstrap"
	"github.com/max-programming/clinic/internal/router"
)

// @title Clinic API
// @version 1.0
// @description API Server for a Clinic application
// @BasePath /api
// @SecurityDefinitions.apiKey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
func main() {
	app := bootstrap.Initialize()
	r := router.SetupRouter(app.Handlers)
	r.Run(":8080")
	log.Println("Server started on :8080")
}
