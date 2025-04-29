package dto

type PatientUser struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
} //@name PatientUser

type AddPatientRequest struct {
	Name    string `json:"name" binding:"required,min=3,max=50"`
	Age     int    `json:"age" binding:"required,min=0,max=120"`
	Gender  string `json:"gender" binding:"required"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
} //@name AddPatientRequest

type AddPatientResponse struct {
	ID        string `json:"id"`
	CreatedBy string `json:"createdBy"`
	CreatedAt string `json:"createdAt"`
} //@name AddPatientResponse

type UpdatePatientRequest struct {
	Name         string `json:"name" binding:"min=3,max=50"`
	Age          int    `json:"age" binding:"min=0,max=120"`
	Gender       string `json:"gender"`
	Address      string `json:"address"`
	Phone        string `json:"phone"`
	MedicalNotes string `json:"medicalNotes"`
} //@name UpdatePatientRequest

type UpdatePatientResponse struct {
	ID        string `json:"id"`
	UpdatedBy string `json:"updatedBy"`
	UpdatedAt string `json:"updatedAt"`
} //@name UpdatePatientResponse

type UpdatePatientNotesRequest struct {
	MedicalNotes string `json:"medicalNotes" binding:"required"`
} //@name UpdatePatientNotesRequest

type DeletePatientResponse struct {
	ID string `json:"id"`
} //@name DeletePatientResponse

type GetPatientResponse struct {
	ID           string      `json:"id"`
	Name         string      `json:"name"`
	Age          int         `json:"age"`
	Gender       string      `json:"gender"`
	Address      string      `json:"address"`
	Phone        string      `json:"phone"`
	MedicalNotes string      `json:"medicalNotes"`
	CreatedBy    PatientUser `json:"createdBy"`
	UpdatedBy    PatientUser `json:"updatedBy"`
	CreatedAt    string      `json:"createdAt"`
	UpdatedAt    string      `json:"updatedAt"`
} //@name GetPatientResponse

type GetAllPatientsResponse struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Age          int    `json:"age"`
	Gender       string `json:"gender"`
	Address      string `json:"address"`
	Phone        string `json:"phone"`
	MedicalNotes string `json:"medicalNotes"`
	CreatedAt    string `json:"createdAt"`
	UpdatedAt    string `json:"updatedAt"`
} //@name GetAllPatientsResponse
