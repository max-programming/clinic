build:
	@echo "Building clinic application..."
	@go build -o bin/clinic ./cmd/clinic

run:
	@echo "Running clinic application..."
	@go run ./cmd/clinic

dev: build
	@echo "Starting clinic application..."
	@./bin/clinic

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf bin/
	@go clean

migration:
	@migrate create -ext sql -dir cmd/migrate/migrations $(filter-out $@,$(MAKECMDGOALS))

migrate-up:
	@go run cmd/migrate/main.go up

migrate-down:
	@go run cmd/migrate/main.go down

