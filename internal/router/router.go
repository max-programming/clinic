package router

import (
	"net/http"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/handler"
	"github.com/max-programming/clinic/internal/middleware"
)

func SetupRouter(h *handler.HandlerSet) *gin.Engine {
	r := gin.Default()

	r.GET("/swagger", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/swagger/index.html")
	})
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api")
	{
		api.POST("/register", h.Auth.Register)
		api.POST("/login", h.Auth.Login)

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
