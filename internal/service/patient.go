package service

import (
	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/repository"
)

type PatientService interface {
	CreatePatient(patient *models.Patient) error
	GetAllPatients() ([]*models.Patient, error)
	GetPatientByID(id string) (*models.Patient, error)
	GetPatientByIDWithUsers(id string) (*models.Patient, *models.User, *models.User, error)
	UpdatePatient(id string, patient *models.Patient) error
	UpdatePatientNotes(id string, notes string, updatedBy string) error
	DeletePatient(id string) error
}

type patientService struct {
	repo repository.PatientRepository
}

func NewPatientService(repo repository.PatientRepository) PatientService {
	return &patientService{repo}
}

func (s *patientService) CreatePatient(patient *models.Patient) error {
	return s.repo.Create(patient)
}

func (s *patientService) GetAllPatients() ([]*models.Patient, error) {
	return s.repo.GetAll()
}

func (s *patientService) GetPatientByID(id string) (*models.Patient, error) {
	return s.repo.GetByID(id)
}

func (s *patientService) GetPatientByIDWithUsers(id string) (*models.Patient, *models.User, *models.User, error) {
	return s.repo.GetByIDWithUsers(id)
}

func (s *patientService) UpdatePatient(id string, updatedPatient *models.Patient) error {
	return s.repo.Update(id, updatedPatient)
}

func (s *patientService) UpdatePatientNotes(id string, notes string, updatedBy string) error {
	patient, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}
	patient.MedicalNotes = notes
	patient.UpdatedBy = updatedBy
	return s.repo.Update(id, patient)
}

func (s *patientService) DeletePatient(id string) error {
	return s.repo.Delete(id)
}
