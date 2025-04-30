package router

import (
	"github.com/gin-contrib/cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/config"
	"github.com/max-programming/clinic/internal/handler"
	"github.com/max-programming/clinic/internal/middleware"
)

func SetupRouter(h *handler.HandlerSet) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.Envs.LocalAllowedOrigin, config.Envs.RemoteAllowedOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api")
	{
		api.GET("/health", h.Health.Check)

		api.POST("/register", h.Auth.Register)
		api.POST("/login", h.Auth.Login)
		api.GET("/me", middleware.AuthMiddleware(), h.Auth.GetCurrentUser)

		patients := api.Group("/patients")
		patients.Use(middleware.AuthMiddleware())
		{
			patients.GET("", h.Patient.GetAllPatients)
			patients.GET("/:id", h.Patient.GetPatientByID)

			receptionistRoutes := patients.Group("/")
			receptionistRoutes.Use(middleware.RequireReceptionist())
			{
				receptionistRoutes.POST("", h.Patient.AddPatient)
				receptionistRoutes.PUT("/:id", h.Patient.UpdatePatient)
				receptionistRoutes.DELETE("/:id", h.Patient.DeletePatient)
			}

			doctorRoutes := patients.Group("/")
			doctorRoutes.Use(middleware.RequireDoctor())
			{
				doctorRoutes.PATCH("/:id/notes", h.Patient.UpdatePatientNotes)
			}
		}
	}

	return r
}
