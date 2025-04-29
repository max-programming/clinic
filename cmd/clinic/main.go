package main

import (
	"log"

	"github.com/max-programming/clinic/internal/bootstrap"
	"github.com/max-programming/clinic/internal/router"
)

func main() {
	app := bootstrap.Initialize()
	r := router.SetupRouter(app.Handlers)
	r.Run(":8080")
	log.Println("Server started on :8080")
}
