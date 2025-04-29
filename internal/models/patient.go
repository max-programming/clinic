package models

import "time"

type Patient struct {
	ID           string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name         string `gorm:"not null"`
	Age          int    `gorm:"not null"`
	Gender       string `gorm:"not null"`
	Address      string
	Phone        string
	MedicalNotes string
	CreatedBy    string `gorm:"type:uuid;index"`
	UpdatedBy    string `gorm:"type:uuid;index"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
