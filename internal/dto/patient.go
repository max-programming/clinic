package dto

type AddPatientRequest struct {
	Name    string `json:"name" binding:"required,min=3,max=50"`
	Age     int    `json:"age" binding:"required,min=0,max=120"`
	Gender  string `json:"gender" binding:"required"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
}

type UpdatePatientRequest struct {
	Name         string `json:"name" binding:"min=3,max=50"`
	Age          int    `json:"age" binding:"min=0,max=120"`
	Gender       string `json:"gender"`
	Address      string `json:"address"`
	Phone        string `json:"phone"`
	MedicalNotes string `json:"medicalNotes"`
}

type UpdatePatientNotesRequest struct {
	MedicalNotes string `json:"medicalNotes" binding:"required"`
}
