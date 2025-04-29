package models

import "time"

type User struct {
	ID        string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Username  string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	Role      string `gorm:"type:varchar(20);not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
