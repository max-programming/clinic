package utils

type APIResponse[T any] struct {
	Success bool   `json:"success"`
	Data    T      `json:"data,omitempty"`
	Error   string `json:"error,omitempty"`
}

func SuccessResponse[T any](data T) APIResponse[T] {
	return APIResponse[T]{
		Success: true,
		Data:    data,
		Error:   "",
	}
}

func ErrorResponse(errorString string) APIResponse[any] {
	return APIResponse[any]{
		Success: false,
		Error:   errorString,
		Data:    nil,
	}
}
