package service

import (
	"errors"

	"github.com/max-programming/clinic/internal/models"
	"github.com/max-programming/clinic/internal/repository"
	"github.com/max-programming/clinic/internal/utils"
)

type UserService interface {
	RegisterUser(user *models.User) error
	LoginUser(username, password string) (string, error)
	GetUserByUsername(username string) (*models.User, error)
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo}
}

func (s *userService) RegisterUser(user *models.User) error {
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	return s.repo.Create(user)
}

func (s *userService) LoginUser(username, password string) (string, error) {
	user, err := s.repo.FindByUsername(username)
	if err != nil {
		return "", err
	}

	if !utils.ComparePassword(user.Password, password) {
		return "", errors.New("invalid credentials")
	}

	tokenString, err := utils.CreateJWT(user.ID, user.Username, user.Role)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *userService) GetUserByUsername(username string) (*models.User, error) {
	return s.repo.FindByUsername(username)
}
