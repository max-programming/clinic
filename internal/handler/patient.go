package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/dto"
	"github.com/max-programming/clinic/internal/middleware"
	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/service"
)

type PatientHandler struct {
	service service.PatientService
}

func NewPatientHandler(service service.PatientService) *PatientHandler {
	return &PatientHandler{service}
}

func (h *PatientHandler) AddPatient(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	var req dto.AddPatientRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	patient := &models.Patient{
		Name:         req.Name,
		Age:          req.Age,
		Gender:       req.Gender,
		Phone:        req.Phone,
		Address:      req.Address,
		MedicalNotes: "",
		CreatedBy:    authUser.ID,
		UpdatedBy:    authUser.ID,
	}

	if err := h.service.CreatePatient(patient); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Patient added successfully",
		"addedBy": authUser.Username,
	})
}

func (h *PatientHandler) GetAllPatients(c *gin.Context) {
	patients, err := h.service.GetAllPatients()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, patients)
}

func (h *PatientHandler) GetPatientByID(c *gin.Context) {
	id := c.Param("id")
	patient, err := h.service.GetPatientByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, patient)
}

func (h *PatientHandler) UpdatePatient(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	id := c.Param("id")

	var req dto.UpdatePatientRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	patient := &models.Patient{
		ID:           id,
		Name:         req.Name,
		Age:          req.Age,
		Gender:       req.Gender,
		Phone:        req.Phone,
		Address:      req.Address,
		MedicalNotes: req.MedicalNotes,
		UpdatedBy:    authUser.ID,
	}

	if err := h.service.UpdatePatient(patient); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Patient updated successfully",
		"updatedBy": authUser.Username,
	})
}

func (h *PatientHandler) UpdatePatientNotes(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	id := c.Param("id")

	var req dto.UpdatePatientNotesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.UpdatePatientNotes(id, req.MedicalNotes, authUser.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Patient notes updated successfully",
		"updatedBy": authUser.Username,
	})
}

func (h *PatientHandler) DeletePatient(c *gin.Context) {
	id := c.Param("id")

	if err := h.service.DeletePatient(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Patient deleted successfully",
	})
}
