package dto

type PatientUser struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

type AddPatientRequest struct {
	Name    string `json:"name" binding:"required,min=3,max=50"`
	Age     int    `json:"age" binding:"required,min=0,max=120"`
	Gender  string `json:"gender" binding:"required"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
}

type AddPatientResponse struct {
	ID        string `json:"id"`
	CreatedBy string `json:"createdBy"`
	CreatedAt string `json:"createdAt"`
}

type UpdatePatientRequest struct {
	Name         string `json:"name" binding:"min=3,max=50"`
	Age          int    `json:"age" binding:"min=0,max=120"`
	Gender       string `json:"gender"`
	Address      string `json:"address"`
	Phone        string `json:"phone"`
	MedicalNotes string `json:"medicalNotes"`
}

type UpdatePatientResponse struct {
	ID        string `json:"id"`
	UpdatedBy string `json:"updatedBy"`
	UpdatedAt string `json:"updatedAt"`
}

type UpdatePatientNotesRequest struct {
	MedicalNotes string `json:"medicalNotes" binding:"required"`
}

type DeletePatientResponse struct {
	ID string `json:"id"`
}

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
}

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
}
