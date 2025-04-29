package utils

type SuccessAPIResponse[T any] struct {
	Success bool `json:"success"`
	Data    T    `json:"data,omitempty"`
} // @name SuccessAPIResponse

type ErrorAPIResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
} // @name ErrorAPIResponse

func NewSuccessAPIResponse[T any](data T) SuccessAPIResponse[T] {
	return SuccessAPIResponse[T]{
		Success: true,
		Data:    data,
	}
}

func NewErrorAPIResponse(errorString string) ErrorAPIResponse {
	return ErrorAPIResponse{
		Success: false,
		Error:   errorString,
	}
}
