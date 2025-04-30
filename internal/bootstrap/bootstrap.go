package bootstrap

import (
	"log"

	"github.com/max-programming/clinic/internal/db"
	"github.com/max-programming/clinic/internal/handler"
	"github.com/max-programming/clinic/internal/repository"
	"github.com/max-programming/clinic/internal/service"
)

type BootstrapApp struct {
	Handlers *handler.HandlerSet
}

func Initialize() *BootstrapApp {
	db, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	userRepo := repository.NewUserRepository(db)
	patientRepo := repository.NewPatientReposiory(db)

	userService := service.NewUserService(userRepo)
	patientService := service.NewPatientService(patientRepo)

	authHandler := handler.NewAuthHandler(userService)
	patientHandler := handler.NewPatientHandler(patientService)
	healthHandler := handler.NewHealthHandler()

	handlerSet := &handler.HandlerSet{
		Auth:    authHandler,
		Patient: patientHandler,
		Health:  healthHandler,
	}

	return &BootstrapApp{
		Handlers: handlerSet,
	}
}
