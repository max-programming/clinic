package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/max-programming/clinic/internal/dto"
	"github.com/max-programming/clinic/internal/middleware"
	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/service"
	"github.com/max-programming/clinic/internal/utils"
)

type PatientHandler struct {
	service service.PatientService
}

func NewPatientHandler(service service.PatientService) *PatientHandler {
	return &PatientHandler{service}
}

// @Summary Add a new patient
// @Description Add a new patient
// @Tags patients
// @Accept json
// @Produce json
// @Param body body dto.AddPatientRequest true "Add Patient Request"
// @Success 201 {object} utils.SuccessAPIResponse[dto.AddPatientResponse]
// @Failure 400 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients [post]
// @Security BearerAuth
func (h *PatientHandler) AddPatient(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	var body dto.AddPatientRequest
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	patient := &models.Patient{
		Name:         body.Name,
		Age:          body.Age,
		Gender:       body.Gender,
		Phone:        body.Phone,
		Address:      body.Address,
		MedicalNotes: "",
		CreatedBy:    authUser.ID,
		UpdatedBy:    authUser.ID,
	}

	if err := h.service.CreatePatient(patient); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusCreated, utils.NewSuccessAPIResponse(dto.AddPatientResponse{
		ID:        patient.ID,
		CreatedBy: authUser.Username,
		CreatedAt: patient.CreatedAt.Format("2006-01-02 15:04:05"),
	}))
}

// @Summary Get all patients
// @Description Get all patients
// @Tags patients
// @Accept json
// @Produce json
// @Success 200 {array} dto.GetAllPatientsResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients [get]
// @Security BearerAuth
func (h *PatientHandler) GetAllPatients(c *gin.Context) {
	patients, err := h.service.GetAllPatients()
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	patientResponses := make([]dto.GetAllPatientsResponse, len(patients))
	for i, patient := range patients {
		patientResponses[i] = dto.GetAllPatientsResponse{
			ID:           patient.ID,
			Name:         patient.Name,
			Age:          patient.Age,
			Gender:       patient.Gender,
			Address:      patient.Address,
			Phone:        patient.Phone,
			MedicalNotes: patient.MedicalNotes,
			CreatedAt:    patient.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:    patient.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(patientResponses))
}

// @Summary Get a patient by ID
// @Description Get a patient by ID
// @Tags patients
// @Accept json
// @Produce json
// @Param id path string true "Patient ID"
// @Success 200 {object} utils.SuccessAPIResponse[dto.GetPatientResponse]
// @Failure 404 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients/{id} [get]
// @Security BearerAuth
func (h *PatientHandler) GetPatientByID(c *gin.Context) {
	id := c.Param("id")
	patient, createdByUser, updatedByUser, err := h.service.GetPatientByIDWithUsers(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	// Prepare user information for response
	var createdByResponse, updatedByResponse dto.PatientUser

	if createdByUser != nil {
		createdByResponse = dto.PatientUser{
			ID:       createdByUser.ID,
			Username: createdByUser.Username,
			Role:     createdByUser.Role,
		}
	}

	if updatedByUser != nil {
		updatedByResponse = dto.PatientUser{
			ID:       updatedByUser.ID,
			Username: updatedByUser.Username,
			Role:     updatedByUser.Role,
		}
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.GetPatientResponse{
		ID:           patient.ID,
		Name:         patient.Name,
		Age:          patient.Age,
		Gender:       patient.Gender,
		Address:      patient.Address,
		Phone:        patient.Phone,
		MedicalNotes: patient.MedicalNotes,
		CreatedBy:    createdByResponse,
		UpdatedBy:    updatedByResponse,
		CreatedAt:    patient.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:    patient.UpdatedAt.Format("2006-01-02 15:04:05"),
	}))
}

// @Summary Update a patient
// @Description Update a patient
// @Tags patients
// @Accept json
// @Produce json
// @Param id path string true "Patient ID"
// @Param body body dto.UpdatePatientRequest true "Update Patient Request"
// @Success 200 {object} utils.SuccessAPIResponse[dto.UpdatePatientResponse]
// @Failure 400 {object} utils.ErrorAPIResponse
// @Failure 404 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients/{id} [put]
// @Security BearerAuth
func (h *PatientHandler) UpdatePatient(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	id := c.Param("id")

	var body dto.UpdatePatientRequest
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	patient := &models.Patient{
		Name:         body.Name,
		Age:          body.Age,
		Gender:       body.Gender,
		Phone:        body.Phone,
		Address:      body.Address,
		MedicalNotes: body.MedicalNotes,
		UpdatedBy:    authUser.ID,
	}

	if err := h.service.UpdatePatient(id, patient); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.UpdatePatientResponse{
		ID:        patient.ID,
		UpdatedBy: authUser.Username,
		UpdatedAt: patient.UpdatedAt.Format("2006-01-02 15:04:05"),
	}))
}

// @Summary Update patient medical notes
// @Description Update patient medical notes
// @Tags patients
// @Accept json
// @Produce json
// @Param id path string true "Patient ID"
// @Param body body dto.UpdatePatientNotesRequest true "Update Patient Notes Request"
// @Success 200 {object} utils.SuccessAPIResponse[dto.UpdatePatientResponse]
// @Failure 400 {object} utils.ErrorAPIResponse
// @Failure 404 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients/{id}/notes [patch]
// @Security BearerAuth
func (h *PatientHandler) UpdatePatientNotes(c *gin.Context) {
	authUser := middleware.GetAuthUser(c)

	id := c.Param("id")

	var req dto.UpdatePatientNotesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	patient := &models.Patient{
		MedicalNotes: req.MedicalNotes,
		UpdatedBy:    authUser.ID,
	}

	if err := h.service.UpdatePatient(id, patient); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.UpdatePatientResponse{
		ID:        patient.ID,
		UpdatedBy: authUser.Username,
		UpdatedAt: patient.UpdatedAt.Format("2006-01-02 15:04:05"),
	}))
}

// @Summary Delete a patient
// @Description Delete a patient
// @Tags patients
// @Accept json
// @Produce json
// @Param id path string true "Patient ID"
// @Success 200 {object} utils.SuccessAPIResponse[dto.DeletePatientResponse]
// @Failure 404 {object} utils.ErrorAPIResponse
// @Failure 500 {object} utils.ErrorAPIResponse
// @Router /patients/{id} [delete]
// @Security BearerAuth
func (h *PatientHandler) DeletePatient(c *gin.Context) {
	id := c.Param("id")

	if err := h.service.DeletePatient(id); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewErrorAPIResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, utils.NewSuccessAPIResponse(dto.DeletePatientResponse{ID: id}))
}
