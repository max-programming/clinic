package repository

import (
	"github.com/max-programming/clinic/internal/models"
	"gorm.io/gorm"
)

type PatientRepository interface {
	Create(patient *models.Patient) error
	GetAll() ([]*models.Patient, error)
	GetByID(id string) (*models.Patient, error)
	Update(id string, updatedPatient *models.Patient) error
	Delete(id string) error
}

type patientRepository struct {
	db *gorm.DB
}

func NewPatientReposiory(db *gorm.DB) PatientRepository {
	return &patientRepository{db}
}

func (r *patientRepository) Create(patient *models.Patient) error {
	return r.db.Create(patient).Error
}

func (r *patientRepository) GetAll() ([]*models.Patient, error) {
	var patients []*models.Patient
	if err := r.db.Find(&patients).Error; err != nil {
		return nil, err
	}
	return patients, nil
}

func (r *patientRepository) GetByID(id string) (*models.Patient, error) {
	var patient models.Patient
	if err := r.db.First(&patient, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &patient, nil
}

func (r *patientRepository) Update(id string, updatedPatient *models.Patient) error {
	patient, err := r.GetByID(id)
	if err != nil {
		return err
	}
	return r.db.Model(&patient).Updates(updatedPatient).Error
}

func (r *patientRepository) Delete(id string) error {
	patient, err := r.GetByID(id)
	if err != nil {
		return err
	}
	return r.db.Delete(&patient).Error
}
