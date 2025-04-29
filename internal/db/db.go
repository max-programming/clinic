package db

import (
	"database/sql"
	"log"

	"github.com/max-programming/clinic/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() (*gorm.DB, error) {
	gormDB, err := gorm.Open(postgres.Open(config.Envs.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database", err)
	}
	return gormDB, nil
}

func SQLConnect() (*sql.DB, error) {
	db, err := sql.Open("postgres", config.Envs.DatabaseURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
