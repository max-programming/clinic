package handler

type HandlerSet struct {
	Auth    *AuthHandler
	Patient *PatientHandler
	Health  *HealthHandler
}
