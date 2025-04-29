# Clinic Management System

A Go-based clinic management system that helps manage patients, users, and clinical operations.

## 📋 Overview

This application provides a backend service for clinic management, including:
- User authentication and management
- Patient registration and information management
- Database migrations for schema evolution

## 🛠️ Technology Stack

- **Backend**: Go (v1.24.1)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API Framework**: Gin
- **Database Migration**: Go-migrate

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - Register a new user (doctor or receptionist)
- `POST /api/login` - Authenticate user and receive JWT token

### Patient Management
All patient endpoints require authentication.

#### For All Authenticated Users
- `GET /api/patients` - Retrieve list of all patients
- `GET /api/patients/:id` - Get details of a specific patient by ID

#### For Receptionists Only
- `POST /api/patients` - Add a new patient to the system
- `PUT /api/patients/:id` - Update patient information
- `DELETE /api/patients/:id` - Remove a patient from the system

#### For Doctors Only
- `PATCH /api/patients/:id/notes` - Update medical notes for a patient

## ⚙️ Prerequisites

- Go 1.24 or higher
- PostgreSQL
- [golang-migrate](https://github.com/golang-migrate/migrate) for migrations

## 🚀 Getting Started

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=clinic
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. **Build the application**:
   ```bash
   make build
   ```

2. **Run database migrations**:
   ```bash
   make migrate-up
   ```

3. **Start the server**:
   ```bash
   make run
   ```
   or for development with auto-rebuild:
   ```bash
   make dev
   ```

4. The server will start on port 8080.

## 🔄 Database Migrations

Create a new migration:
```bash
make migration migration_name
```

Apply migrations:
```bash
make migrate-up
```

Rollback migrations:
```bash
make migrate-down
```

## 🧹 Cleaning Up

Remove build artifacts:
```bash
make clean
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
